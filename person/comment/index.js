import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()

// details/comment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:'',    //用户输入的评论
    id:'',   //菜品id
    commentid:'',   //被回复的用户id
    userid:'',   //评论id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        id: options.foodid,
        userid:options.userid,
        commentid: options.commentid
      })
    console.log(this.data.commentid)
  },
  bindinput(e) {    //获取输入的评论
    var that = this
    that.setData({
      comment: e.detail.value
    })
    console.log(that.data.comment)
  },
 async submit() {   //提交评论
    var that = this
    var params = {
      id:that.data.id,
      comment: that.data.comment,
      comment_id: 33,
      to_user_id: that.data.commentid
    }
    let res = await  ajax({
      url: '/api/dishes/reply',
      method: 'POST',
      data: params
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '回复成功',
        icon: 'none',
        duration: 3000,
      })
      setTimeout(
        wx.navigateBack({
          
        }), 3000)
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000,
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