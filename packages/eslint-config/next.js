const base = require("./base");
const next = require("@next/eslint-plugin-next");

module.exports = [
  ...base,

  {
    plugins: {
      "@next/next": next,
    },

    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
];
