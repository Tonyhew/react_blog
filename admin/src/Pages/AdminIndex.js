import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import '../static/css/AdminIndex.css'
import Index from './Index'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import ArticleType from './ArticleType'
import NavManage from './NavManage'
import servicePath from '../config/apiUrl';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {

	console.log(props)
	const breadcrumbNameMap = {
		'/index': '首页',
		'/index/add': '添加文章',
		'/index/list': '文章列表',
		'/index/type': '标签管理',
		'/index/navManage': '栏目管理',
	}

	const { location } = props
	console.log(location)
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
		<Breadcrumb.Item key="home">
			{/* <Link to="/index">Home</Link> */}
		</Breadcrumb.Item>,
	].concat(extraBreadcrumbItems);
	const setCurrentTitle = (title) => {
		document.title = title
	}


	const [collapsed, setCollapsed] = useState(false)


	const onCollapse = collapsed => {
		setCollapsed(collapsed)
	};

	const handleClickArticle = e => {
		console.log(e)
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
		} else {
			props.history.push('/index/addSecond')
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
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
					<Menu.Item
						key="Index"
						onClick={handleClickIndex}
					>
						<Icon type="pie-chart" />
						<span>工作台</span>
					</Menu.Item>
					<Menu.Item
						key="navManage"
						onClick={handleClickNav}
					>
						<Icon type="unordered-list" />
						<span>添加栏目</span>
					</Menu.Item>
					<Menu.Item
						key="typeManage"
						onClick={handleClickType}
					>
						<Icon type="tags" />
						<span>标签管理</span>
					</Menu.Item>
					<SubMenu
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
					</SubMenu>
					<Menu.Item key="9">
						<Icon type="file" />
						<span>留言管理</span>
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						{breadcrumbItems}
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
						</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>Designed by tonyhew</Footer>
			</Layout>
		</Layout>
	);
}

export default AdminIndex;