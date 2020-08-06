// person/slops/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hotelList:[],
      show:false,
      recovery:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotel()

  },

  callPhone: function (e) {

   
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
      fail:()=>{
        console.log("取消拨打")
      }
    })
  },
  async getHotel(){ 
        let res = await ajax({ url: '/api/recovery/list', method: 'POST', })
        let that = this
        console.log("getHotel",res)

         if(res.data.data == null){
            wx.navigateTo({
              url: '/person/recovery/index',
            })
          }else{
            that.setData({
              hotelList:res.data.data,
              recovery:res.data.data[0].user
            })
          }

          if(res.data.data[0]){
            that.setData({
              show:true
            })
          }
        
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      // this.getHotel()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})