import { FC } from 'react';
import { Logo } from '../identity/logo';

const styles = {
  container: 'w-full bg-gray-200 py-8 px-12 mt-16 text-center',
  logo: '',
  message: 'font-sans text-base font-thin tracking-tight',
  github: 'font-sans text-sm text-gray-600 mt-4 inline-block',
};

export const Footer: FC = () => (
  <footer className={styles.container}>
    <Logo className={styles.logo} />
    <p className={styles.message}>Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.</p>
    <a className={styles.github} href="https://github.com/deniaz/emma-bringts">
      Emma bringts! auf GitHub
    </a>
  </footer>
);
