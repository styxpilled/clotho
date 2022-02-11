// Rollup plugins
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import multi from 'rollup-plugin-multi-input';
// Svelte config
import svelteConfig from './svelte.config';
// PostCSS config
const postCSSConfig = require('./postcss.config.cjs');

export default [
  // This is the picker outline css file
  // Honestly, it doesn't need to use multi-input, but maybe in the future
  // it will process some other files.
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
    // These are the pages
    input: ['src/pages/*.ts'],
    output: {
      // Using esm imports is fine in pages
      format: 'esm',
      dir: 'public/build',
    },
    plugins: [
      multi(),
      typescript(),
      svelte(svelteConfig),
      postcss(postCSSConfig),
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
    ],
  },
  {
    // This is the content script
    input: 'src/picker/main.ts',
    output: {
      // esm imports don't work in content scripts
      format: 'iife',
      name: 'app',
      dir: 'public/build/picker'
    },
    plugins: [
      typescript(),
      svelte(svelteConfig),
      postcss(postCSSConfig),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),]
  }
];