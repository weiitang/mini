/*
 * @Description:需求接口入参类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-18 15:38:46
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-01-03 18:37:19
 */

import { EnumHandlerType } from "../taro-enum"

interface IDemandExternalList {
  /** tabs切换，1服务中2已完成 */
  tabType: number
  /** 搜索内容描述，支持模糊查询 */
  demandDescribe?: string
  pageSize?: string
  pageNum?: string
}

interface IDemandInternalList {
  data: {
    /** 需求状态(1待处理2处理中3已完成4已关闭5已撤销) */
    status?: number | string | undefined
    /** 子类型id */
    secondLevelIds?: string | undefined
    /** 提交时间 */
    createTime?: string
    /** 如果传入该值，说明查询的我的代办，传用户ID */
    currentHandlerId: string
    /** 该参数和上面参数互斥，如果传入，说明查的是“抄送我的”，传用户ID */
    carbonCopy: string
    pageSize: string
    pageNum: string
    demandDescribe: string
    type: string
  }
  headers: {
    uid: string
    username: string
  }
  token: string
}

interface IReplyDemand {
  /** 需求单号 */
  demandId: string
  /** 回复内容 */
  replyContent: string,
  /** 附件url */
  enclosure: string,
  /** 回复人 */
  createBy: string
  /** 人员类型: 1处理人2提出工单的人 */
  handlerType: EnumHandlerType
  userNameZh?: string
  customFields?: string
}

interface IDefaultByType {
  /** 父类型id */
  firstLevelId: string
  /** 子类型id */
  secondLevelId: string
}

interface INewDemand {
  /** 父类型id */
  firstLevelId: string
  /** 子类型id */
  secondLevelId: string
  /** 公司ID */
  orgId: string
  orgName: string
  /** 岗位ID */
  postId: string
  postName: string
  /** 需求描述 */
  demandDescribe: string
  /** 创建人ID */
  createBy: string
  /** 自定义字段 */
  customFields?: string
  /** f附件 */
  enclosure: string
  /** 需求单id */
  id: string,
  /** 需求状态(1待处理2处理中3已完成4已关闭5已撤销) */
  status: string
  createByName: string;
  demandTemplateId: string
}

interface IRevokeDemand {
  demandId: string,
  type: number
  handlerType: number
}
