type None = void | null | undefined;

type Maybe <T> = {
  _isMaybe: true;

  get(placeholder: T): T;

  map<U>(fn: (value: T) => U | Maybe<U>): Maybe<U>;

  then(fn: (value: T) => void): void;
};

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

Maybe.isNone = <T>(value: T | None): value is None => {
  return value === null || value === undefined;
};

Maybe.isMaybe = (value: any): value is Maybe<any> => {
  return !!(value && value._isMaybe);
};

export { None };

export default Maybe;
