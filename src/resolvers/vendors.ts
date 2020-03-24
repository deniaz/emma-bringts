import { Vendor } from '../entities/vendor';
import { VendorInput } from '../schemas/graphql';
import { getShopsCollection } from '../services/mongo';

const key = process.env.OPENCAGEDATA_API_KEY;

const buildQuery = async ({ service, zip }: VendorInput['filter']) => {
  const criteria = {};

  if (service) {
    criteria['service'] = {
      $in: service,
    };
  }

  if (zip) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${zip}+schweiz`);

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

export const vendors = async ({ filter = {} }: VendorInput): Promise<Vendor[]> => {
  const collection = await getShopsCollection();
  const query = await buildQuery(filter);
  const docs = await collection.find(query).toArray();

  return docs.map(({ _id, ...doc }) => ({
    id: _id,
    ...doc,
  }));
};
