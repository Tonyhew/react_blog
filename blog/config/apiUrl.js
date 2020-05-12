let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList', // 获取文章列表接口
    getArticleById: ipUrl + 'getArticleById/', // 文章详细页内容接口，需要接受参数
    getTypeInfo: ipUrl + 'getTypeInfo', // 文章类别
    getNavList: ipUrl + 'getNavList',//菜单
    getListById: ipUrl + 'getListById/',
}

export default servicePath;















