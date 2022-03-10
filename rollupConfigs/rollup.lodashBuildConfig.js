import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'utils/lodashBundle.js',
  output: {
    file: 'resources/scripts/lodashBundle.js',
    format: 'module',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser(),
  ],
}];
