import { ChangeEvent, FC } from 'react';
import { Checkbox, Props as CheckboxProps } from '../elements/checkbox';
const styles = {
  container: 'mb-10',
  label: 'label',
  info: 'input-info mb-3',
  fields: 'flex flex-row flex-wrap',
  field: 'mr-2 mb-2',
};

type Props = {
  label?: string;
  info?: string;
  options: Omit<CheckboxProps, 'onChange'>[];
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

export const Selection: FC<Props> = ({ label, info, options, onChange }) => (
  <div className={styles.container}>
    {label && <span className={styles.label}>{label}</span>}
    {label && <span className={styles.info}>{info}</span>}
    <div className={styles.fields}>
      {options.map((option) => (
        <span className={styles.field} key={option.value}>
          <Checkbox onChange={onChange} {...option} />
        </span>
      ))}
    </div>
  </div>
);
