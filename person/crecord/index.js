//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()
var time = require('../../utils/util.js')
// person/crecord/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recharge:'',   //充值记录
    num:1,      //页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      that.getRecharge(that.data.num)
  },
  async getRecharge(num){
    var that = this
    let params = {
      pluginsname:'wallet',
      pluginscontrol:'recharge',
      pluginsaction:'index',
      page:num
    }
    let res = await ajax({
      url: 'api/plugins/index',
      method: 'POST',
      data: params
    })
    console.log(res)
    let times = res.data.data.data
    for(let i = 0; i<times.length;i++){
      times[i].add_time = time.formatTimeTwo(times[i].add_time, 'Y/M/D h:m')
    }
    that.setData({
      recharge: times
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
    var that = this
    that.setData({   
      num: that.data.num + 1
    })
    that.getRecharge(that.data.num)    //实现上拉加载
    console.log(that.data.num)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})