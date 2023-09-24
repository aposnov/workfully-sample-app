module.exports = {
    setupFiles: ['dotenv/config'],
    preset: 'ts-jest',
    testEnvironment: 'node', 
    testEnvironmentOptions: { port: 4000 },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };