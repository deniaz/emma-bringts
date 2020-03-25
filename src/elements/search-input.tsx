import { FC, MouseEvent } from 'react';
import { Button } from './button';

const styles = {
  container: 'inline-flex self-end relative lg:mx-2 box-border',

  inputWrapper: 'font-sans text-sm lg:text-base bg-white py-2 lg:py-4 rounded-full flex',
  input: 'px-4 py-2 lg:px-8 lg:py-4 rounded-full',
};

type Props = {
  zip: string;
  onChange(zip: string): void;
  onClick(ev: MouseEvent): void;
};

export const SearchInput: FC<Props> = ({ zip, onChange, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          value={zip}
          autoComplete="off"
          onChange={(e) => {
            e.preventDefault();
            onChange(e.target.value);
          }}
          className={styles.input}
          name="zip"
          type="number"
          maxLength={4}
          minLength={4}
          placeholder="8000"
        />

        {onClick && (
          <Button onClick={onClick} type="button">
            Finden
          </Button>
        )}
      </div>
    </div>
  );
};
