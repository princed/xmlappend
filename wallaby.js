module.exports = () => ({
  files: [
    'lib/*.js',
    'lib/**/*.snap'
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
