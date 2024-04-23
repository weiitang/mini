/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Description: IndexStore
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 09:25:13
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-11 16:39:34
 */
import { makeAutoObservable } from 'mobx';
// import AccountStore from './AccountStore';
import AppStore from './AppStore';
import RoutesStore from './RoutesStore';
import CustomTabBarStore from './CustomTabBarStore';
import GlobalSystemInfoStore from './GlobalSystemInfoStore';

class IndexStore implements IndexStoreModel {
  constructor() {
    makeAutoObservable(this);
    // this.AccountStore = new AccountStore(this);
    this.RoutesStore = new RoutesStore(this);
    this.AppStore = new AppStore(this);
    this.CustomTabBarStore = new CustomTabBarStore(this);
    this.GlobalSystemInfoStore = new GlobalSystemInfoStore(this);
  }
  AppStore: AppstoreModel;
  AccountStore: AccountStoreModel;
  RoutesStore: RoutesStoreModel;
  CustomTabBarStore: CustomTabBarStoreModel;
  GlobalSystemInfoStore: GlobalSystemInfoStoreModel;
  WebPageStore: WebPageStoreModel;
}

export default new IndexStore();
