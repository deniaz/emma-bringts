import { useRouter } from 'next/router';
import { SearchWithResults } from '../../compositions/search-with-results';
import { Stacked } from '../../layout/stacked';

export async function getServerSideProps(context) {
  const { params, query } = context;
  return {
    props: { params, query },
  };
}

export default (props) => {
  const { params, query } = props;

  return (
    <Stacked title="Anbieter und Angebote - Emma bringts!">
      <SearchWithResults selectedCategory={params.id} query={query} />
    </Stacked>
  );
};
