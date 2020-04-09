import Head from 'next/head';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

const styles = { container: 'text-gray-900' };

export const Stacked: FC<Props> = ({ children, title }) => (
  <div className={styles.container}>
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Ein Online-Verzeichnis von Unternehmen, die während der ausserordentlichen Lage und den vom Bundesrat definierten COVID-19-Massnahmen einen Abhol- oder Lieferservice anbieten."
      />
    </Head>

    <main>{children}</main>
    <div className="bg-emma-blue-400">
      <div className="container emma-container pb-24"></div>
    </div>
  </div>
);
