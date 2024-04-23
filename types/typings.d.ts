/*
 * @Description:
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 22:54:52
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-03-14 13:45:11
 */

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare namespace JSX {
  interface IntrinsicElements {
    import: React.DetailedHTMLProps<React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
    cax: any;
  }
}
// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    PROJECT_ENV: 'dev' | 'test' | 'prod';
    [key: string]: any;
  };
};

declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const url: string;
  export default url;
}

declare interface Ires {
  /**
   * code码
   */
  code: number;
  /**
   * 相应数据
   */
  data: any;
  /**
   * 接口描述
   */
  desc: string;
}


declare interface IDefaultEnv {
  /**
   * 版本号
   */
  REACT_APP_VERSION: string;
  /**
   * 微信小程序appid
   */
  REACT_APP_WX_APPID: string;
  /**
   * 接口中的客户端类型
   */
  REACT_APP_CLIENT_TYPE: string;
  /**
   * 设备环境
   */
  REACT_APP_DEVICE: string;
  /** 首页路径 */
  REACT_APP_HOME_PATH: string;
}

interface EnvVersion {
  /** 开发版 */
  develop: 'develop'
  /** 体验版 */
  trial: 'trial'
  /** 正式版 */
  release: 'release'
}


declare interface IenvData {
  /**
  * 环境变量
  */
  REACT_APP_ENV: string
  /**
   * 路由根目录
   */
  REACT_APP_EC_BASEAPI: string;
  /**
 * 路由根目录(内部)
 */
  REACT_APP_EC_INTERIOR_BASEAPI: string;
  /**
   * 测试接口（子龙本地接口）
   */
  REACT_APP_EC_Long?: string;
  /**
   * 测试接口（王发本地接口）
   */
  REACT_APP_EC_Wang?: string;
  /**
   * 基础路径
   */
  BASE_URL?: string;
  /**
   * 基础路径
   */
  BASE_URL_WOA?: string;
  /**
   * 基础路径
   */
  envVersion?: keyof EnvVersion;
}

type AnyKey = Record<any, any>;

interface CommonResponse<T> extends AnyKey {
  code: number,
  data: T,
  rows: T,
  mag?: string | null,
  total?: number
}
