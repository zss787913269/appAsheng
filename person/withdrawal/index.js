//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
// person/withdrawal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral:'',  //积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        // console.log(options)
        this.getMyCommission()
  },
  specific(e){
    this.setData({
      integral:e.detail.value
    })
  },
  async getMyCommission() {   //获取佣金
    console.log('yongjing')
    var that = this
    let res = await ajax({
      url: 'api/user/getUserProperty',
      method: 'get',
    })
    that.setData({
      commission: res.data.data.Yongj,
      integral: res.data.data.integral,
      balance: res.data.data.normal_money,
    })
  },
  async cashWithdrawal(){
    var that = this
    let params = {
      integral: that.data.integral
    }
    if(params.integral == ''){
      wx.showToast({
        title: '请输入具体的积分',
        icon:'none',
        duration:3000
      })
      return
    }
    let res = await ajax({ url: 'api/user/CashWithdrawal', method: 'POST',data:params })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title:'提现成功',
        duration:3000
      })
    }else{
      wx.showToast({
        title: res.data.msg,
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