import { FC, ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

type Props = {
  children: ReactNode;
  fullPage?: boolean;
};

const styles = { container: 'bg-gray-100 box-border', main: 'py-8 max-w-screen-xl mx-auto box-border' };

export const Stacked: FC<Props> = ({ children, fullPage = true }) => (
  <div className={styles.container}>
    {fullPage && <Header />}
    <main className={styles.main}>{children}</main>
    {fullPage && <Footer />}
  </div>
);
