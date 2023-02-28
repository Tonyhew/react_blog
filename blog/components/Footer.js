import '../static/style/components/footer.css'
import Head from 'next/head'

const Footer = () => (
  <div>
    <Head>
      <script
        dangerouslySetInnerHTML={{
          __html: `var _hmt = _hmt || [];
				(function() {
					var hm = document.createElement("script");
					hm.src = "https://hm.baidu.com/hm.js?41ec25fe187e586f5c6ff25bd4e171a4";
					var s = document.getElementsByTagName("script")[0]; 
					s.parentNode.insertBefore(hm, s);
				})();`,
        }}
      />
    </Head>
    <div className='footer-div'>
      <div>系统由 React+Node+Ant Desgin驱动 </div>
      <div>
        tonyhew.com
        <span>
          <a href='http://www.beian.miit.gov.cn'>沪ICP备20019172号</a>
        </span>
      </div>
    </div>
  </div>
)

export default Footer
