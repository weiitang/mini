/* eslint-disable import/prefer-default-export */
import Taro from '@tarojs/taro';
import Aegis from 'aegis-mp-sdk';

const key = 'mZJmwFLW37qEZX4k7E';

let aegisInstance: any = null;

/* 获取当前页url*/
export const getCurrentPageUrl = () => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  return url;
};

export const pageToLogin = () => {
  const path = getCurrentPageUrl();
  if (typeof path === 'string' && !path.includes('login')) {
    Taro.navigateTo({
      url: '/pages/welcome-module/welcome/welcome',
    });
  }
};

export const initSdk = (uid) => {
  aegisInstance = new Aegis({
    id: key,
    uin: uid,
    reportApiSpeed: true,
    reportAssetSpeed: true,
    spa: true,
  });
};

export function setUIN(uin) {
  aegisInstance?.setConfig({
    uin,
  });
};

/**
 * 主动上报错误
 * @param error Error实例或字符串
 * @param info 可选，额外用于error trace的信息
 */
export function reportError(error: Error | string, info?: any) {
  setTimeout(() => {
    const errorMsg = `主动上报：${error}`;
    const ext = info && info !== 0 ? JSON.stringify(info) : undefined;
    aegisInstance?.error({
      msg: errorMsg,
      ext2: ext,
    });
  }, 0);
}

/**
 * 自定义事件上报
 * 用于埋点统计某些功能的使用情况
 * @returns
 */
export function reportEvent(options: {
  /**
   * 上报模块的类型 + 上报模块名称 + 自定义上报事件名称
   * @example component.editor.parseWordFile
   */
  name: string;
  /**
   * 额外的备注信息，用于自定义事件日志检索
   */
  remark?: string | object;
}) {
  setTimeout(() => {
    let ext: any;

    const { name, remark } = options;

    if (remark) {
      if (typeof remark === 'string') {
        ext = remark;
      } else {
        ext = JSON.stringify(remark);
      }
    }

    aegisInstance?.reportEvent({
      name,
      ext2: ext,
    });
  }, 0);
}

// 过滤参数为null
export const handleParamsNull = (object: {[key: string]: any}) => {
  const target = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const i in object) {
    if (Object.prototype.hasOwnProperty.call(object, i)) {
      if (object[i] !== null && object[i] !== undefined) {
        Object.assign(target, {
          [i]: object[i],
        });
      };
    };
  };
  return target;
};
