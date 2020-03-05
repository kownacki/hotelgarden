import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default [{
  input: 'src/hg-app.js',
  output: {
    file: 'dist/src/hg-app.js',
    format: 'iife',
  },
  plugins: [
    del({targets: 'dist'}),
    copy({
      targets: [
        {src: 'index.html', dest: 'dist'},
        {src: 'index.html', dest: 'dist', rename: '404.html'},
        {src: 'resources', dest: 'dist'},
        {src: 'node_modules/@ckeditor', dest: 'dist/node_modules'},
        {src: 'node_modules/pdfmake/build', dest: 'dist/node_modules/pdfmake'},
        {src: 'googlec2ac75b505b73639.html', dest: 'dist'},
        {src: 'BingSiteAuth.xml', dest: 'dist'},
      ],
    }),
    resolve(),
    commonjs(), // For moment.js, which is not 100% es6 modules :(
    minifyHTML(),
    terser(),
  ],
}, {
  input: 'src/styles/shared-styles.js',
  output: {
    file: 'dist/src/styles/shared-styles.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(), // For moment.js, which is not 100% es6 modules :(
    minifyHTML(),
    terser(),
  ],
}, {
  input: 'src/styles/ck-content.js',
  output: {
    file: 'dist/src/styles/ck-content.js',
    format: 'esm',
  },
  plugins: [
    resolve(),
    commonjs(), // For moment.js, which is not 100% es6 modules :(
    minifyHTML(),
    terser(),
  ],
}];
