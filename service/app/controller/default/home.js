'use strict';

const Controller = require('egg').Controller;

/**
* @controller 前台接口文档
*/
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api-hi';
  }

  /**
  * @summary 获取网站 keywords。
  * @description 获取网站 keywords。
  * @router get /default/getSiteInfo
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async getSiteInfo() {
    const results = await this.app.mysql.select('blog_siteInfo');
    this.ctx.body = {
      siteInfo: results,
    };
  }

  /**
  * @summary 根据ID获取列表标题。
  * @description 根据ID获取列表标题。
  * @router get /default/getListTitle/{$id}
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async getListTitle() {
    const id = this.ctx.params.id;
    const sql = `SELECT blog_arctype.typeName FROM blog_arctype WHERE blog_arctype.id = ${id}`;

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  /**
  * @summary 根据ID获取二级栏目标题。
  * @description 根据ID获取二级栏目标题。
  * @router get /default/getListSecondTitle/{$id}
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async getListSecondTitle() {
    const id = this.ctx.params.id;
    const sql = `SELECT blog_secondNav.title FROM blog_secondNav WHERE blog_secondNav.id = ${id}`;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  /**
  * @summary 获取文章列表
  * @description 获取文章列表
  * @router get /default/getArticleList
  * @response 200 JsonBody 返回结果。
  */

  async getArticleList() {
    const sql = `SELECT blog_article.id as id, 
                blog_article.title as title, 
                blog_article.descript as descript, 
                blog_article.is_show as isShow, 
                blog_article.article_img as articleImg, 
                FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime, 
                blog_article.view_count as view_count, 
                blog_article.is_top as isTop, 
                blog_type.typeName as typeName FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id 
                ORDER BY blog_article.is_top DESC, blog_article.addTime DESC
              `;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  /**
  * @summary 根据ID获取文章
  * @description 根据ID获取文章
  * @router get /default/getArticleById/{$id}
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async getArticleById() {
    const id = this.ctx.params.id;

    if (id) {
      const sql1 = ` UPDATE blog_article SET view_count = (view_Count + 1) WHERE id = ${id}`;

      const updateResult = await this.app.mysql.query(sql1);
      const updateSuccess = updateResult.affectedRows === 1;

      if (updateSuccess) {
        const sql2 = `SELECT blog_article.id as id, blog_article.title as title, blog_article.descript as descript, 
          blog_article.keywords as keywords, blog_article.article_img as articleImg, 
          blog_article.article_content as content, 
          FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime,
          blog_article.view_count as view_count,
          blog_article.nav_id as nav_id, 
          blog_type.typeName as typeName,
          blog_type.id as typeId FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id 
          WHERE blog_article.id = ${id}
        `;
        const result = await this.app.mysql.query(sql2);
        this.ctx.body = {
          data: result,
        };
      }
    } else {
      console.log('id错误1');
      this.ctx.body = { data: 'id错误' };
    }

  }


  /**
  * @summary 得到类别名称和编号
  * @description 得到类别名称和编号
  * @router get /default/getTypeInfo
  * @response 200 JsonBody 返回结果。
  */
  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('blog_type');
    this.ctx.body = { data: result };
  }

  /**
  * @summary 获取一级导航栏目
  * @description 获取一级导航栏目
  * @router get /default/getNavList
  * @response 200 JsonBody 返回结果。
  */

  async getNavList() {
    const result = await this.app.mysql.select('blog_arctype', {
      orders: [[ 'orderNum' ]], // 排序方式
    });
    this.ctx.body = { data: result };
  }

  /**
  * @summary 获取二级导航栏目
  * @description 获取二级导航栏目
  * @router get /default/getSecondNav
  * @response 200 JsonBody 返回结果。
  */

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

  /**
  * @summary 根据ID获取列表
  * @description 根据ID获取列表
  * @router get /default/getListById/{$id}
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT blog_article.id as id,' +
                'blog_article.title as title,' +
                'blog_article.is_show as isShow, ' +
                'blog_article.descript as descript,' +
                'blog_article.article_img as articleImg, ' +
                "FROM_UNIXTIME(blog_article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
                'blog_article.view_count as view_count,' +
                'blog_type.typeName as typeName ' +
                'FROM blog_article LEFT JOIN blog_type ON blog_article.type_id = blog_type.Id ' +
                'WHERE nav_id =' + id +
                ' ORDER BY blog_article.addTime DESC';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  /**
  * @summary 根据ID统计文章数量
  * @description 根据ID统计文章数量
  * @router get /default/countArticleListById/{$id}
  * @request query integer Id 需要去查新的ID。
  * @response 200 JsonBody 返回结果。
  */

  async countArticleListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT count(*) as total FROM blog_article WHERE nav_id = ' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

}

module.exports = HomeController;
