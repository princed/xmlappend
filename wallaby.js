module.exports = () => ({
  files: [
    'lib/*.js'
  ],

  tests: [
    '**/__tests__/*.js'
  ],

  env: {
    type: 'node'
  },

  testFramework: 'jest',

  debug: true
});
