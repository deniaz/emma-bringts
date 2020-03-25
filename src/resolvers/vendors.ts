import fetch from 'node-fetch';
import { MongoVendor, Vendor } from '../entities/vendor';
import { VendorInput } from '../schemas/graphql';
import { getShopsCollection } from '../services/mongo';

const API_KEY = process.env.OPENCAGEDATA_API_KEY;

const buildQuery = async ({ service, tenants, zip }: VendorInput['filter']) => {
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
  create: async ({ vendor }: { vendor: Vendor }): Promise<Vendor> => {
    const insertion = await buildInsert(vendor);

    const collection = await getShopsCollection();

    const {
      ops: [created],
    } = await collection.insert(insertion as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    const { _id, ...doc } = created;

    return {
      id: _id,
      ...doc,
    };
  },
  vendors: async ({ filter = {} }: VendorInput): Promise<Vendor[]> => {
    const collection = await getShopsCollection();
    const query = await buildQuery(filter);
    const docs = await collection.find(query).toArray();

    return docs.map(({ _id, ...doc }) => ({
      id: _id,
      ...doc,
    }));
  },
};
