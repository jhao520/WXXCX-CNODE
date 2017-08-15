//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    isNoMore: true,
    isLoadMore: true,
    lists: [],
    params: {
      tab: "",
      page: 1,
      limit: 10,
    },
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  // 切换分类
  changeList: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      lists: [],
      isLoadMore: false,
      'params.tab': id
    })
    this.onLoad(this.data.params)
  },
  // 点击加载更多
  //loadMore: function () {
  //   var page = this.data.params.page + 1;
  //   this.setData({
  //     isLoadMore: false,
  //     'params.page': page
  //   })
  //     console.log(this.data.params)
  //     this.onLoad(this.data.params)
  // },
  // 下拉触底加载更多---懒加载
  onReachBottom: function () {
    var page = this.data.params.page + 1;
    this.setData({
      isLoadMore: false,
      'params.page': page
    })
    console.log(this.data.params)
    this.onLoad(this.data.params)
  },
  // 监听下拉动作
  onPullDownRefresh: function () {
    console.log("监听下拉动作")
    this.setData({
      lists: [],
      isLoadMore: false,
    })
    this.loading(this.data.params)
  },
  // 页面加载
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
    this.setData({
      isLoadMore: false,
    })
    this.loading(that.data.params)
  },
  // 页面加载函数，发送ajax请求
  loading: function (params) {
    var that = this
    wx.request({
      url: 'http://cnodejs.org/api/v1/topics',
      method: "GET",
      data: {
        tab: params.tab,
        page: params.page,
        limit: params.limit,
        mdrender: false,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var lis = that.data.lists
        that.setData({
          isLoadMore: true,
          lists: lis.concat(res.data.data)
        })
      }
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: "../detail/detail?id=" + e.currentTarget.dataset.id
    })
  }
})
