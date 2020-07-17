import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// person/lection/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],
    page:1,  //分页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getLection(that.data.page)
  },
   async getLection(page){
     var that = this
     let res = await ajax({ url: '/api/dishes/collectionlist',method: 'POST',data:{page}})
      console.log(res)
      if(res.data.code == 0){
        that.setData({
          collectionList: that.data.collectionList.concat(res.data.data.data)
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          icon:'none',
        duration:3000
        })
      }
     console.log(that.data.collectionList)
    },
  toInfo(e){ //去菜品详情   
      wx.navigateTo({
        url: `/details/dishname/index?id=${e.currentTarget.dataset.id}`,
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
      page:that.data.page + 1
    })
    that.getLection(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})