import { FC } from 'react';

const styles = {
  container: 'w-full bg-gray-200 py-8 px-12 mt-16',
  message: 'font-sans text-base font-thin tracking-tight text-center',
};

export const Footer: FC = () => (
  <footer className={styles.container}>
    <p className={styles.message}>asdfasdf</p>
  </footer>
);
