/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { getIsEncryption } from '@/utils/encryption';
import { getSignaturesData, getUrlParams, setGetParams, sortObjectKeys } from '@/utils/signatures';
import Taro, { getStorageSync } from '@tarojs/taro';
import { reportError } from '@/utils/common';
import { onAppReady } from '@/modules/session';
import { RequestResponseCode } from '../../types/taro-enum';
import config from '../config/config';

interface IreqInter {
  /**
   * 请求类型
   */
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /**
   * 请求url地址
   */
  url: string;
  /**
   * 是否显示loading(不建议使用，后续移除)
   */
  showLoading: boolean;
  /**
 * 请求头
 */
  headers?: Object;
  /**
   * 请求参数
   */
  data?: Object;
  /**
   * 请求参数
   */
  token?: string;
  dontShowError?: boolean;
  responseType?: any
  timeout?: any,
  contentType?: string;
}

type SecretKeyCallBackType = {
  opt: any;
  resolve: (v: any) => void;
  reject: (v: any) => void;
};


class Service {
  baseUrl: string;
  token: any;
  secretKey: string;
  queue: any[] = [];
  secretKeyCallBack: SecretKeyCallBackType[] = [];
  getUserInfoCallBack: Function[] = [];
  userInfo: any;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = getStorageSync('token');
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    if (this.getUserInfoCallBack.length > 0) {
      this.getUserInfoCallBack.forEach(fn => fn(userInfo));
      this.getUserInfoCallBack = [];
    }
  }

  getUserInfo() {
    return new Promise((resolve: (val: any) => void) => {
      if (this.userInfo) {
        resolve(this.userInfo);
      }
      const userInfo = getStorageSync('userInfo');
      if (userInfo) {
        resolve(userInfo);
      } else {
        this.getUserInfoCallBack.push(resolve);
      }
    });
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setSecretKey(secretKey: string) {
    this.secretKey = secretKey;

    if (this.secretKeyCallBack?.length > 0) {
      this.secretKeyCallBack.forEach((item: SecretKeyCallBackType) => {
        this.request(item?.opt).then(item.resolve)
          .catch(item.reject);
      });
      this.secretKeyCallBack = [];
    }
  }

  getToken(token?: string) {
    this.token = token || getStorageSync('token');
  }

  setToken(token?: string) {
    this.token = token;
  }

  promiseCallBack() {
    if (this.queue?.length <= 0) return;

    this.queue?.forEach((item) => {
      this.request(item?.option).then(item.res, item.rej);
    });

    this.queue = [];
  }

  request(opt: IreqInter): Promise<Ires> {
    return new Promise((resolve, reject) => {
      const isEncryption = getIsEncryption(opt.url, opt.type);

      const signaturesParams = {};
      if (isEncryption && !this.secretKey) {
        this.secretKeyCallBack.push({ opt, resolve, reject });
        return;
      }

      if (isEncryption) {
        let optData = opt?.data;

        if (opt.url.indexOf('?') > -1) {
          optData = getUrlParams(opt.url);
          optData = typeof optData === 'string' ? optData : sortObjectKeys(optData);
          optData = setGetParams(optData);
        }

        const signaturesData = getSignaturesData(optData, this.secretKey, opt.type) || {};

        // contentType: 'application/x-www-form-urlencoded',
        Object.assign(signaturesParams, signaturesData);
      }

      opt.showLoading
        && Taro.showLoading({
          title: '加载中...',
          mask: true,
        });

      const header = {
        client_type: config.REACT_APP_CLIENT_TYPE,
        app_version: config.REACT_APP_VERSION,
        app_channel: process.env.TARO_ENV === 'weapp' ? 3001 : 4001,
        uid: getStorageSync('uid'),
        username: encodeURIComponent(getStorageSync('engName') || ''),
        wxappkey: this.token,
        Authorization: this.token,
        ...signaturesParams,
      };

      if (config.REACT_APP_ENV === 'test') {
        Object.assign(header, {
          ghostlogin: encodeURIComponent(getStorageSync('engName') || ''),
        });
      }

      if (opt?.contentType) {
        Object.assign(header, {
          'content-type': opt.contentType,
        });
      } else if (opt?.type.toUpperCase() === 'GET') {
        Object.assign(header, {
          'content-type': 'application/x-www-form-urlencoded',
        });
      }

      const other = {};

      if (opt.responseType) {
        Object.assign(other, {
          responseType: opt.responseType,
        });
      }

      if (opt.timeout) {
        Object.assign(other, {
          timeout: opt.timeout,
        });
      }

      const options: Taro.request.Option = {
        url: this.baseUrl + opt.url,
        header,
        method: opt.type, // 若有报错，只需要在底层加PATCH类型即可
        data: opt.data || null,
        ...other,
        complete: () => {
          // console.error('------------other--------------', other);
          // console.error("------------opt--------------", opt.url);
        },
        success: (res: any) => {
          // console.debug('------------success--------------', res);
          opt.showLoading && Taro.hideLoading();

          const { statusCode, data } = res || {};
          const code = data?.code;
          const msg = data?.error || data?.msg || '未知错误'; // 非200时，结构不一样，此时取error

          // onAppReady初始化依赖一些接口，这些接口走下面401逻辑的话，会影响onAppReady初始化，造成onAppReady没法正常响应
          // 1、内网接口 /validUserType （validUserType）
          // 2、外网接口 /login且qs含__init=1 （getLoginInfo）
          // 这里就过滤掉这些接口请求的401处理，按异常处理即可
          const requestUrl = opt.url || '';
          let skip401 = false;
          if (requestUrl.includes('/system/user/validUserType') || (requestUrl.includes('/login') && requestUrl.includes('__init=1'))) {
            skip401 = true;
          }

          if (code === RequestResponseCode.UNAUTHORIZED && !skip401) {
            // TODO: 401后把这些请求放到队列，然后再请求是为啥？？？
            this.queue?.push({
              option: opt,
              res: resolve,
              rej: reject,
            });

            reportError(`${statusCode}:${code}-${msg}`);

            onAppReady((success) => {
              if (success) {
                Taro.switchTab({
                  url: '/pages/index/index',
                });
              } else {
                Taro.navigateTo({
                  url: `/pages/openId-no-found/openId-no-found?isNoOpenid=${true}`,
                });
              }
            });

            // TODO: 直接返回reject会影响逻辑走向，待优化
            // reject({
            //   code: 999,
            //   data: new Error(msg),
            // });
            return;
          }

          // preview接口statusCode=200，响应是个图片，code没有值
          // console.log(requestUrl, code, statusCode);
          if (code === RequestResponseCode.SUCCESS || (!code && statusCode === RequestResponseCode.SUCCESS)) {
            resolve(data);
          } else {
            reject({
              statusCode,
              code,
              data: new Error(msg),
            });

            reportError(`${statusCode}:${code}-${msg}`);
          }
        },
        fail: (err) => {
          opt.showLoading && Taro.hideLoading();

          // console.error('------------err--------------', err);
          const error = err instanceof Error ? err : new Error(err?.errMsg);
          reject({
            statusCode: null,
            code: 999,
            data: error,
          });

          reportError(error);
        },
      };

      Taro.request(options);
    });
  }
}

export default Service;

const baseurl = config.REACT_APP_EC_BASEAPI; // 默认外网地址
const service: any = new Service(baseurl);

export {
  service,
};
