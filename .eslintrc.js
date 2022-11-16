module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  globals: {
    test: 'readonly',
    expect: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
  },
};
