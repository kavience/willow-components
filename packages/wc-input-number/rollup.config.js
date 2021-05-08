import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'lib',
    format: 'cjs',
    exports: 'auto',
    sourcemap: true
  },
  plugins: [
    commonjs(),
    babel({
      configFile: './babel.config.js',
      babelHelpers: 'runtime',
      extensions: ['ts', 'tsx', '.js', '.jsx']
    }),
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
