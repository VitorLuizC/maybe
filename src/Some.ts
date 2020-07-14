import type { MaybeMethods } from './Maybe';
import isMaybe from './isMaybe';

interface Some<T> extends MaybeMethods<T> {
  _kind: 'Some';
}

function Some<T>(value: T): Some<T> {
  return {
    _kind: 'Some',
    map: (fn) => Some(fn(value)),
    then: (fn) => {
      const valueOrMaybe = fn(value);
      return isMaybe(valueOrMaybe) ? valueOrMaybe : Some(valueOrMaybe);
    },
    chain: (fn) => fn(value),
    match: ({ some }) => some(value),
    fold: (_, onSome) => onSome(value),
    isNone: () => false,
    isSome: () => true,
    getOrElse: () => value,
    unwrap: () => value,
  };
}

export default Some;
