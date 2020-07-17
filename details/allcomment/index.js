import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()

// details/comment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:[],    //全部评论
    pages:1,   //页数
    foodId:'',  //菜品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    that.setData({
      foodId: options.id
    })
    that.seeComment(that.data.pages)
  },
  replys(e){
    wx.navigateTo({
      url: `/person/comment/index?foodid=${this.data.foodId}&userid=${e.currentTarget.dataset.user}&commentid=${e.currentTarget.dataset.comment}`,
    })
  },  
  async seeComment(pages) {   //获取全部评论
    var that = this
    var params = {
      id: that.data.foodId,
      page: pages,
      type: 1
    }
    let res = await ajax({
      url: '/api/dishes/CommentList',
      method: 'POST',
      data: params
    })
    if(res.data.code == 0){
      that.setData({
        comment: that.data.comment.concat(res.data.data.data)
      })
    }
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
      var that =this
      that.setData({
        page:that.data.page + 1
      })
    that.seeComment(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})