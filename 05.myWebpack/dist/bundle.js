
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
        require('D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\index.js')

      })({"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\index.js":{"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\nvar _count = _interopRequireDefault(require(\"./count.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nconsole.log((0, _add[\"default\"])(1, 2));\nconsole.log((0, _count[\"default\"])(3, 1));","deps":{"./add.js":"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\add.js","./count.js":"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\count.js"}},"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\add.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _a = _interopRequireDefault(require(\"./a.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nfunction add(x, y) {\n  return x + y;\n}\nvar _default = add;\nexports[\"default\"] = _default;","deps":{"./a.js":"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\a.js"}},"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\a.js":{"code":"\"use strict\";\n\nconsole.log('a.js');","deps":{}},"D:\\2022_code\\zx_projects\\test\\webpack_advanced\\05.myWebpack\\src\\count.js":{"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nfunction count(x, y) {\n  return x - y;\n}\nvar _default = count;\nexports[\"default\"] = _default;","deps":{}}})
    