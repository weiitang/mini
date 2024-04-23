import { ScrollView, View } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { FC } from 'react';
import classNames from 'classnames';
import './PTabbar.module.less';

interface PTabbarProps {
  /**
   * 当前下标
   */
  currentTab: number;
  /**
   * 数组标题
   */
  list: string[];
  /**
   * 点击回调
   */
  onChange?: (num: number) => void;
  /**
   * 自定义类名
   */
  className?: string;
  /** 是否显示border */
  isBorder?: boolean;
  /**
   * 自定义类名
   */
  type?: number;
}

// tab组件
const PTabbar: FC<PTabbarProps> = (props) => {
  const { currentTab, list, className, onChange, type, isBorder } = props;
  const [movex, setMovex] = useState(0);
  const [scrollWidth, setscrollWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const query = Taro.createSelectorQuery(); // 创建节点查询器 query
      query.select('#Ptabbars_wrap').boundingClientRect(); // 这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
      query.exec((res) => {
        if (res[0]) {
          setscrollWidth(res[0].width);
        }
      });
    }, 100);
  }, []);

  useEffect(() => {
    const query = Taro.createSelectorQuery(); // 创建节点查询器 query
    query.selectAll('.Ptabbars_item').boundingClientRect(); // 这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.exec((res) => {
      const resList = res[0];
      if (resList) {
        const one = resList[currentTab];
        if (one) {
          const count = 15 - resList[0].left;
          const val = one.left + count - scrollWidth / 2 + 24;
          setMovex(val);
        }
      }
    });
  }, [scrollWidth, currentTab]);

  return (
    <ScrollView
      id='Ptabbars_wrap'
      scrollWithAnimation
      scrollLeft={movex}
      showScrollbar={false}
      scrollX
      className={type === 1 ? `Ptabbars_wrap_black ${className}` : `Ptabbars_wrap ${className}`}
    >
      {list.map((val, index) => (
        <View key={index} onClick={() => onChange?.(index)} className={classNames('Ptabbars_item', { active: currentTab === index, isBorder })}>
          {val}
        </View>
      ))}
    </ScrollView>
  );
};

export default PTabbar;
