/*
 * @Description:AccountStoreModelType
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 23:48:03
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-18 17:33:29
 */
/**
 * 登录, 注册, 忘记密码
 */
declare abstract class AccountStoreModel {
  constructor(IndexStore: IndexStoreModel);

  /**
   * 全局状态入口
   */
  IndexStore: IndexStoreModel;

  /**
   * 是否登录
   */
  abstract isAuth: boolean;

  /**
  * 用户信息
  */
  abstract userInfo: IUserInfo | null;
  /**
   * 获取微信头像及昵称
   */
  abstract getUserNickNameAndAvatarUrl: () => void;

  /** token信息 */
  abstract refreshData: IRefreshData;

  abstract setRefreshData: (data: IRefreshData) => void;

  /**
    * set 用户信息
    */
  abstract setUserInfo: (val: IUserInfo | null) => void;

  /**
   * 401锁
   */
  checkoutFlag: boolean;

  /**
   * set 401锁
   */
  setCheckoutFlag: (flag: boolean) => void;

  /** 检测,重置登录状态 */
  abstract checkoutAuth: () => void;

  /** 重新获取token */
  abstract refreshAsyncToken: (rToken: string) => void;

  /** 退出 */
  abstract logout: () => void;

}

declare interface IRefreshData {
  token: string;
  refresh_token: string;
}

declare interface IUserInfo {
  /**
  * 头像
  */
  avatar: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 手机
   */
  mobile_phone: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
  * 用户id
  */
  _id: string;
}
