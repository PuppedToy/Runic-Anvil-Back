module.exports = {
  setupFiles: ['<rootDir>/jestConfigFiles/env'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!app.js',
  ],
  coverageDirectory: '.coverage',
  coverageReporters: [
    'json-summary',
    'text',
    'lcov',
  ],
};
