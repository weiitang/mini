/**
 * 字符串相关操作
 * @author wittjiang
 * @module
 */

// 全局会话ID
let gSessionId = '';

/**
 * 获取当前会话ID
 * @return {string}
 */
export const getSessionId = () => {
  if (!gSessionId) {
    gSessionId = uuid();
  }
  return gSessionId;
};
/**
 * 生成全局唯一ID
 * @see https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E5%94%AF%E4%B8%80%E8%AF%86%E5%88%AB%E7%A0%81
 * @param {boolean} withDash 是否需要分隔符(-)
 * @return {string}
 */
export const uuid = (withDash = false) => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  const seperator = withDash ? '-' : '';
  return s4() + s4() + seperator + s4() + seperator + s4() + seperator + s4() + seperator + s4() + s4() + s4();
};

/**
 * 生成hash值
 * @see https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @param {*} hash生成值
 * @return {number}
 */
export const hashCode = (value) => {
  let hash = 0;
  const str = String(value);
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    // Convert to 32bit integer
    hash &= hash;
  }
  return hash;
};

export default {
  getSessionId,
  uuid,
  hashCode,
};
