module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/recommended",
    'prettier',
    'prettier/vue',
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:prettier/recommended',
  ],

  plugins: [
    "@typescript-eslint"
  ],

  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 0,
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
    camelcase: 0,
    'space-before-function-paren': 0,
    'prettier/prettier': [
      'error',
      {
        semi: false,
        arrowParens: 'always',
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
}
