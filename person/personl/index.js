//index.js
//获取应用实例
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
const app = getApp()

Page({
  data: {
    city: '成都',
    currentTab: 1,
    showModal: false,
    tuidanModal: false,
    shuliangModal: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    recoverySlops:[]    //泔水回收数量
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
  recoveryNum(e){
    var that = this
    console.log(e)
    let index = e.currentTarget.dataset.index
    let num = e.detail.value
    let recoverySlops = that.data.recoverySlops
    recoverySlops[index] = num
    that.setData({
      recoverySlops
    })
  },
 async submitNum(e){
   var that = this
   console.log(e)
   let index = e.currentTarget.dataset.index
   let id = e.currentTarget.dataset.id
   let params = {
     id,
     number: that.data.recoverySlops[index]
   }
   let res = await ajax({ url: 'api/staff/UpSubmit', method: 'post',data:params })
   if (res.data.code == 0) {
     console.log(res)
     wx.showToast({
       title: '提交成功',
      duration:3000
     })
    //  that.setData({
    //    myResponsible: res.data.data
    //  })
   }else{
     wx.showToast({
       title:res.data.msg,
       icon:'none',
        duration:3000
     })
   }
  },
  async getPersonnel(){
      var that = this
    let res = await ajax({ url: 'api/staff/recovery', method: 'get'})
    if(res.data.code == 0){
      console.log(res)
      that.setData({
        myResponsible:res.data.data
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      tuidanModal: false,
      shuliangModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  onLoad: function () {
    this.getPersonnel()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
