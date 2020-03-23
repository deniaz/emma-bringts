import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Button } from './button';

const styles = {
  container: 'inline-flex self-end relative flex-col lg:mx-2 box-border',
  label: 'font-sans text-center text-gray-800 font-medium text-sm lg:ml-8 mb-2',
  inputWrapper: 'font-sans text-sm lg:text-base bg-white p-2 self-center rounded-full flex mx-auto',
  // term: 'rounded-tl-full rounded-bl-full px-6 py-4 w-1/2',
  input: 'px-6 py-4 rounded-full',
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
      <div className={styles.inputWrapper}>
        <input
          value={zip}
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            setZip(e.target.value);
          }}
          required
          className={styles.input}
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
