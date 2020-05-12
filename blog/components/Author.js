import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar size={100} src="https://tvax4.sinaimg.cn/crop.0.0.1242.1242.180/ae8019c9ly8fqqbwqyc7vj20yi0yigql.jpg?KID=imgbed,tva&Expires=1584722768&ssig=Bmgvfivh5h" />
            </div>
            <div className="author-introduction">
                一个不断学习的前端小菜鸟 <br /> 永远不要放弃你那颗追梦之心 up up~
                <Divider>社交账号</Divider>
                <Tooltip title="https://github.com/Tonyhew">
                    <a href="https://github.com/Tonyhew" target="_blank" >
                        <Avatar size={28} icon="github" className="account" />
                    </a>
                </Tooltip>
                <Tooltip title="QQ: 916390127">
                    <Avatar size={28} icon="qq" className="account" />
                </Tooltip>
                <Tooltip title="WeChat: Tonyheweiyi">
                    <Avatar size={28} icon="wechat" className="account" />
                </Tooltip>
            </div>
        </div>
    )
}

export default Author









