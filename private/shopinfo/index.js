// private/shopinfo/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getInfo()
  },


  onShow: function () {

  },

  async getInfo(){
      let res = await ajax({
        url:"api/user/storeInfo",
        method:"post"
      })
      console.log(res.data)
      if(res.data.code == 0){
        
        this.setData({
          list:res.data.data
        })
      }
  }

})