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
    avtor:"",
    showmain:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
      var that = this

      console.log(options.avtor)
      this.setData({
        avtor:options.avtor
      })

      this.geiUserInfo()
   
  },    
  gotoshenqing(){
    wx.navigateTo({
      url: '/details/information/index',
    })
  },
  back(){
    wx.navigateBack({
      delta: 0,
    })
  },
  //跳转编辑页面
  async geiUserInfo(){

    let that = this
        let res=await ajax({
          url: '/api/dishes/getSelfCookInfo',
          method: 'get',
      })
      console.log("获取个人信息",res.data.data,);

      if(res.data.code == 0){
        let data = res.data.data

        if(res.data.data.type_1 == 2){
          that.setData({
            showmain:true
          })
        }

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
      }else{
    
        this.setData({
          showmain:false
        })
      }
       
  },
  edit(){
    this.setData({
      showmain:true
    })
  },
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
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: params })

    if(res.data.code == 0){

      that.getMyMakeList()

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
    let res = await ajax({ url: 'api/user/upMakeStatus', method: 'POST', data: params})
    console.log(res.data)
    if (res.data.code == 0) {
   
      that.getMyMakeList()
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
  async getMyMakeList(){
      var that = this
   
    let res = await ajax({ url: 'api/user/makeListToSelf', method: 'POST'})
    console.log("makeList",res.data)
    if(res.data.code == 0){

      that.setData({
        makeList:res.data.data.data
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
    this.geiUserInfo()
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