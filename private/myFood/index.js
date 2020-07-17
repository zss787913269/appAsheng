import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// person/lection/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
      num:1,    //分页
      myFood:[],   //我发布的新菜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getLection(that.data.num)
  },
   async getLection(num){
     var that = this
     let params = {
       page:num,
       type:'self'
     }
     let res = await ajax({ url: '/api/dishes/lists',method: 'POST',data:params})
     that.setData({
       myFood: that.data.myFood.concat(res.data.data.data)
     })
      console.log(res)
    },
  toFoodInfo(e){   //去菜品详情
  console.log(e)
  let id =e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/details/dishname/index?id=${id}`,
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
          num:that.data.num + 1
        })
    that.getLection(that.data.num)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})