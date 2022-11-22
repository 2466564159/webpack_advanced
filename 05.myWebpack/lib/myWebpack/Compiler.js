const fs = require('fs')
const path = require('path')
const { getAst, getDeps, getCode } = require('./parser')

class Compiler {
  constructor(options = {}) {
    // webpack配置对象
    this.options = options
    // 所有依赖的容器
    this.modules = []
  }

  // 启动webpack打包
  run() {
    // 入口文件路径
    const filePath = this.options.entry

    // 第一次构建
    this.build(filePath)

    const depsGraph = this.modules.reduce((graph, module) => {
      return {
        ...graph,
        [module.filePath]: {
          code: module.code,
          deps: module.deps
        }
      }
    }, {})

    this.generate(depsGraph)
  }

  // 开始构建
  build(filePath) {
    // 1. 将文件解析成ast
    const ast = getAst(filePath)
    // 2. 获取ast中所有的依赖
    const deps = getDeps(ast, filePath)
    // 3. 将ast解析成code
    const code = getCode(ast)

    const fileInfo = {
      // 文件路径
      filePath,
      // 当前文件的所有依赖
      deps,
      // 当前文件解析后的代码
      code
    }

    this.modules.push(fileInfo)
   
    // 遍历所有的依赖
    for (const relative in deps) {
      // 依赖文件的绝对路径
      const absolutePath = deps[relative]
      // 对依赖文件进行处理
      this.build(absolutePath)
    }

    return fileInfo
  }

  // 生成输出资源
  generate (depsGraph) {
    const bundle = `
      (function (depsGraph) {

        // require目的：加载入口文件
        function require(module) {

          // 定义模块内部的require函数
          function localRequire(relativePath) {
            // 为了找到要引入模块的绝对路径，通过require加载
            return require(depsGraph[module].deps[relativePath])
          }

          // 定义暴露对象（将来模块要暴露的内容）
          var exports = {}

          !function(require, exports, code) {
            eval(code)
          }(localRequire, exports, depsGraph[module].code)

          // 作为require函数的返回值返回出去
          // 后面的require函数能得到暴露的内容
          return exports
        }

        // 加载入口文件
        require('${this.options.entry.replaceAll('\\', '\\\\')}')

      })(${JSON.stringify(depsGraph)})
    `
    // 生成输出文件的绝对路径
    const filePath = path.resolve(this.options.output.path, this.options.output.filename)
    // 写入文件
    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}

module.exports = Compiler