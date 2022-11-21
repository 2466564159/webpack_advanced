// loader本质上是一个函数

// 检验options函数 
const { validate } =  require('schema-utils')

// 检验options规则
const schema = {
  type: 'object',
  properties: {
    name: {
      // 类型
      type: 'string',
      // 描述
      description: '名称',
    },
  },
  // 是否允许追加其它属性
  additionalProperties: true
};

module.exports = function (content, map, meta) {
  
  // 获取options
  const options = this.getOptions()
  // 检验options
  validate(schema, options)

  console.log(3, options)

  return content
}

module.exports.pitch = function () {
  console.log('pitch 3')
}