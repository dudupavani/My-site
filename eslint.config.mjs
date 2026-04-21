import { createRequire } from "module";

const require = createRequire(import.meta.url);

const coreWebVitals = require("eslint-config-next/core-web-vitals");
const tsConfig = require("eslint-config-next/typescript");

export default [
  ...coreWebVitals,
  ...tsConfig,
  {
    rules: {
      // react-hooks v5 introduced this rule but it flags valid patterns like
      // data fetching and state sync in effects that are standard in this project
      "react-hooks/set-state-in-effect": "off",
      // Project intentionally uses <img> in several places (hero, blog covers, etc.)
      "@next/next/no-img-element": "warn",
      // Allow _-prefixed parameters to indicate intentionally unused
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
