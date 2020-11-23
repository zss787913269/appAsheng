import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/orderlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listindex: 1,
    currentTab: 1,
    select: 1,
    selected: 1,
    listData: [],
    shopInfo:"",
    shopConnections:'',   //商铺下级人脉
    lineList:[],
    xiajiaList:[]

  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    ////console.log(that.data.currentTab)
    if (that.data.currentTab == 2){
      that.getShopOneClass()
    }
  },
  clickList(e) {
    let index = e.currentTarget.dataset.index

    this.setData({
      listindex: index
    })

    

    this.getShopGoodsList()
  },
  select: function (e) {
    var that = this;
    that.setData({
      select: e.currentTarget.dataset.name
    })
  },
  selected: function (e) {
    var that = this;
    that.setData({
      selected: e.currentTarget.dataset.name
    })
  },
  async getShopOneClass() {    //获取店铺的一级，二级
    var that = this
    let res = await ajax({
      url: 'api/store/getStoreXiaJi',
      method: 'post',
    })
    that.setData({
      shopConnections: res.data.data.data
    })
    ////console.log(res)
  },
  async getShopInfo(){    //获取店铺信息
      var that = this
    let res = await ajax({
      url: 'api/store/getMyStoreInfo',
      method: 'post',
    })
    ////console.log("getShopInfo",res.data.data);
    if(res.data.code == 0){
      that.setData({
        shopInfo: res.data.data.data
      })
      ////console.log('shopInfo',res);
    } else if (res.data.code == -2){
      wx.showToast({
        title:'没有申请店铺，请去我的页面申请',
        icon:'none',
        duration:3000
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '/details/becomeShop/index'
        })
      },1500)
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
    
    // ////console.log(res)
  },
  async getShopGoodsList() {    //获取店铺商品
    var that = this

    let index = that.data.listindex
    let params 
    if(index == 1){
      params= {
        shelves:1
      }
    }else{
      params= {
        shelves:0
      }
    }
    
    
    console.log("params",params)
    let res = await ajax({
      url: 'api/store/StoreGoodsList',
      method: 'post',
      data: params
    })

    if(res.data.code == 0){
      console.log("获取店铺商品",res.data.data.data)
      let listData = res.data.data.data.data
   
  
      for(var i = 0; i<listData.length;i++){
        listData[i].show_keyword = JSON.parse(listData[i].show_keyword)
      }
      if(res.data.code == 0){
        ////console.log(listData)
        that.setData({
          listData
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          icon: 'none',
          duration: 3000,
        })
      }
  
    }

    
  },
  deleteS(e) {    //删除店铺商品
    var that = this

   
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      async success (ss) {
        if (ss.confirm) {
          let res = await ajax({
            url: 'api/store/delete',
            method: 'post',
            data:{
              id:e.currentTarget.dataset.id
            }
          })
          if(res.data.code == 0){
            wx.showToast({
              title: '删除成功',
              icon:'none',
              duration:3000
            })
            that.getShopGoodsList()
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:3000
            })
          }
        } else if (ss.cancel) {
          ////console.log('用户点击取消')
        }
      }
    })

  },
  xiajia(e) {    //删除店铺商品
    var that = this

    ////console.log(e.currentTarget.dataset.id)
   
    wx.showModal({
      title: '提示',
      content: '确认下架吗',
      async success (ss) {
        if (ss.confirm) {
          let res = await ajax({
            url: 'api/store/goodsxiajia',
            method: 'post',
            data:{
              id:e.currentTarget.dataset.id
            }
          })
          ////console.log("dataset",e.currentTarget.dataset.id)
          ////console.log(res.data)
          if(res.data.code == 0){
            wx.showToast({
              title: '下架成功',
              icon:'none',
              duration:3000
            })
            that.getShopGoodsList()
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:3000
            })
          }
        } else if (ss.cancel) {
          ////console.log('用户点击取消')
        }
      }
    })

  },
  editS(e){
    let a=e.currentTarget.dataset.item;
    wx.setStorageSync({
      data: a,
      key: 'shopInfo',
    })
      wx.navigateTo({
        url: `/details/addshop/index?id=${e.currentTarget.dataset.id}&&name=${e.currentTarget.dataset.name}`,
      })
  },
  addClass(){
    
    wx:wx.navigateTo({
      url: '/details/addshop/index',
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopInfo()
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
    var that = this
    that.getShopGoodsList()
    
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