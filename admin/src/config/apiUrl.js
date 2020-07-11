let ipUrl = 'https://api.tonyhew.com/admin/'

/** 
 * 
 * @author: Tonyhew
 * @param: {
 *  get: 获取,
 *  add: 新增,
 *  update: 修改,
 *  delete: 删除,
 * }
 * 
 * */ 

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', // 检查登录态
    checkUser: ipUrl + 'checkUser', // 检查是否有该用户
    getUserInfo: ipUrl + 'getUserInfo', // 获取用户信息
    isDisableUser: ipUrl + 'isDisableUser', // 是否禁用用户
    addNewUser: ipUrl + 'addNewUser', // 添加用户
    deleteUser: ipUrl + 'deleteUser/', // 删除用户
    getNavList: ipUrl + 'getNavList', 
    getTypeInfo: ipUrl + 'getTypeInfo', // 获得文章类别信息
    addNewTag: ipUrl + 'addNewTag',
    updateTag: ipUrl + 'updateTag',
    deleteTag: ipUrl + 'deleteTag/',
    getFirstNav: ipUrl + 'getFirstNav', // 获得文章一级栏目信息
    getSecondNav: ipUrl + 'getSecondNav/', // 获得文章二级栏目信息
    addFirstNav: ipUrl + 'addFirstNav',
    getFirstNavInfo: ipUrl + 'getFirstNavInfo/',
    updateFirstNav: ipUrl + 'updateFirstNav',
    deleteFirstNav: ipUrl + 'deleteFirstNav/',
    getSecondNavById: ipUrl + 'getSecondNavById/',
    addSecondNav: ipUrl + 'addSecondNav/',
    editFirstNavStatus: ipUrl + 'editFirstNavStatus',
    deleteSecondNav: ipUrl + 'deleteSecondNav/',
    countSecondNav: ipUrl + 'countSecondNav/',
    addArticle: ipUrl + 'addArticle', // 添加文章
    updateArticle: ipUrl + 'updateArticle', // 修改文章
    getArticleList: ipUrl + 'getArticleList', // 修改文章
    deleteArticle: ipUrl + 'deleteArticle/', // 修改文章
    getArticleById: ipUrl + 'getArticleById/', // 修改文章
    countArticleValue: ipUrl + 'countArticleValue/', // 修改文章
}

export default servicePath;















