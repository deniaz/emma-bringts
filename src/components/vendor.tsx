import { FC, Fragment, ReactNode } from 'react';

type Props = {
  name: string;
  body: string;
  categories: string[];
  address?: string[];
  hours: string[];
  contact: string[];
};

export const Vendor: FC<Props> = ({ name, body, categories, hours, address, contact }) => (
  <div className="search-results-item">
    <header className="header">
      {categories.map((category) => (
        <a key={category} href="#" className="category-item">
          {category}
        </a>
      ))}
    </header>
    <div className="content">
      <div className="info">
        <h3>{name}</h3>
        <p className="description">{body}</p>
        <div className="label">Zeiten</div>
        <p className="time">
          {hours.map((hour) => (
            <>
              {hour}
              <br />
            </>
          ))}
        </p>
      </div>
      <div className="contact">
        {contact.map((el) => (
          <Fragment key={el}>
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            {getLink(el)}
            <br />
          </Fragment>
        ))}

        <a
          href={`https://www.google.ch/maps/place/${encodeURIComponent(address.join(', '))}`}
          className="adresse"
          target="_blank"
          rel="noopener noreferrer"
        >
          {address.map((el) => (
            <>
              {el}
              <br />
            </>
          ))}
        </a>
      </div>
    </div>
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
      <a href={`mailto:${el}`} className="email">
        {el}
      </a>
    );
  }

  if (urlRegex.test(el)) {
    return (
      <a href={el.startsWith('http') ? el : `http://${el}`} className="website" target="_blank" rel="noopener noreferrer">
        {el}
      </a>
    );
  }

  if (phoneRegex.test(el)) {
    return (
      <a href={`tel:${el}`} className="phone">
        {el}
      </a>
    );
  }

  return el;
};
