import { FC } from 'react';
import { Icon } from '../identity/icon';
import cn from '../utils/classname';

const styles = {
  container: 'rounded-full bg-indigo-100 px-2 py-2 mx-auto mb-4 lg:mb-0 lg:mx-2 self-end inline-flex',
  button: 'font-sans text-xs lg:text-base rounded-full px-4 lg:px-8 py-2 lg:py-4 flex-row fill-current inline-flex',
  inactive: 'text-indigo-500',
  active: 'bg-white text-black',
  icon: 'mr-3',
};

export type ToggleOption = 'DELIVERY' | 'TAKEAWAY';

type Props = {
  active: ToggleOption;
  onChange: (selected: ToggleOption) => void;
};

export const Toggle: FC<Props> = ({ onChange, active }) => (
  <div className={styles.container}>
    <button
      onClick={(e) => {
        e.preventDefault();
        onChange('TAKEAWAY');
      }}
      className={cn([styles.button, active === 'TAKEAWAY' ? styles.active : styles.inactive])}
    >
      <Icon className={styles.icon} size={24} name="hiking" /> Abholung
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        onChange('DELIVERY');
      }}
      className={cn([styles.button, active === 'DELIVERY' ? styles.active : styles.inactive])}
    >
      <Icon className={styles.icon} size={24} name="scooter" /> Lieferung
    </button>
  </div>
);
