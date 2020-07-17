//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city: '成都',
    isHidden: true,
    currentTab: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    // }
  },
  show: function () {
    this.setData({
      isHidden: false//显示模态框
    })
  },
  sunmit: function () {
    this.setData({
      isHidden: true//显示模态框
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

 
})
