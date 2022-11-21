// loader本质上是一个函数

// 同步loader
// module.exports = function (content, map, meta) {
//   console.log(1)

//   return content
// }

module.exports = function (content, map, meta) {
  console.log(1)
  
  /*
  如果是处理顺序排在最后一个的 Loader，那么它的返回值将最终交给webpack的require，换句话说，它一定是一段用字符串来存储可执行的JavaScript脚本
  */
  this.callback(null, content, map, meta)

  // return content
}

module.exports.pitch = function () {
  console.log('pitch 1')
}