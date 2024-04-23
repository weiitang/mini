export interface NavTabType {
  /*
   * 文章
   * */
  article: 'article',
  /*
   * 外链
   * */
  external: 'external',
}

export interface LinkType {
  /*
   * 文章
   * */
  article: 'article',
  /*
   * 外链
   * */
  external: 'external',
  /*
   * 小程序
   * */
  applets: 'applets',
}

export interface TemplateData {
  /*
 * 卡片列表
 * */
  business: 'business-cooperation',
  /*
  * 文章列表
  * */
  green: 'green-channel',
  /*
  * 直接跳转文章/小程序/外链
  * */
  goToTheTarget: 'goToTheTarget',
}

export interface DemandStatusType {
  /*
 * 提交
 * */
  1: 1,
  /*
 * 待处理
 * */
  2: 2,
  /*
 * 接单
 * */
  3: 3,
  /*
 * 转单
 * */
  4: 4,
  /*
 * 回复-内部
 * */
  5: 5,
  /*
 * 回复-外部
 * */
  6: 6,
  /*
 * 已处理
 * */
  7: 7,
  /*
 * 已关闭
 * */
  8: 8,
  /*
* 已撤销
* */
  9: 8,
}
