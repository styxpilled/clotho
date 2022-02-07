import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import multi from 'rollup-plugin-multi-input';
import css from 'rollup-plugin-css-only';
import preprocess from 'svelte-preprocess';

export default [
  {
    input: ['src/**/*.css'],
    output: {
      dir: 'public/build',
    },
    plugins: [
      multi(),
      postcss({
        include: "**/*.css",
        extract: true,
        plugins: []
      }),
    ],
  },
  {
    input: ['src/pages/*.ts'],
    output: {
      format: 'esm',
      dir: 'public/build',
    },
    plugins: [
      multi(),
      typescript(),
      svelte({
        preprocess: preprocess(),
      }),
      postcss(),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
    ],
  },
  {
    input: 'src/picker/main.ts',
    output: {
      format: 'iife',
      name: 'app',
      dir: 'public/build/picker'
    },
    plugins: [
      typescript({
        sourceMap: true,
      }),
      svelte({
        preprocess: preprocess()
      }),
      css({ output: 'bundle.css' }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),]
  }
];