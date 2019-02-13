type None = void | null | undefined;

type Maybe <T> = {
  _isMaybe: true;

  map<U>(fn: (value: T) => U | Maybe<U>): Maybe<U>;

  get(placeholder: T): T;
};

const Maybe = <T>(value: T | None): Maybe<T> => ({
  _isMaybe: true,

  map(fn) {
    if (Maybe.isNone(value))
      return Maybe();
    const mappedValue = fn(value);
    return Maybe.isMaybe(mappedValue) ? mappedValue : Maybe(mappedValue);
  },

  get(placeholder) {
    return Maybe.isNone(value) ? placeholder : value;
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
