import test from 'ava';
import { isNone } from '../';

// ..:: isNone tests ::..

test('isNone check if value is none', (context) => {
  context.true(isNone(null));
  context.true(isNone(undefined));
});

test('isNone doesn\'t count falsy values as none', (context) => {
  context.false(isNone(0));
  context.false(isNone(''));
  context.false(isNone(NaN));
  context.false(isNone(false));
});
