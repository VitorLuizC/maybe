import type Maybe from './Maybe.js';

import None from './None.js';
import Some from './Some.js';

export default function tryCatch<T>(fn: () => T): Maybe<T> {
  try {
    return Some(fn());
  } catch (error) {
    return None;
  }
}
