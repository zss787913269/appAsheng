//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
// private/kitchen/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'', // 厨师的内容
    makeList:[],   //预约我的列表
    page:1,
    foods:"",//菜品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    let data = JSON.parse(options.userInfo)
    console.log(data);
    let food_name="";
    data.dishes.forEach(item=>{
      food_name+=item.name+",";
    })
    food_name=food_name.substring(0,food_name.lastIndexOf(','));
    if(food_name===""){
      food_name="无";
    }
      that.setData({
        userInfo: data,
        foods:food_name
      })
      that.getMyMakeList(that.data.page)
  },    
  //跳转编辑页面
  gotoChange(){
    wx.navigateTo({
      url: '/details/information/index?id=1',
    })
  },
  releaseFood(){
    wx.navigateTo({
      url: '/details/dishes/index',
    })
  },
  async accept(e){    //接受
    var that = this
    let params = {
      id:e.currentTarget.dataset.id,
      status:1
    }
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: page })
    if(res.data.code == 0){
      console.log(res)
      wx.showToast({
        title: '接受成功',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async refuse(e) {    //拒绝
    var that = this
    let params = {
      id: e.currentTarget.dataset.id,
      status: 2
    }
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: page })
    if (res.data.code == 0) {
      console.log(res)
      wx.showToast({
        title: '操作成功',
        icon:'none',
        duration:3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async getMyMakeList(page){
      var that = this
      let params = {
        page
      }
    let res = await ajax({ url: 'api/dishes/getMyAllComment', method: 'POST',data:page})
    if(res.data.code == 0){
      console.log(res)
      return
      that.setData({
        makeList:that.data.makeList.concat(res.data.data.data)
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
        var that = this
        that.setData({
          page:that.data.page + 1
        })
        that.getMyMakeList(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})