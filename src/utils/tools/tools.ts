import Taro from '@tarojs/taro';

/** 将时间字符串转换成时间戳函数 */
export const timeStampFn = (time: string) => {
  const date = new Date(time);
  return date.getTime();
};

/**
 * 将对象解析成url参数
 * @param obj
 * @returns
 */
export const objectToString = (obj) => {
  const searchKeys: string[] = [];
  if (Object.prototype.toString.call(obj) === '[object Object]' && Object.keys(obj).length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in obj) {
      searchKeys.push(`${key}=${obj[key]}`);
    }
  }
  return searchKeys.join('&');
};

export const PROMISE_STATE = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const tools = {
  /**
   * 页面Loading
   * @param param
   * @returns
   */
  showLoading: (param) => {
    let dptOpts = {
      title: '加载中...',
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === '[object String]') {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      dptOpts = {
        ...param,
        ...dptOpts,
      };
    }
    return Taro.showLoading(dptOpts);
  },

  /**
   * 页面提示
   * @param param
   * @returns
   */
  showToast: (param) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    type props = {
      title: string,
      icon: 'none' | 'success' | 'error' | 'loading' | undefined,
      duration: number,
      mask: boolean
    };
    let dptOpts: props = {
      title: '温馨提示',
      icon: 'none',
      duration: 2000,
      mask: true, // 防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === '[object String]') {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      dptOpts = {
        ...param,
        ...dptOpts,
      };
    } else {
      throw new Error('参数类型有误，应该是字符串或者对象');
    }
    return Taro.showToast(dptOpts);
  },

  /**
   * 控制字段数目长度
   */

  cutStr: (str: string, len: number, replace?: string) => {
    let length = 0;
    let string = '';

    if (len > str?.length) {
      return str;
    }
    for (let i = 0; i <= len; i++) {
      const a = str?.charAt(i);
      // eslint-disable-next-line no-plusplus
      length++;
      string = string?.concat(a);

      if (length >= len) {
        string = string?.concat(replace ?? '...');
        return string;
      }
    }
  },

  /**
   * descendDateFn:时间倒序函数
   * sortField:待排序字段
   */

  descendDateFn: (data: any[], sortField: string) => {
    let newData: any[] = [];
    newData = data?.sort((a, b) => timeStampFn(b[sortField]) - timeStampFn(a[sortField]));
    return newData;
  },


  /**
   * @description: 判断promise返回状态
   * @param {*} promise
   * @return {*} pending | fulfilled | rejected
   * @author: DerrickFeng
   */
  decidePromiseState: (promise) => {
    const t = {};
    return Promise.race([promise, t])
      .then(v => ((v.code !== 200) ? PROMISE_STATE.PENDING : PROMISE_STATE.FULFILLED))
      .catch(() => PROMISE_STATE.REJECTED);
  },
};
export default tools;


