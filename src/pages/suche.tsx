import { request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Search } from '../components/search';
import { VendorList } from '../compositions/vendor-list';
import { useGetCurrentPosition } from '../hooks/use-get-current-position';
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

  const [service, setService] = useState<'DELIVERY' | 'TAKEAWAY'>('TAKEAWAY');
  const [zip, setZip] = useState<string>('');

  const [, postcode] = useGetCurrentPosition();

  useEffect(() => {
    if (query['zip']) {
      setZip(query['zip'].toString());
    }

    if (query['services'] && query['services'].toString() === 'DELIVERY') {
      setService('DELIVERY');
    }
  }, [query]);

  useEffect(() => {
    if (zip === '' && postcode !== '') {
      setZip(postcode);
    }
  }, [postcode]);

  const variables = useMemo(() => {
    if (zip) {
      return {
        service,
        zip: parseInt(zip, 10),
      };
    }

    return { service };
  }, [zip, service]);

  const { data } = useSWR([getVendors, variables], fetcher);

  return (
    <Stacked>
      <Head>
        <title>Alle Angebote - Emma bringts!</title>
      </Head>

      <Search onChange={(zip) => setZip(zip)} onToggle={(service) => setService(service)} service={service} zip={zip} />

      <header className={styles.header}>
        <Headline>
          {data && `${data.vendors.length} `}Resultate{zip && ` in ${zip}`}
        </Headline>
      </header>
      {!data && <span>Emma lädt...</span>}
      {data && <VendorList vendors={data.vendors} />}
    </Stacked>
  );
};
