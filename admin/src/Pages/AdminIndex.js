import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from 'react-router-dom';
import '../static/css/AdminIndex.css';
import Index from './Index';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import ArticleType from './ArticleType';
import NavManage from './NavManage';
import UserManage from './UserManage';
import useBreadcrumb from '../hooks/useBreadcrumb';
// import servicePath from '../config/apiUrl';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

	const [collapsed, setCollapsed] = useState(false);
	const [roleId] = useState(localStorage.roleId)

	useEffect(() => {
		navRoleId()
	})

	/**
	 * 
	 * 如果localStorage里的roleId为最高管理权限，则渲染函数中的导航
	 * @returns 返回一个jsx元素 or Boolean
	 */
	const navRoleId = () => {
		if (roleId === '10') {
			return (
				<Menu theme="dark">
					<Menu.Item key="navManage" onClick={handleClickNav} ><Icon type="unordered-list" /><span>添加栏目</span></Menu.Item>
					<Menu.Item key="userManage" onClick={handleClickUser} ><Icon type="user" /><span>用户管理</span></Menu.Item>
					<Menu.Item
						key="typeManage"
						onClick={handleClickType}
					>
						<Icon type="tags" />
						<span>标签管理</span>
					</Menu.Item>

				</Menu>
			)
		} else {
			return false
		}
	}


	const setCurrentTitle = (title) => {
		document.title = title
	}

	const onCollapse = collapsed => {
		setCollapsed(collapsed)
	};

	const handleClickArticle = e => {
		console.log(e, '111')
		if (e.key === 'addArticle') {
			props.history.push('/index/add')
		} else {
			props.history.push('/index/list')
		}
	}

	const handleClickIndex = e => {
		if (e.key === 'Index') {
			props.history.push('/index/')
		}
	}

	const handleClickNav = e => {
		if (e.key === 'navManage') {
			props.history.push('/index/navManage')
		}
	}

	const handleClickUser = e => {
		if (e.key === 'userManage') {
			props.history.push('/index/userManage')
		}
	}

	const handleClickType = e => {
		if (e.key === 'typeManage') {
			props.history.push('/index/type')
		}
	}

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo">后台管理系统</div>
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item
						key="Index"
						onClick={handleClickIndex}
					>
						<Icon type="pie-chart" />
						<span>工作台</span>
					</Menu.Item>
					{
						navRoleId()
					}

					{
						roleId === '10' ? <SubMenu
							key="sub1"
							onClick={handleClickArticle}
							title={
								<span>
									<Icon type="desktop" />
									<span>文章管理</span>
								</span>
							}
						>
							<Menu.Item key="addArticle">添加文章</Menu.Item>
							<Menu.Item key="articleList">文章列表</Menu.Item>
						</SubMenu> : null
					}

					<Menu.Item key="9">
						<Icon type="file" />
						<span>留言管理</span>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						{useBreadcrumb(props)}
					</Breadcrumb>
					<div style={{ minHeight: 360 }}>
						<div>
							<Route path="/index/" exact component={Index} onEnter={setCurrentTitle('首页')} />
							<Route path="/index/add/" exact component={AddArticle} onEnter={setCurrentTitle('添加文章')} />
							<Route path="/index/list/" component={ArticleList} onEnter={setCurrentTitle('文章列表')} />
							<Route path="/index/add/:id" exact component={AddArticle} />
							<Route path="/index/type/" exact component={ArticleType} onEnter={setCurrentTitle('标签管理')} />
							<Route path="/index/navManage/" exact component={NavManage} onEnter={setCurrentTitle('栏目管理')} />
							<Route path="/index/navManage/:id" exact component={NavManage} onEnter={setCurrentTitle('二级栏目管理')} />
							<Route path="/index/userManage/" exact component={UserManage} onEnter={setCurrentTitle('用户管理')} />
						</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Designed by tonyhew</Footer>
			</Layout>
		</Layout>
	);
}

export default AdminIndex;