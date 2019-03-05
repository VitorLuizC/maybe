/**
 * Combine JavaScript null and undefined types.
 */
export type None = void | null | undefined;

/**
 * Check if value is none.
 * @param value - Any value compared to none.
 */
export function isNone(value: unknown): value is None {
  return value === null || value === undefined;
}
