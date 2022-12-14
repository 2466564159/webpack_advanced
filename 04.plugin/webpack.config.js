// const Plugin1 = require('./plugins/Plugin1')
// const Plugin2 = require('./plugins/Plugin2')
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CopyWebpackPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html']
    })
  ]
}