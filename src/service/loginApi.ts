import { service } from './index';


/**  是否是内部员工 */
export const validUserType = (id: string) => service.request({
  type: 'GET',
  url: `/system/user/validUserType?userId=${id}`,
  showLoading: false,
});

/**
 * 获取加密签名
 */
export const signature = () => service.request({
  type: 'GET',
  url: '/interface/signature',
  showLoading: false,
});

/**
 * 拉取图片
 */
export const preview = (key: string) => service.request({
  type: 'GET',
  url: `/file/preview?key=${key}`,
  showLoading: false,
  responseType: 'arraybuffer',
  contentType: 'application/x-www-form-urlencoded',
});

/**
 * 登录 orgId
 */
export const getLoginInfo = (params: any, isInit?: boolean) => {
  let url = `/login?code=${params?.code}`;

  if (params?.orgId) {
    url = `/login?code=${params?.code}&orgId=${params?.orgId}`;
  }

  if (isInit) {
    url += '&__init=1';
  }

  return service.request({
    type: 'POST',
    url,
    showLoading: false,
  });
};

/** 查询用户信息 */
export const getUser = async () => {
  const res = await service.request({
    type: 'GET',
    url: '/mySelf/employeeManagement/get',
    showLoading: false,
  });
  return res;
};

/**
 * 注销账号
 */
export const deleteUser = async (data?: any) => {
  const res = await service.request({
    type: 'DELETE',
    url: '/system/user',
    showLoading: false,
    data,
  });
  return res;
};
