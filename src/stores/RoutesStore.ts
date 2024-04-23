/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Description:IndexStore
 * @Version: 2.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 09:25:13
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-21 09:54:57
 */
import { navigateTo, redirectTo, switchTab } from '@tarojs/taro';
import { makeAutoObservable } from 'mobx';
import { goBack, urlToParams } from '../utils/methods';
import storage from '../utils/storage';

class RoutesStore implements RoutesStoreModel {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IndexStore: IndexStoreModel;
  constructor(IndexStore: IndexStoreModel) {
    this.IndexStore = IndexStore;
    makeAutoObservable(this);
  }

  get isAuth() {
    return this.IndexStore.AccountStore.isAuth;
  }

  /** tabbar */
  tabRouterList = ['/pages/require/require', '/pages/index/index', '/pages/me/me', '/pages/server-page/server-page'];

  /**
   * 白名单路径
   * 不需要登录的页面路径
   */
  whiteList = [
    '/pages/index/index', // 首页
    '/pages/me/me', // 个人中心
  ];

  goPageParams = {
    url: '',
    isRedirect: false,
  };

  setGoPageParams = (data: Partial<IGoPageParams>) => {
    this.goPageParams = { ...this.goPageParams, ...data };
  };

  /**
   * 跳转路由 路由拦截
   * @param url string 路径
   * @param isRedirect boolean 是否重定向 默认(false)
   */
  goPage = (url: string, isRedirect = false) => {
    const isWhite = this.whiteList.find(e => url.indexOf(e) !== -1);
    if (this.isAuth || isWhite) {
      this.setGoPageParams({
        url: '',
        isRedirect: false,
      });
      const flag = this.tabRouterList.find(e => url.indexOf(e) !== -1);
      if (flag) {
        // tabPage路由不能带参，转成storage存储
        const params = urlToParams(url);
        // const index = indexOf(this.tabRouterList, url);
        for (const key in params) {
          storage.set(`${flag}?${key}`, params[key]); // 例子：/pages/home/index?label
        }
        switchTab({ url });
      } else {
        if (isRedirect) {
          redirectTo({
            url,
          });
        } else {
          navigateTo({
            url,
          });
        }
      }
    } else {
      this.setGoPageParams({
        url,
        isRedirect,
      });
      this.goLogin();
    }
  };

  loginCB = () => {
    const { url } = this.goPageParams;
    this.setGoPageParams({ url: '' });
    if (url) {
      this.goPage(url, true);
    } else {
      goBack(1, true);
    }
  };

  /**
   * 跳转登录
   * @param isRedirect boolean 是否重定向 默认(false)
   */
  goLogin = (isRedirect = false) => {
    const url = '/pages/welcome/welcome';
    if (isRedirect) {
      redirectTo({
        url,
      });
    } else {
      navigateTo({
        url,
      });
    }
  };
}

export default RoutesStore;
