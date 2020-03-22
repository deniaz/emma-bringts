import Head from 'next/head';
import Link from 'next/link';
import { Card } from '../components/card';
import { Search } from '../components/search';
import { Button } from '../elements/button';
import { Illustration } from '../identity/illustration';
import { BodyText } from '../identity/typography/body-text';
import { Headline } from '../identity/typography/headline';
import { Lead } from '../identity/typography/lead';
import { Stacked } from '../layout/stacked';

const styles = {
  display: 'font-logo text-indigo-500 text-6xl',
  stage: 'flex flex-row mb-16',
  body: 'flex flex-col justify-center',
  search: 'my-12 py-4',
  illustration: '',
};

export default () => (
  <Stacked>
    <Head>
      <title>Emma bringts!</title>
    </Head>
    <div className={styles.stage}>
      <div className={styles.body}>
        <h1 className={styles.display}>Emma bringts!</h1>
        <Lead>
          Dank Covid-19 kaufen wir nicht mehr bei Tante Emma ein, sondern Emma bringts. emmabringts.ch ist ein
          Onlineverzeichnis von Einzelhändlern und Kleinlieferannt*Innen, die neu auf Liefer- und Takeawayservice angewiesen
          sind.
        </Lead>
      </div>
      <div className={styles.illustration}>
        <Illustration name="grandma" size={480} />
      </div>
    </div>

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
