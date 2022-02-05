import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import multi from 'rollup-plugin-multi-input';

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
  input: ['src/picker.ts'],
  output: {
    format: 'iife',
    dir: 'public/build',
  },
  plugins: [
    typescript(),
    resolve({browser: true}),
    commonjs(),
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
      include: 'src/**/*.svelte',
    }),
    postcss(),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
  ],
},
];