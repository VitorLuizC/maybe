import test from 'ava';
import { map, isNothing } from '../';

test('map only call fn if value is some', (context) => {
  let fnWasCalled = false;

  map(0, () => fnWasCalled = true);

  context.true(fnWasCalled);
});

test('map returns Nothing if value is none', (context) => {
  const valueA = map(null, () => 10);
  const valueB = map(undefined, () => 'Isn\'t Nothing.');

  context.true(isNothing(valueA));
  context.true(isNothing(valueB));
});
