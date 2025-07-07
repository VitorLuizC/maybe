import type { MaybeMethods } from './Maybe.js';
import type Some from './Some.js';

interface None<T> extends MaybeMethods<T> {
  _kind: 'None';
}

const None: None<any> = {
  _kind: 'None',
  alt: (fn) => fn(),
  map: () => None,
  then: () => None,
  chain: () => None,
  isNone: (): this is None<any> => true,
  isSome: (): this is Some<any> => false,
  match: ({ none }) => none(),
  fold: (onLeft) => onLeft(),
  getOrElse: (onLeft) => onLeft(),
  unwrap: () => null,
};

export default None;
