const { MongoClient } = require('mongodb');
require('dotenv').config();
const converter = require('csvtojson');
const fetch = require('node-fetch');

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const file = './data/zueri-markt_20200323-2126.csv';

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
  name: doc.vendor,
  service: toArray(doc.type).filter(isValidService).map(toService),
  body: doc.offer,
  address: toArray(doc.address),
  categories: toArray(doc.category).map(trim),
  contact: toArray(doc.contact),
  hours: toArray(doc.hours).map(trim),
  order: toArray(doc.order_options).filter(isValidOrder).map(toOrder),
  region: doc.region,
  tenant: 'SFY',
});

(async function () {
  const data = await converter().fromFile(file);
  let enriched = [];

  for (const shop of data) {
    const address = shop.address;

    if (!address) {
      console.info(`No address for ${shop.vendor}`);
      continue;
    }

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${encodeURIComponent(address)}`
    );

    if (!response.ok) {
      console.info(response.url);
      console.info(`failed ${shop.vendor} (${response.status})!`);
      continue;
    }

    const { results } = await response.json();
    const [first] = results;

    if (!first) {
      console.info(`no results for ${shop.vendor}!`);
      continue;
    }

    const { lat, lng } = first.geometry;

    enriched.push({
      ...mapVendor(shop),
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    });
  }

  const client = new MongoClient(process.env.MONGO_IMPORTER, { useUnifiedTopology: true });
  await client.connect();

  await client.db('shops').collection('shops').deleteMany({});
  await client.db('shops').collection('shops').insertMany(enriched);

  await client.close();

  console.info(`succeeded for ${enriched.length} shops`);

  console.log(enriched);
  process.exit(0);
})();
