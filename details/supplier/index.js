//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()
// details/orderlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    select:1,
    selected:1,
    page:1,   //分页
    notEx: [],   //未审核
    alreadyEx:[],   //已审核

  },
  //点击切换
  clickTab: function (e) {
    var that = this; 
    that.setData({
      currentTab: e.target.dataset.current
    })
   
  },
  notYet() {
    wx.showToast({
      title: '暂未开发',
      icon: 'none',
      duration:3000
    })
  },
  select:function(e){
   var that=this;
   that.setData({
     select: e.currentTarget.dataset.name
   })
  },
  selected:function(e){
   var that=this;
   that.setData({
     selected: e.currentTarget.dataset.name
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      that.getShopList(that.data.page)
  },  
    async getShopList(page){    //获取商家列表
      var that = this
      let params = {
        page
      }
      let res = await ajax({
        url: 'api/staff/store', method: 'POST',data:params
      }) 
      if(res.data.code == 0){
        let businessList = res.data.data.data
        let notExs = []
        let alreadyExs = []
        for (let i = 0; i < businessList.length;i++){
          if (businessList[i].is_enable == 0){
            notExs.push(businessList[i])
          }else{
            alreadyExs.push(businessList[i])
          }
        }
        that.setData({
          notEx: that.data.notEx.concat(notExs),
          alreadyEx: that.data.alreadyEx.concat(alreadyExs)
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          icon:'none',
          duration:3000
        })
      }
     
    },
  async toExamine(e){
    let params = {
      id:e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/staff/StoreToExamine', method: 'POST', data: params
    }) 
    if(res.data.code == 0){
      wx.showToast({
        title: '审核成功',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
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
      that.getShopList(that.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})