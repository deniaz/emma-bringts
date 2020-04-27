import { Hero } from '../compositions/hero';
import { Stacked } from '../layout/stacked';

export default () => {
  return (
    <Stacked title="Emma hat geschlossen :(">
      <Hero />
    </Stacked>
  );
};
