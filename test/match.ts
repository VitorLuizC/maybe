import test from 'ava';
import { match } from '../';

test('match call none pattern if value is none', (context) => {
  let noneWasCalledOnSize = false;
  let someWasCalledOnSize = false;

  match(undefined, {
    none: () => noneWasCalledOnSize = true,
    some: () => someWasCalledOnSize = true,
  });

  context.true(noneWasCalledOnSize);
  context.false(someWasCalledOnSize);
});

test('match call some pattern if value is some', (context) => {
  let noneWasCalledOnFont = false;
  let someWasCalledOnFont = false;

  match('Operator Mono', {
    none: () => noneWasCalledOnFont = true,
    some: () => someWasCalledOnFont = true,
  });

  context.false(noneWasCalledOnFont)
  context.true(someWasCalledOnFont)
});

test('match returns pattern returned value', (context) => {
  const pattern = {
    none: () => 'font-family: sans-serif;',
    some: (font: string) => `font-family: '${font}';`,
  };

  const valueA = match('Operator Mono', pattern);
  const valueB = match(undefined, pattern);

  context.is(valueA, 'font-family: \'Operator Mono\';');
  context.is(valueB, 'font-family: sans-serif;');
});
