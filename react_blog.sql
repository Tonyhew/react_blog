/*
 Navicat MySQL Data Transfer

 Source Server         : my_server
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : 39.97.67.234:3306
 Source Schema         : react_blog

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 11/07/2020 13:05:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_status` int(11) NULL DEFAULT -1 COMMENT '是否启用权限 -1 启用， 1 停用',
  `create_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_role
-- ----------------------------
INSERT INTO `admin_role` VALUES (6, '管理员', -1, NULL);
INSERT INTO `admin_role` VALUES (10, '超级管理员', -1, NULL);

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  `user_status` int(4) NOT NULL DEFAULT -1 COMMENT '是否启用权限 -1 启用， 1 停用',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'tonyhew', '21e44e38da614df63495bf9e8deca15e', 10, -1);
INSERT INTO `admin_user` VALUES (6, '技术小菜鸟', '21e44e38da614df63495bf9e8deca15e', 6, -1);

-- ----------------------------
-- Table structure for blog_arctype
-- ----------------------------
DROP TABLE IF EXISTS `blog_arctype`;
CREATE TABLE `blog_arctype`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `orderNum` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型Icon',
  `status` tinyint(3) NOT NULL DEFAULT -1 COMMENT '-1: 无二级栏目, 1: 有二级栏目',
  `add_time` timestamp(0) NULL DEFAULT NULL,
  `edit_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1002 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_arctype
-- ----------------------------
INSERT INTO `blog_arctype` VALUES (1, '博客', 1, 'read', -1, '2020-06-29 14:37:13', '2020-06-29 14:37:13');
INSERT INTO `blog_arctype` VALUES (11, '生活趣事', 0, 'coffee', 1, '2020-06-27 13:36:10', NULL);

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article`  (
  `type_id` int(11) NOT NULL DEFAULT 0,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '文章标题',
  `article_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descript` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `addTime` int(11) NULL DEFAULT NULL,
  `view_count` int(11) NOT NULL DEFAULT 0,
  `nav_id` int(11) NULL DEFAULT NULL,
  `is_top` int(11) NOT NULL DEFAULT -1 COMMENT '-1：不置顶，1：置顶',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
INSERT INTO `blog_article` VALUES (1, 10, '使用js做一个无缝轮播的功能', '# 无缝轮播\n\n```\n$(function() {\n   var i = 0;\n   var clone = $(\".banner .bannerimg li\").first().clone(); //克隆第一张图片\n   $(\".banner .bannerimg\").append(clone); //把克隆好的添加上\n   var size = $(\".banner .bannerimg li\").size(); //获取图片的数量\n\n   //添加指示器\n  for(var j = 0; j < size - 1; j++) {\n     $(\".banner .num\").append(\"<li></li>\");\n  }\n\n  $(\".banner .num li\").first().addClass(\"on\");\n\n  //向左移动函数\n  function moveL() {\n    i++;\n    if(i >= size) {\n      $(\".banner .bannerimg\").css({\n        left: 0\n      });\n      i = 1;\n    }\n    $(\".banner .bannerimg\").stop().animate({\n        left: -i * 600\n    }, 500);\n    if(i == size - 1) {\n      $(\".banner .num li\").eq(0).addClass(\"on\").siblings().removeClass(\"on\");\n    } else {\n      $(\".banner .num li\").eq(i).addClass(\"on\").siblings().removeClass(\"on\");\n    }\n\n  }\n\n  //向右移动函数\n  function moveR() {\n    i--;\n    if(i < 0) {\n      $(\".banner .bannerimg\").css({\n        left: -(size - 1) * 600\n      });\n      i = size - 2;\n    }\n    $(\".banner .bannerimg\").animate({\n      left: -i * 600\n    });\n    $(\".banner .num li\").eq(i).addClass(\"on\").siblings().removeClass(\"on\");\n  \n  }\n\n  $(\".banner .num li\").hover(function() {\n    var index = $(this).index(); //获取索引值\n    i = index;\n    $(\".banner .bannerimg\").stop().animate({\n      left: -index * 600\n    }, 500);\n    $(this).addClass(\"on\").siblings().removeClass(\"on\");\n  });\n\n  //自动轮播\n  var t = setInterval(moveL, 2000);\n  $(\".banner\").hover(function() {\n    clearInterval(t);\n  }, function() {\n    t = setInterval(moveL, 2000);\n  });\n\n  $(\".banner .btnl\").click(moveR);\n  $(\".banner .btnr\").click(moveL);\n\n});\n\n```\n', '使用js做一个无缝轮播的功能', 1593064543, 3, 1, -1);
INSERT INTO `blog_article` VALUES (1, 11, '前端代码规范，你注意了吗？', '## 前端开发规范\n\n# 命名规则\n\n1. 项目命名\n   +  全部采用小写方式， 以下划线分隔。\n   + 例：my_project_name\n2. 目录命名\n     +  参照项目命名规则；\n     +  有复数结构时，要采用复数命名法。\n     +  例：scripts, styles, images, data_models\n3. JS文件命名\n     +  参照项目命名规则。\n     +  例：account_model.js\n4. CSS, SCSS文件命名\n     + 参照项目命名规则。\n     + 例：retina_sprites.scss\n5. HTML文件命名\n     + 参照项目命名规则。\n     + 例：error_report.html\n\n# JavaScript\n\n1. 缩进\n    + 使用soft tab（4个空格）。\n\n```javascript\nvar x = 1,\n      y = 1;\n\nif (x < y) {\n    x += 10;\n} else {\n    x += 1;\n}\n```\n2. 单行长度\n      + 不要超过80，但如果编辑器开启word wrap可以不考虑单行长度。\n\n3. 分号\n      +以下几种情况后需加分号:\n      + 变量声明\n      + 表达式\n      + return\n      + throw\n      + break \n      + continue\n      + do-while\n\n```js\n/* var declaration */\nvar x = 1;\n\n/* expression statement */\nx++;\n\n/* do-while */\ndo {\n    x++;\n} while (x < 10);\n```', '![前端代码规范](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3569575091,4289481112&fm=26&gp=0.jpg \"ESLint\")\n\n前端代码规范\n\n', 1593661095, 15, 1, -1);
INSERT INTO `blog_article` VALUES (1, 9, '网站上线了', '## 网站上线了\n一直想做一个属于自己的博客，可惜之前一直忙于工作，终于在拼凑的时间里开发完了属于自己的博客系统，现已经部署在阿里云上，欢迎大家访问^_^\n', '网站上线了', 1593009090, 1, 1, 1);
INSERT INTO `blog_article` VALUES (2, 14, '平常而又无聊的一天', '### 一个平常无聊的一天\n#### 9:30 - 10:30 看下公司网站及其他项目并维护\n#### 10:30 - 11:30 逛技术论坛并解决午饭问题\n#### 11:30 - 13:00 吃饭及午休\n#### 13:00 - 17:00 写BUG（不是写代码就是开会）\n#### 17:30 下班\n\n## 总结： 真无聊', '平常而又无聊的一天', 1594092225, 2, 1070, -1);

-- ----------------------------
-- Table structure for blog_secondNav
-- ----------------------------
DROP TABLE IF EXISTS `blog_secondNav`;
CREATE TABLE `blog_secondNav`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `arctype_parent_id` int(11) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `add_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1071 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_secondNav
-- ----------------------------
INSERT INTO `blog_secondNav` VALUES (1069, 11, '游记', '2020-06-30 15:41:22');
INSERT INTO `blog_secondNav` VALUES (1070, 11, '日常', '2020-07-07 11:15:30');

-- ----------------------------
-- Table structure for blog_type
-- ----------------------------
DROP TABLE IF EXISTS `blog_type`;
CREATE TABLE `blog_type`  (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `orderNum` int(11) NOT NULL DEFAULT 0,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '类型Icon',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_type
-- ----------------------------
INSERT INTO `blog_type` VALUES (1, '前端', 1, 'code');
INSERT INTO `blog_type` VALUES (2, '生活', 2, 'smile');

SET FOREIGN_KEY_CHECKS = 1;
