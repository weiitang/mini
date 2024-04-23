import { View, Image } from '@tarojs/components';
import React from 'react';
import { IIconProps } from 'types/componentsTypes/IconProps';
import users from '../../../static/icons/add-users.svg';

export const AddUsersIcon: React.FC<IIconProps> = (props) => {
  const { className = '', onClick, width, height } = props;
  return (
    <View className={`${className}`} onClick={onClick}>
      <Image src={users} style={{ width, height }} />
    </View>
  );
};
export default AddUsersIcon;
