import test from 'ava';
import { get } from '../';

test('get returns value if it\'s some', (context) => {
  context.is(get<number>(0, 100), 0);
  context.is(get<boolean>(true, false), true);
});

test('get returns placeholder if value is none', (context) => {
  context.is(get<string>(null, 'Is empty.'), 'Is empty.');
  context.is(get<boolean>(undefined, true), true);
});
