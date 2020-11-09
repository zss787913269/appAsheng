let lpapi = require('../../utils/LPAPI/LPAPI.js');
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'

var tempIndex = 0;
let itemIndex = 1
//index.js
//获取应用实例
const app = getApp()
// pages/created/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    total2: "",
    total3: "",
    deliveryList: [], //派送订单
    deliveryListYes: [], //已完成订单
    currentTab: 1,
    card_img: [],
    card_imgid: [], //图片id
    PeisongList: [],
    canvasWidth: 30,
    canvasHeight: 10,
    showDialog: false,
    dgcount: 1,
    len: "",
    printdata: "",
    zymdata: "",
    page: 1, //页面的递进数
    canPull: true, //下拉是否触发
    allPage: 1, //总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 地图
  print2: function () {
    tempIndex = this.data.printdata.length;
    this.printOneLabel();
  },
  printNextLabel: function () {
    tempIndex--;
    itemIndex++;
    if (tempIndex <= 0) {
      wx.showToast({
        title: '打印成功',
        duration: 2000,
        mask: true,
      })
      itemIndex = 1
    } else {
      this.printOneLabel();
    }
  },
  printOneLabel: function () {
    let printdata = this.data.printdata

    let hotelmsg = this.data.zymdata
    // console.log(printdata[i].title)

    console.log(printdata)


    const width = 70
    const height = 55
    lpapi.setPrintPageGapType(0);

    // lpapi.drawText(`${itemIndex}.${printdata[tempIndex-1].title}`, 2, 5, 3);
    let y = 0,
      x = 0

    if (itemIndex == 1) {
      lpapi.startDrawLabel('test', this, 90, 55, 0);
      y = y + 5, lpapi.drawText(`配送单`, 22, y, 5), y = y + 8, lpapi.drawText(`酒店名字：${hotelmsg.hotel_name}`, 0, y, 5)


      y = y + 5, lpapi.drawText(`商品数量：${hotelmsg.details.length}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`商品总价：${hotelmsg.total_price}`, 0, y, 5), y = y + 5, lpapi.drawText(`时间：${hotelmsg.add_time}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`配送地址：${hotelmsg.hotel_address}`, 0, y, 4)

      y = y + 8, lpapi.drawText(`商品名`, x, y, 4), x = x + 30, lpapi.drawText(`数量 `, x, y, 4),
        x = x + 12, lpapi.drawText(`单价`, x, y, 4), x = x + 12, lpapi.drawText(`总价`, x, y, 4), x = x + 5, y = y + 2
      x = 0, y = y + 4, lpapi.drawText(`${itemIndex}.${printdata[tempIndex-1].title}`, x, y, 3), x = x + 30, lpapi.drawText(`${printdata[tempIndex-1].buy_number}  `, x, y, 3)
      x = x + 12, lpapi.drawText(`${printdata[tempIndex-1].price} `, x, y, 3), x = x + 12, lpapi.drawText(`${printdata[tempIndex-1].total_price} `, x, y, 3)
      x = x + 10, y = y + 5, x = 0, lpapi.drawText(`规格：${printdata[tempIndex-1].specvalue}`, x, y, 3), x = x + 30
      if (printdata[tempIndex - 1].goods_mark != "") {
        x = x + 10, lpapi.drawText(`备注：${printdata[tempIndex-1].goods_mark}`, x, y, 3), x = x + 30
      }
      y = y + 3, lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
      y = y + 5
    } else {


      let height = 12
      if (printdata.length == itemIndex) {
        height = 30
      }
      lpapi.startDrawLabel('test', this, 90, height, 0);
      x = 0, y = y + 4, lpapi.drawText(`${itemIndex}.${printdata[tempIndex-1].title}`, x, y, 3), x = x + 30, lpapi.drawText(`${printdata[tempIndex-1].buy_number}  `, x, y, 3)
      x = x + 12, lpapi.drawText(`${printdata[tempIndex-1].price} `, x, y, 3), x = x + 12, lpapi.drawText(`${printdata[tempIndex-1].total_price} `, x, y, 3)
      x = x + 10, y = y + 5, x = 0, lpapi.drawText(`规格：${printdata[tempIndex-1].specvalue}`, x, y, 3), x = x + 30
      if (printdata[tempIndex - 1].goods_mark != "") {
        x = x + 10, lpapi.drawText(`备注：${printdata[tempIndex-1].goods_mark}`, x, y, 3), x = x + 30
      }
      y = y + 3, lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
      y = y + 5
    }





    let self = this;
    lpapi.endDrawLabel(function () {
      lpapi.print(function () {
        self.printNextLabel();
      })
    })
  },


  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id=" + id,
    })

  },
  onLoad: function (options) {

    let that = this

    this.getDeliveryClerkList()
    this.getDistributorClerkList()
    this.getPeisongList()


  },
  onShow: function () {
    this.getDeliveryClerkList()

  },
  openPrinter: function () {

    lpapi.openPrinter('', function () {
      wx.showToast({
        title: '连接打印机成功',
        icon: '',
      })
    }, function () {
      wx.showToast({
        title: '打印机连接断开',
        icon: '',
      })
    })
  },
  printText(e) {

    let item = e.currentTarget.dataset.details.details
    let list = this.data.orderlist
    let that = this

    console.log("item", e.currentTarget.dataset.details)
    let t = item[0]
    this.setData({
      zymdata: e.currentTarget.dataset.details,
      printdata: item,
      dgcount: 1,
      len: e.currentTarget.dataset.details.details.length
    })
    itemIndex = 1
    this.openPrinter();
    this.toggleDialog()
    var width = 90;
    var height = 55;
    let j = e.currentTarget.dataset.details
    lpapi.startDrawLabel('test', this, width, height, 0);
    lpapi.setItemOrientation(0);
    lpapi.setItemHorizontalAlignment(0);
    lpapi.setPrintPageGapType(0)

    let y = 0,
      x = 0
    y = y + 5, lpapi.drawText(`配送单`, 22, y, 5), y = y + 8, lpapi.drawText(`酒店名字：${j.hotel_name}`, 0, y, 5)


    y = y + 5, lpapi.drawText(`商品数量：${j.details.length}`, 0, y, 5)
    y = y + 5, lpapi.drawText(`商品总价：${j.total_price}`, 0, y, 5), y = y + 5, lpapi.drawText(`时间：${j.add_time}`, 0, y, 5)
    y = y + 5, lpapi.drawText(`配送地址：${j.hotel_address}`, 0, y, 4)

    y = y + 8, lpapi.drawText(`商品名`, x, y, 4), x = x + 30, lpapi.drawText(`数量 `, x, y, 4),
      x = x + 12, lpapi.drawText(`单价`, x, y, 4), x = x + 12, lpapi.drawText(`总价`, x, y, 4), x = x + 5, y = y + 2

    x = 0, y = y + 4, lpapi.drawText(`${this.data.dgcount}.${t.title}`, x, y, 3), x = x + 30, lpapi.drawText(`${t.buy_number}  `, x, y, 3)
    x = x + 12, lpapi.drawText(`${t.price} `, x, y, 3), x = x + 12, lpapi.drawText(`${t.total_price} `, x, y, 3)
    x = x + 10, y = y + 5, x = 0, lpapi.drawText(`规格：${t.specvalue}`, x, y, 3), x = x + 30
    y = y + 3, lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
    y = y + 5

    lpapi.endDrawLabel();
    //  that.data.printdata.splice(0,1)

  },
  draw() {
    let k = this.data.zymdata,
      len = this.data.len,
      a = this.data.printdata,
      j = a[0],
      that = this
    console.log(this.data.dgcount, "递归数量")
    console.log(len, "数据长度")
    // console.log(j.title,"标题")
    if (this.data.dgcount == 1) {
      lpapi.startDrawLabel('test', this, 100, 55, 0);
      lpapi.setItemOrientation(0);
      lpapi.setItemHorizontalAlignment(0);
      lpapi.setPrintPageGapType(0)
      let y = 0,
        x = 0
      y = y + 5, lpapi.drawText(`配送单`, 22, y, 5), y = y + 8, lpapi.drawText(`酒店名字：${k.hotel_name}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`配送地址：${k.hotel_address}`, 0, y, 4)
      y = y + 5, lpapi.drawText(`商品数量：${len}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`商品总价：${k.total_price}`, 0, y, 5), y = y + 5, lpapi.drawText(`时间：${k.add_time}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`配送地址：${k.hotel_address}`, 0, y, 4)
      y = y + 8, lpapi.drawText(`商品名`, x, y, 4), x = x + 30, lpapi.drawText(`数量 `, x, y, 4),
        x = x + 12, lpapi.drawText(`单价`, x, y, 4), x = x + 12, lpapi.drawText(`总价`, x, y, 4), x = x + 5, y = y + 2
      x = 0, y = y + 4, lpapi.drawText(`${this.data.dgcount}.${j.title}`, x, y, 3), x = x + 30, lpapi.drawText(`${j.buy_number}  `, x, y, 3)
      x = x + 12, lpapi.drawText(`${j.price} `, x, y, 3), x = x + 12, lpapi.drawText(`${j.total_price} `, x, y, 3)
      x = x + 10, y = y + 5, x = 0, lpapi.drawText(`规格：${j.specvalue}`, x, y, 3), x = x + 30
      y = y + 3, lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
      y = y + 5
      lpapi.endDrawLabel();
    } else {
      let width = 90,
        height = 12
      lpapi.startDrawLabel('test', this, width, height, 0);
      lpapi.setItemOrientation(0);
      lpapi.setItemHorizontalAlignment(0);
      lpapi.setPrintPageGapType(0)
      if (j == undefined) {
        wx.showToast({
          title: '打印完毕，请点击关闭按钮',
          icon: "none"
        })
        lpapi.endDrawLabel();
      }
      let y = 0,
        x = 0
      x = 0, y = y + 4, lpapi.drawText(`${this.data.dgcount}.${j.title}`, x, y, 3), x = x + 30, lpapi.drawText(`${j.buy_number}  `, x, y, 3)
      x = x + 12, lpapi.drawText(`${j.price} `, x, y, 3), x = x + 12, lpapi.drawText(`${j.total_price} `, x, y, 3)
      x = x + 10, y = y + 5, x = 0, lpapi.drawText(`规格：${j.specvalue}`, x, y, 3), x = x + 30
      y = y + 3, lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3), y = y + 3
      lpapi.endDrawLabel();
    }
    if (j == undefined) {
      lpapi.endDrawLabel();
      return
    }
    a.splice(0, 1)
    lpapi.print(function () {
      that.data.dgcount++
      that.draw()
    })
  },
  printing: function (e) { //生成打印数据
    this.toggleDialog()
    this.openPrinter() //连接打印机    为空就是列表第一个
    let print = e.currentTarget.dataset.details.details
    let item = e.currentTarget.dataset.details


    var width = 80;
    var height = 30 * print.length;

    if (print.length <= 2) {
      height = 100
    } else if (print.length >= 10) {
      height = 17 * print.length
    }
    // let height2 = 200* print.length;

    console.log(height)

    console.log(print.length)




    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    let x = 0
    y = y + 5
    lpapi.drawText(`酒店验货单`, 20, y, 5)
    y = y + 10
    lpapi.drawText(`酒店名称：${item.hotel_name}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`下单时间：${item.add_time}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`配送地址：${item.hotel_address}`, 0, y, 3)
    y = y + 10


    lpapi.drawText(`商品名`, x, y, 4)
    x = x + 20
    lpapi.drawText(`数量 `, x, y, 4)
    x = x + 20
    lpapi.drawText(`单价`, x, y, 4)
    x = x + 20
    lpapi.drawText(`总价`, x, y, 4)
    x = x + 5
    y = y + 2
    for (let i = 0; i < print.length; i++) {

      if (print[i].goods_mark == '') {
        print[i].goods_mark = "无"
      }
      x = 0
      y = y + 5
      lpapi.drawText(`${print[i].title}`, x, y, 3)
      x = x + 20
      lpapi.drawText(`${print[i].buy_number}  `, x, y, 4)
      x = x + 20
      lpapi.drawText(`${print[i].price} `, x, y, 4)
      x = x + 20
      lpapi.drawText(`${print[i].total_price} `, x, y, 4)
      x = x + 10
      y = y + 5
      x = 0
      lpapi.drawText(`规格：${print[i].specvalue}`, x, y, 3)
      x = x + 30
      lpapi.drawText(`备注：${print[i].goods_mark}`, x, y, 3)
      y = y + 3
    }
    y = y + 5
    lpapi.drawText(`共计：${print.length}件商品`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`商家总价：${item.total_price}元`, 0, y, 4)
    y = y + 10
    lpapi.drawText(`验收员签名：`, 0, y, 4)

    // y = y + 20



    lpapi.endDrawLabel();

  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  upload: function (e) { //上传图片
    var that = this
    if (that.data.card_imgid.length > 9) {
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'none',
        duration: 3000,
      })
      return
    }
    var id = e.currentTarget.dataset.id

    //console.log("currentTarget", e.currentTarget.dataset)
    wx.showActionSheet({
      itemList: ['拍照'],
      success: function (res) {
        that.getImg(res.tapIndex, id)
      },
      fail: function (res) {
        //console.log(res.errMsg)
      }
    })
  },
  upImg(url, shopid) { //上传图片
    let _this = this
    //console.log(url)
    app.globalData.token = wx.getStorageSync('token')
    wx.uploadFile({
      url: `https://second.chchgg.com/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`,
      filePath: url,
      name: 'image',
      formData: {
        'name': 'image'
      },
      success(res) {
        let data = JSON.parse(res.data)
        //返回上传照片的id，记录下来
        let id = _this.data.card_imgid

        if (data.code == 0) {

          id.push(data.data.id)
          _this.setData({
            card_imgid: id
          })
        }
      },
      fail(res) {
        const data = res.data
        //console.log(data + '失败')
      }
    })
  },
  getImg: function (e, id) {
    var _this = this

    //console.log("e", id)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = _this.data.card_img
        tempFilePaths.push(res.tempFilePaths[0])
        //console.log(tempFilePaths)



        let peisongList = _this.data.PeisongList
        for (var i = 0; i < peisongList.length; i++) {
          if (peisongList[i].id == id) {
            peisongList[i].imgurl = tempFilePaths
          }

        }

        console.log("PeisongList", _this.data.PeisongList)


        _this.setData({
          card_img: tempFilePaths,
          PeisongList: peisongList
        })

        _this.upImg(res.tempFilePaths[0], id)
      }
    })
  },
  async enterSend(e) {
    let that = this
    let shopid = e.currentTarget.dataset.id,
      params, imgid = that.data.card_imgid

    if (imgid.length != 0) {
      params = {
        id: shopid,
        images_id: imgid
      }
    } else {
      params = {
        id: shopid,
        images_id: 1
      }
    }
    let res = await ajax({
      url: 'api/staff/completeOrder',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '已确认送达',
      })
      this.getDistributorClerkList()
      this.getPeisongList()
    }



  },
  // 一键取货
  async pickOrder(e) {
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/staff/pickOrder',
      method: 'post',
      data: params
    })

    if (res.data.data.detailcount == res.data.data.pickcount) {
      that.getDeliveryClerkList()
    } else {
      wx.showToast({
        title: '供应商未接单',
        icon: "none"
      })
    }

    console.log("pickOrder", res.data.data)


  },

  //打印
  print() {

    lpapi.print(function () {
      wx.showToast({
        title: '打印成功',
      })
    });
  },
  // 点击顶部栏切换 未取货/配送中/已完成
  clickTab(e) {
    let that = this
    this.setData({
      currentTab: e.currentTarget.dataset.current,
      page:1
    })
    if(e.currentTarget.dataset.current == 1){
      that.getDeliveryClerkList()
    }else if(e.currentTarget.dataset.current == 2){
      that.getPeisongList()
    }else if(e.currentTarget.dataset.current == 3){
      that.getDistributorClerkList()
    }
   
    
  
  },
  async getDeliveryClerkList() { //获取配送员未处理订单
    let that = this
    let params = {
      status: 0,
      page:this.data.page
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })
    console.log("获取配送员未处理订单", res.data.data)
    if (res.data.code == 0) {
      if (this.data.page == 1) {
        this.setData({
          canPull: true
        })
        this.setData({
          deliveryListOne: res.data.data.data,
          allPage: res.data.data.page_total // 总页数
        })
        if (that.data.allPage == that.data.page) { // 到了最后一页，关闭开关，翻页失效
          that.setData({ canPull: false }) }
      }else{
        if (that.data.allPage == that.data.page) { // 到了最后一页，关闭开关，翻页失效
          that.setData({ canPull: false }) }
          let deliveryListOne = that.data.deliveryListOne.concat(res.data.data.data) // 大于1页的拼接
          that.setData({
            deliveryListOne
          })   
      }
      console.log("deliveryListOne",that.data.deliveryListOne)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  detalis(e) { //跳转去详情页

    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`,
    })
  },
  // 配送中的数据
  async getPeisongList() {

    let that = this
    let params = {
      status: 1,
      page: that.data.page
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })

    if(res.data.code == 0){
      
    if (this.data.page == 1) {
      this.setData({
        canPull: true
      })
      this.setData({
        PeisongList: res.data.data.data,
        allPage: res.data.data.page_total // 总页数
      })
    }else{
      if (that.data.allPage == that.data.page) { // 到了最后一页，关闭开关，翻页失效
        that.setData({ canPull: false }) }
        let PeisongList = that.data.PeisongList.concat(res.data.data.data) // 大于1页的拼接
        that.setData({
          PeisongList
        })   
    }
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:"none"
      })
    }


    //console.log("total2", this.data.total2)
  },

  async getDistributorClerkList() { //获取配送员已处理订单
    var that = this

    let params = {
      status: 2,
      page: that.data.page
    } 

    
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })

    if (res.data.code == 0) {
      if (this.data.page == 1) {
        this.setData({
          canPull: true
        })
        this.setData({
          deliveryListYes: res.data.data.data,
          allPage: res.data.data.page_total // 总页数
        })
      }else{
        if (that.data.allPage == that.data.page) { // 到了最后一页，关闭开关，翻页失效
          that.setData({ canPull: false }) }
          let deliveryListYes = that.data.deliveryListYes.concat(res.data.data.data) // 大于1页的拼接
          that.setData({
            deliveryListYes
          })

      }

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },

  onReachBottom: function () {



    let that = this
    if(this.data.canPull){
      let page = ++this.data.page
      wx.showLoading({
        title: '玩命加载中',
      })
      this.setData({page})
      if(that.data.currentTab == 1){
        that.getDeliveryClerkList()
      }else if(that.data.currentTab == 2){
        that.getPeisongList()
      }else if(that.data.currentTab == 3){
        that.getDistributorClerkList()
      }
      setTimeout(() => {
        // 隐藏加载框
        wx.hideLoading();
      }, 1000)
      
    }else{
      wx.showToast({
        title: '没有更多数据',
        icon:'none'
      })
    }

    
    
   
  },


})