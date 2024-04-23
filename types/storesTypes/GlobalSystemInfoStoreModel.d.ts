/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Date: 2021-11-09 16:44:57
 * @Description: 全局系统信息
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-11 17:05:01
 */

interface IGlobalSystemInfo extends Taro.getSystemInfoSync.Result {
  /** 判断是否为ios */
  ios: boolean;

  /** 是否为安卓qq */
  isQQAndroid: boolean;

  /** 导航栏高度 */
  navBarHeight: number;

  /** 右上角胶囊按钮信息bottom */
  capsulePosition: Taro.getMenuButtonBoundingClientRect.Rect;

  /** 状态栏距离顶部的高度 */
  statusBarHeight: number;

  /** 状态栏距离底部的高度 */
  navBarExtendHeight: number;
}

declare abstract class GlobalSystemInfoStoreModel extends ExtendsIndexStore {
  /** 设置 */
  abstract setting_info: ISettingInfo;

  /** 全局系统信息 */
  abstract globalSystemInfo: IGlobalSystemInfo | null;

  /** 设置全局系统信息 */
  abstract setGlobalSystemInfo: (globalSystemInfo: IGlobalSystemInfo | null) => void;

  /** 更新设置信息 */
  updateSettingInfo: (key: any, value: any) => void;
}

interface ISettingInfo {
  /** 开启服务模块 */
  open_service: boolean,
  /** 开启需求模块 */
  open_demand: boolean,
  /** 开启旅程模块 */
  open_mailList: boolean,
  /** 是否为外部用户 */
  is_External: boolean,
  /** 开启邀请模块 */
  open_invite: boolean,
  /** 开启首页广场模块 */
  open_index: boolean,
  /** 开启我的模块 */
  open_me: boolean,
}
