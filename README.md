# 硅谷听书

这是一个音频分享平台，用户可以创建自己的音频专辑，分享给其他用户，也可以订阅其他用户的专辑，听取他们分享的音频。

技术体系：uni-app、vue3、pinia、GraceUI、uniapp-axios-adapter、微信小程序、腾讯云、新浪云等

主要模块与页面：

更新日志：

3 月 31 日：

- GraceUI 框架的集成
- GraceUI 中请求功能的熟悉与使用
- Pinia 状态管理的集成，包括数据的持久化
- 从 js 项目切换成 ts 项目模式，tsconfig.json 配置文件的手动加入
- 首页页面的布局，搜索框、图标、切换导航、轮播图、宫格、产品列表、弹性盒布局、自定义导航与自定义底部导航的使用
- custom.scss 自定义样式中循环遍历生成 padding、margin 样式，手动生成背景颜色样式
- 自定义图标的应用，使用 iconfont 自定义图标处理

4 月 1 日：

- [uniapp-axios-adapter](https://ext.dcloud.net.cn/plugin?id=9840)的应用，可以不使用 GraceUI 的请求，可以更接近 axios 的请求处理
- 个人中心页面的布局，主要包括自定义导航头部图标、列表模式实现用户个人信息显示、绝对定位相对定位的结合实现创作中心和录音直接的定位、用宫格实现图标名称的显示、用切换导航实现分类类别切换、scroll-view 与列表结合实现专辑清单列表渲染、自定义底部导航的应用
- 分类页的布局，不利用 GraceUI，而是自定义实现分类页的布局与控制，将原来 vue2 的语法结构转换成了 vue3 的语法结构，需要注意 getCurrentInstance 的应用，因为原来 vue2 中使用的是 createSelectorQuery 中绑定的是 this，而 vue3 中使用的是 getCurrentInstance 中绑定的是 ctx，需要注意区分

4 月 2 日：

- 专辑列表页的设计布局，以用户模板中的会员排行模板进行专辑列表页的设计布局，选项卡切换、标签、scroll-view 滚动、底部播放绝对播放等组件的应用
- 我的作品页面，以下拉选择、scroll-view 滚动、选项卡切换等组件的应用进行布局
