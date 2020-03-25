import { FC, ReactNode } from 'react';

const getDistance = (userLat: number, userLon: number, vendorLat: number, vendorLon: number) => {
  if (userLat == vendorLat && userLon == vendorLon) {
    return 0;
  } else {
    const radlat1 = (Math.PI * userLat) / 180;
    const radlat2 = (Math.PI * vendorLat) / 180;
    const theta = userLon - vendorLon;
    const radtheta = (Math.PI * theta) / 180;
    const distance =
      ((Math.acos(
        Math.min(1, Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta))
      ) *
        180) /
        Math.PI) *
      60 *
      1.1515 *
      1.609344;

    if (distance < 2) {
      return 'in der Nähe';
    }

    if (distance > 100) {
      return 'über 100km entfernt';
    }

    return `${Math.round(distance)}km entfernt`;
  }
};

type Props = { className?: string; userLat: number; userLon: number; vendorLat: number; vendorLon: number };

export const Distance: FC<Props> = ({ userLat, userLon, vendorLat, vendorLon, className = '' }) => (
  <span className={className}>{getDistance(userLat, userLon, vendorLat, vendorLon)}</span>
);
