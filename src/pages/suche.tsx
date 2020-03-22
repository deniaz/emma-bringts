import { MongoClient } from 'mongodb';
import { GetServerSideProps } from 'next';
import { Search } from '../components/search';
import { VendorList } from '../compositions/vendor-list';
import { Vendor } from '../entities/vendor';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

type Props = {
  vendors: Vendor[];
};

export default ({ vendors }: Props) => {
  return (
    <Stacked>
      <Search label={false} />
      <div>
        <Headline>Resultate</Headline>
        <VendorList vendors={vendors} />
      </div>
    </Stacked>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const lat = parseFloat(query['lat'].toString());
  const lng = parseFloat(query['lng'].toString());

  console.info(process.env.MONGO_DB_HOST);

  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db('shops');
  const collection = db.collection<Vendor>('shops');
  const docs = await collection
    .find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, lng],
            $maxDistance: 20000,
          },
        },
      },
    })
    .toArray();

  return { props: { vendors: JSON.parse(JSON.stringify(docs)) } };
};
