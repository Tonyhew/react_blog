import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import { Avatar, Divider, Tooltip } from 'antd'
import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className='author-div comm-box'>
      <div>
        <Avatar
          size={100}
          src='https://img.tonyhew.com/DEAE984C-B137-4C4D-BE76-42FD2FD4F911_1_105_c.jpeg'
        />
      </div>
      <div className='author-introduction'>
        一个不断学习的前端小菜鸟 <br /> 永远不要放弃你那颗追梦之心 up up~
        <Divider>社交账号</Divider>
        <Tooltip title='https://github.com/Tonyhew'>
          <a
            href='https://github.com/Tonyhew'
            target='_blank'
          >
            <Avatar
              size={28}
              icon={<GithubOutlined />}
              className='account'
            />
          </a>
        </Tooltip>
        <Tooltip title='QQ: 916390127'>
          <Avatar
            size={28}
            icon={<QqOutlined />}
            className='account'
          />
        </Tooltip>
        <Tooltip title='WeChat: Tonyheweiyi'>
          <Avatar
            size={28}
            icon={<WechatOutlined />}
            className='account'
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default Author
