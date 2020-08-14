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
    page:1,
    currentTab: 1,
    shopInfo:'',
    canvasWidth: 30,
    canvasHeight: 30,
    printingBtn:false,
    shopOrderList:[],    //商家订单
    shopReceiptList:[],
    shopCompleteList:[]
  },
  //点击切换
  clickTab: function (e) {
    var that = this;

    that.setData({
      currentTab: e.target.dataset.current,
     
    })
    if( e.target.dataset.current == 1){
      that.getShopList()
    
    }else if(e.target.dataset.current == 1){
    
      that.shopConfirm()
    }else if(e.target.dataset.current == 3){
    
      that.shopConfirmComplete()
    }
    //////console..log.log(that.data.currentTab);
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
    ////////console.log..log.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '成功',
        icon:'none',
        duration:300
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:300
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
    ////////console.log..log.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        icon: 'none',
        duration:300
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:300
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
    console.log(res.data)
    if (res.data.code == 0) {
  
      wx.showToast({
        title: '接单成功',
        icon: 'none',
        duration:300
      })
      that.shopConfirm()
      that.getShopList()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:300
      })
    }
  },
  // url="/details/detail/index"

  godetails(e){
      let id =e.currentTarget.dataset.id
      //////console.log..log.log(id)
      wx.navigateTo({
        url: '/details/detail/index?id='+id,
      })
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
   //////console..log.log(res)
   if(res.data.code == 0){
     
     wx.showToast({
       title: '接单成功',
       icon: 'none',
       duration:300
     })
     that.shopConfirm()
     that.getShopList()
     that.getShopInfo()
   }else{
     wx.showToast({
       title:res.data.msg,
       icon:'none',
       duration:300
     })
   }
  },
  // zym
  async getShopInfo(){    //获取店铺状态
    var that = this
    let res = await ajax({
      url: 'api/store/StoreStatus',
      method: 'POST',
      // data: params
    })
    ////console..log.log("获取店铺",res.data.data)
    if (res.data.code == 0) {
      that.setData({
        shopInfo:res.data.data
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:300
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
    //////console..log.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
        icon: 'none',
        duration:300
      })
      that.getShopList()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:300
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
      //////console..log.log(i)
      //////console..log.log(y)
      lpapi.drawText(`订单号：${this.data.shopOrderList[i].order.order_no}`, 0, y, 4)
      y = y + 5
      lpapi.drawText(`商品名：${this.data.shopOrderList[i].title}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`数量：${this.data.shopOrderList[i].buy_number}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`规格：${this.data.shopOrderList[i].spec[0].value}`, 0, y, 5)
      y = y + 15
      //////console..log.log(y)
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
    that.getShopInfo()
    that.getShopList()
    that.shopConfirm()
    that.shopConfirmComplete()

    

  },

  //zym
    async getShopList(num){   //获取商家订单
      ////console..log.log("num",num)
        var that = this
        let params = {
          status:0,
          page:that.data.page
        }
        ////console..log.log("params",params)
      let res = await ajax({
        url: 'api/store/getStoreOrder',
        method: 'POST',
        data: params
      })
  
      if(res.data.code == 0){
  
        let resInfo1 = res.data.data.data
       
        for (let i = 0; i < resInfo1.length; i++) {
         
          resInfo1[i].spec = JSON.parse(resInfo1[i].spec)
        }

  
        that.setData({
          shopOrderList: resInfo1,
          SOtotal:res.data.data.total
        })

        that.getcurrentTab()
      
      }



    },

    getcurrentTab(){
      let that = this
      let currentTab

      if(that.data.shopOrderList.length != 0){
        currentTab = 1
      }else if(that.data.shopReceiptList.length != 0){
        currentTab = 2
      }else if(that.data.shopCompleteList.length != 0){
        currentTab = 3
      }
  
      console.log(currentTab)
  
      this.setData({
        currentTab:currentTab
      })
    },
  
  async shopConfirm(num) {   //获取商家订单已接单
    var that = this

    let params = {
      status: 1,
   
    }

    let res = await ajax({
      url: 'api/store/getStoreOrder',
      method: 'POST',
      data: params
    })

    // console.log(res.data.data)

    let mydata = res.data.data.data

    let obj = {}


    for(let i of mydata){
      console.log(i)

      if(obj[i.user_id]){
        obj[i.user_id]++
      }else{
        obj[i.user_id] = 1
      }

    }

    console.log(obj)

   
 
    if(res.data.code == 0 ){
    
        let resInfo = res.data.data.data

        for (let i = 0; i < resInfo.length; i++) {
         
          resInfo[i].spec = JSON.parse(resInfo[i].spec)
        }

          that.setData({
            shopReceiptList: resInfo,
            ALtotla:res.data.data.total
          })

          that.getcurrentTab()


      }
   
  
  

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

    if (res.data.code == 0) {
      let resInfo = res.data.data.data
      for (let i = 0; i < resInfo.length; i++) {
        resInfo[i].spec = JSON.parse(resInfo[i].spec)
      }

     
      that.setData({
        shopCompleteList: resInfo
      })

      that.getcurrentTab()
    }
 
  },
 
})