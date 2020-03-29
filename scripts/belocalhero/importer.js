const { MongoClient } = require('mongodb');
require('dotenv').config();
const fetch = require('node-fetch');

const TENANT = 'BELOCALHERO';

const toService = (delivery) =>
  (delivery || []).map((d) => {
    switch (d) {
      case 'Abholen':
        return 'TAKEAWAY';
      case 'Post':
        return 'DELIVERY_MAIL';
      case 'Briefkastenlieferung':
        return 'DELIVERY';
      case 'Selbst ernten':
        return 'SELF_SERVICE';
      case 'Online-Streaming':
        return 'TAKEAWAY'; // TODO: Define: ONLINE?
    }
  });

const mapHours = (from, to) => {
  return [from, to].map((h) => {
    const isPM = h.indexOf('pm') >= 0;
    const [before, after] = h.split(':');

    return `${parseInt(before) + (isPM ? 12 : 0)}:${after}`.replace('am', '').replace('pm', '');
  });
};

const mapRegion = (address) => {
  const splittedAddress = address.split(', ');

  if (splittedAddress.length > 1) {
    return splittedAddress[1].substr(splittedAddress[1].indexOf(' '));
  }
};

const mapVendor = (doc) => ({
  name: doc.title.rendered,
  service: toService(doc.delivery).filter(Boolean),
  body: doc.description,
  address: doc.address.address.split(', '),
  categories: doc.category,
  contact: [doc.phone_number, doc.email, doc.website].filter(Boolean),
  hours: [mapHours(doc.hr_from, doc.hr_to).join(` - `)],
  order: [], // TODO: Map
  region: mapRegion(doc.address.address),
  location: {
    type: 'Point',
    coordinates: [parseFloat(doc.address.lat), parseFloat(doc.address.lng)],
  },
  tenant: TENANT,
  images: doc.images,
});

(async function () {
  let batch = 1;
  let batchSize = 100;
  let data = [];
  while (true) {
    const fetchedData = await fetch(
      `https://belocalhero.com/wordpress-api/live/wp-json/wp/v2/place?token=null&per_page=${batchSize}&page=${batch}`
    );
    const json = await fetchedData.json();

    console.log(json);
    data = [...data, ...json];

    if (json.length < batchSize) {
      break;
    }

    batch++;
  }

  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  await client.db('shops').collection('shops').deleteMany({ tenant: TENANT });
  await client.db('shops').collection('shops').insertMany(data.map(mapVendor));

  await client.close();

  console.info(`succeeded for ${data.length} shops`);

  process.exit(0);
})();
