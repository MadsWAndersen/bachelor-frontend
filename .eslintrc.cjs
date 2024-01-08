module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:prettier/recommended',
	],
	plugins: ['vitest'],
	rules: {
		'vue/attribute-hyphenation': 'off',
		'vue/no-boolean-default': 'off',
		'vue/multi-word-component-names': [
			'error',
			{
				ignores: ['Button', '[slug]', 'index', 'login', 'default'],
			},
		],
		'object-shorthand': ['error', 'methods'],
	},
}
