// component/subscribe/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  dy() {
    let that = this

    console.log("订阅消息")
    wx.requestSubscribeMessage({
      tmplIds: ['XS420zSr_wjra7YzoaZhAR9gWuHvmjrblK2eYYGP-2A','vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'],
      async success(res) {

      
        console.log("用户同意",res)
        //accept--用户同意 reject--用户拒绝 ban--微信后台封禁,可不管
        if (res['XS420zSr_wjra7YzoaZhAR9gWuHvmjrblK2eYYGP-2A'] == 'accept' || res['vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'] == 'accept' ) {
          
          let res = await ajax({
            url: "api/user/updatewxappsendmsgst",
            method: "post"
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
          wx.setStorageSync('is_sq', 1)

        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您已拒绝消息通知授权，将无法在微信中收到下单通知！',
            showCancel: false,
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
          wx.setStorageSync('is_sq', 1)
        }

      }
    })
  },
 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})