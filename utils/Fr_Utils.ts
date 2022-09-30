/***
 * title: Fr_Utils
 * Author: Ouming
 * Desc: 部分常用方法的封装
 */

/**
 *
 * @param timeline
 * @returns
 */
export function transformObjectArray(obj = {}) {
  return Object.entries(obj).map(entry => {
    const [time, number] = entry;
    return { time, number };
  });
}
