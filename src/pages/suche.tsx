import { Search } from '../components/search';
import { VendorList } from '../compositions/vendor-list';
import { Headline } from '../identity/typography/headline';
import { Stacked } from '../layout/stacked';

const vendors = [
  {
    vendor: 'Bolebuck, Katrin Bürchler',
    category: 'Gemüse / Früchte',
    offer: 'Bio-Gemüsepakete zu CHF 15 oder CHF 35',
    region: 'Zürich (Stadt)',
    type: 'Abholung',
    hours: 'Dienstag und Freitag, 9-11 Uhr',
    location: 'Chez Mamie, Schaffhauserstrasse 74, 8057 Zürich',
    order_options: 'E-Mail, Webseite',
    contact: 'info@bolebuck.ch, www.bolebuck.ch',
  },
  {
    vendor: 'Zum guten Heinrich, Karin Meier',
    category: 'Menüs',
    offer:
      'Menüs, Salate, Suppen in Weckgläser Egal ob du im Homeoffice bist, in der Quarantäne steckst, die Office-Mensa geschlossen ist oder einfach schampar Lust auf ein paar unförmige Vitaminli hast - ab sofort bringt dir Heinrich unsere Köstlichkeiten zu dir! Was heisst das genau? Wir produzieren für dich verschiedenste Eintöpfe, frische Salate, herzwärmende Suppen sowie unsere oberoberober-feinen Brownies. Wir bringen die Speisen huschhusch mit unserem fancy Lastenrad zu dir, du kannst diese einfach wärmen und dann geniessen wenn du einen Regenbogen im Bauch brauchst!',
    region: 'Zürich (Stadt), Affoltern, Andelfingen, Bülach, Dielsdorf, Dietikon, Uster',
    type: 'Abholung, Lieferung per Velo / Auto',
    hours: 'täglich',
    location: 'Binzstrasse 12, 8045 Zürich',
    order_options: 'Telefon, E-Mail, Webseite, https://www.zumgutenheinrich.ch/hauslieferungen',
    contact: '078 658 99 44‬, kontakt@zumgutenheinrich.ch',
  },
  {
    vendor: 'Leibacher Biber-Manufaktur AG',
    category: 'Backwaren',
    offer: 'Langhaltbare Backwaren wie Biber-Spezialitäten und Läckerli (auch vegan & glutenfrei)',
    region: 'Zürich (Stadt), Uster, Illnau / Effretikon',
    type: 'Lieferung per Post',
    hours: 'Mo-Do 08:30 - 17:30',
    location: 'Schmittestrasse 3, 8308 Illnau',
    order_options: 'Telefon, E-Mail, Webseite',
    contact: 'www.biber-manufaktur',
  },
  {
    vendor: 'Solawi Halde',
    category: 'Gemüse / Früchte',
    offer: 'Gemüse',
    region: 'March /Höfe',
    type: 'Abholung, Lieferung per Post, Lieferung per Velo / Auto, Selbst ernten',
    hours: '8-17 Uhr',
    location: '8852 Altendorf',
    order_options: 'Telefon, Webseite',
    contact: '078 721 24 85 www.solawi-halde.ch',
  },
  {
    vendor: 'Hof in Niederesslingen',
    category: 'Gemüse / Früchte, Molkereiprodukte',
    offer: 'Saisonales Gemüse, Käse, etc.',
    region: 'Meilen',
    type: 'Lieferung per Velo / Auto',
    hours: 'Samstags',
    location: '',
    order_options: 'E-Mail',
    contact: 'susipf@hotmail.com',
  },
];

export default () => {
  return (
    <Stacked>
      <Search label={false} />
      <div>
        <Headline>Resultate</Headline>
        <VendorList vendors={vendors} />
      </div>
    </Stacked>
  );
};
