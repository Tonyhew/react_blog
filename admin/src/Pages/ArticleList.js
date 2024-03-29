import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'

const { confirm } = Modal

function ArticleList() {
  const navigate = useNavigate()

  const [list, setList] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      setList(res.data.list)
    })
  }

  // @params -1: 不置顶，1: 置顶
  const topArticle = (id) => {
    let dataProps = {}
    dataProps.id = id
    dataProps.is_top = 1
    axios({
      method: 'post',
      url: servicePath.isDisableTopArticle,
      data: dataProps,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      if (res.data.isSuccess) {
        message.success('置顶成功')
        getList()
      }
    })
  }

  const disTopArticle = (id) => {
    let dataProps = {}
    dataProps.id = id
    dataProps.is_top = -1
    axios({
      method: 'post',
      url: servicePath.isDisableTopArticle,
      data: dataProps,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      if (res.data.isSuccess) {
        message.error('取消置顶')
        getList()
      }
    })
  }

  const showArticle = (id, ishow) => {
    let dataProps = {
      id,
    }
    axios({
      method: 'post',
      url: servicePath.updateArticle,
      data: {
        ...dataProps,
        is_show: ishow === 1 ? -1 : 1,
      },
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      if (res.data.isSuccess) {
        getList()
      }
    })
  }

  const delteArticle = (id) => {
    confirm({
      title: '你确定要删除这篇博客吗？',
      content: '如果你点击OK按钮, 文章将会永远被删除, 无法恢复',
      onOk() {
        axios(servicePath.deleteArticle + id, { withCredentials: true }).then(() => {
          message.success('文章删除成功')
          getList()
        })
      },
      onCancel() {
        message.error('没有任何改变')
      },
    })
  }

  const updataArticle = (id) => {
    navigate(`/index/list/add/${id}`)
  }

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <List
        header={
          <Row className='list-div'>
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={2}>
              <b>类别</b>
            </Col>
            <Col span={2}>
              <b>栏目</b>
            </Col>
            <Col span={2}>
              <b>发布时间</b>
            </Col>
            <Col span={2}>
              <b>置顶</b>
            </Col>
            <Col span={2}>
              <b>状态</b>
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
            <Row className='list-div'>
              <Col span={8}>{item.title}</Col>
              <Col span={2}>{item.typeName}</Col>
              <Col span={2}>{item.arcTypeName ? item.arcTypeName : item.secondTitle}</Col>
              <Col span={2}>{item.addTime}</Col>
              <Col span={2}>
                {item.isTop === -1 ? (
                  <Switch
                    checkedChildren={isChecked}
                    onChange={(e) => setIsChecked(e)}
                    onClick={() => topArticle(item.id)}
                  />
                ) : (
                  <Switch
                    defaultChecked
                    checkedChildren={isChecked}
                    onChange={(e) => setIsChecked(e)}
                    onClick={() => disTopArticle(item.id)}
                  />
                )}
              </Col>
              <Col span={2}>
                <Switch
                  checked={item.isShow === 1}
                  checkedChildren={'显示'}
                  unCheckedChildren={'不显示'}
                  onChange={(e) => setIsShow(e)}
                  onClick={() => showArticle(item.id, item.isShow)}
                />
              </Col>
              <Col span={2}>{item.view_count}</Col>
              <Col span={4}>
                <Button
                  type='primary'
                  className='button'
                  onClick={() => updataArticle(item.id)}
                >
                  修改
                </Button>
                <Button
                  type='primary'
                  danger
                  onClick={() => delteArticle(item.id)}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList
