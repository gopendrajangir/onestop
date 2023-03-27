/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.svg$': '<rootDir>/fileTransformer.js',
  },
};
