import { FC, Fragment, ReactNode } from 'react';
import { Tenant } from '../entities/vendor';
import { Headline } from '../identity/typography/headline';

const styles = {
  container: 'mb-8 bg-white rounded-lg  box-border',
  body: 'md:grid md:grid-cols-3 md:gap-4 px-8 py-10',
  main: 'md:col-span-2 box-border',
  aside: 'md:col-span-1 box-border',

  header: 'relative box-border flex flex-wrap mb-4',
  title: 'mt-3 mb-4',
  categories: 'box-border flex flex-wrap mb-4 w-full',
  category:
    'box-border bg-emma-yellow-400 py-1 px-3 relative rounded-full my-1 mr-1 text-sm font-semibold  cursor-default',
  methods: 'box-border flex flex-wrap mb-4 justify-end',
  method:
    'box-border bg-gray-200 text-gray-800 py-1 px-4 relative rounded-full my-1 mr-1 text-xs font-medium cursor-default',
  description: 'mb-6',
  label: 'text-gray-800',
  delivery: '',
  contact: '',
  link: 'font-normal font-base text-indigo-900 mb-4 inline-block break-all',
  footer: 'px-8 py-3 bg-gray-100 rounded-b text-xs text-right text-gray-500 font-normal',
};

type Props = {
  name: string;
  body: string;
  categories: string[];
  address?: string[];
  hours: string[];
  services: string[];
  contact: string[];
  tenant: Tenant;
};

export const ResultItem: FC<Props> = ({ name, body, categories, hours, address, services, contact, tenant }) => (
  <div className={styles.container}>
    <div className={styles.body}>
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.categories}>
            {categories.map((category) => (
              <span key={category} className={styles.category}>
                {category}
              </span>
            ))}
          </div>
          <Headline className={styles.title}>{name}</Headline>
        </header>
        <p className={styles.description}>{body}</p>
        <h4 className={styles.label}>Zeiten</h4>
        {hours.map((hour) => (
          <p key={hour}>{hour}</p>
        ))}
      </div>
      <aside className={styles.aside}>
        <div className={styles.methods}>
          {services.map((method) => (
            <span className={styles.method} key={method}>
              {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
              {ServiceMethod[method]}
            </span>
          ))}
        </div>

        <div className={styles.contact}>
          {contact.map((el) => (
            <Fragment key={el}>
              {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
              {getLink(el)}
              <br />
            </Fragment>
          ))}

          <a
            href={`https://www.google.ch/maps/place/${encodeURIComponent(address.join(', '))}`}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address.map((el) => (
              <Fragment key={el}>
                {el}
                <br />
              </Fragment>
            ))}
          </a>
        </div>
      </aside>
    </div>
    {tenant === 'SFY' && (
      <footer className={styles.footer}>
        <p>
          In Zusammenarbeit mit{' '}
          <a href="http://www.slowfoodyouth.ch" className="" title="Herzlichen Dank an Slow Food Youth">
            Slow Food Youth
          </a>
        </p>
      </footer>
    )}
  </div>
);

const urlRegex = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
);

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const phoneRegex = new RegExp(/(0|(\+41\s?))(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})/);

const getLink = (el: string): ReactNode => {
  if (emailRegex.test(el)) {
    return (
      <a href={`mailto:${el}`} className={styles.link}>
        {el}
      </a>
    );
  }

  if (urlRegex.test(el)) {
    return (
      <a
        href={el.startsWith('http') ? el : `http://${el}`}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {el}
      </a>
    );
  }

  if (phoneRegex.test(el)) {
    return (
      <a href={`tel:${el}`} className={styles.link}>
        {el}
      </a>
    );
  }

  return <span className={styles.link}>{el}</span>;
};

enum ServiceMethod {
  'DELIVERY' = 'Lieferung',
  'DELIVERY_MAIL' = 'Versand',
  'TAKEAWAY' = 'Abholung',
  'SELF_SERVICE' = 'Selbstbedienung',
}
