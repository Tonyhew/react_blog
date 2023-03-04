import React, { useState, useEffect, useCallback } from 'react'
import { List, Row, Col, Modal, message, Input, Button, Drawer } from 'antd'
import axios from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal

const ArticleType = () => {

  const [typeId, setTypeId] = useState(0)
  const [type, setType] = useState([])
  const [tagTitle, setTagTitle] = useState('标签标题')
  const [orderNum, setOrderNum] = useState(0)
  const [tagIcon, setTagIcon] = useState('标签图标')
  const [visiable, setVisiable] = useState(false)

  const getType = useCallback(() => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      setType(res.data.type)
    })
  }, [])

  useEffect(() => {
    getType()
  }, [getType])

  const addTag = () => {
    setVisiable(true)
    setTypeId(0)
  }

  const updateTags = (id, checked) => {
    setTypeId(id)
    axios({
      method: 'get',
      url: servicePath.getTypeInfoById + id,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      let type = res.data.typeInfo[0]
      setTagTitle(type.typeName)
      setOrderNum(type.orderNum)
      setTagIcon(type.icon)
    })
    setVisiable(true)
  }

  const sumbitTag = () => {
    let dataProps = {}
    if (typeId === 0) {
      dataProps.typeName = tagTitle
      dataProps.icon = tagIcon
      dataProps.orderNum = orderNum
      axios({
        method: 'post',
        url: servicePath.addNewTag,
        withCredentials: true,
        data: dataProps,
      }).then((res) => {
        setTypeId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('标签添加成功')
          getType()
        } else {
          message.error('标签添加失败')
        }
      })
    } else {
      dataProps.id = typeId
      dataProps.typeName = tagTitle
      dataProps.icon = tagIcon
      dataProps.orderNum = orderNum
      axios({
        method: 'post',
        url: servicePath.updateTag,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success('栏目修改成功')
          getType()
        } else {
          message.error('栏目修改失败')
        }
      })
    }
  }

  const closeDrawer = () => {
    setVisiable(false)
  }

  const delteArticle = (id) => {
    confirm({
      title: '你确定要删除这篇博客吗？',
      content: '如果你点击OK按钮, 文章将会永远被删除, 无法恢复',
      onOk() {
        axios(servicePath.deleteTag + id, { withCredentials: true }).then(() => {
          message.success('文章删除成功')
          getType()
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
        <Col className='add_nav'>
          <Button
            type='primary'
            onClick={() => addTag()}
          >
            增加
          </Button>
        </Col>
      </Row>
      <List
        header={
          <Row className='list-div'>
            <Col span={8}>
              <b>标签标题</b>
            </Col>
            <Col span={5}>
              <b>排序</b>
            </Col>
            <Col span={5}>
              <b>图标</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={type}
        renderItem={(item) => (
          <List.Item>
            <Row className='list-div'>
              <Col span={8}>{item.typeName}</Col>
              <Col span={5}>{item.orderNum}</Col>
              <Col span={5}>{item.icon}</Col>
              <Col span={5}>
                <Button
                  type={'primary'}
                  onClick={() => {
                    updateTags(item.Id)
                  }}
                >
                  修改
                </Button>
                <Button
                  type={'primary'}
                  danger
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    delteArticle(item.Id)
                  }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Drawer
        title={typeId === 0 ? '新增标签' : '修改标签'}
        width={720}
        onClose={closeDrawer}
        open={visiable}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Row>
          <Col span={24}>
            <Input
              className='input'
              size='large'
              placeholder={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input
              className='input'
              size='large'
              placeholder={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
            />
          </Col>
          <Col span={24}>
            <Input
              className='input'
              size='large'
              placeholder={tagIcon}
              onChange={(e) => setTagIcon(e.target.value)}
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
            onClick={sumbitTag}
            type='primary'
          >
            提交
          </Button>
        </div>
      </Drawer>
    </div>
  )
}

export default ArticleType
