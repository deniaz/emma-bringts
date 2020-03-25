import { FC } from 'react';
import { Illustration } from '../identity/illustration';
import { Lead } from '../identity/typography/lead';

const styles = {
  container: 'flex flex-col lg:flex-row mb-16',
  display: 'font-logo text-indigo-500 text-4xl lg:text-6xl mb-2',
  body: 'flex flex-col justify-center p-4 lg:p-0 lg:w-1/2',
  figure: 'lg:w-1/2',
  illustration: 'w-full',
};

export const Intro: FC = () => (
  <div className={styles.container}>
    <div className={styles.body}>
      <h1 className={styles.display}>Emma bringts!</h1>
      <Lead>
        Dank Covid-19 kaufen wir nicht mehr bei Tante Emma ein, sondern Emma bringts. emmabringts.ch ist ein
        Onlineverzeichnis von Einzelhändlern und Kleinlieferannt*Innen, die neu auf Liefer- und Takeawayservice angewiesen
        sind.
      </Lead>
    </div>
    <div className={styles.figure}>
      <Illustration className={styles.illustration} name="grandma" size={480} />
    </div>
  </div>
);
