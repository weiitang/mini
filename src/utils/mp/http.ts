import { getConfinData, getBaseConfig } from './common';
import { uuid, getSessionId } from './string';
import globalData from './global-data';

/**
 * 获取请求的token
 * @method
 * @param {string} code
 * @return {number}
 */
export const getCsrfToken = (code) => {
  let hash = 5381;
  const str = String(code);
  for (let i = 0, len = str.length; i < len; ++i) {
    hash += (hash << 5) + str.charCodeAt(i);
  }
  return hash & 0x7fffffff;
};

/**
 * 追加URL参数
 * @param {string} url
 * @param {string} code
 * @param {string} traceId
 * @return {string}
 */
export const appendUrlTokens = (url, code = '', traceId = uuid()) => {
  const separator = String(url).indexOf('?') === -1 ? '?' : '&';
  const csrfTokenStr = code ? `g_tk=${getCsrfToken(code)}&` : '';
  const sessionId = getSessionId();
  const tokenString = `${csrfTokenStr}trace_id=${traceId}&g_trans_id=${sessionId}`;
  return `${url}${separator}${tokenString}`;
};

/**
 * 基础请求方法（封装wx.request）
 * @param {object} opt 参数
 * @return {promise}
 */
function request(opt) {
  return new Promise((resolve, reject) => {
    const baseConfig = getBaseConfig();
    const header: { [key: string]: string } = {
      'content-type': 'application/x-www-form-urlencoded',
    };
    const confidentialData = getConfinData();
    const traceId = uuid();
    const tokenUrl = appendUrlTokens(opt.url, confidentialData[baseConfig.tokenKey], traceId);
    Object.assign(opt, {
      url: tokenUrl,
    });
    const confinKeys = Object.keys(confidentialData);
    if (confinKeys.length > 0) {
      let cookieStr = '';
      const cookieValues: string[] = [];
      confinKeys.forEach((fieldNam) => {
        if (confidentialData[fieldNam]) {
          cookieValues.push(`${fieldNam}=${confidentialData[fieldNam]};`);
        }
      });
      if (cookieValues.length > 0) {
        cookieStr = cookieValues.join(' ');
      }
      header.cookie = cookieStr;
    }
    const requestTask = wx.request({
      ...opt,
      header,
      success: (res: { [key: string]: any } = {}) => {
        const data: { [key: string]: any } = Object.assign({}, res.data);
        if (data.code === 200) {
          data.ok = true;
        } else {
          // 未登录，更新logined状态，这样用户第二次尝试会自动登录
          if (data.code === baseConfig.retCodeMap.NOT_LOGIN) {
            globalData.set('logined', false);
          }
          data.msg = data.msg || '系统异常，请稍后重试（-999）';
        }
        resolve(data);
      },
      fail: reject,
    });
    // eslint-disable-next-line no-param-reassign
    opt.signal && (opt.signal.onabort = () => requestTask.abort());
  });
}

/**
 * get请求
 * @param {string} url URL地址
 * @param {object} data 参数
 * @return {promise}
 */
export const getRequest = (url, data) => request({
  url,
  method: 'GET',
  data,
});

/**
 * post请求
 * @param {string} url URL地址
 * @param {object} data 参数
 * @return {promise}
 */
export const postRequest = (url, data) => request({
  url,
  method: 'POST',
  data,
});

/**
 * 获取接口URL
 * @param {string} mod api模块名字
 * @param {string} act api的act名字
 * @param {string} apiUrl 定制的url前缀
 * @return {string} api的完整url
 */
export const getApiUrl = (mod = '', act = '', apiUrl = '') => {
  const baseConfig = getBaseConfig();
  if (!mod && !act) {
    return '';
  }
  return `${apiUrl || baseConfig.projectCgi}/${mod}/${act}`;
};

export default {
  getCsrfToken,
  appendUrlTokens,
  request,
  getRequest,
  postRequest,
  getApiUrl,
};
