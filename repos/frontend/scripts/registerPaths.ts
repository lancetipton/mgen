import 'esbuild-register'

import tsConfig from '../tsconfig.json'
import { register } from 'tsconfig-paths'
register({
  baseUrl: '../../../',
  paths: tsConfig.compilerOptions.paths,
})
