class Plugin1 {
  apply (complier) {
    complier.hooks.emit.tap('Plugin1', compliation => {
      console.log('emit.tap 111')
    })

    complier.hooks.emit.tapAsync('Plugin1', (compliation, cb) => {
      setTimeout(() => {
        console.log('emit.tapAsync 111')
        cb()
      }, 1000)
    })

    complier.hooks.emit.tapPromise('Plugin1', compliation => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('emit.tapPromise 111')
          resolve()
        }, 1000)
      })
    })

    complier.hooks.afterEmit.tap('Plugin1', compliation => {
      console.log('afterEmit.tap 111')
    })

    complier.hooks.done.tap('Plugin1', stats => {
      console.log('done.tap 111')
    })
  }
}

module.exports = Plugin1