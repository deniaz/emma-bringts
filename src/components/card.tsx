import { FC, ReactNode } from 'react';

const styles = {
  container: 'bg-white mx-auto w-1/2 rounded-md p-8 flex-row flex',
  body: 'pr-4',
  button: 'flex-col justify-center flex',
};

type Props = {
  children: ReactNode;
  action: ReactNode;
};

export const Card: FC<Props> = ({ action, children }) => (
  <div className={styles.container}>
    <div className={styles.body}>{children}</div>
    <div className={styles.button}>{action}</div>
  </div>
);
