const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor () {
    // 初始化hooks容器
    this.hooks = {
      // 同步hooks，任务依次执行
      // go: new SyncHook(['address'])
      // SyncBailHook：一旦有返回值就会退出
      go: new SyncBailHook(['address']),
      // 异步hooks
      // AsyncParallelHook：异步并行
      // leave: new AsyncParallelHook(['name', 'age']),
      // AsyncSeriesHook：异步串行
      leave: new AsyncSeriesHook(['name', 'age']),
    }
  }

  tap () {
    // 向hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('class0318', address => {
      console.log('class0318', address)
      return 111
    })

    this.hooks.go.tap('class0522', address => {
      console.log('class0522', address)
    })

    this.hooks.leave.tapAsync('class0630', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0630', name, age)
        cb()
      }, 2000)
    })

    this.hooks.leave.tapPromise('class0805', (name, age) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('class0805', name, age)
          resolve()
        }, 1000)
      })
    })
  }

  start () {
    // 触发hooks
    this.hooks.go.call('c318')

    this.hooks.leave.callAsync('zx', 22, function () {
      // 代表所有leave容器中的函数触发完了，才触发
      console.log('end')
    })
  }
}

const lesson = new Lesson()

lesson.tap()
lesson.start()