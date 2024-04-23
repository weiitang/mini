/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-multi-assign */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-duplicates */

import Taro, { disableAlertBeforeUnload, enableAlertBeforeUnload, getStorageSync, downloadFile, getFileSystemManager, openDocument, setStorageSync, navigateTo } from '@tarojs/taro';
import dayjs from 'dayjs';
import { debounce, parseInt } from 'lodash-es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/utc';
import config from '@/config/config';
import { getLoginInfo, preview, signature, validUserType } from '@/service/loginApi';
import { wechat } from '@/utils/mp';
import { getUser } from '@/service/loginApi';
import { useEffect, useRef, useState } from 'react';
import { RequestResponseCode } from '../../types/taro-enum';
import message from './message';
import stores from '../stores';
import { service } from '../service';
import { reportEvent, setUIN } from './common';
import { showToast } from './toast';

const { wexinLogin } = wechat;

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStorgeToFn = (fn: () => void) => {
  Taro.getStorage({
    key: 'uid',
    success: () => {
      Taro.getStorage({
        key: 'engName',
        success: () => fn(),
      });
    },
  });
};

export function getBrowser() {
  const browser: any = {
    msie: false,
    firefox: false,
    opera: false,
    safari: false,
    chrome: false,
    netscape: false,
    appname: 'unknown',
    version: 0,
  };
  const ua = window.navigator.userAgent.toLowerCase();
  if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(ua)) {
    browser[RegExp.$1] = true;
    browser.appname = RegExp.$1;
    browser.version = RegExp.$2;
  } else if (/version\D+(\d[\d.]*).*safari/.test(ua)) {
    // safari
    browser.safari = true;
    browser.appname = 'safari';
    browser.version = RegExp.$2;
  }
  return [browser.appname, browser.version];
}

// 时间戳转天时分秒
/**
 * @description:
 * @param {number} mss
 * @return {*}
 * @author: DerrickFeng
 */
export function formatDuring(mss: number) {
  const days = parseInt(String(mss / (1000 * 60 * 60 * 24)));
  const hours = parseInt(String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days * 24));
  return `${hours}小时`;
}

// 获取url中"?"符后的字串
/**
 * @description:
 * @param {string} url
 * @return {*}
 * @author: DerrickFeng
 */
export function getRequest(url: string) {
  const theRequest: any = {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str?.split('&');
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < strs.length; i += 1) {
      theRequest[strs[i]?.split('=')[0]] = unescape(strs[i]?.split('=')[1]);
    }
  }
  return theRequest;
}

/**
 * 浮点数截取
 * @param value 数值
 * @param n 截取尾数
 * @param isRounding 是否四舍五入
 */
export function FloatSlice(value: number, n: number, isRounding = true) {
  let ret: number;
  // eslint-disable-next-line no-restricted-properties
  const pow = Math.pow(10, n);
  if (isRounding) {
    ret = Math.round(value * pow) / pow;
  } else {
    ret = Math.floor(value * pow) / pow;
  }
  return ret;
}

/** 节流函数 */
export function throttle(fn, interval) {
  let last = 0;
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    const now = +new Date();
    if (now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  };
}

// 判断对象是否为空
export function checkNullObj(obj: Record<string, unknown>) {
  if (Object.keys(obj).length === 0) {
    return false; // 如果为空,返回false
  }
  return true; // 如果不为空，则会执行到这一步，返回true
}

// 十六进制颜色随机
export function color16() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  return color;
}

