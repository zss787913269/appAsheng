import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/dishname/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ads: ['/images/temp/ad.jpg', '/images/temp/caipin.png'],
    caiId: '',
    foodInfo:'',     //菜品详情
    collection:'收藏',   //是否收藏
    mainFood: '',   //主要食材
    mixedIngredients:'',   //配料
    step:'',    //步骤
    isHidden: true,
    cookInfo:'',   //厨师信息
    seasoning:'',   //调料
    seeStep:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      caiId:options.id
    })
    that.foodInfo()
  },
  async seeStop(){   //查看步骤
    let id = this.data.foodInfo.id
    let res = await ajax({
      url: 'api/dishes/delIntegral',
      method: 'POST',
      data:{id}
    })
    if(res.data.code == 0){
      this.setData({
        seeStep:true
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  toCookList(){
    wx.reLaunch({
      url: '/pages/find/index?index=2'
    })
  },
  toComment(e){
    var that = this
    wx.navigateTo({
      url: `/details/comment/index?id=${that.data.foodInfo.id}`,
    })
  },
  goCook(e){     //去私厨列表
    wx.reLaunch({
      url: `/pages/find/index?userId=${e.currentTarget.dataset.id}&where=cook`
    })
  },
 async foodInfo() { //获取菜品详情
    var that = this
    let data = {
      id:that.data.caiId
    }
    let res = await ajax({
      url: '/api/dishes/detail',
      method: 'POST',
      data
    })
    if(res.data.code == 0){
      let mixedIngredients = JSON.parse(res.data.data.accessories)   //配料
      let mainFood = JSON.parse(res.data.data.main_ingredients)   //主要食材
      let seasoning = JSON.parse(res.data.data.tiaoliao)   //调料
      let step = JSON.parse(res.data.data.step)   //步骤
      that.setData({
        foodInfo: res.data.data,
        mixedIngredients,
        mainFood,
        step,
        seasoning
      })
      that.getCookInfo(res.data.data.user_id)
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
   if (res.data.data.is_collection == 1){
     that.setData({
       collection: '已收藏'
     })
   }
  },
  async getCookInfo(id){
    var that = this
    let data = {
      user_id:id
    }
    let res = await ajax({
      url: '/api/dishes/getSelfCookInfo',
      method: 'POST',
      data: data
    })
    if(res.data.code == 0){
      that.setData({
        cookInfo: res.data.data
      })
    }else{
      ({
        title: res.data.msg,
        icon: 'none'
      })
    }
    console.log(res)
  },
  show: function () {
    this.setData({
      isHidden: false //显示模态框
    })
  },
  sunmit: function () {
    this.setData({
      isHidden: true //显示模态框
    })
  },
  collection(){   //收藏菜品
    var that = this
    that.foodCollection()
  },
  async foodCollection() { //收藏菜品
    var that = this
    let data = {
      id: that.data.caiId
    }
    let res = await ajax({
      url: '/api/dishes/collection',
      method: 'POST',
      data: data
    })
    if(res.data.code == 0){
      wx:wx.showToast({
        title: '收藏成功',
        icon: 'none',
        duration:3000,
      })
      that.setData({
        collection:'已收藏'
      })
    }
    // that.setData({
    //   foodInfo: res.data.data
    // })
    console.log(res)
  },
  seeComment() { //查看全部评论
    var that = this
    wx.navigateTo({
      url: `/details/allcomment/index?id=${that.data.caiId}`,
    })
  },
  seequestions() { //查看全部提问
    var that = this
    wx.navigateTo({
      url: `/details/allquestions/index?id=${that.data.caiId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})