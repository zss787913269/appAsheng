// pages/workbench/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'/details/order/index',
    url1:'/details/handle/index',
    url2:'/details/orderlist/index',
    url3:'/details/dishes/index',
    url4:'/details/supplier/index',
    url5:'/private/findone/index',
    url6:'/private/find/index',
    url7:'/private/superStaff/index',
    url8:'/details/handle/index',
    url9:'/details/handled/index',
  url10:'/private/hotelpeople/index',
    url11:'/private/staff/index',
    url12:'/private/staff/index',
    url13:'/pages/deliver/index',
    url14:'/private/placeOrder/index',
    optionList: [ 
      { name: '配送单', url: '/pages/deliver/index' }, 
      { name: '我的店铺订单', url: '/details/handle/index' }, 
      { name: '我的订单', url: '/details/order/index' }, 
      { name: '我的酒店订单', url: '/private/hotelpeople/index' },
      { name: '超级员工', url: '/private/superman/index' }
    ],
    optionListed:[],
    hideFlag: false,//true-隐藏  false-显示
    animationData: {},
  },

  getOption: function (e) {
    var that = this;
    // that.setData({
    //   hideFlag: true,
    // })
    wx.navigateTo({
      url: e.currentTarget.dataset.value

    })
  },
  //取消
  mCancel: function () {
    var that = this;
    that.hideModal();
  },

  // ----------------------------------------------------------------------modal
  // 显示遮罩层
  showModal: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      optionListed: e.currentTarget.dataset.list,
      hideFlag: false,
    })
    // 创建动画实例
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间
      timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
    })
    this.animation = animation; //将animation变量赋值给当前动画
    var time1 = setTimeout(function () {
      that.slideIn();//调用动画--滑入
      clearTimeout(time1);
      time1 = null;
    }, 100)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,//动画的持续时间 默认400ms
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.slideDown();//调用动画--滑出
    var time1 = setTimeout(function () {
      that.setData({
        hideFlag: true,
      })
      clearTimeout(time1);
      time1 = null;
    }, 220)//先执行下滑动画，再隐藏模块

  },
  //动画 -- 滑入
  slideIn: function () {
    this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
    this.setData({
      //动画实例的export方法导出动画数据传递给组件的animation属性
      animationData: this.animation.export()
    })
  },
  //动画 -- 滑出
  slideDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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