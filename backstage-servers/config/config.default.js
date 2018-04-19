'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524052732329_3534';

  // add your config here
  config.middleware = [];

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  exports.cors = {
    origin: '*',
    allowMethod: 'GET, POST',
  };

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3307',
      // 用户名
      user: 'root',
      // 密码
      password: '111111',
      // 数据库名
      database: 'studentClub',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return config;
};
