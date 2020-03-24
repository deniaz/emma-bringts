import { MongoClient } from 'mongodb';
import { MongoVendor } from '../entities/vendor';

export const getShopsCollection = async () => {
  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db('shops');
  return db.collection<MongoVendor>('shops');
};
