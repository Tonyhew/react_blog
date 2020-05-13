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
	const [second, setSecond] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			var list = []
			const result = await axios(servicePath.getNavList).then(
				(res) => {
					list = res.data.data;
					for (let i = 0; i < list.length; i++) {
						var id = res.data.data[i].Id
						axios(servicePath.getSecondNav + id).then((res) => {
							list[i].second = res.data.second
							setSecond(res.data.second)
						})
					}
					return list
				}
			)

			setListData(result)
		}
		fetchData()
	}, [])

	console.log(second)
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

					<Menu mode="horizontal" onClick={handleClick}>
						<Menu.Item key="0">
							<Icon type="home" />
              首页
            </Menu.Item>
						{
							listData.map(item => {
								return (
									<SubMenu title={item.typeName} key={item.Id}>
										{
											second.map(item => {
												return (
													<Menu.Item key={item.id}>{item.title}</Menu.Item>
												)
											})
										}
									</SubMenu>
								)
							})
						}
					</Menu>
				</Col>
				<Col className="menu-div-mobile" xs={6} sm={6} md={0} lg={0} xl={0}>
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









