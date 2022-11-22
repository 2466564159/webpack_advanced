const myWebpack = require('../lib/myWebpack/index.js')
const config = require('../config/webpack.config.js')

const compiler = myWebpack(config)

// 开始打包webpack
compiler.run()