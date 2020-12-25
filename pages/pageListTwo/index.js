// pages/pageListOne/index.js
import regeneratorRuntime from '../../utils/runtime.js'
import ajax from '../../utils/ajax'

//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelOrderDetail: [], //商品
    classfiySelect: "",
    shopId: "",
    screenHeight: "",
    tableListre: ['鸡肉','牛肉','狗肉','猪肉','上肉','五花肉','稀奇古怪肉']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screenHeight: res.windowHeight - 250
        })
        console.log("屏幕高度", that.data.screenHeight)
      }
    })
    this.getHotelOrderDetail()
    // this.getCarCount()
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async getHotelOrderDetail(id) {

    let that = this

    let res = await ajax({
      url: 'api/order/HotelOrderDetail',
      method: 'POST',
      data: {
        id: 486
      }
    })
    // zym
    console.log("getHotelOrderDetail", res.data)


    if (res.data.code == 0) {
      this.setData({
        hotelOrderDetail: res.data.data,
        classfiySelect: res.data.data[0].id
      })
    }

  },
  // 点击左侧
  clickLeftItem(e) {
    let that = this

    let id = e.currentTarget.dataset.id;

    that.setData({
      classfiySelect: id
    })

  },
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