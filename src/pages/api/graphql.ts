import { graphql } from 'graphql';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { vendors } from '../../resolvers/vendors';
import { schema } from '../../schemas/graphql';
import { getClient } from '../../services/mongo';

const root = {
  ...vendors,
};

export type Context = {
  client: MongoClient;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query;
  const variables = req.body.variables;

  const client = await getClient();

  const response = await graphql(schema, query, root, { client }, variables);

  await client.close();

  return res.send(response);
};
