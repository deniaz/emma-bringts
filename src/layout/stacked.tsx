import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

type Props = {
  children: ReactNode;
  title: string;
};

const styles = { container: 'bg-gray-100 box-border', main: 'py-8 max-w-screen-xl mx-auto box-border' };

export const Stacked: FC<Props> = ({ children, title }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Ein Online-Verzeichnis von Unternehmen, die während der ausserordentlichen Lage und den vom Bundesrat definierten COVID-19-Massnahmen einen Abhol- oder Lieferservice anbieten."
      />
    </Head>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);
