const tsConfig = require('../tsconfig.json')
const { register } = require('esbuild-register/dist/node')

register({
  tsconfigRaw: {
    compilerOptions: {
      baseUrl: '../',
      paths: tsConfig.compilerOptions.paths,
    }
  }
})

// Must come after the register call above to it can load the typescript file
const { loadEnvs } = require('./loadEnvs')
loadEnvs()
