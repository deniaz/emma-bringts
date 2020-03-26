import { MongoClient } from 'mongodb';

export const getClient = async () => {
  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  return client;
};
