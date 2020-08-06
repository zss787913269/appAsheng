//index.js
var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
     orderlist:'',
     num:1
  },

  
  onLoad: function (options) {
    this.getlist(this.data.num)
  },
  async confirmReceipt(e){   //确认收货
  
      var that = this
    let res = await ajax({
      url: '/api/order/collect',
      method: 'POST',
      data: { id: e.currentTarget.dataset.id }
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '收货成功',
        icon:'none',
        duration:3000
      })
      that.getlist(1)
    }else{
      wx.showToast({
        title: res.data.msg,
        duration:3000
      })
    }
  },
  
  async getlist(num) {

    let that = this
    let res = await ajax({
      url: 'api/order/index',
      method:'POST',
      data: {page:num}
    })
    if(res.data.code == 0){
      if(num == 1){
        this.setData({
          orderlist: []
        })
      }
      this.setData({
        orderlist: this.data.orderlist.concat(res.data.data.data) 
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    
   console.log(this.data.orderlist)
  },
  // 跳转详情
  detalis(e){
    const index = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/details/detail/index?id=' + index
    })
    
  },
  payment(e) {
    const item = e.currentTarget.dataset.payid
    this.orderPay(item)
  },

  // 付款成功
  async orderPay(e) {
    console.log(e)
    let that = this
    let res = await ajax({
      url: 'api/order/pay', method: 'POST', data: {
        id: e.id,
        payment_id: e.payment_id
      }
    })
    wx.hideLoading();
    if (res.data.code == 0) {
      // 是否在线支付,非在线支付则支付成功
      if (res.data.data.is_online_pay == 0) {
        // 数据设置
        // self.order_item_pay_success_handle(index);


        wx.showToast({
          title: '支付成功',
          duration:3000
        })

        wx.redirectTo({
          url: "/details/order/index"
        });

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
           
          },
          fail: function (res) {
            wx.showToast({
              title: '支付失败',
              duration:3000
            })
            wx.redirectTo({
              url: "/details/order/index"
            });
          }
        });
      }
    } else {
      wx.showToast({
        title: res.data.msg,
        duration:3000
      })

    }
    console.log(res)
    fail: () => {
      wx.hideLoading();
      //   app.showToast("");
      wx.showToast({
        title: "服务器请求出错",
        icon:"none",
        duration:3000
      })
    }

  },

  //打印
  print(value){
    console.log(value.currentTarget.dataset.value);
    let myData=value.currentTarget.dataset.value;
    lpapi.openPrinter('')    //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 40;

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
      lpapi.drawText(`订单号：${myData.order_no}`, 0, y, 4)
      y = y + 5
      lpapi.drawText(`收货人：${myData.address_data.name}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`状态：${myData.pay_status_name}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`${myData.describe}`, 0, y, 5)
      y = y + 15
    lpapi.endDrawLabel();
    lpapi.print();
  },

})