// pages/quickly/quickly.js
//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  onLoad: function (options) {
    this.getHotelList()
  },
  async buy(e){

    let id = e.currentTarget.dataset.id
    let params = {
      id:id
    }
    let res = await ajax({
      url: '/api/Quickorder/RepeatOrder', method: 'POST', data: params
    })

    console.log(res.data)
    if(res.data.code == 0){

      wx.switchTab({
        url: "/pages/cart/index",
      })

    }else{
      wx.showToast({
        title: res.data.msg,
        icon:"none"
      })
    }
    
  },
  goDetail(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id="+id,
    })

  },
  async getHotelList(){
    let params = {
      type:1,
      status:4
    }
    
    let res = await ajax({
      url: '/api/quickorder/HotelList', method: 'POST', data: params
    })
    let list
    
        list = res.data.data.data
    
    console.log("getHotelList",res)
    this.setData({
      list:list
    })
    console.log(this.data.list)
  }

 
})