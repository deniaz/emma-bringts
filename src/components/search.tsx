import { FC, MouseEvent } from 'react';
import { SearchInput } from '../elements/search-input';
import { Toggle, ToggleOption } from '../elements/toggle';

const styles = { form: 'flex flex-col lg:flex-row justify-center mb-8' };

type Props = {
  className?: string;
  onToggle(option: ToggleOption): void;
  service: ToggleOption;
  onChange(zip: string): void;
  zip: string;
  initial?: string;
  onClick?: (ev: MouseEvent) => void;
};

export const Search: FC<Props> = ({ className, service, zip, onToggle, onChange, onClick }) => {
  return (
    <form className={[className, styles.form].filter(Boolean).join(' ')}>
      <Toggle active={service} onChange={onToggle} />

      {/* <SearchInput type={type} zip={zip} label={label} /> */}
      <SearchInput zip={zip} onChange={onChange} onClick={onClick} />
    </form>
  );
};
