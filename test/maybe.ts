import test from 'ava';
import Maybe, { isMaybe } from '../';

// ..:: isMaybe tests ::..

test('isMaybe check if value is a Maybe', (context) => {
  context.true(isMaybe(Maybe()));
  context.false(isMaybe({}));
  context.false(isMaybe(NaN));
  context.false(isMaybe(undefined));
});

// ..:: Maybe factory tests ::..

test('Maybe typed value can be `null`, `undefined` or `T`', (context) => {
  const valueA = Maybe<number>(undefined);

  context.is(valueA.get(0), 0);

  const valueB = Maybe<number>(null);

  context.is(valueB.get(0), 0);

  const valueC = Maybe<number>(10);

  context.is(valueC.get(0), 10);
});

// ..:: Maybe.none tests ::..

test('Maybe.none creates Maybe for none value', (context) => {
  let fnWasCalled = false;

  Maybe.none().then(() => {
    fnWasCalled = true;
  });

  context.false(fnWasCalled);
});

test('Maybe.none creates a Maybe instance', (context) => {
  context.true(isMaybe(Maybe.none()));
});

// ..:: Maybe.some ::..

test('Maybe.some throws error if value is none', (context) => {
  context.throws(() => Maybe.some(null));
  context.throws(() => Maybe.some(undefined));
});

test('Maybe.some creates a Maybe instance', (context) => {
  context.true(isMaybe(Maybe.some(10)));
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

  context.true(isMaybe(value));

  let fnWasCalled = false;

  value.then(() => fnWasCalled = true);

  context.false(fnWasCalled);
});

test('Maybe.map resolve Maybe<Maybe<any>> to Maybe<any>', (context) => {
  const value = Maybe<number>(100).map((value) => Maybe(value));

  context.true(isMaybe(value));

  value.then((value) => {
    context.is(value, 100)
    context.false(isMaybe(value))
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

// ..:: maybe.then tests ::..

test('Maybe.match runs none if is none', (context) => {
  const size = Maybe.none<number>();

  let noneWasCalledOnSize = false;
  let someWasCalledOnSize = false;

  size.match({
    none: () => noneWasCalledOnSize = true,
    some: () => someWasCalledOnSize = true,
  });

  context.true(noneWasCalledOnSize);
  context.false(someWasCalledOnSize);
});

test('Maybe.match runs some if is some', (context) => {
  const font = Maybe.some<string>('Operator Mono');

  let noneWasCalledOnFont = false;
  let someWasCalledOnFont = false;

  font.match({
    none: () => noneWasCalledOnFont = true,
    some: () => someWasCalledOnFont = true,
  });

  context.false(noneWasCalledOnFont)
  context.true(someWasCalledOnFont)
});
