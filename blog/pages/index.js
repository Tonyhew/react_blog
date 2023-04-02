import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    var ads = document.getElementsByClassName('adsbygoogle').length
    for (var i = 0; i < ads; i++) {
      try {
        ;(adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {}
    }
  }, [])

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

  const showAd = () => {
    let res = []
    //这里的i++,换成了i=i+8,循环开始
    for (let i = 0; i < myList.length; i = i + 4) {
      //当判断i+8是否小于总数组的长度时，成立了就从（i,i+8）开始截取保存到res数组中，其实就是截取数组的前8个对象
      if (i + 4 < myList.length) {
        res.push(myList.slice(i, i + 4))
      } else {
        //这里长度不足8的对象也保存在res数组中，截取i的长度
        res.push(myList.slice(i))
      }
    }
    res.forEach(function (item) {
      //八条对象的数组在后面添加你要添加的内容
      return item.length === 4
        ? item.push(
            <ins
              className='adsbygoogle'
              style={{ display: 'block' }}
              data-ad-format='fluid'
              data-ad-layout-key='-fj-1j+bp-74-p1'
              data-ad-client='ca-pub-7775355478205656'
              data-ad-slot='4666914807'
            ></ins>
          )
        : item
    })
    //这里定义一个空数组，并用apply指向这个空数组，concat将多个数组合并成一个数组
    let result = [].concat.apply([], res)
    return result
  }

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
              dataSource={showAd()}
              renderItem={(item) => (
                <>
                  {item.isShow === 1 ? (
                    <List.Item
                      extra={
                        item.type !== 'ins' && (
                          <img
                            width={272}
                            src={item.articleImg}
                          />
                        )
                      }
                    >
                      {item.type === 'ins' ? (
                        <ins
                          className='adsbygoogle'
                          style={{ display: 'block' }}
                          data-ad-format='fluid'
                          data-ad-layout-key='-fj-1j+bp-74-p1'
                          data-ad-client='ca-pub-7775355478205656'
                          data-ad-slot='4666914807'
                        ></ins>
                      ) : (
                        <>
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
                            dangerouslySetInnerHTML={{
                              __html: item.descript ? marked(item.descript) : '',
                            }}
                          ></div>
                        </>
                      )}
                    </List.Item>
                  ) : null}
                </>
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
