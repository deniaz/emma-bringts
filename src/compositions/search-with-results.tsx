import { request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import { ParsedUrlQuery } from 'querystring';
import { FC, useEffect, useMemo, useState } from 'react';
import useSWR, { responseInterface, useSWRPages } from 'swr';
import { Search } from '../components/search';
import { Vendor } from '../components/vendor';
import { Button } from '../elements/button';
import { Vendor as VendorType } from '../entities/vendor';
import { useGetCurrentPosition } from '../hooks/use-get-current-position';
import { Headline } from '../identity/typography/headline';
import { Selection } from './selection';
const styles = {
  header: 'px-4 box-border mt-4 lg:p-9 lg:m-0',
  button: 'text-center',
};

const fetcher = (query: string, variables?: Variables) => request('/api/graphql', query, variables);

const getVendors = `query Vendors($service: [Service!], $zip: Int, $tenants: [Tenant!], $categories: [String], $skip: Int!, $limit: Int!) {
  vendors(filter: {service: $service, tenants: $tenants, zip: $zip, categories: $categories}, skip: $skip, limit: $limit) {
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
  total
}`;

type Props = {
  query: ParsedUrlQuery;
  categories: string[];
};

export const SearchWithResults: FC<Props> = ({ query, categories }) => {
  const tenants = query['tenants'] && query['tenants'];

  const [service, setService] = useState<'DELIVERY' | 'TAKEAWAY'>('TAKEAWAY');
  const [zip, setZip] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

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

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'results',
    ({ offset, withSWR }) => {
      const variables = useMemo(() => {
        const params = { service, categories: categoryFilter, limit: 10, skip: offset || 0 };

        if (tenants) {
          params['tenants'] = Array.isArray(tenants) ? tenants : [tenants];
        }

        if (zip) {
          params['zip'] = parseInt(zip, 10);
        }

        return params;
      }, [zip, service, tenants, offset, categoryFilter]);

      const { data } = withSWR(useSWR([getVendors, variables], fetcher)) as responseInterface<
        { vendors: VendorType[]; total: number },
        unknown
      >;

      if (!data) {
        return null;
      }

      const { vendors } = data;

      return vendors.map(({ name, id, categories, contact, hours, address, body, order, region, service }) => (
        <Vendor
          key={id}
          title={name}
          region={region}
          tags={service}
          body={body}
          categories={categories}
          hours={hours}
          address={address}
          options={order}
          contact={contact}
        />
      ));
    },
    ({ data }) => {
      const offset = data && data.vendors ? data.vendors.length : 0;
      return offset;
    },
    [zip, service, tenants, categoryFilter]
  );

  return (
    <>
      <Search onChange={(zip) => setZip(zip)} onToggle={(service) => setService(service)} service={service} zip={zip} />

      <div>
        <Selection
          label="Filtern nach Kategorie"
          onChange={(event) =>
            categoryFilter.includes(event.target.value)
              ? setCategoryFilter(categoryFilter.filter((category) => category !== event.target.value))
              : setCategoryFilter([...categoryFilter, event.target.value])
          }
          options={categories.map((category) => ({
            label: category,
            value: category,
            name: 'category',
            checked: categoryFilter.includes(category),
          }))}
        />
      </div>

      <header className={styles.header}>
        <Headline>Händler{zip && ` in ${zip}`}</Headline>
      </header>
      {pages}
      <div className={styles.button}>
        {!isReachingEnd && (
          <Button onClick={loadMore} disabled={isLoadingMore}>
            {isLoadingMore ? 'Bin mehr Händler am suchen...' : 'Mehr Händler laden'}
          </Button>
        )}
      </div>
    </>
  );
};
