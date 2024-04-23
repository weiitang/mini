/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/naming-convention */
import SettingIcon from '@/static/icons/settings.png';
import AboutIcon from '@/static/icons/about.png';

/** 跳转列表数据 */
export const jumpData: Array<{ iconSrc: string, title: string, link: string, isSwitch: boolean, isGotoLink?: boolean }> = [
  {
    iconSrc: SettingIcon,
    title: '设置',
    link: '/pages/me-module/setting-info/setting-info',
    isSwitch: false,
    isGotoLink: false,
  },
  {
    iconSrc: AboutIcon,
    title: '关于',
    link: '/pages/me-module/about/about',
    isSwitch: false,
    isGotoLink: false,
  },
];

/** 用户信息展示数据 */
export const userData: Array<{ label: string, type: string, key: string, value?: string, onChange?: () => void }> = [
  {
    label: '头像',
    type: 'image',
    key: 'wechatAvatar',
  },
  {
    label: '姓名',
    type: 'input',
    key: 'userNameZh',
  },
  {
    label: '所属公司',
    type: 'input',
    key: 'orgName',
  },
  {
    label: '职位',
    type: 'input',
    // type: 'picker',
    key: 'postName',
  },
  {
    label: '绑定手机号',
    type: 'input',
    onChange: () => { },
    key: 'phone',
  },
  {
    label: '邮箱',
    type: 'input',
    key: 'email',
  },
  {
    label: '收货地址',
    type: 'address',
    onChange: () => { },
    key: 'receAddress',
  },
];

export const employeeStatus = {
  0: {
    tag: '未邀请',
    color: '#999999',
    backgroundColor: '#F5F5F5',
  },
  1: {
    tag: '已邀请',
    color: '#0047BA',
    backgroundColor: 'rgba(0,71,186,0.05)',
  },
  2: {
    tag: '已注册',
    color: '#EE792B',
    backgroundColor: ' rgba(238,121,43,0.06)',
  },
};

/** 员工管理信息表单数据 */
export const employeeInfoForm = [
  {
    label: '姓名',
    name: 'userNameZh',
    rules: [
      {
        pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, // 姓名不能带符号（中文英文都可以）
        message: '请输入正确的姓名,不要带符号',
      },
    ],
    placeholder: '请输入姓名',
    maxlength: 30,
  },
  {
    label: '职位',
    name: 'postName',
    rules: [
      {
        pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        message: '请输入正确的角色,不要带符号',
      },
    ],
    placeholder: '请输入岗位',
  },
  {
    label: '手机号',
    name: 'phone',
    rules: [
      {
        pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
        message: '请输入正确的手机号',
      },
    ],
    placeholder: '请输入手机号',
  },
  {
    label: '邮箱',
    name: 'email',
    // rules: [
    //   {
    //     pattern: /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/,
    //     message: '请输入正确的邮箱',
    //   },
    // ],
    placeholder: '请输入邮箱',
    maxlength: 40,
  },
  {
    label: '邀请时间',
    name: 'inviterTime',
  },
  {
    label: '注册时间',
    name: 'registerTime',
  },
];
