'use strict';

const Controller = require('egg').Controller;


class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND password = '" + password + "'";
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      // eslint-disable-next-line quote-props
      this.ctx.session.openId = { 'openId': openId };
      // eslint-disable-next-line quote-props
      this.ctx.body = { 'data': '登录成功', 'openId': openId };
    } else {
      // eslint-disable-next-line quote-props
      this.ctx.body = { 'data': '登录失败' };
    }
  }

  async getNavList() {
    const resType = await this.app.mysql.select('blog_arctype');
    this.ctx.body = {
      data: resType,
    };
  }

  async getFirstNav() {
    const result = await this.app.mysql.select('blog_arctype');
    this.ctx.body = {
      firstNav: result,
    };
  }

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

  async updateFirstNav() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_arctype', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async deleteFirstNav() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_arctype', { 'id': id });
    this.ctx.body = {
      data: res,
    };
  }

  async getSecondNavById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_secondnav.id as id, ' +
                'blog_secondnav.title as title, ' +
                'blog_secondnav.add_time as add_time ' +
                'FROM blog_secondnav LEFT JOIN blog_arctype ON blog_secondnav.arctype_parent_id = blog_arctype.id ' +
                'WHERE blog_secondnav.arctype_parent_id =' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      secondnav: result,
    };
  }

  async addSecondNav() {
    const tmpFirstNav = this.ctx.request.body;
    const result = await this.app.mysql.insert('blog_secondnav', tmpFirstNav);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async deleteSecondNav() {
    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_secondnav', { 'id': id });
    const insertSuccess = res.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess,
      data: res,
    };
  }

  async countSecondNav() {
    const id = this.ctx.params.id;
    const sql = 'SELECT COUNT(*) as c FROM blog_secondnav WHERE blog_secondnav.arctype_parent_id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      result,
    };
  }

  async editFirstNavStatus() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_arctype', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('blog_type');
    this.ctx.body = {
      type: resType,
    };
  }

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

  async updateArticle() {

    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };

  }

  async getArticleList() {
    const sql = 'SELECT blog_article.id as id, ' +
                'blog_article.title as title, ' +
                'blog_article.descript as descript, ' +
                'blog_article.view_count as view_count, ' +
                'blog_article.nav_id as nav_id, ' +
                "FROM_UNIXTIME(blog_article.addTime, '%y-%m-%d') as addTime, " +
                'blog_type.typeName as typeName, ' +
                'blog_arctype.typeName as arcTypeName, ' +
                'blog_secondnav.title as secondTitle ' +
                'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
                'LEFT JOIN blog_arctype ON blog_article.nav_id = blog_arctype.Id ' +
                'LEFT JOIN blog_secondnav ON blog_article.nav_id = blog_secondnav.Id ' +
                'ORDER BY blog_article.id DESC';

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: result,
    };
  }

  async deleteArticle() {

    const id = this.ctx.params.id;
    // eslint-disable-next-line quote-props
    const res = await this.app.mysql.delete('blog_article', { 'id': id });
    this.ctx.body = {
      data: res,
    };

  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_article.id as id, ' +
      'blog_article.title as title, ' +
      'blog_article.descript as descript, ' +
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

  async countArticleValue() {
    const sql = 'SELECT typeName, ' +
      '(SELECT COUNT(*) FROM blog_article AS a WHERE a.type_id = t.ID) AS Count ' +
      'FROM blog_type t';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      countArt: result,
    };
  }

}

module.exports = MainController;
