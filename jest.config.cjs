/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          module: 'commonjs',
          moduleResolution: 'node',
          target: 'es2020',
          isolatedModules: true,
          strict: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/i18n/(.*)$': '<rootDir>/src/i18n/$1',
    '^@/ui/(.*)$': '<rootDir>/src/ui/$1',
    '^@/ui$': '<rootDir>/src/ui/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}