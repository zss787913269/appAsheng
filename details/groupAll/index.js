import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()
var time = require('../../utils/util.js')
// details/questions/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupShop:'', //   当前组团的商品
    num:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getGroup(options.id)
  },
  async getGroup(id) {   //获取组团信息
    var that = this
    let res = await ajax({
      url: 'api/index/getGroupGoodsByCategoryId',
      method: 'POST',
      data: {
        category_id: id
      }
    })
    //  console.log(res)
    if (res.data.code == 0) {
      let groupShop = res.data.data
      that.setData({
        groupShop
      })
      for (var i = 0; i < groupShop.length; i++) {
        groupShop[i].start_time = time.formatTimeTwo(groupShop[i].start_time, 'D号')
        // groupShop[i].end_time = time.formatTimeTwo(groupShop[i].end_time, 'M月D日 h')
        groupShop[i].raise_time_sta = time.formatTimeTwo(groupShop[i].raise_time_sta, 'M月D日 h')
        groupShop[i].send_time = time.formatTimeTwo(groupShop[i].send_time, 'D号 h')
        groupShop[i].purchase = false
        // if (groupShop[i].)
        that.getNowPrice(groupShop[i].id, groupShop[i].gid,groupShop[i].spec,i)
      }
      console.log(groupShop)
     that.setData({
       groupShop
     })
     
    } else {
     wx.showToast({
       title: res.data.msg,
       icon:'none',
       duration:3000
     })
    }
  },
 async hotelPurchase(e){    //酒店采购
    var that = this
    let params = {
      buy_type: "goods",
      is_purchase: 1,
      is_group_buy:1,   //组团商品
      activity_id:that.data.activityId, //活动id
      stock:that.data.num,   //商品数量
      goods_id:that.data.shopId,   //商品id
      spec: that.data.spce,   //商品规格
      price:e.currentTarget.dataset.price,    //当前价格
    }
    console.log(params)
    let res = await ajax({
      url: '/api/buy/add',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration:3000
      })
      wx.switchTab({
        url: '/private/hotelpeople/index',
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  async getNowPrice(activity_id, goods_id,specTime,i){   //查询价格
   
    var that = this
    console.log(specTime[0].value[0])
    let groupShop = that.data.groupShop
    let params = {
      activity_id,
      goods_id,
      spec:[{
        type: specTime[0].title,
        value: specTime[0].value[0]
      }]
    }
    let res = await ajax({
      url: 'api/index/getGroupPrice',
      method: 'POST',
      data: params
    })
    console.log(res.data.code)
    if(res.data.code == 0){
      groupShop[i].nowPrice = res.data.data
      that.setData({
        groupShop
      })
    }
    console.log(res)
    console.log(that.data.groupShop)
  },
  clickPurchase(e){
    let groupShop = this.data.groupShop
    let num = this.data.num
    for (var i = 0; i < groupShop.length; i++) {
      if (e.currentTarget.dataset.index == i){
        groupShop[i].purchase = true
      }else{
        groupShop[i].purchase = false
      }
    }
  num = groupShop[e.currentTarget.dataset.index].goods_number
      this.setData({
        groupShop,
        num,
        groupShopIndex:e.currentTarget.dataset.index,
        activityId: groupShop[e.currentTarget.dataset.index].id,   //活动id
        shopId: groupShop[e.currentTarget.dataset.index].gid,   //商品id
        spce:[{                       //商品规格
          type: groupShop[e.currentTarget.dataset.index].spec[0].title,
          value: groupShop[e.currentTarget.dataset.index].spec[0].value[0],
        }]
      })
  },
  bindPlus(){   //商品数量加
    let num = this.data.num
    num++
    this.setData({
      num
    })
  },
  bindMinus(){    //商品数量减
    let num = this.data.num
    if(num >1){
      num--
    }
    this.setData({
      num
    })
  },
 personalPurchase(){   //个人购买
    // pages/cartdetal/index
   if (this.data.num < this.data.groupShop[this.data.groupShopIndex].goods_number ){
     wx.showToast({
       title: '最低购买数量' + this.data.groupShop[this.data.groupShopIndex].goods_number,
       icon:'none',
       duration:3000
     })
     return
   }
  //  活动id，商品规格，商品id，数量
   let shopAttribute = {
     id: this.data.activityId,
     shopId: this.data.shopId,
     spec:this.data.spce,
     num:this.data.num
   }
   console.log(shopAttribute)
   shopAttribute = JSON.stringify(shopAttribute)
   wx.navigateTo({
     url: `/pages/cartdetal/index?where=group&shopAttribute=${shopAttribute}`,
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