function Base() {
  this.events = {}
  this.on = function (name, callback) {
    let eventList = this.events[name]
    if (!eventList) eventList = this.events[name] = []
    if (eventList.indexOf(callback) === -1) {
      eventList.push(callback)
    }
  }

  this.trigger = function (name, data) {
    if (this.events[name]) {
      this.events[name].forEach((callback) => {
        callback.call(this, data)
      })
    }
  }
}

Base.extend = function () {
  var _this = this // 父类

  var Children = function() { // 子类
    _this.call(this)
  }

  Children.prototype = new _this() // 原型继承
  var props = Array.prototype.slice.call(arguments)
  props.push(this)
  merge(Children, props) // 继承父类并且合并新属性

  return Children
}

function merge(target, props) {
  props.forEach(function(item) {
    for (var i in item) {
      if (item.hasOwnProperty(i)) {
        target.prototype[i] = target[i] = item[i]
      }
    }
  })
}

module.exports = Base