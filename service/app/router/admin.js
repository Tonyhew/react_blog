'use strict';

/*
* author: Tonyhew
* date：2020-06-03
* des：后台路由
* params: {
*   adminauth: 登录权限
* }
*/

module.exports = app => {
  const { router, controller } = app;
  /**
   *
   * 登录权限
   */
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin); // 检查登录态
  router.post('/admin/addUserCheck', adminauth, controller.admin.main.addUserCheck); // 检测用户是否存在
  router.post('/admin/checkUser', controller.admin.main.checkUser); // 检测用户名密码
  router.get('/admin/getUserInfo', adminauth, controller.admin.main.getUserInfo); // 获取用户列表
  router.post('/admin/isDisableUser', adminauth, controller.admin.main.isDisableUser); // 禁用用户
  router.post('/admin/addNewUser', adminauth, controller.admin.main.addNewUser); // 新增用户
  router.get('/admin/deleteUser/:id', adminauth, controller.admin.main.deleteUser); // 删除用户
  router.get('/admin/getNavList', adminauth, controller.admin.main.getNavList); // 获取一级导航列表
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo); // 获取标签信息
  router.post('/admin/addNewTag', adminauth, controller.admin.main.addNewTag); // 添加新标签
  router.post('/admin/updateTag', adminauth, controller.admin.main.updateTag); // 修改标签
  router.get('/admin/deleteTag/:id', adminauth, controller.admin.main.deleteTag); // 删除标签
  router.get('/admin/getFirstNav', adminauth, controller.admin.main.getFirstNav); // 获取一级栏目
  router.get('/admin/getSecondNav/:id', adminauth, controller.admin.main.getSecondNav); // 根据id获取对应的二级栏目
  router.post('/admin/addFirstNav', adminauth, controller.admin.main.addFirstNav); // 添加新一级栏目
  router.get('/admin/getFirstNavInfo/:id', adminauth, controller.admin.main.getFirstNavInfo);
  router.post('/admin/updateFirstNav', adminauth, controller.admin.main.updateFirstNav); // 修改一级栏目
  router.get('/admin/deleteFirstNav/:id', adminauth, controller.admin.main.deleteFirstNav); // 删除一级栏目
  router.get('/admin/getSecondNavById/:id', adminauth, controller.admin.main.getSecondNavById);
  router.post('/admin/addSecondNav', adminauth, controller.admin.main.addSecondNav); // 添加新二级栏目
  router.post('/admin/editFirstNavStatus', adminauth, controller.admin.main.editFirstNavStatus); // 修改一级栏目状态
  router.get('/admin/deleteSecondNav/:id', adminauth, controller.admin.main.deleteSecondNav); // 删除二级栏目
  router.get('/admin/countSecondNav/:id', adminauth, controller.admin.main.countSecondNav);
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle); // 添加文章
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle); // 修改文章
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList); // 获取文章列表
  router.get('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle); // 删除文章
  router.post('/admin/isDisableTopArticle', adminauth, controller.admin.main.isDisableTopArticle); // 是否置顶文章
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById); // 根据id获取文章
  router.get('/admin/countArticleValue/', adminauth, controller.admin.main.countArticleValue); // 计算文章数量
  router.post('/admin/uploadFiles/', adminauth, controller.admin.main.uploadFiles); // 上传图片
};
