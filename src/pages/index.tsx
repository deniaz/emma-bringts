import Head from 'next/head';
import Link from 'next/link';
import { Card } from '../components/card';
import { Search } from '../components/search';
import { Intro } from '../compositions/intro';
import { Button } from '../elements/button';
import { BodyText } from '../identity/typography/body-text';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

const styles = {
  search: 'my-12 py-4',
};

export default () => (
  <Stacked>
    <Head>
      <title>Emma bringts!</title>
    </Head>
    <Intro />

    <Search className={styles.search} label />

    <Card
      action={
        <Link href="/registrieren" passHref>
          <Button type="link">Mitmachen</Button>
        </Link>
      }
    >
      <Headline>Möchtest auch du zeigen, dass du aktuell lieferst?</Headline>
      <BodyText>Emma bringts! ist für alle gratis</BodyText>
    </Card>
  </Stacked>
);
