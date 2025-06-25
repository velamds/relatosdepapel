module.exports = {
  testEnvironment: 'jsdom',
  // setupFilesAfterEnv ahora apunta a nuestro nuevo archivo de setup
  // que también importa @testing-library/jest-dom
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
};
