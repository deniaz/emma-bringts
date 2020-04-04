import { FC, MouseEvent } from 'react';

const styles = {
  default:
    'relative bg-white rounded-full py-2 px-4 m-2 text-sm font-semibold hover:shadow-xl transition duration-150 ease-in-out',
  active:
    'relative bg-indigo-500 text-white rounded-full py-2 px-4 m-2 text-sm font-semibold hover:shadow-xl transition duration-150 ease-in-out',
};

type Props = {
  active?: boolean;
  label: string;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
};

export const Tag: FC<Props> = ({ active = false, label, onClick }) => (
  <button onClick={onClick} className={active ? styles.active : styles.default}>
    {label}
  </button>
);
