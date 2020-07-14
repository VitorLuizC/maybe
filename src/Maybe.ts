import type None from './None.js';
import type Some from './Some.js';

type Maybe<T> = None | Some<T>;

export type MaybePattern<T, T2> = {
  none: () => T2;
  some: (value: T) => T2;
};

export interface MaybeMethods<T> {
  map<T2>(fn: (value: T) => T2): Maybe<T2>;

  then<T2>(fn: (value: T) => T2 | Maybe<T2>): Maybe<T2>;

  chain<T2>(fn: (value: T) => Maybe<T2>): Maybe<T2>;

  isNone(): this is None;

  isSome(): this is Some<unknown>;

  match<T2>(pattern: MaybePattern<T, T2>): T2;

  fold<T2>(onLeft: () => T2, onRight: (value: T) => T2): T2;

  getOrElse(onLeft: () => T): T;

  unwrap(): T | null;
}

export default Maybe;
