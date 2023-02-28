'use strict';

const Controller = require('egg').Controller;

/**
* @controller 后台接口文档(要执行后面的操作必须先要有openid)
*/
class MainController extends Controller {

  async index() {
    this.ctx.body = 'hi api';
  }

  /**
  * @summary 公司公众号落地页新增顾客信息
  * @description 公司公众号落地页新增顾客信息
  * @router post /admin/addCustomers/{$customer_name}{$customer_mobile}{$customer_address}
  * @request query string customer_name
  * @request query string customer_mobile
  * @request query string customer_address
  * @response 200 JsonBody 成功：数据库新增一条数据; 失败：无返回;。
  */

  async addCustomers() {
    const tmpCustomers = this.ctx.request.body;
    console.log(tmpCustomers);
    const result = await this.app.mysql.insert('blog_customers', tmpCustomers);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  /**
  * @summary 公司公众号落地页获取顾客信息
  * @description 公司公众号落地页获取顾客信息
  * @router post /admin/addCustomers/
  * @response 200 JsonBody 成功：获取该数据表中的所有数据; 失败：无返回;。
  */

  async getCustomers() {
    const resultList = await this.app.mysql.select('blog_customers');
    this.ctx.body = {
      result: resultList,
    };
  }

  /**
  * @summary 后台登录验证(验证账号密码是否正确)
  * @description 后台登录验证(验证账号密码是否正确)
  * @router post /admin/checkUser/{$userName}{$password}
  * @request query string userName
  * @request query string password
  * @response 200 JsonBody 成功：进入checkLogin方法操作; 失败：返回账号或密码失败;。
  */

  async checkUser() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;

    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    const result = await this.app.mysql.query(sql);

    if (result.length > 0) {
      this.ctx.body = {
        userName: result[0].userName,
        isSuccess: true,
      };
    } else {
      this.ctx.body = {
        data: '账号或密码填写错误',
      };
    }
  }

  /**
  * @summary 添加新用户检测是否有同名账号(验证账号是否存在)
  * @description 检测用户是否存在，不存在可以新增用户
  * @router post /admin/addUserCheck/{$userName}
  * @request query string userName
  * @response 200 JsonBody 成功：进入addNewUser方法操作; 失败：返回账号已存在;。
  */

  async addUserCheck() {
    const userName = this.ctx.request.body.userName;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "'";
    const result = await this.app.mysql.query(sql);

    if (result.length > 0) {
      this.ctx.body = {
        userName: result[0].userName,
        message: '已有此用户',
      };
    } else {
      this.ctx.body = {
        isAddNewUser: true,
      };
    }
  }

  /**
  * @summary 后台登录验证(验证用户权限、状态等)
  * @description 后台登录验证(验证用户权限、状态等)，点击登录按钮如果有此用户跳转至后台首页，
  * @router post /admin/checkLogin/{$userName}{$password}
  * @request query string userName
  * @request query string password
  * @response 200 JsonBody 成功：返回openId及登录成功信息; 失败：返回登录失败;。
  */

