// Rollup plugins
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import multi from 'rollup-plugin-multi-input';
import preprocess from 'svelte-preprocess';
// PostCSS plugins
const autoprefixer = require('autoprefixer');

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
      postcss({
        extract: true,
        plugins: [autoprefixer],
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),]
  }
];