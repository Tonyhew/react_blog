import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal

function ArticleList(props) {
	const [list, setList] = useState([]);

	useEffect(() => {
		getList();
	}, [])

	const getList = () => {
		axios({
			method: 'get',
			url: servicePath.getArticleList,
			withCredentials: true,
			header: { 'Acess-Control-Allow-Origin': '*' }
		}).then(
			(res) => {
				if (res.data.data === '没有登录') {
					localStorage.removeItem('openId')
					props.history.push('/')
				} else {
					setList(res.data.list)
				}
			}
		)
	}

	const delteArticle = (id) => {
		confirm({
			title: '你确定要删除这篇博客吗？',
			content: '如果你点击OK按钮，文章将会永远被删除，无法恢复',
			onOk() {
				axios(servicePath.deleteArticle + id, { withCredentials: true }).then(
					res => {
						message.success('文章删除成功')
						getList()
					}
				)
			},
			onCancel() {
				message.error('没有任何改变')
			}
		})
	}

	const updataArticle = (id, checked) => {
		props.history.push('/index/add/' + id)
	}


	return (
		<div style={{ padding: 24, background: '#fff' }}>
			<List
				header={
					<Row className="list-div">
						<Col span={8}>
							<b>标题</b>
						</Col>
						<Col span={4}>
							<b>类别</b>
						</Col>
						<Col span={4}>
							<b>栏目</b>
						</Col>
						<Col span={2}>
							<b>发布时间</b>
						</Col>
						<Col span={2}>
							<b>浏览量</b>
						</Col>
						<Col span={4}>
							<b>操作</b>
						</Col>
					</Row>
				}
				bordered
				dataSource={list}
				renderItem={(item) => (
					<List.Item>
						<Row className="list-div">
							<Col span={8}>
								{item.title}
							</Col>
							<Col span={4}>
								{item.typeName}
							</Col>
							<Col span={4}>
								{item.arcTypeName ? item.arcTypeName : item.secondTitle}
							</Col>
							<Col span={2}>
								{item.addTime}
							</Col>
							<Col span={2}>
								{item.view_count}
							</Col>
							<Col span={4}>
								<Button type="primary" className="button" onClick={() => updataArticle(item.id)}>修改</Button>
								<Button type="danger" onClick={() => delteArticle(item.id)}>删除</Button>
							</Col>
						</Row>
					</List.Item>
				)}
			/>

		</div>

	)


}


export default ArticleList







