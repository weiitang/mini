

export const enum InviterChannelType {
  /*
* 链接
* */
  LINK = '1',

  /*
 * 扫码
 * */
  SCAN_QR_CODE = '2',
}

export const enum CompaniesTabsValueType {
  /*
* 被投公司
* */
  company = 0,

  /*
 * 被投公司用户
 * */
  company_user = 1,
}

export const enum EnumHandlerType {
  /**
   * 处理人
   **/
  PROCESSED_BY = '1',

  /**
   * 提出工单的人
   **/
  PROPOSE_BY = '2',
}

// -- 公司组织架构类型
export const enum OrgStructureType {
  /**
   * 组织架构
   **/
  TX = '1',

  /**
   * 通用组织架构
   **/
  GENERALITY = '2',
}

// -- 请求返回code类型
export const enum RequestResponseCode {
  /**
   * 成功
   **/
  SUCCESS = 200,

  /**
   * 失败
   **/
  FAIL = 500,

  /**
   * 登录用户不存在或被删除
   **/
  ACCOUNT_NOT_EXIST = 1009,

  /**
   * 该用户没有权限登录该小程序，请联系管理员授权！
   **/
  CLIENT_UNAUTHORIZED = 1006,

  /**
   * 群发邀请 待审核中 5
   **/
  GROUPS_INVITER_STATUS = 1005,

  /**
   * 未授权 登录过期
   **/
  UNAUTHORIZED = 401,

  /**
   * 该岗位注册数已满
   **/
  POST_LIMIT = 1012,
}
