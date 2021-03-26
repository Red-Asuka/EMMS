module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/attributes-order': 0,
    'vue/name-property-casing': 0,
    'vue/html-self-closing': 0,
    'vue/no-parsing-error': [
      0,
      {
        'x-invalid-end-tag': false,
      },
    ],
    'vue/mustache-interpolation-spacing': 0,
    'vue/attribute-hyphenation': 0,
    'vue/require-valid-default-prop': 0,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
    'vue/no-unused-components': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/order-in-components': 0,
    'vue/no-dupe-keys': 0,
    'vue/no-template-shadow': 0,
  },
}
