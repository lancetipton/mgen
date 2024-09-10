// @ts-check

/** @type {import("syncpack").RcFile} */
const syncPackCfg = {
  versionGroups: [
    {
      isIgnored: true,
      packages: ['@mgen/**'],
      dependencies: ['@mgen/**'],
      label: 'Workspace packages not updated',
    },
  ],
  source: [`package.json`, `repos/*/package.json`],
}

module.exports = syncPackCfg
