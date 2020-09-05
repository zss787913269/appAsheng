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
    region: ['广西壮族自治区', '南宁市', '西乡塘区'],
    myValue:"",
    selectArray: [{
      "id": "1",
      "text": "下单员"
    }, {
      "id": "2",
      "text": "厨师长"
    }, {
      "id": "3",
      "text": "采购"
    }, {
      "id": "4",
      "text": "仓库"
    }, {
      "id": "5",
      "text": "财务"
    }, {
      "id": "6",
      "text": "店长"
    }, {
      "id": "7",
      "text": "老板"
    }],

    fullName: '', //姓名
    hotelName: '', //酒店名
    address: '', //地址
    tel: '', //联系方式
    code: '', //验证码
    condition: false, //选择地址界面开关
    value: [0, 0, 0],
    cityids: 0,
    provinces: [],
    citys: [],
    countys: [],
    roleId: '', //用户选择角色   
    tel2: '',
    qrCode: false,
    hotelId: '', //酒店id
    hotelQR: '',
    hotelRole: false,
    streets: '', //街道列表 
    street: '', //当前选择的街道
    streetId: '', //当前选择的街道id   
    type:"",
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // that.getToekn()
    that.getHotel()
   
    this.WxValidate = app.wxValidate({
      fullName: {
        required: true,
        minlength: 1,
        maxlength: 10,
      },
      tel: {
        required: true,
        // tel: true,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      hotelName: {
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      code: {
        required: true,
      },
    }, {
      fullName: {
        required: '您填写的姓名格式错误',
      },
      tel: {
        required: '您填写的联系方式错误',
      },
      address: {
        required: '请输入地址',
      },
      hotelName: {
        required: '请输入酒店名',
      },
      code: {
        required: '请输入验证码',
      },
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
  async getHotel() { //获取酒店
    var that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })
    let hotelInfo = res.data.data

    console.log(hotelInfo)
   
    let userid = wx.getStorageSync('userid')
    let htype,roleId

    console.log("hotelInfo.userid",hotelInfo.user_id)
     console.log("userid",userid)

    if(hotelInfo.user_id != userid){
        htype = Number(hotelInfo.usertype)
        roleId = Number(hotelInfo.usertype)
        this.setData({
          show:false
        })
    }else{
       htype = Number(hotelInfo.type) - 1
       roleId = Number(hotelInfo.type)
       this.setData({
        show:true
      })
    }
    console.log("htype",htype)
    console.log("roleId",roleId)

    if (res.data.data != null) {
  
      that.setData({
      
        qrCode: true,
        fullName: hotelInfo.name, //姓名
        hotelName: hotelInfo.h_name, //酒店名
        address: hotelInfo.address, //地址
        tel: hotelInfo.tel, //联系方式
        hotelId: hotelInfo.id,      
        type:htype,
        roleId:roleId,
        region:hotelInfo.region.split(",")
      })
    }

  },
  
  getInputValue(e) { //获取手机号
    var that = this
    that.setData({
      tel: e.detail.value
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

  submit(e) {

    var that = this
    var formData = e.detail.value;

    var fullName = formData.fullName;
      var tel = formData.tel;
      var address = formData.address;
      var hotelName = formData.hotelName;
      var code = formData.code;
      var params = {
        code: code,
        h_name: hotelName,
        name: fullName,
        address: address,
        type: that.data.roleId,
        // region: `${that.data.provinceid},${that.data.cityid},${that.data.countyid},${that.data.streetId}`,
        region: `${that.data.region}`,
        tel: tel,
      };
      console.log("region",that.data.region)
         console.log("params",params)
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
      var address = formData.address;
      var hotelName = formData.hotelName;
      var code = formData.code;
      var params = {
        code: code,
        h_name: hotelName,
        name: fullName,
        address: address,
        type: that.data.roleId,
        // region: `${that.data.provinceid},${that.data.cityid},${that.data.countyid},${that.data.streetId}`,
        region: `${that.data.region}`,
        tel: tel,
      };
      console.log("params",params)

    
      if(params.type == ''){
        wx.showToast({
          title: '请选择角色',
          icon:'none',
        })
      }else{
        that.getSubmit(params)
      }
    }

  },

  async getSubmit(e) { //提交信息
    var that = this
    if (that.data.hotelId != '') {
      e.id = that.data.hotelId
      console.log(e)
      let res = await ajax({
        url: '/api/quickorder/EditorHotel',
        method: 'POST',
        data: e
      })
      console.log(res)
      if (res.data.code == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 3000
        })
        wx.switchTab({
          url: '/pages/user/index'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      let res = await ajax({
        url: 'api/Quickorder/AddHotel',
        method: 'POST',
        data: e
      })
      console.log(res)
      if (res.data.code == 0) {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 3000
        })
          wx.switchTab({
            url: '/pages/user/index'
          })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }

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