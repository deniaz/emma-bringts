import { FC, ReactNode } from 'react';

const styles = {
  text: 'font-sans text-2xl font-thin tracking-tight mb-4',
};

type Props = { children: ReactNode };

export const Lead: FC<Props> = ({ children }) => <p className={styles.text}>{children}</p>;
