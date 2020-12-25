import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    myshow:false,
    title:"",
    urls: "https://wxapp.mccxx.com/static/banner/wxapp/",
    show: false,
    listindex: 1,
    showDialog: false,
    hotelId:"",
    list:[],yjlist:[],
    role:true,
    yongj_total:"",
    avtor:"",
    nickname:"",
    hotelList:[]
  
  },
  onLoad: function (option) {
    app.globalData.token = wx.getStorageSync('token')
    var that = this

    this.getHotel()
    this.getMsg()
    console.log("option",option)
    this.setData({
      avtor:option.avtor,
      nickname:option.nickname
    })

    // if(option.role == 1 || option.role == 2 || option.role == 6){
    //   this.setData({
    //     role:false,
    //   })
    // }



    this.getList()

  },
  async getMsg(){
    
    let res = await ajax({
      url: '/api/index/adtitle',
      method: 'get',
      data:{
        type:1
      }
    })

    this.setData({
      title:res.data
    })
    console.log(res.data)
  },
  goIndex(e){
    console.log(e.currentTarget.dataset.item)
   let  item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/myYongjin/index?item='+ JSON.stringify(item) ,
    })
  },
  async getHotel(){
    let that = this
    let res = await ajax({
      url: '/api/hotel/myhotel',
      method: 'get'
    })
    console.log("酒店",res.data)
    if(res.data.code == 0){

      this.setData({
        myshow:false,
        hotelList:res.data.data
      })
    }else{
      this.setData({
        myshow:true,
      })
    }
  },
  async getHotel2(){
    let that = this
    let res = await ajax({
      url: 'api/hotel/myhotel2',
      method: 'get'
    })
    console.log("酒店1111",res.data)
    if(res.data.code == 0){
      this.setData({
        hotelList:res.data.data,
        myshow:false
      })
    }else{
      this.setData({
        hotelList:'',
        myshow:true
      })
      wx.showToast({
        title: res.data.msg,
        icon:'none'
      })
    }
  },
  clicklist(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      listindex: index
    })
    if(index == 1){
      this.getHotel()
    }else{
      this.getHotel2()
    }
   
  },
  async getList(){
    let that = this
    let res = await ajax({
      url: '/api/yongjin/myuser',
      method: 'get'
    })

    console.log("佣金",res.data)
    if(res.data.code == 0){

      let yongj_total 
      if(res.data.data.user.yongj_total != 0){
       yongj_total = Number(res.data.data.user.yongj_total) - Number(res.data.data.user.yongj)
      }else{
        yongj_total = 0
      }
      this.setData({
        yjlist:res.data.data.user,
        yongj_total
      })
    }
  },
  onShow: function () {
    if (app.globalData.token != '') {
      this.setData({
        show: true
      })
    }
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  onShareAppMessage: function () {
    let referrer=wx.getStorageSync('enid');
    let that = this
    let img = wx.getStorageSync('QRcode')
    console.log("that.data.titl",that.data.title)
     console.log("that.data.2321", `${app.globalData.headUrl}${img}`)
    
    return {
      imageUrl: `${app.globalData.headUrl}${img}`,
      title:that.data.title,
      path: "/private/invitation/index?referrer="+referrer
    }
  }
})