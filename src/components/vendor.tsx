import { FC, Fragment, ReactNode } from 'react';
import { Distance } from '../elements/distance';
import { Hyperlink } from '../elements/hyperlink';
import { Tag } from '../elements/tag';
import { Icon, IconName } from '../identity/icon';
import { BodyText } from '../identity/typography/body-text';

const urlRegex = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
);

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const phoneRegex = new RegExp(/0(\d{2})\s(\d{3})\s(\d{2})\s(\d{2})/);

const getLink = (el: string): ReactNode => {
  if (emailRegex.test(el)) {
    return <Hyperlink href={`mailto:${el}`}>{el}</Hyperlink>;
  }

  if (urlRegex.test(el)) {
    return <Hyperlink href={el.startsWith('http') ? el : `http://${el}`}>{el}</Hyperlink>;
  }

  if (phoneRegex.test(el)) {
    return <Hyperlink href={`tel:${el}`}>{el}</Hyperlink>;
  }

  return el;
};

const mapTagToText = (service: string) => {
  switch (service) {
    case 'TAKEAWAY':
      return 'Abholung';
    case 'DELIVERY_MAIL':
      return 'Lieferung per Post';
    case 'DELIVERY':
      return 'Lieferung per Velo / Auto';
    case 'SELF_SERVICE':
      return 'Selbst ernten';
  }
};

const styles = {
  listing: 'rounded-md p-8 flex flex-col lg:flex-row bg-white mb-4 shadow-sm box-border',
  img: 'rounded-md mr-8 h-full flex flex-shrink-0',
  categories: 'font-sans text-indigo-500 font-medium',
  vendor: 'font-sans text-indigo-900 text-lg font-medium',
  category: '',
  offer: 'font-sans break-word mt-2 mb-8 flex-grow-0',
  region: 'font-sans text-gray-500 fill-current text-base font-light tracking-tight inline-flex flex-row items-center mb-4',
  regionIcon: 'mr-2 flex-shrink-0',
  distance:
    'font-sans text-gray-500 fill-current text-base font-light tracking-tight inline-flex flex-row items-center mb-4',
  tags: 'my-2 flex flex-wrap',

  col: 'flex flex-col lg:flex-row w-full box-border',
  body: 'flex-col w-full lg:w-1/2',
  attributes: 'flex-col w-full lg:w-1/2 lg:ml-8 box-border',

  infos: 'flex flex-col lg:flex-row',
  infoBox: 'font-sans lg:w-1/2',

  attribute: '',
  key: 'font-sans font-medium text-sm text-gray-500',
  descripton: 'font-sans font-medium text-base text-gray-700 break-all mb-4',
};

type Props = {
  title: string;
  tags: string[];
  region: string;
  body: string;
  categories: string[];
  address?: string[];
  hours: string[];
  options: string[];
  contact: string[];
  coordinates?: number[];
  userCoordinates?: number[];
};

export const Vendor: FC<Props> = ({
  title,
  tags,
  region,
  body,
  categories,
  hours,
  address,
  options,
  contact,
  coordinates,
  userCoordinates,
}) => (
  <li className={styles.listing}>
    {/* <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1532246420286-127bcd803104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=240&h=180&q=60"
      /> */}

    <div className={styles.col}>
      <div className={styles.body}>
        <h3 className={styles.categories}>{categories.join(', ')}</h3>
        <h2 className={styles.vendor}>{title}</h2>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag}>
              <Icon className={styles.regionIcon} name={tag as IconName} size={16} />
              {mapTagToText(tag)}
            </Tag>
          ))}
        </div>

        <ul className={styles.infos}>
          <li className={styles.infoBox}>
            <strong className={styles.key}>Zeiten</strong>
            <p className={styles.descripton}>
              {hours.map((el) => (
                <Fragment key={el}>
                  {el}
                  <br />
                </Fragment>
              ))}
            </p>
          </li>
        </ul>

        <BodyText className={styles.offer}>{body}</BodyText>
      </div>
      <div className={styles.attributes}>
        <h3 className={styles.region}>
          <Icon className={styles.regionIcon} name="place" size={16} /> <span>{region}</span>
        </h3>

        {coordinates && userCoordinates && (
          <div>
            <Distance
              className={styles.distance}
              userLat={userCoordinates[0]}
              userLon={userCoordinates[1]}
              vendorLat={coordinates[0]}
              vendorLon={coordinates[1]}
            />
          </div>
        )}

        {address && (
          <div className={styles.attribute}>
            <strong className={styles.key}>Ort</strong>
            <p className={styles.descripton}>
              {address.map((el) => (
                <Fragment key={el}>
                  {el}
                  <br />
                </Fragment>
              ))}
            </p>
          </div>
        )}
        <div className={styles.attribute}>
          <strong className={styles.key}>Bestellungen via</strong>
          <p className={styles.descripton}>
            {options.map((el) => (
              <Fragment key={el}>
                {getLink(el)}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
        <div className={styles.attribute}>
          <strong className={styles.key}>Kontakt</strong>
          <p className={styles.descripton}>
            {contact.map((el) => (
              <Fragment key={el}>
                {getLink(el)}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  </li>
);
