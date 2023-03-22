import React, { useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Input, Button, Form, message } from 'antd'
import service from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'

const UpdateSiteInfo = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')

  const [siteInfoForm] = Form.useForm()
  const { Item } = Form
  const { TextArea } = Input

  const getSiteInfoById = useCallback(() => {
    service({
      method: 'get',
      url: servicePath.getSiteInfoById + id,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      const data = res.data.siteInfo[0]
      setTitle(data.title)
      setDescription(data.description)
      setKeywords(data.keywords)
    })
  }, [])

  useEffect(() => {
    getSiteInfoById()
  }, [getSiteInfoById])

  const params = useParams()
  const { id } = params

  useEffect(() => {
    siteInfoForm.setFieldsValue({
      title,
      description,
      keywords,
    })
  }, [siteInfoForm, title, description, keywords])

  const handleUpdateSiteInfo = () => {
    const dataProps = {
      id,
      site_title: title,
      site_description: description,
      site_keywords: keywords
    }

    service({
      method: 'post',
      url: servicePath.editSiteInfo,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      if (res.data.isSuccess) {
        message.success('网站信息修改成功')
      } else {
        message.error('网站信息修改失败')
      }
    })
    
  }

  return (
    <div style={{ width: '100%', margin: '0 auto', background: '#fff', padding: '20px' }}>
      <Form
        form={siteInfoForm}
        style={{ width: '50%', margin: '0 auto' }}
      >
        <Row gutter={10}>
          <Col span={24}>
            <Item
              label='网站标题'
              name={'title'}
            >
              <Input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder='请输入网站标题'
              />
            </Item>
          </Col>

          <Col span={24}>
            <Item
              label='网站描述'
              name={'description'}
            >
              <TextArea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='请输入网站描述'
              />
            </Item>
          </Col>

          <Col span={24}>
            <Item
              label='网站关键词'
              name={'keywords'}
            >
              <Input
                onChange={(e) => setKeywords(e.target.value)}
                value={keywords}
                placeholder='请输入网站关键词'
              />
            </Item>
          </Col>

          <Button
            type='primary'
            size={'large'}
            htmlType='submit'
            onClick={handleUpdateSiteInfo}
          >
            修改
          </Button>
        </Row>
      </Form>
    </div>
  )
}

export default UpdateSiteInfo
