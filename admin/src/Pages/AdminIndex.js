import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, message } from 'antd'
import {
  FileOutlined,
  DesktopOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  TagsOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import useBreadcrumb from '../hooks/useBreadcrumb'
import { getItem } from '../hooks/useMenuItem'
import '../static/css/AdminIndex.css'

const { Content, Footer, Sider } = Layout

const AdminIndex = () => {
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  const [roleId] = useState(localStorage.getItem('roleId'))
  const [openId] = useState(localStorage.getItem('openId'))

  useEffect(() => {
    if (!openId && !roleId) {
      message.warning('登录失效，将返回登录页面')
      navigate('/login')
    }
  }, [navigate, openId, roleId])

  const MenuRender = [
    getItem('工作台', 'Index', <PieChartOutlined />),
    getItem('网站信息', 'siteInfo', <SettingOutlined />),
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
      navigate('/index/list/add')
    } else {
      navigate('/index/list')
    }
    switch (e.key) {
      case 'Index':
        return navigate('/index/')
      case 'siteInfo':
        return navigate('/index/siteInfo')
      case 'navManage':
        return navigate('/index/navManage')
      case 'userManage':
        return navigate('/index/userManage')
      case 'typeManage':
        return navigate('/index/type')
      case '9':
        return navigate('/index/')
      default:
    }
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
          <Breadcrumb style={{ margin: '16px 0' }}>{useBreadcrumb()}</Breadcrumb>
          <div style={{ minHeight: 360 }}>
            <div>
              <Outlet />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Designed by tonyhew</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
