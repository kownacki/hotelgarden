import resolve from 'rollup-plugin-node-resolve';
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

export default {
  input: 'src/hg-app.js',
  output: {
    file: 'dist/src/hg-app.js',
    format: 'cjs',
  },
  plugins: [
    del({targets: 'dist'}),
    resolve(),
    copy({
      targets: [
        {src: 'index.html', dest: 'dist'},
        {
          src: [
            'src/fonts',
            'src/images',
            'src/styles.css',
          ],
          dest: 'dist/src',
        },
      ],
    }),
  ],
};
