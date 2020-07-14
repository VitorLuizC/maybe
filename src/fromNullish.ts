import type Maybe from './Maybe.js';

import isNullish, { Nullish, NonNullish } from '@bitty/nullish';

import None from './None.js';
import Some from './Some.js';

export default function fromNullish<R>(
  value?: Nullish | R,
): Maybe<NonNullish<R>> {
  return isNullish(value) ? None : Some(value as NonNullish<R>);
}
