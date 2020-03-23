import { MongoClient } from 'mongodb';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Search } from '../components/search';
import { VendorList } from '../compositions/vendor-list';
import { Vendor } from '../entities/vendor';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';
import { getAll, getByGeo } from '../repositories/shops';

const styles = {
  header: 'px-4 box-border mt-4 lg:p-9 lg:m-0',
};

type Props = {
  vendors: Vendor[];
  zip?: string;
};

export default ({ vendors, zip }: Props) => {
  return (
    <Stacked>
      <Head>
        <title>Emma bringts! - {zip ? `Angebote in ${zip}` : 'Alle Angebote'}</title>
      </Head>
      <Search zip={zip} label={false} />

      <header className={styles.header}>
        <Headline>Resultate{zip && ` in der Nähe ${zip}`}</Headline>
      </header>
      <VendorList vendors={vendors} />
    </Stacked>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
  await client.connect();

  if (query['lat'] && query['lng'] && query['zip']) {
    const lat = parseFloat(query['lat'].toString());
    const lng = parseFloat(query['lng'].toString());
    const zip = query['zip'].toString();

    const vendors = await getByGeo(client, lat, lng);
    return { props: { vendors, zip } };
  }

  const vendors = await getAll(client);
  return { props: { vendors } };
};
