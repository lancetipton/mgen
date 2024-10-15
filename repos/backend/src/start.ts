import { setup } from './setup.js'
import { serve } from './serve.js'
import { APIPort } from './constants.js'
import { getRootLoc, getBinLoc } from './paths.js'


export const start = async () => {

  const bin = getBinLoc()
  const { location } = await setup()

  const proc = serve({
    bin,
    port: APIPort,
    config: location,
    root: getRootLoc(),
    args: [
      `--cors`,
      `--no-clipboard`,
      `--no-port-switching`,
    ]
  })

  return proc
}

