import type { MaybeMethods } from './Maybe.js';

interface None extends MaybeMethods<unknown> {
  _kind: 'None';
}

const None: None = {
  _kind: 'None',
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
