/* eslint-disable indent */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@next/next/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		indent: ['off', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['off', 'single'],
		semi: ['error', 'always'],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
