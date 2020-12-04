/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : vueadmin

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 03/12/2020 14:33:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `option1` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `option2` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `option3` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `option4` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES (1, '以下关于HTML说法正确的是', 'HTML是用来描述网页的一种语言', 'HTML是用来描述数据库的一种语言', 'HTML使用来描述天文的一种语言', '以上都不是', 'HTML是用来描述网页的一种语言');
INSERT INTO `test` VALUES (2, '以下关于W3C的说法不正确的是', 'W3C的工作是对web进行标准化', 'W3C创建并维护WWW标准', 'W3C创建于2000年', 'W3C是一个会员组织', 'W3C创建于2000年');
INSERT INTO `test` VALUES (3, 'HTML是使用（ ）来描述网页', '数字', '标记标签', '罗马文', '英文单词', '标记标签');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 70 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'iharvey', 'e10adc3949ba59abbe56e057f20f883e', '17058669400', '1', 'sed77@gmail.com', '1');
INSERT INTO `user` VALUES (2, 'kayli.kozey', '21218cca77804d2ba1922c33e0151105', '17862914125', '1', 'dignissimos93@hotmail.com', '1');
INSERT INTO `user` VALUES (3, 'wkoch', '123456', '15716960342', '2', 'nulla01@hotmail.com', '2');
INSERT INTO `user` VALUES (4, 'schuster.gloria', '123456', '15593110071', '3', 'explicabo.voluptatem@hotmail.com', '2');
INSERT INTO `user` VALUES (5, 'gaylord.ferne', '123456', '18099558683', '2', 'zdoloremque@yahoo.com', '2');
INSERT INTO `user` VALUES (6, 'lmacejkovic', '123456', '14763595992', '1', 'reprehenderit_facilis@qq.com', '2');
INSERT INTO `user` VALUES (7, 'lolita85', '123456', '13859729806', '3', 'wreiciendis@163.com', '1');
INSERT INTO `user` VALUES (8, 'tschultz', '123456', '13736960523', '2', 'vel.magni@sina.com', '2');
INSERT INTO `user` VALUES (9, 'toy.rodolfo', '123456', '15063369801', '3', 'assumenda.ipsam@126.com', '1');
INSERT INTO `user` VALUES (10, 'gus.veum', '123456', '13753529317', '3', 'accusantium.blanditiis@yahoo.com', '1');
INSERT INTO `user` VALUES (11, 'doyle.declan', '123456', '18761834028', '1', 'saepe85@sina.com', '1');
INSERT INTO `user` VALUES (12, 'ewilkinson', '123456', '17189946083', '2', 'error71@yahoo.com', '1');
INSERT INTO `user` VALUES (13, 'dietrich.tanya', '123456', '13202669342', '3', 'eos.vitae@yahoo.com', '2');
INSERT INTO `user` VALUES (14, 'shyann92', '123456', '18064671081', '3', 'enim_corporis@163.com', '2');
INSERT INTO `user` VALUES (15, 'quigley.anika', '123456', '17693072463', '1', 'punde@yahoo.com', '1');
INSERT INTO `user` VALUES (16, 'webster.casper', '123456', '13559656631', '2', 'repellendus13@sina.com', '1');
INSERT INTO `user` VALUES (17, 'blaise13', '123456', '17038310186', '2', 'alias.dolor@sina.com', '1');
INSERT INTO `user` VALUES (18, 'borer.brett', '123456', '13317376743', '3', 'vitae_eum@sina.com', '1');
INSERT INTO `user` VALUES (19, 'melyssa38', '123456', '13217219601', '1', 'sunt_consequatur@yahoo.com', '1');
INSERT INTO `user` VALUES (20, 'zsporer', '123456', '13774596911', '2', 'expedita.perspiciatis@gmail.com', '1');
INSERT INTO `user` VALUES (21, 'eleonore24', '123456', '17105197574', '2', 'vomnis@yahoo.com', '1');
INSERT INTO `user` VALUES (22, 'hank.pouros', '123456', '13846232396', '3', 'arerum@qq.com', '1');
INSERT INTO `user` VALUES (23, 'kgoldner', '123456', '15648597750', '1', 'nulla62@hotmail.com', '2');
INSERT INTO `user` VALUES (24, 'dicki.emory', '123456', '13333935070', '3', 'facilis.sint@163.com', '1');
INSERT INTO `user` VALUES (25, 'dnicolas', '123456', '18271658158', '1', 'corrupti44@gmail.com', '1');
INSERT INTO `user` VALUES (26, 'myles67', '123456', '15322859152', '1', 'educimus@163.com', '1');
INSERT INTO `user` VALUES (27, 'wisoky.bart', '123456', '13806320302', '2', 'autem.sed@qq.com', '1');
INSERT INTO `user` VALUES (28, 'abdullah24', '123456', '18700918709', '3', 'rerum.voluptas@126.com', '1');
INSERT INTO `user` VALUES (29, 'eden.durgan', '123456', '15798036365', '2', 'voluptas46@yahoo.com', '1');
INSERT INTO `user` VALUES (30, 'vivienne89', '123456', '13743006547', '2', 'mqui@126.com', '2');
INSERT INTO `user` VALUES (31, 'hmraz', '123456', '17193158121', '1', 'iquod@126.com', '1');
INSERT INTO `user` VALUES (32, 'orrin20', '123456', '13263172797', '3', 'et_unde@qq.com', '1');
INSERT INTO `user` VALUES (33, 'kelli.gusikowski', '123456', '18465499461', '2', 'et_non@hotmail.com', '1');
INSERT INTO `user` VALUES (34, 'genesis.thiel', '123456', '13008556254', '3', 'aut26@sina.com', '2');
INSERT INTO `user` VALUES (35, 'langosh.kennedi', '123456', '15959272376', '2', 'tperspiciatis@gmail.com', '1');
INSERT INTO `user` VALUES (36, 'laverna.gutkowski', '123456', '18559760273', '2', 'et.eum@163.com', '1');
INSERT INTO `user` VALUES (37, 'douglas.estrella', '123456', '17142543247', '3', 'kdolores@163.com', '1');
INSERT INTO `user` VALUES (38, 'tremayne.pacocha', '123456', '17006493732', '3', 'magnam_quidem@163.com', '1');
INSERT INTO `user` VALUES (39, 'jmurphy', '123456', '15045650511', '1', 'aperiam_velit@sohu.com', '1');
INSERT INTO `user` VALUES (40, 'lester68', '123456', '15710968796', '1', 'quis.eveniet@yahoo.com', '2');
INSERT INTO `user` VALUES (41, 'llewellyn.orn', '123456', '18990856863', '2', 'qui.quam@163.com', '2');
INSERT INTO `user` VALUES (42, 'magdalen.flatley', '123456', '13571149435', '1', 'earum.voluptate@sohu.com', '1');
INSERT INTO `user` VALUES (43, 'fabian83', '123456', '17197795857', '1', 'eos.quibusdam@qq.com', '2');
INSERT INTO `user` VALUES (44, 'zbins', '123456', '15659226807', '1', 'neum@sina.com', '2');
INSERT INTO `user` VALUES (45, 'anya46', '123456', '13429118171', '2', 'ea.ut@sohu.com', '1');
INSERT INTO `user` VALUES (46, 'warren.stark', '123456', '14525027841', '3', 'veniam_consequatur@163.com', '1');
INSERT INTO `user` VALUES (47, 'constantin.kertzmann', '123456', '15142435196', '3', 'wdolor@yahoo.com', '2');
INSERT INTO `user` VALUES (48, 'elisabeth.will', '123456', '13194390301', '1', 'esed@sina.com', '2');
INSERT INTO `user` VALUES (49, 'dcormier', '123456', '18970433151', '3', 'minima.quibusdam@sina.com', '2');
INSERT INTO `user` VALUES (50, 'heaney.jenifer', '123456', '18176087244', '3', 'dignissimos_aut@126.com', '1');
INSERT INTO `user` VALUES (54, 'sd', 'e10adc3949ba59abbe56e057f20f883e', '13003446983', '1', 'et21@gmail.com', '1');
INSERT INTO `user` VALUES (55, 'ddddddd', 'e10adc3949ba59abbe56e057f20f883e', '17085903963', '3', 'exercitationem53@qq.com', '1');
INSERT INTO `user` VALUES (59, 'dsfsdf', 'b73900bd0a5b655258767ccc2ebdb291', '222', '1', 'dss@qq.cp', '2');
INSERT INTO `user` VALUES (61, 'shuhongfan', 'e10adc3949ba59abbe56e057f20f883e', '13437777777', '1', 'sss@qq.com', '1');
INSERT INTO `user` VALUES (62, 'erwrwr', '96e79218965eb72c92a549dd5a330112', '13111111111', '2', 'ss@ss.ss', '2');
INSERT INTO `user` VALUES (63, 'dfsf', 'e3ceb5881a0a1fdaad01296d7554868d', '13222222222', '1', '22@11.cc', '1');
INSERT INTO `user` VALUES (64, '32423', '5b1b68a9abf4d2cd155c81a9225fd158', '13333333333', '2', 'rr@ee.c', '1');
INSERT INTO `user` VALUES (65, '2432', '3c9857798a0f7d6128d3c292102b5730', NULL, NULL, NULL, '1');
INSERT INTO `user` VALUES (66, 'sss', '2c1345266586836c9ba400f7f60a5be7', NULL, NULL, NULL, '1');
INSERT INTO `user` VALUES (67, 'sdsda', '5583e713b0c04b10260f36ed3d95ad3a', NULL, NULL, NULL, '1');
INSERT INTO `user` VALUES (68, 'erwr', 'cd6a1a15421189de23d7309feebff8d7', NULL, NULL, NULL, '1');
INSERT INTO `user` VALUES (69, '123456', 'e10adc3949ba59abbe56e057f20f883e', '13431111111', '1', 'ss@ss.ss', '1');
INSERT INTO `user` VALUES (70, 'hahaha', 'e10adc3949ba59abbe56e057f20f883e', '13433333333', '1', 'ss@aa.c', '2');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `videourl` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `time` datetime(0) NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `download` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `download_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES (1, 'http://yun.itheima.com/Upload/Images/20191106/5dc26f828bb96.jpg', 'http://v.itheima.com/QDXB-HTML5+CSS3/01-%E5%9F%BA%E7%A1%80%E7%8F%AD%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.mp4', '2020-12-01 16:32:38', '前端小白零基础入门HTML5+CSS3', 'https://pan.baidu.com/s/1uoDLADpUXIilfo6EAaz71g', 'n0hz');
INSERT INTO `video` VALUES (2, 'http://yun.itheima.com/Upload/Images/20170809/598ad70525c4f.jpg', 'http://v.itheima.com/webQDRM/01CSS%E4%BA%A7%E7%94%9F%E7%9A%84%E5%8E%9F%E5%9B%A0.mp4', '2020-11-11 16:32:38', 'Web前端html+css+JavaScript', 'https://pan.baidu.com/s/1neSGVfBje-SVrcWGih89FA', '无');
INSERT INTO `video` VALUES (3, 'http://yun.itheima.com/Upload/Images/20190715/5d2c343131c17.jpg', 'http://v.itheima.com/js/01-%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80%E5%AF%BC%E8%AF%BB.mp4', '2020-10-28 16:32:38', 'javaScript零基础通关必备教程', 'https://pan.baidu.com/share/init?https://pan.baidu.com/s/1Xn0tEF3WzLnXWjx0WxFjsQ', 'zz7y');
INSERT INTO `video` VALUES (4, 'http://yun.itheima.com/Upload/Images/20191022/5daec5af4b16f.jpg', 'http://v.itheima.com/0jcwzwxxcx/01-%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4', '2020-09-17 16:32:38', '零基础玩转微信小程序', 'https://pan.baidu.com/s/1QAlEanZbl74B-IPuwB43PA', 'q5x5');
INSERT INTO `video` VALUES (6, 'http://yun.itheima.com/Upload/Images/20190708/5d2306fac306b.jpg', 'http://v.itheima.com/JSdombom/01-Web%20APIs%E7%AE%80%E4%BB%8B%E5%AF%BC%E8%AF%BB.mp4', '2020-12-02 22:55:00', 'JavaScript核心 DOM BOM操作', 'https://pan.baidu.com/s/1AwIcQPDILJT1mqdhXG2wqA', 'n01c');
INSERT INTO `video` VALUES (5, 'http://yun.itheima.com/Upload/Images/20190729/5d3e9d35a60a9.jpg', 'http://v.itheima.com/jQ/1-01-jQuery%E5%85%A5%E9%97%A8%E5%AF%BC%E8%AF%BB.mp4', '2020-12-02 22:53:29', 'jQuery网页开发案例精讲', 'https://pan.baidu.com/s/1yV7ARuB-LeK77-_XHm-5CA', '4d71');
INSERT INTO `video` VALUES (7, 'http://yun.itheima.com/Upload/Images/20200803/5f278014a7d7b.jpeg', 'http://v.itheima.com/web/%E5%8F%AF%E8%A7%86%E5%8C%96/01_%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 22:56:01', '6天玩转电子商务数据可视化项目', 'https://pan.baidu.com/s/13jj99G7-FVQm5a_YbyRokA', '5hag');
INSERT INTO `video` VALUES (8, 'http://yun.itheima.com/Upload/Images/20200715/5f0e7131c9359.jpg', 'http://v.itheima.com/%E5%89%8D%E7%AB%AF/typescript/0.%E5%AF%BC%E8%AF%BB.mp4', '2020-12-02 22:56:51', '5天零基础学会Typescript', 'https://pan.baidu.com/s/1asoA4MwoDH1VXJ83gvIX1g', '7z8l');
INSERT INTO `video` VALUES (9, 'http://yun.itheima.com/Upload/Images/20190801/5d42a67f194b7.jpg', 'http://v.itheima.com/JSjjES6/01-JavaScript.mp4', '2020-12-02 22:57:33', 'javaScript进阶面向对象ES6', 'https://pan.baidu.com/s/1AVNgcRF_zVftsOU6nL21CQ', 'ys1q');
INSERT INTO `video` VALUES (10, 'http://yun.itheima.com/Upload/Images/20200330/5e815eb153a66.jpg', 'http://v.itheima.com/qdlqVUEkfxcx/01-uni-app%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 22:58:09', 'vue开发微信小程序(uni-app)', 'https://pan.baidu.com/s/1_wIL3rQqdZ_OZg58mtuH7g', 'i2gh');
INSERT INTO `video` VALUES (11, 'http://yun.itheima.com/Upload/Images/20180315/5aaa302f5fe9c.jpg', 'http://v.itheima.com/2018YDwebJJ/01-%E7%A7%BB%E5%8A%A8web-%E4%B8%BA%E4%BB%80%E4%B9%88%E5%AD%A6%E4%B9%A0%E7%A7%BB%E5%8A%A8web%E5%BC%80%E5%8F%91.mp4', '2020-12-02 22:58:49', '2018移动web进阶教程', 'https://pan.baidu.com/s/1CTDgP3ioFHAiFBhqXgItzw', 'kj1p');
INSERT INTO `video` VALUES (12, 'http://yun.itheima.com/Upload/Images/20180315/5aaa2ba7254e4.jpg', 'http://v.itheima.com/Html5+Css3yqrs/01-HTML5CSS3-%E9%98%B6%E6%AE%B5%E4%BB%BB%E5%8A%A1%E8%AF%B4%E6%98%8E.mp4', '2020-12-02 22:59:28', '2018版Html5+Css3由浅入深教程', 'https://pan.baidu.com/s/17B187RZYzk1hCWiAH6Wq2g', '04t3');
INSERT INTO `video` VALUES (13, 'http://yun.itheima.com/Upload/Images/20171010/59dc2eba3efff.jpg', 'http://v.itheima.com/AjaxCRMDJT/01.%E5%88%9D%E8%AF%86Ajax.mp4', '2020-12-02 23:00:05', 'Ajax从入门到精通', 'https://pan.baidu.com/s/1-yytOOZerNdj87HvTeqkHA', '0fwc');
INSERT INTO `video` VALUES (14, 'http://yun.itheima.com/Upload/Images/20170626/5950d6f43f86e.jpg', 'http://v.itheima.com/MSMKWZZZ/01-%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%AE%8C%E6%95%B4%E7%9A%84%E7%BD%91%E7%AB%99%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.mp4', '2020-12-02 23:00:39', '美食美刻网站制作实战', 'https://pan.baidu.com/s/1AWTNBVFhvP8YDqn1hXUXJQ', 'knfo');
INSERT INTO `video` VALUES (15, 'http://yun.itheima.com/Upload/Images/20170516/591a96eee0494.jpg', 'http://v.itheima.com/jqueryjpjc/01-%E4%BD%BF%E7%94%A8js%E7%9A%84%E7%BC%BA%E7%82%B9.mp4', '2020-12-02 23:01:08', 'jQuery精品教程', 'https://pan.baidu.com/s/1tP7KUVwYtszYHpjJFJ2CVg', 'pgew');
INSERT INTO `video` VALUES (16, 'http://yun.itheima.com/Upload/Images/20160913/57d7abeada966.jpg', 'http://v.itheima.com/H5+CSS3/01HTML5%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 23:01:42', 'H5+CSS3教程视频', 'https://pan.baidu.com/s/1ZbO9_z1dkLbOUAKiejQsFg', '59hp');
INSERT INTO `video` VALUES (17, 'http://yun.itheima.com/Upload/Images/20191115/5dce193eedb33.jpg', 'http://v.itheima.com/4XSksrmVUEJS/01.%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 23:02:25', '4小时+5个拣选案例让你快速入门Vue.js', 'https://pan.baidu.com/s/1uze2UPaK36q_J8yctVtyjA', '8hm8');
INSERT INTO `video` VALUES (18, 'http://yun.itheima.com/Upload/Images/20180413/5ad058f44af98.jpg', 'http://v.itheima.com/reactjsjpsp/1-01%E4%BB%8B%E7%BB%8Dreact.mp4', '2020-12-02 23:03:10', 'ReactJs精品教程', 'https://pan.baidu.com/s/1JCmAQfCvk9EInrVJxp9eOg', 'vlyh');
INSERT INTO `video` VALUES (19, 'http://yun.itheima.com/Upload/Images/20180315/5aaa390a569bd.jpg', 'http://v.itheima.com/Nodejsjcjj/1-%E6%B5%8F%E8%A7%88%E5%99%A8%E5%86%85%E6%A0%B8%EF%BC%88%E6%B8%B2%E6%9F%93%E5%BC%95%E6%93%8E%EF%BC%89%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 23:03:51', 'Nodejs教程精讲', 'https://pan.baidu.com/s/14eRjKsqK7MpN8BBhBpiK4A', 'injk');
INSERT INTO `video` VALUES (20, 'http://yun.itheima.com/Upload/Images/20180315/5aaa3c02f39b3.jpg', 'http://v.itheima.com/VuejsSRQC/01.Vue%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 23:05:34', '2018年Vue.js深入浅出教程', 'https://pan.baidu.com/s/13atUZ-IMONSokHRO9O1PVA', '0xd3');
INSERT INTO `video` VALUES (21, 'http://yun.itheima.com/Upload/Images/20190115/5c3d36005a85f.jpg', 'http://v.itheima.com/jqueryjjyy/%E4%B8%8A%E5%8D%8801-%E5%8E%9F%E7%94%9Fjs%E7%9A%84%E7%BC%BA%E7%82%B9.mp4', '2020-12-02 23:06:05', 'jquery进阶实用教程', 'https://pan.baidu.com/s/10AofMwLyq-2VmneHHlsHZA', 'bfhp');
INSERT INTO `video` VALUES (22, 'http://yun.itheima.com/Upload/Images/20190115/5c3d4b677e61a.jpg', 'http://v.itheima.com/1twzwxxcx/01-%E8%AF%BE%E7%A8%8B%E4%BB%8B%E7%BB%8D.mp4', '2020-12-02 23:06:39', '一天教你打造企业级微信小程序', 'https://pan.baidu.com/s/1yH-o9QUAZO9NGjesXnfP2Q', 'dinu');

SET FOREIGN_KEY_CHECKS = 1;
