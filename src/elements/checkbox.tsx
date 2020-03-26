import { ChangeEvent, FC } from 'react';
import cn from '../utils/classname';

const styles = {
  container:
    'inline-flex flex-row bg-indigo-100 hover:bg-indigo-200  rounded-full px-3 py-1 transition duration-150 ease-in-out cursor-pointer',
  label: 'ml-2 inline-block font-sans transition duration-150 ease-in-out font-light text-base',
  input: 'self-center inline-block rounded-sm border-gray-400 bg-white',
  checkedInput: 'bg-indigo-500 hover:bg-indigo-500 text-white',
  uncheckedLabel: 'text-indigo-500 hover:text-indigo-800',
  checkedLabel: 'text-white hover:text-white',
};

export type Props = {
  name: string;
  label: string;
  value?: string;
  checked?: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};
export const Checkbox: FC<Props> = ({ name, onChange, value, checked = false, label }) => (
  <label className={cn([styles.container, checked && styles.checkedInput])}>
    <input value={value} onChange={onChange} className={styles.input} name={name} type="checkbox" checked={checked} />
    <span className={cn([styles.label, checked ? styles.checkedLabel : styles.uncheckedLabel])}>{label}</span>
  </label>
);
