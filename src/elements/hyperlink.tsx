import { FC, ReactNode } from 'react';
import cn from '../utils/classname';

const styles = {
  link: 'text-indigo-500 underline hover:text-indigo-600 active:bg-indigo-700 transition-colors duration-200 ease-in-out',
};

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
};
export const Hyperlink: FC<Props> = ({ children, href, className }) => (
  <a className={cn([className, styles.link])} href={href}>
    {children}
  </a>
);
