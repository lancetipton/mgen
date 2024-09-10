import { fdir } from 'fdir'
import path from 'node:path'
import { MConfigFile, SConfigFile } from './constants.js'

const buildPaths = (dir) => (acc, file) => {
  if(file.endsWith(MConfigFile) || file.endsWith(SConfigFile)) return acc

  const clean = file.replace(dir, '')
  acc[clean] = clean
  const parsed = path.parse(clean)
  const isRoot = parsed.dir === `/`

  isRoot
    ? (acc[`/${parsed.name}`] = clean)
    : (acc[`${parsed.dir}/${parsed.name}`] = clean)

  if(parsed.name === `index`){
    acc[`${parsed.dir}`] = clean
    !isRoot && (acc[`${parsed.dir}/`] = clean)
  }

  return acc
}


export const crawl = (dir, cfg={}) => {
  return new fdir()
    .withFullPaths()
    .crawl(dir)
    .sync()
    .reduce(buildPaths(dir), {})
}