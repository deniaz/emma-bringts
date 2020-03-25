import { ChangeEvent, FC } from 'react';

const styles = {
  container:
    'inline-flex flex-row bg-indigo-100 hover:bg-indigo-200  rounded-full px-3 py-1 transition duration-150 ease-in-out cursor-pointer',
  label:
    'ml-2 inline-block font-sans text-indigo-500 transition duration-150 ease-in-out hover:text-indigo-800 font-light text-base',
  input: 'self-center inline-block rounded-sm border-gray-400 bg-white',
  checkedInput: 'bg-indigo-500 hover:bg-indigo-500',
  checkedLabel: 'text-white hover:text-white',
};

export type Props = {
  name: string;
  label: string;
  checked?: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

export const Checkbox: FC<Props> = ({ name, onChange, checked = false, label }) => (
  <label className={[styles.container, checked && styles.checkedInput].filter(Boolean).join(' ')}>
    <input onChange={onChange} className={styles.input} name={name} type="checkbox" checked={checked} />
    <span className={[styles.label, checked && styles.checkedLabel].filter(Boolean).join(' ')}>{label}</span>
  </label>
);
