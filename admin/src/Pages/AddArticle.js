import React, { useState, useEffect, useRef, useCallback } from 'react'
import Editor from 'for-editor-herb'
import marked from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message, Upload } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import customLang from '../config/EditorConfig'
import axios from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'
import { iconToElement } from '../hooks/useUploadFile'

const { Option } = Select
const { TextArea } = Input
const Hljs = require('highlight.js')

function AddArticle(props) {

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    let tmpId = params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
    getTypeInfo()
    getAllNav()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const $vm = useRef()

  const [iconLoading, setIconLoading] = useState(false)
  const [fileList, setFileList] = useState([]);
  const [articleImgUrl, setArticleImgUrl] = useState('')
  const [articleImgBase64, setArticleImgBase64] = useState('') // 图片 base64

  const [articleId, setArticleId] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleKeywords, setArticleKeywords] = useState('') // 文章关键词
  const [articleTitle, setArticleTitle] = useState('') //文章标题
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [introducemd, setIntroducemd] = useState() //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState() //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [fnavInfo, setFNavInfo] = useState([]) // 文章一级栏目信息
  const [snavInfo, setSNavInfo] = useState([]) // 文章二级栏目信息
  const [selectedType, setSelectType] = useState('文章类型') //选择的文章类别
  const [selectedNav, setSelectNav] = useState() // 一级栏目Id
  const [selectedSNav, setSelectSNav] = useState() //二级栏目Id

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
  })

  const changeContent = (e) => {
    setArticleContent(e)
  }

  const changeDescript = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.data === '没有登录') {
        localStorage.removeItem('openId')
        localStorage.removeItem('roleId')
        navigate('/')
      } else {
        setTypeInfo(res.data.type)
      }
    })
  }

  const getAllNav = () => {
    axios({
      method: 'get',
      url: servicePath.getFirstNav,
      withCredentials: true,
    }).then((res) => {
      setFNavInfo(res.data.firstNav)
    })
  }

  const selectTypeHandler = (value) => {
    setSelectType(value)
  }

  const selectFNavHandler = (value) => {
    setSelectNav(value)
    axios({
      method: 'get',
      url: servicePath.getSecondNav + value,
      withCredentials: true,
    }).then((res) => {
      setSNavInfo(res.data.secondNav)
    })
  }

  const getSNav = useCallback(async () => {
    console.log(selectedNav, selectedSNav)
    if (selectedNav !== undefined && selectedNav !== 0) {
      await axios({
        method: 'get',
        url: servicePath.getSecondNav + selectedNav,
        withCredentials: true,
      }).then((res) => {
        setSNavInfo(res.data.secondNav)
      })
    }
  }, [selectedNav])

  useEffect(() => {
    getSNav()
  }, [getSNav])

  const selectSNavHandler = (value) => {
    setSelectSNav(value)
  }

  const uploadButton = (
    <div style={{ width: '100%' }}>
      <Button
        icon={iconLoading ? iconToElement('LoadingOutlined') : iconToElement('PlusOutlined')}
        title={'上传图标'}
        children={'上传图标'}
      />
    </div>
  )

  const handlePictureChange = (info) => {
    setIconLoading(true)
    console.log(info)
    const formData = new FormData();
    fileList.forEach(file => formData.append('file', file))
    console.log(formData)
    axios({
      method: 'post',
      url: servicePath.uploadFiles,
      withCredentials: true,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    }).then(
      res => {
        console.log(res)
        setArticleImgUrl(res.data.url)
      }
    )
  }

  const articleImgProps = {
    // action: servicePath.uploadFiles,
    listType: 'picture',
    maxCount: 1,
    showUploadList: false,
    onChange: handlePictureChange,
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false;
    },
  }

  const saveArticle = () => {
    if (!selectedType) {
      message.error('请选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('请填写文章标题')
      return false
    } else if (selectedType === '文章类型') {
      message.error('请填写文章类型')
      return false
    } else if (!articleContent) {
      message.error('请填写文章正文')
      return false
    } else if (!introducemd) {
      message.error('请填写文章简介')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }

    let dataProps = {}
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.descript = introducemd
    dataProps.keywords = articleKeywords
    dataProps.article_img = articleImgUrl
    dataProps.addTime = new Date(showDate).getTime() / 1000
    if (selectedSNav === '文章二级栏目' || selectedSNav === undefined) {
      dataProps.nav_id = selectedSNav
    } else {
      dataProps.nav_pid = selectedNav
    }

    console.log(dataProps)
    if (articleId === 0) {
      dataProps.view_count = 0
      axios({
        method: 'post',
        url: servicePath.addArticle,
        withCredentials: true,
        data: dataProps,
      }).then((res) => {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('文章发布成功')
        } else {
          message.error('文章发布失败')
        }
      })
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success('文章修改成功')
        } else {
          message.error('文章修改失败')
        }
      })
    }
  }

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' },
    }).then((res) => {
      let articleDetail = res.data.data[0]
      console.log(articleDetail)
      setSelectNav(articleDetail.nav_pid)
      setSelectSNav(articleDetail.nav_id)
      setArticleImgUrl(articleDetail.articleImg)
      setArticleKeywords(articleDetail.keywords)
      setArticleTitle(articleDetail.title)
      setArticleContent(articleDetail.article_content)
      setIntroducemd(articleDetail.descript)
      let tmpDes = marked(articleDetail.descript)
      setIntroducehtml(tmpDes)
      setShowDate(articleDetail.addTime)
      setSelectType(articleDetail.typeId)
    })
  }

  const addImg = (file) => {
    let formData = new FormData()
    formData.append('file', file)
    console.log(formData)
    axios({
      auth: localStorage.getItem('openId'),
      method: 'post',
      url: servicePath.uploadFiles,
      withCredentials: true,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      console.log(res)
      $vm.current.$img2Url(file.name, res.data.url)
    }).catch(
      err => {
        console.log(err)
      }
    )
  }

  const getWordToEditor = (file) => {
    const fileReader = new FileReader()
    console.log(fileReader)
  }

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder='博客标题'
                size='large'
                onChange={(e) => {
                  setArticleTitle(e.target.value)
                }}
              />
            </Col>

            <Col span={4}>
              <Select
                defaultValue={selectedType}
                size='large'
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option
                      key={index}
                      value={item.Id}
                    >
                      {item.typeName}
                    </Option>
                  )
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <Select
                value={selectedNav}
                size='large'
                onChange={selectFNavHandler}
                style={{ width: '100%' }}
              >
                {fnavInfo.map((fistNav) => {
                  return (
                    <Option
                      key={fistNav.Id}
                      value={fistNav.Id}
                    >
                      {fistNav.typeName}
                    </Option>
                  )
                })}
              </Select>
            </Col>
            <Col span={12}>
              <Select
                value={selectedSNav}
                size='large'
                onChange={selectSNavHandler}
                style={{ width: '100%' }}
                allowClear
              >
                {snavInfo.map((secondNav) => {
                  return (
                    <Option
                      key={secondNav.id}
                      value={secondNav.id}
                    >
                      {secondNav.title}
                    </Option>
                  )
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <Upload {...articleImgProps}>
                {articleImgBase64 || articleImgUrl ? (
                  <img
                    src={articleImgBase64 || articleImgUrl}
                    alt={''}
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={12}>
              <Input
                type={'text'}
                size={'large'}
                placeholder={'请填写文章的关键词'}
                value={articleKeywords}
                onChange={(e) => setArticleKeywords(e.target.value)}
              />
            </Col>
          </Row>

          <br />
          <Row gutter={10}>
            <Col span={24}>
              <Editor
                ref={$vm}
                language={customLang}
                value={articleContent}
                onChange={(value) => changeContent(value)}
                addImg={($file) => addImg($file)}
                webkitdirectory
                preview
                subfield
                highlight={Hljs.highlightAuto}
              />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Input
                type='file'
                style={{ display: 'none' }}
              />
              <Button
                type='default'
                size='large'
                onClick={getWordToEditor}
              >
                导入文章
              </Button>
              &nbsp;
              <Button size='large'>暂存文章</Button>&nbsp;
              <Button
                type='primary'
                size='large'
                onClick={saveArticle}
              >
                发布文章
              </Button>
              <br />
            </Col>

            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder='文章简介'
                value={introducemd}
                onChange={changeDescript}
              />
              <br />
              <br />
              <div
                className='introduce-html'
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className='date-select'>
                <DatePicker
                  placeholder={showDate ? showDate : '发布日期'}
                  size='large'
                  onChange={(dateString) => {
                    setShowDate(dateString)
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
