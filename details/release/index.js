import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/release/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'', //用餐人数
    time: '', //用餐时间
    requirement: '', //用餐要求
    tel: '', //电话
    address: '' //地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //表单验证规则
    this.WxValidate = app.wxValidate({
      number: {
        required:true,
        digits:true
      },
      tel: {
        required: true,
        tel: true,
      },
      time: {
        required: true,
        // date: true,
      },
      requirement: {
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    },
      {
        number: {
          required: '您填写的人数错误',
        },
        tel: {
          required: '您填写的联系方式错误',
        },
        address: {
          required: '请输入地址',
        },
        time: {
          required: '请输入时间',
        },
        requirement: {
          required: '请输入用餐要求',
        },
      })
  },
  release: function(e) { //获取表单数据
    var that = this;
    var formData = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      console.log(error)
      wx.showToast({
        title: `${error.msg}`,
        duration: 3000,
        icon: 'none'
      })
    } else {
      var number = formData.number;
      var tel = formData.tel;
      var time = formData.time;
      var address = formData.address;
      var requirement = formData.requirement;
      var params = {
        number: number,
        tel: tel,
        yc_time: time,
        note: requirement,
        address: address,
      };
      that.getReleasekitchen(params)
    }
  },

  async getReleasekitchen(e) {

    let res = await ajax({ url: '/api/user/cookadd', method: 'POST', data: e })
    wx.showToast({
      title: '发布成功',
      duration:3000
    })
    wx.navigateBack({

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