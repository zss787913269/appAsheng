import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()
// details/preAbout/index.js
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
      this.getMyAppointment()
  },
  async getMyAppointment(){   //获取我的预约列表
    var that = this
    let res = await ajax({
      url: 'api/user/makelistToMy'
    })
    if(res.data.code == 0){
      console.log(res)
      that.setData({
        makeList:res.data.data.data
      })
    }
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