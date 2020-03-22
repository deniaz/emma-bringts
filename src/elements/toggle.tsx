import { FC } from 'react';
import { Icon } from '../identity/icon';

const styles = {
  container: 'rounded-full bg-indigo-100 px-2 py-2 mx-2 self-end inline-flex',
  button: 'rounded-full px-8 py-4 flex-row fill-current inline-flex',
  inactive: 'text-indigo-500',
  active: 'bg-white text-black',
  icon: 'mr-3',
};

const cn = (classes: string[]) => classes.filter(Boolean).join(' ');

type Option = 'delivery' | 'takeaway';

type Props = {
  active: Option;
  onChange: (selected: Option) => void;
};

export const Toggle: FC<Props> = ({ onChange, active }) => (
  <div className={styles.container}>
    <button
      onClick={(e) => {
        e.preventDefault();
        onChange('takeaway');
      }}
      className={cn([styles.button, active === 'takeaway' ? styles.active : styles.inactive])}
    >
      <Icon className={styles.icon} size={24} name="hiking" /> Abholung
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        onChange('delivery');
      }}
      className={cn([styles.button, active === 'delivery' ? styles.active : styles.inactive])}
    >
      <Icon className={styles.icon} size={24} name="scooter" /> Lieferung
    </button>
  </div>
);
