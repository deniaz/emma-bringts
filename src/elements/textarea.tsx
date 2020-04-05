import { ChangeEvent, FC } from 'react';

const styles = {
  container: 'inline-block w-full mb-6',
  label: 'label',
  info: 'input-info',
  textarea: 'w-full bg-white rounded-md border border-gray-400 text-base py-2 px-4 font-sans',
};

type Props = {
  label: string;
  info?: string;
  rows?: number;
  placeholder?: string;
  name: string;
  value: string;
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;
};

export const Textarea: FC<Props> = ({ name, value, label, info, placeholder, onChange, rows = 3 }) => (
  <label className={styles.container}>
    <span className={styles.label}>{label}</span>
    <span className={styles.info}>{info}</span>
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
