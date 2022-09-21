/**
 * title:EventEmitter
 * Author: Ouming
 * Desc: 事件定订阅类
 *
 *
 * process
 * 1、创建EventEmitter类
 * 2、创建一个事件中心 Map
 * 3、on方法用来把函数fn加到事件中心中（订阅者注册事件到调度中心）
 * 4、emit方法去到arguments里第一个当做event，根据event值去执行对应事件中心中的函数（发布者发布事件到调度中心，中心处理代码）
 * 5、off方法根据event值取消订阅（取消订阅）
 * 6、once方法只监听一次，调用完毕后删除缓存函数（订阅一次）
 * 7、注册一个newListener用于监听新的事件订阅
 */

class EventEmitter {
  constructor() {
    //用来存放注册的事件与回调
    this._events = {};
  }

  //订阅方法：将事件回调函数存储到对应的事件上
  on(eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('The evet-triggered callback must be a function');
    }

    //如果绑定的时间不是newListener就触发回调
    if (this._events[eventName] && this._events !== 'newListener') {
      this.emit('newListener', eventName);
    }

    //一个事件可能会多次注册回调函数，所以用数组来存储事件队列
    const callbacks = this._events[eventName] || [];

    callbacks.push(callback);

    this._events[eventName] = callbacks;
  }

  //发布方法：获取到事件对应的回调函数依次执行
  emit(eventName, ...args) {
    //args是用来收集发布事件时的传参
    const callbacks = this._events[eventName] || [];

    callbacks.forEach(cb => cb(...args));
  }

  //取消订阅：找到事件对应的回调函数，删除对应的回调函数
  off(eventName, callback) {
    const callbacks = this._events[eventName] || [];

    const newCallbacks = callbacks.filter(fn => fn != callback && fn.initCallback != callback);

    this._events[eventName] = newCallbacks;
  }

  //单次订阅：先注册，执行后取消订阅
  once(eventName, callback) {
    //由于需要在回调函数执行后，取消订阅当前事件，所以需要对传入的回调函数做一层包装，然后绑定包装后的函数
    const one = (...args) => {
      //执行回调函数
      callback(...args);
      //取消订阅当前事件
      this.off(eventName, one);
    };

    // 由于：我们订阅事件的时候，修改了原回调函数的引用，所以，用户触发 off 的时候不能找到对应的回调函数
    // 所以，我们需要在当前函数与用户传入的回调函数做一个绑定，我们通过自定义属性来实现
    one.initCallback = callback;

    this.on(eventName, one);
  }

  //注册一个newListener用于监听新事件：在用户注册的事件的时候，发布一下newListener事件
}
