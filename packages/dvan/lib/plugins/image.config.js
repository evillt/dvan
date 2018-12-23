exports.name = 'built-in:image.config'

exports.extend = api => {
  api.hook('onCreateWebpackConfig', config => {
    const createMediaRule = require('./shared/createMediaRule')(api, config)

    createMediaRule('image', /\.(png|jpe?g|webp|bmp|gif)(\?.*)?$/, 'url-loader')

    // SVG with file-loader
    // https://github.com/facebookincubator/create-react-app/pull/1180
    createMediaRule('svg', /\.(svg)(\?.*)?$/, 'file-loader')
  })
}