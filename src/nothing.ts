/**
 * Combine JavaScript null and undefined types.
 */
export type Nothing = void | null | undefined;

/**
 * Check if value is none.
 * @param value - Any value compared to none.
 */
export function isNothing(value: unknown): value is Nothing {
  return value === null || value === undefined;
}
