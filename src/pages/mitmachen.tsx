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

const isCheckbox = (element: Targetable): element is HTMLInputElement => element.type === 'checkbox';
function reduce<S>(state: S, target: Targetable): S {
  return {
    ...state,
    [target.getAttribute('name')]: isCheckbox(target) ? target.checked : target.value,
  };
}

type Reducer<S> = (prevState: S, target: Targetable) => S;

const styles = {
  title: 'text-xl text-sans mb-6 text-indigo-900',
  form: 'w-1/2 mx-auto',
  street: 'grid grid-cols-3 gap-4',
  zip: 'col-span-1',
  locality: 'col-span-2',
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
  };

  const [form, dispatch] = useReducer<Reducer<typeof initial>>(reduce, initial);
  const [status, setStatus] = useState<'pending' | 'success' | 'error'>(null);
  const [vendor, setVendor] = useState<Vendor>(null);

  function handleChange(e: ChangeEvent<Targetable>) {
    e.persist();
    dispatch(e.target);
  }

  const submit = async () => {
    setStatus('pending');

    try {
      const mutation = `mutation Vendor($vendor: VendorInput!) {
        create(vendor: $vendor) {
          id
          name
          categories
          body
          region
          service
          hours
          address
          order
          contact
        }
      }`;

      const variables = {
        vendor: {
          name: form.vendor,
          categories: [
            form.veggies && 'veggies',
            form.dairies && 'dairies',
            form.meat && 'meat',
            form.pastries && 'pastries',
            form.staple && 'staple',
            form.meals && 'meals',
          ].filter(Boolean),
          body: form.description,
          service: [
            form.DELIVERY && 'DELIVERY',
            form.DELIVERY_MAIL && 'DELIVERY_MAIL',
            form.TAKEAWAY && 'TAKEAWAY',
            form.SELF_SERVICE && 'SELF_SERVICE',
          ].filter(Boolean),
          hours: form.hours,
          address: `${form.street}, ${form.zip} ${form.locality}`,
          order: [form.order_by_email && 'EMAIL', form.order_by_phone && 'PHONE', form.order_by_website && 'WEBSITE'].filter(
            Boolean
          ),
          contact: [form.phone, form.email, form.website].filter(Boolean),
        },
      };

      const { create } = await request<{ create: Vendor }>('/api/graphql', mutation, variables);
      setStatus('success');
      setVendor(create);
    } catch (error) {
      setStatus('error');
    }
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  return (
    <Stacked>
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
          <Textarea onChange={handleChange} name="description" label="Beschreibe deine Angebote" value={form.description} />
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
    </Stacked>
  );
};
