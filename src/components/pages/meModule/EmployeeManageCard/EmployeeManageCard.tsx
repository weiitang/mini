/* eslint-disable react/no-children-prop */
import { employeeStatus } from '@/pages/me/jumpData';
import { View } from '@tarojs/components';
import tools from '@/utils/tools/tools';
import { Tag } from '@taroify/core';
import styles from './EmployeeManageCard.module.less';

/** 员工管理卡片组件 */
const EmployeeManageCard = (props: EmployeeManageCardProps) => {
  const {
    data,
    onClick,
  } = props;
  const inviterStatusName = employeeStatus[data.inviterStatusName === '已邀请' ? 1 : 2];
  return (
    <View
      onClick={onClick}
      className={styles['employee-manage-card']}
    >
      <View className={styles['employee-user-info']}>
        <View className={styles.name}>
          {tools.cutStr(data.userNameZh, 10, '...')}
        </View>
        <View className={styles.status}>
          <Tag
            size='large'
            className={styles.tag}
            children={data.inviterStatusName}
            style={{
              color: `${inviterStatusName.color}`,
              backgroundColor: `${inviterStatusName.backgroundColor}`,
            }}
          />
        </View>
      </View>
      <View className={styles['employee-detail-info']}>
        <View className={styles['posttion-invitePerson']}>
          <View className={styles.posttion}>
            {/* 职位：{data?.postName?.map(_ => (<View className={styles['role-item']} key={_}>{_}</View>)).length} */}
            职位：<View className={styles['role-item']} >{tools.cutStr(data?.postName.join(','), 10, '...')}</View>
          </View>
          {
            data.inviterName && <View className={styles.invitePerson}>邀请人：{tools.cutStr(data.inviterName ?? '', 6, '...')}</View>
          }
        </View>
        <View className={styles.phone}>手机：{data.phone}</View>
        <View className={styles.email}>邮箱：{data.email}</View>
      </View>
      <View className={styles['date-container']}>
        <View className={styles.apply}>{tools.cutStr(data.inviterTime ?? '', 16, '')}邀请</View>
        <View className={styles.register}>{tools.cutStr(data.registerTime ?? '', 16, '')}{!!data.registerTime ? '注册' : ''}</View>
      </View>
    </View>
  );
};

export default EmployeeManageCard;
