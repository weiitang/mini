/*
 * @Description:
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-12-07 11:50:48
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-12-07 12:01:39
 */
/** 公司名称 */
interface ICompanyName {
  orgId: string,
  postId: string,
  orgName: string,
  postName: string,
  userName?: string
  createBy?: string,
}

interface ISetValue {
  id: string
  value: string,
}

interface FJudgePvAndOrgInfo {
  /** item key */
  itemKey: string,
  /** 提示文字 */
  toastText: string
  /** 检查字段 */
  checkField: string,
  /** 是否存在检查条件 */
  isHaveInfoField: string | undefined,
}

