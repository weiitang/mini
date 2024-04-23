/* eslint-disable no-nested-ternary */
import pconfig from '../../package.json';

const defaultEnv: IDefaultEnv = {
  REACT_APP_VERSION: pconfig.version,
  REACT_APP_WX_APPID: 'wxefdc542aeab12023',
  REACT_APP_CLIENT_TYPE: process.env.TARO_ENV === 'weapp' ? 'wechat_mini' : `${process.env.TARO_ENV}_applet`,
  REACT_APP_DEVICE: process.env.TARO_ENV === 'weapp' ? 'wx' : process.env.TARO_ENV,
  REACT_APP_HOME_PATH: '/pages/index/index',
};

const env = process.env.PROJECT_ENV || 'prod';

const config: { [key: string]: IenvData & IDefaultEnv } = {
  // 开发环境
  dev: {
    ...defaultEnv,
    REACT_APP_ENV: 'dev',
    REACT_APP_EC_BASEAPI: '',
    REACT_APP_EC_INTERIOR_BASEAPI: '',
    BASE_URL: '',
    BASE_URL_WOA: '',
    envVersion: 'develop',
  },
  // 测试环境
  test: {
    ...defaultEnv,
    REACT_APP_ENV: 'test',
    REACT_APP_EC_BASEAPI: '',
    REACT_APP_EC_INTERIOR_BASEAPI: '',
    BASE_URL: '',
    BASE_URL_WOA: '',
    envVersion: 'trial',
  },
  // 生产环境
  prod: {
    ...defaultEnv,
    REACT_APP_ENV: 'prod',
    REACT_APP_EC_BASEAPI: '',
    REACT_APP_EC_INTERIOR_BASEAPI: '',
    BASE_URL: '',
    BASE_URL_WOA: '',
    envVersion: 'release',
  },
};


export default config[env];
