import { FC, ReactNode } from 'react';

const styles = {
  tag: 'rounded-full bg-indigo-500 text-white text-xs font-normal py-1 px-2 mr-1 mb-1',
};

type Props = { children: ReactNode };

export const Tag: FC<Props> = ({ children }) => <span className={styles.tag}>{children}</span>;
