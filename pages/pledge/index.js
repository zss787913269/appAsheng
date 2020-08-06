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
    mynode:"",
    amount: '', //充值金额
    value: "0.01",
    list: [],
    price: "",
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  selecetd(e) {
    let price = e.currentTarget.dataset.pricelist.title


    
    let list = this.data.list
    for(let i of list){
      if(i.title == price){
       
        i.isSelected = true
        this.setData({
          mynode:i.content
        })

      }else{
        i.isSelected = false
      }
    }

    this.setData({
      list:list,
      amount:price
    })
    
  },

  async getList() {
    let params = {
      type: 25
    }
    let res = await ajax({
      url: 'api/article/list',
      method: 'POST',
      data: params
    })

    let data = res.data
    data[0].isSelected = true
    data[1].isSelected = false
    data[2].isSelected = false
    data[3].isSelected = false
    data[4].isSelected = false
    data[5].isSelected = false

    this.setData({
      list: data,
      mynode:data[0].content
    })


  },




  async getPlugins(e) { //拉起支付参数订单
    var that = this
    let params = {
      amount: that.data.amount
    }

    console.log(that.data.amount)

    let res = await ajax({
      url: 'api/pledge/wxpay',
      method: 'POST',
      data: params
    })
    console.log(params);
    console.log(res);

    wx.hideLoading();
    if (res.data.code == 0) {
      console.log(res)

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
            duration: 3000
          })
          wx.switchTab({
            url: "/pages/user/index"
          });
        },
        fail: function (res) {
          wx.showToast({
            title: '支付失败',
            duration: 3000
          })
          wx.reLaunch({
            url: "/pages/pledge/index"
          });
        }
      });
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
          duration: 3000
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
              icon: 'none',
              duration: 3000
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
        icon: 'none',
        duration: 3000
      })

    }
    console.log(res)
    fail: () => {
      wx.hideLoading();
      //   app.showToast("");
      wx.showToast({
        title: "服务器请求出错",
        icon: 'none',
        duration: 3000
      })
    }

  },


})