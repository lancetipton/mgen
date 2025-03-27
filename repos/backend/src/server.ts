
import path from 'node:path'
import { serve } from './serve'
import { APIPort, ServeFinalLoc } from './constants'
import {
  getBinLoc,
  getSitesLoc,
  getServeLoc,
} from './paths'


const restarts = parseInt(process.env.MG_RESTART_ATTEMPTS, 10) || 0
export const server = (times:number=0) => {
  try {
    const bin = getBinLoc()
    const dir = getSitesLoc()
    const location = path.join(dir, ServeFinalLoc)
    serve({
      bin,
      port: APIPort,
      config: location,
      root: getServeLoc(),
      args: [
        `--cors`,
        `--no-clipboard`,
        `--no-port-switching`,
      ]
    })
  }
  catch(err){
    console.error(err)

    if(times < restarts){
      times += 1
      console.log(`Restart attempt ${times}...`)
      setTimeout(() => server(times), 1000)
    }

    else process.exit(1)
  }
}

