//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
// person/recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      intNote:'',    //充值金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    that.subdelect()
  },
  async getPlugins(){   //创建订单
    var that = this
    let params = {
      pluginsname:'wallet',
      pluginscontrol:'recharge',
      pluginsaction:'create',
      money:that.data.intNote
    }
    let res = await ajax({ url: 'api/plugins/index', method: 'POST', data:params})
    console.log(res)
    if(res.data.code == 0){
      that.getPluginsIndex(res.data.data.recharge_id)
      
    }
  },
  async subdelect(e) {   //获取订单id
    let that = this
    let res = await ajax({
      url: 'api/buy/index',
      method: 'POST',
      data: {
        buy_type: "cart",
        ids:214,
        payment_id: 0,
        coupon_id: 0,
        site_model: 0
      }
    })
   
    that.setData({
      payment_list: res.data.data.payment_list, //支付方式
    })
  },
  async getPluginsIndex(id) {   //拉起支付参数订单
    var that = this
    let params = {
      pluginsname: 'wallet',
      pluginscontrol: 'recharge',
      pluginsaction: 'pay',
      recharge_id:id,
      payment_id:that.data.payment_list[0].id,
    }
    let res = await ajax({ url: 'api/plugins/index', method: 'POST', data: params })
    console.log(res)
    // if (res.data.code == 0) {
    //   that.
    // }
    wx.hideLoading();
    if (res.data.code == 0) {
      console.log(res)
      // 是否在线支付,非在线支付则支付成功
      if (res.data.data.is_online_pay == 0) {
        // 数据设置
        // self.order_item_pay_success_handle(index);
        wx.showToast({
          title: '支付成功',
          duration:3000
        })
      } else {
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          success: function (res) {
            // 数据设置
            // self.order_item_pay_success_handle(index);

            // 跳转支付页面
            wx.showToast({
              title: '充值成功',
              duration:3000
            })
            wx.switchTab({
              url: "/pages/index/index"
            });
          },
          fail: function (res) {
            wx.showToast({
              title: '支付失败',
              duration:3000
            })
            wx.reLaunch({
              url: "/person/recharge/index"
            });
          }
        });
      }
    } else {
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })

    }
  },
  async orderPay(e) {
    console.log(e)
    let that = this
    let res = await ajax({
      url: 'api/order/pay',
      method: 'POST',
      data: {
        id: that.data.orderid,
        payment_id: that.data.paymentId
      }
    })
    wx.hideLoading();
    if (res.data.code == 0) {
      console.log(res)
      // 是否在线支付,非在线支付则支付成功
      if (res.data.data.is_online_pay == 0) {
        // 数据设置
        // self.order_item_pay_success_handle(index);
        wx.showToast({
          title: '支付成功',
          duration:3000
        })
      } else {
        wx.requestPayment({
          timeStamp: res.data.data.data.timeStamp,
          nonceStr: res.data.data.data.nonceStr,
          package: res.data.data.data.package,
          signType: res.data.data.data.signType,
          paySign: res.data.data.data.paySign,
          success: function (res) {
            // 数据设置
            // self.order_item_pay_success_handle(index);

            // 跳转支付页面
            wx.switchTab({
              url: "/pages/index/index"
            });
          },
          fail: function (res) {
            wx.showToast({
              title: '支付失败',
              icon:'none',
              duration:3000
            })
            wx.reLaunch({
              url: "/details/order/index"
            });
          }
        });
      }
    } else {
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })

    }
    console.log(res)
    fail: () => {
      wx.hideLoading();
      //   app.showToast("");
      wx.showToast({
        title: "服务器请求出错",
        icon:'none',
        duration:3000
      })
    }

  },
  intBange(e){
    this.setData({
      intNote:e.detail.value
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