// @ts-check

/** @type {import("syncpack").RcFile} */
const syncPackCfg = {
  versionGroups: [
    {
      isIgnored: true,
      packages: ['@i-360/**'],
      dependencies: ['@i-360/**'],
      label: 'Workspace packages not updated',
    },
  ],
  source: [`package.json`, `repos/*/package.json`],
}

module.exports = syncPackCfg
