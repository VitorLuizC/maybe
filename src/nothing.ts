/**
 * A union of JavaScript `void`, `null` and `undefined` types.
 *
 * ```ts
 * let value: Nothing;
 *
 * value = null;
 * value = undefined;
 * value = ((): void => {})();
 * ```
 *
 * Any other value, even falsy, is not assignable to `Nothing`.
 *
 * ```ts
 * let value: Nothing;
 *
 * value = 100;
 * //=> Error { Type '100' is not assignable to type 'Nothing'. }
 *
 * value = NaN;
 * //=> Error { Type 'number' is not assignable to type 'Nothing'. }
 * ```
 */
export type Nothing = void | null | undefined;

/**
 * Check if the value is `Nothing`. It returns `true` if the value matches
 * `void`, `null` or `undefined` and `false` otherwise.
 *
 * ```ts
 * isNothing();
 * //=> true
 *
 * isNothing(null);
 * //=> true
 *
 * isNothing(undefined);
 * //=> true
 *
 * isNothing(0);
 * //=> false
 * ```
 *
 * It uses a type predicate and prevent some mistakes with type check.
 *
 * ```ts
 * let name: string | Nothing;
 *
 * isNothing(name) ? '' : name.toLowerCase();
 * //=> ''
 *
 * isNothing(name) ? name.trim() : '';
 * //=> Error { Object is possibly 'null' or 'undefined'. }
 * //=> Error { Property 'trim' does not exist on type 'void'. }
 * ```
 *
 * @param value - A value to be compared to Nothing.
 */
export function isNothing(value: unknown): value is Nothing {
  return value === null || value === undefined;
}
