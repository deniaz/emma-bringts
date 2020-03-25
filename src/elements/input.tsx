import { ChangeEvent, FC } from 'react';

const styles = {
  container: 'inline-block w-full mb-6',
  label: 'block font-sans text-gray-800 font-normal text-sm mb-2',
  input: 'w-full bg-white rounded-md border border-gray-400 text-base py-2 px-4',
};

type Props = {
  label: string;
  placeholder?: string;
  name: string;
  value: string | number;
  type: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
};

export const Input: FC<Props> = ({ type, name, value, label, placeholder, onChange }) => (
  <label className={styles.container}>
    <span className={styles.label}>{label}</span>
    <input name={name} onChange={onChange} className={styles.input} placeholder={placeholder} type={type} value={value} />
  </label>
);
