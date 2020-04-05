import { ChangeEvent, FC } from 'react';
import cn from '../utils/classname';

const styles = {
  container:
    'inline-flex flex-row hover:bg-emma-purple-300 rounded-full px-3 py-1 transition duration-150 ease-in-out cursor-pointer border-solid border-2 border-emma-purple-600',
  label: 'm-2 inline-block font-sans transition duration-150 ease-in-out text-sm font-semibold border-solid border-black',
  input: 'self-center inline-block rounded-sm border-gray-400 bg-white hidden',
  checkedInput: 'bg-emma-purple-600 hover:bg-emma-purple-500 text-white',
  uncheckedLabel: 'text-emma-purple-600 hover:text-emma-purple-800',
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
