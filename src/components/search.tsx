import { FC, useState } from 'react';
import { SearchInput } from '../elements/search-input';
import { Toggle } from '../elements/toggle';

const styles = { form: 'flex flex-col lg:flex-row justify-center mb-8' };

type Props = {
  className?: string;
  label?: boolean;
  zip?: string;
  type: 'takeaway' | 'delivery';
};

export const Search: FC<Props> = ({ className, zip, type: initialType, label = false }) => {
  const [type, setType] = useState<'delivery' | 'takeaway'>(initialType);

  return (
    <form className={[className, styles.form].filter(Boolean).join(' ')}>
      <Toggle active={type} onChange={(fresh) => setType(fresh)} />

      <SearchInput type={type} zip={zip} label={label} />
    </form>
  );
};
