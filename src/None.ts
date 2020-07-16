import type { MaybeMethods } from './Maybe.js';

interface None<T> extends MaybeMethods<T> {
  _kind: 'None';
}

const None: None<any> = {
  _kind: 'None',
  alt: (fn) => fn(),
  map: () => None,
  then: () => None,
  chain: () => None,
  isNone: () => true,
  isSome: () => false,
  match: ({ none }) => none(),
  fold: (onLeft) => onLeft(),
  getOrElse: (onLeft) => onLeft(),
  unwrap: () => null,
};

export default None;
