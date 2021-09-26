import React, { useState, useEffect } from 'react';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import { Doughnut } from 'react-chartjs-2';
import { List, Row, Col } from 'antd'
import '../static/css/Index.css';

function Index(props) {
	const [typeName, setTypeName] = useState([]);
	const [count, setCount] = useState([]);
	const [rblLoading, setRBLLoading] = useState(false);
	const [redBookList, setRedBookList] = useState([]);

	useEffect(() => {
		getValueArticle()
		getRedBookFormInfo()
		// eslint-disable-next-line react-hooks/exhaustive-deps 
	}, []);

	const getValueArticle = () => {
		axios({
			method: 'get',
			url: servicePath.countArticleValue,
			withCredentials: true,
			header: { 'Acess-Control-Allow-Origin': '*' }
		}).then(
			(res) => {
				if (res.data.data === '没有登录') {
					localStorage.removeItem('openId');
					localStorage.removeItem('roleId');
					props.history.push('/');
				} else {
					let result = res.data.countArt
					var dataA = result.reduce((res, v) => {
						Object.keys(v).forEach(key => {
							const value = v[key];
							if (res[key]) res[key].push(value);
							else res[key] = [value];
						})
						return res;
					}, {});
					setTypeName(dataA.typeName)
					setCount(dataA.Count)
				}

			}
		)
	}

	/**
	 * 
	 * 获取小红书报名人员信息
	 */
	const getRedBookFormInfo = () => {
		setRBLLoading(true)
		axios({
			method: 'post',
			url: 'https://backstage.huangzhemin.com/miniapp/XiaoHong/selectRedBookFrom',
			withCredentials: true,
			data: {
				pageIndex: 0,
				pageSize: 30
			},
			header: {
				'Acess-Control-Allow-Origin': '*',
			}
		}).then(
			res => {
				if (res.data.data === '没有登录') {
					localStorage.removeItem('openId');
					localStorage.removeItem('roleId');
					props.history.push('/');
				} else {
					setRBLLoading(false)
					let redListData = res.data.data
					setRedBookList(redListData)

				}
			}
		)
	}

	const data = {
		datasets: [{
			data: count,
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
			],
			borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
			],
		}],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: typeName
	}
	return (
		<div className='chart_index'>
			<div className='chart_left' style={{ padding: 24, background: '#fff' }}>
				<p>统计文章</p>
				<Doughnut data={data} width={600} height={300} />
			</div>

			<div className="table-redbook" style={{ padding: 24, background: '#fff', marginTop: '20px' }}>
				<h4>小红书报名表单</h4>
				<List
					bordered
					header={
						<Row className="list-div">
							<Col span={4}>
								<b>ID</b>
							</Col>
							<Col span={2}>
								<b>姓名</b>
							</Col>
							<Col span={2}>
								<b>性别</b>
							</Col>
							<Col span={2}>
								<b>电话</b>
							</Col>
							<Col span={4}>
								<b>邮箱</b>
							</Col>
							<Col span={2}>
								<b>省份</b>
							</Col>
							<Col span={2}>
								<b>城市</b>
							</Col>
							<Col span={6}>
								<b>详细地址</b>
							</Col>
						</Row>
					}
					loading={rblLoading}
					dataSource={redBookList}
					renderItem={
						(item, index) => {
							return (
								<List.Item key={index}>

									<Row className="list-div">
										<Col span={4}>
											{item.labelFrom.leadsId}
										</Col>
										<Col span={2}>
											{item.labelFrom.labelName}
										</Col>
										<Col span={2}>
											{item.labelFrom.labelGender}
										</Col>
										<Col span={2}>
											{item.labelFrom.labelPhone}
										</Col>
										<Col span={4}>
											{item.labelFrom.labelMailbox}
										</Col>
										<Col span={2}>
											{item.labelFrom.labelProvince}
										</Col>
										<Col span={2}>
											{item.labelFrom.labelCity}
										</Col>
										<Col span={6}>
											{item.labelFrom.labelAddress}
										</Col>
									</Row>
								</List.Item>
							)
						}
					}
				>

				</List>
			</div>
		</div>
	)

}


export default Index

















