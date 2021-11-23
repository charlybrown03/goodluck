module.exports = {
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
