import React, { useState } from 'react';
import { Button, Card, Input, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import '../static/css/Login.css';
import servicePath from '../config/apiUrl';
import axios from '../config/AxiosConfig'
import MD5 from 'md5';

function Login(props) {

	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const checkLogin = () => {
		setIsLoading(true)
		if (!userName) {
			setTimeout(() => {
				setIsLoading(false)
				message.error('用户名不能为空')
			}, 500)
			return false
		} else if (!password) {
			setTimeout(() => {
				setIsLoading(false)
				message.error('密码不能为空')
			}, 500)
			return false
		}

		let dataProps = {
			'userName': userName,
			'password': MD5(password + 'fndjvrfewewq9eu!')
		}

		axios({
			method: 'post',
			url: servicePath.checkUser,
			data: dataProps,
			withCredentials: true,
			header: { 'Acess-Control-Allow-Origin': '*' }
		}).then(
			(res) => {
				if (res.data.isSuccess) {
					axios({
						method: 'post',
						url: servicePath.checkLogin,
						data: dataProps,
						withCredentials: true,
					}).then(
						(res) => {
							console.log(res)
							if (res.data.loginStatus != null) {
								if (res.data.loginStatus[0].role_status) {
									setIsLoading(false)
									if (res.data.data === '登录成功') {
										
										localStorage.setItem('openId', res.data.openId);
										localStorage.setItem("roleId", res.data.loginStatus[0].Id);
										props.history.push('/index')
									}
								}
							} else {
								setIsLoading(false)
								props.history.push('/')
								message.error('没有该账号')
							}
						}
					)
				} else {
					setIsLoading(false)
					message.error(res.data.data)
				}

			}
		)

	}

	onkeydown = (e) => {
		if (e.keyCode === 13) {
			checkLogin()
		}
	}

	return (
		<div className="Login-div">

			<Spin tip='Loading...' spinning={isLoading}>
				<Card title="后台管理系统" bordered={true} style={{ width: 400 }}>
					<Input
						id="userName"
						size="large"
						placeholder="请输入你的用户名"
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setUserName(e.target.value) }}
					/>
					<br /><br />
					<Input.Password
						id="password"
						size="large"
						placeholder="请输入你的密码"
						prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setPassword(e.target.value) }}
					/>
					<br /><br />
					<Button type="primary" size="large" block onClick={checkLogin} onKeyDown={(e) => onkeydown(e)} >登录后台</Button>
				</Card>
			</Spin>

		</div>
	)
}


export default Login;















