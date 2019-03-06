import test from 'ava';
import { isNothing } from '../';

test('isNothing check if value is Nothing', (context) => {
  context.true(isNothing(null));
  context.true(isNothing(undefined));
});

test('isNothing doesn\'t count falsy values as Nothing', (context) => {
  context.false(isNothing(0));
  context.false(isNothing(''));
  context.false(isNothing(NaN));
  context.false(isNothing(false));
});
