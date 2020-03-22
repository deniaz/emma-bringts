const { MongoClient } = require('mongodb');
require('dotenv').config();
const converter = require('csvtojson');
const fetch = require('node-fetch');

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const file = './data/zueri-markt_20200322-2229.csv';

(async function () {
  const data = await converter().fromFile(file);
  let enriched = [];

  for (const shop of data) {
    const address = shop.address;

    if (!address) {
      console.info(`No address for ${shop.vendor}`);
      continue;
    }

    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${address}`);

    if (!response.ok) {
      console.info(`failed ${shop.vendor}!`);
      continue;
    }

    const { results } = await response.json();
    const [first] = results;

    if (!first) {
      console.info(`no results for ${shop.vendor}!`);
      continue;
    }

    const { lat, lng } = first.geometry;

    const geo = enriched.push({
      ...shop,
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

  console.info(`succeeded for ${enriched.length} shops`);

  process.exit(0);
})();
