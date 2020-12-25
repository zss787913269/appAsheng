import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

app.globalData.token = wx.getStorageSync('token')

// private/hotelAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // ,type：1下单员，2厨师长，3采购，4仓库，5财务，6店长，7老板
   
    myValue:"",
    fullName: '', //姓名
    nickName:"",
    tel: '', //联系方式
    code: '', //验证码
    value: [0, 0, 0],
    tel2: '',
    qrCode: false,
    hotelId: '', //酒店id
    hotelQR: '',
    type:"",
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // that.getToekn()

    console.log(options)

    this.setData({
      fullName:options.name,
      nickName:options.nickname
    })
   
  },
 
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    
  },
  determine() {
    this.setData({
      hotelRole: false
    })
  },
 
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', Number(e.detail.value)+1)
    this.setData({
      index: e.detail.value,
      roleId:Number(e.detail.value) + 1,
      myValue:"k"
    })

  },
  sendOut(e) { //发送二维码
    var that = this
    that.sendQRCode(e)
  },
  async sendQRCode(e) {
    var that = this
        var that = this
    console.log(e.currentTarget.dataset.index)
    let params = {
      id: that.data.hotelId,
      type: e.currentTarget.dataset.index
    }
    let res = await ajax({
      url: 'api/Quickorder/addCode',
      method: 'POST',
      data: params
    })
    console.log(res)
   
    if(res.data.code == 0){
            console.log('cehngl ')
            that.setData({ //角色二维码
              hotelQR: res.data.data.img_url,
              hotelRole: true
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration:3000
            })
          }


    
  },
 
  getInputValue(e) { //获取手机号
    var that = this
    that.setData({
      tel: e.detail.value
    })

  },
  getfullName(e) { //获取姓名
    var that = this
    that.setData({
      fullName: e.detail.value
    })
   
  },
  getnickname(e) { //获取昵称
    var that = this
    that.setData({
      nickName: e.detail.value
    })
  
  },
  getcode(e) { //获取code
    var that = this
    that.setData({
      code: e.detail.value
    })
    
  },
  sendCode() { //发送短信验证码
    var that = this
    that.sendCode2()
  },
  async sendCode2() {
    var that = this
    let params = {
      tel: that.data.tel,
      type: 'hotel'
    }
    let res = await ajax({
      url: 'api/Quickorder/sendSMS',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '发送成功',
        icon: 'none',
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
  open: function() { //打开选择地址页面
    this.setData({
      condition: !this.data.condition
    })
  },

  

  async getSubmit() { //提交信息
    var that = this

      
    // console.log(that.data.fullName)
    // console.log(that.data.nickName)
    // console.log(that.data.code)
    // console.log(that.data.tel)

    if(that.data.fullName.length>10){
      wx.showToast({
        title: '名字不能超过八个字',
        icon:"none"
      })
    }else if(that.data.fullName.length == 0){
      wx.showToast({
        title: '名字不能为空',
        icon:"none"
      })
    }else if(that.data.nickName.length>8){
      wx.showToast({
        title: '名字不能超过八个字',
        icon:"none"
      })
    }else if(that.data.nickName.length == 0){
      wx.showToast({
        title: '昵称不能为空',
        icon:"none"
      })
    }else if(!(/^1[3456789]\d{9}$/.test(that.data.tel))){
    
      wx.showToast({
        title: '手机号码有误，请重填',
        icon:"none"
      })
    }
    else{
      let params = {
        name:that.data.fullName,
        nickname:that.data.nickName,
        mobile:that.data.tel
      }
      console.log(params)
           let res = await ajax({
          url: 'api/user/save',
          method: 'POST',
          data: params
        })
        console.log("修改个人信息",res.data)
        if(res.data.code == 0){
          wx.showToast({
            title: '修改成功',
            icon:"none"
          })
          wx.navigateBack({
            delta: 0,
          })
        }else{
          wx.showToast({
            title: res.data.msg,
          })
        }
    }


     
      // console.log(res)
      // if (res.data.code == 0) {
      //   wx.showToast({
      //     title: '提交成功',
      //     icon: 'none',
      //     duration: 3000
      //   })
      //   wx.switchTab({
      //     url: '/pages/user/index'
      //   })
      // } else {
      //   wx.showToast({
      //     title: res.data.msg,
      //     icon: 'none',
      //     duration: 3000
      //   })
      // }
    

  },
  
  bindChange: function(e) {

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
          this.getStreet(this.data.countys[i].id)
          this.setData({
            countysid: i
          })
        }
      }
    }
    //  街道
    if (this.data.streets.length > 0) {
      for (let i = 0; i < this.data.streets.length; i++) {
        if (i == val[3]) {
          this.setData({
            streetId: i
          })
        }
      }
    }


  },
 
})