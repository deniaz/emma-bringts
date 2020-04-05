import { FC, ReactNode } from 'react';
import cn from '../../utils/classname';

const styles = {
  title: 'text-2xl font-bold leading-tight md:text-2xl',
};

type Props = { children: ReactNode; className?: string };

export const Headline: FC<Props> = ({ children, className }) => (
  <h3 className={cn([styles.title, className])}>{children}</h3>
);
