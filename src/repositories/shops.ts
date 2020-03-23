import { MongoClient } from 'mongodb';
import { Vendor } from '../entities/vendor';

const getByQuery = async (client: MongoClient, query: object) => {
  const db = client.db('shops');
  const collection = db.collection<Vendor>('shops');
  const docs = await collection.find(query).toArray();

  return JSON.parse(JSON.stringify(docs));
};

export const getAll = async (client: MongoClient, type: 'takeaway' | 'delivery') => {
  const docs = await getByQuery(client, {
    type: {
      $in:
        type === 'takeaway'
          ? ['Abholung', 'Hofladen', 'Selbst ernten']
          : ['Lieferung per Post', 'Lieferung per Velo / Auto'],
    },
  });

  return docs;
};

export const getByGeo = async (client: MongoClient, lat: number, lng: number, type: 'takeaway' | 'delivery') => {
  const docs = await getByQuery(client, {
    type: {
      $in:
        type === 'takeaway'
          ? ['Abholung', 'Hofladen', 'Selbst ernten']
          : ['Lieferung per Post', 'Lieferung per Velo / Auto'],
    },
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
