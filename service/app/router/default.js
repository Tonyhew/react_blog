'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getSiteInfo', controller.default.home.getSiteInfo); // 获取网站基本信息（标题、描述、关键词等）
  router.get('/default/getListTitle/:id', controller.default.home.getListTitle); // 获取列表标题
  router.get('/default/getListSecondTitle/:id', controller.default.home.getListSecondTitle); // 获取二级栏目标题
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getNavList', controller.default.home.getNavList);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);
  router.get('/default/getSecondNav', controller.default.home.getSecondNav);
  router.get('/default/getCountArticleList/:id', controller.default.home.countArticleListById);
};
