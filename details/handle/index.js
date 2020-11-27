var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
Page({
  data: {
    listindex: 1, //点击切换
    classfiySelect: "",
    page: 1,
    canvasWidth: 30,
    canvasHeight: 10,
    shopOrderList: [], //未接单
    shopCompleteList: [], //已完成
    shouhuo: "", //详情收货按钮
    showDialog3: false,
    screenHeight: "",
    checkValue: "",
    page: 1, //页面的递进数
    canPull: true, //下拉是否触发
    allPage: 1, //总页数
    showModalStatus: false, //遮罩的显示与隐藏
    popEditList: {}, //点击修改价格后获取的对象
    getEditPrice:"",//修改之后的价格
    getEditCount:"",//修改之后的数量
    orderFirst:"",//在订单列表点击 还是在打印列表点击
    dataList:[],//选择弹出的数组
  },
  showImg(e){
   
    this.toggleDialog3()
    
    let arr = [],sum = 0
    if(e.currentTarget.dataset.item){
        arr = e.currentTarget.dataset.item.details
    }else{

      let value = this.data.checkValue

   
    
       for(let i of value){
        let obj = {}
          obj.title = i.split(",")[0]
          obj.specvalue = i.split(",")[1]
          obj.buy_number = i.split(",")[2]
          obj.original_price =i.split(",")[3]
          arr.push(obj)
       }  
    }


    for(let i of arr){
        sum = sum +  Number(i.original_price) * Number(i.buy_number)
    }
    console.log(sum)

    this.setData({
      dataList:arr,
    })
    
    

  },
  //选择框
  showConfirmPrice(e) { //弹出修改价格框  行行超甜 11.19

    console.log(e.currentTarget.dataset)

    let item = e.currentTarget.dataset


    this.setData({
      popEditList: item.item,
      orderFirst:item.order
    })

    this.showModal()
  },
 
  getEditCount(e){
    this.setData({getEditCount:e.detail.value })
  },
  getEditPrice(e){
    this.setData({getEditPrice:e.detail.value})
  },
  async confirmEditPrice(e) { //点击确认价格 行行超甜 11.19
    let item = this.data.popEditList,that = this
    let params = {
      id: item.id,
      price: item.price,
      number: this.data.getEditCount == false ? item.buy_number : this.data.getEditCount,
      original_price: this.data.getEditPrice == false ? item.original_price : this.data.getEditPrice,
      spectype: item.spectype,
      specvalue: item.specvalue
    }
  
    let res = await ajax({  url: 'api/order/EditOrderDetailGoods', method: 'POST', data: params })
    console.log(res.data)
    if(res.data.code == 0){
      this.getShopList()
      if(that.data.orderFirst == 1){ this.receipt(item.id)  } 
      wx.showToast({
        title: '修改成功',
        icon:'none'
      })
      this.hideBuyModal()
    }else{
      if(res.data.msg == '修改失败'){
        wx.showToast({
          title: '价格跟数量未发生改变',
          icon:'none'
        })
      }
    }

  },
  hideBuyModal() {// 隐藏遮罩层
    let animation = wx.createAnimation({duration: 200, timingFunction: "ease", delay: 0})
    this.animation = animation
    animation.translateY(300).step()
    this.setData({animationData: animation.export(), })
    setTimeout(function () { animation.translateY(0).step()
      this.setData({ animationData: animation.export(),showModalStatus: false  }) }.bind(this), 200)
  },
  showModal() {  // 遮罩层显示
    let animation = wx.createAnimation({duration: 200, timingFunction: "ease", delay: 0 })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({animationData: animation.export(),showModalStatus: true })
    setTimeout(() => {animation.translateY(0).step(),this.setData({ animationData: animation.export()})}, 200)
  },
  checkboxChange(e) {
    let value = e.detail.value
    this.setData({ checkValue: value})
  },

  toggleDialog3() {
    this.setData({ showDialog3: !this.data.showDialog3});
  },
  onLoad: function () {
    let that = this
    wx.getSystemInfo({success(res) {that.setData({screenHeight: res.windowHeight - 90}) }})
  },
  onShow() {
    this.getShopList() //未接订单
  },
  goDetail(e) {
    wx.navigateTo({url: "/details/detail/index?id=" + e.currentTarget.dataset.id})
  },
  detalis(e) { //跳转去详情页
    wx.navigateTo({ url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`})
  },
  //点击切换列表
  clickList(e) {
    this.setData({ listindex: e.currentTarget.dataset.index })
    this.getShopList()
  },
  godetails(e) {
      wx.navigateTo({url: '/details/detail/index?id=' + e.currentTarget.dataset.id})
  },
  async receipt(id) { //接单 zym 11.19
    console.log("id",id)

    let uid

      if(id.currentTarget){
        uid = id.currentTarget.dataset.item
      }else{
        uid = id 
      }
  
    var that = this
    let params = { status: 1,id: uid}
    let res = await ajax({url: 'api/store/updateStatus', method: 'POST',data: params})
    console.log("接单", res.data)
    if (res.data.code == 0) {
      wx.showToast({ title: '接单成功',icon: 'none', duration: 1000 })
      that.getShopList()
    } else {
      wx.showToast({title: res.data.msg,icon: 'none',duration: 1000}) 
    }
  },
  async getCompleteList() {
    let res = await ajax({
      url: 'api/order/ShopOrderOK',
      method: "POST"
    })
    if (res.data.code == 0) { this.setData({ shopCompleteList: res.data.data})}
  },
  clickLeftItem(e) { // 点击左侧
    this.setData({classfiySelect: e.currentTarget.dataset.id})
  },
  async getShopList(page) { //获取商家订单
    // type = 2  按照订单 isok = 0 是未接单 type = 3  商品汇总 isok = 1 已接单   type = 3   isok = 2 已完成
    let that = this,params, listindex = this.data.listindex
      if (listindex == 1) {params = { type: 3,isok: 0,}} 
      else if (listindex == 2) {params = {type: 5, isok: 1, } } 
      else {params = {type: 4, isok: 1,page: 1 } }
    //  1按商品汇总，2按订单号，3按商品分类
    console.log(params)
    let res = await ajax({url: "api/order/ShopOrderPrint", method: 'POST', data: params})

    console.log(res.data)
    if (res.data.code == 0) {
      let arr = []
      for (let i of res.data.data.data) { for (let j of i.details) { arr.push(j) } }
      let shopOrderList = res.data.data.data
      if (listindex == 1 || listindex == 2) {
        shopOrderList.sort(function (a, b) {
          if (a.name.indexOf("自定义商品") >= 0) {// 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
            return -1;} 
            else if (b.name.indexOf("自定义商品") >= 0) {return 1 } 
            else {return a.name.localeCompare(b);}
        })
        that.setData({shopOrderList: shopOrderList,})
      } else {
        console.log("页数",this.data.page)
        if (this.data.page == 1) {this.setData({ canPull: true }),this.setData({shopOrderList: res.data.data.data,allPage: res.data.data.page_total })
        if(res.data.data.page_total == 1){this.setData({canPull:false})}
        } else {
          console.log("页数",this.data.page)
          if (that.data.allPage == that.data.page) { that.setData({ canPull: false})}
          let shopOrderList = that.data.shopOrderList.concat(res.data.data.data) 
          that.setData({shopOrderList: shopOrderList})
        }
      }
    }
  },
  onReachBottom: function () {
    let that = this
      if (this.data.canPull) { let page = ++this.data.page;wx.showLoading({title: '玩命加载中'})
      if (that.data.listindex == 3) {that.getShopList(page)} setTimeout(() => { wx.hideLoading()}, 1000)} 
      else { wx.showToast({title: '没有更多数据',icon: 'none' })}},
})