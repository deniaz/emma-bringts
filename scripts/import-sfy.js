const { MongoClient } = require('mongodb');
require('dotenv').config();
const converter = require('csvtojson');
const { getGeoData } = require('./helpers');

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const file = './data/SFY 2020-04-05 - SFY 2020-04-05.csv';

const isValidService = (service) =>
  ['Abholung', 'Lieferung per Post', 'Lieferung per Velo / Auto', 'Selbst ernten'].includes(service);

const toService = (service) => {
  switch (service) {
    case 'Abholung':
      return 'TAKEAWAY';
    case 'Lieferung':
      return 'DELIVERY_MAIL';
    case 'Versand':
      return 'DELIVERY';
    case 'Selbstbedienung':
      return 'SELF_SERVICE';
  }
};

const trim = (text) => text.trim();
const toArray = (text) => text.split(',');
const lower = (text) => text.toLowerCase();

// name,address,zip,locality,category,body,service,hours,order,email,phone,website
const mapVendor = (doc) => ({
  name: doc.name,
  categories: toArray(doc.categories)
    .map(trim)
    .filter((el) => el !== ''),
  body: doc.body,
  service: toArray(doc.service).filter(isValidService).map(toService),
  hours: toArray(doc.hours).map(trim),
  address: toArray(doc.address).map(trim),
  contact: [doc.email, doc.phone, doc.website]
    .map(trim)
    .filter((el) => el !== '')
    .map(lower),
  tenant: 'SFY',
});

(async function () {
  const data = await converter().fromFile(file);
  let failed = [];
  let enriched = [];

  for (const shop of data) {
    const { address } = shop;

    const geoData = await getGeoData(address, API_KEY);

    if (!geoData) {
      failed.push(shop);
      continue;
    }

    const { state, lat, lng } = geoData;

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
