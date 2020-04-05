import { useEffect, useMemo, useState } from 'react';
import useSWR, { responseInterface, useSWRPages } from 'swr';
import { ResultItem } from '../components/result-item';
import { Vendor } from '../entities/vendor';
import { fetcher } from '../services/api';
import { useGetCurrentPosition } from './use-get-current-position';
import { useQueryParamState } from './use-query-param-state';

const query = `query Vendors($service: [Service!], $zip: Int, $tenants: [Tenant!], $categories: [String], $skip: Int!, $limit: Int!) {
  vendors(filter: {service: $service, tenants: $tenants, zip: $zip, categories: $categories}, skip: $skip, limit: $limit) {
    id
    name
    categories
    body
    service
    hours
    address
    service
    contact
  }
  categories(filter:{service: $service, tenants: $tenants, zip: $zip})
  total
}`;

type Params = {
  zip?: string;
  categories?: string[];
  tenants?: string[];
};

export function useStatefulSearch({ zip = '', categories = [], tenants }: Params, requireZip = false) {
  const initial = tenants ? { tenants, zip, categories } : { zip, categories };
  const [state, dispatch] = useQueryParamState(initial);
  const [, postcode] = useGetCurrentPosition();
  const [search, setSearch] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const { pages, pageSWRs, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'vendors',
    ({ offset, withSWR }) => {
      if (requireZip && !state.zip) {
        return null;
      }

      const variables = useMemo(() => {
        const params = { categories: state.categories, limit: 10, skip: offset || 0 };

        if (state.tenants) {
          params['tenants'] = state.tenants;
        }

        if (state.zip) {
          params['zip'] = parseInt(state.zip, 10);
        }

        return params;
      }, [state.zip, state.categories, state.tenants]);

      const { data } = withSWR(useSWR([query, variables], fetcher)) as responseInterface<
        { vendors: Vendor[]; total: number },
        unknown
      >;

      if (!data) {
        return null;
      }

      const { vendors } = data;

      return vendors.map(({ name, id, categories, contact, hours, address, service, body }) => (
        <ResultItem
          key={id}
          name={name}
          body={body}
          categories={categories}
          hours={hours}
          services={service}
          address={address}
          contact={contact}
        />
      ));
    },
    ({ data }) => (data && data.vendors ? data.vendors.length : 0),
    [state.zip, state.categories]
  );

  useEffect(() => {
    if (postcode) {
      dispatch({
        type: 'SET',
        key: 'zip',
        value: postcode,
      });
    }
  }, [postcode]);

  useEffect(() => {
    if (!isLoadingMore) {
      setSearch('idle');
    }
  }, [isLoadingMore]);

  function submit(value: string) {
    if (value.length === 4 && value !== state.zip) {
      dispatch({
        type: 'SET',
        key: 'zip',
        value,
      });
      setSearch('pending');
    }
  }

  function toggleFilter(filter: string) {
    dispatch({
      type: 'SET',
      key: 'categories',
      value: state.categories.includes(filter)
        ? state.categories.filter((category) => category !== filter)
        : [...state.categories, filter],
    });
  }

  const [page] = pageSWRs;
  const total = page?.data?.total;
  const hasData = !!pageSWRs[0]?.data;

  return [
    { state: { ...state, search }, total, pages, isReachingEnd, hasData, isLoadingMore },
    { submit, loadMore, toggleFilter },
  ];
}
