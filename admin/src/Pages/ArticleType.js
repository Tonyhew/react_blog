import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal

function ArticleType(props) {
    const [type, setType] = useState([])

    const getType = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            withCredentials: true,
            header: { 'Acess-Control-Allow-Origin': '*' }
        }).then(
            (res) => {
                console.log(res.data.type)
                setType(res.data.type)
            }
        )
    }

    useEffect(() => {
        getType()
    }, [])

    const delteArticle = (id) => {
        confirm({
            title: '你确定要删除这篇博客吗？',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复',
            // onOk() {
            //     axios(servicePath.deleteArticle + id, { withCredentials: true }).then(
            //         res => {
            //             message.success('文章删除成功')
            //             getType()
            //         }
            //     )
            // },
            // onCancel() {
            //     message.error('没有任何改变')
            // }
        })
    }

    const updataArticle = (id, checked) => {
        // props.history.push('/index/add/'+id)
    }


    return (
        <div>
            <List
                header={
                    <Row className="list-div">
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
                        <Row className="list-div">
                            <Col span={8}>
                                {item.typeName}
                            </Col>
                            <Col span={5}>
                                {item.orderNum}
                            </Col>
                            <Col span={5}>
                                {item.icon}
                            </Col>
                            <Col span={5}>
                                <Button type="primary" onClick={()=> {updataArticle(item.id)}}>修改</Button>
                                <Button onClick={() => {delteArticle(item.id)}}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />

        </div>

    )


}


export default ArticleType







