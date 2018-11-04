const webpack = require('webpack')
const path = require('upath')

module.exports = class Plugin {
  constructor (d) {
    this.root = d
    this.options = d.options
    this.command = d.command
    this.flags = d.flags
    this.mode = d.mode
    this.hooks = d.hooks
    this.config = d.config
    this.pkg = d.pkg
  }

  chainWebpack (fn) {
    this.hooks.add('chainWebpack', fn)
    return this
  }

  registerCommand (command, desc, handler) {
    return this.root.cli.command(command, desc, handler)
  }

  resolve () {
    return path.join(this.options.baseDir, ...arguments)
  }

  resolveWebpackConfig (opts) {
    const WebpackChain = require('webpack-chain')
    const config = new WebpackChain()

    opts = Object.assign({ type: 'client' }, opts)

    this.hooks.invoke('chainWebpack', config, opts)

    return config.toConfig()
  }

  compiler (config) {
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err) return reject(err)
        if (stats.hasErrors()) {
          stats.toJson().errors.forEach(err => {
            console.error(err)
          })
          return reject(new Error('Failed to build with error.'))
        }
        resolve(stats.toJson())
      })
    })
  }

  build (config) {
    this.compiler(config)
    return this
  }
}