/**
 * Combine JavaScript empty (null) and undefined types.
 */
type None = void | null | undefined;

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
 * Maybe constructor (factory) and helpers.
 * @param value
 */
const Maybe = <T>(value: T | None): Maybe<T> => ({
  _isMaybe: true,

  get(placeholder) {
    return Maybe.isNone(value) ? placeholder : value;
  },

  map(fn) {
    if (Maybe.isNone(value))
      return Maybe();
    const _value = fn(value);
    return Maybe.isMaybe(_value) ? _value : Maybe(_value);
  },

  then(fn) {
    if (Maybe.isNone(value))
      return;
    fn(value);
  },

  match(pattern) {
    return Maybe.isNone(value) ? pattern.none() : pattern.some(value);
  },
});

/**
 * Check if value is none.
 * @param [value]
 */
Maybe.isNone = <T>(value: T | None): value is None => {
  return value === null || value === undefined;
};

/**
 * Check if value is a Maybe.
 * @param [value]
 */
Maybe.isMaybe = (value: any): value is Maybe<any> => {
  return !!(value && value._isMaybe);
};

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
  if (Maybe.isNone(value))
    throw new Error('Can\'t use none as Maybe.some value.');
  return Maybe<T>(value);
};

export { None, MaybePattern };

export default Maybe;
