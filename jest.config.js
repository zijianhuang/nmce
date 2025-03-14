module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  moduleDirectories: ['node_modules', 'dist'],
  modulePathIgnorePatterns: [
    "<rootDir>/dist/"
  ],

};