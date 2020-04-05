import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const SearchResults: FC = ({ children }) => (
  <section className="bg-emma-blue-400">
    <div className="container emma-container search-results">{children}</div>
  </section>
);
