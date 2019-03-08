import { Nothing, isNothing } from './nothing';

/**
 * Get the placeholder if the value is `Nothing` and the value itself otherwise.
 * @example
 * ```ts
 * let name: string | Nothing;
 *
 * get(name, 'Unknown');
 * //=> 'Unknown'
 *
 * name = 'Will';
 *
 * get(name, 'Unknown');
 * //=> 'Will'
 * ```
 * @param value - An unsafe value of generic type `T` or `Nothing`.
 * @param placeholder - Placeholder of type `T` returned if value is `Nothing`.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 */
function get<T>(value: T | Nothing, placeholder: T): T {
  return isNothing(value) ? placeholder : value;
}

/**
 * Call fn (the map function) with value as the argument and return its result
 * if the value isn't `Nothing`. Otherwise return `Nothing`, without calling fn
 * (the map function).
 * @example
 * ```ts
 * let name: string | Nothing;
 *
 * map(name, (name) => name.split(''));
 * //=> undefined
 *
 * name = 'William';
 *
 * map(name, (name) => name.split(''));
 * //=> ['W', 'i', 'l', 'l', 'i', 'a', 'm']
 * ```
 * @param value - An unsafe value of generic type `T` or `Nothing`.
 * @param fn - The map function called with value as the argument if it isn't
 * `Nothing`.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 * @typeparam U - The generic type of value returned by fn (the map function).
 */
function map<T, U>(value: T | Nothing, fn: (value: T) => U | Nothing): U | Nothing {
  return isNothing(value) ? undefined : fn(value);
}

/**
 * Interface of patterns and their handlers (functions) for the value that maybe
 * is `Nothing`.
 * @example
 * ```ts
 * const pattern: MaybePattern<string, Array<string>> = {
 *   none: () => [],
 *   some: (name) => name.split(''),
 * };
 * ```
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 * @typeparam U - The generic type of value returned by handlers (functions).
 */
interface MaybePattern<T, U> {
  /**
   * Handler (function) for pattern matched if the value is `Nothing`. It
   * doesn't receive the value as the argument.
   */
  none: () => U;

  /**
   * Handler (function) for pattern matched if the value isn't `Nothing`. In
   * contrast to the none handler, it receives value as the argument.
   * @param value - The value (not `Nothing`).
   */
  some: (value: T) => U;
}

/**
 * Match the value pattern, call its handler (function) and return its result.
 * It matches pattern `none` if the value is `Nothing` and `some` otherwise.
 * @example
 * ```ts
 * let name: string | Nothing;
 *
 * match(name, {
 *   none: () => [],
 *   some: (name) => name.split(''),
 * });
 * //=> []
 *
 * name = 'Max';
 *
 * match(name, {
 *   none: () => [],
 *   some: (name) => name.split(''),
 * });
 * //=> ['M', 'a', 'x']
 * ```
 * @param value - An unsafe value of generic type `T` or `Nothing`.
 * @param pattern - A MaybePattern implementation for the value.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 * @typeparam U - The generic type of value returned by handlers (functions) of
 * the patterns.
 */
function match<T, U>(value: T | Nothing, pattern: MaybePattern<T, U>): U {
  return isNothing(value) ? pattern.none() : pattern.some(value);
}

/**
 * Interface of Maybe instances, objects that wraps unsafe values and provide
 * methods to handle it in a _safe flow_.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 */
interface Maybe<T> {
  /**
   * @private
   * A property used to check if value is a Maybe.
   */
  _isMaybe: true;

  /**
   * Get Maybe wrapped value if it isn't `Nothing` and a placeholder otherwise.
   * @example
   * ```ts
   * createMaybe<string>(null).get('Unknown');
   * //=> 'Unknown'
   *
   * createMaybe<string>('Will').get('Unknown');
   * //=> 'Will'
   * ```
   * @param placeholder - The placeholder returned if wrapped value is `Nothing`.
   */
  get: (placeholder: T) => T;

  /**
   * If Maybe wrapped value is `Nothing` it returns a Maybe<U>, without calling
   * fn (the map function). Otherwise, call fn (the map function) with Maybe
   * wrapped value as the argument and return a new Maybe from its result, it
   * also prevents Maybe from wrap anotherMaybe instance (flatten).
   * @example
   * ```ts
   * createMaybe<string>().map((name) => name.split(''));
   * //=> Maybe<string[]>
   *
   * createMaybe('Max').map((name) => name.split(''));
   * //=> Maybe<string[]>
   *
   * const toLetters = (word: string) => createMaybe<string[]>(
   *   !!word.trim() ? [...word] : undefined
   * );
   *
   * createMaybe('Max').map(toLetters);
   * //=> Maybe<string[]>
   * ```
   * @param fn - The map function called with value as the argument if it isn't
   * `Nothing`.
   * @typeparam U - The generic type of value returned by fn (the map function).
   */
  map: <U>(fn: (value: T) => U | Maybe<U>) => Maybe<U>;

