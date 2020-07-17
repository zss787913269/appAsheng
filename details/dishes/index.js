import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/dishes/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishName: '',    //菜名
    describe: '',    //描述
    card_img:[],
    card_imgid:[],    //图片id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  nextStep(){   //进入下一个页面
  var that = this
    if (that.data.dishName == ''){
      wx.showToast({
        title: '请输入菜品名',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if (that.data.describe == '') {
      wx.showToast({
        title: '请描述一下你的作品',
        icon: 'none',
        duration: 3000
      })
      return
    }
    if (that.data.card_imgid == '') {
      wx.showToast({
        title: '请上传图片',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.navigateTo({
      url: `/details/dishesone/index?dishName=${that.data.dishName}&describe=${that.data.describe}&card_imgid=${that.data.card_imgid}`
    })
  },
  bindTextAreaBlur(e){    //获取描述
    var that = this
    that.setData({
      describe: e.detail.value
      })
  },
  disint(e){    //获取菜品名
  var that = this 
  that.setData({
    dishName:e.detail.value
  })
    console.log(that.data.dishName)
  },
  removeImg(e){    //删除图片
    console.log(e.currentTarget.dataset.index)
    let cardImg = this.data.card_img
    let cardImidd = this.data.card_imgid
    cardImg.splice(e.currentTarget.dataset.index, 1)
    cardImidd.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      card_img: cardImg,
      card_imgid: cardImidd
    })
    // for(var i = 0;i<cardImg.length;i++){
    //   if()
    // }
  },
  upload: function (e) {    //上传图片
    var that = this
    if(that.data.card_imgid.length > 9){
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'none',
        duration:3000,
      })
      return
    }
    var index = e.currentTarget.dataset.index
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: function (res) {
        that.getImg(res.tapIndex, index)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  getImg: function (e, index) {
    var _this = this
    if (e == 0) {
      e = 'album'
    } else {
      e = 'camera'
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [e],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = _this.data.card_img
        tempFilePaths.push(res.tempFilePaths[0])
        console.log(tempFilePaths)
          _this.setData({
            card_img: tempFilePaths
          })
        _this.upImg(res.tempFilePaths[0], index)
      }
    })
  },

  upImg(url, index) { //上传图片
    let _this = this
    console.log(url)
    app.globalData.token = wx.getStorageSync('token')
    wx.uploadFile({
      url: `http://second.chchgg.com/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`, 
      filePath: url,
      name: 'image',
      formData: {
        'name': 'image'
      },
      success(res) {
        let data = JSON.parse(res.data)
             //返回上传照片的id，记录下来
        let id = _this.data.card_imgid
        id.push(data.data.id)
          _this.setData({
            card_imgid: id
          })
        console.log(data,_this.data.card_imgid)
        //do something
      },
      fail(res) {
        const data = res.data
        console.log(data + '失败')
      }
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