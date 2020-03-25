import { FC, FormEvent } from 'react';
import { Button } from '../elements/button';

const styles = {
  title: 'text-lg leading-6 font-medium text-gray-900',
  info: 'mt-1 text-sm leading-5 text-gray-500',
  section: 'mt-6',
  block: 'mt-8 border-t border-gray-200 pt-8',
  col: 'w-1/2 mb-4',
  label: 'block text-sm font-medium leading-5 text-gray-700',
  inputWrap: 'mt-1 rounded-md shadow-sm',
  input:
    'appearance-none bg-white border-gray-300 rounded-md border px-3 py-2 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5',
  textareaWrap: '',
};

type Props = {
  onSubmit(e: FormEvent): void;
};

export const Participate: FC<Props> = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <div>
        <div>
          <h3 className={styles.title}>Anbieter</h3>
          <p className={styles.info}>Stell dein Unternehmen vor.</p>
        </div>

        <div className={styles.section}>
          <div className={styles.col}>
            <label htmlFor="vendor" className={styles.label}>
              Anbieter
            </label>
            <div className={styles.inputWrap}>
              <input name="vendor" id="vendor" className={styles.input} />
            </div>
          </div>

          <div className={styles.col}>
            <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
              Was genau bietest du an?
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <textarea name="about" id="about" rows={3} className={styles.input}></textarea>
            </div>
            <p className="mt-2 text-sm text-gray-500">Schreib ein paar Sätze über dein aktuelles Angebot.</p>
          </div>

          <legend className="text-base font-medium text-gray-900">Adresse / Abholort</legend>
          <div className={styles.col}>
            <label htmlFor="address" className={styles.label}>
              Strasse und Nr.
            </label>
            <div className={styles.inputWrap}>
              <input name="address" id="address" className={styles.input} />
            </div>
          </div>
          <div className={styles.col}>
            <label htmlFor="zip" className={styles.label}>
              PLZ
            </label>
            <div className={styles.inputWrap}>
              <input name="zip" id="zip" className={styles.input} />
            </div>
          </div>
          <div className={styles.col}>
            <label htmlFor="city" className={styles.label}>
              Ortschaft
            </label>
            <div className={styles.inputWrap}>
              <input name="city" id="city" className={styles.input} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <h3 className={styles.title}>Dein Angebot</h3>
        <p className={styles.info}>Beschreibe dein Angebot.</p>

        <fieldset className="mt-4">
          <legend className="text-base font-medium text-gray-900">Welche Kategorien passen zu deinem Angebot?</legend>
          <div className="mt-4">
            <div className="relative flex items-start">
              <div className="absolute flex items-center h-5">
                <input
                  id="veggies"
                  name="veggies"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              <div className="pl-8 text-sm leading-5">
                <label htmlFor="veggies" className="font-medium text-gray-700">
                  Gemüse / Früchte
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="dairy"
                    name="dairy"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="dairy" className="font-medium text-gray-700">
                    Molkereiprodukte
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="meat"
                    name="meat"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="meat" className="font-medium text-gray-700">
                    Fleischwaren
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="staple"
                    name="staple"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="staple" className="font-medium text-gray-700">
                    Grundnahrungsmittel (Reis, Pasta, ...)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative flex items-start">
              <div className="absolute flex items-center h-5">
                <input
                  id="meal"
                  name="meal"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              <div className="pl-8 text-sm leading-5">
                <label htmlFor="meal" className="font-medium text-gray-700">
                  Menüs
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-base font-medium text-gray-900">Lieferung / Abholung</legend>
          <div className="mt-4">
            <div className="relative flex items-start">
              <div className="absolute flex items-center h-5">
                <input
                  id="takeaway"
                  name="takeaway"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              <div className="pl-8 text-sm leading-5">
                <label htmlFor="takeaway" className="font-medium text-gray-700">
                  Abholung
                </label>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="delivery_mail"
                    name="delivery_mail"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="delivery_mail" className="font-medium text-gray-700">
                    Lieferung per Post
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="delivery"
                    name="delivery"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="delivery" className="font-medium text-gray-700">
                    Lieferung per Velo / Auto
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="relative flex items-start">
                <div className="absolute flex items-center h-5">
                  <input
                    id="self_service"
                    name="self_service"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                </div>
                <div className="pl-8 text-sm leading-5">
                  <label htmlFor="self_service" className="font-medium text-gray-700">
                    Selbst ernten
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-8">
          <legend className="text-base font-medium text-gray-900">Bestellmöglichkeiten</legend>
          <div className={[styles.col, 'mt-4'].join(' ')}>
            <label htmlFor="phone" className={styles.label}>
              Telefon
            </label>
            <div className={styles.inputWrap}>
              <input name="phone" id="phone" className={styles.input} />
            </div>
          </div>
          <div className={[styles.col, 'mt-4'].join(' ')}>
            <label htmlFor="mail" className={styles.label}>
              E-Mail
            </label>
            <div className={styles.inputWrap}>
              <input name="mail" id="mail" className={styles.input} />
            </div>
          </div>
          <div className={[styles.col, 'mt-4'].join(' ')}>
            <label htmlFor="website" className={styles.label}>
              Webseite
            </label>
            <div className={styles.inputWrap}>
              <input name="website" id="website" className={styles.input} />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div className="pt-5">
      <Button type="submit">Speichern</Button>
    </div>
  </form>
);
