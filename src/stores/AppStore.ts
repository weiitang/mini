/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Description:AppStore
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-18 13:45:52
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-21 09:54:21
 */

import { makeAutoObservable } from 'mobx';

class AppStore implements AppstoreModel {
  constructor(IndexStore: IndexStoreModel) {
    // -- 当前store在app.ts使用
    this.IndexStore = IndexStore;
    makeAutoObservable(this);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IndexStore: IndexStoreModel;

  appLoading = true;

  setAppLoading = (flag: boolean) => {
    this.appLoading = flag;
  };

  isShowApp = false;

  setIsShowApp = (value: boolean) => {
    this.isShowApp = value;
  };

  /** 自动登录加载loading */
  isAutoLoginLoading = true;
  setIsAutoLoginLoading = (data: boolean) => {
    this.isAutoLoginLoading = data;
  };

  pageModules: IpageModel = {
    index: false,
    service: false,
    require: false,
    activityCalendar: false,
    companyList: false,
    me: false,
    employeeManage: false,
  };

  setPageModules = (pageModules: Partial<IpageModel>) => {
    this.pageModules = Object.assign(this.pageModules, pageModules);
  };
}
export default AppStore;
