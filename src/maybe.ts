import { Nothing, isNothing } from './nothing';

/**
 * Returns value if some or placeholder otherwise.
 * @param value - None or a value.
 * @param placeholder - A value returned if first is none.
 */
function get<T>(value: T | Nothing, placeholder: T): T {
  return isNothing(value) ? placeholder : value;
}

/**
 *  if some or return none.
 * @param value - None or a value.
 * @param fn - A mapper function
 */
function map<T, U>(value: T | Nothing, fn: (value: T) => U | Nothing): U | Nothing {
  return isNothing(value) ? undefined : fn(value);
}

/**
 * MaybePattern is a type to used to match maybe patterns and handle each one.
 */
type MaybePattern<T, U> = {
  none: () => U;
  some: (value: T) => U;
};

/**
 * Match a pattern and execute it's function with value.
 * @param value - None or a value.
 * @param pattern - Patterns to handle.
 */
function match<T, U>(value: T | Nothing, pattern: MaybePattern<T, U>): U {
  return isNothing(value) ? pattern.none() : pattern.some(value);
}

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
  get: (placeholder: T) => T;

  /**
   * Call mapper if value is some and wraps return into new Maybe.
   * @param fn - Mapper function receives value and return another one.
   */
  map: <U>(fn: (value: T) => U | Maybe<U>) => Maybe<U>;

  /**
   * Match a pattern and execute it's function.
   */
  match: <U>(pattern: MaybePattern<T, U>) => U;

  /**
   * Unwraps value and return it.
   */
  unwrap: () => T | Nothing;
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
function Maybe<T>(value: T | Nothing): Maybe<T> {
  return {
    _isMaybe: true,

    get: get.bind(undefined, value) as unknown as (placeholder: T) => T,

    map: <U>(fn: (value: T) => U | Maybe<U>): Maybe<U> => {
      if (isNothing(value))
        return Maybe();
      const _value = fn(value);
      return isMaybe(_value) ? _value as Maybe<U> : Maybe(_value as U);
    },

    match: match.bind(undefined, value) as unknown as <U>(pattern: MaybePattern<T, U>) => U,

    unwrap: (): T | Nothing => value,
  };
}

/**
 * Create a Maybe instance for none value.
 */
function None<T>(): Maybe<T> {
  return Maybe<T>(undefined);
}

/**
 * Create a Maybe instance for some value (non-none), throws Error otherwise.
 * @param value - A non-none value.
 */
function Some<T>(value: T): Maybe<T> {
  if (isNothing(value))
    throw new Error('Can\'t use none as Maybe.some value.');
  return Maybe<T>(value);
}

export {
  Nothing,
  isNothing,
  get,
  map,
  MaybePattern,
  match,
  Maybe,
  isMaybe,
  None,
  Some,
};

export default Maybe;
