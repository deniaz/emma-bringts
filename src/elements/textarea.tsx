import { ChangeEvent, FC } from 'react';

const styles = {
  container: 'inline-block w-full mb-6',
  label: 'block font-sans text-gray-800 font-normal text-sm mb-2',
  textarea: 'w-full bg-white rounded-md border border-gray-400 text-base py-2 px-4 font-sans',
};

type Props = {
  label: string;
  rows?: number;
  placeholder?: string;
  name: string;
  value: string;
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
};

export const Textarea: FC<Props> = ({ name, value, label, placeholder, onChange, rows = 3 }) => (
  <label className={styles.container}>
    <span className={styles.label}>{label}</span>
    <textarea
      rows={rows}
      name={name}
      onChange={onChange}
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
    />
  </label>
);
