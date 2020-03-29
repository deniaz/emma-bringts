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

// name,address,zip,locality,category,body,service,hours,order,email,phone,website
const mapVendor = (doc) => ({
  name: doc.name,
  service: toArray(doc.service).filter(isValidService).map(toService),
  body: doc.body,
  address: [doc.address, `${doc.zip} ${doc.locality}`],
  categories: toArray(doc.category)
    .map(trim)
    .filter((el) => el !== ''),
  contact: [doc.email, doc.phone, doc.website].map(trim).filter((el) => el !== ''),
  hours: toArray(doc.hours).map(trim),
  order: toArray(doc.order).map(trim),
  region: doc.region,
  tenant: 'SFY',
});

(async function () {
  const data = await converter().fromFile(file);
  let failed = [];
  let enriched = [];

  for (const shop of data) {
    const { address } = shop;
    const q = `${encodeURIComponent(address)}, Schweiz`;

    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${q}`);

    if (!response.ok) {
      console.info(response.url);
      console.info(`failed ${shop.name} (${response.status})!`);
      failed.push(shop);
      continue;
    }

    const { results } = await response.json();
    const [first] = results;

    if (!first) {
      console.info(`no results for ${shop.name}!`);
      failed.push(shop);
      continue;
    }

    const {
      geometry: { lat, lng },
      components: { state },
    } = first;

    enriched.push({
      ...mapVendor(shop),
      region: state === 'Zurich' ? 'Zürich' : state,
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    });
  }

  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  // const [timestamp] = new Date().toISOString().split('.');

  const { deletedCount } = await client.db('shops').collection('shops').deleteMany({ tenant: 'SFY' });
  const { insertedCount } = await client.db('shops').collection('shops').insertMany(enriched);

  await client.close();

  console.info(`Removed: ${deletedCount}, inserted ${insertedCount} vendors.`);
  console.info(`Failed imports: ${failed.length}`);

  // console.log(enriched);
  process.exit(0);
})();
