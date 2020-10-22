//index.js
var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'

//获取应用实例
var app = getApp()


Page({
  data: {
    zymdata:[],
    dgcount:1,
    printdata:[],
    classfiySelect: "",
    orderlist: '',
    shopAttribute: '',
    currentTab: '',
    shopId: '', //商品id
    showDialog: false,
    showDialog2: false,
    countNumber: "", //输入框数量
    show: false,
    hotelOrderDetail: [], //商品
    title: "",
    id: "",
    showjd:false,
    count: "" ,//商品原本的数量
    showqh:"",
    showdy:"",//打印按钮
    canvasWidth: 30,
    canvasHeight: 10,
    hotelAddress:"",
    tel:""

  },

  onLoad: function (options) {
 
    // console.log(options)

    let that = this

    // let options = {
    //   id:190,
    //   enter:"dy"
    // }

    this.setData({
      shopId:options.id
      // shopId:160
    })

  
    if(options.enter == 4){
      that.setData({
        show:true
      })
    }else if(options.enter == 5){
      that.setData({
        showjd:true
      })
    }else if(options.enter == 6){
      that.setData({
        showqh:true
      })
    }else if(options.enter == 'dy'){
      that.setData({
        showdy:true
      })
    }

    console.log(options.enter)

    this.getlist(this.data.shopId)
    this.getOrderShop(this.data.shopId)
    this.getHotelOrderDetail(this.data.shopId)
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

    // let mydata = e.currentTarget.dataset.data
    let list = this.data.orderlist
    let item = this.data.orderlist.details
   


    console.log("item",item)
   let  t = item[0]
    this.setData({
      zymdata:item,
      printdata:item
    })
    this.openPrinter();this.toggleDialog2()
    var width = 70;
    var height = 60;
    let j = this.data.orderlist
    
    lpapi.startDrawLabel('test', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(0)
  
    let y = 0 ,x = 0
    y = y + 5,lpapi.drawText(`商家出货单`, 22, y, 5),y = y + 8,lpapi.drawText(`编号：${j.hotel_id}`, 0, y, 5)
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

    let k =  this.data.orderlist
    let len = this.data.hotelOrderDetail.length
    let a = this.data.printdata

    console.log(a,"a")
    let j = a[0]
    let that = this

    // 数据打印完 就没了 
    // 如果再次点击的时候 让数据还在
    // 需要把外部的也删除 因为递归的时候 如果不删除就会重新读取 那么永远都是第一个
    // 

    console.log(this.data.dgcount,"递归长度")
    console.log(len,"数据长度")

    if(this.data.dgcount == 1){

      lpapi.startDrawLabel('test', this, 100, 50, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(0)
  
    let y = 0 ,x = 0
    y = y + 5,lpapi.drawText(`商家出货单`, 22, y, 5),y = y + 8,lpapi.drawText(`编号：${k.hotel_id}`, 0, y, 5)
    y = y + 5,lpapi.drawText(`商品数量：${a.length}`, 0, y, 5)
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
      
      let width = 90,height = 14

      // if(this.data.dgcount == len ){
      //   height = 30
      // }

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
  printing: function () { //生成打印数据

    // let print = this.data.orderlist.details
    
    let item = this.data.orderlist

    this.openPrinter()

    // console.log(print,"print")
    console.log(item,"item")

    let width = 100,height = 80 + 12*item.details.length
    console.log(height)
     this.toggleDialog2()
      lpapi.startDrawLabel('test', this, width, height, 0);
      lpapi.setItemOrientation(0)
      lpapi.setItemHorizontalAlignment(0);
      lpapi.setPrintPageGapType(0)
    let y = 0 ,x = 0
     y = y + 5,lpapi.drawText(`商家出货单`, 22, y, 5),y = y + 8,lpapi.drawText(`编号：${item.hotel_id}`, 0, y, 5)
     y = y + 5,lpapi.drawText(`商品数量：${item.details.length}`, 0, y, 5)
     y = y + 5,lpapi.drawText(`商品总价：${item.total_price}`, 0, y, 5),y = y + 5,lpapi.drawText(`时间：${item.add_time}`, 0, y, 5)

     y = y + 8,lpapi.drawText(`商品名`, x, y, 4),x = x + 30,lpapi.drawText(`数量 `, x, y, 4),
     x = x + 12,lpapi.drawText(`单价`, x, y, 4),x = x + 12, lpapi.drawText(`总价`, x, y, 4),x = x + 5,y = y + 2
      for(let i in item.details){
      x = 0,y = y + 4,lpapi.drawText(`${Number(i)+1}.${item.details[i].title}`, x, y,3),x = x + 30,lpapi.drawText(`${item.details[i].buy_number}  `, x, y,3)
      x = x + 12,lpapi.drawText(`${item.details[i].price} `, x, y,3),x = x + 12,lpapi.drawText(`${item.details[i].total_price} `, x, y,3)
      x = x + 10,y = y + 5,x = 0, lpapi.drawText(`规格：${item.details[i].specvalue}`, x, y, 3), x = x + 30
      y = y + 3,lpapi.drawText(`-----------------------------------------------------------------`, 0, y, 3)
      // lpapi.drawText(`备注：${print[i].goods_mark}`, x, y, 3)
      // y = y + 3
    }
    y = y + 10
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
  async onekey(e) { // 按照订单 一键接单
    var that = this
    let id = this.data.shopId


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
      this.getHotelOrderDetail(this.data.shopId)
     
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000
      })
    }
  },
  // 确认收货
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
      
    this.getHotelOrderDetail(this.data.shopId)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
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

    console.log("res",res.data)
    this.getHotelOrderDetail(this.data.shopId)

    if (res.data.msg == "success") {

      wx.showToast({
        title: '取货成功',
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
 
  async completeOrderDetail(e){
    let that = this
    let id = e.currentTarget.dataset.id
    let res = await ajax({
      url: 'api/order/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    if(res.data.code == 0){
      that.getHotelOrderDetail(that.data.shopId)
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:"none"
      })
    }
   
 
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
    this.getHotelOrderDetail(this.data.shopId)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 300
      })
    }
  },

  // 一键收货
  async getAllHotel(){
    let that = this
    let id = this.data.shopId
    //console.log(id)

    let params = {
      id
    }

    let res = await ajax({
      url: 'api/order/collect', method: 'POST', data: params
    })

   

    if(res.data.code == 0){
      wx.showToast({
        title: '收货成功',
        icon:"none"
      })
      that.getHotelOrderDetail(that.data.shopId)
    }

  

  },

  toggleDialog2() {
    this.setData({
      showDialog2: !this.data.showDialog2
    });

    // console.log(1232)
    // lpapi.closePrinter()

  },
  toggleDialog(e) {

    let that = this
    this.setData({
      title: "",
      countNumber: ""
    })

    if (e.currentTarget.dataset.id != undefined) {
      that.setData({
        id: e.currentTarget.dataset.id,
        count: e.currentTarget.dataset.count
      })
    }

    this.setData({
      showDialog: !this.data.showDialog,
    });

  },
  // 点击左侧
  clickLeftItem(e) {
    let that = this

    let id = e.currentTarget.dataset.id;

    that.setData({
      classfiySelect: id
    })

  },
  // 一键取货
  async pickOrder(e){

    let that = this
    let id = this.data.shopId
    let params = {
      id
    }
    let res = await ajax({
      url: 'api/staff/pickOrder',
      method: 'post',
      data: params
    })

    if(res.data.data.detailcount == res.data.data.pickcount){
      that.getHotelOrderDetail(that.data.shopId)
    }else{
      wx.showToast({
        title: '供应商未接单',
        icon:"none"
      })
    }
    
  },

  
  async getHotelOrderDetail(id) {

    let that = this

    let res = await ajax({
      url: 'api/order/HotelOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    // zym
    console.log("getHotelOrderDetail", res.data)

    let hotelOrderDetail = that.data.hotelOrderDetail

    if (res.data.code == 0) {
      hotelOrderDetail = res.data.data
      
      this.setData({
        hotelOrderDetail,
        classfiySelect:hotelOrderDetail[0].id
      })
    }

   

  },

  // 请输入理由
  inputTitle(e) {
    let value = e.detail.value;
    this.setData({
      title: value
    })
  },
  // 请输入数量
  inputedit(e) {
    let value = e.detail.value;
    let count = this.data.count

    if (value > count) {
      value = count
    }

    this.setData({
      countNumber: value
    })

  },
  // 确认按钮
  async config(e) {
    let that = this
    let number = this.data.countNumber,
      title = this.data.title,
      order_detail_id = this.data.id,
      order_id = this.data.shopId

      let params = {
        order_id,
        title,
        number,
        order_detail_id,
        type: 1
      }
  
    if (number == "") {
      wx.showToast({
        title: '请输入数量',
        icon: "none",
        duration: 1000
      })
    } else {

      let res = await ajax({
        url: 'api/quickorder/delivery',
        method: 'POST',
        data: params
      })
      //console.log(res.data)

      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        
        that.setData({
          showDialog: !that.data.showDialog,
        });
        
         that.getHotelOrderDetail(that.data.shopId)
      }
    }

  },

  scroll1: function (e) {

    wx.pageScrollTo({
      selector: "#main",
      duration: 100
    })
  },
  async getOrderShop(id) { //获取订单二级列表
    let that = this
    let res = await ajax({
      url: 'api/order/getCategoryById',
      // url:'api/order/BrandOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    ////console.log("secondaryClassification",res.data.data)
    if (res.data.code == 0) {
      that.setData({
        secondaryClassification: res.data.data,
        currentTab: res.data.data[0].category_id
      })
      that.getsecondaryClassShop(this.data.secondaryClassification[0].category_id)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async getsecondaryClassShop(category_id) { //根据二级分类id和订单id获取商品
    let that = this
    let params = {
      id: that.data.shopId,
      category_id
    }
    let res = await ajax({
      url: 'api/order/getGoodsById',
      method: 'POST',
      data: params
    })
    ////console.log(res)
    if (res.data.code == 0) {
      let secondaryClassShop = res.data.data
      for (var i = 0; i < secondaryClassShop.length; i++) {
        secondaryClassShop[i].spec = JSON.parse(secondaryClassShop[i].spec)
      }
      that.setData({
        secondaryClassShop
      })
      ////console.log(that.data.secondaryClassShop)
      // that.getsecondaryClassShop(this.data.secondaryClassification[0].category_id)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  exchange(e) { //退换货
    // ////console.log(this.data.shopAttribute)
    // order_id = 订单id, title = 退货理由 order_detail_id = 商品详情id, price = 价格, number = 数量
    // type = 1退货退款, 2换货
    // let shopAttribute = this.data.shopAttribute
    let shop = {
      order_id: this.data.shopId,
      order_detail_id: e.currentTarget.dataset.item.id,
      price: e.currentTarget.dataset.item.price,
      number: e.currentTarget.dataset.item.buy_number
    }
    shop = JSON.stringify(shop)
    // let shop = JSON.stringify(this.data.shopAttribute)
    wx.navigateTo({
      url: `/pages/exchange/index?shop=${shop}`,
    })
  },
  clickTab(e) { //
    // ////console.log(e.currentTarget.datascurrentTarget.datasetet.index)
    var that = this
    let currentTab = e.currentTarget.dataset.current //当前二级分类id
    let index = e.currentTarget.dataset.index
    that.setData({
      // shopAttribute: that.data.orderlist.items[index],
      currentTab
    })
    that.getsecondaryClassShop(currentTab)
  },

  async getlist(id){
    let that = this

    console.log(id)

    let res = await ajax({
      url: 'api/Order/OrderInfo',
      method: 'POST',
      data: {
        id: id
      }
    })


    console.log('酒店订单信息',res.data.data)

    if (res.data.code == 0) {
      let address = ""
      let tel = ""
      if(res.data.data[0].address ==null){
        address = res.data.data[0].hotel_address,
        tel = res.data.data[0].hotel_tel
      }else{
        address = res.data.data[0].address.address
        tel = res.data.data[0].address.tel
      }
      this.setData({
        orderlist: res.data.data[0],
        hotelAddress:address,
        tel:tel
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }

 
  },

  
  async addSelfShop() {
    var that = this
    let params = {
      type: 1,
      order_id: that.data.shopId,
      order_detail_id: that.data.shopAttribute.id
    }
    let res = await ajax({
      url: 'api/quickorder/SelfOrderAdd',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
        duration: 3000
      })
      // that.getlist(that.data.shopId)
      that.getsecondaryClassShop(taht.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async deletShop(e) { //删除商品
    var that = this
    ////console.log(e)
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/Quickorder/delete',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 3000
      })
      // that.getlist(that.data.shopId)
      that.getsecondaryClassShop(that.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  add(e) { //商品加
    var that = this
    let tableList = that.data.shopAttribute;
    let num = parseInt(tableList.buy_number);
    num = num + 1;
    tableList.buy_number = num;
    this.setData({
      shopAttribute: tableList
    })
    that.getShopNum(num, that.data.shopAttribute.id)
  },
  // 跳转详情
  sub(e) { //商品减
    var that = this
    let tableList = that.data.shopAttribute;
    let num = parseInt(tableList.buy_number);
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    if (num == 0) {
      num = 1
    }
    tableList.buy_number = num;
    that.setData({
      shopAttribute: tableList
    })
    // this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    that.getShopNum(num, that.data.shopAttribute.id)
  },
  async getShopNum(num, id) {
    var that = this
    let params = {
      id: id,
      number: num
    }
    let res = await ajax({
      url: 'api/Quickorder/updateNumber',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
        duration: 3000
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