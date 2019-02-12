declare type Nothing = void | null | undefined;
declare type Maybe<T> = Nothing | T;
declare const Maybe: {
    isNone<T>(value: Maybe<T>): value is Nothing;
    map<T, U>(value: Maybe<T>, fn: (value: T) => U): Maybe<U>;
};
export { Nothing };
export default Maybe;
