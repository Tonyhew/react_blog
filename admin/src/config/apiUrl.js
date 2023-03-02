let ipUrl = 'http://127.0.0.1:7001/admin/'

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
    addUserCheck: ipUrl + 'addUserCheck', // 检测用户是否存在，不存在可以新增用户
    getUserInfo: ipUrl + 'getUserInfo', // 获取用户信息
    isDisableUser: ipUrl + 'isDisableUser', // 是否禁用用户
    addNewUser: ipUrl + 'addNewUser', // 添加用户
    deleteUser: ipUrl + 'deleteUser/', // 删除用户
    getNavList: ipUrl + 'getNavList', 
    getTypeInfo: ipUrl + 'getTypeInfo', // 获得文章类别信息
    getTypeInfoById: ipUrl + 'getTypeInfoById/', // 根据 ID 获取标签信息
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
    getArticleList: ipUrl + 'getArticleList', // 获取文章列表
    deleteArticle: ipUrl + 'deleteArticle/', // 删除文章
    isDisableTopArticle: ipUrl + 'isDisableTopArticle', // 是否置顶文章
    getArticleById: ipUrl + 'getArticleById/', // 根据ID获取文章
    countArticleValue: ipUrl + 'countArticleValue/', // 统计文章数
    uploadFiles: ipUrl + 'uploadFiles', // 上传文件
}

export default servicePath;















