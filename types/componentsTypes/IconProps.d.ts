/*
 * @Description:
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-17 20:29:30
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2022-10-30 22:39:06
 */
import { CSSProperties } from 'react';

interface IIconProps {
  className?: string;
  svgClass?: string;
  width?: string;
  height?: string;
  onClick?: (event) => void;
}


interface PIconBasicProps {
  /** icon内联样式 */
  style?: CSSProperties,
  /** icon大小 */
  size?: number,
  /** class名 */
  className?: string,
  /** 点击事件 */
  onClick?: () => void,
  /** 图片后缀类型 png，svg */
  type?: string
  /**　icon是否显示 */
  isDisplay?: boolean
}

/** Icon组件名字参数（图片路径名称） */
interface PIconProps extends PIconBasicProps {
  /** icon名称 */
  name: string,
}
