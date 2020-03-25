import { ChangeEvent, FC } from 'react';
import { Checkbox, Props as CheckboxProps } from '../elements/checkbox';
const styles = {
  container: 'mb-6',
  label: 'block font-sans text-gray-800 font-normal text-sm mb-2',
  fields: 'flex flex-row flex-wrap',
  field: 'mr-2 mb-2',
};

type Props = {
  label: string;
  options: Omit<CheckboxProps, 'onChange'>[];
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

export const Selection: FC<Props> = ({ label, options, onChange }) => (
  <div className={styles.container}>
    <span className={styles.label}>{label}</span>
    <div className={styles.fields}>
      {options.map((option) => (
        <span className={styles.field} key={option.name}>
          <Checkbox onChange={onChange} {...option} />
        </span>
      ))}
    </div>
  </div>
);
