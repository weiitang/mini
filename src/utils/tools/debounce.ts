/*
 * @Description:节流防抖函数
 * @Version: 1.0
 * @Author: DerrickFeng
 * @Date: 2022-09-29 15:15:40
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-18 09:22:09
 */
/* eslint-disable @typescript-eslint/naming-convention */

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}
type fnType<T> = (...args: T[]) => any;
type successCallbackType<T = any> = (...args: T[]) => any;
type failCallbackType<T = any> = (...args: T[]) => any;
/**
 *
 * @param fn 节流的函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @param successCallback 成功回调
 * @param failCallback 失败回调
 * @returns 节流过的函数
 */
export function debounce<T = any, V = any>(
  fn: fnType<T>,
  delay = 200,
  immediate = false,
  successCallback?: successCallbackType<V>,
  failCallback?: failCallbackType<V>
) {
  let timer: any = null;
  // 是否执行过函数
  let isInvoke = false;
  // 执行函数
  const doWithCatch = (
    callback: fnType<T>,
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
    ...params: T[]
  ) => {
    try {
      const res = callback.call(this, ...params);
      if (isFunction(successCallback)) successCallback(res);
      resolve(res);
    } catch (err: any) {
      isInvoke = true;
      reject(err);
      if (isFunction(failCallback)) failCallback(err);
    }
  };
  const _debounce = function (...params: T[]) {
    return new Promise<T>((resolve, reject) => {
      // 清除定时器
      if (timer) clearTimeout(timer);
      // 立即执行
      if (!isInvoke && immediate) {
        // 立即执行一次
        let res: any;
        try {
          res = fn.call(this, ...params);
        } catch (error: any) {
          isInvoke = true;
          reject(error);
          if (isFunction(failCallback)) failCallback(error);
        }
        // 已经执行过
        isInvoke = true;
        resolve(res);
        if (isFunction(successCallback)) successCallback(res);
      } else {
        timer = setTimeout(() => {
          doWithCatch(fn, resolve, reject, ...params);
          // 表示防抖过的函数已经执行完成 重置标注 方便下一次操作
          isInvoke = false;
          timer = null;
        }, delay);
      }
    });
  };
  // 取消当前的防抖函数执行
  _debounce.cancel = () => {
    clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };
  return _debounce;
}

