import { FC, ReactNode } from 'react';

const styles = {
  tag:
    'font-sans rounded-full bg-indigo-400 text-white text-xs font-normal py-1 px-4 mr-1 mb-1 flex-row fill-current inline-flex',
};

type Props = { children: ReactNode };

export const Tag: FC<Props> = ({ children }) => <span className={styles.tag}>{children}</span>;
