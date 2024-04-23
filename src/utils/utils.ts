import Taro from '@tarojs/taro';
import config from '../config/config';

export const navigateToMiniProgram = (params: {[key: string]: any}) => {
  Taro.navigateToMiniProgram({
    // 要跳转的小程序的appid
    // appId: '',
    // envVersion: 'trial',
    envVersion: config.envVersion,
    // path: 'pages/home/home',
    // extraData: {},
    ...params,
    fail: (error) => {
      console.log('跳转小程序失败', error);
    },
  });
};
//  转格式
export function getParse(str: string) {
  let s: Object | null = null;
  try {
    s = JSON.parse(str);
  } catch (error) {
    s = str;
  }
  return s;
};
