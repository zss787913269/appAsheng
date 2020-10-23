let lpapi = require('../../utils/LPAPI/LPAPI.js');
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
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
    location: "南宁站",
    latitude: "22.827021497126506",
    longitude: "108.31493788391113",
    // 图标定位
    markers: [{
      latitude: "22.827021497126506",
      longitude: "108.31493788391113",
    }],
    myimgid: "",
    total2: "",
    total3: "",
    ads: ['/images/temp/ad.jpg', '/images/temp/caipin.png'],
    deliveryList: [], //派送订单
    deliveryListYes: [], //已完成订单
    currentTab: 1,
    contact: false,
    shopInfo: '',
    showModal: false,
    shopNum: 1,
    shopPrice: '',
    tuidanModal: false,
    card_img: [],
    card_imgid: [], //图片id
    PeisongList: [],
    canvasWidth: 30,
    canvasHeight: 10,
    showDialog: false,
    dgcount:1,
    len:"",
    printdata:"",
    zymdata:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 地图
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  // 地图导航
  getLoc: function (e) {
    // //console.log(e.currentTarget.id);  // 获取当前点击的数组下标
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        //使用微信内置地图查看位置接口
        //console.log(res.data)
        wx.openLocation({
          latitude: parseFloat(that.data.latitude),  // 要去的地址经度，浮点数
          longitude: parseFloat(that.data.longitude),  // 要去的地址纬度，浮点数
          name: '终点位置',  // 位置名
          address: that.data.location,  // 要去的地址详情说明
          scale: 18,   // 地图缩放级别,整形值,范围从1~28。默认为最大
          
        });
      },
      cancel: function (res) {
        //console.log('地图定位失败');
      }
    })
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id="+id,
    })

  },
  onLoad: function (options) {

    let that  = this

    this.getDeliveryClerkList()
    this.getDistributorClerkList()
    this.getPeisongList()
    // that.look()

    // qqmapsdk = new QQMapWX({
    //   key: 'JQEBZ-3GE65-UN5I5-QE5IV-Z7WEO-EAF37'
    // });


    // wx.getLocation({

    //   type: 'wgs84',

    //   success(res) {
    //     //使用腾讯地图的reverseGeocoder方法获取地址信息

    //     // //console.log(res)
       
    //     qqmapsdk.reverseGeocoder({

    //       location: {

    //         latitude: res.latitude, //纬度

    //         longitude: res.longitude //经度
    //       },
      

    //       success: function (addressRes) {

    //         // //console.log(addressRes)

    //         // const address = addressRes.result.formatted_addresses.recommend; //当前位置信息

    //         // //console.log(address)

    //       }
    //     });
    //   }

    // })

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
  printText(e){

    let item = e.currentTarget.dataset.details.details
    let list = this.data.orderlist

   


    console.log("item",e.currentTarget.dataset.details)
   let  t = item[0]
    this.setData({
      zymdata:e.currentTarget.dataset.details,
      printdata:item,
       dgcount:1,
       len:e.currentTarget.dataset.details.details.length
    })
    this.openPrinter();this.toggleDialog()
    var width = 90;
    var height = 55;
    let j = e.currentTarget.dataset.details
    // let t = j[0]
    
    
    lpapi.startDrawLabel('test', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(0)
  
    let y = 0 ,x = 0
    y = y + 5,lpapi.drawText(`配送单`, 22, y, 5),y = y + 8,lpapi.drawText(`酒店名字：${j.hotel_name}`, 0, y, 5)

    y = y + 5,lpapi.drawText(`配送地址：${j.hotel_address}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`商品数量：${j.details.length}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`商品总价：${j.total_price}`, 0, y, 5),y = y + 5,lpapi.drawText(`时间：${j.add_time}`, 0, y, 5)

    y = y + 8,lpapi.drawText(`商品名`, x, y, 4),x = x + 30,lpapi.drawText(`数量 `, x, y, 4),
    x = x + 12,lpapi.drawText(`单价`, x, y, 4),x = x + 12, lpapi.drawText(`总价`, x, y, 4),x = x + 5,y = y + 2

    x = 0,y = y + 4,lpapi.drawText(`${this.data.dgcount}.${t.title}`, x, y,3),x = x + 30,lpapi.drawText(`${t.buy_number}  `, x, y,3)
    x = x + 12,lpapi.drawText(`${t.price} `, x, y,3),x = x + 12,lpapi.drawText(`${t.total_price} `, x, y,3)
    x = x + 10,y = y + 5,x = 0, lpapi.drawText(`规格：${t.specvalue}`, x, y, 3), x = x + 30
    y = y + 3,lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
    y = y + 5

     lpapi.endDrawLabel();
    //  that.data.printdata.splice(0,1)
   
  },
  draw(){

    let k =  this.data.zymdata
    let len = this.data.len
    let a = this.data.printdata

    console.log(a,"a")
     console.log(k,"k")
    let j = a[0]
    let that = this

    // 数据打印完 就没了 
    // 如果再次点击的时候 让数据还在
    // 需要把外部的也删除 因为递归的时候 如果不删除就会重新读取 那么永远都是第一个
    // 

    console.log(this.data.dgcount,"递归长度")
    console.log(len,"数据长度")

    if(this.data.dgcount == 1){

      lpapi.startDrawLabel('test', this, 100, 55, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(0)
  
    let y = 0 ,x = 0
    y = y + 5,lpapi.drawText(`配送单`, 22, y, 5),y = y + 8,lpapi.drawText(`酒店名字：${k.hotel_name}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`配送地址：${k.hotel_address}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`商品数量：${len}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`商品总价：${k.total_price}`, 0, y, 5),y = y + 5,lpapi.drawText(`时间：${k.add_time}`, 0, y, 5)

    y = y + 8,lpapi.drawText(`商品名`, x, y, 4),x = x + 30,lpapi.drawText(`数量 `, x, y, 4),
    x = x + 12,lpapi.drawText(`单价`, x, y, 4),x = x + 12, lpapi.drawText(`总价`, x, y, 4),x = x + 5,y = y + 2

    x = 0,y = y + 4,lpapi.drawText(`${this.data.dgcount}.${j.title}`, x, y,3),x = x + 30,lpapi.drawText(`${j.buy_number}  `, x, y,3)
    x = x + 12,lpapi.drawText(`${j.price} `, x, y,3),x = x + 12,lpapi.drawText(`${j.total_price} `, x, y,3)
    x = x + 10,y = y + 5,x = 0, lpapi.drawText(`规格：${j.specvalue}`, x, y, 3), x = x + 30
    y = y + 3,lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
    y = y + 5

    lpapi.endDrawLabel();


    }else{
      
      let width = 90,height = 12

      if(this.data.dgcount == len ){
        height = 30
      }

      lpapi.startDrawLabel('test', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(0)
    
      if(j == undefined){
        

        wx.showToast({
          title: '打印完毕，请点击关闭按钮',
          icon:"none"
        })
         lpapi.endDrawLabel();
        
      }
       let y = 0 ,x = 0
        x = 0,y = y + 4,lpapi.drawText(`${this.data.dgcount}.${j.title}`, x, y,3),x = x + 30,lpapi.drawText(`${j.buy_number}  `, x, y,3)
        x = x + 12,lpapi.drawText(`${j.price} `, x, y,3),x = x + 12,lpapi.drawText(`${j.total_price} `, x, y,3)
        x = x + 10,y = y + 5,x = 0, lpapi.drawText(`规格：${j.specvalue}`, x, y, 3), x = x + 30
        y = y + 3,lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
        y = y + 3
       lpapi.endDrawLabel();
  
    }


     if(j == undefined){
      lpapi.endDrawLabel();
      return 
    }
    a.splice(0,1)
     lpapi.print(function () {
      that.data.dgcount ++ 
      that.draw()
   })
  },
  printing: function (e) { //生成打印数据
    this.toggleDialog()
    this.openPrinter() //连接打印机    为空就是列表第一个
    let print = e.currentTarget.dataset.details.details
    let item = e.currentTarget.dataset.details
   

    var width = 80;
    var height = 30* print.length ;

    if(print.length <= 2){ 
      height = 100
    }else if(print.length >= 10){
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
  
      if(print[i].goods_mark == ''){
        print[i].goods_mark = "无"
      }
      x = 0
      y = y + 5
      lpapi.drawText(`${print[i].title}`, x, y,3)
      x = x + 20
      lpapi.drawText(`${print[i].buy_number}  `, x, y,4)
      x = x + 20
      lpapi.drawText(`${print[i].price} `, x, y,4)
      x = x + 20
      lpapi.drawText(`${print[i].total_price} `, x, y,4)
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
  
    // this.setData({
    //   canvasHeight: height2,
    // })
  },
   toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });


  },
  // zym
  getLoc: function (e) {
    // //console.log(e.currentTarget.id);  // 获取当前点击的数组下标
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res) {
        //使用微信内置地图查看位置接口
        wx.openLocation({
          latitude: parseFloat(108.35090248706055), // 要去的地址经度，浮点数
          longitude: parseFloat(22.797464226614665), // 要去的地址纬度，浮点数
          name: '行行超甜酒店', // 位置名
          address: "要去的地址详情说明", // 要去的地址详情说明
          scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        });
      },
      cancel: function (res) {
        //console.log('地图定位失败');
      }
    })
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

        console.log("PeisongList",_this.data.PeisongList)


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

    //console.log(params)

    let res = await ajax({
      url: 'api/staff/completeOrder',
      method: 'post',
      data: params
    })

    //console.log("确认送达", res)

    if (res.data.code == 0) {
      wx.showToast({
        title: '已确认送达',
      })

      this.getDistributorClerkList()
      this.getPeisongList()
    }



  },

  // 一键取货
  async pickOrder(e){
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/staff/pickOrder',
      method: 'post',
      data: params
    })
    
    if(res.data.data.detailcount == res.data.data.pickcount){
      that.getDeliveryClerkList()
    }else{
      wx.showToast({
        title: '供应商未接单',
        icon:"none"
      })
    }

    console.log("pickOrder",res.data.data)

    
  },

  async takeDelivery(e) { //取货
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/staff/pick',
      method: 'post',
      data: params
    })

    //console.log("取货", res)

    if (res.data.msg == "success") {

      wx.showToast({
        title: '取货成功',
        icon: 'none',
        duration: 3000
      })
      that.getDeliveryClerkList()
      that.lookApi()
      // 行行超甜

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  returnAndExchange(e) { //退换货
    //console.log(e);
    this.setData({
      tuidanModal: true,
      shopExch: e.currentTarget.dataset.item
    })
  },
  //打印
  
  print() {
    
    lpapi.print(function(){
      wx.showToast({
        title: '打印成功',
      })
    });
  },
  hideModal() {
    this.setData({
      tuidanModal: false
    })
  },
  async onConfirmTui() { //拒绝原因
    var that = this
    if (that.data.shopReason == undefined) {
      wx.showToast({
        title: '请输入拒绝原因',
        icon: "none",
        duration: 3000
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
    let res = await ajax({
      url: 'api/quickorder/confirm',
      method: 'post',
      data: params
    })
    //console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        duration: 3000
      })
      that.setData({
        tuidanModal: false
      })
    } else {
      // wx.showToast({
      //   title: res.data.msg,
      //   icon: 'none',
      //   duration: 3000
      // })
    }
  },
  async onCancelTui() { //确认退单
    var that = this
    // order_id=订单id, order_detail_id ,status=1同意,4拒绝  ,  title = 拒绝原因   type=1退货退款,2换货
    let params = {
      order_id: that.data.shopExch.id,
      order_detail_id: that.data.shopExch.order_id,
      status: 1,
      type: that.data.shopExch.is_after_type
    }
    let res = await ajax({
      url: 'api/quickorder/confirm',
      method: 'post',
      data: params
    })
    //console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        duration: 3000
      })
      that.setData({
        tuidanModal: false
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  shopNum(e) { //配送员输入的数量
    this.setData({
      shopNum: e.detail.value
    })
  },
  inputChangeTui(e) { //获取配送员输入发拒单原因
    this.setData({
      shopReason: e.detail.value
    })
  },
  shopPrice(e) { //配送员输入的价格
    this.setData({
      shopPrice: e.detail.value
    })
  },
  onCancel() {
    this.setData({
      showModal: false,
    })
  },
  async onConfirm() { //修改数量和价格
    var that = this
    if (that.data.shopPrice == '') {
      wx.showToast({
        title: '请输入价格',
        icon: 'none',
        duration: 3000
      })
      return
    }
    let params = {
      id: that.data.shopOneInfo.id,
      price: that.data.shopPrice,
      number: that.data.shopNum,
    }
    let res = await ajax({
      url: 'api/staff/upOrderByStaff',
      method: 'post',
      data: params
    })
    //console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '修改成功',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
    that.setData({
      showModal: false
    })
  },
  async orderReceiving(e) { //接单
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    //console.log('object', params);
    let res = await ajax({
      url: 'api/staff/sendture',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '接单成功',
        duration: 3000
      })
      that.setData({
        showModal: true,
        shopOneInfo: e.currentTarget.dataset.item
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: "none",
        duration: 3000
      })
    }
  },
  look(e) { //查看清单
    var that = this
    that.setData({
      detailedId: e.currentTarget.dataset.id,
      detailedIndex: e.currentTarget.dataset.index,
    })
    //console.log(e.currentTarget.dataset)
    that.lookApi()
  },

  async lookApi() {
    var that = this
    let idx = that.data.detailedIndex //点击哪个商品的索引
    let params = {
      id: that.data.detailedId
    }
    //console.log("params", params)
    let res = await ajax({
      url: 'api/staff/getOrderDetail',
      method: 'post',
      data: params
    })

    //console.log("lookApi", res.data.data)

    if (res.data.code == 0) {
      let shopInfo = res.data.data
      let deliveryList = that.data.deliveryList
      let peisongList = that.data.PeisongList
      let finshList = that.data.deliveryListYes

      for (var i = 0; i < shopInfo.length; i++) {
        shopInfo[i].spec = JSON.parse(shopInfo[i].spec)
      }
      for (let i in deliveryList) {
        if (i == idx) {
          deliveryList[i].is_select = !deliveryList[i].is_select
        } else {
          deliveryList[i].is_select = false
        }
      }
      for (let i in peisongList) {
        if (i == idx) {
          peisongList[i].is_select = !peisongList[i].is_select
        } else {
          peisongList[i].is_select = false
        }
      }

      for (let i in finshList) {
        if (i == idx) {
          finshList[i].is_select = !finshList[i].is_select
        } else {
          finshList[i].is_select = false
        }
      }

      that.setData({
        contact: true,
        shopInfo,
        PeisongList: peisongList,
        deliveryListYes: finshList,
        deliveryList
      })

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  clickTab(e) {

    let that = this

    this.setData({
      currentTab: e.currentTarget.dataset.current
    })

    if (e.currentTarget.dataset.current == 3) {
      this.getDistributorClerkList()
    } else if (e.currentTarget.dataset.current == 2) {
      that.getPeisongList()
    } else if (e.currentTarget.dataset.current == 1) {
      that.getDeliveryClerkList()
    }
  },
  async getDeliveryClerkList() { //获取配送员未处理订单
    var that = this
    let params = {
      status: 0
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })
    console.log("获取配送员未处理订单", res)
    if (res.data.code == 0) {

      let deliveryListOne = res.data.data.data
      for (var i = 0; i < deliveryListOne.length; i++) {
        deliveryListOne[i].is_select = false
      }
      //console.log("deliveryListOne", deliveryListOne)
      that.setData({
        deliveryList: deliveryListOne,
        total: res.data.data.total,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  detalis(e){    //跳转去详情页

    console.log(e.currentTarget.dataset.shouhuo)
    
    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`,
    })
  },
  // 配送中的数据
  async getPeisongList() {
    let params = {
      status: 1
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })

    console.log("peisongList",res)
    let peisongList = res.data.data.data
    for (var i = 0; i < peisongList.length; i++) {
      peisongList[i].is_select = false
    }

    this.setData({
      PeisongList: peisongList,
      total2: res.data.data.total,
    })
    //console.log("total2", this.data.total2)
  },

  async getDistributorClerkList() { //获取配送员已处理订单
    var that = this
    let params = {
      status: 2
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      //console.log('获取配送员已完成订单', res)

      let deliveryListYes = res.data.data.data
      for (var i = 0; i < deliveryListYes.length; i++) {
        deliveryListYes[i].is_select = false
      }


      let total = res.data.data.total
      that.setData({
        // deliveryListYes: that.data.deliveryListYes.concat(res.data.data.data),
        deliveryListYes: res.data.data.data,
        total3: res.data.data.total,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },





})