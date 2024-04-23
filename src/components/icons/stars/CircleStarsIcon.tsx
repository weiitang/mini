import { View, Image } from '@tarojs/components';
import React from 'react';
import { IIconProps } from 'types/componentsTypes/IconProps';
import stars from '../../../static/icons/circleStars.svg';

export const CircleStarsIcon: React.FC<IIconProps> = (props) => {
  const { className = '', onClick } = props;

  return (
    <View className={`${className}`} onClick={onClick}>
      <Image src={stars} style={{ width: '16px', height: '16px' }} />
    </View>
  );
};
export default CircleStarsIcon;
