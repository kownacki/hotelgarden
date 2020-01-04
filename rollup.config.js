import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/hg-app.js',
  output: {
    file: 'dist/src/hg-app.js',
    format: 'cjs',
  },
  plugins: [
    del({targets: 'dist'}),
    resolve(),
    commonjs(), // For moment.js, which is not 100% es6 modules :(
    copy({
      targets: [
        {src: 'index.html', dest: 'dist'},
        {src: 'src/styles.css', dest: 'dist/src'},
        {src: 'resources', dest: 'dist'},
        {src: 'node_modules/@ckeditor', dest: 'dist/node_modules'},
      ],
    }),
    terser(),
  ],
};
