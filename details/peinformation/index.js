import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/peinformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardPhoto: '/images/temp/zheng.png', //身份证照正面,默认图片
    otherPhoto: '/images/temp/fan.png', //身份证反面
    fullName: '', //名字
    number: '', //身份证号
    background: '', //  工作经验
    address: '', //地址
    tel: '', //联系方式
    // region:'',  //区域
    condition:false,    //选择地址界面开关
    value:[0,0,0], 
    cityids:0,
    provinces:[],
    citys:[],
    countys:[],
    card_img1: '',   //身份证正面id
    card_img2:'',   //身份证反面id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getprovince(2, 0),
      that.getcitys(1, 0),
      that.getcountys(37, 0)
    if (options.id > 0) {
      that.getCateList(options)
    }
    //表单验证规则
    this.WxValidate = app.wxValidate({
      fullName: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      tel: {
        required: true,
        tel: true,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      background: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      number: {
        required: true,
        idcard: true,
      },
    }, {
        fullName: {
          required: '您填写的姓名格式错误',
        },
        tel: {
          required: '您填写的联系方式错误',
        },
        address: {
          required: '请输入现居地址',
        },
        background: {
          required: '请输入您的工作经验',
        },
        number: {
          required: '请输入正确的身份证号',
        },
      })
  },

  submit(e) {
    var that = this
    var formData = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg}`,
        duration: 3000,
        icon: 'none',
      })
    } else {
      var fullName = formData.fullName;
      var tel = formData.tel;
      // var region = formData.region;
      var address = formData.address;
      var background = formData.background;
      var number = formData.number;
      var params = {
        name: fullName,
        card_no: number,
        now_address: address,
        work_experience:background,
        card_img:`${that.data.card_img1},${that.data.card_img2}`,
        region: `${that.data.provinceid},${that.data.citysid},${that.data.countysid}`,  //区域id, 省，市，区/县 例： 1,23,34
        tel: tel,
      };
      console.log(params.region + '成功' + params.card_img)
      that.getSubmit(params)
    }

  },
  async  getSubmit(e) {
    let res = await ajax({ url: 'api/user/distribution', method: 'POST', data: e })
    wx.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 3000
    })
    wx.navigateBack({

    })
  },
  
  upload: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    wx.showActionSheet({
      itemList: ['从手机相册选择', '拍照'],
      success: function (res) {
        console.log(res.tapIndex + '相册')
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
        const tempFilePaths = res.tempFilePaths
        if (index == 0) {
          _this.setData({
            cardPhoto: tempFilePaths[0]
          })
        } else if (index == 1) {
          _this.setData({
            otherPhoto: tempFilePaths[0]
          })
        }
        _this.upImg(tempFilePaths[0], index)
      }
    })
  },

  upImg(url, index) { //上传图片
    let _this = this
    console.log(url, index)
    app.globalData.token = wx.getStorageSync('token')
    wx.uploadFile({
      url: `https://second.chchgg.com/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`, //仅为示例，非真实的接口地址
      filePath: url,
      name: 'image',
      formData: {
        'name': 'image'
      },
      success(res) {
        let data = JSON.parse(res.data)
        console.log(data.data.id)
        if (index == 0) {     //返回上传照片的id，记录下来
          _this.setData({
            card_img1: data.data.id
          })
        } else if (index == 1) {
          _this.setData({
            card_img2: data.data.id
          })
        }
        //do something
      },
      fail(res) {
        const data = res.data
        console.log(data + '失败')
      }
    })
  },

  async getprovince(e, y) {
    let that = this

    let res = await ajax({ url: 'api/region/index', method: 'post', data: 0 })
    that.setData({
      provinces: res.data.data,
    })
    console.log(e)
    if (e == 2) {
      that.setData({
        province: that.data.provinces[0].name,
        provinceid: that.data.provinces[0].id,
      })
    }
  },
  async getcitys(e, y) {
    let that = this
    let res = await ajax({ url: 'api/region/index', method: 'post', data: { pid: e } })
    that.setData({
      citys: res.data.data,
    })
    if (that.data.citys.length > 0) {
      if (y == 0) {
        that.setData({
          city: that.data.citys[0].name,
          cityid: that.data.citys[0].id
        })
      } else {
        that.setData({
          city: that.data.citys[that.data.citysid].name,
          cityid: that.data.citys[that.data.citysid].id
        })
      }
    }

  },
  async getcountys(e, y) {
    let that = this
    let res = await ajax({ url: 'api/region/index', method: 'post', data: { pid: e } })
    that.setData({
      countys: res.data.data,
    })
    if (that.data.countys.length > 0) {
      if (y == 0) {
        that.setData({
          county: that.data.countys[0].name,
          countyid: that.data.countys[0].id
        })
      } else {
        that.setData({
          county: that.data.countys[that.data.countysid].name,
          countyid: that.data.countys[that.data.countysid].id,
        })
      }
    }


  },

  bindChange: function (e) {

    var val = e.detail.value
    var t = this.data.values;
    // 省分

    for (let i = 0; i < this.data.provinces.length; i++) {
      if (i == val[0]) {
        // {{province}}-{{city}}-{{county}}
        this.getcitys(this.data.provinces[i].id)
        this.setData({
          province: this.data.provinces[i].name,
          provinceid: this.data.provinces[i].id

        })

      }
      console.log(this.data.province)
    }

    // 城市
    if (this.data.citys.length > 0) {
      for (let i = 0; i < this.data.citys.length; i++) {
        if (i == val[1]) {
          this.getcountys(this.data.citys[i].id)
          this.setData({
            citysid: i,

          })
        }
      }
    }

    // 区域
    if (this.data.countys.length > 0) {
      for (let i = 0; i < this.data.countys.length; i++) {
        if (i == val[2]) {
          this.setData({
            countysid: i
          })
        }
      }
    }


  },

  open:function() {    //打开选择地址页面
  console.log(123)
    this.setData({
      condition: !this.data.condition
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