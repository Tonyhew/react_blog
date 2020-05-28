import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { List, Row, Col, Button, Drawer, Input, DatePicker, message } from 'antd';
import servicePath from '../config/apiUrl';
import '../static/css/NavManage.css';
import axios from 'axios';


function NavManage(props) {

  const [navId, setNavId] = useState(0)
  const [navList, setNavList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [firstNavTypeName, setFirstNavTypeName] = useState('');
  const [firstNavIcon, setFirstNavIcon] = useState('');
  const [firstNavAddTime, setFirstNavAddTime] = useState();
  const [firstNavEditTime, setFirstNavEditTime] = useState();
  const [firstStatus, setFitstStatus] = useState(-1);

  useEffect(() => {
    getNavList()
    getCurrentTime()
    let tmpId = props.match.params.id
		if (tmpId) {
			setNavId(tmpId)
		}
  }, []);

  const getCurrentTime = () => {
    let time = new Date();
    let d = new Date(time);
    let dateValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    setFirstNavAddTime(dateValue)
  }

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
    console.log(props)
    let dataProps = {};
    dataProps.typeName = firstNavTypeName;
    dataProps.icon = firstNavIcon;
    dataProps.status = firstStatus;
    dataProps.add_time = firstNavAddTime
    if (navId === 0) {
      axios({
        method: 'post',
				url: servicePath.addFirstNav,
				withCredentials: true,
				data: dataProps
      }).then(
        (res) => {
          setNavId(res.data.insertId)
					if (res.data.isSuccess) {
						message.success('栏目添加成功')
					} else {
						message.error('栏目添加失败')
					}
        }
      )
    } else {
      dataProps.Id = navId
    }
  }

  const editNav = (id) => {
    setVisiable(true)
    console.log(id)
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
                {
                  item.add_time ? moment(item.add_time).format('YYYY-MM-DD HH:mm:ss') : '暂无时间'
                }
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={ () => editNav(item.Id) }>修改</Button>
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
        <Row>
          <Col span={24}>
            <Input size='large' placeholder={firstNavTypeName} className='input input_title' onChange={ (e) => setFirstNavTypeName(e.target.value) } />
          </Col>
          <Col span={24}>
            <Input size='large' placeholder='icon图标(请在ant design中的icon组件中查找您所想要的图标)' onChange={ (e) => setFirstNavIcon(e.target.value) } className='input input_icon' />
          </Col>

          <Col span={24}>
            <DatePicker defaultValue={moment(firstNavAddTime)} size='large' format="YYYY-MM-DD HH:mm:ss" showTime placeholder='请选择时间' />
          </Col>
        </Row>
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