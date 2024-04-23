/*
 * @Description: 全局Routes路由状态库
 * @Version: 1.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 23:48:54
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-18 09:51:43
 */
interface IGoPageParams {
  /** 路径 */
  url: string;
  /** 是否重定向 */
  isRedirect: boolean;
}

/**
 * 全局Routes路由状态库
 */
declare abstract class RoutesStoreModel extends ExtendsIndexStore {
  /**
   * 是否登录
   * @type {boolean}
   * @memberof RoutesStoreModel
   */
  get isAuth(): boolean;
  /**
   * tabbar路由
   * @type {string[]}
   * @memberof RoutesStoreModel
   */
  abstract tabRouterList: string[];
  /**
   * 白名单路由
   * @type {string[]}
   * @memberof RoutesStoreModel
   */
  abstract whiteList: string[];

  abstract goPageParams: IGoPageParams;

  /** 储存跳转的参数 */
  abstract setGoPageParams: (data: IGoPageParams) => void;

  /** 跳转路由 */
  abstract goPage: (url: string, isRedirect?: boolean) => void;

  /** 登录回调 */
  abstract loginCB: () => void;

  /** 跳登录 */
  abstract goLogin: (isRedirect?: boolean) => void;
}
