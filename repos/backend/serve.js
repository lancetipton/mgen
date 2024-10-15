#!/usr/bin/env node
import path from 'node:path'
import {
  serve,
  APIPort,
  getBinLoc,
  getRootLoc,
  getSitesLoc,
  ServeFinalLoc,
} from './dist/index.js'


const restarts = parseInt(process.env.MG_RESTART_ATTEMPTS, 10) || 0
const run = (times) => {
  try {
    const bin = getBinLoc()
    const dir = getSitesLoc()
    const location = path.join(dir, ServeFinalLoc)
    serve({
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
  }
  catch(err){
    console.error(err)

    if(times < restarts){
      times += 1
      console.log(`Restart attempt ${times}...`)
      setTimeout(() => run(times), 1000)
    }

    else process.exit(1)
  }
}

run(0)
