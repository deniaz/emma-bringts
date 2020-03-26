import { request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import { ParsedUrlQuery } from 'querystring';
import { FC, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Search } from '../components/search';
import { useGetCurrentPosition } from '../hooks/use-get-current-position';
import { Headline } from '../identity/typography/headline';
import { VendorList } from './vendor-list';

const styles = {
  header: 'px-4 box-border mt-4 lg:p-9 lg:m-0',
};

const fetcher = (query: string, variables?: Variables) => request('/api/graphql', query, variables);

const getVendors = `query Vendors($service: [Service!], $zip: Int, $tenants: [Tenant!]) {
  vendors(filter: {service: $service, tenants: $tenants, zip: $zip}) {
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

type Props = {
  query: ParsedUrlQuery;
};

export const SearchWithResults: FC<Props> = ({ query }) => {
  const tenants = query['tenants'] && query['tenants'];

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
    const params = { service };

    if (tenants) {
      params['tenants'] = Array.isArray(tenants) ? tenants : [tenants];
    }

    if (zip) {
      params['zip'] = parseInt(zip, 10);
    }

    return params;
  }, [zip, service, tenants]);

  const { data } = useSWR([getVendors, variables], fetcher);

  return (
    <>
      <Search onChange={(zip) => setZip(zip)} onToggle={(service) => setService(service)} service={service} zip={zip} />

      <header className={styles.header}>
        <Headline>
          {data && `${data.vendors.length} `}Resultate{zip && ` in ${zip}`}
        </Headline>
      </header>
      {!data && <span>Emma lädt...</span>}
      {data && <VendorList vendors={data.vendors} />}
    </>
  );
};
