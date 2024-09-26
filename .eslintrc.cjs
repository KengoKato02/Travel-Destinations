module.exports = {
  extends: ['extreme'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  rules: {
    'n/no-process-env': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
};
