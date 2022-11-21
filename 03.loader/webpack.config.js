const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        // loader: 'loader1'
        // use: [
        //   'loader1',
        //   'loader2',
        //   {
        //     loader: 'loader3',
        //     options: {
        //       name: 'zx',
        //       age: 22
        //     }
        //   }
        // ]

        loader: 'babelLoader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    ]
  },

  // 配置loader解析规则
  resolveLoader: {
    modules: [
      'node_modules',
      resolve(__dirname, 'loaders')
    ]
  }
}