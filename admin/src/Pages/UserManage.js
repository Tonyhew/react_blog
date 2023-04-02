import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, List, Input, Button, message, Switch, Drawer, Modal } from 'antd'
import axios from '../config/AxiosConfig'
import MD5 from 'md5'
import servicePath from '../config/apiUrl'
import '../static/css/AddArticle.css'
import '../static/css/UserManage.css'

const { confirm } = Modal
const UserManage = () => {
  const [userInfoList, setUserInfoList] = useState([])
  const [roleStatus] = useState(-1)
  const [isChecked, setIsChecked] = useState(true)
  const [isShow, setIsShow] = useState(false)
  const [userName, setUserName] = useState('请输入你要新建的用户名')
  const [password, setPassword] = useState('请输入你的密码')
  const [repeatPassword, setRepeatPassword] = useState('请再次输入你的密码')
  const userNameInput = useRef()
  const passwordInput = useRef()
  const repeatPasswordInput = useRef()

  useEffect(() => {
    getUserInfoList()
  }, [])

  const getUserInfoList = () => {
    axios({
      method: 'get',
      url: servicePath.getUserInfo,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      setUserInfoList(res.data.userInfo)
    })
  }

  const disableUser = (id) => {
    let dataProps = {}
    dataProps.id = id
    dataProps.user_status = 1
    axios({
      method: 'post',
      url: servicePath.isDisableUser,
      data: dataProps,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      if (res.data.isSuccess) {
        message.error('已禁用')
        getUserInfoList()
      }
    })
  }

  const activeUser = (id) => {
    let dataProps = {}
    dataProps.id = id
    dataProps.user_status = roleStatus
    axios({
      method: 'post',
      url: servicePath.isDisableUser,
      data: dataProps,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      if (res.data.isSuccess) {
        message.success('已启用')
        getUserInfoList()
      }
    })
  }

  const addUser = () => {
    setIsShow(true)
  }

  const closeDrawer = () => {
    setIsShow(false)
  }

  const submitUser = () => {
    if (password === repeatPassword) {
      let dataProps = {}
      dataProps.userName = userName
      dataProps.password = MD5(password + 'fndjvrfewewq9eu!')
      dataProps.role_id = 6
      dataProps.user_status = -1

      let checkUserProps = {
        userName: userName,
      }
      axios({
        method: 'post',
        url: servicePath.addUserCheck,
        data: checkUserProps,
        withCredentials: true,
        header: { 'Acess-Control-Allow-Origin': '*' },
      }).then((res) => {
        if (userName !== res.data.userName && res.data.isAddNewUser) {
          axios({
            method: 'post',
            url: servicePath.addNewUser,
            data: dataProps,
            withCredentials: true,
            header: { 'Acess-Control-Allow-Origin': '*' },
          }).then((res) => {
            if (res.data.isSuccess) {
              userNameInput.current.state.value = ''
              userNameInput.current.input.placeholder = ''
              passwordInput.current.input.value = ''
              passwordInput.current.input.placeholder = ''
              repeatPasswordInput.current.input.value = ''
              repeatPasswordInput.current.input.placeholder = ''
              getUserInfoList()
            }
          })
        } else {
          message.error(res.data.message)
        }
      })
    } else {
      message.error('两次密码不一致')
    }
  }

  const deleteUser = (id) => {
    confirm({
      title: '你确定要删除这个用户吗',
      content: '如果你点击OK按钮, 此用户将会永远被删除, 无法恢复',
      onOk() {
        axios(servicePath.deleteUser + id, { withCredentials: true }).then(() => {
          message.success('此用户删除成功')
          getUserInfoList()
        })
      },
      onCancel() {
        message.error('没有任何改变')
      },
    })
  }

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Row>
        <Col className='add_User'>
          <Button
            type='primary'
            onClick={() => addUser()}
          >
            增加
          </Button>
        </Col>
      </Row>
      <List
        header={
          <Row className='list-div'>
            <Col span={2}>
              <b>ID</b>
            </Col>
            <Col span={6}>
              <b>用户名</b>
            </Col>
            <Col span={4}>
              <b>管理权限</b>
            </Col>
            <Col span={4}>
              <b>禁用</b>
            </Col>
            <Col span={8}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={userInfoList}
        renderItem={(item) => (
          <List.Item>
            <Row className='list-div'>
              <Col span={2}>{item.id}</Col>
              <Col span={6}>{item.userName}</Col>
              <Col span={4}>{item.roleName}</Col>
              <Col span={4}>
                {item.role_id === 10 ? (
                  <Switch
                    checkedChildren={isChecked}
                    defaultChecked
                    disabled
                  />
                ) : item.user_status === -1 ? (
                  <Switch
                    checkedChildren={isChecked}
                    defaultChecked
                    onChange={(e) => setIsChecked(e)}
                    onClick={() => disableUser(item.id)}
                  />
                ) : (
                  <Switch
                    onChange={(e) => setIsChecked(e)}
                    onClick={() => activeUser(item.id)}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  type={'primary'}
                  danger
                  onClick={() => deleteUser(item.id)}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />

      <Drawer
        title='新增用户'
        width={720}
        onClose={closeDrawer}
        open={isShow}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={24}>
            <Input
              ref={userNameInput}
              className='input'
              size='large'
              placeholder={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input.Password
              ref={passwordInput}
              className='input'
              size='large'
              placeholder={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input.Password
              ref={repeatPasswordInput}
              className='input'
              size='large'
              placeholder={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </Col>
        </Row>

        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button
            onClick={closeDrawer}
            style={{ marginRight: 8 }}
          >
            取消
          </Button>
          <Button
            onClick={submitUser}
            type='primary'
          >
            提交
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default UserManage
