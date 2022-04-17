import {nodeResolve} from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'src/hg-app.js',
  output: {
    dir: 'dist/src',
    format: 'module',
  },
  plugins: [
    del({targets: 'dist'}),
    copy({
      targets: [
        // {src: 'index.html', dest: 'dist'},
        // {src: 'index.html', dest: 'dist', rename: '404.html'},
        {src: 'resources', dest: 'dist'},
        {src: 'node_modules/@ckeditor', dest: 'dist/node_modules'},
        {src: 'node_modules/pdfmake/build', dest: 'dist/node_modules/pdfmake'},
        {src: 'robots/*', dest: 'dist'},
      ],
    }),
    nodeResolve(),
    minifyHTML(),
    terser(),
  ],
  manualChunks(id) {
    id = id.replace(/\\/g, '/');
    if (id.includes('node_modules/@firebase') || id.includes('node_modules/firebase')) {
      return 'firebase';
    }
    if (id.includes('node_modules/@material')) {
      return 'material-elements';
    }
    if (id.includes('node_modules/@polymer')) {
      return 'legacy-polymer-elements';
    }
  }
}, {
  input: 'src/styles/shared-styles.js',
  output: {
    file: 'dist/src/styles/shared-styles.js',
    format: 'module',
  },
  plugins: [
    nodeResolve(),
    minifyHTML(),
    terser(),
  ],
}, {
  input: 'src/styles/ck-content.js',
  output: {
    file: 'dist/src/styles/ck-content.js',
    format: 'module',
  },
  plugins: [
    nodeResolve(),
    minifyHTML(),
    terser(),
  ],
}];
