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
    dayTime: "",
    showDialog: false,
    shouhuo: ""
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  // onLoad: function (options) {
  //   var that = this
  //   this.getShopList(this.data.currentTab) //未接订单

  // },
  onShow() {
    this.getShopList(this.data.currentTab) //未接订单
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id=" + id,
    })

  },
  detalis(e) { //跳转去详情页

    console.log(e.currentTarget.dataset.shouhuo)

    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`,
    })
  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.index

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

    if (currentTab != 3) {
      that.getShopList(currentTab)
    } else {
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
  allprint() { //生成打印数据
    // 全部商品打印
    this.toggleDialog()
    let item = this.data.shopOrderList[0]
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 70;
    var height = 40 * item.length;
    lpapi.startDrawLabel('test', this, width, height, 0);
    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    // y = y + 5
    for (let i of item) {
      y = y + 5
      lpapi.drawText(`类别：${i.name}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`类别数量：${i.goods.length}`, 0, y, 5)
      y = y + 5
      for (let j of i.goods) {
        y = y + 5
        lpapi.drawText(`商品名：${j.title}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`单价：${j.price}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`总价：${j.total_price}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`数量：${j.buy_number}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`规格：${j.specvalue}`, 0, y, 5)
        y = y + 5
      }
    }
    lpapi.endDrawLabel();


  },
  printing: function (e) { //生成打印数据
    this.toggleDialog()
    let print = e.currentTarget.dataset.print.details
    let item = e.currentTarget.dataset.print
    let p = e.currentTarget.dataset.print.total_price
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 70;
    // var height = 80 ;
    var height = 40 * print.length;
    lpapi.startDrawLabel('test', this, width, height, 0);
    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    y = y + 5
    lpapi.drawText(`下单时间：${item.add_time}`, 0, y, 3)
    y = y + 5
    for (let i = 0; i < print.length; i++) {
      y = y + 5
      lpapi.drawText(`商品名：${print[0].title}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`单价：${print[0].price}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`总价：${print[0].total_price}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`数量：${print[0].buy_number}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`规格：${print[0].specvalue}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`备注：`, 0, y, 5)
      y = y + 5
    }
    y = y + 15
    lpapi.drawText(`总价：${p}`, 0, y, 5)
    y = y + 15
    lpapi.endDrawLabel();

  },



  print: function () { //点击打印按钮
    lpapi.print(function () {
      wx.showToast({
        title: '打印成功',
        icon: "none"
      })
    })
  },
  //zym
  async getShopList(num) { //获取商家订单
    // wx.showLoading({
    //   title: '加载中',
    // })
    // console.log(num)
    // type = 2  按照订单 isok = 0 是未接单
    // type = 3  商品汇总 isok = 1 已接单
    //  type = 3   isok = 2 已完成
    // 
    let that = this
    let params, listindex = this.data.listindex,
      currentTab

    let res2 = await ajax({
      url: 'api/store/OrderCount',
    })

    console.log("商家订单", res2.data)
    if (res2.data.code == 0) {

      let countList = res2.data.data

      if (this.data.first) {

        if (countList[0] != 0) {
          currentTab = 1
        } else if (countList[1] != 0) {
          currentTab = 2
        } else if (countList[2] != 0) {
          currentTab = 3
        }
        num = currentTab

        that.setData({
          first: false
        })
      }

      if (currentTab == undefined) {
        currentTab = that.data.currentTab
      }



      this.setData({
        count1: countList[0],
        count2: countList[1],
        count3: countList[2],
        currentTab: currentTab
      })








      if (num == 1) {
        params = {
          type: 4,
          isok: num - 1,
        }
      } else if (num == 2) {

        if (listindex == 1) {
          params = {
            type: 2,
            isok: 1,
          }
        } else {
          params = {
            type: 4,
            isok: 1,
          }
        }
      }


      console.log(params)
      let res = await ajax({
        url: "api/order/ShopOrderPrint",
        method: 'POST',
        data: params
      })
      console.log("获取商家订单", res.data.data)

      if (res.data.code == 0) {
        // setTimeout(function () {
        //   wx.hideLoading()
        // }, 100)
        that.setData({
          shopOrderList: res.data.data,
        })
      }

    }else{
      wx.showToast({
        title: res2.data.msg,
        icon:"none"
      })
    }


  },
  getTime() {
    var day2 = new Date();
    day2.setTime(day2.getTime());
    var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
    this.setData({
      dayTime: s2
    })
  },
  async getOkList() {
    let that = this

    let res = await ajax({
      url: 'api/order/ShopOrderOK',
      method: "POST"
    })
    console.log("shopCompleteList", res)
    this.setData({
      shopCompleteList: res.data.data
    })

    if (res.data.code == 0) {
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