  async checkLogin() {
    const ctx = this.ctx;
    const { userName, password } = ctx.request.body;
    const sql = "SELECT * FROM admin_role WHERE id = (SELECT role_id FROM admin_user WHERE userName = '" +
      userName +
      "' AND password = '" +
      password +
      "' AND user_status = -1) AND role_status = -1";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      // eslint-disable-next-line quote-props
      ctx.session.openId = { 'openId': openId };
      // eslint-disable-next-line quote-props
      ctx.body = { 'data': '登录成功', 'openId': openId, loginStatus: res };
    } else {
      // eslint-disable-next-line quote-props
      ctx.body = { 'data': '登录失败' };
    }
  }

  /**
  * @summary 获取用户信息
  * @description 获取用户信息
  * @router get /admin/getUserInfo
  * @response 200 JsonBody 返回结果。
  */

  async getUserInfo() {
    const sql = 'SELECT admin_user.id AS id, ' +
      'admin_user.userName AS userName, ' +
      'admin_user.role_id AS role_id, ' +
      'admin_role.role_name AS roleName, ' +
      'admin_user.user_status AS user_status ' +
      'FROM admin_user LEFT JOIN admin_role ON admin_user.role_id = admin_role.id';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      userInfo: result,
    };
  }

  /**
  * @summary 是否禁用用户
  * @description 是否禁用用户
  * @router post /admin/isDisableUser
  * @response 200 JsonBody 返回结果: isSuccess。
  */

  async isDisableUser() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('admin_user', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  /**
  * @summary 添加新用户
  * @description 添加新用户
  * @router post /admin/addNewUser
  * @response 200 JsonBody 返回结果：isSuccess，insertId。
  */

  async addNewUser() {
    const tmpFirstNav = this.ctx.request.body;
    const result = await this.app.mysql.insert('admin_user', tmpFirstNav);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  /**
  * @summary 删除新用户
  * @description 删除新用户
  * @router get /admin/deleteUser/{$id}
  * @request query int id
  * @response 200 JsonBody 返回结果。
  */

  async deleteUser() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('admin_user', { 'id': id });
    this.ctx.body = {
      data: res,
    };
  }

  /**
  * @summary 获取一级导航列表
  * @description 获取一级导航列表
  * @router get /admin/getNavList
  * @response 200 JsonBody 返回结果。
  */

  async getNavList() {
    const resType = await this.app.mysql.select('blog_arctype');
    this.ctx.body = {
      data: resType,
    };
  }

  /**
  * @summary 获取一级导航列表
  * @description 获取一级导航列表
  * @router get /admin/getFirstNav
  * @response 200 JsonBody 返回结果。
  */

  async getFirstNav() {
    const result = await this.app.mysql.select('blog_arctype');
    this.ctx.body = {
      firstNav: result,
    };
  }

  /**
  * @summary 根据一级导航ID获取二级导航列表
  * @description 根据一级导航ID获取二级导航列表
  * @router get /admin/getSecondNav/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async getSecondNav() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_secondNav.Id as id, ' +
      'blog_secondNav.title as title ' +
      'FROM blog_secondNav ' +
      'WHERE blog_secondNav.arctype_parent_id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      secondNav: result,
    };
  }

  /**
  * @summary 添加一级导航栏目
  * @description 添加一级导航栏目
  * @router post /admin/addFirstNav
  * @response 200 JsonBody 返回结果。
  */

  async addFirstNav() {
    const tmpFirstNav = this.ctx.request.body;
    const result = await this.app.mysql.insert('blog_arctype', tmpFirstNav);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  /**
  * @summary 根据ID获取一级导航信息
  * @description 根据ID获取一级导航信息
  * @router get /admin/getFirstNavInfo/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async getFirstNavInfo() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_arctype.Id as id, ' +
      'blog_arctype.typeName as typeName, ' +
      'blog_arctype.icon as icon ' +
      'FROM blog_arctype WHERE blog_arctype.id = ' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      fnavinfo: result,
    };
  }

  /**
  * @summary 更新(修改)一级导航栏目
  * @description 更新(修改)一级导航栏目
  * @router post /admin/updateFirstNav
  * @response 200 JsonBody 返回结果。
  */

  async updateFirstNav() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_arctype', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  /**
  * @summary 删除一级导航栏目
  * @description 删除一级导航栏目
  * @router get /admin/deleteFirstNav/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async deleteFirstNav() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_arctype', { 'id': id });
    this.ctx.body = {
      data: res,
    };
  }

  /**
  * @summary 根据一级导航ID获取二级导航列表
  * @description 根据一级导航ID获取二级导航列表
  * @router get /admin/getSecondNavById/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async getSecondNavById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_secondNav.id as id, ' +
      'blog_secondNav.title as title, ' +
      'blog_secondNav.add_time as add_time ' +
      'FROM blog_secondNav LEFT JOIN blog_arctype ON blog_secondNav.arctype_parent_id = blog_arctype.id ' +
      'WHERE blog_secondNav.arctype_parent_id =' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      secondnav: result,
    };
  }

  /**
  * @summary 添加二级导航列表
  * @description 添加二级导航列表
  * @router post /admin/addSecondNav
  * @response 200 JsonBody 返回结果。
  */

  async addSecondNav() {
    const tmpFirstNav = this.ctx.request.body;
    const result = await this.app.mysql.insert('blog_secondNav', tmpFirstNav);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  /**
  * @summary 删除二级栏目
  * @description 删除二级栏目
  * @router get /admin/deleteSecondNav/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async deleteSecondNav() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_secondNav', { 'id': id });
    const insertSuccess = res.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess,
      data: res,
    };
  }

  /**
  * @summary 统计二级栏目
  * @description 统计二级栏目
  * @router get /admin/countSecondNav/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async countSecondNav() {
    const id = this.ctx.params.id;
    const sql = 'SELECT COUNT(*) as c FROM blog_secondNav WHERE blog_secondNav.arctype_parent_id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      result,
    };
  }

  /**
  * @summary 编辑一级栏目导航状态
  * @description 编辑一级栏目导航状态
  * @router post /admin/editFirstNavStatus
  * @response 200 JsonBody 返回结果。
  */

  async editFirstNavStatus() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_arctype', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  /**
  * @summary 获取文章类别信息
  * @description 获取文章类别信息
  * @router get /admin/getTypeInfo
  * @response 200 JsonBody 返回结果。
  */

  async getTypeInfo() {
    const resType = await this.app.mysql.select('blog_type');
    this.ctx.body = {
      type: resType,
    };
  }

  /**
  * @summary 添加文章类别信息
  * @description 添加文章类别信息
  * @router post /admin/addNewTag
  * @response 200 JsonBody 返回结果。
  */

  async addNewTag() {
    const tmpTagType = this.ctx.request.body;
    const result = await this.app.mysql.insert('blog_type', tmpTagType);
    const insertId = result.insertId;
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  /**
  * @summary 更新(修改)文章类别信息
  * @description 更新(修改)文章类别信息
  * @router post /admin/updateTag
  * @response 200 JsonBody 返回结果。
  */

  async updateTag() {

    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_type', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };

  }

  /**
  * @summary 删除文章类别信息
  * @description 删除文章类别信息
  * @router get /admin/deleteTag/{$id}
  * @request query int ID
  * @response 200 JsonBody 返回结果。
  */

  async deleteTag() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_type', { 'id': id });
    this.ctx.body = {
      data: res,
    };
  }

  /**
  * @summary 添加文章
  * @description 添加文章
  * @router post /admin/addArticle
  * @response 200 JsonBody 返回结果。
  */

  async addArticle() {

    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('blog_article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };


  }

  /**
  * @summary 修改文章
  * @description 修改文章
  * @router post /admin/updateArticle
  * @response 200 JsonBody 返回结果。
  */

  async updateArticle() {

    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };

  }

  /**
  * @summary 获取文章列表
  * @description 获取文章列表
  * @router get /admin/getArticleList
  * @response 200 JsonBody 返回结果。
  */

  async getArticleList() {
    const sql = 'SELECT blog_article.id as id, ' +
      'blog_article.title as title, ' +
      'blog_article.descript as descript, ' +
      'blog_article.keywords as keywords, ' +
      'blog_article.article_img as articleImg, ' +
      'blog_article.view_count as view_count, ' +
      'blog_article.nav_id as nav_id, ' +
      'blog_article.is_top as isTop, ' +
      "FROM_UNIXTIME(blog_article.addTime, '%y-%m-%d') as addTime, " +
      'blog_type.typeName as typeName, ' +
      'blog_arctype.typeName as arcTypeName, ' +
      'blog_secondNav.title as secondTitle ' +
      'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
      'LEFT JOIN blog_arctype ON blog_article.nav_id = blog_arctype.Id ' +
      'LEFT JOIN blog_secondNav ON blog_article.nav_id = blog_secondNav.Id ' +
      'ORDER BY blog_article.id DESC';

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: result,
    };
  }

  /**
  * @summary 删除文章
  * @description 删除文章
  * @router get /admin/deleteArticle/{$id}
  * @request quert int ID
  * @response 200 JsonBody 返回结果。
  */

  async deleteArticle() {

    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_article', { 'id': id });
    this.ctx.body = {
      data: res,
    };

  }

  /**
  * @summary 是否置顶文章
  * @description 是否置顶文章
  * @router post /admin/isDisableTopArticle
  * @response 200 JsonBody 返回结果。
  */

  async isDisableTopArticle() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  /**
  * @summary 根据ID获取文章
  * @description 根据ID获取文章
  * @router get /admin/getArticleById/{$id}
  * @request quert int ID
  * @response 200 JsonBody 返回结果。
  */

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_article.id as id, ' +
      'blog_article.title as title, ' +
      'blog_article.descript as descript, ' +
      'blog_article.keywords as keywords, ' +
      'blog_article.article_img as articleImg, ' +
      'blog_article.article_content as article_content, ' +
      'blog_article.view_count as view_count, ' +
      "FROM_UNIXTIME(blog_article.addTime, '%y-%m-%d') as addTime, " +
      'blog_article.nav_id as nav_id, ' +
      'blog_type.typeName as typeName ,' +
      'blog_type.id as typeId ' +
      'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
      'WHERE blog_article.id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  /**
  * @summary 统计文章数量
  * @description 统计文章数量
  * @router get /admin/countArticleValue
  * @response 200 JsonBody 返回结果。
  */

  async countArticleValue() {
    const sql = 'SELECT typeName, ' +
      '(SELECT COUNT(*) FROM blog_article AS a WHERE a.type_id = t.ID) AS Count ' +
      'FROM blog_type t';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      countArt: result,
    };
  }

  /**
  * @summary 上传文件
  * @description 上传文件
  * @router post /admin/uploadFiles
  * @response 200 JsonBody 返回结果。
  */

  async uploadFiles() {
    const data = await this.ctx.service.utils.uploadFiles();
    if (data) {
      this.ctx.body = data;
    } else {
      this.ctx.body = {
        message: '上传失败',
      };
    }
  }

}

module.exports = MainController;
