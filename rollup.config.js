import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

/**
 * Creates an output options object.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
const Option = (options) => ({
  exports: 'named',
  sourcemap: true,
  ...options,
});

/**
 * An object with all configuration for `Rollup.js`.
 * @type {import('rollup').RollupOptions[]}
 */
const options = [
  {
    input: './src/main.js',
    output: [
      Option({
        file: './dist/Maybe.js',
        format: 'commonjs',
      }),
      Option({
        file: './dist/Maybe.esm.js',
        format: 'esm',
      }),
      Option({
        file: './dist/Maybe.mjs',
        format: 'esm',
      }),
    ],
  },
  {
    input: './src/main.js',
    plugins: [resolve()],
    output: [
      Option({
        file: './dist/Maybe.umd.js',
        name: 'Maybe',
        format: 'umd',
      }),
      Option({
        file: './dist/Maybe.umd.min.js',
        name: 'Maybe',
        format: 'umd',
        plugins: [terser()],
      }),
    ],
  },
];

export default options;
