# Host: localhost  (Version: 5.7.26)
# Date: 2020-06-11 16:40:44
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin_role"
#

DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `role_status` int(11) DEFAULT '-1' COMMENT '是否启用权限 -1 启用， 1 停用',
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

#
# Data for table "admin_role"
#

/*!40000 ALTER TABLE `admin_role` DISABLE KEYS */;
INSERT INTO `admin_role` VALUES (6,'管理员',-1,NULL),(10,'超级管理员',-1,NULL);
/*!40000 ALTER TABLE `admin_role` ENABLE KEYS */;

#
# Structure for table "admin_user"
#

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_status` int(4) NOT NULL DEFAULT '-1' COMMENT '是否启用权限 -1 启用， 1 停用',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "admin_user"
#

/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'tonyhew','b2d31eb2ae9c528904ccf1788402b34d',10,-1),(2,'test','b2d31eb2ae9c528904ccf1788402b34d',6,1),(5,'hhh','c862a29383ad2db913dcf8d8b63304cb',6,-1);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;

#
# Structure for table "blog_arctype"
#

DROP TABLE IF EXISTS `blog_arctype`;
CREATE TABLE `blog_arctype` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL DEFAULT '',
  `orderNum` int(11) NOT NULL DEFAULT '0',
  `icon` varchar(255) NOT NULL COMMENT '类型Icon',
  `status` tinyint(3) NOT NULL DEFAULT '-1' COMMENT '-1: 无二级栏目, 1: 有二级栏目',
  `add_time` timestamp NULL DEFAULT NULL,
  `edit_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

#
# Data for table "blog_arctype"
#

/*!40000 ALTER TABLE `blog_arctype` DISABLE KEYS */;
INSERT INTO `blog_arctype` VALUES (1,'博客',1,'youtube',-1,NULL,'2020-06-05 17:14:48'),(4,'1',2,'ie',-1,NULL,'2020-05-29 15:19:42'),(6,'ddd',0,'apple',-1,'2020-05-28 16:44:15','2020-05-29 14:09:00');
/*!40000 ALTER TABLE `blog_arctype` ENABLE KEYS */;

#
# Structure for table "blog_article"
#

DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `type_id` int(11) NOT NULL DEFAULT '0',
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '文章标题',
  `article_content` text NOT NULL,
  `descript` text,
  `addTime` int(11) DEFAULT NULL,
  `view_count` int(11) NOT NULL DEFAULT '0',
  `nav_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

#
# Data for table "blog_article"
#

/*!40000 ALTER TABLE `blog_article` DISABLE KEYS */;
INSERT INTO `blog_article` VALUES (1,1,'50元加入小密圈 胖哥带你学一年','我需要先感谢一直帮助我的小伙伴，这个博客能产出300多集免费视频，其中有他们的鼎力支持，如果没有他们的支持和鼓励，我可能早都放弃了。\r\n原来我博客只是录制免费视频，然后求30元的打赏。\r\n每次打赏我都会觉得内疚，因为我并没有给你特殊的照顾，也没能从实质上帮助过你。\r\n直到朋友给我介绍了知识星球，它可以专享加入，可以分享知识，可以解答问题，所以我如获珍宝，决定把打赏环节改为知识服务。\r\n\r\n我定价50元每年，为什么是50元每年？因为这是知识星球允许的最低收费了。\r\n\r\n\r\n<video src=\"http://newimg.jspang.com/ZhiShiXingQiu.mp4\" controls=\"controls\" width=\"100%\">\r\n</video>\r\n\r\n![VIP特权](http://newimg.jspang.com/vip_member.png)\r\n\r\n## 你付费50元能得到什么？\r\n\r\n这个是你最关心的问题，我在这里详细的说一下。\r\n\r\n1. **一起同步学习**：每天我会把我学习的内容完全的分享给你，包括自己学习的感想和资料，你完全可以跟着技术胖的学习脚本学习一年;\r\n2. **及时问题解答**: 我的微信上有5000好友，QQ上没统计过，估计更多，每天接到提问的数量都在上1000条。我目前还在工作，所以没有经历回答如此多的问题，索性我选择全部略过。但是我是非常乐意给我打赏过的人的，由于无法分辨，所以就都不回答了。有了知识星球就不一样了，只有付费用户才可以发问题，我也可以为你解答了（只回答职业性和学习性问题，不作技术解答，技术解答可以走公司顾问途径-公对公）。\r\n3. **视频下载特权**: 你可以在网盘中很容易的下载到技术胖的最新高清视频，支持手机和PC，让你随时随地就算没网络也可以快速学习。\r\n4. **所有课程5折**：既然你已经在平时帮助过胖哥，那我每年一套的收费课程，你可以享受5折，轻松就可以剩下300多元钱。\r\n5. **购买其它课程返现**：如果你需要购买极客时间、掘金小册的课程，可以管我要推广码，不仅可以优惠，我还会把我得到的佣金返还给你，这样你就会以最低的价格买到其它平台收费课程。\r\n6. **开放个人文件盘**: 我会把我的资料库毫无保留的开放给你，自己搭建的NAS盘，这就是我的宝箱，里边有软件，有游戏，有学习资料.....这就是我电脑中的全部。\r\n\r\n\r\n放下一切的思想包袱，一起加速学习，只为成为更好的程序员。扫描下方图片，立刻和胖哥开启亲密接触。\r\n\r\n\r\n\r\n\r\n\r\n### 如何一起学习\r\n\r\n当你扫完上边的码，加入知识星球以后，你会每天都收到我的学习内容和学习资料（这个就是我每天学习的内容）。\r\n\r\n内容包括两个方面：\r\n\r\n1. **软技能学习**：比如行业发展、最新技术、职场交流、品牌营销、个人学习和程序员的工作方法。\r\n2. **编程技术**：我会把我最新学习的资料分享给你，比如我现在学React源码分析，我就会把我学到的分享给你（自己的学习笔记和学习资料）。\r\n\r\n所有的学习资料都在我的NAS服务器上，你可以随时用手机或者PC进行学习，还可以轻松的下载这些资料。\r\n\r\n\r\n### 问题解答\r\n\r\n我每天下班后都会打开知识星球，花半个小时来回答你的问题。保证你的问题当天可以得到解决（但本人能力有限，不保证回答正确）。你可以问学习方法和职业上遇到的困难。\r\n\r\n\r\n\r\n总之我会尽力帮助你和我一起学习，争取在一年内有一个薪资的提升，三年内达到前端头部水平。\r\n**让我们一起加油。**\r\n\r\n## 小密圈专享课程\r\n\r\n有些知识学习不敢教，老师不敢讲，而我在这里带你一路奔跑。小蜜圈专享课程已经全面上线，**每周更新两集**。\r\n下面这些课程是小密圈内专项的，课程是文章和音频版的。专治程序员各种迷茫。\r\n\r\n### 1.程序员涨薪秘籍：\r\n\r\n1. 程序员工资涨得慢，因为你工作没超出老板的预期\r\n2. 程序员涨薪应该从这三个方面下手\r\n3. 程序员加薪前你不要踩的三个坑\r\n4. 程序员谈加薪前你要知道的三个小技巧\r\n5. 程序员跟老板面对面谈加薪的四个步骤\r\n\r\n### 2.程序员早起攻略\r\n1. 程序员早起攻略（1）-早起的意义\r\n2. 程序员早起攻略（2）-早起游戏的6大关卡\r\n\r\n### 3.为什么要每天坚持听一本书\r\n1. 为什么要每天坚持听一本书-注意力、看到的和隐藏的、重新理解自己\r\n2. 为什么要每天坚持听一本书-每本书你记住一句就够了，读书秘法传授\r\n\r\n\r\n### 4.程序员如何处理好职场师徒关系\r\n1. 程序员如何处理好职场师徒关系-1师徒关系的历史\r\n2. 程序员如何处理好职场师徒关系-2作为一个师父的基本素养\r\n3. 程序员如何处理好职场师徒关系-3如何当好一个徒弟\r\n\r\n\r\n### 5.程序员发展的三个维度（如何学习才能快速成神）\r\n1. 程序员发展的三个维度1：专业技术能力快速学习指南\r\n2. 程序员发展的三个维度2：四个展示能力让你如鱼得水\r\n3. 程序员发展的三个维度3：四种连接能力构建职业护城河\r\n\r\n### 6.程序员如何提出人人都愿意回答的问题\r\n\r\n### 7.程序员头部效应（快速成为公司争抢的程序员）\r\n1. 程序员头部效应(1)-如何作生涯决定\r\n2. 程序员头部效应(2)-如何作公司里技术最牛的人\r\n3. 程序员头部效应(3)-如何快速成为头部精英\r\n\r\n### 8.程序员跳槽攻略（程序员可以跳出精彩的人生）\r\n1. 程序员跳槽攻略(1)-跳槽的三个最佳时机\r\n2. 程序员跳槽攻略(2)-跳槽要避开的三个坑\r\n3. 程序员跳槽攻略(3)-跳槽之后的注意事项\r\n\r\n### 9.程序员请拿出互联网思维过好一生\r\n\r\n### 10.程序员精进攻略(编程技能修炼秘籍)\r\n\r\n1. 程序员精进攻略(1)-如何构建你的技能树\r\n2. 程序员精进攻略(2)-如何保持学习热情\r\n\r\n\r\n课程还在持续更新中，每周两集。','这是原来网站打赏的升级版，本博客不再接受任何打赏，而是加入一起学习。\r\n\r\n胖哥小密圈\r\n\r\n50元跟着胖哥学一年，掌握程序的学习方法。 也许你刚步入IT行业，也许你遇到了成长瓶颈，也许你不知道该学习什么知识，也许你不会融入团队，也许...........有些时候你陷入彷徨。 你需要一个强力的队友，你需要一个资深老手，你需要一个随时可以帮助你的人，你更需要一个陪你加速前行的。 我在这个行业走了12年，从后端、前端到移动端都从事过，从中走了很多坑，但我有一套适合程序员的学习方法。 如果你愿意，我将带着你在这个程序行业加速奔跑。分享我学习的方法，所学的内容和一切我的资料。 你遇到的职业问题，我也会第一时间给你解答。',1591000893,51,1),(1,2,'Vue-cli 免费视频教程','\r\n## 第1节：Vue-cli，开始吧骚年\r\n\r\n<iframe frameborder=\"0\" width=\"100%\"  src=\"https://v.qq.com/iframe/player.html?vid=w0392e8jcod&tiny=0&auto=0\" allowfullscreen></iframe>\r\n\r\n### 一、安装vue-cli\r\n安装vue-cli的前提是你已经安装了npm，安装npm你可以直接下载node的安装包进行安装。你可以在命令行工具里输入npm -v  检测你是否安装了npm和版本情况。出现版本号说明你已经安装了npm和node，我这里的npm版本为3.10.10。如果该命令不可以使用，需要安装node软件包，根据你的系统版本选择下载安装就可以了。\r\n\r\n下载地址：http://nodejs.cn/download/\r\n\r\n![alt](http://59.110.165.66/static/upload/20180823/SZaYY7F2uBUSIZFkTmwA.png)\r\n\r\nnpm没有问题，接下来我们可以用npm 命令安装vue-cli了，在命令行输入下面的命令：\r\n```\r\nnpm install vue-cli -g\r\n```\r\n- -g :代表全局安装。如果你安装时报错，一般是网络问题，你可以尝试用cnpm来进行安装。安装完成后，可以用vue \r\n- -V来进行查看 vue-cli的版本号。注意这里的V是大写的。我这里版本号是2.8.1.\r\n\r\n![alt](http://59.110.165.66/static/upload/20180823/n5JjrVPi3_ZAs8J_Qpd3.png)\r\n\r\n如果vue -V的命令管用了，说明已经顺利的把vue-cli安装到我们的计算机里了。\r\n\r\n### 二、初始化项目\r\n\r\n我们用vue init命令来初始化项目，具体看一下这条命令的使用方法。\r\n```\r\n$ vue init <template-name> <project-name>\r\n```\r\n`init`：表示我要用vue-cli来初始化项目\r\n\r\n`<template-name>`：表示模板名称，vue-cli官方为我们提供了5种模板，\r\n- webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。\r\n\r\n- webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。\r\n\r\n- browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。\r\n\r\n- browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。\r\n\r\n-simple-一个最简单的单页应用模板。\r\n\r\n`<project-name>`：标识项目名称，这个你可以根据自己的项目来起名字。\r\n\r\n在实际开发中，一般我们都会使用webpack这个模板，那我们这里也安装这个模板，在命令行输入以下命令：\r\n\r\n```\r\nvue init webpack vuecliTest\r\n```\r\n\r\n输入命令后，会询问我们几个简单的选项，我们根据自己的需要进行填写就可以了。\r\n\r\n- Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写，所以我把名称改成了vueclitest\r\n- Project description:项目描述，默认为A Vue.js project,直接回车，不用编写。\r\n-  Author：作者，如果你有配置git的作者，他会读取。\r\n- Install  vue-router? 是否安装vue的路由插件，我们这里需要安装，所以选择Y\r\n- Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格。我们这里不需要输入n，如果你是大型团队开发，最好是进行配置。\r\n- setup unit tests with  Karma + Mocha? 是否需要安装单元测试工具Karma+Mocha，我们这里不需要，所以输入n。\r\n- Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试，我们这里不需要，所以输入n。\r\n\r\n![alt](http://59.110.165.66/static/upload/20180823/BR5mygUtj2xyCPvsMnjn.png)\r\n\r\n命令行出现上面的文字，说明我们已经初始化好了第一步。命令行提示我们现在可以作的三件事情。\r\n1.  `cd vuecliTest ` 进入我们的vue项目目录。\r\n2.  `npm install ` 安装我们的项目依赖包，也就是安装package.json里的包，如果你网速不好，你也可以使用cnpm来安装。\r\n3. `npm run dev` 开发模式下运行我们的程序。给我们自动构建了开发用的服务器环境和在浏览器中打开，并实时监视我们的代码更改，即时呈现给我们。\r\n\r\n![alt](http://59.110.165.66/static/upload/20180823/AF5M_TIZHU5cdIK55Dgg.png)\r\n\r\n出现这个页面，说明我们的初始化已经成功，现在可以快乐的玩耍了。\r\n\r\n## 第2节：Vue-cli项目结构讲解\r\n\r\n<iframe frameborder=\"0\" width=\"100%\"  src=\"https://v.qq.com/iframe/player.html?vid=g0392zq9ltq&tiny=0&auto=0\" allowfullscreen></iframe>\r\n\r\nvue-cli脚手架工具就是为我们搭建了开发所需要的环境，为我们省去了很多精力。有必要对这个环境进行熟悉，我们就从项目的结构讲起。\r\n\r\n> Ps：由于版本实时更新和你选择安装的不同（这里列出的是模板为webpack的目录结构），所以你看到的有可能和下边的有所差别。\r\n\r\n```\r\n.\r\n|-- build                            // 项目构建(webpack)相关代码\r\n|   |-- build.js                     // 生产环境构建代码\r\n|   |-- check-version.js             // 检查node、npm等版本\r\n|   |-- dev-client.js                // 热重载相关\r\n|   |-- dev-server.js                // 构建本地服务器\r\n|   |-- utils.js                     // 构建工具相关\r\n|   |-- webpack.base.conf.js         // webpack基础配置\r\n|   |-- webpack.dev.conf.js          // webpack开发环境配置\r\n|   |-- webpack.prod.conf.js         // webpack生产环境配置\r\n|-- config                           // 项目开发环境配置\r\n|   |-- dev.env.js                   // 开发环境变量\r\n|   |-- index.js                     // 项目一些配置变量\r\n|   |-- prod.env.js                  // 生产环境变量\r\n|   |-- test.env.js                  // 测试环境变量\r\n|-- src                              // 源码目录\r\n|   |-- components                     // vue公共组件\r\n|   |-- store                          // vuex的状态管理\r\n|   |-- App.vue                        // 页面入口文件\r\n|   |-- main.js                        // 程序入口文件，加载各种公共组件\r\n|-- static                           // 静态文件，比如一些图片，json数据等\r\n|   |-- data                           // 群聊分析得到的数据用于数据可视化\r\n|-- .babelrc                         // ES6语法编译配置\r\n|-- .editorconfig                    // 定义代码格式\r\n|-- .gitignore                       // git上传需要忽略的文件格式\r\n|-- README.md                        // 项目说明\r\n|-- favicon.ico \r\n|-- index.html                       // 入口页面\r\n|-- package.json                     // 项目基本信息\r\n.\r\n```\r\n重要文件讲解：\r\n\r\npackage.json\r\npackage.json文件是项目根目录下的一个文件，定义该项目开发所需要的各种模块以及一些项目配置信息（如项目名称、版本、描述、作者等）。\r\n\r\npackage.json 里的scripts字段，这个字段定义了你可以用npm运行的命令。在开发环境下，在命令行工具中运行npm run dev 就相当于执行 node build/dev-server.js  .也就是开启了一个node写的开发行建议服务器。由此可以看出script字段是用来指定npm相关命令的缩写。\r\n\r\n```\r\n \"scripts\": {\r\n    \"dev\": \"node build/dev-server.js\",\r\n    \"build\": \"node build/build.js\"\r\n  },\r\n```\r\ndependencies字段和devDependencies字段\r\n- `dependencies`字段指项目运行时所依赖的模块；\r\n-  `devDependencies`字段指定了项目开发时所依赖的模块；\r\n\r\n在命令行中运行npm install命令，会自动安装dependencies和devDempendencies字段中的模块。package.json还有很多相关配置，如果你想全面了解，可以专门去百度学习一下。\r\n\r\n#### webpack配置相关\r\n\r\n我们在上面说了运行npm run dev 就相当于执行了node build/dev-server.js,说明这个文件相当重要，先来熟悉一下它。 我贴出代码并给出重要的解释。\r\n\r\ndev-server.js\r\n\r\n```\r\n// 检查 Node 和 npm 版本\r\nrequire(\'./check-versions\')()\r\n \r\n// 获取 config/index.js 的默认配置\r\nvar config = require(\'../config\')\r\n \r\n// 如果 Node 的环境无法判断当前是 dev / product 环境\r\n// 使用 config.dev.env.NODE_ENV 作为当前的环境\r\n \r\nif (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)\r\n \r\n// 使用 NodeJS 自带的文件路径工具\r\nvar path = require(\'path\')\r\n \r\n// 使用 express\r\nvar express = require(\'express\')\r\n \r\n// 使用 webpack\r\nvar webpack = require(\'webpack\')\r\n \r\n// 一个可以强制打开浏览器并跳转到指定 url 的插件\r\nvar opn = require(\'opn\')\r\n \r\n// 使用 proxyTable\r\nvar proxyMiddleware = require(\'http-proxy-middleware\')\r\n \r\n// 使用 dev 环境的 webpack 配置\r\nvar webpackConfig = require(\'./webpack.dev.conf\')\r\n \r\n// default port where dev server listens for incoming traffic\r\n \r\n// 如果没有指定运行端口，使用 config.dev.port 作为运行端口\r\nvar port = process.env.PORT || config.dev.port\r\n \r\n// Define HTTP proxies to your custom API backend\r\n// https://github.com/chimurai/http-proxy-middleware\r\n \r\n// 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置\r\nvar proxyTable = config.dev.proxyTable\r\n \r\n// 使用 express 启动一个服务\r\nvar app = express()\r\n \r\n// 启动 webpack 进行编译\r\nvar compiler = webpack(webpackConfig)\r\n \r\n// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中\r\nvar devMiddleware = require(\'webpack-dev-middleware\')(compiler, {\r\n  publicPath: webpackConfig.output.publicPath,\r\n  stats: {\r\n    colors: true,\r\n    chunks: false\r\n  }\r\n})\r\n \r\n// 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload\r\nvar hotMiddleware = require(\'webpack-hot-middleware\')(compiler)\r\n// force page reload when html-webpack-plugin template changes\r\ncompiler.plugin(\'compilation\', function (compilation) {\r\n  compilation.plugin(\'html-webpack-plugin-after-emit\', function (data, cb) {\r\n    hotMiddleware.publish({ action: \'reload\' })\r\n    cb()\r\n  })\r\n})\r\n \r\n// proxy api requests\r\n// 将 proxyTable 中的请求配置挂在到启动的 express 服务上\r\nObject.keys(proxyTable).forEach(function (context) {\r\n  var options = proxyTable[context]\r\n  if (typeof options === \'string\') {\r\n    options = { target: options }\r\n  }\r\n  app.use(proxyMiddleware(context, options))\r\n})\r\n \r\n// handle fallback for HTML5 history API\r\n// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址\r\napp.use(require(\'connect-history-api-fallback\')())\r\n \r\n// serve webpack bundle output\r\n// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上\r\napp.use(devMiddleware)\r\n \r\n// enable hot-reload and state-preserving\r\n// compilation error display\r\n// 将 Hot-reload 挂在到 express 服务上\r\napp.use(hotMiddleware)\r\n \r\n// serve pure static assets\r\n// 拼接 static 文件夹的静态资源路径\r\nvar staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)\r\n// 为静态资源提供响应服务\r\napp.use(staticPath, express.static(\'./static\'))\r\n \r\n// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露\r\nmodule.exports = app.listen(port, function (err) {\r\n  if (err) {\r\n    console.log(err)\r\n    return\r\n  }\r\n  var uri = \'http://localhost:\' + port\r\n  console.log(\'Listening at \' + uri + \'\\n\')\r\n \r\n  // when env is testing, don\'t need open it\r\n  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址\r\n  if (process.env.NODE_ENV !== \'testing\') {\r\n    opn(uri)\r\n  }\r\n})\r\n```\r\nwebpack.base.confg.js   webpack的基础配置文件\r\n\r\n```\r\n...\r\n...\r\nmodule.export = {\r\n    // 编译入口文件\r\n    entry: {},\r\n    // 编译输出路径\r\n    output: {},\r\n    // 一些解决方案配置\r\n    resolve: {},\r\n    resolveLoader: {},\r\n    module: {\r\n        // 各种不同类型文件加载器配置\r\n        loaders: {\r\n        ...\r\n        ...\r\n        // js文件用babel转码\r\n        {\r\n            test: /\\.js$/,\r\n            loader: \'babel\',\r\n            include: projectRoot,\r\n            // 哪些文件不需要转码\r\n            exclude: /node_modules/\r\n        },\r\n        ...\r\n        ...\r\n        }\r\n    },\r\n    // vue文件一些相关配置\r\n    vue: {}\r\n}\r\n```\r\n这里有很多webpack的知识，我也有一个专门讲webpack的视频教程.\r\n\r\n#### .babelrc\r\nBabel解释器的配置文件，存放在根目录下。Babel是一个转码器，项目里需要用它将ES6代码转为ES5代码。如果你想了解更多，可以查看babel的知识。\r\n\r\n```\r\n{\r\n  //设定转码规则\r\n  \"presets\": [\r\n    [\"env\", { \"modules\": false }],\r\n    \"stage-2\"\r\n  ],\r\n  //转码用的插件\r\n  \"plugins\": [\"transform-runtime\"],\r\n  \"comments\": false,\r\n  //对BABEL_ENV或者NODE_ENV指定的不同的环境变量，进行不同的编译操作\r\n  \"env\": {\r\n    \"test\": {\r\n      \"presets\": [\"env\", \"stage-2\"],\r\n      \"plugins\": [ \"istanbul\" ]\r\n    }\r\n  }\r\n}\r\n```\r\n#### .editorconfig\r\n\r\n该文件定义项目的编码规范，编译器的行为会与.editorconfig文件中定义的一致，并且其优先级比编译器自身的设置要高，这在多人合作开发项目时十分有用而且必要。\r\n\r\n```\r\nroot = true\r\n \r\n[*]    // 对所有文件应用下面的规则\r\ncharset = utf-8                    // 编码规则用utf-8\r\nindent_style = space               // 缩进用空格\r\nindent_size = 2                    // 缩进数量为2个空格\r\nend_of_line = lf                   // 换行符格式\r\ninsert_final_newline = true        // 是否在文件的最后插入一个空行\r\ntrim_trailing_whitespace = true    // 是否删除行尾的空格\r\n```\r\n这是比较重要的关于vue-cli的配置文件，当然还有很多文件，我们会在以后的文章中讲解。\r\n\r\n## 第3节：解读Vue-cli的模板\r\n\r\n我们通过两节课的讲解，你对vue-cli应该有了基本的了解，这节我们主要了解一下Vue-cli的模板操作，包括增加模板，修改模板，以及一个常规模板的基本结构。\r\n\r\n<iframe frameborder=\"0\" width=\"100%\"  src=\"https://v.qq.com/iframe/player.html?vid=d0392v00bcl&tiny=0&auto=0\" allowfullscreen></iframe>\r\n\r\n### 一、npm run build 命令\r\n\r\n有小伙伴问我，如何把写好的Vue网页放到服务器上，那我就在这里讲解一下，主要的命令就是要用到npm run build 命令。我们在命令行中输入npm run build命令后，vue-cli会自动进行项目发布打包。你在package.json文件的scripts字段中可以看出，你执行的npm run build命令就相对执行的 node build/build.js 。\r\n\r\npackage.json的scripts 字段：\r\n\r\n```\r\n \"scripts\": {\r\n    \"dev\": \"node build/dev-server.js\",\r\n    \"build\": \"node build/build.js\"\r\n  },\r\n```\r\n在执行完npm run build命令后，在你的项目根目录生成了dist文件夹，这个文件夹里边就是我们要传到服务器上的文件。\r\n\r\ndist文件夹下目录包括：\r\n- `index.html `主页文件:因为我们开发的是单页web应用，所以说一般只有一个html文件。\r\n- static 静态资源文件夹：里边js、CSS和一些图片。\r\n\r\n### 二、main.js文件解读\r\n\r\nmain.js是整个项目的入口文件,在src文件夹下：\r\n\r\n```\r\nimport Vue from \'vue\'      \r\nimport App from \'./App\'\r\nimport router from \'./router\'\r\n \r\nVue.config.productionTip = false   //生产环境提示，这里设置成了false\r\n \r\n/* eslint-disable no-new */\r\nnew Vue({\r\n  el: \'#app\',\r\n  router,\r\n  template: \'<App/>\',\r\n  components: { App }\r\n})\r\n```\r\n通过代码可以看出这里引进了App的组件和<App/>的模板，它是通过 import App from ‘./App’这句代码引入的。  我们找到App.vue文件，打开查看。\r\n\r\n### App.vue文件:\r\n\r\n```\r\n<template>\r\n  <div id=\"app\">\r\n    <img src=\"./assets/logo.png\">\r\n    <router-view></router-view>\r\n  </div>\r\n</template>\r\n \r\n<script>\r\nexport default {\r\n  name: \'app\'\r\n}\r\n</script>\r\n \r\n<style>\r\n#app {\r\n  font-family: \'Avenir\', Helvetica, Arial, sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  text-align: center;\r\n  color: #2c3e50;\r\n  margin-top: 60px;\r\n}\r\n</style>\r\n```\r\napp.vue文件我们可以分成三部分解读，\r\n\r\n-  `<template></template>`标签包裹的内容：这是模板的HTMLDom结构，里边引入了一张图片和`<router-view></router-view>`标签，`<router-view>`标签说明使用了路由机制。我们会在以后专门拿出一篇文章讲Vue-router。\r\n- `<script></script>`标签包括的js内容：你可以在这里些一些页面的动态效果和Vue的逻辑代码。\r\n- `<style></style>`标签包裹的css内容：这里就是你平时写的CSS样式，对页面样子进行装饰用的，需要特别说明的是你可以用`<style scoped></style>`来声明这些css样式只在本模板中起作用。\r\n\r\n### 四、router/index.js 路由文件\r\n\r\n引文在app.vue中我们看到了路由文件，虽然router的内容比较多，但是我们先简单的看一下。下篇文章我们就开始讲Vue-router。\r\n\r\n```\r\nimport Vue from \'vue\'\r\nimport Router from \'vue-router\'\r\nimport Hello from \'@/components/Hello\'\r\n \r\nVue.use(Router)\r\n \r\nexport default new Router({\r\n  routes: [\r\n    {\r\n      path: \'/\',\r\n      name: \'Hello\',\r\n      component: Hello\r\n    }\r\n  ]\r\n})\r\n```\r\n我们可以看到 import Hello from ‘@/components/Hello’这句话， 文件引入了/components/Hello.vue文件。这个文件里就配置了一个路由，就是当我们访问网站时给我们显示Hello.vue的内容。\r\n\r\n### 五、Hello.vue文件解读：\r\n\r\n这个文件就是我们在第一节课看到的页面文件了。也是分为`<template><script><style>`三个部分，以后我们大部分的工作都是写这些.vue结尾的文件。现在我们可以试着改一些内容，然后预览一下。\r\n\r\n```\r\n<template>\r\n  <div class=\"hello\">\r\n    <h1>{{ msg }}</h1>\r\n    <h2>Essential Links</h2>\r\n    <ul>\r\n      <li><a href=\"https://vuejs.org\" target=\"_blank\">Core Docs</a></li>\r\n      <li><a href=\"https://forum.vuejs.org\" target=\"_blank\">Forum</a></li>\r\n      <li><a href=\"https://gitter.im/vuejs/vue\" target=\"_blank\">Gitter Chat</a></li>\r\n      <li><a href=\"https://twitter.com/vuejs\" target=\"_blank\">Twitter</a></li>\r\n      <br>\r\n      <li><a href=\"http://vuejs-templates.github.io/webpack/\" target=\"_blank\">Docs for This Template</a></li>\r\n    </ul>\r\n    <h2>Ecosystem</h2>\r\n    <ul>\r\n      <li><a href=\"http://router.vuejs.org/\" target=\"_blank\">vue-router</a></li>\r\n      <li><a href=\"http://vuex.vuejs.org/\" target=\"_blank\">vuex</a></li>\r\n      <li><a href=\"http://vue-loader.vuejs.org/\" target=\"_blank\">vue-loader</a></li>\r\n      <li><a href=\"https://github.com/vuejs/awesome-vue\" target=\"_blank\">awesome-vue</a></li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n \r\n<script>\r\nexport default {\r\n  name: \'hello\',\r\n  data () {\r\n    return {\r\n      msg: \'Welcome to Your Vue.js App\'\r\n    }\r\n  }\r\n}\r\n</script>\r\n \r\n<!-- Add \"scoped\" attribute to limit CSS to this component only -->\r\n<style scoped>\r\nh1, h2 {\r\n  font-weight: normal;\r\n}\r\n \r\nul {\r\n  list-style-type: none;\r\n  padding: 0;\r\n}\r\n \r\nli {\r\n  display: inline-block;\r\n  margin: 0 10px;\r\n}\r\n \r\na {\r\n  color: #42b983;\r\n}\r\n</style>\r\n```\r\n\r\n\r\n总结：\r\n这个教程只是带着你大概浏览和重点讲解了vue-cli的知识，如果你想完全弄明白vue-cli，我建议最好是有调理的阅读所有代码，这对你以后成为vue实际项目 的开发很有帮助。如果你是一个初学者，了解这些已经足够向下学习了。这篇教程结束后，我们会学习vue-router的知识，vue-router是一个重点学习任务，我会竭尽所能把路由的知识都讲透。很高兴大家能和我一起学习，我们下篇教程见了。\r\n','Vue-cli是vue官方出品的快速构建单页应用的脚手架，如果你是初次尝试Vue，我不建议使用，推荐你老老实实用普通引入javascript文件的方式进行学习（你可以去看我的vue视频教程的1-4季），这里牵扯的东西很多，有webpack，npm，nodejs，babel等等，很容易产生从入门就放弃的思想。',1591000748,2540,6),(3,5,'dsfsfd','的说法是奋斗胜多负少的方式的','的士速递时代大厦多所群二',1591683410,0,4),(2,7,'eeeeee','sdf','d',1591000312,0,4);
/*!40000 ALTER TABLE `blog_article` ENABLE KEYS */;

#
# Structure for table "blog_secondnav"
#

DROP TABLE IF EXISTS `blog_secondnav`;
CREATE TABLE `blog_secondnav` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `arctype_parent_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=1069 DEFAULT CHARSET=utf8;

#
# Data for table "blog_secondnav"
#

/*!40000 ALTER TABLE `blog_secondnav` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_secondnav` ENABLE KEYS */;

#
# Structure for table "blog_type"
#

DROP TABLE IF EXISTS `blog_type`;
CREATE TABLE `blog_type` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) NOT NULL DEFAULT '',
  `orderNum` int(11) NOT NULL DEFAULT '0',
  `icon` varchar(255) NOT NULL COMMENT '类型Icon',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Data for table "blog_type"
#

/*!40000 ALTER TABLE `blog_type` DISABLE KEYS */;
INSERT INTO `blog_type` VALUES (1,'视频教程',1,'youtube'),(2,'生活',2,'smile'),(3,'大胖逼逼叨',3,'message');
/*!40000 ALTER TABLE `blog_type` ENABLE KEYS */;
