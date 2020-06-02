import React, { useState, useEffect } from 'react'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { Doughnut } from 'react-chartjs-2'
import '../static/css/Index.css'

function Index(props) {
	const [typeName, setTypeName] = useState([])
	const [count, setCount] = useState([])

	useEffect(() => {
		getValueArticle()
	}, [])

	const getValueArticle = () => {
		axios({
			method: 'get',
			url: servicePath.countArticleValue,
			withCredentials: true,
			header: { 'Acess-Control-Allow-Origin': '*' }
		}).then(
			(res) => {
				if (res.data.data == '没有登录') {
					localStorage.removeItem('openId')
					props.history.push('/')
				} else {
					let result = res.data.countArt
					console.log(result)
					for (let item in result) {
						console.log(result[item].typeName)
						var dataA = result.reduce((res, v) => {
							Object.keys(v).forEach(key => {
								const value = v[key];
								if (res[key]) res[key].push(value);
								else res[key] = [value];
							})
							return res;
						}, {});
						console.log(dataA)
						setTypeName(dataA.typeName)
						setCount(dataA.Count)
					}
				}

			}
		)
	}

	const data = {
		datasets: [{
			data: count,
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
		}],

		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: typeName
	}
	return (
		<div className='chart_index'>
			<div className='chart_left' style={{ padding: 24, background: '#fff' }}>
				<p>统计文章</p>
				<Doughnut data={data} width={600} height={300} />
			</div>
		</div>
	)

}


export default Index

















