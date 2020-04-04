import { SearchWithResults } from '../compositions/search-with-results';

export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}

export default ({ query }) => {
  return <SearchWithResults query={query} />;
};
