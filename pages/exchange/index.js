//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()
// pages/exchange/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    market: [{
      "id": "1",
      "name": "退货"
    }, {
        "id": "2",
        "name": "换货"
      }],
    shopInfo:'',   //商品详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopInfo = JSON.parse(options.shop)
    this.setData({
      shopInfo
    })
  },
  getDate: function (e) { //获取用户选择
    this.setData({
      foodMarket: e.detail.id
    })
    console.log(this.data.foodMarket)
  },
  bindinput(e) {    //获取输入的退货原因
    var that = this
    that.setData({
      comment: e.detail.value
    })
    console.log(that.data.comment)
  },
  async submit(){
    var that = this
      // order_id = 订单id, title = 退货理由 order_detail_id = 商品详情id, price = 价格, number = 数量
    // type = 1退货退款, 2换货
    if (that.data.foodMarket == undefined){
      wx.showToast({
        title: '请选择退货或者换货',
        icon:'none',
        duration:3000
      })
      return
    }
    if (that.data.comment == undefined) {
      wx.showToast({
        title: '请输入退换货原因',
        icon: 'none',
        duration:3000
      })
      return
    }
    let shopAttribute = that.data.shopInfo
    console.log(shopAttribute)
    
    let params = {
      order_id: shopAttribute.order_id,
      order_detail_id: shopAttribute.order_detail_id,
      price: shopAttribute.price,
      number: shopAttribute.number,
      title:that.data.comment,
      type: that.data.foodMarket
    }
    let res = await ajax({
      url: 'api/quickorder/delivery', method: 'POST', data: params
    })
    console.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '申请成功',
        duration:3000
      })
      wx.navigateBack({
        
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})