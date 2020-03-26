const { MongoClient } = require('mongodb');
require('dotenv').config();
const converter = require('csvtojson');
const fetch = require('node-fetch');

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const file = './data/cleaned-sfy.csv';

const isValidService = (service) =>
  ['Abholung', 'Lieferung per Post', 'Lieferung per Velo / Auto', 'Selbst ernten'].includes(service);

const toService = (service) => {
  switch (service) {
    case 'Abholung':
      return 'TAKEAWAY';
    case 'Lieferung per Post':
      return 'DELIVERY_MAIL';
    case 'Lieferung per Velo / Auto':
      return 'DELIVERY';
    case 'Selbst ernten':
      return 'SELF_SERVICE';
  }
};

const isValidOrder = (order) => ['Telefon', 'E-Mail', 'Webseite'].includes(order);

const toOrder = (order) => {
  switch (order) {
    case 'Telefon':
      return 'PHONE';
    case 'E-Mail':
      return 'EMAIL';
    case 'Webseite':
      return 'WEBSITE';
  }
};

const trim = (text) => text.trim();
const toArray = (text) => text.split(',');

const mapVendor = (doc) => ({
  name: doc.name,
  address: doc.address,
  zip: doc.zip,
  locality: doc.locality,
  categories: toArray(doc.category).map(trim),
  body: doc.body,
  service: toArray(doc.service).filter(isValidService).map(toService),
  hours: toArray(doc.hours).map(trim),
  order: toArray(doc.order),
  email: doc.email,
  phone: doc.phone,
  website: doc.website,
  tenant: 'SFY',
});

(async function () {
  const data = await converter().fromFile(file);
  let enriched = [];

  for (const shop of data) {
    const { address, zip, locality } = shop;
    const q = `${encodeURIComponent(address)}, ${encodeURIComponent(zip)} ${encodeURIComponent(locality)}, Schweiz`;

    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${q}`);

    if (!response.ok) {
      console.info(response.url);
      console.info(`failed ${shop.name} (${response.status})!`);
      continue;
    }

    const { results } = await response.json();
    const [first] = results;

    if (!first) {
      console.info(`no results for ${shop.name}!`);
      continue;
    }

    const {
      geometry: { lat, lng },
      components: { state },
    } = first;

    enriched.push({
      ...mapVendor(shop),
      state,
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    });
  }

  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  await client.db('shops').collection('shops').deleteMany({ tenant: 'SFY' });
  await client.db('shops').collection('shops').insertMany(enriched);

  await client.close();

  console.info(`succeeded for ${enriched.length} shops`);

  // console.log(enriched);
  process.exit(0);
})();
