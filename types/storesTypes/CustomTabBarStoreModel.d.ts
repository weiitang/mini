/*
 * @Date: 2021-11-09 16:44:57
 * @Description: 自定义tabbar
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-11 17:07:44
 */

declare abstract class CustomTabBarStoreModel extends ExtendsIndexStore {
  /** 自定义底部导航数据 */
  data: IcustomData;

  /** set 自定义底部导航数据 */
  setData: (val: Partial<IcustomData>) => void;
}

declare interface IcustomData {
  /** 选中的下标 */
  selected: string;
  /** 是否显示tab */
  showTab: boolean;
}
