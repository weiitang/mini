/*
 * @Description: 需求模块组件类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-20 10:09:42
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-12-17 19:54:12
 */

interface RespondDataType {
  /** 创建人 */
  createBy: string
  createTime: string
  /** 附件 */
  enclosure: string
  /** 人员类型1处理人2提出工单的人 */
  handlerType: number
  orgName: string
  postName: string
  /** 回复内容 */
  replyContent: string
  /** 回复人 */
  replyBy: string
  replyTime: string
  /** 字段绑定的数据 */
  customFields: string
  type: number
  createByName: string
  userNameZh?: string
}

// 回复组件卡片类型
interface RespondCardProps {
  /** 列表数据 */
  respondData: RespondDataType
  /** 是否显示该组件  */
  isDisplay: boolean
  /** 组件class */
  cardClass: Partial<FormClassType>
  cardKey?: Partial<FormKeyType>
  uploaderData: any
  rDeatil: any
  /** 卡片索引 */
  index: number
  length: number
}

/** 需求卡片组件参数类型 */
interface RequireCardProps {
  /** 卡片数据 */
  data: any[];
}

/** 表单key类型 */
interface FormKeyType {
  textAreaKey: string
  /** 后台可配置字段key */
  customFieldsKeys: string
  uploaderKey: string
}

interface FormClassType {
  textAreaClass: Record<string, string>
  /** 后台可配置字段key */
  customFieldsClass: Record<string, string>
  uploaderClass: Record<string, any>
}

/** 需求表单组件类型 */
interface RequireFormProps {
  /** 表单key */
  formKey: FormKeyType
  files: any
  setFiles: any
  /** 是否是查看详情 */
  isDeatil: boolean
  /** 组件class */
  formClass: FormClassType
  itemRef: any
  /** 是否显示 */
  isDisplay: boolean
  uploaderData?: any
  currentCF?: any
  customFields: any[] | undefined
  customFieldsRef: any
  rDeatil: any
  /** 模板数据 */
  typeData?: any
  date?: any
  setDate?: any
  isError?: boolean
  replyField?: string | undefined
  setReplyField: any
  reply: boolean
  isErrorC: boolean
}


