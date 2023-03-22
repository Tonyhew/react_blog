import React, { useState, useEffect } from 'react'
import { Row, Col, List, Breadcrumb, Pagination } from 'antd'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'
import marked from 'marked'
import IconFont from '../config/iconfont.config'

const MyList = (list) => {
  const router = useRouter()
  const { id } = router.query

  const [myList, setMylist] = useState(list.data)
  const [title, setTitle] = useState('')
  const [pageTotal, setPageTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setMylist(list.data)
    getTitle()
  }, [list])

  useEffect(() => {
    getArticleTotal()
  }, [])

  const getTitle = () => {
    if (id.length >= 4) {
      axios(servicePath.getListSecondTitle + id).then((res) => {
        setTitle(res.data.data[0].title)
      })
    } else {
      axios(servicePath.getListTitle + id).then((res) => {
        setTitle(res.data.data[0].typeName)
      })
    }
  }

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

  const getArticleTotal = () => {
    axios(servicePath.getCountArticleList + id).then((res) => {
      setPageTotal(res.data.data[0].total)
    })
  }

  const onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize)
  }

  return (
    <div>
      <Header
        title={title}
        path={id}
      />
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
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href='/'>首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <div>
            <List
              itemLayout='vertical'
              dataSource={myList}
              renderItem={(item) => (
                <>
                  <List.Item
                    extra={
                      <img
                        width={272}
                        src={item.articleImg}
                      />
                    }
                  >
                    <div className='list-title'>
                      <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                        <a>{item.title}</a>
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
                </>
              )}
            />
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange(currentPage, pageTotal)}
              defaultCurrent={1}
              total={pageTotal}
              hideOnSinglePage
            />
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

MyList.getInitialProps = async (context) => {
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}

export default MyList
