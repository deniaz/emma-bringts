import { FC, ReactNode } from 'react';

const styles = {
  text: 'font-sans text-indigo-900 text-base font-light',
};

type Props = {
  children: ReactNode;
  className?: string;
};

export const BodyText: FC<Props> = ({ children, className }) => (
  <p className={[className, styles.text].filter(Boolean).join(' ')}>{children}</p>
);
