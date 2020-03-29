const { MongoClient } = require('mongodb');
require('dotenv').config();
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const { getGeoData } = require('../helpers');

const TENANT = 'LOKALLOYAL';
const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const toService = (delivery) => {
  switch (delivery) {
    case 'Abholung':
      return 'TAKEAWAY';
    case 'Versand':
      return 'DELIVERY_MAIL';
    case 'Lieferservice':
      return 'DELIVERY';
  }
};

const parseContacts = (html) => {
  const website = html.querySelector('.company-website').getAttribute('href');
  const otherContacts = html.querySelectorAll('.orderTypes a').map((el) => {
    return el.getAttribute('href').replace('tel:', '').replace('mailto:', '');
  });

  return [website, ...otherContacts].filter(Boolean);
};

const parseOrders = (html) => {
  const orders = [];
  if (html.querySelector('.company-website').getAttribute('href')) {
    orders.push('WEBSITE');
  }
  html.querySelectorAll('.orderTypes a').map((el) => {
    if (el.getAttribute('href').indexOf('tel:') >= 0) {
      orders.push('PHONE');
    }
    if (el.getAttribute('href').indexOf('mailto:') >= 0) {
      orders.push('EMAIL');
    }
  });

  return orders.filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);
};

const parseServices = (html) => {
  return html.querySelectorAll('.deliveryTypes span').map((el) => {
    return toService(el.innerHTML);
  });
};

const getInnerHtml = (html, selector) => {
  const el = html.querySelector(selector);

  if (el) {
    return el.innerHTML.replace('&nbsp;', ' ').replace('&amp;', '&');
  }
  return '';
};

const getAddress = (html) => {
  const address = getInnerHtml(html, '.company-address');

  if (address) {
    return address.split(', ');
  }

  return [];
};
const mapVendor = (doc) => {
  const html = parse(doc);

  return {
    name: getInnerHtml(html, '.heading-1'),
    service: parseServices(html).filter(Boolean),
    body: getInnerHtml(html, '.company-description p'),
    address: getAddress(html),
    categories: [getInnerHtml(html, '.mainCategory-link')],
    contact: parseContacts(html),
    hours: [],
    order: parseOrders(html),
    region: 'Winterthur',
    tenant: TENANT,
  };
};

const parseUrls = (posts) => {
  return posts.map((p) => {
    const html = parse(p.item);
    const link = html.querySelector('.companyTeaser-link').getAttribute('href');

    return link;
  });
};

(async function () {
  let batch = 1;
  let batchSize = 12;
  let urls = [];
  while (true) {
    const fetchedData = await fetch('https://www.lokal-loyal.ch/wp-json/theme-list-filter/v1/posts', {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      body: `{"postType":"company","postsPerPage":${batchSize},"terms":[],"page":${batch}}`,
      method: 'POST',
    });
    const json = await fetchedData.json();

    urls = [...urls, ...parseUrls(json.posts)];

    if (json.posts.length < batchSize) {
      break;
    }

    batch++;
  }

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
