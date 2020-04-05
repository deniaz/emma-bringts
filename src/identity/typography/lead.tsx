import { FC, ReactNode } from 'react';

const styles = {
  text: 'font-sans text-gray-900 text-base font-medium md:text-lg',
};

type Props = { children: ReactNode };

export const Lead: FC<Props> = ({ children }) => <p className={styles.text}>{children}</p>;
