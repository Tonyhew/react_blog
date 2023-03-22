import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import '../static/style/components/header.css'
import { Row, Col, Menu, Dropdown } from 'antd'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import IconFont from '../config/iconfont.config'

const Header = (metaInfo) => {
  const [siteTitle, setSiteTitle] = useState('')
  const [siteDescription, setSiteDescription] = useState('')
  const [siteKeywords, setSiteKeywords] = useState('')

  const [listData, setListData] = useState([])
  const [second, setSecond] = useState([])
  const [isClose, setIsClose] = useState(false)
  const [current, setCurrent] = useState('/index')

  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    if (id?.includes(metaInfo.path)) {
      setCurrent(`${id}`)
    }

    getSiteInfo()
  }, [router, current])

  const getSiteInfo = useCallback(() => {
    axios.get(servicePath.getSiteInfo).then((res) => {
      let siteInfo = res.data.siteInfo[0]
      setSiteTitle(siteInfo.site_title)
      setSiteDescription(siteInfo.site_description)
      setSiteKeywords(siteInfo.site_keywords)
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await axios(servicePath.getNavList)
        .then((res) => {
          setListData(res.data.data)
        })
        .then(() => {
          axios(servicePath.getSecondNav).then((r) => {
            setSecond(r.data.second)
          })
        })
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    if (router.pathname.includes(e.key)) {
      setIsClose(false)
    } else {
      if (e.key == '/index') {
        Router.push('/index')
        setIsClose(false)
      } else {
        Router.push(`/list?id=${e.key}`)
        setIsClose(false)
      }
    }
  }

  const menuMobile = (e) => {
    e.preventDefault()
    setIsClose(true)
  }

  const menuPc = (e) => {
    e.preventDefault()
    setIsClose(false)
  }

  const mobileMenu = (firstMenu, secondMenu) => {
    let arr = [
      {
        label: '首页',
        key: `/index`,
        icon: <IconFont type='iconhome' />,
      },
    ]
    firstMenu.forEach((item) => {
      let a
      if (item.status === -1) {
        a = {
          label: item.typeName,
          key: `${item.Id}`,
          icon: <IconFont type={item.icon} />,
        }
      } else {
        a = {
          label: item.typeName,
          key: `${item.Id}`,
          icon: <IconFont type={item.icon} />,
          popupClassName: 'sonList',
          children: [],
        }
        secondMenu.forEach((sMenuItem) => {
          if (item.Id === sMenuItem.arctype_parent_id) {
            a.children.push({
              label: sMenuItem.title,
              key: `${sMenuItem.Id}`,
            })
          }
        })
      }
      arr.push(a)
    })

    return arr
  }

  const menu = (
    <Menu
      onClick={handleClick}
      className='mobile_menu'
      items={mobileMenu(listData, second)}
    />
  )

  const headerMenu = (firstMenu, secondMenu) => {
    let arr = [
      {
        label: '首页',
        key: `/index`,
        icon: <IconFont type='iconhome' />,
      },
    ]
    firstMenu.forEach((item) => {
      let a
      if (item.status === -1) {
        a = {
          label: item.typeName,
          key: `${item.Id}`,
          icon: <IconFont type={item.icon} />,
        }
      } else {
        a = {
          label: item.typeName,
          key: `${item.Id}`,
          icon: <IconFont type={item.icon} />,
          children: [],
        }
        secondMenu.forEach((sMenuItem) => {
          if (item.Id === sMenuItem.arctype_parent_id) {
            a.children.push({
              label: sMenuItem.title,
              key: `${sMenuItem.Id}`,
            })
          }
        })
      }
      arr.push(a)
    })

    return arr
  }

  const menuIsClose = () => {
    if (!isClose) {
      return (
        <div onClick={menuMobile}>
          <img
            src={'../static/images/menu.png'}
            alt='菜单'
          />
        </div>
      )
    } else {
      return (
        <div onClick={menuPc}>
          <img
            src={'../static/images/close.png'}
            alt='菜单'
          />
        </div>
      )
    }
  }

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>
          {siteTitle} {metaInfo ? `| ${metaInfo.title}` : null}
        </title>
        <meta
          name='description'
          content={metaInfo.desc ? metaInfo.desc : siteDescription}
        />
        <meta
          name='keywords'
          content={metaInfo.keywords ? metaInfo.keywords : siteKeywords}
        />
        <meta
          name='author'
          content='何伟义, Tonyhew'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7775355478205656'
          crossOrigin='anonymous'
        ></script>
      </Head>
      <div className='header'>
        <Row
          type='flex'
          justify='center'
        >
          <Col
            xs={24}
            sm={24}
            md={10}
            lg={15}
            xl={12}
          >
            <Link href='/'>
              <div className='header_logo'>
                <span className='header-logo'>Tony</span>
                <span className='header-txt'>分享技术、生活日常的个人博客</span>
              </div>
            </Link>
          </Col>
          <Col
            className='menu-div'
            xs={0}
            sm={0}
            md={14}
            lg={8}
            xl={6}
          >
            <Menu
              mode='horizontal'
              onClick={handleClick}
              theme='dark'
              selectedKeys={[current]}
              items={headerMenu(listData, second)}
            />
          </Col>
          <Col
            className='menu-div-mobile'
            xs={12}
            sm={12}
            md={0}
            lg={0}
            xl={0}
          >
            <Dropdown
              overlay={menu}
              trigger={['click']}
              placement='bottom'
            >
              {menuIsClose()}
            </Dropdown>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Header
