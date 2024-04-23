/*
 * @Description:welcomeModelTypes
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-18 11:20:38
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-18 11:21:54
 */
interface WelcomeStoreStateType {
  /**
   * wx.login的code
   */
  loginCode: string;
  /**
   * 是否勾选协议
   */
  isChecked: boolean;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 手机有误
   */
  phoneWrong: boolean;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 加载中
   */
  loading: boolean;
}

declare abstract class WelcomeStoreModel {
  abstract state: WelcomeStoreStateType;

  /**
   * 改变状态
   */
  abstract setState: (obj: Partial<WelcomeStoreStateType>) => void;

  /**
   * 确认微信登录
   */
  abstract handleLogin: (e: any) => void;

  /**
   * 获取微信用户信息
   */
  abstract getUserInfo: () => void;
}
