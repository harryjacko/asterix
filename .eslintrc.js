module.exports = {
  extends: [
    "expo",
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["prettier", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
        "no-shadow": "off",
        "no-undef": "off",
        "spaced-comment": [
          "error",
          "always",
          {
            markers: ["/"],
          },
        ],
      },
    },
  ],
};
