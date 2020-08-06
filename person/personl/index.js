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
    recoverySlops: [], //泔水回收数量,
    name: ""
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })

  },
  recoveryNum(e) {
    var that = this

    let index = e.currentTarget.dataset.index

    // 关于小程序多个输入框的解决办法 小程序像vue一样有v-modal 需要自己自定义方法
    // 给输入框一个方法 然后把值 value 跟index传过来 构建成一个数组 传过来的index就是它的index值
    // 传过来的value就是数组的vaue  ["30", "20"]
    // 在提交的时候 也根据传过来的index值来取 
    let num = e.detail.value
    let recoverySlops = that.data.recoverySlops
    recoverySlops[index] = num
    that.setData({
      recoverySlops
    })

  },
  async submitNum(e) {
    var that = this
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id

    let params
    // 如果未改变回收数量的值 那么值就是Undefind 就选择从传来的默认值
    // 如果改变了输入框的值 就取输入框的值
    if (!that.data.recoverySlops[index]) {
      params = {
        id,
        number: e.currentTarget.dataset.number
      }
    } else {
      params = {
        id,
        number: that.data.recoverySlops[index]
      }
    }
    console.log(params)
    let res = await ajax({
      url: 'api/staff/UpSubmit',
      method: 'post',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      that.getPersonnel()
      wx.showToast({
        title: '提交成功',
        duration: 3000
      })

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async getPersonnel() {
    var that = this
    let res = await ajax({
      url: 'api/staff/recovery',
      method: 'get'
    })
    if (res.data.code == 0) {
      console.log("回收员",res)
      that.setData({
        myResponsible: res.data.data,
        name: res.data.data.data[0].nickname
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
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
  async getHotel() {
    let res = await ajax({
      url: '/api/recovery/list',
      method: 'POST',
    })
    let that = this
    console.log("getHotel", res)

    if (res.data.data == null) {
      wx.navigateTo({
        url: '/person/recovery/index',
      })
    } else {
      that.setData({
        hotelList: res.data.data,
        recovery: res.data.data[0].user
      })
    }

    if (res.data.data[0]) {
      that.setData({
        show: true
      })
    }

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