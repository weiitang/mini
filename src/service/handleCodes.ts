import message from '../utils/message';
import storage from '../utils/storage';
import jsonData from './errCodes.json';

export interface IcodeErrItem {
  /**
   * code码
   */
  code: number;
  /**
   * 中文提示语句
   */
  desc_ch: string;
  /**
   * 英文提示语句
   */
  desc_en: string;
}

// 统一处理后台code码错误
function handleMoreCodes(res: Ires) {
  // 不需要提示的名单
  const backList = [200, 500, 201, 204, 401, 81301426, 80101032, 80100012, 80106013, 80106001, 82400012, 82401114, 82401117, 82401116, 82401106];
  if (!res.code || backList.includes(res.code % 10000) || backList.includes(res.code)) {
    return;
  }

  let codeData = jsonData;
  const localCodeData = storage.get('ErrCode');
  if (localCodeData) {
    codeData = JSON.parse(localCodeData);
  }

  const valuesList: IcodeErrItem[] = Object.values(codeData);
  const codeRes = valuesList.find(e => e.code === res.code);
  if (codeRes) {
    let msgStr = codeRes.desc_ch;
    if (needDiyStr(msgStr)) {
      const descText = format(msgStr, res.data);
      msgStr = descText;
    }
    message.info(msgStr);
  } else {
    message.info(`Err[${res.code}]`);
  }
}

/** 是否包含需要自定义的语句 */
function needDiyStr(str: string) {
  if (str.indexOf('{') !== -1 && str.indexOf('}') !== -1) {
    return true;
  }
  return false;
}

/**
 * 替换字符串
 * @param theStr 待替换的字符串
 * @param newStr 替换成的字符串
 * @param regExp 替换正则
 */
function replaceStr(theStr: string, newStr: string, regExp: RegExp) {
  return theStr?.replace(new RegExp(regExp, 'gm'), newStr);
}

/**
 * 字符串格式化
 * @param theStr 待格式化的字符串
 */
function format(theStr: string, ...args: any[]) {
  let formatArgs;
  formatArgs = args;
  // no fotmat args
  if (formatArgs.length === 0) {
    return theStr;
  }

  if (formatArgs.length === 1 && typeof formatArgs[0] === 'object') {
    // eslint-disable-next-line prefer-destructuring
    formatArgs = formatArgs[0];
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key in formatArgs) {
    const value = formatArgs[key];
    if (value !== undefined) {
      // eslint-disable-next-line no-param-reassign
      theStr = replaceStr(theStr, value, /`\\{${key}\\}`/);
    }
  }
  return theStr;
}

export default handleMoreCodes;
