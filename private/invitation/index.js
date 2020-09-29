import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
      code:'',    //邀请二维码
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
    var that = this
    that.setData({
        code:wx.getStorageSync('QRcode')
    })
    console.log(that.data.code)
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
    let referrer=wx.getStorageSync('enid');
    console.log("referrer",referrer)
    return {
      path: "/pages/index/index?referrer="+referrer
    }
  }
})