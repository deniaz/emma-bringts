import { FC } from 'react';
import { Logo } from '../identity/logo';
import Link from 'next/link';
type Props = {};

const styles = {
  header: 'bg-white py-2 px-4',
  nav: '',
};

export const Header: FC<Props> = () => (
  <header className={styles.header}>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
    <nav className={styles.nav}></nav>
  </header>
);
