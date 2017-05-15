export default {
  format: 'cjs',
  entry: 'src/index.js',
  dest: 'dist/index.js',
  plugins: [ require('rollup-plugin-babel')() ],
}
