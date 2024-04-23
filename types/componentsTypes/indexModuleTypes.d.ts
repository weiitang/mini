/*
 * @Description: 广场模块类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 20:29:30
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-12-03 19:58:27
 */
import { ReactElement } from 'react';

/** 日历卡片组件参数类型 */
interface ActivityCalendarCardProps {
  /** 日历Card的标题，原来标识活动重要程度(内部版本) */
  icon: ReactElement,
  /** 日历Card的标题（活动名称）*/
  title: string,
  /** 日历Card的日期（活动日期）*/
  date: string,
  /** 日历Card的类型（分为内部或本和外部版本）*/
  type: 'inner' | 'outer',
  /** 外部版本的标签颜色 */
  tagsArr?: Array<{ title: string, color: string }>
  /** 日历Card的重要等级 */
  Level: any,
}

/** 服务卡片参数类型 */
interface ServerProps {
  // 接口返回的文件相关对象
  item: {
    icon?: string;
    fileType?: string;
    serviceTypeName?: any;
    [key: string]: any
  },
  /** 服务标题 */
  title: string | undefined,
  /** 点击事件 */
  onCLick: () => void,
  /** icon数目 */
  iconNum: number
  /** class */
  className: string
}

/** 服务Icon卡片参数类型 */
interface SwiperProps {
  className: string
  cmsData: any
}

/** 需求工单卡片参数类型 */
interface WorkProgressCardProps {
  /** 卡片数据 */
  data: any
  /** class名 */
  className?: string
  /** 是否显示下划线 */
  isDisplayDivder: boolean
}

/** 首页大卡片title-switch组件 */
interface ITitleSwitchTab {
  /** class名 */
  className?: string
  /** 标题名字 */
  title: string
  /** switch函数 */
  switchFn: () => {}
}
