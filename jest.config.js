module.exports = {
  testEnvironment: 'node',
  verbose: true,
  roots: ['tests'],
  testMatch: [
    '**/tests/**/*test.js',
    '**/?(*.)+(test).js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};
