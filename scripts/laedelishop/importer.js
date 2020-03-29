const { MongoClient } = require('mongodb');
require('dotenv').config();
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const { getGeoData } = require('../helpers');

const TENANT = 'LAEDELISHOP';
const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const parseContacts = (html) => {
  const email = getInnerHtml(html, '.wcv-widget-store-email');
  const phone = getInnerHtml(html, '.wcv-widget-store-phone');

  return [email, phone].filter(Boolean);
};

const parseCategories = (html) => {
  const regex = new RegExp('"content_category": "(.*)",');
  const match = regex.exec(html);

  if (match && match.length) {
    return [match[1]];
  } else {
    console.log(`No category for ${getInnerHtml(html, '.store-name')}`);
  }
};

const parseOrders = (html) => {
  const orders = [];

  const email = getInnerHtml(html, '.wcv-widget-store-email');
  const phone = getInnerHtml(html, '.wcv-widget-store-phone');

  if (!!phone) {
    orders.push('PHONE');
  }
  if (!!email) {
    orders.push('EMAIL');
  }

  return orders;
};

const getInnerHtml = (html, selector) => {
  const el = html.querySelector(selector);

  if (el) {
    return el.innerHTML.replace('&nbsp;', ' ').replace('&amp;', '&');
  }
  return '';
};

const getAddress = (html) => {
  const address = [];

  address.push(getInnerHtml(html, '.wcv-widget-store-address1'));
  address.push(`${getInnerHtml(html, '.wcv-widget-store-post-code')} ${getInnerHtml(html, '.wcv-widget-store-city')}`);

  return address;
};
const mapVendor = (doc) => {
  const html = parse(doc);

  return {
    name: getInnerHtml(html, '.store-name'),
    body: getInnerHtml(html, '.wcv-store-description p'),
    address: getAddress(html),
    service: ['DELIVERY_MAIL'], // TODO: Is this true?
    categories: parseCategories(html),
    contact: parseContacts(html),
    hours: [],
    order: parseOrders(html),
    region: 'Winterthur',
    tenant: TENANT,
  };
};

const parseUrls = (doc) => {
  const html = parse(doc);

  return html.querySelectorAll('.vendor-card a').map((el) => {
    return el.getAttribute('href');
  });
};

(async function () {
  const response = await fetch('https://laedelishop.ch/laedelis/');

  const urls = parseUrls(await response.text());

  const enriched = [];
  const failed = [];

  for (let i = 0; i < urls.length; i++) {
    const response = await fetch([urls[i]]);
    const document = await response.text();

    const vendor = mapVendor(document);
    const geoData = await getGeoData(vendor.address, API_KEY);

    if (!geoData) {
      failed.push(vendor);
      return;
    }

    const { state, lat, lng } = geoData;

    enriched.push({
      ...vendor,
      region: state === 'Zurich' ? 'Zürich' : state,
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    });
  }

  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  await client.db('shops').collection('shops').deleteMany({ tenant: TENANT });
  await client.db('shops').collection('shops').insertMany(enriched);

  await client.close();

  console.info(`succeeded for ${urls.length} shops`);
  console.info(`failed for ${failed.length} shops`);

  process.exit(0);
})();
