import { MongoClient } from 'mongodb';
import { Vendor } from '../entities/vendor';

const getByQuery = async (client: MongoClient, query: object) => {
  const db = client.db('shops');
  const collection = db.collection<Vendor>('shops');
  const docs = await collection.find(query).toArray();

  return JSON.parse(JSON.stringify(docs));
};

export const getAll = async (client: MongoClient) => {
  const docs = await getByQuery(client, {});

  return docs;
};

export const getByGeo = async (client: MongoClient, lat: number, lng: number) => {
  const docs = await getByQuery(client, {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lat, lng],
          $maxDistance: 20000,
        },
      },
    },
  });

  return docs;
};
