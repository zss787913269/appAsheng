var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/handle/index.js
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    zymshopprice:"",
    countList: [],
    listindex: 3,
    classfiySelect: "",
    page: 1,
    currentTab: 1,
    shopInfo: '',
    canvasWidth: 30,
    canvasHeight: 10,
    shopOrderList: [], //未接单
    shopCompleteList: [], //已完成
    first: true,
    dayTime: "",
    showDialog: false,
    shouhuo: "",
    shopname:"",
    shopgg:"",
    shopprice:"",
    shopcount:"",
    shopid:"",
    specvalue:"",
    spectype:"",
    original_price:"",
    zymid:"",
    shoplen:"",
    showDialog2:false,
    printshow:false,
    xxcount:"",
    printdata:[],
    biaoqian:false,
    lianxu:false,
    showDialog3:false,
    dataList:[]
  },
  openPrinter: function () {
    // lpapi.scanedPrinters((didGetScanedPrinters) => {
    //   console.log(didGetScanedPrinters)
    //   })
    let that = this
    lpapi.openPrinter('', function () {
      that.setData({
        printshow:true
      })
      wx.showToast({
        title: '连接打印机成功',
        icon: '',
      })
    }, function () {
      that.setData({
        printshow:false
      })
      wx.showToast({
        title: '打印机连接断开',
        icon: '',
      })
    })
  },

  allprint(e) { //生成打印数据
    // 全部商品打印

    // console.log(e.currentTarget.dataset.data)

    let mydata = e.currentTarget.dataset.data

    let item,len
    if(mydata){
      item = mydata
      len = mydata.length
    }else{
   len = this.data.shoplen
      item = this.data.shopOrderList
    }
    console.log("打印数据",item)
   
    var width = 100;
   
   
    var height = 50 * len;
    // var height = 400

  //   if(len < 10 ){
  //      height = 24 * len;
  //   } else if(len >= 10 && len < 20){
  //     height = 16 * len 
  // }else if(len >= 20){
  //       height = 20 * len + 20
  //   }


    console.log(height)
    // var height = len

    // if(len < 10 ){
    //   height = 45 * len
    // }


    // 如果高度大于40 长度变成35


    this.openPrinter()
    this.toggleDialog2()
  
    
  
   
    lpapi.startDrawLabel('test1', this, width, height, 0);
    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    lpapi.setPrintPageGapType(2)

    let y = 5
    let x = 0
  //   y = y + 5
  //   lpapi.drawText(`商品汇总单`, 20, y, 5)
  //   y = y + 5
  //       for (let i of item) {
  //         x=0
  //         y = y + 5
  //   lpapi.drawText(`类别: ${i.name}`, x, y, 4)
  //   x = x + 40
  //   lpapi.drawText(`类别数量：${i.details.length} `, x, y, 4)
  //   y = y + 5
  //   x = 0
  
  //   lpapi.drawText(`商品名`, x, y, 4)
  //   x = x + 20
  //   lpapi.drawText(`数量 `, x, y, 4)
  //   x = x + 20
  //   lpapi.drawText(`单价`, x, y, 4)
  //   x = x + 20
  //   lpapi.drawText(`总价`, x, y, 4)
  //   x = x + 5
  //   y = y + 2

  //   for (let j of i.details) {
  //     x = 0
  //     y = y + 4
  //     lpapi.drawText(`${j.title}`, x, y,3)
  //     x = x + 20
  //     lpapi.drawText(`${j.buy_number}  `, x, y,4)
  //     x = x + 20
  //     lpapi.drawText(`${j.price} `, x, y,4)
  //     x = x + 20
  //     lpapi.drawText(`${j.total_price} `, x, y,4)
  //     x = x + 10
  //     y = y + 5
  //     x = 0
  //     lpapi.drawText(`规格：${j.specvalue}`, x, y, 3)
  //     x = x + 30
  //     y = y + 2
  //     // lpapi.drawText(`备注：${print[i].goods_mark}`, x, y, 3)
  //     // y = y + 3
  //   }
    
  // }
   
    for (let j of item) {
  

        y = y + 10
        lpapi.drawText(`商品名：${j.title}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`单价：${j.price}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`总价：${j.total_price}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`数量：${j.buy_number}`, 0, y, 5)
        y = y + 5
        lpapi.drawText(`规格：${j.specvalue}`, 0, y, 5)
        y = y + 10
      
    }
    lpapi.endDrawLabel();


  },
  zymprint(){
    // this.toggleDialog()
    // this.openPrinter() //连接打印机    为空就是列表第一个
    // let print = e.currentTarget.dataset.details.details
    // let item = e.currentTarget.dataset.details
   
    let item = this.data.shopOrderList
    var width = 100;
    console.log("打印数据",this.data.shoplen)
    let len = this.data.shoplen
    var height = 35 * len;


    // var width = 80;
    // var height = 30* print.length ;

    // if(print.length <= 2){ 
    //   height = 100
    // }else if(print.length >= 10){
    //   height = 17 * print.length
    // }
    // // let height2 = 200* print.length;

    // console.log(height)

    // console.log(print.length)
    



    // lpapi.startDrawLabel('test', this, width, height, 0);

    // lpapi.setItemOrientation(0)
    // lpapi.setItemHorizontalAlignment(0);
    // let y = 5
    // let x = 0
    // y = y + 5
    // lpapi.drawText(`酒店验货单`, 20, y, 5)
    // y = y + 10
    // lpapi.drawText(`酒店名称：${item.hotel_name}`, 0, y, 4)
    // y = y + 5
    // lpapi.drawText(`下单时间：${item.add_time}`, 0, y, 4)
    // y = y + 5
    // lpapi.drawText(`配送地址：${item.hotel_address}`, 0, y, 3)
    // y = y + 10

  
    // lpapi.drawText(`商品名`, x, y, 4)
    // x = x + 20
    // lpapi.drawText(`数量 `, x, y, 4)
    // x = x + 20
    // lpapi.drawText(`单价`, x, y, 4)
    // x = x + 20
    // lpapi.drawText(`总价`, x, y, 4)
    // x = x + 5
    // y = y + 2
    // for (let i = 0; i < print.length; i++) {
  
    //   if(print[i].goods_mark == ''){
    //     print[i].goods_mark = "无"
    //   }
    //   x = 0
    //   y = y + 5
    //   lpapi.drawText(`${print[i].title}`, x, y,3)
    //   x = x + 20
    //   lpapi.drawText(`${print[i].buy_number}  `, x, y,4)
    //   x = x + 20
    //   lpapi.drawText(`${print[i].price} `, x, y,4)
    //   x = x + 20
    //   lpapi.drawText(`${print[i].total_price} `, x, y,4)
    //   x = x + 10
    //   y = y + 5
    //   x = 0
    //   lpapi.drawText(`规格：${print[i].specvalue}`, x, y, 3)
    //   x = x + 30
    //   lpapi.drawText(`备注：${print[i].goods_mark}`, x, y, 3)
    //   y = y + 3
    // }
    // y = y + 5
    // lpapi.drawText(`共计：${print.length}件商品`, 0, y, 4)
    // y = y + 5
    // lpapi.drawText(`商家总价：${item.total_price}元`, 0, y, 4)
    // y = y + 10
    // lpapi.drawText(`验收员签名：`, 0, y, 4)
 
    // y = y + 20


   
    lpapi.endDrawLabel();
  },

  getoprice(e){
    var value = e.detail.value
    console.log(value)
    this.setData({
      original_price:value
    })
    if(this.data.printshow){
      this.enterPrint()
    }
  
  },

  getprice(e){
    var value = e.detail.value
    this.setData({
      shopprice:value
    })
    if(this.data.printshow){
      this.enterPrint()
    }
  },
  getcount(e){
    var value = e.detail.value
    this.setData({
      shopcount:value
    })
    console.log(this.data.shopcount,"数量")
    if(this.data.printshow){
      this.enterPrint()
    }
  },
  // 打开弹出框,设置弹出框的值
  opendig(e){

    console.log(e)

    this.toggleDialog()
    if(this.data.listindex == 3){
      this.openPrinter()
    }
      
    let shop = e.currentTarget.dataset.item
    console.log("商品",shop)
    this.setData({
      zymid:shop.id,
      shopname:shop.title,
      shopgg:shop.specvalue,
      specvalue:shop.specvalue,
      spectype:shop.spectype,
      shopcount:shop.buy_number,
      shopprice:shop.price,
      shopid:shop.goods_id,
      original_price:shop.original_price,
      xxcount:e.currentTarget.dataset.count

    })
    if(this.data.listindex == 3){
      if(this.data.printshow){
        this.enterPrint()
      }
    }
   
  },

  enterPrint() { //点击确认的时候 生成打印数据并打印
   

    var width = 80;
    var height = 50
 
    lpapi.startDrawLabel('test', this, width, height, 0);
    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    lpapi.setPrintPageGapType(2)
    
    let y = 5
        y = y + 5
        lpapi.drawText(`商品名：${this.data.shopname}`, 0, y, 5)
        y = y + 10
        lpapi.drawText(`规格：${this.data.shopgg}`, 0, y, 5)
        y = y + 10
        lpapi.drawText(`单价：${this.data.shopprice}元`, 0, y, 5)
        // y = y + 5
        // lpapi.drawText(`成本价：${this.data.original_price}元`, 25, y, 5)
        y = y + 10
        lpapi.drawText(`数量：${this.data.shopcount}`, 0, y, 5)
      
        y = y + 10

    lpapi.endDrawLabel();



  },
  // 打成功以后在打下一个 如果判断打成功 如果成功以后在绘制下一个
  // 打印第一个 第一个打完绘制下一个
  showImg(e){
    this.toggleDialog3()
    console.log(e.currentTarget.dataset.data)

    let sum = 0
    for(let i of e.currentTarget.dataset.data.details){
        sum = sum +  Number(i.original_price) * Number(i.buy_number)
    }
    console.log(sum)

    this.setData({
      dataList:e.currentTarget.dataset.data,
      zymshopprice:sum
    })
    
    

  },
  printText2(e){
    this.setData({
      biaoqian:false,
      lianxu:true
    })
    console.log(e.currentTarget.dataset.data)

   

    // this.openPrinter();this.toggleDialog2()
  

    // let list = e.currentTarget.dataset.data,height = 100 + list.details.length*12,width = 90

    //     lpapi.startDrawLabel('test1', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(2)
  
    // let y = 0,x = 0
 
    //   y = y + 10,lpapi.drawText(`商品分类名称：${list.name}`, 0, y, 5)
    //   y = y + 5, lpapi.drawText(`类别数量：${list.details.length}`, 0, y, 5)


    //   lpapi.endDrawLabel();


    this.toggleDialog2()
    this.openPrinter() //连接打印机    为空就是列表第一个
    lpapi.setPrintPageGapType(0)
    let print = e.currentTarget.dataset.data.details
    let item = e.currentTarget.dataset.data
   
    let allprice = 0
      

    var width = 80;
    var height = 12 * print.length + 60;

  


    lpapi.startDrawLabel('test1', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    lpapi.setPrintPageGapType(0)
    let y = 5
    let x = 0
    for (let i = 0; i < print.length; i++) {
      allprice = allprice + Number(print[i].original_price)*Number(print[i].buy_number)
      // console.log(allprice)
    }
 
    console.log(allprice,"总价")

    lpapi.drawText(`分类名称：${item.name}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`总价：${allprice}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`分类数量：${print.length}`, 0, y, 4)
    y = y + 10

  
    lpapi.drawText(`商品名`, x, y, 4)
    x = x + 30
    lpapi.drawText(`数量 `, x, y, 4)
    x = x + 13
    lpapi.drawText(`单价`, x, y, 4)
    x = x + 13
    lpapi.drawText(`总价`, x, y, 4)
    x = x + 5
    y = y + 2
    for (let i = 0; i < print.length; i++) {
      

      
     
      x = 0
      y = y + 5
      lpapi.drawText(`${i+1}.${print[i].title}`, x, y,3)
      x = x + 30
      lpapi.drawText(`${print[i].buy_number}  `, x, y,4)
      x = x + 13
      lpapi.drawText(`${print[i].original_price} `, x, y,3)
      x = x + 13
      let sum = Number(print[i].original_price)*Number(print[i].buy_number)
      lpapi.drawText(`${sum} `, x, y,3)
      x = x + 10
      y = y + 5
      x = 0
      lpapi.drawText(`规格：${print[i].specvalue}`, x, y, 3)
      x = x + 30
      if(print[i].goods_mark != ''){
        lpapi.drawText(`备注：${print[i].goods_mark}`, x, y, 3)
      }
      y = y + 5
      x = 0
      lpapi.drawText(`-------------------------------------------------------------------`, x, y, 3)
     
    
    }
 
    lpapi.endDrawLabel();
   
  },

  printText(e){

    console.log(e.currentTarget.dataset.data)

    this.setData({
      biaoqian:true,
      lianxu:false
    })

    let mydata = e.currentTarget.dataset.data
    let item = []
    let that = this
    if(mydata){
      item = mydata
    }else{
      for(let i of that.data.shopOrderList){
        for(let j of i.details){
          item.push(j)
        }
      }
    }

    console.log("item",item)
    
    this.setData({
      printdata:item
    })
    this.openPrinter();this.toggleDialog2()
    var width = 70;
    var height = 80;
    let j = this.data.printdata[0]
    lpapi.startDrawLabel('test1', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(2)
  
    let y = 10,x = 7
    y = y + 5,lpapi.drawText(`订单编号：${j.hotel.user_id}`, x, y, 5)
      y = y + 10,lpapi.drawText(`商品名：${j.title}`, x, y, 5)
      y = y + 5, lpapi.drawText(`单价：${j.price}`, x, y, 5)
      y = y + 5, lpapi.drawText(`总价：${j.total_price}`, x, y, 5)
      y = y + 5,lpapi.drawText(`数量：${j.buy_number}`, x, y, 5)
      y = y + 5,lpapi.drawText(`规格：${j.specvalue}`, x, y, 5)
      y = y + 10
     lpapi.endDrawLabel();
    //  that.data.printdata.splice(0,1)
   
  },
  draw(){
    var width = 70;
    var height = 80;
    let j = this.data.printdata[0]
    let that = this
    console.log("打印数据",j)

    // if(this.data.printdata.length == 0){
    //   wx.showToast({
    //     title: '打印完毕，请点击关闭按钮',
    //   })
    // }

    lpapi.startDrawLabel('test1', this, width, height, 0);lpapi.setItemOrientation(0);lpapi.setItemHorizontalAlignment(0);lpapi.setPrintPageGapType(2)
    
    if(j == undefined){
      wx.showToast({
        title: '打印完毕，请点击关闭按钮',
        icon:"none"
      })
       lpapi.endDrawLabel();
      
    }
    
    let y = 30,x = 30
    y = y + 5,lpapi.drawText(`订单编号：${j.hotel.user_id}`, 0, y, 5)
      y = y + 10,lpapi.drawText(`商品名：${j.title}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`单价：${j.price}`, 0, y, 5)
      y = y + 5, lpapi.drawText(`总价：${j.total_price}`, 0, y, 5)
      y = y + 5,lpapi.drawText(`数量：${j.buy_number}`, 0, y, 5)
      y = y + 5,lpapi.drawText(`规格：${j.specvalue}`, 0, y, 5)
     
      y = y + 10
     lpapi.endDrawLabel();

    //  if(this.data.printdata.length == 0){
    //     this.toggleDialog2()
    //  }

     if(j == undefined){
   
      return 
    }

    that.data.printdata.splice(0,1)
  
    
     lpapi.print(function () {
  
     
      that.draw()
    
      
   })

  //  console.log("打印数据",j)

  //  先绘制 生成第一个
  },
  print2(){
    let that = this
    lpapi.print(function () {
      
      wx.showToast({
        title: '打印成功',
        icon: "none"
      })
   })
 
  },
 
  async print() { //点击打印按钮
    let that = this



    if(this.data.listindex == 3 ){
      if(this.data.printshow){
        this.enterPrint()
      }
    }
    
    // console.log(this.data.shopid)
    // console.log(this.data.original_price)
    //  console.log(this.data.shopcount)
    //    console.log(this.data.shopprice)

       let params = {
         id:this.data.zymid,
         price:this.data.shopprice,
         number:this.data.shopcount,
         original_price:this.data.original_price,
         spectype:this.data.spectype,
         specvalue:this.data.specvalue

       }

       

     
        console.log(params,"params")
     
        if(this.data.listindex == 1 || this.data.xxcount == 1){
          let res = await ajax({
            url: 'api/order/EditOrderDetailGoods',
            method: 'POST',
            data: params
          })
          that.receipt(that.data.zymid)
          console.log("EditOrderDetailGoods",res.data)
          that.toggleDialog()
        }else if(this.data.listindex == 3){
          if(that.data.printshow){
            lpapi.print(function () {
            
              wx.showToast({
                title: '打印成功',
                icon: "none"
              })
              that.toggleDialog()
            })
           
          }else{
            that.toggleDialog()
          }
        }
  
 


  },
  toggleDialog() {

    this.setData({
      showDialog: !this.data.showDialog
    });
   
    // lpapi.closePrinter()

  },
  toggleDialog3() {

    this.setData({
      showDialog3: !this.data.showDialog3
    });
   
    // lpapi.closePrinter()

  },
  toggleDialog2() {

    this.setData({
      showDialog2: !this.data.showDialog2,
     
    });
   
   
    // lpapi.closePrinter()

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

  async receipt(id) { //接单
    var that = this
    let params = {
      status: 1,
      id: id
    }

    console.log("params",params)

    let res = await ajax({
      url: 'api/store/updateStatus',
      method: 'POST',
      data: params
    })

    console.log("接单",res)


    if (res.data.code == 0) {
      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration: 300
      })
    
      that.getShopList()
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
    console.log("订单打印",item)
    let y = 5
    y = y + 5
    lpapi.drawText(`下单时间：${item.add_time}`, 0, y, 3)
    y = y + 5
    for (let i = 0; i < print.length; i++) {
      y = y + 5
      lpapi.drawText(`商品名：${print[i].title}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`单价：${print[i].price}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`总价：${print[i].total_price}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`数量：${print[i].buy_number}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`规格：${print[i].specvalue}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`备注：`, 0, y, 5)
      y = y + 5
    }
    y = y + 15
    lpapi.drawText(`地址：${item.hotel.address}`, 0, y, 2)
    y = y + 5
    lpapi.drawText(`总价：${p}`, 0, y, 5)
    y = y + 15
    lpapi.endDrawLabel();
    this.toggleDialog()


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

    // let res2 = await ajax({
    //   url: 'api/store/OrderCount',
    // })

    // console.log("商家订单", res2.data)
    // if (res2.data.code == 0) {

    //   let countList = res2.data.data

    //   if (this.data.first) {

    //     if (countList[0] != 0) {
    //       currentTab = 1
    //     } else if (countList[1] != 0) {
    //       currentTab = 2
    //     } else if (countList[2] != 0) {
    //       currentTab = 3
    //     }
    //     num = currentTab

    //     that.setData({
    //       first: false
    //     })
    //   }

    //   if (currentTab == undefined) {
    //     currentTab = that.data.currentTab
    //   }



    //   this.setData({
    //     count1: countList[0],
    //     count2: countList[1],
    //     count3: countList[2],
    //     currentTab: currentTab
    //   })








        if (listindex == 1) {
          params = {
            type: 3,
            isok: 0,
          }
        }else if(listindex == 3){
          params = {
            type: 5,
            isok: 1,
          }
        } else {
          params = {
            type: 4,
            isok: 1,
          }
        }
      

      //  1按商品汇总，2按订单号，3按商品分类
      // 确认等于接单
      console.log(params)
      let res = await ajax({
        url: "api/order/ShopOrderPrint",
        method: 'POST',
        data: params
      
      })
      console.log("获取商家订单", res.data)

     

      if (res.data.code == 0) {
          let arr = []
        for(let i of res.data.data){
            for(let j of i.details){
                arr.push(j)
            }
        }

        that.setData({
          shopOrderList: res.data.data.reverse(),
          shoplen:arr.length
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