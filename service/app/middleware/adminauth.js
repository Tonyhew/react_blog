'use strict';

// eslint-disable-next-line no-unused-vars
module.exports = options => {
  return async function adminauth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        data: '没有登录',
      };
    }
  };

};
