declare abstract class WebPageStoreModel {
  /** 数据 */
  data: IWebPageData;

  /** 设置数据 */
  setData: (val: Partial<IWebPageData>) => void;

  /**  重置数据 */
  initData: () => void;

  /**  重新打开页面并刷新 */
  initPage: () => void;
}

declare interface IWebPageData {
  /** 选中的下标 */
  url: string;
}
