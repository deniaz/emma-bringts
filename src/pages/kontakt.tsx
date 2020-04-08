import { Stacked } from '../layout/stacked';
import { Navigation } from '../components/navigation';
import Link from 'next/link';

export default () => (
  <Stacked title="Kontakt">

    <section className="bg-emma-blue-400">
    <Navigation />
      <div className="container emma-container h-screen">
        <h1>Kontakt</h1>
        <p>Hast du ein Anliegen? Schreib uns eine E-Mail an: <a href="mailto:hallo@emmabringts.ch">hallo@emmabringts.ch</a></p>
      </div>
    </section>

  </Stacked>
);