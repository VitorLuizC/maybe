type Maybe <T> = void | T;

const Maybe = {
  isNone <T> (value: Maybe<T>): value is void {
    return value === null || value === undefined;
  },

  map <T, U> (value: Maybe<T>, fn: (value: T) => U): Maybe<U> {
    return Maybe.isNone(value) ? void value : fn(value);
  },
};

export default Maybe;
