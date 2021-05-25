module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: 'vuetify',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars':'off',
    'vue/no-unused-components':'off',
    'vue/html-closing-bracket-spacing':'off',
    'comma-spacing':'off',
    'no-multiple-empty-lines':'off',
    'key-spacing':'off',
    'space-before-function-paren':'off',
    'space-before-blocks':'off',
    'comma-dangle':'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
