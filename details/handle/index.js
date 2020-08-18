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
    countList: [],
    listindex: 1,
    classfiySelect: "",
    page: 1,
    currentTab: 2,
    shopInfo: '',
    canvasWidth: 30,
    canvasHeight: 10,
    shopOrderList: [], //未接单
    shopCompleteList: [], //已完成
    first: true,
    dayTime:"",
    showDialog: false,
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  onLoad: function (options) {
    var that = this
  
    this.getShopList(this.data.currentTab) //未接订单

  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.index
    // this.getShopInfo()

    this.setData({
      listindex: index
    })
    this.getShopList(this.data.currentTab)

  },
  //点击切换
  clickTab: function (e) {
    var that = this;

    that.setData({
      currentTab: e.target.dataset.current,
    })

    let currentTab = this.data.currentTab

    if(currentTab != 3){
      that.getShopList(currentTab)
    }else{
      that.getOkList()
    }

 

  },
  async noReceiptConfirm(e) { //退换货确认
    var that = this
    let params = {
      order_detail_id: e.currentTarget.dataset.id.id,
      order_id: e.currentTarget.dataset.id.order_id,
      status: 1
    }
    let res = await ajax({
      url: 'api/store/confirm',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        icon: 'none',
        duration: 300
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },
  async noReceiptRefuse(e) { //退换货拒接
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
    ////////console.log..log.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        icon: 'none',
        duration: 300
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },
  async onekey(e) { // 按照订单 一键接单
    var that = this
    let id = e.currentTarget.dataset.id


    let params = {
      id: id
    }
    let res = await ajax({
      url: 'api/store/OneClickReceipt',
      method: 'POST',
      data: params
    })
    // console.log(res.data)
    if (res.data.code == 0) {

      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration: 1000
      })

      that.getShopList(that.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000
      })
    }
  },
  async onekeyAll() { // 全部商品 一键接单
    var that = this

    let res = await ajax({
      url: 'api/store/AllReceipt',
      method: 'POST',
    })
    console.log(res.data)
    if (res.data.code == 0) {

      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration: 1000
      })

      that.setData({
        currentTab: 2,
      })
      that.getShopList(2)


    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000
      })
    }
  },

  godetails(e) {
    let id = e.currentTarget.dataset.id
    //////console.log..log.log(id)
    wx.navigateTo({
      url: '/details/detail/index?id=' + id,
    })
  },

  async receipt(e) { //接单
    var that = this
    let params = {
      status: 1,
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/store/updateStatus',
      method: 'POST',
      data: params
    })

    if (res.data.code == 0) {

      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration: 300
      })
      that.getShopList(that.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },
  // zym
  async getShopInfo() { //获取店铺状态
    var that = this
    let res = await ajax({
      url: 'api/store/StoreStatus',
      method: 'POST',
      // data: params
    })
    // console.log("获取店铺", res.data)
    if (res.data.code == 0) {
      that.setData({
        shopInfo: res.data.data
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },
  async noReceipt(e) { //不接
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
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
        duration: 300
      })
      that.getShopList(that.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },
 

  printing: function (e) { //生成打印数据

    let print = e.currentTarget.dataset.print
   
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 30* print.length ;
    // let height2 = 200* print.length;

    console.log(height)

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    for (let i = 0; i <print.length; i++) {
  
      lpapi.drawText(`商品名：${print[i].title}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`总价：${print[i].total_price}`, 0, y,5)
      y = y + 5
      lpapi.drawText(`数量：${print[i].buy_number}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`规格：${print[i].specvalue}`, 0, y, 5)
      y = y + 15
    }

   
    lpapi.endDrawLabel();
    this.toggleDialog()
    // this.setData({
    //   canvasHeight: height2,
    // })
  },
  printing2: function (e) { //生成打印数据

    let print = e.currentTarget.dataset.print

    console.log(print)
   
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 30* print.details.length ;
   
    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    lpapi.drawText(`订单号：${print.order_no}`, 0, y, 2)
    y = y + 5
    lpapi.drawText(`商品名：${print.add_time}`, 0, y, 2)
    y = y + 5
    for (let i = 0; i <print.details.length; i++) {
  
      lpapi.drawText(`商品名：${print.details[i].title}`, 0, y, 3)
      y = y + 5
      lpapi.drawText(`总价：${print.details[i].total_price}`, 0, y,3)
      y = y + 5
      lpapi.drawText(`数量：${print.details[i].buy_number}`, 0, y, 3)
      y = y + 5
      lpapi.drawText(`规格：${print.details[i].specvalue}`, 0, y, 3)
      y = y + 15
    }

   
    lpapi.endDrawLabel();
    this.toggleDialog()
    
  },
  print: function () {
    lpapi.print(function () {
      wx.showToast({
        title: '打印成功',
      })
    })
  },
  //zym
  async getShopList(num) { //获取商家订单
    wx.showLoading({
      title: '加载中',
    })
    // console.log(num)
    // type = 2  按照订单 isok = 0 是未接单
    // type = 3  商品汇总 isok = 1 已接单
    //  type = 3   isok = 2 已完成
    // 
    let that = this
    let params, listindex = this.data.listindex,currentTab

    let res2 = await ajax({
      url: 'api/store/OrderCount',
    })
    let countList = res2.data.data

    if(this.data.first){

      if(countList[0] != 0){
        currentTab = 1
      }else if(countList[1] != 0){
        currentTab = 2
      }else if (countList[2] != 0){
        currentTab = 3
      }
      num = currentTab

      that.setData({
        first:false
      })
    }

      if(currentTab == undefined){
        currentTab = that.data.currentTab
      }



    this.setData({
      count1: countList[0],
      count2: countList[1],
      count3: countList[2],
      currentTab:currentTab
    })








    if (num == 1) {
      params = {
        type: 2,
        isok: num - 1,
      }
    } else if (num == 2) {

      if (listindex == 1) {
        params = {
          type: 3,
          isok: num - 1,
        }
      } else {
        params = {
          type: 2,
          isok: num - 1,
        }
      }
    }

    let res = await ajax({
      url: "api/order/ShopOrderPrint",
      method: 'POST',
      data: params
    })
    console.log("获取商家订单",res.data.data)

    if (res.data.code == 0) {
      setTimeout(function () {
        wx.hideLoading()
      }, 100)
      that.setData({
        shopOrderList: res.data.data,
      })
    }


  },
  getTime(){
     var day2 = new Date();
     day2.setTime(day2.getTime());
    var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
    this.setData({
      dayTime:s2
    })
  },
  async getOkList(){
    let that = this

    let res = await ajax({
      url: 'api/order/ShopOrderOK',
      method:"POST"
    })
    this.setData({
      shopCompleteList:res.data.data
    })
  
    if(res.data.code == 0){
      that.getShopInfo()
      that.getTime()
    }


  },
  // 点击左侧
  clickLeftItem(e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    // console.log(id)
    that.setData({
      classfiySelect: id
    })
  },
})