import { GetServerSideProps } from 'next';
import { Hero } from '../compositions/hero';
import { SearchResults } from '../compositions/search-results';
import { Spinner } from '../elements/spinner';
import { Tag } from '../elements/tag';
import { ZipSearch } from '../elements/zip-search';
import { getArrayFromQuery } from '../hooks/use-query-param-state';
import { useStatefulSearch } from '../hooks/use-stateful-search';
import { Stacked } from '../layout/stacked';

const styles = {
  zipContainer: 'my-20',
  spinner: 'fill-current align-center inline-flex',
};

export default ({ zip = '', categories = [] }) => {
  const requireZip = true;
  const [
    { state, total, pages, isReachingEnd, hasData, isLoadingMore },
    { submit, loadMore, toggleFilter },
  ] = useStatefulSearch(
    {
      zip,
      categories,
    },
    requireZip
  );

  return (
    <Stacked title="Emma bringts! - Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.">
      <Hero
        search={
          <div className={styles.zipContainer}>
            <ZipSearch initial={state.zip} onChange={submit}>
              {isLoadingMore && state.search === 'pending' ? (
                <Spinner className={styles.spinner} size={24} />
              ) : (
                'Anbieter finden'
              )}
            </ZipSearch>
          </div>
        }
        title={`${total ? `${total} ` : ''}Angebote${zip && ` in der Region ${zip}`}`}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
        {filters.map(({ label, value }) => (
          <Tag active={state.categories.includes(value)} key={value} label={label} onClick={() => toggleFilter(value)} />
        ))}
      </Hero>
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
