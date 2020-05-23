import React, { useState } from 'react';
import { Button, Card, Input, Icon, Spin, message } from 'antd'
import 'antd/dist/antd.css'
import '../static/css/Login.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'


function Login(props) {

	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

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
			'password': password
		}

		axios({
			method: 'post',
			url: servicePath.checkLogin,
			data: dataProps,
			withCredentials: true,
		}).then(
			(res) => {
				setIsLoading(false)
				if (res.data.data == '登录成功') {
					localStorage.setItem('openId', res.data.openId)
					props.history.push('/index')
				} else {
					message.error('用户名密码错误')
				}
			}
		)

	}

	return (
		<div className="Login-div">

			<Spin tip="Loading..." spinning={isLoading}>
				<Card title="后台管理系统" bordered={true} style={{ width: 400 }}>
					<Input
						id="userName"
						size="large"
						placeholder="请输入你的用户名"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setUserName(e.target.value) }}
					/>
					<br /><br />
					<Input.Password
						id="password"
						size="large"
						placeholder="请输入你的密码"
						prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setPassword(e.target.value) }}
					/>
					<br /><br />
					<Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
				</Card>
			</Spin>

		</div>
	)
}


export default Login;















