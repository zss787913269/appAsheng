// person/confirm/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
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
      this.getMyCommission()
  },
  confirmTX(){
    wx.showToast({
      title: '暂未开发',
      icon:'none',
      duration:3000
    })
  },
  async getMyCommission() {   //获取佣金
    console.log('yongjing')
    var that = this
    let res = await ajax({
      url: 'api/user/getUserProperty',
      method: 'get',
    })
    that.setData({
      commission: res.data.data.Yongj,
      integral: res.data.data.integral,
      balance: res.data.data.normal_money,
    })
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