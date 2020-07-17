import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()

// details/comment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: '', //全部提问
    pages: 1, //页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.seeComment()
  },
  seeComment() { //获取全部提问
    var that = this
    var params = {
      id: '菜品id',
      page: `${that.data.pages}`,
      type: 0
    }
    let res = ajax({
      url: '/api/dishes/CommentList',
      method: 'POST',
      data: params
    })
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})