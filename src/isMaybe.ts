import type Maybe from './Maybe';
import None from './None';

export default function isMaybe(value: unknown): value is Maybe<unknown> {
  return (value as any)?._kind === 'Some' || value === None;
}
