'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getNavList', adminauth, controller.admin.main.getNavList);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.get('/admin/getFirstNav', adminauth, controller.admin.main.getFirstNav);
  router.get('/admin/getSecondNav/:id', adminauth, controller.admin.main.getSecondNav);
  router.post('/admin/addFirstNav', adminauth, controller.admin.main.addFirstNav);
  router.get('/admin/getFirstNavInfo/:id', adminauth, controller.admin.main.getFirstNavInfo);
  router.post('/admin/updateFirstNav', adminauth, controller.admin.main.updateFirstNav);
  router.get('/admin/deleteFirstNav/:id', adminauth, controller.admin.main.deleteFirstNav);
  router.get('/admin/getSecondNavById/:id', adminauth, controller.admin.main.getSecondNavById);
  router.post('/admin/addSecondNav', adminauth, controller.admin.main.addSecondNav);
  router.post('/admin/editFirstNavStatus', adminauth, controller.admin.main.editFirstNavStatus);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.get('/admin/countArticleValue/', adminauth, controller.admin.main.countArticleValue);
};
