import { graphql } from 'graphql';
import { NextApiRequest, NextApiResponse } from 'next';
import { vendors } from '../../resolvers/vendors';
import { schema } from '../../schemas/graphql';

const root = {
  ...vendors,
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.body.query;
  const variables = req.body.variables;

  const response = await graphql(schema, query, root, {}, variables);

  return res.send(response);
};
