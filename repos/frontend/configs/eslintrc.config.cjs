const rootConfig = require('../../../configs/eslintrc.config.js')

module.exports = {
  ...rootConfig,
  /* ---- Repo specific options here ---- */
  ignorePatterns: [`scripts/setupTests.ts`],
  env: {
    es2021: true,
    browser: true,
  },
  parserOptions: {
    tsconfigRootDir: require('path').join(__dirname, `../`),
    sourceType: `module`,
    ecmaVersion: `latest`,
    project: [`./tsconfig.json`],
  },
  extends: [
    ...rootConfig.extends,
    `plugin:react/recommended`,
    `plugin:react/jsx-runtime`,
    `plugin:jsx-a11y/recommended`,
  ],
  plugins: [...rootConfig.plugins, `react`, `react-hooks`, `jsx-a11y`],
  rules: {
    ...rootConfig.rules,
    [`import/no-extraneous-dependencies`]: [`error`, { devDependencies: true }],
  },
  settings: {
    ...rootConfig.settings,
    react: {
      version: `detect`,
    },
  },
}
