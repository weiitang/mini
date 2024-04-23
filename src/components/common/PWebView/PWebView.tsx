/* eslint-disable @typescript-eslint/naming-convention */
import { showToast } from '@/utils/toast';
import Taro from '@tarojs/taro';

/** 跳转外联组件（有三个参数）
 * 1.jump_type：跳转类型：(1).跳转内链；inner, (2). 跳转外链(h5页面)：h5, (3).跳转外链(其他小程序)：mini_app
 * 2.url： 跳转地址
 * 3.app_id:后台配置的appid
 */
const WebView = (
  /** 跳转类型：1.跳转内链；inner,2. 跳转外链(h5页面)：h5, 3.跳转外链(其他小程序)：mini_app */
  jump_type: string,
  /**  跳转地址 */
  url: string,
  /** 后台配置的appid */
  app_id: string
) => {
  if (!jump_type) {
    showToast('跳转失败，未配置跳转类型');
    return;
  }
  switch (jump_type) {
    case 'inner':
      return Taro.navigateTo({
        url,
      }).catch(() => {
        showToast('跳转链接未配置');
      });
    case 'h5':
      if (!url) {
        showToast('未配置外链Url');
        return;
      }
      Taro.setStorage({
        key: 'web-page-url',
        data: url,
      });
      return Taro.navigateTo({
        url: '/pages/web-page/web-page',
      });
    case 'mini_app':
      if (!app_id) {
        showToast('未配置appid');
        return;
      }
      return Taro.navigateToMiniProgram({
        appId: app_id,
      });
    default:
      break;
  }
};
export default WebView;
