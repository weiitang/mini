/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/*
 * @Description: AppstoreModelType
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 23:47:00
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-21 09:56:17
 */
/**
 * APP状态库
 */
declare abstract class AppstoreModel {
  constructor(IndexStore: IndexStoreModel);
  /**
   * 全局状态入口
   */
  IndexStore: IndexStoreModel;
  /**
   * 项目启动Load
   */
  abstract appLoading: boolean;
  /**
   * set 项目启动Load
   */
  abstract setAppLoading: (flag: boolean) => void;

  /** 是否显示小程序 */
  isShowApp: boolean;
  /** 设置是否显示小程序 */
  setIsShowApp: (value: boolean) => void;
  /** 自动登录加载loading */
  abstract isAutoLoginLoading: boolean;
  abstract setIsAutoLoginLoading: (data: boolean) => void;
  /** 模块显示 */
  pageModules: IpageModel;

  /** set模块显示 */
  setPageModules: (pageModules: Partial<IpageModel>) => void;
}
/**
 * 页面模块显示
 */
declare interface IpageModel {
  /** 首页广场 */
  index: boolean;
  /** 服务 */
  service: boolean;
  /** 需求工单 */
  require: boolean;
  /** 活动日历 */
  activityCalendar: boolean;
  /** 公司旅程 */
  companyList: boolean;
  /** 我的模块 */
  me: boolean;
  /** 员工管理 */
  employeeManage: boolean;
}
