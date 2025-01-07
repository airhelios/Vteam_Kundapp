/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  // transform: {
  //   "^.+.tsx?$": ["ts-jest",{}],
  // },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Use babel-jest for both JavaScript and TypeScript files
  },
  transformIgnorePatterns: ['/node_modules/(?!(react-leaflet|@react-leaflet|leaflet)/)'],
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js", // Mock images
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/helpers/**",
    "!src/redux/**",
    "!src/module_typings/**"
  ],
  "coverageDirectory": "coverage",
  "coverageReporters": ["text", "lcov","clover"],
  extensionsToTreatAsEsm: [".ts", ".tsx"], // Treat TypeScript files as ESM
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};