//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
// import time from '../../utils/utils.js'
var time = require('../../utils/util.js')
// person/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:1,   //page 分页
    integralList:'',    //积分记录
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    var sj = 1586854433
    console.log(time.formatTimeTwo(sj, 'Y/M/D h:m'))
      that.getIntegralList(that.data.num)
  },
  async getIntegralList(num){
    var that = this
    let params = {
      page:num
    }
    let res = await ajax({ url:'/api/user/getIntgralDetail', method: 'GET',data:params})
    let times = res.data.data.data
    for(let i = 0; i<times.length;i++){
      times[i].add_time = time.formatTimeTwo(times[i].add_time, 'Y/M/D h:m')
    }
    that.setData({
      integralList: times
    })
    console.log(res)
    console.log(that.data.integralList[0].add_time)
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