/**
 * Combine JavaScript empty (null) and undefined types.
 */
type None = void | null | undefined;

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

export { None };

export default Maybe;
