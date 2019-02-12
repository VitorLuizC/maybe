type Nothing = void | null | undefined;

type Maybe <T> = Nothing | T;

const Maybe = {
  isNone <T> (value: Maybe<T>): value is Nothing {
    return value === null || value === undefined;
  },

  map <T, U> (value: Maybe<T>, fn: (value: T) => U): Maybe<U> {
    return Maybe.isNone(value) ? void value : fn(value);
  },
};

export { Nothing };

export default Maybe;
