import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new MongoClient(
    'mongodb+srv://emma:bringts!123@cluster0-ekjel.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  );
  await client.connect();

  const docs = client.db().collection('shops').find({});
  return docs;
};
