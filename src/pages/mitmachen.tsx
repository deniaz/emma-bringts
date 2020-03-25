import { ChangeEvent, useReducer } from 'react';
import { Selection } from '../compositions/selection';
import { Input } from '../elements/input';
import { Textarea } from '../elements/textarea';
import { Stacked } from '../layout/stacked';

type Targetable = HTMLInputElement | HTMLTextAreaElement;

const isCheckbox = (element: Targetable): element is HTMLInputElement => element.type === 'checkbox';
function reduce<S>(state: S, target: Targetable): S {
  return {
    ...state,
    [target.getAttribute('name')]: isCheckbox(target) ? target.checked : target.value,
  };
}

type Reducer<S> = (prevState: S, target: Targetable) => S;

const styles = {
  form: 'w-1/2 mx-auto',
};

export default () => {
  const initial = {
    vendor: '',
    description: '',
    veggies: false,
    dairies: false,
    meat: false,
    pastries: false,
    staple: false,
    meals: false,
    TAKEAWAY: false,
    DELIVERY: false,
    DELIVERY_MAIL: false,
    SELF_SERVICE: false,
  };

  const [form, dispatch] = useReducer<Reducer<typeof initial>>(reduce, initial);

  function handleChange(e: ChangeEvent<Targetable>) {
    e.persist();
    dispatch(e.target);
  }

  return (
    <Stacked>
      <form className={styles.form}>
        <Input name="vendor" onChange={handleChange} label="Anbieter" value={form.vendor} type="text" />
        <Textarea onChange={handleChange} name="description" label="Beschreibe dein Angebote" value={form.description} />
        <Selection
          onChange={handleChange}
          label="Angebotskategorie"
          options={[
            {
              name: 'veggies',
              label: 'Gemüse / Früchte',
              checked: form.veggies,
            },
            {
              name: 'dairies',
              label: 'Molkereiprodukte',
              checked: form.dairies,
            },
            {
              name: 'meat',
              label: 'Fleischwaren',
              checked: form.meat,
            },
            {
              name: 'pastries',
              label: 'Backwaren',
              checked: form.pastries,
            },
            {
              name: 'staple',
              label: 'Grundnahrungsmittel (Reis, Pasta, ...)',
              checked: form.staple,
            },
            {
              name: 'meals',
              label: 'Menüs',
              checked: form.meals,
            },
          ]}
        />
        <Selection
          onChange={handleChange}
          label="Abholung / Lieferung"
          options={[
            {
              label: 'Abholung',
              name: 'TAKEAWAY',
              checked: form.TAKEAWAY,
            },
            {
              label: 'Abholung',
              name: 'DELIVERY',
              checked: form.DELIVERY,
            },
            {
              label: 'Abholung',
              name: 'DELIVERY_MAIL',
              checked: form.DELIVERY_MAIL,
            },
            {
              label: 'Selbst ernten',
              name: 'SELF_SERVICE',
              checked: form.SELF_SERVICE,
            },
          ]}
        />
      </form>
    </Stacked>
  );
};
