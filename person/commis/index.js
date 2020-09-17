//index.js
//获取应用实例
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()

Page({
  data: {
    city: '成都',
    currentTab: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page:1,
    noTime:false,
    userCommission:'',    //用户佣金信息  
    userCommisOne: [],   //一级人脉
    userCommisTwo:[],   //二级人脉
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    // }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    var that = this
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    that.getCommission(that.data.page)
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
      var that = this
      that.setData({
        page:that.data.page + 1
      })
    that.getCommission(that.data.page)
  },
  withdrawal(){    //佣金提现
      wx.navigateTo({
        url: '/details/confirm/index',
      })
  },
  toCommissionInfo(e){   //去佣金详情页面
  console.log(e)
  var that = this
    let item = e.currentTarget.dataset.item
    let id = e.currentTarget.dataset.id
  let index = e.currentTarget.dataset.index
    if (index == 1){   //一级人脉
      wx:wx.navigateTo({
        url: `/person/details/index?grade=${index}&id=${id}`,
      })
    }else if(index == 2){   //二级人脉 
      wx: wx.navigateTo({
        url: `/person/details/index?grade=${index}&id=${item.id}&pid=${item.pid}`,
      })
    }
    
  },
  async getCommission(num){   //获取佣金列表
      var that = this
    let res = await ajax({ url: '/api/user/yongJ', method: 'POST', data:{page:num} })
    console.log(res)
    if(res.data.code == -1){
      that.setData({
        noTime:true
      })
    }else{
      if(res.data.data.data.total_yong === null){
        res.data.data.data.total_yong = 0.00
      }
      that.setData({
        noTime: false,
        userCommission:res.data.data.data,
        userCommisOne: that.data.userCommisOne.concat(res.data.data.data.one),
        userCommisTwo: that.data.userCommisTwo.concat(res.data.data.data.two)
      })
    }
    console.log(that.data.userCommission)
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
