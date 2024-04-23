/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Description:
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 23:45:10
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-11 16:55:24
 */
/**
 * 全局状态入口
 */
declare abstract class IndexStoreModel {
  /**
   * APP状态库
   */
  abstract AppStore: AppstoreModel;

  /**
   * 用户状态库
   */
  abstract AccountStore: AccountStoreModel;

  /**
   * 路由状态库
   */
  abstract RoutesStore: RoutesStoreModel;

  /** 自定义tabbar */
  abstract CustomTabBarStore: CustomTabBarStoreModel;

  /** 全局系统信息 */
  abstract GlobalSystemInfoStore: GlobalSystemInfoStoreModel;

  /** webpage */
  abstract WebPageStore: WebPageStoreModel;
}

declare class ExtendsIndexStore {
  constructor(IndexStore: IndexStoreModel);
  /**
   * 全局状态入口
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  IndexStore: IndexStoreModel;
}
