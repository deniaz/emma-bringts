import { FC } from 'react';
import { Navigation } from '../components/navigation';
import { Display } from '../identity/typography/display';
import { Lead } from '../identity/typography/lead';

export const Hero: FC = () => (
  <div className="hero-section">
    <Navigation />

    <div className="container emma-container">
      <div className="hero-stage">
        <div className="text">
          <Display>Emma hat geschlossen :(</Display>

          <Lead>
            Mit schwerem Herzen haben wir uns dazu entschlossen, dass Emma zu schliessen. Andere Projekte konnten in der
            kurzen Zeit einen weitaus höheren Mehrwert für Unternehmen und Kunden generieren.
          </Lead>
          <Lead>Es war uns dennoch eine Freude. Bleibt gesund!</Lead>
        </div>

        <img className="img" src="/img/illus/illu-hero2.svg" alt="" />
      </div>
    </div>
  </div>
);
