import { FC, MouseEvent, ReactNode } from 'react';
import cn from '../utils/classname';

const styles = {
  button: 'text-white font-base bg-emma-purple-500 py-3 px-5 rounded text-center font-medium',
};

type Props = {
  className?: string;
  children: ReactNode;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
};

export const Button: FC<Props> = ({ className, children, onClick }) => (
  <button onClick={onClick} className={cn([className, styles.button])}>
    {children}
  </button>
);
