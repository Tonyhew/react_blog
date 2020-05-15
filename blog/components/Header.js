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
	// const [second, setSecond] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			let list = []
			await axios(servicePath.getNavList).then((res) => {
					list = res.data.data;
				}
			).then(r => {
				for (let i = 0; i < list.length; i++) {
					let id = list[i].Id
					axios(servicePath.getSecondNav + id).then(res => {
						list[i].children = res.data.second;
					})
				}
				return list
			})
			setListData([...list])
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
	}

	const menu = (
		<Menu mode="horizontal" onClick={handleClick} className="mobile_menu">
			<Menu.Item key="0">
				<Icon type="home" />
         首页
      </Menu.Item>
			{
				listData.map((item) => {
					return (
						<Menu.Item key={item.Id}>
							<Icon type={item.icon} />
							{item.typeName}

						</Menu.Item>
					)
				})
			}
		</Menu>
	);

	return (
		<div className="header">
			<Row type="flex" justify="center">
				<Col xs={24} sm={24} md={10} lg={15} xl={12}>
					<span className="header-logo">Tony</span>
					<span className="header-txt">专注前端开发</span>
				</Col>
				<Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>

					<Menu mode="horizontal" onClick={handleClick} theme='dark'>
						<Menu.Item key="0">
							<Icon type="home" />
              首页
            </Menu.Item>
						{
							listData.map((listItem) => {
								console.log(listItem)
								return (
									<SubMenu title={listItem.typeName} key={listItem.Id}>
										{
										
											// listItem.children.map(itemNav => {
											// 	return (
											// 		<Menu.Item>{itemNav.title}</Menu.Item>
											// 	)
											// })
										}
									</SubMenu>
								)
							})
						}
					</Menu>
				</Col>
				<Col className="menu-div-mobile" xs={12} sm={12} md={0} lg={0} xl={0}>
					<Dropdown overlay={menu} trigger={['click']}>
						<div onClick={menuMobile}>
							<img src={'../static/images/menu.png'} alt="菜单" />
						</div>
					</Dropdown>
				</Col>
			</Row>
		</div>
	)
}

export default Header









