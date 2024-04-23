/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/*
 * @Date: 2021-11-09 16:43:48
 * @Description: 全局系统信息
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-21 09:26:57
 */
import { makeAutoObservable } from 'mobx';
import Taro, { getStorageSync, setStorageSync } from '@tarojs/taro';
import { isFunction } from 'lodash-es';

function getSystemInfo() {
  // h5环境下忽略navbar
  if (!isFunction(Taro.getSystemInfoSync)) {
    return null;
  }
  const systemInfo: IGlobalSystemInfo = (Taro.getSystemInfoSync() as IGlobalSystemInfo)
    || ({
      model: '',
      system: '',
    } as IGlobalSystemInfo);

  const ios = !!(systemInfo.system.toLowerCase().search('ios') + 1);
  let rect;
  try {
    rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
    if (rect === null) {
      throw 'getMenuButtonBoundingClientRect error';
    }
    // 取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      throw 'getMenuButtonBoundingClientRect error';
    }
  } catch (error) {
    let gap = 0; // 胶囊按钮上下间距 使导航内容居中
    let width = 96; // 胶囊的宽度
    if (systemInfo.platform === 'android') {
      gap = 8;
      width = 96;
    } else if (systemInfo.platform === 'devtools') {
      if (ios) {
        gap = 5.5; // 开发工具中ios手机
      } else {
        gap = 7.5; // 开发工具中android和其他手机
      }
    } else {
      gap = 4;
      width = 88;
    }
    if (!systemInfo.statusBarHeight) {
      // 开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    }
    rect = {
      // 获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width,
    };
  }

  let navBarHeight = 0;
  if (!systemInfo.statusBarHeight) {
    // 开启wifi和打电话下
    systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
    navBarHeight = (function () {
      let gap = rect.top - systemInfo.statusBarHeight;
      gap = gap > 0 ? gap : 0;
      return 2 * gap + rect.height;
    }());

    systemInfo.statusBarHeight = 0;
    systemInfo.navBarExtendHeight = 0; // 下方扩展4像素高度 防止下方边距太小
  } else {
    let gap = rect.top - systemInfo.statusBarHeight;
    gap = gap > 0 ? gap : 0;
    systemInfo.navBarExtendHeight = gap;
    navBarHeight = systemInfo.statusBarHeight + 2 * gap + rect.height;
  }
  switch (process.env.TARO_ENV) {
    case 'qq':
      if (systemInfo.platform === 'android' && rect.top < systemInfo.statusBarHeight) {
        navBarHeight = navBarHeight + 10; // 10为固定值
        systemInfo.statusBarHeight = systemInfo.statusBarHeight + 10;
      }
      break;
  }

  systemInfo.navBarHeight = navBarHeight + systemInfo.navBarExtendHeight;
  systemInfo.capsulePosition = rect; // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
  systemInfo.ios = ios; // 是否ios
  systemInfo.isQQAndroid = systemInfo.platform === 'android' && process.env.TARO_ENV === 'qq';
  return systemInfo;
}

class GlobalSystemInfoStore implements GlobalSystemInfoStoreModel {
  constructor(IndexStore: IndexStoreModel) {
    this.IndexStore = IndexStore;
    makeAutoObservable(this);
    this.setGlobalSystemInfo(getSystemInfo());

    const setting_info = getStorageSync('global_system_info');
    if (setting_info) {
      this.setting_info = JSON.parse(setting_info);
    } else {
      const default_info = {
        open_service: true,
        open_demand: true,
        open_mailList: false,
        is_External: true,
        open_invite: false,
        open_index: true,
        open_me: true,
      };
      this.setting_info = default_info;
      setStorageSync('global_system_info', JSON.stringify(default_info));
    }
  }
  IndexStore: IndexStoreModel;

  globalSystemInfo: IGlobalSystemInfo | null = null;

  setGlobalSystemInfo = (data: IGlobalSystemInfo | null) => {
    this.globalSystemInfo = data;
  };

  setting_info: ISettingInfo;

  /** 更新设置信息 */
  updateSettingInfo = (key, value) => {
    this.setting_info[key] = value;
    setStorageSync('global_system_info', JSON.stringify(this.setting_info));
  };
}
export default GlobalSystemInfoStore;
