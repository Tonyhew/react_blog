let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', // 检查用户名密码
    getNavList: ipUrl + 'getNavList',
    getTypeInfo: ipUrl + 'getTypeInfo', // 获得文章类别信息
    getFirstNav: ipUrl + 'getFirstNav', // 获得文章一级栏目信息
    getSecondNav: ipUrl + 'getSecondNav/', // 获得文章二级栏目信息
    addFirstNav: ipUrl + 'addFirstNav',
    addArticle: ipUrl + 'addArticle', // 添加文章
    updateArticle: ipUrl + 'updateArticle', // 修改文章
    getArticleList: ipUrl + 'getArticleList', // 修改文章
    deleteArticle: ipUrl + 'deleteArticle/', // 修改文章
    getArticleById: ipUrl + 'getArticleById/', // 修改文章
    countArticleValue: ipUrl + 'countArticleValue/', // 修改文章
}

export default servicePath;















