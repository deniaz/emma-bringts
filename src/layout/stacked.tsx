import Head from 'next/head';
import { FC, ReactNode, useEffect } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

type Props = {
  children: ReactNode;
  title: string;
};

const styles = { container: 'bg-gray-100 box-border', main: 'py-8 max-w-screen-xl mx-auto box-border' };

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
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
