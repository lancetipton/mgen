import { setup } from './setup'
import { serve } from './serve'
import { APIPort } from './constants'
import { getRootLoc, getBinLoc } from './paths'


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

