import { FC, ReactNode } from 'react';

const styles = {
  link: 'text-indigo-500 underline hover:text-indigo-600 active:bg-indigo-700 transition-colors duration-200 ease-in-out',
};

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
};

export const Hyperlink: FC<Props> = ({ children, href, className }) => (
  <a className={[className, styles.link].filter(Boolean).join(' ')} href={href}>
    {children}
  </a>
);
