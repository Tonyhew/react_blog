import React, { useState, useEffect } from 'react';
import { List, Row, Col, Button, Drawer } from 'antd';
import servicePath from '../config/apiUrl';
import '../static/css/NavManage.css';
import axios from 'axios';


function NavManage() {

  const [navList, setNavList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [firstNavTypeName, setFirstNavTypeName] = useState('')
  const [firstNavAddTime, setFirstNavAddTime] = useState()
  const [firstStatus, setFitstStatus] = useState(-1)

  useEffect(() => {
    getNavList()
  }, [])

  const getNavList = () => {
    axios({
      method: 'get',
      url: servicePath.getNavList,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' }
    }).then(
      (res) => {
        setNavList(res.data.data)
      }
    )
  }

  const addNewNav = (e) => {
    setVisiable(true)
  }

  const addFirstNavClose = () => {
    setVisiable(false)
  }

  const sumbitFirstNav = () => {

  }

  const editNav = () => {

  }

  const deleteNavItem = () => {

  }

  return (
    <div>
      <Row>
        <Col span={24} className='add_nav'>
          <Button type='primary' onClick={() => addNewNav()}>新增</Button>
        </Col>
      </Row>
      <List
        header={
          <Row className="list-div">
            <Col span={4}>
              <b>ID</b>
            </Col>
            <Col span={6}>
              <b>栏目</b>
            </Col>
            <Col span={6}>
              <b>添加时间</b>
            </Col>
            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={navList}
        renderItem={(item) => (
          <List.Item>
            <Row className="list-div">
              <Col span={4}>
                {item.Id}
              </Col>
              <Col span={6}>
                {item.typeName}
              </Col>
              <Col span={6}>
                {item.add_time}
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={editNav(item.Id)}>修改</Button>
                <Button type='danger' className="button_nav" onClick={deleteNavItem(item.Id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Drawer
        title="新增栏目"
        width={720}
        onClose={addFirstNavClose}
        visible={visiable}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={addFirstNavClose} style={{ marginRight: 8 }}>
            取消
            </Button>
          <Button onClick={sumbitFirstNav} type="primary">
            提交
            </Button>
        </div>
      </Drawer>

    </div>
  )
}

export default NavManage;