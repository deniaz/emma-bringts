import { buildSchema, graphql } from 'graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { Service, Vendor } from '../../entities/vendor';
import { getShopsCollection } from '../../services/mongo';

type VendorInput = {
  filter: {
    service?: Service[];
    geo?: {
      lat: number;
      lng: number;
      maxDistance?: number;
    };
  };
};

const schema = buildSchema(`
  input VendorFilterInput {
    service: [Service!]
    geo: VendorFilterGeoInput
  }

  input VendorFilterGeoInput {
    lat: Float!
    lng: Float!
    maxDistance: Int
  }

  enum Service {
    TAKEAWAY
    DELIVERY_MAIL
    DELIVERY
    SELF_SERVICE
  }

  enum Order {
    PHONE
    EMAIL
    WEBSITE
  }

  type Vendor {
    id: String!
    name: String!
    categories: [String]!
    body: String
    region: String
    service: [Service]!
    hours: [String]!
    address: [String]!
    order: [Order]!
    contact: [String]!
  }

  type Query {
    vendors(filter: VendorFilterInput): [Vendor]!
  }
`);

const root = {
  vendors: async ({ filter = {} }: VendorInput): Promise<Vendor[]> => {
    const criteria = {};

    if (filter.service) {
      criteria['service'] = {
        $in: filter.service,
      };
    }

    if (filter.geo) {
      criteria['location'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [filter.geo.lat, filter.geo.lng],
            $maxDistance: filter.geo.maxDistance || 10000,
          },
        },
      };
    }

    const collection = await getShopsCollection();
    const docs = await collection.find(criteria).toArray();

    return docs.map(({ _id, ...doc }) => ({
      id: _id,
      ...doc,
    }));
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);

  return res.send(response);
};
