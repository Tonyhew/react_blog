import React, { useContext, useState } from 'react'
import Head from 'next/head'
// import Router from 'next/router';
import Link from 'next/link'
import { Row, Col, List } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import IconFont from '../config/iconfont.config'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
  const [myList] = useState(list.data)

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
  })

  return (
    <div>
      <Header title={'首页'} />
      <Row
        className='comm-main'
        type='flex'
        justify='center'
      >
        <Col
          className='comm-left'
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout='vertical'
              dataSource={myList}
              renderItem={(item) => (
                <List.Item>
                  <div className='list-title'>
                    {item.isTop == 1 ? <img src='/static/images/top.png' /> : null}
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a className={item.isTop == 1 ? 'list_top' : ''}>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span>
                      <IconFont type='iconMonthdatecalendar' /> {item.addTime}
                    </span>
                    <span>
                      <IconFont type='iconfolder' /> {item.typeName}
                    </span>
                    <span>
                      <IconFont type='iconfire' /> {item.view_count}
                    </span>
                  </div>
                  <div
                    className='list-context'
                    dangerouslySetInnerHTML={{ __html: marked(item.descript) }}
                  ></div>
                </List.Item>
              )}
            ></List>
          </div>
        </Col>

        <Col
          className='comm-right'
          xs={0}
          sm={0}
          md={7}
          lg={5}
          xl={4}
        >
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}

export default Home
