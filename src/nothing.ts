/**
 * A union of JavaScript `void`, `null` and `undefined` types.
 * @example
 * ```ts
 * let value: Nothing;
 *
 * value = null;
 * value = undefined;
 * value = ((): void => {})();
 * ```
 */
export type Nothing = void | null | undefined;

/**
 * Check if the value is `Nothing`. It returns `true` if the value matches
 * `void`, `null` or `undefined` and `false` otherwise.
 * @example
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
 * @param value - A value to be compared to `Nothing`.
 */
export function isNothing(value: unknown): value is Nothing {
  return value === null || value === undefined;
}
