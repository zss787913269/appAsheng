import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// person/details/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      page:1,
    commissionInfo:'',    //佣金详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    if(options.grade == 1){
      that.getCommisInfo(options.grade, options.id)
    } else if (options.grade == 2){
      that.getCommisInfo(options.grade, options.id, options.pid)
    }
  },
  async getCommisInfo(grade,id,pid){
    var that = this
    let params = {
      page: that.data.page,
      grade,
      id,
      pid
    }
    console.log(params)
    let res = await ajax({ url: 'api/user/YongDetail', method: 'POST', data:params })
    that.setData({
      commissionInfo:res.data.data.data
    })
    console.log(res)
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