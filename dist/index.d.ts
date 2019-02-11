declare type Maybe<T> = void | T;
declare const Maybe: {
    isNone<T>(value: Maybe<T>): value is void;
    map<T, U>(value: Maybe<T>, fn: (value: T) => U): Maybe<U>;
};
export default Maybe;
