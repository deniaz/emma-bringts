import { Stacked } from '../layout/stacked';
import Head from 'next/head';
import { Lead } from '../identity/typography/lead';

export default () => (
  <Stacked>
    <Head>
      <title>Mach mit! - Emma bringts!</title>
    </Head>

    <div>
      <Lead>Kommt bald.</Lead>
    </div>
  </Stacked>
);
