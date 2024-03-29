import React, { useState, useEffect } from 'react'
import axios from '../config/AxiosConfig'
import servicePath from '../config/apiUrl'
import { Doughnut } from 'react-chartjs-2'
import '../static/css/Index.css'

const Index = () => {

  const [typeName, setTypeName] = useState([])
  const [count, setCount] = useState([])

  useEffect(() => {
    getValueArticle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getValueArticle = () => {
    axios({
      method: 'get',
      url: servicePath.countArticleValue,
      withCredentials: true,
      header: { 'Acess-Control-Allow-Origin': '*' },
    }).then((res) => {
      let result = res.data.countArt
      var dataA = result.reduce((res, v) => {
        Object.keys(v).forEach((key) => {
          const value = v[key]
          if (res[key]) res[key].push(value)
          else res[key] = [value]
        })
        return res
      }, {})
      setTypeName(dataA.typeName)
      setCount(dataA.Count)
    })
  }

  const data = {
    datasets: [
      {
        data: count ? count : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: typeName,
  }
  return (
    <div className='chart_index'>
      <div
        className='chart_left'
        style={{ padding: 24, background: '#fff' }}
      >
        <p>统计文章</p>
        <Doughnut
          data={data}
          width={600}
          height={300}
        />
      </div>
    </div>
  )
}

export default Index
