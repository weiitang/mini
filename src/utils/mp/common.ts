
interface IRetCodeMap {
  NOT_LOGIN?: number
}

interface IBaseConfig {
  confinFields: string[],
  retCodeMap: IRetCodeMap,
  projectCgi: string,
  shouldReport: boolean,
  uidKey: string,
  tokenKey: string,
}

// 公共基础模块
const baseConfig: IBaseConfig = {
  // 登录态相关字段列表
  confinFields: [],
  retCodeMap: {},
  projectCgi: '',
  shouldReport: false,
  uidKey: '',
  tokenKey: '',
};

// 建议项目初始化时执行
export function setBaseConfig(config = {}) {
  Object.assign(baseConfig, config);
}

export function getBaseConfig() {
  return baseConfig;
}

export function setStorage(key, value) {
  wx.setStorageSync(key, value);
}

export function getStorage(key) {
  return wx.getStorageSync(key);
}

export function getConfinData() {
  const data: { [key: string]: string } = {};
  baseConfig.confinFields.forEach((fKey) => {
    const fData = getStorage(fKey);
    if (fData) {
      data[fKey] = fData;
    }
  });
  return data;
}

export function setConfinData(data = {}) {
  baseConfig.confinFields.forEach((fKey) => {
    const fData = data[fKey];
    if (fData) {
      setStorage(fKey, fData);
    }
  });
}

export default {
  setBaseConfig,
  getBaseConfig,
  setStorage,
  getStorage,
  getConfinData,
  setConfinData,
};
