/*
 * @Description:全局页面类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-24 14:01:52
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-01-06 16:25:29
 */
interface IData {
  /** 数据 */
  data: any,
  /** promise状态 */
  status: string | number
  total?: number
}
interface SetData<T> extends AnyKey {
  /** 数据 */
  data: T | any,
  /** promise状态 */
  status: string | number | any
  total?: number,
  title?: string
}

interface IJumpArr {
  isGotoLink?: boolean | undefined
  iconSrc: string,
  title: string,
  link: string,
  isSwitch: boolean
}

interface IOrgId {
  value: string,
  id: string
}
