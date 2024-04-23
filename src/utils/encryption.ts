// const data: {[key: string]: string | string[]} = {
//   '/mySelf/employeeManagement/invitation': 'post',
//   '/mySelf/UserBaseInfo/edit': 'post',
//   '/mySelf/employeeManagement/delete': 'post',
//   '/mySelf/employeeManagement/edit': 'put',
//   // '/system/user/register': 'post',
//   '/demand/process': 'post',
//   '/demand/sheet': ['patch', 'post'],
//   // '/login': 'post',
// };

// 不经过登入可以调用的接口
const excludeData: {[key: string]: string | string[]} = {
  '/login': 'post',
  '/interface/signature': 'GET',
  '/system/user/register': 'post',
  '/getOpenid': 'GET',
  '/getPhoneNumber': 'GET',
  '/getAccessToken': 'GET',
  '/mySelf/employeeManagement/validInvitation': 'GET',
  '/system/user/validUserType': 'GET',
  '/system/post/name': 'GET',
  '/cms/config/app/list': 'GET',
  '/system/user/click/check': 'POST',
};

// export const excludeParams = {
//   '/demand/sheet/external/list':
// }

const equation = (method: string, target: string | string[]) => {
  let flag = false;

  if (Array.isArray(target)) {
    target.forEach((item: string) => {
      if (item === method || item?.toUpperCase() === method?.toUpperCase()) {
        flag = true;
      }
    });
  } else {
    if (target === method || target?.toUpperCase() === method?.toUpperCase()) {
      flag = true;
    }
  }
  return flag;
};

// export const getIsEncryption = (path: string, method?: string) => {
//   if (!method || !path) return false;

//   let flag = false;
//   // eslint-disable-next-line no-restricted-syntax
//   for (const key in data) {
//     if ((key === path || path.indexOf(key) === 0) && equation(method, data[key])) {
//       flag = true;
//     }
//   };
//   return flag;
// };
export const getIsEncryption = (path: string, method?: string) => {
  if (!method || !path) return false;

  let flag = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in excludeData) {
    if ((key === path || path.indexOf(key) === 0) && equation(method, excludeData[key])) {
      flag = false;
    }
  };
  return flag;
};
