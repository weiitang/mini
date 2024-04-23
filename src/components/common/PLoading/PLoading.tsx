import { View } from '@tarojs/components';
import { Loading } from '@taroify/core';
import classNames from 'classnames';
import styles from './PLoading.module.less';
import { PNoData } from '../PNoData/PNoData';

interface Loadingprops {
  className?: string
  /** pending状态 */
  status?: string
  /** 没数据时背景图ICON大小 */
  iconSize?: number
  /** 没数据时背景图ICON margintop */
  marginTop?: string
  /** 没数据时提示文案字体大小 */
  titleFontSize?: string
  /** 返回状态码 */
  code?: number
  dataLength?: number
  errorTitle?: string
}

/** loading组件 */
export const PLoading = (props: Loadingprops) => {
  const { className, status, iconSize, marginTop, code, titleFontSize, dataLength, errorTitle } = props;
  return (
    <View className={classNames(styles.container, className)}>
      {
        // eslint-disable-next-line no-nested-ternary
        ['pending', undefined].includes(status)
          ? code === 500 || dataLength === 0
            ? <PNoData iconSize={iconSize} marginTop={marginTop} title={(status === 'fulfilled' || dataLength === 0) ? errorTitle ?? '暂无相关数据~' : errorTitle ?? '服务器发生错误'} titleFontSize={titleFontSize} />
            : <Loading className={styles.color} />
          : <PNoData iconSize={iconSize} marginTop={marginTop ?? '-100PX'} title='暂无相关数据~' titleFontSize={titleFontSize} />
      }
    </View>
  );
};
