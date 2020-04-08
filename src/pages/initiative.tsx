import { Stacked } from '../layout/stacked';
import { Navigation } from '../components/navigation';
import { ContentBox } from '../components/content-box';
import Link from 'next/link';

export default () => (
  <Stacked title="Die Initiative - Emma bringts!">

    <section className="bg-emma-yellow-400 lg:bg-emma-blue-400">
      <Navigation />
      <div className="container emma-container content-page">
        <div className="content-secation content-secation-hero">
          <img src="/img/illus/illu-love.svg" alt="" />

          <div className="text pb-20">
            <h1 className="h1 mb-4">Helfe Emma!</h1>
            <p className="p-lead mb-4">Hast du ein Geschäft im Kopf, dass nicht auf Emma aufgelistet ist? Dann trag es doch gleich in unser Verzeichnis ein.</p>
            <Link href="/mitmachen" passHref>
              <a className="btn">Anbieter hinzufügen</a>
            </Link>
          </div>
        </div>
      </div>


    </section>

    <section className="bg-emma-blue-400 lg:pt-16 flex">
      <div className="container emma-container content-page">

        <ContentBox
          title="Geheimtipps teilen"
          text={[
            'Mit dem Eintrag deines Lieblingsbäckers oder des kleinen Spezialitätenladens um die Ecke hilfst du lokalen Geschäften in dieser schwierigen Zeit indem du sie auch für andere potentielle Kunden sichtbar machst.',
            'Du willst die Geheimtipps doch nicht einfach für dich behalten oder? 😉',
          ]}
          img={"/img/illus/illu-hammster.svg"}

        />

        <ContentBox
          title="Emma sollen alle kennen"
          text={[
            'Du findest Emma bringts! eine super Sache? Dann teile uns doch:',
          ]}
          img={"/img/illus/illu-share.svg"}

        />



      </div>
    </section>

  </Stacked>
);