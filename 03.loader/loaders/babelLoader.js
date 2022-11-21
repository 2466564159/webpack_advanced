// 检验options函数 
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')

// babel.transform用来编译代码的方法
// 是一个普通异步方法
// util.promisify将普通异步方法转换成基于promise的异步方法
const transform = util.promisify(babel.transform)

// 检验options规则
const schema = {
  type: 'object',
  properties: {
    presets: {
      // 类型
      type: 'array',
    }
  },
  // 是否允许追加其它属性
  additionalProperties: true
}

module.exports = function (content, map, meta) {
  // 获取loader的options配置
  const options = this.getOptions() || {}
  // 检验options
  validate(schema, options, {
    name: 'babelLoader'
  })

  // 创建异步loader
  const callback = this.async()

  // 使用babel编译代码
  transform(content, options)
    .then(({code, map}) => callback(null, code, map, meta))
    .catch(e => callback(e))

  return content
}