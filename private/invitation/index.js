import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listindex: 1,
      code:'',    //邀请二维码
      title:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
      
  },
  onShow(){
    this.getMsg()

    let code =  wx.getStorageSync('QRcode')



    this.setData({
      code:`${code}`
    })
  

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
  clicklist(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      listindex: index
    })
  },
  go(){
      wx.navigateTo({
        url: '/pages/yongjin/index',
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this

  },

  
  async clickImg(){
    // api/index/Invite

    let res = await ajax({
      url: 'api/user/Invite',
      method: 'get',
    
    })

 

      let that = this
    if(res.data == '' ){
      wx.navigateTo({
        url: "/component/zation/index"
      })
    }else{
      that.setData({ code:`${res.data}` })

        wx.setStorage({
          data: res.data,
          key: 'QRcode',
        })
    }

    console.log(res)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let referrer=wx.getStorageSync('enid');
    let that = this
    console.log("that.data.titl",that.data.title)
    return {
      title:that.data.title,
      path: "/private/invitation/index?referrer="+referrer
    }
  }
  // onShareAppMessage: function () {
  //   let referrer=wx.getStorageSync('enid');
  //   console.log("referrer",referrer)
  //   return {
  //     title:"自定义标题",
  //     path: "/private/invitation/index",
  //     imageUrl:"../../images/tabar/car.png"
  //   }
  // }

})