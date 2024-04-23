import Taro from '@tarojs/taro';

/**
 * localStorage/sessionStorage的key
 */
type IKeyEum =
  | string
  | 'token' // token
  | 'rToken' // 延长token
  | 'client_id' // socket 密钥
  | 'agreeAuth' // 是否授权登录
  | 'Account' // 记住账号
  | 'UserInfo' // 用户信息
  | 'search_history' // 搜索历史
  | 'openid' // 用户openid
  | 'scene' // 小程序场景值
  | 'router' // 路由信息
  | 'global_system_info'; // 系统设置信息

class Storage {
  /**
   * 保存
   *
   * @export
   * @param {*} key
   * @param {*} value
   */
  set = (key: IKeyEum, value: string) => {
    Taro.setStorageSync(key, value);
  };

  /**
   * 读取
   *
   * @export
   * @param {*} key
   */
  get = (key: IKeyEum) => Taro.getStorageSync(key) as string;

  /**
   * 清除
   * @param key
   * @param mode
   */
  remove = (key: IKeyEum) => {
    Taro.removeStorageSync(key);
  };

  /**
   * !! 清空所有的存储数据
   */
  clear = () => {
    Taro.removeStorageSync('token');
    Taro.removeStorageSync('bToken');
    Taro.removeStorageSync('rToken');
    Taro.removeStorageSync('UserInfo');
  };
}

export default new Storage();
