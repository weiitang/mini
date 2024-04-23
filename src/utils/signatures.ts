import CryptoJS from 'crypto-js';
import { getuuid as getuid } from './methods';

// eslint-disable-next-line @typescript-eslint/naming-convention
// const secret_key = 'nokg64G8jhG86GVJ89hzv91QSomsx49H';

// 排序组装
export const sortObjectKeys = (obj: object) => {
  if (!obj) return obj;
  if (obj?.constructor !== Object) return obj;

  const target = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (typeof obj[key] === 'number') {
      Object.assign(target, {
        [key]: obj[key].toString(),
      });
    } else {
      Object.assign(target, {
        [key]: obj[key],
      });
    }
  }

  // 使用 Object.entries() 方法将对象的属性名和对应的值转换为一个二维数组
  const entries = Object.entries(target);

  // 使用 Array.sort() 方法对二维数组进行排序
  entries.sort(([key1], [key2]) => key1.localeCompare(key2));

  // 使用 Object.fromEntries() 方法将排序后的二维数组转换为一个新对象
  const sortedObj = Object.fromEntries(entries);
  return sortedObj;
};

export const setGetParams = (obj: any) => {
  if (!obj) return obj;
  if (obj?.constructor !== Object) return obj;

  let target = '';
  Object.keys(obj).forEach((item) => {
    target += obj[item];
  });

  return target;
};

const handleData = (data: any, method: string) => {
  if (typeof data === 'string') return data;
  try {
    let obj = data;

    if (typeof obj === 'object') {
      obj = sortObjectKeys(data);
    }
    if (method.toUpperCase() === 'GET') {
      return setGetParams(obj);
    }
    return JSON.stringify(obj);
  } catch (error) {
    return data;
  }
};

// MD5加密
const handleMd5 = (data: string) => {
  const md5Digest = CryptoJS.MD5(data).toString(CryptoJS.enc.Hex);
  // 将16进制字符串转换为大写
  const md5DigestUppercase = md5Digest.toUpperCase();

  return md5DigestUppercase || '';
};

const getSecretKey = (str: string, secretKey: string) => {
  const wordArray = CryptoJS.HmacSHA256(str, secretKey);
  return CryptoJS.enc.Hex.stringify(wordArray);
};

// 顺序一定是nonce、payload_signature、timestamp（例nonce=xx&payload_signature=xx&timestamp=xx）
const paramsJoin = (nonce: string, payload_signature: string, timestamp: number) => `nonce=${nonce}&payload_signature=${payload_signature}&timestamp=${timestamp}`;

// 获取签名
export const getSignaturesData = (data: any, secretKey: string, method: string) => {
  const time: number = new Date().getTime();

  const timestamp = Math.ceil(time / 1000);

  const nonce = getuid(32);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handle_data = handleData(data, method);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const payload_signature = handleMd5(handle_data);

  const paramsData = paramsJoin(nonce, payload_signature, timestamp);

  const signature = getSecretKey(paramsData, secretKey);
  return {
    'invest-timestamp': timestamp,
    'invest-nonce': nonce,
    'invest-signature': signature,
  };
};

export const getUrlParams = (url) => {
  const reg = /([^?&+#]+)=([^?&+#]+)/g;
  let str = '';
  url?.replace(reg, (_$0, _$1, $2) => str += $2);
  return str;
};
