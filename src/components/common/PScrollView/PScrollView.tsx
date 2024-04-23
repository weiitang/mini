import { ScrollView } from '@tarojs/components';
import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './PScrollView.module.less';

export interface IPScrollViewProps extends ScrollViewProps {
  /** class名 */
  className?: string;

  children?: React.ReactNode;
}

const PScrollView: FC<IPScrollViewProps> = ({
  className,
  children,
  showScrollbar = false,
  ...restProps
}) => (
    <ScrollView
      className={classNames(styles['P-scrollView'], className)}
      lowerThreshold={600}
      scrollY
      // enableBackToTop
      scrollAnchoring
      enhanced
      showScrollbar={showScrollbar}
      {...restProps}
    >
      {children}
    </ScrollView>
);

export default PScrollView;
