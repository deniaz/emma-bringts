import { FC, MouseEvent, ReactNode } from 'react';

const styles = {
  button:
    'px-6 py-4 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 focus:bg-indigo-700 transition-colors duration-200 ease-in-out',
};

type Props = {
  children: ReactNode;
  onClick?: (event: MouseEvent) => void;
  type?: 'button' | 'reset' | 'submit' | 'link';
  href?: string;
};

export const Button: FC<Props> = ({ children, onClick, href, type = 'button' }) => {
  if (type === 'link') {
    return (
      <a href={href} className={styles.button}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
