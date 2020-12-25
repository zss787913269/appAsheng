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
    makeList:[],   //预约我的列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getMyMakeList()
  },
  async accept(e){    //接受
    var that = this
    let params = {
      id:e.currentTarget.dataset.id,
      status:1
    }
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: params })

    if(res.data.code == 0){

      that.getMyMakeList()

      wx.showToast({
        title: '接受成功',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async refuse(e) {    //拒绝
    var that = this
    let params = {
      id: e.currentTarget.dataset.id,
      status: 2
    }
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: params})
    console.log(res.data)
    if (res.data.code == 0) {
   
      that.getMyMakeList()
      wx.showToast({
        title: '操作成功',
        icon:'none',
        duration:3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async getMyMakeList(){
      var that = this
   
    let res = await ajax({ url: 'api/user/makeListToSelf', method: 'POST'})
    console.log("makeList",res.data)
    if(res.data.code == 0){

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