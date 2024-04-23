/*
 * @Description: eslint配置
 * @Version: 1.0.0
 * @Author: DerrickFeng
 * @Date: 2022-10-11 00:18:28
 * @LastEditors: DerrickFeng
 * @LastEditTime: 2023-02-17 10:46:55
 */
module.exports = {
  root: true,
  extends: [
    'taro/react',
    'eslint-config-tencent',
    'eslint-config-tencent/ts',
  ],
  env: {
    // 要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true
    browser: true,
    node: true,
    mocha: true,
    es6: true,
    commonjs: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "@typescript-eslint/naming-convention": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "max-len": ["error", { "code": 1500 }],
    'import/no-duplicates': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-shadow': ['error'],
    // '@typescript-eslint/prefer-optional-chain': 'off',
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "legacyDecorators": true, // 允许使用修饰符
      "globalReturn": false // 设置为 true，当 sourceType 为 script 时，允许全局 return
    },
    "requireConfigFile": true, // 是否需要 babel 配置文件
    "allowImportExportEverywhere": false //设置为 true，import 和 export 声明 可以出现在文件的任务位置，否则只能出现在顶部
  },
  globals: {
    "__DEV__": true,
    "__WECHAT__": true,
    "__ALIPAY__": true,
    "App": true,
    "Page": true,
    "Component": true,
    "Behavior": true,
    "wx": true,
    "getApp": true,
    "getCurrentPages": true,
    "Promise": true,
    "console": true,
    "process": true,
    "setTimeout": true,
    "clearTimeout": true,
    "setInterval": true,
    "clearInterval": true,
  }
}
