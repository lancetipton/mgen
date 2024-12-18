#!/usr/bin/env node
import path from "node:path"
import { cwd } from "node:process"
import { platform } from "node:os"
import { spawn } from "node:child_process"

const execPath = cwd()
const binPath = path.join(__dirname, "bin")

let nginxProcess

const confPath = (() => {
  const argIndex = process.argv.findIndex(arg => arg === "-c")

  if (argIndex > -1) {
    const filePath = process.argv[argIndex + 1]

    if (filePath) return path.join(execPath, filePath)
    return ""
  }

  return path.join(execPath, "nginx.conf")
})()

const nginxArgv = [
  "-g", "daemon off",
  ...process.argv.slice(2),
  "-c", confPath,
]

switch (platform()) {
  case "win32":
    nginxProcess = spawn(
      path.join(binPath, "nginx.exe"),
      nginxArgv,
      { cwd: binPath }
    )
    break

  case "linux":
    nginxProcess = spawn(
      path.join(binPath, "nginx"),
      nginxArgv,
      { cwd: binPath }
    )
    break

  default:
    console.error(`Unsupported platform "${platform()}".`)
    process.exit(1)
}

console.log(`Starting nginx with command "${nginxProcess.spawnargs.join(" ")}".`)

nginxProcess.stdout.pipe(process.stdout)
nginxProcess.stderr.pipe(process.stderr)
process.stdin.pipe(nginxProcess.stdin)

nginxProcess.on("spawn", () => {
  setTimeout(() => console.log("Nginx started."), 300)
})

nginxProcess.on("error", (err) => {
  console.error(`Error starting nginx: ${err.message}`)
  process.exit(1)
})

nginxProcess.on("exit", (code, signal) => {
  console.log(`Nginx exited with code ${code} and signal ${signal}.`)
  process.exit(code)
})
