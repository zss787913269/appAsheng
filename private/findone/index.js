//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
// private/Reply/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList: '',   //未审核菜品列表
    currentTab:1,
    // isHidden:false,    //模态框
    cookList:'',   //未审核私厨列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getFoodComment()
  },

  async getFoodCookList() {   //获取私厨列表
    var that = this
    let res = await ajax({ url: 'api/staff/CookList', method: 'POST' })
    console.log(res)
    if (res.data.code == 0) {
      that.setData({
        cookList: res.data.data.data
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }

  },
  async getFoodComment() {   //获取菜品列表
    var that = this
    let res = await ajax({ url: 'api/staff/lists', method: 'POST'})
    console.log(res)
    if (res.data.code == 0) {
      that.setData({
        foodList: res.data.data.data
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }

  },
  async toExamine(){
      var that = this
      let params = {
        id:e.currentTarget.dataset.id
      }
    let res = await ajax({ url: '/api/staff/dishesstatus', method: 'POST',data:params})
    if(res.data.code == 0){
      wx.showToast({
        title: '审核成功',
        duration:3000
      })
      that.getFoodComment()
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async examineTo(e){
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({ url: 'api/staff/CookStatus', method: 'POST', data: params })
    if (res.data.code == 0) {
      wx.showToast({
        title: '审核成功',
        icon:'none',
        duration:3000
      })
      that.getFoodCookList()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  clickTab: function (e) {
    var that = this;
    if (e.target.dataset.current == 1){
      that.getFoodComment()
    }else{
      that.getFoodCookList()
    }
    that.setData({
      currentTab: e.target.dataset.current
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})