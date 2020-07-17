import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// person/recovery/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fullName: '', //名字
    address: '', //详细地址地址
    tel: '', //联系方式
    condition: false,    //选择地址界面开关
    value: [0, 0, 0],
    cityids: 0,
    provinces: [],
    citys: [],
    countys: [],
    shopName:'',    //店名
    number:'',    //数量
    // provinceid:'',   //城市id
  },


  retrieve(e){    //提交回收需求
    var that = this
    var formData = e.detail.value;
    console.log(formData)
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
      var xq_address = formData.address
      var d_name = formData.shopName;
      var number = formData.number;
      var params = {
        name: fullName,
        number: number,
        d_name: d_name,
        xq_address: xq_address,
        address: `${that.data.provinceid},${that.data.citysid},${that.data.countysid}`,  //区域id, 省，市，区/县 例： 1,23,34
        tel: tel,
      };
      console.log(params.address + '成功' + params.tel)
      that.getSubmit(params)
    }
  },
  async  getSubmit(e) {
    let res = await ajax({ url: 'api/user/recovery', method: 'POST', data: e })
    if(res.data.code == 0){
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 3000
      })
      wx.navigateTo({
        url: '/person/slops/index',
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
   
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

  open: function () {    //打开选择地址页面
    console.log(123)
    this.setData({
      condition: !this.data.condition
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    that.getprovince(2, 0),
      that.getcitys(1, 0),
      that.getcountys(37, 0)

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
      shopName: {
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      number: {
        required: true,
        minlength: 1,
        
      },
    },
      {
        fullName: {
          required: '您填写的姓名格式错误',
        },
        tel: {
          required: '您填写的联系方式错误',
        },
        address: {
          required: '请输入详细收货地址',
        },
        shopName: {
          required: '请输入店名',
        },
        number: {
          required: '请输入详细数量',
        },
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