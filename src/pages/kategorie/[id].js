import { useRouter } from 'next/router';
import { SearchWithResults } from '../../compositions/search-with-results';
import { Stacked } from '../../layout/stacked';

export default () => {
  const { query } = useRouter();
  return (
    <Stacked title="Anbieter und Angebote - Emma bringts!">
      <SearchWithResults selectedCategory={query.id} query={query} />
    </Stacked>
  );
};
