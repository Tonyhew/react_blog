'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api-hi';
  }

  async getArticleList() {
    const sql = 'SELECT blog_article.id as id,' +
                'blog_article.title as title,' +
                'blog_article.descript as descript,' +
                "FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
                'blog_article.view_count as view_count,' +
                'blog_type.typeName as typeName ' +
                'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_article.id as id,' +
                'blog_article.title as title,' +
                'blog_article.descript as descript,' +
                'blog_article.article_content as content,' +
                "FROM_UNIXTIME(blog_article.addTime, '%Y-%M-%D %H:%i:%s') as addTime," +
                'blog_article.view_count as view_count,' +
                'blog_type.typeName as typeName,' +
                'blog_type.id as typeId ' +
                'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
                'WHERE blog_article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('blog_type');
    this.ctx.body = { data: result };
  }

  async getNavList() {
    const result = await this.app.mysql.select('blog_arctype');
    this.ctx.body = { data: result };
  }

  async getSecondNav() {
    // const id = this.ctx.params.id;
    // const sql = 'SELECT blog_secondnav.id as id, ' +
    //             'blog_secondnav.title as title, ' +
    //             'blog_secondnav.arctype_parent_id as p_id ' +
    //             'FROM blog_secondNav where blog_secondNav.arctype_parent_id =' + id;
    // const result = await this.app.mysql.query(sql);
    const result = await this.app.mysql.select('blog_secondNav');
    this.ctx.body = { second: result };
  }

  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_article.id as id,' +
                'blog_article.title as title,' +
                'blog_article.descript as descript,' +
                "FROM_UNIXTIME(blog_article.addTime, '%Y-%M-%D %H:%i:%s') as addTime," +
                'blog_article.view_count as view_count,' +
                'blog_type.typeName as typeName ' +
                'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
                'WHERE nav_id =' + id;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

}

module.exports = HomeController;
