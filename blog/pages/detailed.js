import React, { useState, useEffect } from 'react';
import { Row, Col, Affix, Breadcrumb } from 'antd';
import axios from 'axios';
import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import '../static/style/pages/detailed.css';
// import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx';
import servicePath from '../config/apiUrl';
import IconFont from '../config/iconfont.config';


const Detailed = (props) => {

  const [title, setTitle] = useState('')

  useEffect(() => {
    getTitle()
  })

  const tocify = new Tocify();

  const renderer = new marked.Renderer();

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>`
  }

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

  let html = marked(props.content)

  const getTitle = () => {
    if (props.nav_id >= 1000) {
      axios(servicePath.getListSecondTitle + props.nav_id).then(
        (res) => {
          setTitle(res.data.data[0].title)
        }
      )
    } else {
      axios(servicePath.getListTitle + props.nav_id).then(
        (res) => {
          setTitle(res.data.data[0]?.typeName)
        }
      )
    }
  }

  return (
    <>
      <Header title={props.title} desc={props.descript} keywords={props.keywords} />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{title}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {props.title}
              </div>

              <div className="list-icon center">
                <span><IconFont type="iconMonthdatecalendar" /> {props.addTime}</span>
                <span><IconFont type="iconfolder" /> {props.typeName}</span>
                <span><IconFont type="iconfire" /> {props.view_count}</span>
              </div>

              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>

            </div>



          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={55}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
          <Advert />
        </Col>
      </Row>
      <Footer />

    </>
  )
}

Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}

export default Detailed