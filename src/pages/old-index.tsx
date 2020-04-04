import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from '../components/card';
import { Search } from '../components/search';
import { Intro } from '../compositions/intro';
import { Button } from '../elements/button';
import { useGetCurrentPosition } from '../hooks/use-get-current-position';
import { BodyText } from '../identity/typography/body-text';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

const styles = {
  label: 'text-center font-sans',
  search: 'py-4',
};

export default () => {
  const [service, setService] = useState<'DELIVERY' | 'TAKEAWAY'>('TAKEAWAY');
  const [zip, setZip] = useState<string>('');

  const [, postcode] = useGetCurrentPosition();
  const router = useRouter();

  function dispatch() {
    const baseUrl = `/suche?services=${service}`;
    const fullUrl = zip ? `${baseUrl}&zip=${zip}` : baseUrl;

    router.push(fullUrl);
  }

  useEffect(() => {
    if (zip === '' && postcode !== '') {
      setZip(postcode);
    }
  }, [postcode]);

  return (
    <Stacked title="Emma bringts! - Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.">
      <Intro />

      <p className={styles.label}>Finde Angebote in deiner Nähe </p>
      <Search
        onChange={(zip) => setZip(zip)}
        onToggle={(service) => setService(service)}
        service={service}
        zip={zip}
        onClick={dispatch}
        className={styles.search}
      />

      <Card
        action={
          <Link href="/mitmachen" passHref>
            <Button type="link">Mitmachen</Button>
          </Link>
        }
      >
        <Headline>Hat dein Geschäft noch geöffnet?</Headline>
        <BodyText>
          Mit deinem Eintrag auf Emma bringts! ist dein Abhol- oder Lieferservice für alle klar ersichtlich.
        </BodyText>
      </Card>
    </Stacked>
  );
};
