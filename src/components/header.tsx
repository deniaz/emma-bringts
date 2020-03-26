import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Logo } from '../identity/logo';
type Props = {};

const styles = {
  header: 'bg-white py-4 px-4',
  container: 'flex flex-row max-w-screen-xl mx-auto items-center justify-between',
  logo: '',
  nav: 'flex flex-row',
  item: 'inline-flex mx-4',
  link:
    'font-sans rounded-full text-sm text-indigo-900 hover:text-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-100 px-4 py-2',
  active: 'font-sans rounded-full text-sm text-indigo-600 transition duration-150 ease-in-out bg-indigo-100 px-4 py-2',
  button:
    'bg-indigo-500 text-white px-4 py-2 rounded-full font-sans text-sm transition duration-150 ease-in-out hover:bg-indigo-600 focus:bg-indigo-700',
};
export const Header: FC<Props> = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.item}>
              <Link href="/initiative">
                <a className={pathname === '/initiative' ? styles.active : styles.link}>Die Initiative</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/partner">
                <a className={pathname === '/partner' ? styles.active : styles.link}>Partnerangebote</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/kontakt">
                <a className={pathname === '/kontakt' ? styles.active : styles.link}>Kontakt</a>
              </Link>
            </li>
            <li className={styles.item}>
              <Link href="/mitmachen">
                <a className={styles.button}>Mitmachen</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
