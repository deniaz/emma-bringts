import { request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import useSWR from 'swr';
import { VendorList } from '../compositions/vendor-list';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

const styles = {
  header: 'px-4 box-border mt-4 lg:p-9 lg:m-0',
};

const fetcher = (query: string, variables?: Variables) => request('/api/graphql', query, variables);

const getVendors = `query Vendors($service: [Service!], $zip: Int) {
  vendors(filter: {service: $service, zip: $zip}) {
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

export default () => {
  const { query } = useRouter();

  const variables = useMemo(() => {
    const services = query['services'] || 'TAKEAWAY';
    const zip = query['zip'] && parseInt(query['zip'].toString(), 10);

    return {
      zip,
      service: Array.isArray(services) ? services : [services],
    };
  }, [query]);

  const { data } = useSWR([getVendors, variables], fetcher);

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
