/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/*
 * @Date: 2021-11-09 16:43:48
 * @Description: 自定义tabbar
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-12 09:23:57
 */
import { makeAutoObservable } from 'mobx';

class CustomTabBarStore implements CustomTabBarStoreModel {
  constructor(IndexStore: IndexStoreModel) {
    this.IndexStore = IndexStore;
    makeAutoObservable(this);
  }

  IndexStore: IndexStoreModel;

  data = {
    selected: 'index',
    showTab: true,
  };

  setData = (val) => {
    this.data = Object.assign(this.data, val);
  };
}
export default CustomTabBarStore;
