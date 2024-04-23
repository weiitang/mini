/*
 * @Description:服务模块组件类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 20:29:30
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-03-06 15:58:59
 */

/** 折叠卡片组件参数类型 */
interface CollapseCardProps {
  /** 折叠卡片数据 */
  data: any[],
  /** (帮我对接)点击事件 */
  onDockClick: ((item) => void)
}

/** 业务合作卡片模板组件参数类型 */
interface CooperationCardProps {
  /** 二级服务名称 */
  title: string,
  /** 服务详情 */
  info: string,
  /** 是否展示申请合作按钮（后台配置） */
  isCoo: string,
  /** 查看详情需求跳外链链接 | 跳转文章ID（都是后台配置） */
  isGotoLink: boolean | string
  /** 富文本字段 */
  describ: any
  /** 当前文章的索引 */
  index?: number
  /** 一级服务类型的ID */
  serverId?: any
  /** 跳转类型（跳转文章、跳转外链） */
  linkType: 'article' | 'external' | null
  /** 是否展示权限icon */
  isJurisdiction: boolean
  /** 文章标题 */
  name: string
  id: string
  isHighLight: boolean;
  sValue: string;
}
