import { FC, ReactNode } from 'react';

const styles = {
  container: 'bg-white mx-auto w-full lg:w-1/2 rounded-md p-8 flex-col lg:flex-row flex',
  body: 'lg:pr-4 mb-10 lg:m-0',
  button: 'mx-auto lg:flex-col lg:justify-center lg:flex',
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
