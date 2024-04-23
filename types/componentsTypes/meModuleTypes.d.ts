/*
 * @Description:
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 20:29:30
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-01-05 15:54:32
 */

/** 员工管理卡片组件参数类型 */
interface EmployeeManageCardProps {
  /** 员工管理卡片数据 */
  data: any;
  /** 点击事件 */
  onClick: () => void;
}

/** （我的页面）页面跳转组件参数类型 */
interface JumpItemProps {
  /** icon的src路径 */
  iconSrc: string,
  /** 跳转title */
  title: string,
  /** 跳转link */
  link: string,
  /** 是否为switchTab跳转 */
  isSwitch: boolean,
  /** 用户id */
  userId?: string
  isGotoLink?:boolean
  className?: string
}

/** (我的模块)设置页面组件参数类型 */
interface SettingItemProps {
  /** 我的模块用户列表数据 */
  userData: any[]
}

interface IIsDoSth {
  /** 是否点击编辑按钮 */
  isEdit: boolean,
  /** 是否点击保存按钮 */
  isSubmit: boolean,
  /** 是否点击删除按钮 */
  isDetele: boolean,
}

interface IOpenSth {
  /** 是否打开职位下拉框 */
  role: boolean,
  /** 是否打开弹框 */
  dialog: boolean
}

interface IUserInfo {
  phone: string,
  receAddress: string,
}
