import { request } from 'graphql-request';
import Head from 'next/head';
import useSWR from 'swr';
import { VendorList } from '../compositions/vendor-list';
import { MongoVendor } from '../entities/vendor';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

const styles = {
  header: 'px-4 box-border mt-4 lg:p-9 lg:m-0',
};

type Props = {
  vendors: MongoVendor[];
  zip?: string;
  type?: string;
};

const fetcher = (query: string) => request('/api/graphql', query);

export default () => {
  // const { query } = useRouter();

  const gql = `{
    vendors {
      id
      name
      categories
      body
      region
      service
      hours
      address
      order
      contact
    }
  }`;

  const { data, error } = useSWR(gql, fetcher);

  console.info({ data, error });
  return (
    <Stacked>
      <Head>
        <title>Alle Angebote - Emma bringts!</title>
      </Head>
      {/* <Search type={type === 'delivery' ? 'delivery' : 'takeaway'} zip={zip} label={false} /> */}

      <header className={styles.header}>
        <Headline>{data ? `${data.vendors.length} ` : ''}Resultate</Headline>
      </header>
      <VendorList vendors={data ? data.vendors : []} />
    </Stacked>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const client = new MongoClient(process.env.MONGO_DB_HOST, { useUnifiedTopology: true });
//   await client.connect();

//   if (query['lat'] && query['lng'] && query['zip'] && query['type']) {
//     const lat = parseFloat(query['lat'].toString());
//     const lng = parseFloat(query['lng'].toString());
//     const zip = query['zip'].toString();
//     const type = query['type'].toString() === 'delivery' ? 'delivery' : 'takeaway';

//     const vendors = await getByGeo(client, lat, lng, type);
//     return { props: { vendors, zip, type } };
//   }

//   const vendors = await getAll(client, 'takeaway');
//   return { props: { vendors } };
// };
