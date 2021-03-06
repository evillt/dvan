const path = require('path')
const isLocalPath = require('./isLocalPath')

const pluginName = name => `Unnamed plugin from "${name}"`

module.exports = (api, plugins) => {
  return plugins.map(plugin => {
    if (plugin && typeof plugin === 'object') {
      if (!plugin.name) {
        plugin.name = pluginName(path.basename(api.config.path))
      }

      return plugin
    }

    if (typeof plugin === 'string') {
      const _plugin = isLocalPath(plugin)
        ? require(path.join(api.cwd, plugin))
        : api.localRequire(plugin)

      if (!_plugin.name) {
        _plugin.name = pluginName(plugin)
      }

      return _plugin
    }
  })
}
