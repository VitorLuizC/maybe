import test from 'ava';
import Maybe from '../';

test('Maybe typed value can be `null`, `undefined` or `T`', (context) => {
  let value: Maybe<number>;

  // @ts-ignore
  context.is(value, undefined);

  value = null;

  context.is(value, null);

  value = 10;

  context.is(value, null);
});

test('Maybe enforce type safely flows', (context) => {
  const name = 'Naruto Uzumaki' as Maybe<string>;

  const names = Maybe.isNone(name) ? [] : name.replace(/\s+/, ' ').split(' ');

  context.is(names, ['Naruto', 'Uzumaki']);
});

test('Maybe.isNone check if value is none', (context) => {
  context.true(Maybe.isNone(null as Maybe<[number, number]>));
  context.true(Maybe.isNone(undefined as Maybe<'mobile' | 'desktop'>));
});

test('Maybe.isNone doesn\'t count falsy values as none', (context) => {
  context.false(Maybe.isNone(0 as Maybe<number>));
  context.false(Maybe.isNone('' as Maybe<string>));
  context.false(Maybe.isNone(NaN as Maybe<number>));
  context.false(Maybe.isNone(false as Maybe<boolean>));
});

test('Maybe.map call fn if value is some', (context) => {
  const size = undefined as Maybe<number>;

  let fnWasCalledForSize = false;

  Maybe.map(size, () => fnWasCalledForSize = true);

  context.false(fnWasCalledForSize);

  const font = 'Operator Mono' as Maybe<string>;

  let fnWasCalledForFont = false;

  Maybe.map(font, () => fnWasCalledForFont = true);

  context.true(fnWasCalledForFont);
});

test('Maybe.map returns a Maybe typed value', (context) => {
  const value = 150 as Maybe<number>;

  const hash = Maybe.map(value, (value) => {
    return Math.ceil(value).toString(16).substr(0, 8).padStart(8, '0');
  });

  context.is(hash, '00000096');

  const key = Maybe.isNone(hash) ? 'id-00000000' : 'id-' + hash;

  context.is(key, 'id-00000096');
});
