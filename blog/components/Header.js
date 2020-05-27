import React, { useState, useEffect } from 'react';
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon, Dropdown } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { SubMenu } = Menu
const Header = () => {

	const [listData, setListData] = useState([]);
	const [second, setSecond] = useState([]);
	const [isClose, setIsClose] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			await axios(servicePath.getNavList).then((res) => {
				setListData(res.data.data)
			}).then(() => {
				axios(servicePath.getSecondNav).then(r => {
					setSecond(r.data.second)
				})
			})
		}
		fetchData()
	}, [])

	const handleClick = (e) => {
		if (e.key == 0) {
			Router.push('/index')
		} else {
			Router.push('/list?id=' + e.key)
		}
	}

	const menuMobile = (e) => {
		e.preventDefault();
		setIsClose(true)
	}

	const menuPc = (e) => {
		e.preventDefault();
		setIsClose(false)
	}

	const menu = (
		<Menu onClick={handleClick} className="mobile_menu">
			<Menu.Item key="0">
				<Icon type="home" />
         首页
      </Menu.Item>
			{
				listData.map((listItem) => {
					if (listItem.status === -1) {
						return (
							<Menu.Item key={listItem.Id}>
								<Icon type={listItem.icon} />
								{listItem.typeName}
							</Menu.Item>
						)
					} else {
						return (
							<SubMenu title={listItem.typeName} key={listItem} className="sonList">
								{
									second.map(item => {
										if (listItem.Id === item.arctype_parent_id) {
											return (
												<Menu.Item key={item.Id}>{item.title}</Menu.Item>
											)
										}
									})
								}
							</SubMenu>
						)
					}
				})
			}
		</Menu>
	);

	const menuIsClose = () => {
		if (!isClose) {
			return (
				<div onClick={menuMobile}>
					<img src={'../static/images/menu.png'} alt="菜单" />
				</div>
			)
		} else {
			return (
				<div onClick={menuPc}>
					<img src={'../static/images/close.png'} alt="菜单" />
				</div>
			)
		}
	}

	return (
		<div className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={15} xl={12}>
					<Link href="/">
						<div className='header_logo'>
							<span className="header-logo">Tony</span>
							<span className="header-txt">专注前端开发</span>
						</div>
					</Link>
				</Col>
				<Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>

					<Menu mode="horizontal" onClick={handleClick} theme='dark'>
						<Menu.Item key="0">
							<Icon type="home" />
              首页
            </Menu.Item>
						{
							listData.map((listItem) => {
								if (listItem.status === -1) {
									return (
										<Menu.Item key={listItem.Id}>
											<Icon type={listItem.icon} />
											{listItem.typeName}
										</Menu.Item>
									)
								} else {
									return (
										<SubMenu title={listItem.typeName} key={listItem}>
											{
												second.map(item => {
													if (listItem.Id === item.arctype_parent_id) {
														return (
															<Menu.Item key={item.Id}>{item.title}</Menu.Item>
														)
													}
												})
											}
										</SubMenu>
									)
								}
								// return (

								// )
							})
						}
					</Menu>
				</Col>
				<Col className="menu-div-mobile" xs={12} sm={12} md={0} lg={0} xl={0}>
					<Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
						{
							menuIsClose()
						}
					</Dropdown>
				</Col>
			</Row>
		</div>
	)
}

export default Header









