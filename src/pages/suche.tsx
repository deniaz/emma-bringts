import { useRouter } from 'next/router';
import { SearchWithResults } from '../compositions/search-with-results';
import { Stacked } from '../layout/stacked';
import { getClient } from '../services/mongo';

export async function getServerSideProps() {
  const client = await getClient();
  const categories = await client.db('shops').collection('shops').distinct('categories');
  client.close();

  return {
    props: { categories },
  };
}

export default ({ categories }) => {
  const { query } = useRouter();
  return (
    <Stacked title="Anbieter und Angebote - Emma bringts!">
      <SearchWithResults categories={categories} query={query} />
    </Stacked>
  );
};
