import React, { FC, useEffect, useState } from 'react';
import { Button } from './button';

const styles = { button: 'text-base px-3 py-4 w-7/12' };

type Props = {
  initial?: string;
  onChange: (zip: string) => void;
};

export const ZipSearch: FC<Props> = ({ initial = '', onChange }) => {
  const [zip, setZip] = useState(initial);

  useEffect(() => {
    if (initial !== '') {
      setZip(initial);
    }
  }, [initial]);

  return (
    <div className="zip-search">
      <input
        onChange={(e) => setZip(e.target.value)}
        className="zipcode"
        type="number"
        placeholder="Postleitzahl"
        defaultValue={zip}
      />
      <Button className={styles.button} onClick={() => onChange(zip)}>
        Anbieter finden
      </Button>
    </div>
  );
};
