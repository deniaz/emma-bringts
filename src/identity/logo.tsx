import { FC } from 'react';
import cn from '../utils/classname';

const styles = {
  logo: 'font-logo text-indigo-500 text-2xl',
};

type Props = {
  className?: string;
};

export const Logo: FC<Props> = ({ className }) => <span className={cn([styles.logo, className])}>Emma bringts!</span>;