// 给数字加，号，千位
export function toThousands(n: string) {
  let num = (n || 0).toString();
  let result = '';
  while (num.length > 3) {
    result = `, ${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}

// 格式化时间
export function formatDate(
  fmt:
    | 'YYYY-MM-DD HH:mm'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY/MM/DD HH:mm:ss'
    | 'YYYY/MM/DD HH:mm'
    | 'YYYY-MM-DD'
    | 'YYYY/MM/DD'
    | 'YYYY.MM.DD'
    | 'YYYY/MM'
    | 'YYYY/MM月'
    | 'HH:mm'
    | 'HH:mm:ss'
    | 'YYYY.MM.DD HH:mm'
    | 'MM月DD日 HH:mm'
    | 'MM/DD HH:mm',
  val: string
) {
  return dayjs(val).format(fmt);
}

// 获取时间差【天数】
export function startEndTime(day = 0) {
  return {
    startTime: dayjs(dayjs().subtract(day, 'day')
      .format('YYYY-MM-DD')).utc(),
    endTime: dayjs(dayjs().add(1, 'day')
      .format('YYYY-MM-DD')).utc(),
  };
}

// 计算两个时间之间的时间差
export function getDiffDay(endTime) {
  const startTime = getStorageSync('currentTime');
  if (!startTime) return 30;
  const time: any = endTime - startTime;
  const days = time / (1000 * 60);
  return days;
}

export function delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 生成从minNum到maxNum的随机数
export function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(String(Math.random() * minNum + 1), 10);
    case 2:
      return parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
    default:
      return 0;
  }
}

export function randomString(len = 32) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

// 时区时间获取
export function getLocalTime(i: number) {
  const d = new Date();
  const len = d.getTime();
  const offset = d.getTimezoneOffset() * 60000;
  const utcTime = len + offset;
  return new Date(utcTime + 3600000 * i);
}

// 复制
export function copy(value: string, type?: number) {
  Taro.setClipboardData({
    data: value,
    success: () => {
      if (type) {
        Taro.hideToast();
      } else {
        message.success('复制成功', () => { });
      }
    },
    fail: () => {
      message.error('复制失败');
    },
  });
}

/*
 * 根据数组对象属性删除对应项
 * @param {Array} arr - 数组对象
 * @param {String} attr - 属性
 * @param {} value - 属性值
 * @return void
 */
export function removeByValue(arr, attr, value) {
  let index = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const i in arr) {
    if (arr[i][attr] === value) {
      index = Number(i);
      break;
    }
  }
  arr.splice(index, 1);
}

// 动态插入js或css
export function loadScriptOrCss(url: string, type: 'script' | 'css') {
  if (type === 'script') {
    const scriptDom = document.createElement('script');
    scriptDom.src = url;
    document.body.appendChild(scriptDom);
  }
  if (type === 'css') {
    const fileref = document.createElement('link');
    fileref.rel = 'stylesheet';
    fileref.type = 'text/css';
    fileref.href = url;
    document.getElementsByTagName('head')[0].appendChild(fileref);
  }
}

// 获取时间的多种状态描述
export function compareTime(times: string, type?: number) {
  const day = judgeTime(formatDate('YYYY-MM-DD HH:mm', times).replace(/-|T|:/g, ''));
  if (day === 0) {
    return formatDate('HH:mm', times);
  } if (day === 1) {
    return `昨天 ${formatDate('HH:mm', times)}`;
  } if (day === 2) {
    return `前天 ${formatDate('HH:mm', times)}`;
  } if (day === -1) {
    return `明天 ${formatDate('HH:mm', times)}`;
  } if (day === -2) {
    return `后天 ${formatDate('HH:mm', times)}`;
  }
  if (type === 1) {
    return formatDate('MM/DD HH:mm', times);
  }
  return formatDate('YYYY/MM/DD HH:mm', times);
}

// 判断时间离当前时间的天数
function judgeTime(data) {
  const date = data.toString();
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  const d1 = Number(new Date(`${year}/${month}/${day}`));
  const dd = new Date();
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1;
  const d = dd.getDate();
  const d2 = Number(new Date(`${y}/${m}/${d}`));
  const iday = (d2 - d1) / 1000 / 60 / 60 / 24;
  return iday;
}

// 获取当前时间和结束时间相差秒数
export function getEndAndNowTimestamp(endTime: string) {
  const endTimestamp = Date.parse(new Date(endTime).toString());
  const now_time = Date.parse(new Date().toString());
  const remaining = (endTimestamp - now_time) / 1000;
  return remaining;
}

// 获取服务器当前时间和结束时间相差秒数
export function getEndAndNowTimestampSever(endTime: string, nowTime: string) {
  const endTimestamp = Date.parse(new Date(endTime).toString());
  const now_time = Date.parse(new Date(nowTime).toString());
  const remaining = (endTimestamp - now_time) / 1000;
  return remaining;
}

// 获取指定时间和当天凌晨相差秒数
export function getIsToday(time: string) {
  const timestamp = Date.parse(new Date(time).toString());
  const endTime = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  const remaining = (endTime - timestamp) / 1000;
  return remaining;
}

// 给数字加，号，千位，还要两位小数
export function toThousandsPoint(n: any) {
  let num: number | string = n ? n / 100 : 0; // 转为元
  num = (num || 0).toString();
  const beforePoint = num?.split('.')[0];
  let afterPoint;
  if (num?.split('.').length > 1) {
    // eslint-disable-next-line prefer-destructuring
    afterPoint = num?.split('.')[1];
  }
  num = beforePoint;
  let result = '';
  while (num.length > 3) {
    result = `, ${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  if (afterPoint) {
    return `${result}.${afterPoint}`;
  }
  return `${result}.00`;
}

export function FloatSlicePointTow(value: number, n: number, isRounding = true) {
  // 保留两位小数
  let ret;
  // eslint-disable-next-line no-restricted-properties
  const pow = Math.pow(10, n);
  if (isRounding) {
    ret = Math.round(value * pow) / pow;
  } else {
    ret = Math.floor(value * pow) / pow;
  }
  ret = ret.toString();
  if (ret?.split('.').length > 1 && ret?.split('.')[1].length > 2) {
    ret = `${ret?.split('.')[0]}.${ret?.split('.')[1].slice(0, 2)}`;
  } else if (ret?.split('.').length > 1 && ret?.split('.')[1].length === 1) {
    ret = `${ret}0`;
  } else if (ret?.split('.').length === 1) {
    ret = `${ret}.00`;
  }
  return ret;
}

// 将毫秒转成天 小时 分钟
export function formatTimeToDHMS(mss: number) {
  const days = parseInt(`${mss / (1000 * 60 * 60 * 24)}`);
  const hours = parseInt(`${(mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)}`);
  const minutes = parseInt(`${(mss % (1000 * 60 * 60)) / (1000 * 60)}`);
  const seconds = (mss % (1000 * 60)) / 1000;

  return { days, hours, minutes, seconds };
}

// 获取字符串字符数
export function codeLen(str: string) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

/** 解析url参数 */
export function urlToParams(url: string) {
  if (!url) {
    return {};
  }
  const paramUrl = url?.split('?')[1];
  if (!paramUrl) {
    return {};
  }
  const params: any = {};
  paramUrl?.split('&').forEach((item) => {
    const key = item?.split('=')[0];
    const value = item?.split('=')[1];
    params[key] = value;
  });
  return params;
}

/**
 * @description:跳转页面
 * @param {string} url 路径
 * @param {boolean} isRedirect 是否重定向
 * @author: DerrickFeng
 */
export function goPage(url: string, isRedirect = false) {
  stores.RoutesStore.goPage(url, isRedirect);
}

/** 返回页面 */
export function goBack(step = 1, isLogin = false) {
  const pages = Taro.getCurrentPages();
  if (pages.length > step) {
    Taro.navigateBack({
      delta: step,
    });
    if (pages[pages.length - 2]?.route === 'pages/web-page/web-page' && isLogin) {
      stores.WebPageStore.initPage();
    }
  } else {
    Taro.switchTab({
      url: '/pages/index/index',
    });
  }
}

/* 格式化富文本 */
export function formatRichText(text = '') {
  const addStyle = 'display: block; width: 100%;';
  const newText = (text || '').replace(/<img[^>]*>/gi, (imgMatch) => {
    const styleRE = /<img[^>]+style=['"]([^'"]+)['"]+/g;
    const styleStr = styleRE.exec(imgMatch)?.[1] || '';
    if (styleStr) {
      return imgMatch.replace(/style=['"]([^'"]+)['"]+/g, () => `style='${addStyle} ${styleStr || ''}'`);
    }
    return imgMatch.replace(/<img/i, `<img style='${addStyle}'`);
  });
  return newText;
}

/**
 * 洗牌算法
 * @param arr 数组
 * @returns arr 打乱顺序后的数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const newArr = arr;
  let { length } = arr;
  while (length) {
    const random = Math.floor(Math.random() * length--);
    [newArr[length], newArr[random]] = [newArr[random], newArr[length]];
  }
  return newArr;
}

// 防抖函数
export function debounceCb(fn: (...args: any) => any): (...args: any) => any {
  return debounce(fn, 500, {
    leading: true,
    trailing: false,
  });
}

/**
 * 根据身份证号得到姓别和精确计算年龄
 */
export function analyzeIDCard(IDCard: string) {
  // 获取用户身份证号码
  const userCard = IDCard;
  // 如果身份证号码为undefind则返回空
  if (!userCard) {
    return false;
  }
  // 获取出生年月日
  const yearBirth = Number(userCard.substring(6, 10));
  const monthBirth = Number(userCard.substring(10, 12));
  const dayBirth = Number(userCard.substring(12, 14));
  // 获取当前年月日并计算年龄
  const myDate = new Date();
  const monthNow = myDate.getMonth() + 1;
  const dayNow = myDate.getDate();
  let age = myDate.getFullYear() - yearBirth;
  if (monthNow < monthBirth || (monthNow === monthBirth && dayNow < dayBirth)) {
    age--;
  }
  if (age >= 14) {
    return true;
  }
  return false;
}

// num避免浮点数
export function roundNumber(num1: number) {
  const cardinal = 10 ** 10;
  return Math.round(num1 * cardinal) / cardinal;
}

/** 获取文件后缀 */
export const formatType = (path: string) => {
  const format = path?.split('').reverse()
    .join('');
  const formatIndex = format?.indexOf('.');
  const type = format?.slice(0, formatIndex)?.split('')
    .reverse()
    .join('');
  return type;
};
/** 打开文件函数 */
export const viewFile = async (url: string, type?: string, isSave?: boolean) => {
  handleViewFile(url, type, isSave);
};

export const previewFile = async (type, _, path, name) => {
  if (['ppt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'pptx'].includes(type)) {
    getUrlByKey(path, type, name, true);
  } else {
    getUrlByKey(path, type, name, true);
    // Taro.previewImage({
    //   current: url,
    //   urls: [url]
    // })
  }
};

export const handleViewFile = (imgUrl, type, isSave) => {
  if (/^http/.test(imgUrl) && !new RegExp(`${Taro.env.USER_DATA_PATH}`).test(imgUrl)) {
    downloadFile({
      url: imgUrl,
      success: (res) => {
        if (res.statusCode === RequestResponseCode.SUCCESS) { // 成功
          const fileType: any = type;
          const path = res.tempFilePath; // 返回的文件临时地址，用于后面打开本地预览所用
          if (isSave) {
            getFileSystemManager().saveFile({
              tempFilePath: path,
              success: (res_) => {
                const { savedFilePath } = res_;
                openDocument({
                  filePath: savedFilePath, // 要打开的文件路径
                  fileType,
                  showMenu: true,
                });
              },
            });
          } else {
            openDocument({
              filePath: path, // 要打开的文件路径
              fileType,
              showMenu: false,
            });
          }
        }
      },
    });
    return;
  };
};

const imageFile = ['png', 'jpg', 'jpeg'];
/**
 * 文件和图片下载
 * 将获取的文件路径作为 key，获取图片数据
 * @param key 请求文件的地址（必填）
 * @param type 文件类型
 * @param name_ 文件名称
 * @param isOpen 是否下载成功后默认打开文件
 * @param props 返回的附加参数
 * @return 包含文件信息的对象
*/
export const getUrlByKey = (pKey, type?: any, name_?: any, isOpen?: boolean, props?: any) => new Promise((resolve, reject) => {
    const key = pKey || '';

    preview(key)
      .then((res) => {
        const name: string = key.split('/')[key.split('/').length - 1];
        let newName = '';
        const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');

        if (reg.test(name)) {
          newName = getuuid(32, 32);
        } else {
          newName = name;
        }

        // TODO: 通过缓存获取？

        const keyFragment = key.split('.');
        const newType = keyFragment[keyFragment?.length - 1];
        const filePath = `${Taro.env.USER_DATA_PATH}/${newName}`;

        const fs = Taro.getFileSystemManager(); // 获取全局唯一的文件管理器
        fs.writeFile({
          // 写文件
          filePath,
          data: res,
          encoding: 'binary',
          success() {
            if (isOpen) {
              if (imageFile.includes(newType)) {
                Taro.previewImage({
                  urls: [filePath],
                  success() {
                    console.log('open success', filePath);
                  },
                  fail(err) {
                    console.log('open fail', err);
                  },
                });
              } else {
                Taro.openDocument({
                  filePath, // 拿上面存入的文件路径
                  showMenu: true,
                  fileType: type,
                  success() {
                    console.log('open success', filePath);
                  },
                  fail(err) {
                    console.log('open fail', err);
                  },
                });
              }
            }

            const r = {
              name: name_,
              type: imageFile.includes(newType) ? 'image' : type,
              fileType: imageFile.includes(newType) ? 'image' : type,
              url: filePath,
              path: key,
              ...props,
            };
            resolve(r);
          },
          fail(e) {
            reject(e);
          },
        });
      }, (e) => {
        reject(e);
      });
  });

/**
 * 将ArrayBuffer转化为文件路径储存
 * @param res ArrayBuffer
 * @returns {}
 */

export const getFileByArrayBuffer = (res: ArrayBuffer) => new Promise((resolve, reject) => {
  const key = `${getuuid(32, 32)}`;

    const filePath = `${Taro.env.USER_DATA_PATH}/${key}`;

    const fs = Taro.getFileSystemManager(); // 获取全局唯一的文件管理器
    fs.writeFile({
      // 写文件
      filePath,
      data: res,
      encoding: 'binary',
      success() {
        const r = {
          name: key,
          type: 'image',
          fileType: 'image',
          url: filePath,
          path: key,
        };
        resolve(r);
      },
      fail(e) {
        reject(e);
      },
    });
});

export const saveCurrentFile = async (url: string, type: string) => {
  getFileSystemManager().getSavedFileList({ // 获取文件列表
    success: (res) => {
      res.fileList.forEach((val) => {
        // 遍历文件列表里的数据
        // 删除存储的垃圾数据
        getFileSystemManager().removeSavedFile({
          filePath: val.filePath,
        });
      });
      viewFile(url, type, true);
    },
  });
};

/** 获取uuid值 */
export const getuuid = (len, radix?: number) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'?.split('');
  const uuid: string[] = [];
  radix = radix || chars.length;
  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * @description: 判断是否已经保存
 * @param {any} judgeFields 判断条件
 * @author: DerrickFeng
 */
export const judgeIsSaved = (judgeFields: any) => {
  (judgeFields)
    ? enableAlertBeforeUnload({ // 监听左上角返回按钮事件
      message: '内容尚未保存，确定要返回吗？',
    })
    : disableAlertBeforeUnload();// 如果已经保存信息，就取消监听左上角返回按钮事件
};

/** 判断需求子类型或者员工在需求类型和公司未选择时不可点击 */
export const judgePvAndOrgInfo = (opt: Partial<FJudgePvAndOrgInfo>) => {
  if (opt.itemKey === opt.checkField && !opt.isHaveInfoField) {
    showToast(`请先选择${opt.toastText}`);
    return false;
  }
  return true;
};

export function getUuid(len?: number, radix?: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'?.split('');
  const uuid: any[] = []; let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

export const getFileInfo = (key: string) => new Promise<void>(async (resolve: (value: any) => void) => {
  const res: any = await getUrlByKey(key);
  resolve(res);
});

// 获取文件base64
export const getFileInfoBlobUrl = (data: string | Array<string>) => new Promise(async (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
  // 一个
  if (typeof data === 'string') {
    return getFileInfo(data).then(resolve)
      .catch(reject);
  }

  // 多个
  if (typeof data === 'object' && data.constructor === Array) {
    const promiseAll = data.map(async row => await getFileInfo(row));
    return Promise.all(promiseAll).then(resolve)
      .catch(reject);
  }

  return reject(false);
});

// 获取加密签名
export const setSignature = () => {
  signature().then((res) => {
    service.setSecretKey(res?.data);
  }, (e) => {
    showToast(e);
  });
};


const code2Key = (wxCode: string) => new Promise((resolve: (value: any) => void, reject: (reason?: any) => void) => {
  const key_ = 'easp_investee_woa_com'; // 你的移动网关key
  Taro.request({
    url: `${config.BASE_URL_WOA}/__code2key/?code=${wxCode}&app=${key_}`,
    header: {
      'content-type': 'application/json',
    },
    // 服务器响应成功就算succes，包括401、500这些
    success: resolve,
    // 断网、解析异常、参数类型错误，才会走fail
    fail: reject,
  });
});

// __code2key尝试多次，避免一次失败造成用户类型判断错误
const getTXIoaToken = (wxCode: string) => {
  let count = 0;
  const max = 2; // 最多尝试次数

  const fn = async () => {
    count += 1;
    let errIgnore = false;

    try {
      const response = await code2Key(wxCode);
      const { statusCode } = response || {};

      // 服务器错误才重试
      if (statusCode >= 500 && count < max) {
        return fn();
      }

      if (statusCode >= 200 && statusCode < 300) {
        return response;
      }

      errIgnore = true;
      throw new Error('获取内网用户信息失败');
    } catch (e) {
      if (!errIgnore && count < max) {
        return fn();
      }

      throw e;
    }
  };

  return fn();
};

const getValidUserType = (staffID: string) => {
  let count = 0;
  const max = 2; // 最多尝试次数

  const fn = async () => {
    count += 1;

    try {
      return await validUserType(staffID);
    } catch (e) {
      const { code } = e || {};

      // 服务器错误才重试
      if (code >= 500 && count < max) {
        return fn();
      }

      throw e;
    }
  };

  return fn();
};

const getUserInfo = () => {
  getUser().then((res) => {
    const userInfo = res?.data || {};
    const { userNameZh, userId, postName } = userInfo || {};

    setStorageSync('userNameZh', userNameZh);
    setStorageSync('userId', userId);
    setStorageSync('postName', postName);
    setStorageSync('userInfo', userInfo);
    service.setUserInfo(userInfo);

    // aegis uin
    // 内网取engName，外网取userId
    const name = getStorageSync('engName') || userId;
    setUIN(name);

    reportEvent({
      name: 'session.getuserinfo.success',
      remark: { userId, userNameZh, postName },
    });
  }, (e) => {
    showToast(e);
  });
};

/** inSuccessFn: 内部用户登录成功方法， exSuccessFn:外部用户登录成功方法， errorFn: 登陆失败方法 */
export const isHaveToken = async (inSuccessFn: () => void, exSuccessFn: () => void, errorFn: () => void) => {
  const options: any = Taro.getEnterOptionsSync();
  const { isGoHome } = options?.query;

  wexinLogin().then((wxRes: any) => {
    const { code } = wxRes;

    getTXIoaToken(code).then((data) => {
      const { engName, staffID, key } = data.data;

      reportEvent({
        name: 'session.code2key.success',
        remark: { code, name: engName },
      });

      if (engName && staffID) {
        getValidUserType(staffID).then((isIoa) => {
          if (isIoa?.data) {
            reportEvent({
              name: 'session.internal_user.valid_success',
              remark: { code, name: engName },
            });

            // 切换api地址为woa内网地址
            if (config.REACT_APP_ENV !== 'dev') {
              service.setBaseUrl(`${config.REACT_APP_EC_INTERIOR_BASEAPI}`);
            }

            service.setToken(key);

            Taro.setStorageSync('token', key);
            Taro.setStorageSync('engName', engName);
            Taro.setStorageSync('uid', staffID);
            Taro.setStorageSync('currentTime', new Date().getTime());

            // TODO: 是否需要优化为等待成功才继续？
            getUserInfo();
            setSignature();

            if (!isGoHome || isGoHome === 'true') {
              inSuccessFn();
            }

            // TODO: 这是为啥？？？
            service.promiseCallBack();
          } else {
            reportEvent({
              name: 'session.internal_user.valid_fail',
              remark: { code, name: engName },
            });

            outsideLogin(exSuccessFn, errorFn, isGoHome);
          }
        }, () => {
          outsideLogin(exSuccessFn, errorFn, isGoHome);
        });
      } else {
        outsideLogin(exSuccessFn, errorFn, isGoHome);
      }
    }, () => {
      reportEvent({
        name: 'session.code2key.fail',
        remark: { code },
      });

      outsideLogin(exSuccessFn, errorFn, isGoHome);
    });
  }, errorFn);
};

// -- 外部用户登录
const outsideLogin = (exSuccessFn: () => void, errorFn: () => void, isGoHome?: 'false' | 'true') => {
  if (config.REACT_APP_ENV !== 'dev') {
    service.setBaseUrl(`${config.REACT_APP_EC_BASEAPI}`);
  }

  setStorageSync('userType', 'external');
  wexinLogin().then((res: any) => {
    getLoginInfo({
      code: res?.code,
    }, true).then((lRes: any) => {
      reportEvent({
        name: 'session.external_user.login_success',
      });

      setStorageSync('engName', '');
      setStorageSync('uid', '');
      service.setToken(lRes.token);
      setStorageSync('token', lRes.token);

      // TODO: 是否需要优化为等待成功才继续？
      getUserInfo();
      setSignature();

      if (!isGoHome || isGoHome === 'true') {
        exSuccessFn();
      }

      // TODO: 这是为啥？？？
      service.promiseCallBack();
    }, (e) => {
      const { code, data } = e || {};
      if (code === RequestResponseCode.CLIENT_UNAUTHORIZED) {
        Taro.showModal({
          title: '提示',
          content: data?.message,
          showCancel: false,
        });

        // TODO: 是否需要errorFn？
        // errorFn();

        reportEvent({
          name: 'session.external_user.login_fail',
          remark: { code },
        });
      } else if (code === RequestResponseCode.GROUPS_INVITER_STATUS) {
        // 群发邀请待审核
        navigateTo({ url: '/pages/page-tips/page-tips?tips=register' });
        errorFn();
      } else {
        errorFn();

        reportEvent({
          name: 'session.external_user.login_fail',
          remark: { code },
        });
      }
    });
  }, errorFn);
};


export default function useCountDown(initCount = 5) {
  const [count, setCount] = useState(() => initCount);
  const timerId: any = useRef(null);

  // 设置清除定时器,避免count还未为0时，组件已被Unmount
  useEffect(() => () => {
    clearInterval(timerId.current);
  }, []);

  // 监听count的变化
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerId.current);
      setCount(5);
    }
  }, [count]);
  // 定义定时器，每秒减一
  function run() {
    timerId.current = setInterval(() => {
      setCount(pre => pre - 1);
    }, 1000);
  }
  return { count, run };
}

