import { FC } from 'react';
import { Vendor } from '../components/vendor';
import { Vendor as VendorType } from '../entities/vendor';

type Props = {
  vendors: VendorType[];
  userCoordinates?: number[];
};

export const VendorList: FC<Props> = ({ vendors, userCoordinates }) => {
  return (
    <ul>
      {vendors.map(({ name, id, categories, contact, hours, address, body, order, region, service, location }) => (
        <Vendor
          key={id}
          title={name}
          region={region}
          tags={service}
          body={body}
          categories={categories}
          hours={hours}
          address={address}
          options={order}
          contact={contact}
          coordinates={location && location.coordinates}
          userCoordinates={userCoordinates}
        />
      ))}
    </ul>
  );
};
