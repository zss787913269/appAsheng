import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

// details/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',   //用户输入的值
    hotSearch:'',   //热门搜索
    meSearch:'',    //个人搜索历史
    where:'',   //从哪里来  
    historicalRecord:true,    //搜索商品就显示历史记录，菜品就不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getHotSearch()
    that.getMeSearch()
    console.log(options.where)
    if (options.where == 'food' && options.where == 'cook'){
      that.setData({
        historicalRecord:false
      })
    }
    that.setData({
      where:options.where
    })
  },
  async  getHotSearch(){    //获取热门搜索
      var that = this
      let res = await ajax({
        url: '/api/search/getKeyWords'
      })
      that.setData({
        hotSearch:res.data.data
      })
      console.log(that.data.hotSearch)
    },
  async  getMeSearch() {    //获取个人搜索历史
    var that = this
    let res = await ajax({
      url: 'api/search/getHistory'
    })
    that.setData({
      meSearch: res.data.data
    })
  },
  searchPage(e){
    var that = this
     that.setData({
       value:e.currentTarget.dataset.text
     })
     console.log(that.data.value)
    that.toSearchResult()
  },
  int(e){   //获取用户输入的搜索值
    var that = this
    that.setData({
      value:e.detail.value
    })
  },
  toSearchResult(){   //去搜索结果页
    var that = this
    wx.navigateTo({
      url: `/details/searchResult/index?value=${that.data.value}&where=${that.data.where}`,
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})