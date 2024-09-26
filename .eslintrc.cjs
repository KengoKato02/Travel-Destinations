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
    'import/no-unresolved': 'error', // Reports unresolved imports
    'import/named': 'error', // Reports missing named imports
  },
  ignorePatterns: ['node_modules', 'dist'],
};
