import path from 'node:path'
import { spawn } from "node:child_process"
import { toStr } from '@keg-hub/jsutils/toStr'

export type TServe = {
  root:string
  bin:string
  port?:string
  config?:string
  args?:string[]
}

export type TProc = ReturnType<typeof spawn>


const run = (props:TServe) => {
  const {
    root,
    bin,
    port,
    config,
    args=[],
  } = props

  const opts = [
    ...(port ? [`-p`, toStr(port)] : []),
    ...(config ? [`-c`, config] : []),
    ...args,
    ...process.argv.slice(2)
  ]

  return spawn(path.join(bin, `serve`), opts, { cwd: root })
}

const stdio = (proc:TProc) => {
  proc.stdout.pipe(process.stdout)
  proc.stderr.pipe(process.stderr)
  process.stdin.pipe(proc.stdin)
}

const events = (proc:TProc) => {
  proc.on(`spawn`, () => {
    setTimeout(() => console.log(`MGen Server started.`), 300)
  })

  proc.on(`error`, (err) => {
    console.error(`Error starting MGen server: ${err.message}`)
    process.exit(1)
  })

  proc.on(`exit`, (code, signal) => {
    console.log(`MGen Server exited with code ${code} and signal ${signal}.`)
    process.exit(code)
  })
}


export const serve = (props) => {
  const proc = run(props)
  stdio(proc)
  events(proc)
  return proc
}
