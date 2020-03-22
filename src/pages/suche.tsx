import { MongoClient } from 'mongodb';
import { GetServerSideProps } from 'next';
import { Search } from '../components/search';
import { VendorList } from '../compositions/vendor-list';
import { Vendor } from '../entities/vendor';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';
import { getAll, getByGeo } from '../repositories/shops';

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
  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  if (query['lat'] && query['lng']) {
    const lat = parseFloat(query['lat'].toString());
    const lng = parseFloat(query['lng'].toString());
    const vendors = await getByGeo(client, lat, lng);
    return { props: { vendors } };
  }

  const vendors = await getAll(client);
  return { props: { vendors } };
};
