const { validate } = require('schema-utils')
const globby = require('globby')
const path = require('path')
const fs = require('fs')
const util = require('util')
const webpack = require('webpack')
const { RawSource } = webpack.sources

const readFile = util.promisify(fs.readFile)

// 检验options规则
const schema = {
  type: 'object',
  properties: {
    from: {
      // 类型
      type: 'string',
    },
    to: {
      type: 'string'
    },
    ignore: {
      type: 'array'
    },
  },
  // 是否允许追加其它属性
  additionalProperties: false
}

class CopyWebpackPlugin {
  constructor (options = {}) {
    // 验证options是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin'
    })

    this.options = options
  }

  apply (compiler) {
    // 初始化compilation
    compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', compilation => {
      // 添加资源的hooks
      compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async cb => {
        // 将from中的资源复制到to中，输出出去
        const { from, ignore } = this.options
        const to = this.options.to ? this.options.to : '.'
        
        // context就是webpack配置
        // 运行指令的目录
        const context = compiler.options.context  // process.cwd()

        // 将输入路径变成绝对路径
        let absoluteFrom = path.isAbsolute(from) ? from : path.join(context, from)
        absoluteFrom = absoluteFrom.replaceAll('\\', '/')

        // 1. 过滤掉ignore的文件
        // globby(要处理的文件夹，options)
        // paths 所有要加载的文件路径数组
        const paths = await globby(absoluteFrom, { ignore })

        // 2. 读取paths中所有资源
        const files = await Promise.all(
          paths.map(async absolutePath => {
            // 读取文件
            const data = await readFile(absolutePath)
            // 得到最后的文件名称
            const relativePath = path.basename(absolutePath)
            // 和to属性结合
            // 没有to --> reset.css
            // 有to --> css/reset.css
            const filename = path.join(to, relativePath)

            return { 
              // 文件数据
              data,
              // 文件名称
              filename
            }
          })
        )

        // 3. 生产webpack格式的资源
        const assets = files.map(file => {
          const source = new RawSource(file.data)
          return {
            source,
            filename: file.filename
          }
        })

        // 4. 添加compilation中，输出出去
        assets.forEach(asset => {
          compilation.emitAsset(asset.filename, asset.source)
        })

        cb()
      })
    })
  }
}

module.exports = CopyWebpackPlugin