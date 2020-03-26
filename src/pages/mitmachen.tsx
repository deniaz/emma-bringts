import request from 'graphql-request';
import { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { Selection } from '../compositions/selection';
import { VendorList } from '../compositions/vendor-list';
import { Button } from '../elements/button';
import { Input } from '../elements/input';
import { Textarea } from '../elements/textarea';
import { Vendor } from '../entities/vendor';
import { Stacked } from '../layout/stacked';

type Targetable = HTMLInputElement | HTMLTextAreaElement;

type A =
  | {
      type: 'update';
      target: Targetable;
    }
  | { type: 'list_change'; name: string; value: string };

const isCheckbox = (element: Targetable): element is HTMLInputElement => element.type === 'checkbox';

function reduce<S>(state: S, action: A): S {
  if (action.type === 'update') {
    return {
      ...state,
      [action.target.getAttribute('name')]: isCheckbox(action.target) ? action.target.checked : action.target.value,
    };
  }

  if (action.type === 'list_change') {
    return {
      ...state,
      [action.name]: state[action.name].includes(action.value)
        ? state[action.name].filter((item) => item !== action.value)
        : [...state[action.name], action.value],
    };
  }

  return state;
}

type Reducer<S> = (prevState: S, action: A) => S;

const styles = {
  container: 'px-4',
  title: 'text-xl font-sans mb-6 text-indigo-900',
  form: 'w-full lg:w-1/2 mx-auto',
  street: 'grid grid-cols-3 gap-4',
  zip: 'col-span-1',
  locality: 'col-span-2',
};

export default () => {
  const initial = {
    vendor: '',
    description: '',
    categories: [],
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
    // eslint-disable-next-line @typescript-eslint/camelcase
    order_by_phone: false,
    // eslint-disable-next-line @typescript-eslint/camelcase
    order_by_email: false,
    // eslint-disable-next-line @typescript-eslint/camelcase
    order_by_website: false,
    hours: '',
    phone: '',
    email: '',
    website: '',
    street: '',
    zip: '',
    locality: '',
    region: [],
  };

  const [form, dispatch] = useReducer<Reducer<typeof initial>>(reduce, initial);
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(null);
  const [vendor, setVendor] = useState<Vendor>(null);

  function handleChange(e: ChangeEvent<Targetable>) {
    e.persist();
    dispatch({
      type: 'update',
      target: e.target,
    });
  }

  function handleListChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'list_change',
      name: e.target.name,
      value: e.target.value,
    });
  }

  const submit = async () => {
    setStatus('pending');

    try {
      const mutation = `mutation Vendor($vendor: VendorInput!) {
        createVendor(vendor: $vendor) {
          id
          name
          categories
          body
          service
          hours
          address
          zip
          locality
          order
          email
          phone
          website
        }
      }`;

      const variables = {
        vendor: {
          name: form.vendor,
          categories: form.categories,
          body: form.description,
          service: [
            form.DELIVERY && 'DELIVERY',
            form.DELIVERY_MAIL && 'DELIVERY_MAIL',
            form.TAKEAWAY && 'TAKEAWAY',
            form.SELF_SERVICE && 'SELF_SERVICE',
          ].filter(Boolean),
          hours: form.hours,
          address: form.street,
          zip: form.zip,
          locality: form.locality,
          order: [form.order_by_email && 'EMAIL', form.order_by_phone && 'PHONE', form.order_by_website && 'WEBSITE'].filter(
            Boolean
          ),
          phone: form.phone,
          email: form.email,
          website: form.website,
        },
      };

      const { createVendor } = await request<{ createVendor: Vendor }>('/api/graphql', mutation, variables);
      setStatus('success');
      setVendor(createVendor);
    } catch (error) {
      setStatus('error');
    }
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  const categories = [
    'Gemüse / Früchte',
    'Molkereiprodukte',
    'Fleischwaren',
    'Backwaren',
    'Grundnahrungsmittel (Reis, Pasta, ...)',
    'Menüs',
  ];

  const regions = [
    'Zürich (Stadt)',
    'Affoltern',
    'Andelfingen',
    'Bülach',
    'Dielsdorf',
    'Dietikon',
    'Hinwil',
    'Horgen',
    'Meilen',
    'Pfäffikon',
    'Uster',
    'Winterthur',
  ];

  return (
    <Stacked title="Mach mit - Emma bringts!">
      <div className={styles.container}>
        {status === 'success' && vendor !== null && (
          <div>
            <h3 className={styles.title}>Vielen Dank! Hier siehst du dein Angebot:</h3>
            <VendorList vendors={[vendor]} />
          </div>
        )}
        {status === 'error' && (
          <div>
            <h3 className={styles.title}>Das ging leider schief.</h3>
          </div>
        )}
        {(status === null || status === 'pending') && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>Über dein Unternehmen und Angebot</h3>
            <Input name="vendor" onChange={handleChange} label="Anbieter" value={form.vendor} type="text" />
            <Textarea
              onChange={handleChange}
              name="description"
              label="Beschreibe deine Angebote"
              value={form.description}
            />
            <Selection
              onChange={handleListChange}
              label="Angebotskategorie"
              options={categories.map((category) => ({
                label: category,
                value: category,
                name: 'categories',
                checked: form.categories.includes(category),
              }))}
            />

            <h3 className={styles.title}>Bestellungen</h3>

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
                  label: 'Lieferung Velo / Auto',
                  name: 'DELIVERY',
                  checked: form.DELIVERY,
                },
                {
                  label: 'Lieferung per Post',
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
            <Selection
              onChange={handleListChange}
              label="Region"
              options={regions.map((region) => ({
                label: region,
                value: region,
                name: 'region',
                checked: form.region.includes(region),
              }))}
            />
            <Selection
              onChange={handleChange}
              label="Bestellmöglichkeiten"
              options={[
                {
                  label: 'Telefon',
                  name: 'order_by_phone',
                  checked: form.order_by_phone,
                },
                {
                  label: 'E-Mail',
                  name: 'order_by_email',
                  checked: form.order_by_email,
                },
                {
                  label: 'Webseite',
                  name: 'order_by_website',
                  checked: form.order_by_website,
                },
              ]}
            />

            <Input label="Telefon-Nr." name="phone" type="tel" onChange={handleChange} value={form.phone} />
            <Input label="E-Mail" name="email" type="email" onChange={handleChange} value={form.email} />
            <Input label="Webseite" name="website" type="url" onChange={handleChange} value={form.website} />

            <Input
              label="Abholzeiten / mögl. Lieferzeiten"
              name="hours"
              type="text"
              onChange={handleChange}
              value={form.hours}
            />

            <h3 className={styles.title}>Adresse</h3>
            <Input label="Strasse und Nr." name="street" type="text" onChange={handleChange} value={form.street} />
            <div className={styles.street}>
              <div className={styles.zip}>
                <Input label="PLZ" name="zip" type="number" onChange={handleChange} value={form.zip} />
              </div>
              <div className={styles.locality}>
                <Input label="Ort" name="locality" type="text" onChange={handleChange} value={form.locality} />
              </div>
            </div>
            <Button disabled={status === 'pending'} type="submit">
              {status === 'pending' ? 'Wird gespeichert...' : 'Angebot hinzufügen'}
            </Button>
          </form>
        )}
      </div>
    </Stacked>
  );
};
