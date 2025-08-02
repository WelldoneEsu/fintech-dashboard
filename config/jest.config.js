// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 10000,
  moduleNameMapper: {
    '^./config/db$': '<rootDir>/__mocks__/db.js',
  },
};
