import { Nothing, isNothing } from './nothing';

export { Nothing, isNothing };

/**
 * MaybePattern is a type to used to match maybe patterns and handle each one.
 */
type MaybePattern<T, U> = {
  none: () => U;
  some: (value: T) => U;
};

/**
 * Maybe is a type to handle optional and/or nullable values in a safe flow.
 */
type Maybe <T> = {
  /**
   * A private token to check if value is a Maybe.
   */
  _isMaybe: true;

  /**
   * Return value if some and the placeholder otherwise.
   * @param placeholder - Alternative value, returned if value is none.
   */
  get(placeholder: T): T;

  /**
   * Call mapper if value is some and wraps return into new Maybe.
   * @param fn - Mapper function receives value and return another one.
   */
  map<U>(fn: (value: T) => U | Maybe<U>): Maybe<U>;

  /**
   * Call side-effects function if value is some.
   * @param fn - `do` function receives value and do side-effects.
   */
  then(fn: (value: T) => void): void;

  /**
   * Match a pattern and execute it's function.
   */
  match<U>(pattern: MaybePattern<T, U>): U;
};

/**
 * Check if value is a Maybe.
 * @param value - Any value compared to Maybe.
 */
function isMaybe(value: unknown): value is Maybe<any> {
  return !!value && (value as { _isMaybe?: any })._isMaybe === true;
}

/**
 * Maybe constructor (factory) and helpers.
 * @param value
 */
const Maybe = <T>(value: T | Nothing): Maybe<T> => ({
  _isMaybe: true,

  get(placeholder) {
    return isNothing(value) ? placeholder : value;
  },

  map(fn) {
    if (isNothing(value))
      return Maybe();
    const _value = fn(value);
    return isMaybe(_value) ? _value : Maybe(_value);
  },

  then(fn) {
    if (isNothing(value))
      return;
    fn(value);
  },

  match(pattern) {
    return isNothing(value) ? pattern.none() : pattern.some(value);
  },
});

/**
 * Create a Maybe instance for none value.
 */
Maybe.none = <T>(): Maybe<T> => {
  return Maybe<T>(undefined);
};

/**
 * Create a Maybe instance for some value (non-none), throws Error otherwise.
 * @param value - A non-none value.
 */
Maybe.some = <T>(value: T): Maybe<T> => {
  if (isNothing(value))
    throw new Error('Can\'t use none as Maybe.some value.');
  return Maybe<T>(value);
};

export { MaybePattern, Maybe, isMaybe };

export default Maybe;
