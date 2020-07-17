import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, List, Breadcrumb, Pagination } from 'antd';
import { Icon } from '@ant-design/compatible';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/list.css';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import Link from 'next/link';
import marked from 'marked';


const MyList = (list) => {

  const [myList, setMylist] = useState(list.data);
  const [title, setTitle] = useState('');
  const [pageTotal, setPageTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMylist(list.data);
    getTitle()
  })

  useEffect(() => {
    getArticleTotal()
  }, [])

  const getTitle = () => {
    if (list.url.query.id.length >= 4) {
      axios(servicePath.getListSecondTitle + list.url.query.id).then(
        (res) => {
          setTitle(res.data.data[0].title)
        }
      )
    } else {
      axios(servicePath.getListTitle + list.url.query.id).then(
        (res) => {
          setTitle(res.data.data[0].typeName)
        }
      )
    }
  }

  const renderer = new marked.Renderer();
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
      return hljs.highlightAuto(code).value;
    }
  });

  const getArticleTotal = () => {
    const id = list.url.query.id;
    axios(servicePath.getCountArticleList + id).then(
      (res) => {
        setPageTotal(res.data.data[0].total);
      }
    )
  }

  const onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize)
  }

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <title>Tony's 个人博客 | {title}</title>
        <meta name="author" content="何伟义, Tonyhew" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >

          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>

          <div>
            <List
              itemLayout='vertical'
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}</span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.descript) }}></div>
                </List.Item>
              )}
            >

            </List>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange(currentPage, pageTotal)}
              defaultCurrent={1}
              total={pageTotal}
              hideOnSinglePage
            />
          </div>

        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>

      <Footer />
    </div>
  )

}

MyList.getInitialProps = async (context) => {
  const id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}



export default MyList
