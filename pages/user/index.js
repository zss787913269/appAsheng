import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pledge:"",
    url:'/person/commis/index',
    url1:'/person/integral/index',
    url2:'/person/balance/index',
    ads: ['/images/temp/ad.jpg', '/images/temp/ad_2.jpg'],
    optionList2:{
       id: 1, 
       name: '私厨', 
       url: '/private/superStaff/index', 
       clas: 'fa-user-circle',
        color: '#63dcff' 
    },
    optionList: [
      // { id: 2, name: '我的银行卡', url: '', clas: 'fa-sack-dollar', color: '#fa7aff' },
      { id: 11, name: '个人订单列表', url: '/details/order/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 8, name: '订单处理', url: '/details/handle/index', clas: 'fa-id-badge', color: '#63dcff' },
      { id: 10, name: '酒店订单列表', url: '/private/hotelpeople/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 2, name: '预约列表', url: '/details/preAbout/index', clas: 'fa-sack-dollar', color: '#fa7aff' },
      // { id: 3, name: '我发布的新菜', url: '/private/myFood/index', clas: 'fa-shopping-basket', color: '#f30' },
      //  { id: 4, name: '泔水回收-酒店端', url: '/person/recovery/index', clas: 'fa-trash', color: '#68e28b' },
      // { id: 4, name: '泔水回收-酒店端', url: '/person/slops/index', clas: 'fa-trash', color: '#68e28b' },
      // { id: 5, name: '泔水回收-员工端', url: '/person/personl/index', clas: 'fa-trash', color: '#68e28b' },
      // { id: 6, name: '我的收藏', url: '/person/lection/index', clas: 'fa-tags', color: '#63dcff' },
      { id: 7, name: '我的收货地址', url: '/person/map/index', clas: 'fa-id-badge', color: '#ffa461' }, 
     
      // { id: 9, name: '成为商家', url: '/details/becomeShop/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 10, name: '供应商管理端', url: '/details/supplier/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 11, name: '成为私厨填写信息', url: '/details/information/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 12, name: '成为配送员填写信息', url: '/details/peinformation/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 13, name: '付款成功', url: '/details/payment/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 14, name: '发布菜品', url: '/details/dishes/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 15, name: '发布私厨', url: '/details/release/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 16, name: '核销二维码', url: '/details/writeoff/index', clas: 'fa-id-badge', color: '#63dcff' },
      // { id: 17, name: '酒店人员', url: '/private/hotelpeople/index', clas: 'fa-id-badge', color: '#63dcff'  },
      // { id: 18, name: '人员-自购单', url: '/private/staff/index', clas: 'fa-id-badge', color: '#63dcff'  },
      // { id: 19, name: '员工超级端-信息审核', url: '/private/superStaff/index', clas: 'fa-id-badge', color: '#63dcff'  },
      // { id: 20, name: '菜品回复', url: '/private/Reply/index', clas: 'fa-id-badge', color: '#63dcff'  },
      { id: 21, name: '添加/编辑酒店', url: '/private/hotelAddress/index', clas: 'fa-id-badge', color: '#63dcff'  },
      // { id: 22, name: '关于菜小二', url: '/pages/about/index', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 2, name: '我的银行卡', url: '', clas: 'fa-sack-dollar', color: '#fa7aff' },
      //   // zym
      //   { id: 11, name: '我的订单', url: '', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 8, name: '订单处理', url: '/details/handle/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   { id: 10, name: '酒店订单列表', url: '', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 2, name: '预约列表', url: '/details/preAbout/index', clas: 'fa-sack-dollar', color: '#fa7aff' },
      //   // { id: 3, name: '我发布的新菜', url: '/private/myFood/index', clas: 'fa-shopping-basket', color: '#f30' },
      //   //  { id: 4, name: '泔水回收-酒店端', url: '/person/recovery/index', clas: 'fa-trash', color: '#68e28b' },
      //   { id: 4, name: '泔水回收-酒店端', url: '/person/slops/index', clas: 'fa-trash', color: '#68e28b' },
      //   { id: 5, name: '泔水回收-员工端', url: '/person/personl/index', clas: 'fa-trash', color: '#68e28b' },
      //   // { id: 6, name: '我的收藏', url: '/person/lection/index', clas: 'fa-tags', color: '#63dcff' },
      //   { id: 7, name: '我的收货地址', url: '', clas: 'fa-id-badge', color: '#ffa461' }, 
       
      //   // { id: 9, name: '成为商家', url: '/details/becomeShop/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 10, name: '供应商管理端', url: '/details/supplier/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 11, name: '成为私厨填写信息', url: '/details/information/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 12, name: '成为配送员填写信息', url: '/details/peinformation/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 13, name: '付款成功', url: '/details/payment/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 14, name: '发布菜品', url: '/details/dishes/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 15, name: '发布私厨', url: '/details/release/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 16, name: '核销二维码', url: '/details/writeoff/index', clas: 'fa-id-badge', color: '#63dcff' },
      //   // { id: 17, name: '酒店人员', url: '/private/hotelpeople/index', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 18, name: '人员-自购单', url: '/private/staff/index', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 19, name: '员工超级端-信息审核', url: '/private/superStaff/index', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 20, name: '菜品回复', url: '/private/Reply/index', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 21, name: '添加/编辑酒店', url: '', clas: 'fa-id-badge', color: '#63dcff'  },
      //   // { id: 22, name: '关于菜小二', url: '', clas: 'fa-id-badge', color: '#63dcff'  },
    ] ,
    modality:false,   //模态窗开关 
    commission: '',   //我的佣金   
    integral: '',   //我的积分   
    balance:'',   //我的余额  
   
  },
  onLoad: function () {
    app.globalData.token = wx.getStorageSync('token')
    var that = this
    that.getMyCommission()
  },
  onShow:function(){

    this.getMyCommission()
    this.setData({
      modality: false
    })
    let url = 'api/user/makelistToMy'
    app.wxRequest('GET', url, '', (res)=>{
      if(res.data.code == 0){
        this.setData({
          pre:res.data.data.total
        })
      }
    },(err=>{
      //console.log(err);
    }))
    let url1 = 'api/dishes/getMyAllComment'
    app.wxRequest('POST', url1, '', (res)=>{
      if(res.data.code == 0){
        this.setData({
          reply:res.data.data.total
        })
      }
    },(err=>{
      //console.log(err);
    }))
    let url2 = '/api/user/makelisttoseft'
    app.wxRequest('GET', url2, '', (res)=>{
      //console.log('预约我的',res);
      // if(res.data.code == 0){
      //   this.setData({
      //     reply:res.data.data.total
      //   })
      // }
    },(err=>{
      //console.log(err);
    }))
  },
  goToPage(e){
     let index =  e.currentTarget.dataset.index
      console.log(index)
      

   

      switch (index) {
        case "1":
         wx.showToast({
           title: '功能开发中，敬请期待',
           icon:"none"
         })
        break;
        case "2":
          wx.navigateTo({ url: '/details/order/index'})//个人订单
        break;
        case "3":
          wx.navigateTo({ url: '/person/map/index'})//收货地址
        break;
        case "4":
          //商铺信息
          wx.showToast({
            title: '功能开发中，敬请期待',
            icon:"none"
          })
        break;
        case "5":
          //我的商品
          wx.navigateTo({ url: '/details/handle/index'})//订单列表
        break;
        case "6":
          wx.navigateTo({ url: '/details/myshop/index'})//商品列表
        break;
        case '7':
          wx.navigateTo({ url: '/details/becomeShop/index'})//成为商家
        break;
        case "8":
          //酒店信息
          wx.showToast({
            title: '功能开发中，敬请期待',
            icon:"none"
          })
        break;
        case "9":
          wx.navigateTo({ url: '/private/hotelpeople/index'})//酒店订单
        break;
        case "10":
          wx.navigateTo({ url: '/private/hotelAddress/index'})//注册酒店
        break;
        case "11":
          wx.navigateTo({ url: '/person/recovery/index'}) //泔水回收-酒店
        break;
        case "12":
          wx.navigateTo({ url: '/person/personl/index'})//泔水回收-员工
        break;
        case '13'://配送员
        wx.showToast({
          title: '功能开发中，敬请期待',
          icon:"none"
        })
        break;
        case '14':
          wx.navigateTo({ url: '/pages/deliver/index'})//配送列表
        break;
        case '15':
          wx.navigateTo({ url: '/details/peinformation/index', })//成为配送员
        break;
      }

  },
  gotoikPageS(){
    wx.navigateTo({
      url: `/person/integral/index?integral=${this.data.integral}`,
    })
  },
  gotoikPage: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.url

    })
  },
  // 接单

  golyj(){
      wx.navigateTo({
        url: '/pages/pledge/index',
      })
  },

  waiting:function(e){
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } else {
    wx.navigateTo({
      url: '/details/order/index?id='+e.currentTarget.dataset.id

    })
    }
  },
  privateKitchen(){
    var that = this
    //console.log(111);
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } else {
      that.getCookInfo()
    }
   
  },
  async getMyCommission() {   //获取佣金
    //console.log('yongjing')
    var that = this
    let res = await ajax({
      url: 'api/user/getUserProperty',
      method: 'get',
    })
    if(res.data.data.Yongj === null){
      res.data.data.Yongj = "0.00"
    }
    that.setData({
      commission: res.data.data.Yongj,
      integral: res.data.data.integral,
      balance: res.data.data.normal_money,
      pledge: res.data.data.pledge
    })
    //console.log(res)
  },
  async getCookInfo(){
    var that = this
    let res = await ajax({
      url: '/api/dishes/getSelfCookInfo',
      method: 'get',
    }) 
    //console.log(res)
    
    if(res.data.code == -1){
      that.setData({
        modality:true
      })
    } else if (res.data.data.type_1 == 0){
      wx.showToast({
        title: '审核中',
        icon:'none',
        duration:3000,
      })
    } else if (res.data.data.type_1 == 1){
      wx.showToast({
        title: '未通过',
        icon: 'none',
        duration: 3000,
      })
    } else{
      let data = JSON.stringify(res.data.data)
      wx.navigateTo({
        url: `/private/kitchen/index?userInfo=${data}`,
      })
    }
  },
  determine(){      //用户点击了确定按钮，去申请私厨页面
    wx.navigateTo({
      url: '/details/information/index',
    })
  },
  cancel(){    //用户点击了取消按钮
  var that = this
    that.setData({
      modality: false
    })
  },
  getOption:function(e){

    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    }else{
      //console.log('点击了')
      wx.navigateTo({
        url: e.currentTarget.dataset.url

      })
    }
  }
 
})
