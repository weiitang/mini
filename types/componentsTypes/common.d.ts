/*
 * @Description: 通用组件类型
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 20:29:30
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-03-06 16:09:37
 */
/** 下拉菜单组件参数类型 */
interface PDropdownProps {
  /** class名 */
  className: string
  /** 下拉菜单数据 */
  data: any[],
  /** 下拉选择触发函数 */
  onChange: (value: any) => void
  firstName?: string
  setValue_: React.Dispatch<React.SetStateAction<boolean | string |
  { status?: string | number, secondLevelIds?: string, startCreateTime?: string } |
  { value: string, id: string } | { postId: string, postName: string, orgId: string, orgName: string } | undefined>>
  setOnShow?: any
  style?: any
  opt?: any
}

/** 高亮组件参数类型 */
interface PHighlightProps {
  /** 搜索款输入内容 */
  searchValue: string,
  /** 行名 */
  name: string,
  /** 点击方法 */
  onCLick?: (e: any) => void
  className?: string
  style?: any
}

/** 输入框组件参数类型 */
interface InputProps {
  /** 带搜索icon的输入框，为icon的src */
  icon?: string,
  /** label */
  laber: string,
  /** 占位符文字 */
  placeholderTitle: string,
  /** 是否禁用输入框 */
  disabled?: boolean,
  /** 输入框的值 */
  value?: string,
  /** 输入框点击事件 */
  onClick?: () => void,
  /** 输入框输入监听事件 */
  onInput: (e: any) => void,
  onBlur: any
  className?: string
  /** 子类型 */
  subType?: string
  roleArr?: string[]
  setRoleArr?: any
  /** 是否展示弹出框小图标 */
  isDialogIcon?: boolean
  maxlength?: number
}

/** 弹出层组件参数类型 */
interface PopupProps {
  /** 是否打开弹出层 */
  open: boolean,
  /** 是否开启边框圆角 */
  rounded: boolean,
  /** 弹出层高度 */
  height: string,
  /** 设置打开、关闭弹出层 */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  /** 设置值 */
  setValue: React.Dispatch<React.SetStateAction<boolean | string |
  { status?: string | number, secondLevelIds?: string[], createTime?: string } |
  { value: string, id: string } | {
    postId?: string, postName?: string, orgId?: string, orgName?: string,
    createBy?: string, userName?: string, orgProfessionLevel1?: string, orgProfessionLevel2?: string,
    orgClassification?: string, firstLevelName?: string, secondLevelName?: string
  } | undefined>>
  /** 值 */
  value?: string | number | boolean | undefined
  /** 选择器数据 */
  pickerData?: any[]
  /** 弹出层类型，暂时设计两种类型：带搜索框'search'和带选择器'picker' */
  type: 'search' | 'picker' | 'date',
  /** 选择器类型 */
  pickType: 'postName' | string | object
  orgName?: string
  orgId?: string
  userId?: string
  /** 弹出方向 */
  placementArea?: 'top' | 'right' | 'bottom' | 'left'
  marginTop?: any
  ref?: any
  dateType?: 'date' | 'time' | 'datetime' | 'date-hour' | 'date-minute' | 'year-month' | 'month-day' | 'hour-minute'
  /** 弹框选择器标题 */
  pickerTitle?: string
  data?: any
  typeData?: any,
  setFirstName?: any,
  firstName?: any,

  /**
   * type=search时触发关键字或翻页时触发
   * @param keyword
   * @param reset 表示page=1需要重置
   * @returns
   */
  onSearch?: (keyword: string, reset: boolean) => Promise<any> | void;
}

/** 查看二维码组件参数类型 */
interface QrCodeProps {
  /** 二维码url */
  url: string,
  /** 二维码标题 */
  name: string,
  /** 二维码描述 */
  desc: string,
  /** 开启长按图片显示识别小程序码菜单,默认为true */
  showMenuByLongpress: boolean
}

/** 搜索款组件参数类型 */
interface SearchProps {
  /** 搜索列表数据 */
  listData: any[] | undefined
  setValue: any
  setOpen: any
  /**
   * 关键字或翻页时触发
   * @param keyword
   * @param reset 表示page=1需要重置
   * @returns
   */
  onSearch?: (keyword: string, reset: boolean) => Promise<any> | void;
}

/** 骨架屏组件参数类型 */
interface SkeletonProps {
  /** 骨架屏上方图片为长方形还是圆形 */
  variant: 'rect' | 'circle',
  /** 一级标题宽度 */
  width: string
  /** 骨架屏的长度大小 */
  size: 'big' | 'small'
}

/** 空状态类型 */
interface NoDataType {
  title?: string,
  imgUrl?: string,
  style?: React.CSSProperties,
  imageStyle?: React.CSSProperties,
  iconSize?: number,
  titleFontSize?: string | undefined,
  titleColor?: string | undefined
  marginTop?: string
}

/** 旅程cell组件类型 */
interface FragmentCellProps {
  companyData: Partial<CellDataType>[],
}

/** cell组件类型 */
interface CellDataType {
  name: string,
  industryInfo: string,
  inviteStatus: string,
  grade: string,
  CEO: string[],
  CFO: string[],
  bPrincipal: string[]
}

interface IPDialog {
  /** 是否打开弹出框 */
  open: boolean | undefined
  /** 设置是否打开弹出框 */
  setOpen: (value: React.SetStateAction<boolean | undefined>) => void
  /** 弹出框Class */
  className: string
  /** 点击确定触发事件 */
  comfirmFn: () => void
  /** 确定按钮Class */
  btnComfirmClass: string
}
