import type Maybe from './Maybe.js';
import type { Predicate, Refinement } from '@bitty/predicate';

import None from './None.js';
import Some from './Some.js';

export default function fromPredicate<T, T2 extends T>(
  predicate: Refinement<T, T2>,
): (value: T) => Maybe<T2>;
export default function fromPredicate<T>(
  predicate: Predicate<T>,
): (value: T) => Maybe<T>;
export default function fromPredicate(predicate: Predicate) {
  return (value: unknown) => (predicate(value) ? Some(value) : None);
}
