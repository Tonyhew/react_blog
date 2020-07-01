/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1581092626397_782';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'xx.xx.xx.xx',
      // port
      port: '3306',
      // username
      user: 'xxxxx',
      // password
      password: 'xxxxxxxxx',
      // database
      database: 'xxxxx',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    // origin: '*',
    credentials: true, // 允许cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.session = {
    key: 'openId',
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true, // 延长会话有效期
  };

  return {
    ...config,
    ...userConfig,
  };
};
