import Head from 'next/head';
import { FC, ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

const styles = { container: 'text-gray-900' };

export const Stacked: FC<Props> = ({ children, title }) => {
  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      // eslint-disable-next-line
      // @ts-ignore
      window.dataLayer.push(args);
    }
    gtag('js', new Date());

    gtag('config', 'UA-161893117-1');
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Ein Online-Verzeichnis von Unternehmen, die während der ausserordentlichen Lage und den vom Bundesrat definierten COVID-19-Massnahmen einen Abhol- oder Lieferservice anbieten."
        />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-161893117-1" />
      </Head>

      <main>{children}</main>
    </div>
  );
};
