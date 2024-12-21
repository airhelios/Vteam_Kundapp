module.exports = {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }], // Modern JavaScript
      ["@babel/preset-react", {"runtime": "automatic"}],
      "@babel/preset-typescript", // TypeScript support

    ],
  };