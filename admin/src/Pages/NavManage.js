import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { List, Row, Col, Button, Drawer, Input, DatePicker, message, Modal } from 'antd';
import servicePath from '../config/apiUrl';
import '../static/css/NavManage.css';
import axios from 'axios';

const { confirm } = Modal
function NavManage(props) {
  moment.suppressDeprecationWarnings = true;

  const [navId, setNavId] = useState(0);
  const [navList, setNavList] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [secondVisiable, setSecondVisiable] = useState(false);
  const [firstNavTypeName, setFirstNavTypeName] = useState('');
  const [firstNavIcon, setFirstNavIcon] = useState('');
  const [firstNavAddTime, setFirstNavAddTime] = useState();
  const [firstNavEditTime, setFirstNavEditTime] = useState();
  const [firstStatus] = useState(-1);
  const [secondNavList, setSecondNavList] = useState([]);
  const [secondPId, setSecondPId] = useState(0)
  const [secondNavTitle, setSecondNavTitle] = useState('');


  useEffect(() => {
    getNavList();
    getCurrentTime();
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
    setFirstNavEditTime(dateValue)
  }

  const getNavList = () => {
    axios({
      method: 'get',
      url: servicePath.getNavList,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' }
    }).then(
      (res) => {
        if (res.data.data === '没有登录') {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setNavList(res.data.data)
        }
      }
    )
  }

  const addNewNav = (e) => {
    setVisiable(true)
    setNavId(0)
    setFirstNavTypeName('栏目名称')
    setFirstNavIcon('icon图标(请在ant design中的icon组件中查找您所想要的图标)')
  }

  const addFirstNavClose = () => {
    setVisiable(false)
  }

  const sumbitFirstNav = () => {
    let dataProps = {};
    if (navId === 0) {
      dataProps.typeName = firstNavTypeName;
      dataProps.icon = firstNavIcon;
      dataProps.status = firstStatus;
      dataProps.add_time = firstNavAddTime
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
            getNavList()
          } else {
            message.error('栏目添加失败')
          }
        }
      )
    } else {
      dataProps.id = navId;
      dataProps.typeName = firstNavTypeName;
      dataProps.icon = firstNavIcon;
      dataProps.edit_time = firstNavEditTime;
      axios({
        method: 'post',
        url: servicePath.updateFirstNav,
        data: dataProps,
        withCredentials: true
      }).then(
        (res) => {
          if (res.data.isSuccess) {
            message.success('栏目修改成功')
            getNavList()
          } else {
            message.error('栏目修改失败')
          }
        }
      )
    }
  }

  const editNav = (id) => {
    setVisiable(true)
    setNavId(id)
    axios({
      method: 'get',
      url: servicePath.getFirstNavInfo + id,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' }
    }).then(
      (res) => {
        console.log(res.data.fnavinfo)
        let navId = res.data.fnavinfo[0];
        setFirstNavTypeName(navId.typeName)
        setFirstNavIcon(navId.icon);
      }
    )
  }

  const deleteNavItem = (id) => {
    confirm({
      title: '你确定要删除这条栏目吗？',
      content: '如果你点击OK按钮，栏目将会永远被删除，无法恢复',
      onOk() {
        axios(servicePath.deleteFirstNav + id, { withCredentials: true }).then(
          res => {
            message.success('栏目删除成功')
            getNavList()
          }
        )
      },
      onCancel() {
        message.error('没有任何改变')
      }
    })
  }

  const addNewSecond = (id) => {
    setSecondVisiable(true);
    setSecondNavTitle('二级栏目标题')
    setSecondPId(id)
    axios({
      method: 'get',
      url: servicePath.getSecondNavById + id,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' }
    }).then(
      (res) => {
        setSecondNavList(res.data.secondnav)
      }
    )

  }

  const closeSecondDrawer = () => {
    setSecondVisiable(false);
  }

  const deleteSecondNav = (id) => {
    console.log(id)
    confirm({
      title: '你确定要删除这条栏目吗？',
      content: '如果你点击OK按钮，栏目将会永远被删除，无法恢复',
      onOk() {
        axios(servicePath.deleteSecondNav + id, { withCredentials: true }).then(
          res => {
            message.success('栏目删除成功')
            addNewSecond(secondPId)
            axios({
              method: 'get',
              url: servicePath.countSecondNav + secondPId,
              withCredentials: true,
              header: { 'Acess-Control-Allow-Origin': '*' }
            }).then(
              (res) => {
                if (res.data.result[0].c === 0) {
                  let data = {}
                  data.id = secondPId;
                  data.status = -1;
                  axios({
                    method: 'post',
                    url: servicePath.editFirstNavStatus,
                    withCredentials: true,
                    data: data,
                    header: { 'Acess-Control-Allow-Origin': '*' }
                  }).then(
                    res => {
                      console.log(res)
                      addNewSecond(secondPId)
                    }
                  )
                }
              }
            )
            // if (res.data.isSuccess && secondNavList.length === 0) {
            //   
            // }
          }
        )
      },
      onCancel() {
        message.error('没有任何改变')
      }
    })

  }

  const addSecond = () => {
    let dataP = {}
    dataP.title = secondNavTitle;
    dataP.add_time = firstNavAddTime;
    dataP.arctype_parent_id = secondPId;
    axios({
      method: 'post',
      url: servicePath.addSecondNav,
      withCredentials: true,
      data: dataP,
      header: { 'Acess-Control-Allow-Origin': '*' }
    }).then(
      (res) => {
        if (res.data.isSuccess) {
          message.success('新增成功！');
          let data = {}
          data.id = secondPId;
          data.status = 1;
          axios({
            method: 'post',
            url: servicePath.editFirstNavStatus,
            withCredentials: true,
            data: data,
            header: { 'Acess-Control-Allow-Origin': '*' }
          }).then(
            res => {
              console.log(res)
              addNewSecond(secondPId)
            }
          )
        }
      }
    )

  }

  return (
    <div style={{ padding: 24, background: '#fff' }}>
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
                <Button type='primary' icon='plus' shape="circle" onClick={() => addNewSecond(item.Id)} />
                <Button type='primary' className="button_nav" onClick={() => editNav(item.Id)}>修改</Button>
                <Button type='danger' className="button_nav" onClick={() => deleteNavItem(item.Id)}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Drawer
        title={navId === 0 ? '新增栏目' : '修改栏目'}
        width={720}
        onClose={addFirstNavClose}
        visible={visiable}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={24}>
            <Input size='large' placeholder={firstNavTypeName} className='input input_title' onChange={(e) => setFirstNavTypeName(e.target.value)} />
          </Col>
          <Col span={24}>
            <Input size='large' placeholder={firstNavIcon ? firstNavIcon : 'icon图标(请在ant design中的icon组件中查找您所想要的图标)'} onChange={(e) => setFirstNavIcon(e.target.value)} className='input input_icon' />
          </Col>

          <Col span={24}>

            {
              navId === 0 ? <DatePicker defaultValue={moment(firstNavAddTime)} size='large' format="YYYY-MM-DD HH:mm:ss" showTime placeholder='请选择新增时间' /> : <DatePicker defaultValue={moment(firstNavEditTime)} size='large' format="YYYY-MM-DD HH:mm:ss" showTime placeholder='请选择修改时间' />
            }
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

      {/* 二级栏目START */}
      <Drawer
        title="二级栏目"
        width={720}
        onClose={closeSecondDrawer}
        visible={secondVisiable}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={24}>
            <Input size='large' placeholder={secondNavTitle} className='input input_title' onChange={(e) => setSecondNavTitle(e.target.value)} />
          </Col>

          <Col span={24} style={{ margin: '0 0 10px' }}>
            <DatePicker defaultValue={moment(firstNavAddTime)} size='large' format="YYYY-MM-DD HH:mm:ss" showTime placeholder='请选择新增时间' />
          </Col>
        </Row>
        <List
          header={
            <Row className="list-div">
              <Col span={6}>
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
          dataSource={secondNavList}
          renderItem={(item) => (
            <List.Item>
              <Row className="list-div">
                <Col span={6}>
                  {item.id}
                </Col>
                <Col span={6}>
                  {item.title}
                </Col>
                <Col span={6}>
                  <b>{item.add_time ? moment(item.add_time).format('YYYY-MM-DD HH:mm:ss') : '暂无时间'}</b>
                </Col>
                <Col span={6}>
                  <Button type='danger' onClick={() => deleteSecondNav(item.id)} size='default'>删除</Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <div
          style={{
            textAlign: 'right',
            margin: '10px 0'
          }}
        >
          <Button onClick={closeSecondDrawer} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={() => addSecond()} type="primary">
            添加二级栏目
          </Button>
        </div>
      </Drawer>
      {/* 二级栏目END */}
    </div>
  )
}

export default NavManage;