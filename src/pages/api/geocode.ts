import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async ({ query }: NextApiRequest, res: NextApiResponse) => {
  const key = process.env.OPENCAGEDATA_API_KEY;

  if (query['zip']) {
    const zip = query['zip'].toString();
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${zip}+schweiz`);

    if (!response.ok) {
      res.statusCode = 404;
      res.end();
    }

    const { results } = await response.json();
    const [{ geometry }] = results;

    res.statusCode = 200;
    res.end(JSON.stringify(geometry));
  }

  if (query['lat'] && query['lng']) {
    const lat = query['lat'].toString();
    const lng = query['lng'].toString();
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${key}&q=${lat}+${lng}`);

    if (!response.ok) {
      res.statusCode = 404;
      res.end();
    }

    const { results } = await response.json();
    const [
      {
        components: { postcode },
      },
    ] = results;

    res.statusCode = 200;
    res.end(JSON.stringify({ postcode }));
  }

  res.statusCode = 400;
  res.end();
};
