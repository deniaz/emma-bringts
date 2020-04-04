import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Display: FC<Props> = ({ children }) => <h1 className="h1">{children}</h1>;
