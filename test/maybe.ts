import test from 'ava';
import Maybe from '../';

// ..:: Maybe factory tests ::..

test('Maybe typed value can be `null`, `undefined` or `T`', (context) => {
  const valueA = Maybe<number>(undefined);

  context.is(valueA.get(0), 0);

  const valueB = Maybe<number>(null);

  context.is(valueB.get(0), 0);

  const valueC = Maybe<number>(10);

  context.is(valueC.get(0), 10);
});

// ..:: Maybe.isNone tests ::..

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

// ..:: Maybe.isMaybe tests ::..

test('Maybe.isMaybe check if value is a Maybe', (context) => {
  context.true(Maybe.isMaybe(Maybe()));
  context.false(Maybe.isMaybe({}));
  context.false(Maybe.isMaybe(NaN));
  context.false(Maybe.isMaybe(undefined));
});

// ..:: maybe.get tests ::..

test('Maybe.get returns value or placeholder if it\'s none', (context) => {
  const size = Maybe<number>();

  context.is(size.get(0), 0);

  const font = Maybe<string>('Operator Mono');

  context.is(font.get(''), 'Operator Mono');
});

// ..:: maybe.map tests ::..

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

test('Maybe.map returns empty Maybe if value is None', (context) => {
  const value = Maybe<number>().map(() => 1000);

  context.true(Maybe.isMaybe(value));

  let fnWasCalled = false;

  value.then(() => fnWasCalled = true);

  context.false(fnWasCalled);
});

test('Maybe.map resolve Maybe<Maybe<any>> to Maybe<any>', (context) => {
  const value = Maybe<number>(100).map((value) => Maybe(value));

  context.true(Maybe.isMaybe(value));

  value.then((value) => {
    context.is(value, 100)
    context.false(Maybe.isMaybe(value))
  });
});

// ..:: maybe.then tests ::..

test('Maybe.then runs fn if value is some', (context) => {
  const size = Maybe<number>(undefined);

  let fnWasCalledForSize = false;

  size.then(() => fnWasCalledForSize = true);

  context.false(fnWasCalledForSize);

  const font = Maybe<string>('Operator Mono');

  let fnWasCalledForFont = false;

  font.then(() => fnWasCalledForFont = true);

  context.true(fnWasCalledForFont);
});
