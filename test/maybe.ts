import test from 'ava';
import createMaybe, { isMaybe, None, Some } from '../';

// ..:: isMaybe ::..

test('isMaybe check if value is a Maybe', (context) => {
  context.true(isMaybe(None<any>()));
  context.false(isMaybe({}));
  context.false(isMaybe(NaN));
  context.false(isMaybe(undefined));
});

// ..:: Maybe ::..

test('Maybe typed value can be `null`, `undefined` or `T`', (context) => {
  const valueA = createMaybe<number>(undefined);

  context.is(valueA.get(0), 0);

  const valueB = createMaybe<number>(null);

  context.is(valueB.get(0), 0);

  const valueC = createMaybe<number>(10);

  context.is(valueC.get(0), 10);
});

// ..:: Maybe.get ::..

test('Maybe.get returns value or placeholder if it\'s none', (context) => {
  const size = None<number>();

  context.is(size.get(0), 0);

  const font = Some<string>('Operator Mono');

  context.is(font.get(''), 'Operator Mono');
});

// ..:: Maybe.map ::..

test('Maybe.map call fn if value is some', (context) => {
  const size = None<number>();

  let fnWasCalledForSize = false;

  size.map(() => fnWasCalledForSize = true);

  context.false(fnWasCalledForSize);

  const font = Some<string>('Operator Mono');

  let fnWasCalledForFont = false;

  font.map(() => fnWasCalledForFont = true);

  context.true(fnWasCalledForFont);
});

test('Maybe.map returns empty Maybe if value is None', (context) => {
  const value = None<number>().map(() => 1000);

  context.true(isMaybe(value));

  let fnWasCalled = false;

  value.map(() => fnWasCalled = true);

  context.false(fnWasCalled);
});

test('Maybe.map resolve Maybe<Maybe<any>> to Maybe<any>', (context) => {
  const value = Some<number>(100).map((value) => Some(value));

  context.true(isMaybe(value));

  value.map((value) => {
    context.is(value, 100)
    context.false(isMaybe(value))
  });
});

// ..:: Maybe.match ::..

test('Maybe.match runs none if is none', (context) => {
  const size = None<number>();

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
  const font = Some<string>('Operator Mono');

  let noneWasCalledOnFont = false;
  let someWasCalledOnFont = false;

  font.match({
    none: () => noneWasCalledOnFont = true,
    some: () => someWasCalledOnFont = true,
  });

  context.false(noneWasCalledOnFont)
  context.true(someWasCalledOnFont)
});

// ..:: Maybe.unwrap ::..

test('Maybe.unwrap returns Maybe wrapped value', (context) => {
  const valueA = null;
  const valueB = undefined;
  const valueC = 'It\'s not Nothing.';

  context.is(createMaybe(valueA).unwrap(), valueA);
  context.is(createMaybe(valueB).unwrap(), valueB);
  context.is(createMaybe(valueC).unwrap(), valueC);
});

// ..:: Some ::..

test('Some throws error if value is none', (context) => {
  context.throws(() => Some(null));
  context.throws(() => Some(undefined));
});

test('Some creates a Maybe instance', (context) => {
  context.true(isMaybe(Some(10)));
});

// ..:: None ::..

test('None creates Maybe for none value', (context) => {
  let fnWasCalled = false;

  None().map(() => {
    fnWasCalled = true;
  });

  context.false(fnWasCalled);
});

test('None creates a Maybe instance', (context) => {
  context.true(isMaybe(None()));
});
