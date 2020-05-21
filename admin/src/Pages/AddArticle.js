import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {

	const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState('')   //文章标题
	const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
	const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
	const [showDate, setShowDate] = useState()   //发布日期
	const [updateDate, setUpdateDate] = useState() //修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
	const [fnavInfo, setFNavInfo] = useState([]) // 文章栏目信息
	const [snavInfo, setSNavInfo] = useState([]) // 文章栏目信息
	const [selectedType, setSelectType] = useState('文章类型') //选择的文章类别
	const [selectedNav, setSelectNav] = useState('文章栏目') //选择的文章类别

	const renderer = new marked.Renderer();

	useEffect(() => {
		getTypeInfo()
		let tmpId = props.match.params.id
		if (tmpId) {
			setArticleId(tmpId)
			getArticleById(tmpId)
		}
		getAllNav()
	}, [])

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
		setArticleContent(e.target.value)
		let html = marked(e.target.value)
		setMarkdownContent(html)
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
		}).then(
			(res) => {
				if (res.data.data == '没有登录') {
					localStorage.removeItem('openId')
					props.history.push('/')
				} else {
					console.log(res)
					setTypeInfo(res.data.type)
				}
			}
		)
	}

	const getAllNav = () => {
		axios({
			method: 'get',
			url: servicePath.getFirstNav,
			withCredentials: true,
		}).then(res => {
			setFNavInfo(res.data.firstNav)
		}).then(() => {
			axios({
				method: 'get',
				url: servicePath.getSecondNav,
				withCredentials: true,
			}).then(r => {
				console.log(r)
				setSNavInfo(r.data.secondNav)
			})
		})
	}

	const selectTypeHandler = (value) => {
		setSelectType(value)
	}

	const selectFNavHandler = (value) => {
		setSelectNav(value)
		console.log(fnavInfo, snavInfo)
	}

	const selectSNavHandler = (value) => {
		setSelectNav(value)
	}

	const saveArticle = () => {
		if (!selectedType) {
			message.error('请选择文章类型')
			return false
		} else if (!articleTitle) {
			message.error('请填写文章标题')
			return false
		} else if (selectedType == '文章类型') {
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
		let dateText = showDate.replace('-', '/')
		dataProps.addTime = (new Date(showDate).getTime()) / 1000

		if (articleId == 0) {
			dataProps.view_count = 0;
			axios({
				method: 'post',
				url: servicePath.addArticle,
				withCredentials: true,
				data: dataProps
			}).then(
				(res) => {
					setArticleId(res.data.insertId)
					if (res.data.isSuccess) {
						message.success('文章保存成功')
					} else {
						message.error('文章保存失败')
					}
				}
			)
		} else {
			dataProps.id = articleId
			axios({
				method: 'post',
				url: servicePath.updateArticle,
				data: dataProps,
				withCredentials: true
			}).then(
				(res) => {
					if (res.data.isSuccess) {
						message.success('文章修改成功')
					} else {
						message.error('文章修改失败')
					}
				}
			)
		}

	}

	const getArticleById = (id) => {
		axios(servicePath.getArticleById + id, {
			withCredentials: true,
			header: { 'Access-Control-Allow-Origin': '*' }
		}).then(
			res => {
				let aticleId = res.data.data[0]
				setArticleTitle(aticleId.title)
				setArticleContent(aticleId.article_content)
				let html = marked(aticleId.article_content)
				setMarkdownContent(html)
				setIntroducemd(aticleId.descript)
				let tmpDes = marked(aticleId.descript)
				setIntroducehtml(tmpDes)
				setShowDate(aticleId.addTime)
				setSelectType(aticleId.typeId)
			}
		)
	}


	return (
		<div>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10}>
						<Col span={20}>
							<Input
								value={articleTitle}
								placeholder="博客标题"
								size="large"
								onChange={(e) => { setArticleTitle(e.target.value) }}
							/>
						</Col>

						<Col span={4}>
							&nbsp;
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
								{
									typeInfo.map((item, index) => {
										return (
											<Option key={index} value={item.Id}>{item.typeName}</Option>
										)
									})
								}
							</Select>
						</Col>
					</Row>

					<Row gutter={[10, 20]}>
						<Col span={12}>
							<Select defaultValue={selectedNav} size="large" onChange={selectFNavHandler} style={{ width: '100%' }}>
								{
									fnavInfo.map((fistNav, index) => {
										return (
											<Option key={index} value={fistNav.Id}>{fistNav.typeName}</Option>
										)
									})
								}
							</Select>
						</Col>
						<Col span={12}>
							<Select defaultValue={selectedNav} size="large" onChange={selectSNavHandler} style={{ width: '100%' }}>
								{
									snavInfo.map((secondNav, index) => {
										return (
											<Option key={index} value={secondNav.Id}>{secondNav.title}</Option>
										)
									})
								}
							</Select>
						</Col>
					</Row>

					<br />
					<Row gutter={10}>
						<Col span={12}>
							<TextArea
								className="markdown-content"
								rows={35}
								placeholder="文章内容"
								value={articleContent}
								onChange={changeContent}
							/>
						</Col>
						<Col span={12}>
							<div
								className="show-html"
								dangerouslySetInnerHTML={{ __html: markdownContent }}
							></div>
						</Col>
					</Row>
				</Col>
				<Col span={6}>
					<Row>
						<Col span={24}>
							<Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
							<br />
						</Col>

						<Col span={24}>
							<br />
							<TextArea
								rows={4}
								placeholder="文章简介"
								value={introducemd}
								onChange={changeDescript}
							></TextArea>
							<br /><br />
							<div
								className="introduce-html"
								dangerouslySetInnerHTML={{ __html: introducehtml }}
							></div>
						</Col>
						<Col span={12}>
							<div className="date-select">
								<DatePicker
									placeholder="发布日期"
									size="large"
									onChange={(date, dateString) => { setShowDate(dateString) }}
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





