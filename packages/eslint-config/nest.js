const base = require("./base");

module.exports = [
  ...base,

  {
    files: ["**/*.ts"],

    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
    },
  },
];
