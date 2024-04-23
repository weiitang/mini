/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { getStorageSync, useDidShow } from '@tarojs/taro';
import JumpItem from '@/components/pages/meModule/JumpItem/JumpItem';
import PPage from '@/components/common/PPage/PPage';
import AvatarImg from '@/static/images/avatar.png';
import { View, Image } from '@tarojs/components';
import { useEffect, useState } from 'react';
import tools from '@/utils/tools/tools';
import { Tag } from '@taroify/core';
import Taro from '@tarojs/taro';
import { wexinLogin } from '@/utils/mp/wechat';
import { jumpData } from './jumpData';
import styles from './me.module.less';


const Me = () => {
  const [user, setUser] = useState<any>();
  const [jumpArr, setJumpArr] = useState<Array<IJumpArr>>(jumpData);

  useDidShow(() => {
    wexinLogin().then((res: any) => {
      console.log('res', res);
    });

    Taro.getUserInfo({
      success(res) {
        console.log('user', res);
        setUser(res);
      },
    });

    const defaultJData = jumpData.filter(_ => _.title !== '员工管理');
    let userType = 0;
    if (!!getStorageSync('engName')) {
      userType = 1;
      setJumpArr(defaultJData);
    } else {
      const isCEOACFO: any = ['CEO', '联合创始人']?.includes(getStorageSync('postName')[0]);
      if (isCEOACFO) {
        userType = 2;
        setJumpArr(jumpData);
      } else {
        userType = 3;
        setJumpArr(defaultJData);
      };
    }
  });


  // const handleClick = () => {
  //   Taro.getUserProfile({
  //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //       console.log('userr', res);
  //       setUser(res);
  //     },
  //   });
  // };

  useEffect(() => {

  }, []);

  // if (!user) {
  //   return <PLoading />;
  // }

  return (
    <PPage
      isTabPage
      tabbarType='me'
    >
      <View className={styles['me-container']}>
        <View className={styles['avatar-name-info']}>
          <View className={styles.avatar}>
            <Image
              mode='aspectFill'
              className={styles['avatar-image']}
              // eslint-disable-next-line no-nested-ternary
              src={user?.userInfo?.avatarUrl ? user?.userInfo?.avatarUrl : AvatarImg}
              style={user?.data?.wechatAvatar ?? { opacity: 0.9 }}
            />
          </View>
          <View className={styles.info}>
            <View className={styles['name-position']}>
              <View className={styles.name}>{tools.cutStr(user?.userInfo?.nickName ?? '', 8, '...')}</View>
              <View className={styles['position-area']}>
                {[1].map(_ => (
                  <Tag
                    className={styles.position}
                    style={!!getStorageSync('engName') ? { display: 'none' } : {}}
                  >
                    ❤️❤️❤️
                  </Tag>
                ))}
              </View>
            </View>
            {/* <Button openType='getUserInfo' onClick={() => handleClick()}>点击</Button> */}
          </View>
        </View>
        <View className={styles['jump-container']}>
          {jumpArr?.map(j => (
            <JumpItem
              className={styles['jump-item']}
              iconSrc={j.iconSrc}
              title={j.title}
              link={j.link}
              isSwitch={j.isSwitch}
              userId={user?.data?.userId}
              isGotoLink={j.isGotoLink}

            />
          ))}
        </View>
      </View>
    </PPage>
  );
};

export default Me;
