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
    const resType = await this.app.mysql.select('blog_arctype')
    this.ctx.body = {
      data: resType,
    };
  }

  async getTypeInfo() {

    const resType = await this.app.mysql.select('blog_type');
    this.ctx.body = {
      type: resType,
    };

  }

  async addArticle() {

    const tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('blog_article', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };


  }

  async updateArticle() {

    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('blog_article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };

  }

  async getArticleList() {
    let sql = 'SELECT blog_article.id as id, ' +
      'blog_article.title as title, ' +
      'blog_article.descript as descript, ' +
      'blog_article.view_count as view_count, ' +
      "FROM_UNIXTIME(blog_article.addTime, '%y-%m-%d') as addTime, " +
      'blog_type.typeName as typeName ' +
      'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
      'ORDER BY blog_article.id DESC';

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      list: result,
    };
  }

  async deleteArticle() {

    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('blog_article', { 'id': id });
    this.ctx.body = {
      data: res,
    };

  }

  async getArticleById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT blog_article.id as id, ' +
      'blog_article.title as title, ' +
      'blog_article.descript as descript, ' +
      'blog_article.article_content as article_content, ' +
      'blog_article.view_count as view_count, ' +
      "FROM_UNIXTIME(blog_article.addTime, '%y-%m-%d') as addTime, " +
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
    const result = await this.app.mysql.query(sql)
    this.ctx.body = {
      countArt: result,
    };
  }

}

module.exports = MainController;
