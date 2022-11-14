/*
 * @Author: 江雪松 576053154@qq.com
 * @Date: 2020-06-18 14:02:16
 * @LastEditors: 江雪松 576053154@qq.com
 * @LastEditTime: 2022-10-11 10:11:41
 * @FilePath: /vben-ucenter/yirenck/products.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 *读取env环境变量
 */
const fs = require('fs');
const path = require('path');
// env 文件 判断打包环境指定对应的服务器id
const envfile = process.env.NODE_ENV === 'prod' ? '../.env.prod' : '../.env.dev';
// env环境变量的路径
const envPath = path.resolve(__dirname, envfile);
// env对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'));
const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID']);

function parse(src) {
  // 解析KEY=VAL的文件
  const res = {};
  src.split('\n').forEach((line) => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      let value = keyValueArr[2] || '';

      // expand newlines in quoted values
      const len = value ? value.length : 0;
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n');
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim();

      res[key] = value;
    }
  });
  return res;
}

/*
 *定义多个服务器账号 及 根据 SERVER_ID 导出当前环境服务器账号
 */
const SERVER_LIST = [
  {
    id: 0,
    name: 'A-生产环境',
    domain: '', // 域名可以忽略
    host: '101.132.174.118', // ip
    port: 22, // 端口
    username: 'root', // 登录服务器的账号
    password: 'dounion@2018', // 登录服务器的账号
    path: '/app/static/mes_static', // 发布至静态服务器的项目路径
  },
  {
    id: 1,
    name: 'B-生产环境',
    domain: '', // 域名可以忽略
    host: '', // ip
    port: 22, // 端口
    username: '', // 登录服务器的账号
    password: '', // 登录服务器的账号
    path: '', // 发布至静态服务器的项目路径
  },
];

module.exports = SERVER_LIST[SERVER_ID];
