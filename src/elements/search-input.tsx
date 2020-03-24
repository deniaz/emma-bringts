import { FC, MouseEvent } from 'react';
import { Button } from './button';

const styles = {
  container: 'inline-flex self-end relative flex-col lg:mx-2 box-border',

  inputWrapper: 'font-sans text-sm lg:text-base bg-white p-2 self-center rounded-full flex mx-auto',
  // term: 'rounded-tl-full rounded-bl-full px-6 py-4 w-1/2',
  input: 'px-6 py-4 rounded-full',
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
