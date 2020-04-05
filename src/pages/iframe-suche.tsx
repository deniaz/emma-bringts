import { GetServerSideProps } from 'next';
import { SearchResults } from '../compositions/search-results';
import { Spinner } from '../elements/spinner';
import { Tag } from '../elements/tag';
import { ZipSearch } from '../elements/zip-search';
import { getArrayFromQuery } from '../hooks/use-query-param-state';
import { useStatefulSearch } from '../hooks/use-stateful-search';
import { Stacked } from '../layout/stacked';
import cn from '../utils/classname';

const styles = {
  hero: 'py-16',
  spinner: 'fill-current align-center inline-flex',
};

export default ({ zip = '', categories = [], tenants = [] }) => {
  const [{ state, pages, isReachingEnd, hasData, isLoadingMore }, { submit, loadMore, toggleFilter }] = useStatefulSearch({
    zip,
    categories,
    tenants,
  });

  return (
    <Stacked title="Emma bringts! - Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.">
      <div className={cn(['hero-section', styles.hero])}>
        <div className="container emma-container">
          <ZipSearch initial={state.zip} onChange={submit}>
            {state.search === 'pending' ? <Spinner className={styles.spinner} size={24} /> : 'Anbieter finden'}
          </ZipSearch>
        </div>

        <div className="container category-outer">
          <div className="category-container">
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            {filters.map(({ label, value }) => (
              <Tag active={state.categories.includes(value)} key={value} label={label} onClick={() => toggleFilter(value)} />
            ))}
            <a href="#" className="category-item">
              Alle anzeigen
            </a>
          </div>
        </div>
      </div>

      <SearchResults>
        {pages}
        {!isReachingEnd && hasData && (
          <button onClick={loadMore} className="btn m-auto block max-w-xs">
            {isLoadingMore ? <Spinner className={styles.spinner} size={24} /> : 'Mehr anzeigen'}
          </button>
        )}
      </SearchResults>
    </Stacked>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { zip } = query;
  const categories = getArrayFromQuery(query, 'categories');
  const tenants = getArrayFromQuery(query, 'tenants');

  if (zip) {
    return {
      props: {
        zip,
        categories,
        tenants,
      },
    };
  }

  return {
    props: {
      categories,
      tenants,
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
