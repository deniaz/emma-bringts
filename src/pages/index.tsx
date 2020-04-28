import { Hero } from '../compositions/hero';
import { Stacked } from '../layout/stacked';

const styles = {
  list: 'bg-emma-blue-400 py-16 ',
  container:
    'mb-8 bg-white rounded-lg block box-border px-8 py-10 text-gray-900 hover:shadow-xl transition-shadow duration-200 ease-in-out',
  title: 'mt-3 mb-4 w-3/4',
  description: 'mb-6 w-3/4',
  link: 'font-normal text-sm',
};

const partners = [
  {
    name: 'Winterthur - Lokal/Loyal',
    description:
      '121 Unternehmen aus Winterthur ermöglichen dir dank Heimlieferdienst, Versand oder Abholung, dass du auch in schwierigen Zeiten nicht auf Gewohntes verzichten musst.',
    url: 'https://www.lokal-loyal.ch/winterthur/',
  },
  {
    name: 'Lädelishop',
    description: 'Pop-up Marktplatz während des Corona-Lockdowns',
    url: 'https://www.laedelishop.ch/',
  },
  {
    name: 'Be Local Hero',
    description:
      'Mit der gemeinnützigen Plattform möchten wir Unternehmer*innen, Social Entrepreneurs und kleine Geschäfte unterstützen diese herausfordernde Zeit zu überstehen. Be Local Hero ist für alle kostenlos. ',
    url: 'https://belocalhero.com/',
  },
  {
    name: 'lokalhelden',
    description: 'Die einzige kostenlose Crowdfunding-Plattform der Schweiz für Vereine und gemeinnützige Projekte.',
    url: 'https://www.lokalhelden.ch/',
  },
  {
    name: 'NeverAlone',
    description: 'Üsen Marktplatz fürd Region! Unterstütze Dein Ostschweizer L​i​e​b​l​i​n​g​s​g​e​s​c​h​ä​f​t​.',
    url: 'https://www.neveralone.ch/',
  },
  {
    name: 'Slow Food Youth',
    description:
      'Um die lokalen (Klein-)Produzent*innen zu unterstützen und um weiterhin regionales, frisches Gemüse, Käse etc. beziehen zu können, haben wir eine Übersichtsliste erstellt, beim wem und wie ihr weiterhin Lebensmittel beziehen könnt.',
    url: 'http://www.slowfoodyouth.ch/',
  },
  {
    name: 'mitenand.me',
    description:
      'Egal ob Restaurants, Coiffeure, Bars oder Bäcker. Kleine Geschäfte in der Schweiz brauchen Deine Hilfe mehr denn je.',
    url: 'https://www.mitenand.me/',
  },
].sort((a, b) => a.name.localeCompare(b.name));

export default () => {
  return (
    <Stacked title="Emma hat geschlossen :(">
      <Hero />
      <div className={styles.list}>
        <div className="container emma-container">
          {partners.map(({ name, description, url }) => (
            <a key={name} href={url} className={styles.container}>
              <h3 className={styles.title}>{name}</h3>
              <p className={styles.description}>{description}</p>
              <span className={styles.link}>{url}</span>
            </a>
          ))}
        </div>
      </div>
    </Stacked>
  );
};
