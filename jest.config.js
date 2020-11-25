module.exports = {
  setupFiles: ['<rootDir>/jestConfigFiles/env'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!app.js',
    '!src/utils/testing/*'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json-summary',
    'text',
    'lcov',
  ],
};
