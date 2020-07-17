var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()
// pages/created/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ads: ['/images/temp/ad.jpg', '/images/temp/caipin.png'],
    deliveryList:[],    //派送订单
    deliveryListYes:[],   //已完成订单
    currentTab:1,
    contact:false,
    shopInfo:'',
    showModal:false,
    shopNum:1,
    shopPrice:'',
    tuidanModal:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getDeliveryClerkList()
  },
 async takeDelivery(e){   //取货
   var that = this
   let params = {
     id: e.currentTarget.dataset.id
   }
   let res = await ajax({ url: 'api/staff/pick', method: 'post', data: params })
   if (res.data.code == 0) {
    wx.showToast({
      title:'取货成功',
      icon:'none',
      duration:3000
    })
     that.lookApi()
   } else {
     wx.showToast({
       title: res.data.msg,
       icon: 'none',
       duration:3000
     })
   }
  },
  returnAndExchange(e){    //退换货
    console.log(e);
    this.setData({
      tuidanModal:true,
      shopExch:e.currentTarget.dataset.item
    })
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
      lpapi.drawText(`收货人：${myData.address.name}`, 0, y, 4)
      y = y + 5
      lpapi.drawText(`电话：${myData.address.tel}`, 0, y, 5)
      y = y + 5
      let myAddress=myData.address.province_name+myData.address.city_name+myData.address.county_name+myData.address.address;
      lpapi.drawText(`地址：${myAddress}`, 0, y, 5)
      y = y + 15
    lpapi.endDrawLabel();
    lpapi.print();
  },
  hideModal(){
    this.setData({
      tuidanModal: false
    })
  },
  async onConfirmTui(){    //拒绝原因
      var that = this
    if (that.data.shopReason == undefined){
      wx.showToast({
        title: '请输入拒绝原因',
        icon:"none",
        duration:3000
      })
      return
    }
    let params = {
      order_id: that.data.shopExch.id,
      order_detail_id: that.data.shopExch.order_id,
      status: 4,
      type: 2,
      title: that.data.shopReason
    }
    let res = await ajax({ url: 'api/quickorder/confirm', method: 'post', data: params })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        duration:3000
      })
      that.setData({
        tuidanModal: false
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  async onCancelTui(){   //确认退单
    var that = this
    // order_id=订单id, order_detail_id ,status=1同意,4拒绝  ,  title = 拒绝原因   type=1退货退款,2换货
    let params = {
      order_id: that.data.shopExch.id,
      order_detail_id: that.data.shopExch.order_id,
      status:1,
      type: that.data.shopExch.is_after_type
    }
    let res = await ajax({ url: 'api/quickorder/confirm', method: 'post', data: params })
    console.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '成功',
        duration:3000
      })
      that.setData({
        tuidanModal:false
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  shopNum(e){   //配送员输入的数量
      this.setData({
        shopNum:e.detail.value
      })
  },
  inputChangeTui(e){   //获取配送员输入发拒单原因
    this.setData({
      shopReason: e.detail.value
    })
  },
  shopPrice(e){   //配送员输入的价格
    this.setData({
      shopPrice: e.detail.value
    })
  },
  onCancel(){
    this.setData({
      showModal: false,
    })
  },
  async onConfirm(){   //修改数量和价格
    var that = this
    if (that.data.shopPrice == ''){
      wx.showToast({
        title: '请输入价格',
        icon:'none',
        duration:3000
      })
      return
    }
    let params = {
      id:that.data.shopOneInfo.id,
      price:that.data.shopPrice,
      number:that.data.shopNum,
    }
    let res = await ajax({ url: 'api/staff/upOrderByStaff', method: 'post', data: params })
    console.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '修改成功',
        duration:3000
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    that.setData({
      showModal:false
    })
  },
  async orderReceiving(e){   //接单
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    console.log('object',params);
    let res = await ajax({ url: 'api/staff/sendture', method: 'post', data: params })
    if(res.data.code == 0){
      wx.showToast({
        title: '接单成功',
        duration:3000
      })
      that.setData({
        showModal:true,
        shopOneInfo:e.currentTarget.dataset.item
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:"none",
        duration:3000
      })
    }
  },
 look(e){   //查看清单
  var that = this
  that.setData({
    detailedId: e.currentTarget.dataset.id,
    detailedIndex: e.currentTarget.dataset.index,
  })
   that.lookApi()
  },
  
 async lookApi(){
    var that = this
    let params = {
      id: that.data.detailedId
    }
    let res = await ajax({ url: 'api/staff/getOrderDetail', method: 'post', data: params })
    if (res.data.code == 0) {
      console.log('lookApi',res);
      let shopInfo = res.data.data
      let deliveryList = that.data.deliveryList
      for (var i = 0; i < shopInfo.length; i++) {
        shopInfo[i].spec = JSON.parse(shopInfo[i].spec)
      }
      deliveryList[that.data.detailedIndex].detailedList = !deliveryList[that.data.detailedIndex].detailedList
      that.setData({
        contact: true,
        shopInfo,
        deliveryList
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  clickTab(e){
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
    if (e.currentTarget.dataset.current == 3){
      this.getDistributorClerkList()
    }
  },
  async getDeliveryClerkList(){    //获取配送员未处理订单
    var that = this
    let params = {
      status:0
    }
    let res = await ajax({ url: 'api/staff/getStaffSendOrder', method: 'post', data: params })
    if(res.data.code == 0){
      console.log(res)
      let deliveryListOne = res.data.data.data
      for (var i = 0; i < deliveryListOne.length; i++) {
        deliveryListOne[i].detailedList = false
      }
      that.setData({
        deliveryList: that.data.deliveryList.concat(deliveryListOne),
        total:res.data.data.total,
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async getDistributorClerkList() {    //获取配送员已处理订单
    var that = this
    let params = {
      status: 1
    }
    let res = await ajax({ url: 'api/staff/getStaffSendOrder', method: 'post', data: params })
    if (res.data.code == 0) {
      console.log('获取配送员已处理订单',res)
      let total = res.data.data.total
      that.setData({
        deliveryListYes: that.data.deliveryListYes.concat(res.data.data.data),
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
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