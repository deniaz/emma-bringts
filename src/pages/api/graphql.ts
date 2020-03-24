import { buildSchema, graphql } from 'graphql';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { Order, Service, Vendor as MongoVendor, Vendor } from '../../entities/vendor';

const schema = buildSchema(`
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
    vendors: [Vendor]!
  }
`);

const root = {
  vendors: async (): Promise<Vendor[]> => {
    const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('shops');
    const collection = db.collection<MongoVendor>('shops');
    const docs = await collection.find({}).toArray();

    const isValidService = (service: string): service is Service =>
      ['Abholung', 'Lieferung per Post', 'Lieferung per Velo / Auto', 'Selbst ernten'].includes(service);

    const toService = (service: string): Service => {
      switch (service) {
        case 'Abholung':
          return 'DELIVERY';
        case 'Lieferung per Post':
          return 'DELIVERY_MAIL';
        case 'Lieferung per Velo / Auto':
          return 'DELIVERY';
        case 'Selbst ernten':
          return 'SELF_SERVICE';
      }
    };

    const isValidOrder = (order: string): order is Order => ['Telefon', 'E-Mail', 'Webseite'].includes(order);

    const toOrder = (order: string): Order => {
      switch (order) {
        case 'Telefon':
          return 'PHONE';
        case 'E-Mail':
          return 'EMAIL';
        case 'Webseite':
          return 'WEBSITE';
      }
    };

    const trim = (text: string) => text.trim();
    const toArray = (text: string) => text.split(',');

    return docs.map((doc) => ({
      id: doc._id,
      name: doc.vendor,
      service: toArray(doc.type).filter(isValidService).map(toService),
      body: doc.offer,
      address: toArray(doc.address),
      categories: toArray(doc.category).map(trim),
      contact: toArray(doc.contact),
      hours: toArray(doc.hours).map(trim),
      order: toArray(doc.order_options).filter(isValidOrder).map(toOrder),
      region: doc.region,
    }));
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query;
  const response = await graphql(schema, query, root);

  return res.send(response);
};
