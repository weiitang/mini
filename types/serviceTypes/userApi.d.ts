/*
 * @Description: userApi入参类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-18 16:00:13
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-11-07 20:17:16
 */
interface loginBodyType {
  wx_code: string;
  wx_app_id: string;
  type: number;
  wx_phone_en?: {
    encrypted_data: string;
    iv: string;
  };
}

interface IUpdateUser {
  LoginUserId: string,
}
interface IGetEmployeeInfo {
  searchValue: string,
  inviterStatus: number | null
  postId: string | null
  userId: string
}

interface IDeteleEmployeeInfo {
  userId: string
  LoginUserId?: string;
  admin?: boolean,
  roles?: any[],
}
