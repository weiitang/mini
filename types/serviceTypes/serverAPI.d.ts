/*
 * @Description:服务模块接口类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-24 11:03:56
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-28 11:22:35
 */

// import { InviterChannelType, OrgStructureType } from '../taro-enum';
import { DemandStatusType, LinkType, NavTabType, TemplateData } from '../pageTypes/common';

interface ISecondService {
  /** 二级服务ID */
  id: string | number
  /**　模糊查询的关键字 */
  serviceName?: string
}

type GetSecondServiceResultData = {
  linkType: keyof LinkType;
  type: keyof NavTabType;
} & AnyKey;


type TypeGetSecondServiceResult = CommonResponse<GetSecondServiceResultData[]>;


type GetGetComServiceResultData = {
  type: keyof TemplateData;
} & AnyKey;

type TypeGetComServiceResult = CommonResponse<GetGetComServiceResultData[]>;


type GetGetServiceResultData = {
  data: Array<{
    linkType: keyof LinkType;
    type: keyof TemplateData;
  } & AnyKey>;
} & AnyKey;

type TypeGetServiceResult = CommonResponse<GetGetServiceResultData[]>;


type GetExternalDemandListData = {
  status: keyof DemandStatusType;
} & AnyKey;

type TypeGetExternalDemandListResult = CommonResponse<GetExternalDemandListData[]>;


interface UpdateInviteTypes extends AnyKey {

  /*
* 邀请渠道
* */
  inviterChannel: any
}

interface GetPostName {
  orgStructureType: any
}
