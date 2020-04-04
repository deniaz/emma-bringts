import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, useEffect, useReducer } from 'react';

/**
 * The `useQuerParamState` synchronizes a given state with URL Query Parameters.
 * E.g. a state of `{ foo: "foo", bar: "bar" }` will automatically be synced with ?foo=foo&bar=bar.
 *
 * To set or change the value of a property use `dispatch({ type: "SET", key: "foo", value: newValue })` and to remove it
 * `dispatch({ type: "REMOVE", key: "bar" })`.
 *
 * @param initial {Object} Initial State.
 */
export function useQueryParamState<S>(initial: S) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const [state, dispatch] = useReducer<Reducer<S>>(reducer, initial);

  const { replace, pathname } = useRouter();

  useEffect(() => {
    const allKeys = Object.keys(state);
    const nonNullKeys = allKeys.filter((key) => state[key] !== null);
    const nonEmptyArrayKeys = nonNullKeys.filter((key) => !Array.isArray(state[key]) || state[key].length > 0);

    const nextQuery = nonEmptyArrayKeys.reduce(
      (acc, key) => ({
        ...acc,
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        [key]: isArrayWithElements(state[key]) ? state[key].map(encodeURIComponent) : encodeURIComponent(state[key]),
      }),
      {}
    );

    replace({
      query: nextQuery,
      pathname,
    });
  }, [state]);

  return [state, dispatch] as [S, Dispatch<Action>];
}

type Action =
  | {
      type: 'SET';
      key: string;
      value: string | string[];
    }
  | { type: 'REMOVE'; key: string };

type Reducer<S> = (prevState: S, action: Action) => S;

function reducer<S>(state: S, action: Action): S {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        [action.key]: action.value,
      };

    case 'REMOVE':
      return {
        ...state,
        [action.key]: null,
      };

    default:
      return state;
  }
}

export function getArrayFromQuery(query: ParsedUrlQuery, key: string) {
  let array = [];

  if (query[key] && Array.isArray(query[key])) {
    array = (query[key] as string[]).map((el) => decodeURIComponent(el));
  } else if (typeof query[key] === 'string' && query[key] !== '') {
    array = [decodeURIComponent(query[key] as string)];
  }

  return array;
}

const isArrayWithElements = (value: string | string[] | null) => Array.isArray(value) && value.length > 0;
