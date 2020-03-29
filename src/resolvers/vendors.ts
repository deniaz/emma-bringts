import fetch from 'node-fetch';
import { MongoVendor, Vendor } from '../entities/vendor';
import { Context } from '../pages/api/graphql';
import { VendorInput } from '../schemas/graphql';

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const buildQuery = async ({ service, tenants, zip, categories }: VendorInput['filter']) => {
  const criteria = {};

  if (service) {
    criteria['service'] = {
      $in: service,
    };
  }

  if (tenants) {
    criteria['tenant'] = {
      $in: tenants,
    };
  }

  if (categories && categories.length > 0) {
    criteria['categories'] = {
      $in: categories,
    };
  }

  if (zip) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${zip}+schweiz`);

    const { results } = await response.json();
    const [{ geometry }] = results;

    criteria['location'] = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [geometry.lat, geometry.lng],
          $maxDistance: 10000,
        },
      },
    };
  }

  return criteria;
};

const buildInsert = async (vendor: Vendor): Promise<Omit<MongoVendor, '_id'>> => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${encodeURIComponent(vendor.address.join(', '))}`
  );

  if (!response.ok) {
    return vendor;
  }

  const { results } = await response.json();
  const [first] = results;

  if (!first) {
    return vendor;
  }

  const { lat, lng } = first.geometry;

  return {
    ...vendor,
    tenant: 'EMMA',
    location: {
      type: 'Point',
      coordinates: [lat, lng],
    },
  };
};

export const vendors = {
  createVendor: async ({ vendor }: { vendor: Vendor }, { client }: Context): Promise<Vendor> => {
    const insertion = await buildInsert(vendor);

    const collection = client.db('shops').collection<MongoVendor>('shops');

    const {
      ops: [created],
    } = await collection.insert(insertion as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    const { _id, ...doc } = created;

    return {
      id: _id,
      ...doc,
    };
  },
  vendors: async ({ filter = {}, skip = 0, limit = 10 }: VendorInput, { client }: Context): Promise<Vendor[]> => {
    const collection = client.db('shops').collection<MongoVendor>('shops');

    const query = await buildQuery(filter);
    const docs = await collection.find(query).limit(limit).skip(skip).toArray();

    return docs.map(({ _id, ...doc }) => ({
      id: _id,
      ...doc,
    }));
  },
  total: async (_args, { client }: Context): Promise<number> => {
    const collection = client.db('shops').collection('shops');
    const count = await collection.countDocuments();

    return count;
  },
  categories: async (_args, { client }: Context): Promise<string[]> => {
    const categories = await client.db('shops').collection('shops').distinct('categories');
    return categories;
  },
};
