import test from 'ava';
import Maybe from '../';

test('Maybe typed value can be `null`, `undefined` or `T`', (context) => {
  const valueA = Maybe<number>(undefined);

  context.is(valueA.get(0), 0);

  const valueB = Maybe<number>(null);

  context.is(valueB.get(0), 0);

  const valueC = Maybe<number>(10);

  context.is(valueC.get(0), 10);
});

test('Maybe enforce type safely flows', (context) => {
  const name = Maybe('Naruto Uzumaki');

  const names = name.map((name) => name.replace(/\s+/, ' ').split(' '));

  context.deepEqual(names.get([]), ['Naruto', 'Uzumaki']);
});

test('Maybe.isNone check if value is none', (context) => {
  context.true(Maybe.isNone(null));
  context.true(Maybe.isNone(undefined));
});

test('Maybe.isNone doesn\'t count falsy values as none', (context) => {
  context.false(Maybe.isNone(0));
  context.false(Maybe.isNone(''));
  context.false(Maybe.isNone(NaN));
  context.false(Maybe.isNone(false));
});

test('Maybe.map call fn if value is some', (context) => {
  const size = Maybe<number>(undefined);

  let fnWasCalledForSize = false;

  size.map(() => fnWasCalledForSize = true);

  context.false(fnWasCalledForSize);

  const font = Maybe<string>('Operator Mono');

  let fnWasCalledForFont = false;

  font.map(() => fnWasCalledForFont = true);

  context.true(fnWasCalledForFont);
});

test('Maybe.map returns a Maybe typed value', (context) => {
  const value = Maybe<number>(150);

  const hash = value.map((value) => {
    return Math.ceil(value).toString(16).substr(0, 8).padStart(8, '0');
  });

  const key = 'id-' + hash.get('00000000');

  context.is(key, 'id-00000096');
});
