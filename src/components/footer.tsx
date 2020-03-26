import { FC } from 'react';
import { Logo } from '../identity/logo';

const styles = {
  container: 'w-full bg-gray-200 py-8 px-12 mt-16 text-center',
  logo: '',
  message: 'font-sans text-base font-thin tracking-tight',
};

export const Footer: FC = () => (
  <footer className={styles.container}>
    <Logo className={styles.logo} />
    <p className={styles.message}>Ein Verzeichnis von Unternehmen mit Abhol- oder Lieferservice.</p>
  </footer>
);
