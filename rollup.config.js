import nodeResolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-import-css';

export default {
  input: 'packages/index.js',
  output: {
    file: 'src/static/js/main.bundle.js',
    format: 'es',
  },
  plugins: [nodeResolve(), css()],
};