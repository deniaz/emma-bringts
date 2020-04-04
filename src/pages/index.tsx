import { GetServerSideProps } from 'next';
import { useEffect, useMemo } from 'react';
import useSWR, { responseInterface, useSWRPages } from 'swr';
import { Vendor } from '../components/vendor';
import { Hero } from '../compositions/hero';
import { SearchResults } from '../compositions/search-results';
import { Tag } from '../elements/tag';
import { ZipSearch } from '../elements/zip-search';
import { Vendor as VendorType } from '../entities/vendor';
import { useGetCurrentPosition } from '../hooks/use-get-current-position';
import { getArrayFromQuery, useQueryParamState } from '../hooks/use-query-param-state';
import { Stacked } from '../layout/stacked';
import { fetcher } from '../services/api';

const styles = {
  zipContainer: 'my-20',
};

const query = `query Vendors($service: [Service!], $zip: Int, $tenants: [Tenant!], $categories: [String], $skip: Int!, $limit: Int!) {
  vendors(filter: {service: $service, tenants: $tenants, zip: $zip, categories: $categories}, skip: $skip, limit: $limit) {
    id
    name
    categories
    body
    service
    hours
    address
    contact
  }
  categories(filter:{service: $service, tenants: $tenants, zip: $zip})
  total
}`;

export default ({ zip = '', categories = [] }) => {
  const initial = { zip, categories };
  const [state, dispatch] = useQueryParamState(initial);
  const [, postcode] = useGetCurrentPosition();

  const { pages, pageSWRs, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
    'vendors',
    ({ offset, withSWR }) => {
      if (!state.zip) {
        return null;
      }

      const variables = useMemo(() => {
        const params = { categories: state.categories, limit: 10, skip: offset || 0 };

        if (state.zip) {
          params['zip'] = parseInt(state.zip, 10);
        }

        return params;
      }, [state.zip, state.categories]);

      const { data } = withSWR(useSWR([query, variables], fetcher)) as responseInterface<
        { vendors: VendorType[]; total: number },
        unknown
      >;

      if (!data) {
        return null;
      }

      const { vendors } = data;

      return vendors.map(({ name, id, categories, contact, hours, address, body }) => (
        <Vendor key={id} name={name} body={body} categories={categories} hours={hours} address={address} contact={contact} />
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

  function submit(value: string) {
    dispatch({
      type: 'SET',
      key: 'zip',
      value,
    });
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

  return (
    <Stacked title="Emma bringts! - Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.">
      <Hero
        search={
          <div className={styles.zipContainer}>
            <ZipSearch initial={state.zip} onChange={submit} />
          </div>
        }
        title={`${total ? `${total} ` : ''}Angebote${zip && ` in der Region ${zip}`}`}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        {filters.map(({ label, value }) => (
          <Tag active={state.categories.includes(value)} key={value} label={label} onClick={() => toggleFilter(value)} />
        ))}
        <a href="#" className="category-item">
          Alle anzeigen
        </a>
      </Hero>
      <SearchResults>
        {pages}
        {!isReachingEnd && !isLoadingMore && (
          <button onClick={loadMore} className="btn m-auto block max-w-xs">
            Mehr anzeigen
          </button>
        )}
      </SearchResults>
    </Stacked>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { zip } = query;
  const categories = getArrayFromQuery(query, 'categories');

  if (zip) {
    return {
      props: {
        zip,
        categories,
      },
    };
  }

  return {
    props: {
      categories,
    },
  };
};

const filters = [
  {
    label: '🥖 Backwaren',
    value: 'Backwaren',
  },
  {
    label: '🥩 Fleischwaren',
    value: 'Fleischwaren',
  },
  {
    label: '🥦 Gemüse / Früchte',
    value: 'Gemüse / Früchte',
  },
  {
    label: '🌾 Grundnahrungsmittel',
    value: 'Grundnahrungsmittel',
  },
  {
    label: '🍝 Mahlzeiten',
    value: 'Mahlzeiten',
  },
  {
    label: '🍷 Spirituosen',
    value: 'Spirituosen',
  },
];
