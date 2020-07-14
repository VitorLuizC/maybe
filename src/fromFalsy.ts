import type Maybe from './Maybe.js';

import isFalsy, { Falsy, NonFalsy } from '@bitty/falsy';

import None from './None.js';
import Some from './Some.js';

export default function fromFalsy<R>(value?: Falsy | R): Maybe<NonFalsy<R>> {
  return isFalsy(value) ? None : Some(value as NonFalsy<R>);
}
