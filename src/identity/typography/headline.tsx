import { FC } from 'react';

const styles = {
  title: 'text-indigo-900 text-2xl font-bold mb-4',
};

export const Headline: FC = ({ children }) => <h3 className={styles.title}>{children}</h3>;
