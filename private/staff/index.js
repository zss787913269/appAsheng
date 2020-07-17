import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/orderlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    page:1,   //分页
    myHoteList:[],   //我的酒店列表
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this
        that.getMyHote(that.data.page)
  },
  async getMyHote(page){    //获取我的酒店列表
    var that = this
    let params = {
      page
    }
    if(page == 1){
      that.setData({
        myHoteList:[]
      })
    }
    let res = await ajax({ url: 'api/staff/Hotel', method: 'POST', data: params })
   if(res.data.code == 0){
     console.log(res)
     that.setData({
       myHoteList: that.data.myHoteList.concat(res.data.data.data)
     })
   }
  },
   async examine(e){
     let params = {
       id:e.currentTarget.dataset.id
     }
     let res = await ajax({ url: 'api/staff/HotelToExamine', method: 'POST', data: params })
     if(res.data.code == 0){
       wx.showToast({
         title: '审核成功',
         icon:'none',
         duration:3000
       })
       this.getMyHote(1)
     }else{
       wx.showToast({
         title:res.data.msg,
         icon:'none',
         duration:3000
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
    var that = this
    that.setData({
      page: that.data.page + 1
    })
    that.getMyHote(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})