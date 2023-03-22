import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

function useBreadcrumb() {

  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbNameMap = {
    '/index': '首页',
    '/index/siteInfo': '网站基本信息',
    '/index/siteInfo/updateSiteInfo': '更新网站基本信息',
    '/index/list': '文章列表',
    '/index/list/add': pathSnippets[3] === undefined ? '新增文章' : `编辑${pathSnippets[2]}文章`,
    '/index/type': '标签管理',
    '/index/navManage': '栏目管理',
    '/index/userManage': '用户管理',
  }

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home"></Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return breadcrumbItems
}

export default useBreadcrumb

