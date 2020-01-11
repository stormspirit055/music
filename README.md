### 基于Vue的低仿mac网易云音乐web播放器
---
#### 前言
---
* 在写该项目之前, 参考了[ssh大佬的音乐项目](https://github.com/sl1673495/vue-netease-music)([掘金地址](https://juejin.im/post/5d3c0765f265da1b60294b78)), 因为了解到ssh效力于国内著名大厂,所以本着学习的态度在动手之前将其音乐项目的**基础架构**及**代码风格**研究了一遍(确实收获了很多)

* 感谢[大佬提供的api](https://github.com/Binaryify/NeteaseCloudMusicApi)
#### 项目简介
---
[预览地址](http://47.98.146.129:3390/music/)
##### 技术栈

* webpack4(打包工具, 这个项目中我并没有用vue-cli, 因为想体验下自己搭建webpack有多痛苦:( )
* element-ui (用到了其中轮播图, 表单等部分组件)
* sass (css预处理器)
* Vue全家桶

##### 辅助工具 & 插件
* [better-scroll](https://github.com/ustbhuangyi/better-scrollbetter-scroll)(歌词滚动)
* [xgplayer](https://github.com/bytedance/xgplayer) (西瓜视频播放器)]
* postcss-pxtorem (px转rem工具, 自己搭webpack 加这玩意儿实在太费劲了)
* charles (抓包工具)
* axios

##### 项目功能
- [x] 登录(账号密码 & 网易云Id)
- [x] 音乐播放
- [x] 视频播放
- [x] 歌单 & 专辑页
- [x] 搜索结果, 搜索面板
- [x] 播放记录 & 播放列表
- [x] 排行榜 & 最新音乐 & 个性推荐 
- [x] 我的收藏歌单列表
- [x] 歌词, 评论, 相关推荐

* 有些功能相较于网易云音乐是残疾版, 因为提供的接口是2年前的, 所以有些不支持现在的业务逻辑

##### 项目预览

![](https://user-gold-cdn.xitu.io/2020/1/11/16f936fa63cc76b7?w=3358&h=1834&f=png&s=192820)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f936ff15411314?w=3354&h=1830&f=png&s=737271)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f936ffb329c0d8?w=3352&h=1834&f=png&s=604815)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f9370054257f69?w=3354&h=1840&f=png&s=154070)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f93700c3a49a95?w=3350&h=1830&f=png&s=160910)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f93702d66aff2f?w=3354&h=1832&f=png&s=296084)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f93703689a1de5?w=3354&h=1828&f=png&s=377430)
![](https://user-gold-cdn.xitu.io/2020/1/11/16f93703ff335a2c?w=3360&h=1838&f=png&s=210892)

##### 跑一下

```
cnpm i 

npm run start 本地预览

npm run build 打包

npm run analyz 打包文件分析
```
