import { FC } from 'react';
import { Button } from './button';
import Link from 'next/link';

const styles = {
  container: 'inline-flex self-end relative flex-col mx-2',
  label: 'font-sans text-gray-800 font-medium text-sm ml-8 mb-2',
  input: 'font-sans bg-white p-2 self-center rounded-full',
  // term: 'rounded-tl-full rounded-bl-full px-6 py-4 w-1/2',
  zip: 'px-6 py-4 rounded-full',
};

type Props = { label: boolean };

export const SearchInput: FC<Props> = ({ label }) => (
  <label className={styles.container}>
    {label && <span className={styles.label}>Suche in der Nähe deiner PLZ</span>}
    <div className={styles.input}>
      <input required className={styles.zip} name="zip" type="number" maxLength={4} minLength={4} placeholder="8000" />
      <Link href="/suche" passHref>
        <Button type="link">Finden</Button>
      </Link>
    </div>
  </label>
);
