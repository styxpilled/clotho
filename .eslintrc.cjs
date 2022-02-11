module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs', '*.d.ts', 'public/**/*', 'rollup.config.js'],
	overrides: [
    { files: ['*.svelte'], processor: 'svelte3/svelte3' },
    { files: ['*.ts', '*.svelte'], rules: {"no-undef": "off"} }
  ],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
