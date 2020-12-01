//index.js
import ajax from '../../utils/ajax'
const util = require('../../utils/util.js')
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputBz:"",
    addreslist: '',
    payment_list: [],
    checkedAll: false,
    goods_list: [],
    ids:'',
    dataids: "",
    // 下单id
    orderid: "",
    actual_price:'',
    paymentId:3,   //支付方式id
    where:'',   //从哪里来
    hoteItem:'',   //酒店订单传的数据
    addreslistName:"",
    addressid:0,
    flag:true,
    hotel_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
  if(options.id != undefined){
    this.setData({
      price: options.price,
      orderId: options.id,
      num:options.num,
      addreslist:options.address,
      addreslistName:options.msg
    })

    // that.setData({
    //   addressid:addressMsg.id,
    //   addreslist: addreslist, //收货地址信息
    //   addreslistName:addreslistName,
    // })
    // this.setData({
    //   price: 216.15,
    //   orderId: 186,
    //   num:5
    // })
  }
   
  },
  pushAddress(){
    wx.navigateTo({
      url: '/person/map/index',
    })
  },
  toDetalInfo() {
    wx: wx.navigateTo({
      url: '/details/detail/index',
    })
  },
  addresd() {
    wx.navigateTo({
      url: '/person/map/index?ids=' + this.data.dataids
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  modalInput(e){
    // //console.log(e.detail.value)
    this.setData({
      inputBz:e.detail.value
    })
  },

  async subdelect(e) {
    //console.log(e)
    let that = this
    let res = await ajax({
      url: 'api/buy/index',
      method: 'POST',
      data: {
        buy_type: "cart",
        ids: 214,
        payment_id: 0,
        coupon_id: 0,
        site_model: 0,
        user_note:that.data.inputBz,
      }
    })
    let paymentList = res.data.data.payment_list


    console.log("paymentList",res.data.data)
    for (var i = 0; i < paymentList.length; i++) {
      paymentList[i].checked = false
    }
    let addreslist 
    let addreslistName
    let addressMsg = res.data.data.base.address
      if(res.data.data.base.address != null){
        addreslist = `${addressMsg.address}`
        addreslistName = `${addressMsg.name} ${addressMsg.tel}`
        that.setData({
          addressid:addressMsg.id,
          addreslist: addreslist, //收货地址信息
          addreslistName:addreslistName,
        })
      }
  
      // console.log("默认地址",res2.data.data)
     
     
  console.log(res.data.data.base,"商品价格")
 

    that.setData({

      payment_list: paymentList, //支付方式
      goods_list: res.data.data.goods_list, //订单商品
      ids: e,
   
      actual_price: res.data.data.base, //商品价格,

    })
  

  },
  // 在支付前先提交地址
  async paymented(e) {
    let that = this

    // if(that.data.addreslist.id)
    console.log("地址id",that.data.addressid)
     console.log("订单id",that.data.orderId)
    if(that.data.addreslist == null){
      wx.showToast({
        title: '请填写地址',
        icon:"none"
      })
    }else{
      let res = await ajax({
        url: 'api/quickorder/address',
        method: 'POST',
        data: {
          order_id: that.data.orderId,
          address_id: that.data.addressid
        }
      })
      console.log("地址",res.data)
     
      if(res.data.code == 0){
        that.orderPay()
      }
    }

  
  },
  
  async orderPay(e) {
    //console.log(e)
    let that = this
      let res = await ajax({
        url: 'api/order/payor',
        method: 'POST',
        data: {
          id: that.data.orderId,
          payment_id: that.data.paymentId
        }
      })
      console.log(res)
      wx.hideLoading();
      if (res.data.code == 0) {

       
// 点击第一次的时候 变成false
// 
        //console.log("支付成功",res)
        // 是否在线支付,非在线支付则支付成功
        if (res.data.data.data.is_online_pay == 0) {
         
          wx.showLoading({
            title: '付款成功,正在跳转页面',
          })
          
          setTimeout(function(){
            // wx.navigateTo({
            //   url: "/private/hotelpeople/index?idx=2"
            // });
            wx.hideLoading()
            wx.navigateBack({
              delta: 0,
            })
          },2000)
          
  
        } else {
          wx.requestPayment({
            timeStamp: res.data.data.data.timeStamp,
            nonceStr: res.data.data.data.nonceStr,
            package: res.data.data.data.package,
            signType: res.data.data.data.signType,
            paySign: res.data.data.data.paySign,
            
            success: function(res) {
              // 数据设置
              // self.order_item_pay_success_handle(index);
  
              // 跳转支付页面
       

              wx.showLoading({
                title: '付款成功,正在跳转页面',
              })
  
  
              setTimeout(function(){
                // wx.switchTab({
                //   url: "/private/hotelpeople/index?idx=2"
                // });
                wx.hideLoading()
                wx.navigateBack({
                  delta: 0,
                })

              },2000)
  
            },
            // 2288 2256
            fail: function(res) {
              that.setData({
                flag:true
              })
              wx.showToast({
                title: '付款失败',
                icon:'none',
                duration:2000
              })
            }
          });
        }
      } else {
        //console.log(res)
        that.setData({
          flag:true
        })
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:2000
        })
  
      }
      //console.log(res)
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
  switch: function(e) {
    //console.log(e)
  },

  select(e){
    let id = e.currentTarget.dataset.id

    this.setData({
      paymentId:id
    })
    
  },


  checkboxChange(e) { //实现单选
    var that = this;
    let checkboxValues = null;
    let checkboxItems = that.data.payment_list;
    let values = e.detail.value
    for (var i = 0; i < checkboxItems.length; i++) {
      if (checkboxItems[i].id == values[values.length - 1]) {
        checkboxItems[i].checked = true;
        checkboxValues = checkboxItems[i].id;
      } else {
        checkboxItems[i].checked = false;
      }
    }
    //console.log("checkboxValues",checkboxValues)
    that.setData({
      payment_list:checkboxItems,
      paymentId: checkboxValues
    })
  },
  payment: function() { //点击支付按钮
    
  

    if(this.data.flag){
      this.paymented()
    }
    this.setData({
      flag:false
    })

  },
  // payment: util.throttle(function () {
  //   this.paymented()
  // }),
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    that.subdelect(that.data.dataids) //获取收货地址和支付方式
   
   
  },
  /**
   * 生命周期函数--监听页面隐藏
   */

})