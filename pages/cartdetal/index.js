//index.js
import ajax from '../../utils/ajax'
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
    paymentId:'',   //支付方式id
    where:'',   //从哪里来
    shopNowPrice:'',    //当前的商品价格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options,"options")

  // if(options.where != undefined){
  //   this.setData({
  //     where:options.where
  //   })
    // if (options.where == 'group'){

    //   this.setData({
    //     shopAttribute: JSON.parse(options.shopAttribute)
    //   })
    // }
  // }
    this.setData({
      dataids: options.ids
    })
  },
  modalInput(e){
    // console.log(e.detail.value)
    this.setData({
      inputBz:e.detail.value
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
  async subdelect(e,mode) {
    // console.log(e)
    console.log(mode)
    let that = this
    let params = {
      buy_type: mode,
      payment_id: 0,
      coupon_id: 0,
      site_model: 0
    }
    if(mode == 'cart'){
      // params.buy_type = mode
      params.ids = e
    }else if(mode == 'goods'){
      params.goods_id = that.data.shopAttribute.shopId
      params.stock = that.data.shopAttribute.num
      params.spec = that.data.shopAttribute.spec
    }
    let res = await ajax({
      url: 'api/buy/index',
      method: 'POST',
      data:params
    })
    console.log(res)
    if(res.data.code == 0){
      let paymentList = res.data.data.payment_list
      for (var i = 0; i < paymentList.length; i++) {
        paymentList[i].checked = false
      }
      that.setData({
        addreslist: res.data.data.base.address, //收货地址信息
        payment_list: paymentList, //支付方式
        goods_list: res.data.data.goods_list, //订单商品
        ids: e,
        actual_price: res.data.data.base //商品价格
      })
      // that.getShopPrice()
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    
    // console.log(res.data.data)
    // console.log(that.data.ids)

  }, 
  // async getShopPrice(){    //查询价格
  //   var that = this

    // console.log(that.data.shopAttribute)
   
    // let groupShop = that.data.groupShop
    // let params = {
    //   activity_id:that.data.shopAttribute.id,
    //   goods_id:that.data.shopAttribute.shopId,
    //   spec: that.data.shopAttribute.spec
    // }
    // let res = await ajax({
    //   url: 'api/index/getGroupPrice',
    //   method: 'POST',
    //   data: params
    // })
    // console.log(res.data.code)
    // if (res.data.code == 0) {
    //   // groupShop[i].nowPrice = res.data.data
    //   that.setData({
    //     shopNowPrice:res.data.data
    //   })

    // }
  // },
  // 下单页面
  async paymented(e) {
    let that = this
    if (that.data.paymentId == ''){
      wx.showToast({
        title: '请选择支付方式',
        icon:'none',
        duration:3000
      })
      return
    }
    let params = {
      // buy_type: that.data.where,
      
      payment_id: that.data.paymentId,
      address_id: that.data.addreslist.id,
      is_purchase: 0,
      user_note : that.data.inputBz
    }
    if(that.data.where == 'group'){
      params.buy_type = 'goods'
      params.is_group_buy = 1
      params.activity_id = that.data.shopAttribute.id
      params.stock = that.data.shopAttribute.num
      params.goods_id = that.data.shopAttribute.shopId
      params.spec = that.data.shopAttribute.spec
      params.price = that.data.shopNowPrice,
      params.user_note = that.data.inputBz
    }else{
      params.buy_type = 'cart'
      params.ids = that.data.dataids
    }
    let res = await ajax({
      url: 'api/buy/add',
      method: 'POST',
      data: params
    })
    console.log(res)
    if(res.data.code == 0){
      that.setData({    //返回订单id
        orderid: res.data.data.order.id
      })
      that.orderPay()
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    
  },
  // 付款
  async orderPay() {
    console.log(this.data.inputBz)
    
    let that = this
    let res = await ajax({
      url: 'api/order/pay',
      method: 'POST',
      data: {
        id: that.data.orderid,
        payment_id: that.data.paymentId,
        // user_note:that.data.inputBz
      }
    })
    console.log(res.data)
    wx.hideLoading();
    if (res.data.code == 0) {
      console.log(res.data.data)
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
          success: function(res) {
            console.log("付款",res.data)
            wx.reLaunch({
              url: "/details/order/index"
            });
          },
          fail: function(res) {
            wx.showToast({
              title: '支付失败',
              duration:3000
            })
            wx.reLaunch({
              url: "/details/order/index"
            });
          }
        });
      }
    } else {
      console.log(res.data)
      // wx.showToast({
      //   title: res.data.msg,
      //   duration:3000
      // })

    }
    console.log(res)
    fail: () => {
      wx.hideLoading();
      //   app.showToast("");
      wx.showToast({
        title: "服务器请求出错",
        duration:3000
      })
    }

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
    that.setData({
      payment_list:checkboxItems,
      paymentId: checkboxValues
    })
  },
  payment: function() { //点击支付按钮
    this.paymented()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    if(that.data.where == 'group'){
      that.subdelect(213,'goods') //获取收货地址和支付方式
    }else{
      that.subdelect(that.data.dataids,'cart') //获取收货地址和支付方式
    }
   
   
   
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})