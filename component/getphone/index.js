import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
Page({
  data: {
    countDownNum:60,
    showcode:true,
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tel: "",
    code: "",
    psw1:"",
    psw:""

  },

  onLoad: function () {
   
  },
  countDown: function () {

        let that = this;
    
        let countDownNum = 61;//获取倒计时初始值
    
        //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    
        that.setData({
    
          timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
    
            //每隔一秒countDownNum就减一，实现同步
    
            countDownNum--;
    
            //然后把countDownNum存进data，好让用户知道时间在倒计着
    
            that.setData({
    
              countDownNum: countDownNum
    
            })
 
            if (that.data.countDownNum == 0) {
              clearInterval(that.data.timer);
              that.setData({
                showcode:true
              })
            }
          }, 1000)
        })
  },
  getInputValue(e){
    console.log(e.detail.value)
    this.setData({
      tel:e.detail.value
    })
  },
  getcode(e) {
    var that = this
    that.setData({
      code: e.detail.value
    })
   
  },
  getpsw(e) {
    var that = this
    that.setData({
      psw: e.detail.value
    })
   
  },
  getpsw1(e) {
    var that = this
    that.setData({
      psw1: e.detail.value
    })
   
  },
  async sendCode() {
    var that = this

    console.log(that.data.tel)

    wx.request({
      url: 'https://wxapp.mccxx.com/api/Open/sendSMS', //仅为示例，并非真实的接口地址
      data: {
        tel: that.data.tel,
        type: 'hotel'
      },
      method: "POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
     
        console.log(res.data)

          if (res.data.code == 0) {
            that.countDown()
            that.setData({
              showcode:false
            })
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

      }
    })




  },

  async phonelogin() {
    let that = this
    if (this.data.code == "" ) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
    }else if(this.data.tel == "" ) {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none'
      })
    } else if(this.data.psw == "" ) {
      wx.showToast({
        title: '请填写密码',
        icon: 'none'
      })
    } else if(this.data.psw1 == "" ) {
      wx.showToast({
        title: '请确认密码',
        icon: 'none'
      })
    }else {

      if(that.data.psw != that.data.psw1){
        wx.showToast({
          title: '两次密码输入不正确，请重新输入',
          icon:"none"
        })
      }else{
        let params = {
          mobile: that.data.tel,
          code: that.data.code,
          password:that.data.psw
        }
        console.log(params)
        
  
        let res = await ajax({
          url:"api/user/bindmobile",
          method:"post",
          data:params
        })
  
        console.log("res1111",res.data)
  
  
          if(res.data.code == 0){
            wx.setStorageSync('show',true)
            that.setData({
              show:true
            })
            wx.showToast({
              title: '绑定成功',
              icon:"none"
            })
            wx.navigateBack({
              delta: 0,
            })
          }else{
            wx.showToast({
              title: '验证码有误',
              icon:"none"
            })
          }
      }
     


    
    }
  }


})