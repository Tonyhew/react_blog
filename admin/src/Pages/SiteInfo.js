import React, { useState, useCallback, useEffect } from 'react'
import { Row, Col, Table, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import service from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'

const SiteInfo = () => {
  const [siteInfoList, setSiteInfoList] = useState([])

  const navigate = useNavigate()

  const getSiteInfoList = useCallback(() => {
    service({
      method: 'get',
      url: servicePath.getSiteInfo,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      const data = res.data.data
      setSiteInfoList(data)
    })
  }, [])

  useEffect(() => {
    getSiteInfoList()
  }, [getSiteInfoList])

  const siteInfoColumns = [
    {
      title: '网站标题',
      dataIndex: 'site_title',
      key: 'title',
    },
    {
      title: '网站描述',
      dataIndex: 'site_description',
      key: 'description',
    },
    {
      title: '网站关键词',
      dataIndex: 'site_keywords',
      key: 'keywords',
    },
    {
      title: '操作',
      width: 100,
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Row gutter={10}>
            <Col>
              <Button
                type={'primary'}
                onClick={() => handleClickEditTable(record.Id)}
              >
                编辑
              </Button>
            </Col>
          </Row>
        )
      },
    },
  ]

  const handleClickEditTable = (id) => {
    navigate(`/index/siteInfo/updateSiteInfo/${id}`)
  }

  return (
    <div>
      <Table
        rowKey={(record) => record}
        dataSource={siteInfoList}
        columns={siteInfoColumns}
      />
    </div>
  )
}

export default SiteInfo
