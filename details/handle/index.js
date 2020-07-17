var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/handle/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    shopInfo:'',
    shopOrderList:[],    //商家订单
    canvasWidth: 30,
    canvasHeight: 30,
    printingBtn:false
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    // }
  },
 async noReceiptConfirm(e){    //退换货确认
      var that = this
      let params = {
        order_detail_id:e.currentTarget.dataset.id.id,
        order_id: e.currentTarget.dataset.id.order_id,
        status:1
      }
    let res = await ajax({
      url: 'api/store/confirm',
      method: 'POST',
      data: params
    })
    console.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '成功',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  async noReceiptRefuse(e) {    //退换货拒接
    var that = this
    let params = {
      order_detail_id: e.currentTarget.dataset.id.id,
      order_id: e.currentTarget.dataset.id.order_id,
      status: 0
    }
    let res = await ajax({
      url: 'api/store/confirm',
      method: 'POST',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        icon: 'none',
        duration:3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  async onekey(){   //一键接单
    var that = this
    let arr = []
    for (let i = 0; i < that.data.shopOrderList.length;i++){
      arr.push(that.data.shopOrderList[i].order_id)
    }
    let params = {
      id: arr
    }
    let res = await ajax({
      url: 'api/store/OneClickReceipt',
      method: 'POST',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration:3000
      })
      that.getShopList()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
 async receipt(e){   //接单
      var that = this
      let params ={
        status:1,
        id:e.currentTarget.dataset.id
      }
   let res = await ajax({
     url: 'api/store/updateStatus',
     method: 'POST',
     data: params
   })
   console.log(res)
   if(res.data.code == 0){
     wx.showToast({
       title: '接单成功',
       icon: 'none',
       duration:3000
     })
     that.getShopList()
   }else{
     wx.showToast({
       title:res.data.msg,
       icon:'none',
       duration:3000
     })
   }
  },
  async getShopInfo(){    //获取店铺状态
    var that = this
    let res = await ajax({
      url: 'api/store/StoreStatus',
      method: 'POST',
      // data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      that.setData({
        shopInfo:res.data.data
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  async noReceipt(e){   //不接
    var that = this
    let params = {
      status: 2,
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/store/updateStatus',
      method: 'POST',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
        duration:3000
      })
      that.getShopList()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  // 先连接打印机  lpapi.openPrinter('')    //连接打印机    为空就是列表第一个
// 生成打印图片
//
  printing: function () {    //生成打印数据
    lpapi.openPrinter('')    //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 30 * this.data.shopOrderList.length;

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    for (let i = 0; i < this.data.shopOrderList.length; i++) {
      console.log(i)
      console.log(y)
      lpapi.drawText(`订单号：${this.data.shopOrderList[i].order.order_no}`, 0, y, 4)
      y = y + 5
      lpapi.drawText(`商品名：${this.data.shopOrderList[i].title}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`数量：${this.data.shopOrderList[i].buy_number}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`规格：${this.data.shopOrderList[i].spec[0].value}`, 0, y, 5)
      y = y + 15
      console.log(y)
    }
    lpapi.endDrawLabel();
    this.setData({
      printingBtn:true
    })
  },
  draw: function () {
    var width = 100;
    var height = 30 * this.data.shopOrderList.length;
    
    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);

  },
  print: function () {
    // lpapi.setPrintPageGapType(0)
    lpapi.print()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      canvasWidth:30,
      canvasHeight:30,
    })
    that.getShopList()
    that.getShopInfo()
    that.shopConfirm()
    that.shopConfirmComplete()
  },
    async getShopList(){   //获取商家订单
        var that = this
        let params = {
          status:0
        }
      let res = await ajax({
        url: 'api/store/getStoreOrder',
        method: 'POST',
        data: params
      })
      console.log('获取商家订单',res)
      if(res.data.code == 0){
        if(res.data.data.data.length === 0){
          console.log(res.data.data.msg);
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration:3000
          })
        }
        let resInfo1 = res.data.data.data
        console.log(resInfo1)
        for (let i = 0; i < resInfo1.length; i++) {
          // console.log(i)
          resInfo1[i].spec = JSON.parse(resInfo1[i].spec)
        }
        that.setData({
          shopOrderList: resInfo1
        })
        that.setData({
          SOtotal:res.data.data.total
        })
      }
      console.log(res)
      console.log(that.data.shopOrderList)
    },
  async shopConfirm() {   //获取商家订单已接单
    var that = this
    let params = {
      status: 1,     
    }
    let res = await ajax({
      url: 'api/store/getStoreOrder',
      method: 'POST',
      data: params
    })
    console.log('获取商家订单已接单',res);
    if(res.data.code == 0 ){
      let resInfo = res.data.data.data
      for (let i = 0; i < resInfo.length; i++) {
        resInfo[i].spec = JSON.parse(resInfo[i].spec)
      }
      that.setData({
        shopReceiptList: resInfo,
        ALtotla:res.data.data.total
      })
    }
    console.log(res)
  },
  async shopConfirmComplete() {   //获取商家订单已完成
    var that = this
    let params = {
      status: 2,     
    }
    let res = await ajax({
      url: 'api/store/getStoreOrder',
      method: 'POST',
      data: params
    })
    console.log('获取商家订单已完成',res);
    if (res.data.code == 0) {
      let resInfo = res.data.data.data
      for (let i = 0; i < resInfo.length; i++) {
        resInfo[i].spec = JSON.parse(resInfo[i].spec)
      }
      that.setData({
        shopCompleteList: resInfo
      })
    }
    console.log(res)
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