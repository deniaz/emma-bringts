import { FC, ReactNode } from 'react';
import { Navigation } from '../components/navigation';
import { Display } from '../identity/typography/display';
import { Lead } from '../identity/typography/lead';

type Props = {
  title: string;
  search: ReactNode;
  children: ReactNode;
};

export const Hero: FC<Props> = ({ title, search, children }) => (
  <div className="hero-section">
    <Navigation />

    <div className="container emma-container">
      <div className="hero-stage">
        <div className="text">
          <Display>Unterstütze den lokalen Handel!</Display>

          <Lead>
            Finde Unternehmen, die während der ausserordentlichen Lage Ihre Produkte zum Abholen oder sogar eine
            Heimlieferung anbieten.
          </Lead>
        </div>
        <div className="img">
          <img src="/img/hero-illu.svg" alt="" />
        </div>
      </div>

      {search}

      <h2 className="text-center text-3xl font-semibold">{title}</h2>
    </div>
    <div className="container category-outer">
      <div className="category-container">{children}</div>
    </div>
  </div>
);
