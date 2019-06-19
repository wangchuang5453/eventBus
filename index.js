class EventEmitter {
    constructor() {
        this._events = this._events || new Map()
        this._maxListener = this._maxListener || 10
    }
}
// 触发
EventEmitter.prototype.emit = function (type, ...args) {
    // 获取事件回调函数
    const handler = this._events.get(type)
    if (!handler) return
    if (Array.isArray(handler)) {
        for (let i = 0; i < handler.length; i++) {
            if (args.length > 0) {
                handler[i].apply(this, args)
            } else {
                handler[i].call(this)
            }
        }
    } else {
        if (args.length > 0) {
            handler.apply(this, args)
        } else {
            handler.call(this)
        }
    }
    return true
}
// 添加监听
EventEmitter.prototype.addListener = function (type, fn) {
    const handler = this._events.get(type)
    if (!handler) {
        this._events.set(type, fn)
    } else if (handler && typeof handler === 'function') {
        this._events.set(type, [handler, fn])
    } else {
        handler.push(fn)
    }
}
// 删除监听
EventEmitter.prototype.removeListener = function (type, fn) {
    const handler = this._events.get(type)
    if (!handler) return
    if (typeof handler === 'function') {
        this._events.delete(type, fn)
    } else {
        for (let i = 0; i < handler.length; i++) {
            if (handler[i] === fn) {
                handler.splice(i, 1)
                break
            }
        }
        if (handler.length === 1) {
            this._events.set(type, handler[0])
        }
    }
}

const emitter = new EventEmitter()
const expl = function (val) {
    console.log('expel' + val)
}
const save = function (val) {
    console.log('save' + val)
}
emitter.addListener('spk', expl)
emitter.addListener('spk', save)
emitter.removeListener('spk', save)
emitter.emit('spk', 111)
