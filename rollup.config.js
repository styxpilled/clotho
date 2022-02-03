import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
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
        // dont create js file, only css
        extract: true,
        plugins: []
      }),
    ],
  },
  {
  input: ['src/**/*.ts'],
  output: {
    format: 'esm',
    dir: 'public/build',
  },
  plugins: [
    multi(),
    typescript(),
  ],
},
{
  input: ['src/**/*.js'],
  output: {
    format: 'esm',
    dir: 'public/build',
  },
  plugins: [
    multi(),
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

// export default [
//   // This is the main page
//   {
//     input: 'src/app.js',
//     output: {
//       file: 'public/build/bundle.js',
//       format: 'iife',
//       name: 'app',
//     },
//     plugins: [
//       svelte({
//         include: 'src/**/*.svelte',
//       }),
//       css({ output: 'bundle.css' }),
//       resolve({
//         browser: true,
//         dedupe: ["svelte"],
//       }),
//       commonjs(),
//     ],
//   },
//   // This is the options page
//   {
//     input: "src/options.js",
//     output: {
//       file: "public/build/options.js",
//       format: "iife",
//       name: "options"
//     },
//     plugins: [
//       svelte({
//         include: 'src/**/*.svelte',
//       }),
//       css({ output: 'options.css' }),
//       resolve({
//         browser: true,
//         dedupe: ["svelte"],
//       }),
//       commonjs(),
//     ]
//   },
//   // Background scripts
//   {
//     input: "src/background.ts",
//     output: {
//       format: "iife",
//       file: "public/build/background.js",
//     },
//     plugins: [
//       resolve({ browser: true }),
//       typescript(),
//       commonjs()],
//   },
//   // Content scripts - picker
//   {
//     input: "src/picker.ts",
//     output: {
//       format: "iife",
//       file: "public/build/picker.js",
//     },
//     plugins: [
//       resolve({ browser: true }),
//       typescript(),
//       commonjs()],
//   },
//   // Content scripts - picker css
//   {
//     input: "src/picker.css",
//     output: {
//       file: "public/build/picker.css",
//     },
//     plugins: [
//       css({ output: 'picker.css' }),
//     ]
//   },
// ];