  /**
   * Match Maybe wrapped value pattern, call its handler (function) and return
   * the result. It matches pattern `none` if the value is `Nothing` and `some`
   * otherwise.
   * @example
   * ```ts
   * createMaybe<string>().match({
   *   none: () => [],
   *   some: (name) => name.split(''),
   * });
   * //=> []
   *
   * createMaybe('Max').match({
   *   none: () => [],
   *   some: (name) => name.split(''),
   * });
   * //=> ['M', 'a', 'x']
   * ```
   * @param pattern - A MaybePattern implementation for the value.
   * @typeparam U - The generic type of value returned by handlers (functions)
   * of the patterns.
   */
  match: <U>(pattern: MaybePattern<T, U>) => U;

  /**
   * Return Maybe wrapped value (unwraps it).
   * @example
   * ```ts
   * createMaybe<string>().unwrap();
   * //=> undefined
   *
   * createMaybe<string>('Max').unwrap();
   * //=> 'Max'
   * ```
   */
  unwrap: () => T | Nothing;
}

/**
 * Check if value is a Maybe.
 * @param value - Any value compared to Maybe.
 */
function isMaybe(value: unknown): value is Maybe<any> {
  return !!value && (value as { _isMaybe?: any })._isMaybe === true;
}

/**
 * A function that wraps the unsafe value, of generic type `T` or `Nothing`,
 * into Maybe and provide methods to handle it in a _safe flow_.
 * @example
 * ```ts
 * createMaybe<string>(element.value);
 * //=> Maybe<string>
 *
 * createMaybe(response.data);
 * //=> Maybe<{ users: string[] }>
 *
 * const answer = createMaybe<boolean>(undefined);
 * answer.get(false);
 * //=> false
 * ```
 * @param value - An unsafe value of generic type `T` or `Nothing`.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 */
function createMaybe<T>(value: T | Nothing): Maybe<T> {
  return {
    _isMaybe: true,

    get: get.bind(undefined, value) as unknown as (placeholder: T) => T,

    map: <U>(fn: (value: T) => U | Maybe<U>): Maybe<U> => {
      if (isNothing(value))
        return createMaybe<U>();
      const _value = fn(value);
      return (
        isMaybe(_value)
          ? _value as Maybe<U>
          : createMaybe(_value as U)
      );
    },

    match: match.bind(undefined, value) as unknown as <U>(pattern: MaybePattern<T, U>) => U,

    unwrap: (): T | Nothing => value,
  };
}

/**
 * A function that create Maybe<U> from `Nothing` (without a value). Its an
 * useful return for undesirable values.
 * @example
 * ```ts
 * None<string>();
 * //=> Maybe<string>
 *
 * Number.isNaN(value) ? None<number>() : Some<number>(value);
 * //=> Maybe<number>
 *
 * const req = () => request('/user').then(Some).catch(None);
 * await req();
 * //=> Maybe<User>
 * ```
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 */
function None<T>(): Maybe<T> {
  return createMaybe<T>(undefined);
}

/**
 * A function that create Maybe<U> from a safe value (not `Nothing`). Throws
 * an error if value is `Nothing`.
 * @example
 * ```ts
 * Some('William');
 * //=> Maybe<string>
 *
 * Number.isNaN(value) ? None<number>() : Some<number>(value);
 * //=> Maybe<number>
 *
 * const req = () => request('/user').then(Some).catch(None);
 * await req();
 * //=> Maybe<User>
 * ```
 * @param value - A safe value of generic type `T`.
 * @typeparam T - Generic type of the safe value (other than `Nothing`).
 */
function Some<T>(value: T): Maybe<T> {
  if (isNothing(value))
    throw new Error('Can\'t use none as Maybe.some value.');
  return createMaybe<T>(value);
}

export {
  Nothing,
  isNothing,
  get,
  map,
  MaybePattern,
  match,
  createMaybe,
  isMaybe,
  None,
  Some,
};

export default createMaybe;
