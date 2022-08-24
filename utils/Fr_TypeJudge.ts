/***
 * title: Fr_TypeJudge.ts
 * Author: Ouming
 * Desc: 类型判断
 */

let classType = {};

[
  'Boolean',
  'Number',
  'String',
  'Null',
  'Undefined',
  'Symbol',
  'Object',
  'Array',
  'Function',
  'Date',
  'Math',
  'Set',
  'WeakSet',
  'Map',
  'WeakMap',
].forEach(item => {
  classType[`[object ${item}]`] = item.toLowerCase();
});

function type(obj) {
  if (obj == null) {
    return obj + '';
  }
  return typeof obj === 'object' || typeof obj === 'function'
    ? classType[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
}

//判断是否为布尔值
export const isBoolean = obj => {
  return type(obj) === 'boolean';
};

//判断是否为整数
export const isNumber = obj => {
  return type(obj) === 'number';
};

//判断是否为null
export const isNull = obj => {
  return type(obj) === 'null';
};

//判断是否为undefined
export const isUndefined = obj => {
  return type(obj) === 'undefined';
};

//判断是否为字符串
export const isString = obj => {
  return type(obj) === 'string';
};

//判断是否为对象
export const isObject = obj => {
  return type(obj) === 'object';
};

//判断是否为数组
export const isArray = obj => {
  return Array.isArray(obj) || type(obj) === 'array';
};

//判断是否为函数
export const isFunction = obj => {
  return type(obj) === 'function';
};
