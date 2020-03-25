import { FC, ReactNode } from 'react';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

type Props = {
  children: ReactNode;
};

const styles = { container: 'bg-gray-100 box-border px-8 lg:px-0', main: 'py-8 max-w-screen-xl mx-auto box-border' };

export const Stacked: FC<Props> = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);
