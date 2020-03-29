import { SearchWithResults } from '../compositions/search-with-results';
import { getClient } from '../services/mongo';

export async function getServerSideProps(context) {
  const client = await getClient();
  const categories = await client.db('shops').collection('shops').distinct('categories');
  client.close();

  return {
    props: { query: context.query, categories },
  };
}

export default ({ query, categories }) => {
  return <SearchWithResults categories={categories} query={query} />;
};
