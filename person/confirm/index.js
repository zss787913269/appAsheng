// person/confirm/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: "",
    balance: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCommission()
  },

  async confirmTX() {

        let that = this
      let res = await ajax({
        url: 'api/cash/create',
        method: 'get',
        data: {
          money: that.data.money,
          type: 1
        }
      })

      if (res.data.code == 0) {
        this.getMyCommission()
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }



    console.log(res.data, 'res')

  },
  bindinput(e) {
    let that = this
    console.log(e.detail.value)
    console.log(that.data.balance)



// 如果输入的值大于 原本的值 就用原本的值替代现在的值
    if (e.detail.value < that.data.balance) {
    
   
      that.setData({
        money: e.detail.value
      })
      console.log('1111',that.data.money)

    } else {
      that.setData({
        money: that.data.balance
      })
      console.log('22222',that.data.money)
    }

  },
  async getMyCommission() { //获取佣金

    var that = this
    let res = await ajax({
      url: 'api/user/getUserProperty',
      method: 'get',
    })
    console.log('res', res.data)
    that.setData({
      commission: res.data.data.Yongj,
      integral: res.data.data.integral,
      balance: res.data.data.Yongj,
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