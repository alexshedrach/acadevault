module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import", "security", "node"],
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:security/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/recommended",
    "prettier", // disables formatting rules to defer to Prettier
  ],
  rules: {
    // ✅ Core JS rules
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off",
    "no-undef": "error",
    "no-var": "error",
    "prefer-const": "warn",
    eqeqeq: ["error", "always"],
    "consistent-return": "warn",

    // ✅ Import rules
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    "import/no-unresolved": "error",
    "import/newline-after-import": "warn",
    "import/no-duplicates": "warn",

    // ✅ Node-specific
    "node/no-missing-import": "error",
    "node/no-unsupported-features/es-syntax": [
      "error",
      { version: ">=16.0.0", ignores: ["modules"] },
    ],
    "node/no-extraneous-import": "error",
    "node/no-unsupported-features/node-builtins": "off",

    // ✅ Security (basic static analysis)
    "security/detect-object-injection": "off", // turn off if you do safe object access
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".mjs", ".json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.test.js", "*.spec.js"],
      env: {
        mocha: true,
        jest: true,
      },
    },
    {
      files: ["*.cjs"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
};
