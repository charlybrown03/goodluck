import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'

export default function injectRedirectsFile() {
  let distPath
  const CONTENT = '/* /index.html 200'

  return {
    apply(config, { command }) {
      const isBuild = command === 'build'

      return isBuild
    },
    name: 'inject-redirects',
    configResolved(config) {
      distPath = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const outPath = resolve(distPath, '_redirects')

      writeFileSync(outPath, CONTENT)
      console.log('_redirects file generated')
    },
  }
}
