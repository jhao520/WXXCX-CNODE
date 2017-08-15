var WxParse = require('../../wxParse/wxParse.js')
Page({
  /**
 * 页面的初始数据
 */
  data: {
    article: {},
    content:"",
    id:null,
  },
  // 监听下拉动作
  onPullDownRefresh: function () {
    console.log("监听下拉动作")
    this.loadDetail()
  },
  onLoad: function (option) {
    this.setData({
      id: option.id,
    })
    this.loadDetail()
  },
  loadDetail: function (data) {
    var that = this
    wx.request({
      url: "https://cnodejs.org/api/v1/topic/" + that.data.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(that.data.article)
        var article = res.data.data
        var content = article.content
        that.setData({
          article: article,
        })
        WxParse.wxParse('content', 'html', content, that, 5);

        var repliess = article.replies
        var replyArr = [];
        for (var i = 0; i < repliess.length; i++) {
          if (repliess[i].content) {
            var c = repliess[i].content;
            if (c.length > 0) {
              replyArr.push(repliess[i].content);
            }
          }
        }
        console.log(replyArr)
        if (replyArr.length > 0) {
          for (let i = 0; i < replyArr.length; i++) {
            WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
            if (i === replyArr.length - 1) {
              WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
            }
          }
        }
      }
    })
  }
})