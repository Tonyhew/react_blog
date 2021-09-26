import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function useBreadcrumb(props) {
  const breadcrumbNameMap = {
    '/index': '首页',
    '/index/add': '添加文章',
    '/index/list': '文章列表',
    '/index/type': '标签管理',
    '/index/navManage': '栏目管理',
    '/index/userManage': '用户管理',
  }

  const { location } = props
  const pathSnippets = location.pathname.split('/').filter(i => i);

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

