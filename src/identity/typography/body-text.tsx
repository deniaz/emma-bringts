import { FC, ReactNode } from 'react';
import cn from '../../utils/classname';

const styles = {
  text: 'font-sans text-indigo-900 text-base font-light',
};

type Props = {
  children: ReactNode;
  className?: string;
};
export const BodyText: FC<Props> = ({ children, className }) => <p className={cn([className, styles.text])}>{children}</p>;
