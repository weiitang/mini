/* eslint-disable @typescript-eslint/naming-convention */
import { View } from '@tarojs/components';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { useMemo, FC } from 'react';
import PScrollView from '@/components/common/PScrollView/PScrollView';
import stores from '../../../stores/index';
import styles from './PPage.module.less';
import PCustomTabbar from '../PCustomTabbar/PCustomTabbar';


interface IProps {
  /** 是否是tab页 */
  isTabPage?: boolean;

  /** class名 */
  className?: string;

  /** 是否显示导航栏 */
  isNavBar?: boolean;

  /** 是否为滚动视图 */
  isScrollView?: boolean;

  /** 是否固定高度 */
  isFixedHeight?: boolean;

  scrollViewProps?: ScrollViewProps;

  /** 滚动 container view class名 */
  scrollContainerClassName?: string;

  /** container view class名 */
  containerClassName?: string;

  children?: React.ReactNode;
  /** 是否显示底部导航 */
  tabbarType?: string;
  onTouchMove?: (e: any) => void;
  onTouchStart?: (e: any) => void;
}

const PPage: FC<IProps> = ({
  isTabPage,
  className,
  isNavBar,
  isScrollView,
  isFixedHeight,
  scrollViewProps,
  scrollContainerClassName,
  containerClassName,
  children,
  tabbarType,
  onTouchMove,
  onTouchStart,
}) => {
  const { GlobalSystemInfoStore, CustomTabBarStore } = stores;
  const { globalSystemInfo } = GlobalSystemInfoStore;
  const { data } = CustomTabBarStore;

  const scrollViewStyle = useMemo(() => {
    const style: any = {
      height: '100vh',
    };
    if (globalSystemInfo) {
      if (isNavBar) {
        style.height = `calc(100vh - ${globalSystemInfo?.navBarHeight}px);`;
      }

      if (data.showTab && isTabPage) {
        style.height = 'calc(100vh - 10px)';
      }

      if (isNavBar && data.showTab && isTabPage) {
        style.height = `calc(100vh - ${globalSystemInfo?.navBarHeight + 50}px);`;
      }
    }

    return style;
  }, [globalSystemInfo, isNavBar, data.showTab, isTabPage]);

  return (
    <View onTouchMove={onTouchMove} onTouchStart={onTouchStart} style={{ paddingBottom: data.showTab && isTabPage ? 60 : 0 }} className={classNames(styles['P-page'], className)}>
      {/* {isNavBar && <PNavbar {...navbarProps}></PNavbar>} */}
      {isScrollView ? (
        <PScrollView className={classNames(styles['P-page__scrollContainer'], scrollContainerClassName)} style={scrollViewStyle} {...scrollViewProps} scrollAnchoring>
          {children}
        </PScrollView>
      ) : (
        <View className={classNames(styles['P-page__container'], { isFixedHeight }, containerClassName)} style={isFixedHeight ? scrollViewStyle : {}}>
          {children}
        </View>
      )}
      {isTabPage && <PCustomTabbar tabbarType={tabbarType}></PCustomTabbar>}
    </View>
  );
};

export default observer(PPage);
