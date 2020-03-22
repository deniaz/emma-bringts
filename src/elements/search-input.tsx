import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Button } from './button';

const styles = {
  container: 'inline-flex self-end relative flex-col mx-2',
  label: 'font-sans text-gray-800 font-medium text-sm ml-8 mb-2',
  input: 'font-sans bg-white p-2 self-center rounded-full',
  // term: 'rounded-tl-full rounded-bl-full px-6 py-4 w-1/2',
  zip: 'px-6 py-4 rounded-full',
};

type Props = { label: boolean; zip?: string };

export const SearchInput: FC<Props> = ({ label, zip: initialZip = '' }) => {
  const [geo, setGeo] = useState<[number, number]>(null);
  const [zip, setZip] = useState<string>(initialZip);

  useEffect(() => {
    const geocode = async (zip: string) => {
      const response = await fetch(`/api/geocode?zip=${zip}`);
      const { lat, lng } = await response.json();
      setGeo([lat, lng]);
    };

    if (zip.length === 4) {
      geocode(zip);
    }
  }, [zip]);

  return (
    <label className={styles.container}>
      {label && <span className={styles.label}>Suche in der Nähe deiner PLZ</span>}
      <div className={styles.input}>
        <input
          value={zip}
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            setZip(e.target.value);
          }}
          required
          className={styles.zip}
          name="zip"
          type="number"
          maxLength={4}
          minLength={4}
          placeholder="8000"
        />
        <Link href={geo === null ? '' : `/suche?lat=${geo[0]}&lng=${geo[1]}&zip=${zip}`} passHref>
          <Button disabled={geo === null} type="link">
            Finden
          </Button>
        </Link>
      </div>
    </label>
  );
};
