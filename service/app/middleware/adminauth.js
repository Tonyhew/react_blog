'use strict';

module.exports = () => {
  return async function adminauth(ctx, next) {
    if (ctx.session.openId || ctx.headers.token) {
      await next();
    } else {
      ctx.body = {
        data: '没有登录',
      };
      ctx.throw(403, '登录失效');
    }
  };

};
