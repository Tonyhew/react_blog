import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  FileOutlined,
  DesktopOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  TagsOutlined,
} from '@ant-design/icons'
import { Route } from 'react-router-dom'
import Index from './Index'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import ArticleType from './ArticleType'
import NavManage from './NavManage'
import UserManage from './UserManage'
import useBreadcrumb from '../hooks/useBreadcrumb'
import { getItem } from '../hooks/useMenuItem'
import '../static/css/AdminIndex.css'

const { Content, Footer, Sider } = Layout

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false)
  const [roleId] = useState(localStorage.roleId)

  const MenuRender = [
    getItem('工作台', 'Index', <PieChartOutlined />),
    roleId === '10' ? getItem('添加栏目', 'navManage', <UnorderedListOutlined />) : null,
    roleId === '10' ? getItem('用户管理', 'userManage', <UserAddOutlined />) : null,
    roleId === '10' ? getItem('标签管理', 'typeManage', <TagsOutlined />) : null,
    roleId === '10'
      ? getItem('文章管理', 'sub1', <DesktopOutlined />, [
          getItem('添加文章', 'addArticle'),
          getItem('文章列表', 'articleList'),
        ])
      : null,
    getItem('留言管理', '9', <FileOutlined />),
  ]

  const menuItemFunc = (e) => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
    switch (e.key) {
      case 'Index':
        return props.history.push('/index/')
      case 'navManage':
        return props.history.push('/index/navManage')
      case 'userManage':
        return props.history.push('/index/userManage')
      case 'typeManage':
        return props.history.push('/index/type')
      case '9':
        return props.history.push('/index/')
      default:
    }
  }

  const setCurrentTitle = (title) => {
    document.title = title
  }

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className='logo'>后台管理系统</div>
        <Menu
          theme='dark'
          items={MenuRender}
          onClick={(e) => menuItemFunc(e)}
          mode='inline'
        />
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>{useBreadcrumb(props)}</Breadcrumb>
          <div style={{ minHeight: 360 }}>
            <div>
              <Route
                path='/index/'
                exact
                component={Index}
                onEnter={setCurrentTitle('首页')}
              />
              <Route
                path='/index/add/'
                exact
                component={AddArticle}
                onEnter={setCurrentTitle('添加文章')}
              />
              <Route
                path='/index/list/'
                component={ArticleList}
                onEnter={setCurrentTitle('文章列表')}
              />
              <Route
                path='/index/add/:id'
                exact
                component={AddArticle}
              />
              <Route
                path='/index/type/'
                exact
                component={ArticleType}
                onEnter={setCurrentTitle('标签管理')}
              />
              <Route
                path='/index/navManage/'
                exact
                component={NavManage}
                onEnter={setCurrentTitle('栏目管理')}
              />
              <Route
                path='/index/navManage/:id'
                exact
                component={NavManage}
                onEnter={setCurrentTitle('二级栏目管理')}
              />
              <Route
                path='/index/userManage/'
                exact
                component={UserManage}
                onEnter={setCurrentTitle('用户管理')}
              />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Designed by tonyhew</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
