import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listindex: 1,
      code:'',    //邀请二维码
      title:"",
      showModalStatus: false, //遮罩的显示与隐藏
      myshowModalStatus:false,
      zymhideBuyModal:false,
      zymshowModalStatus:false
  },

  azymhideBuyModal() {

    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        zymshowModalStatus: false
      })

    }.bind(this), 200)
  },
 zymshowModal() {
        // ////////console.log("点击了订单")
    
 
    
        var animation = wx.createAnimation({
          duration: 200,
          timingFunction: "ease",
          delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
          animationData: animation.export(),
          zymshowModalStatus: true
        })
        setTimeout(() => {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
          })
        }, 200)
      },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


   

    var that = this;
    let resShop = wx.getStorageSync('shop')
    let resIndex = wx.getStorageSync('Index')
    let referrer=wx.getStorageSync('referrer');
    if(referrer!=''){
      that.setData({
        referrer
      })
    }
    if (resShop != ''){
      that.setData({
        shop: resShop
      })
    }
    if (resIndex != '') {
      that.setData({
        indexQR: resIndex
      })
    }
    wx.login({
      success: res => {
        console.log('rescode',res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId api/user/wechatuserinfo
        var that = this
        wx.request({
          url: `${app.globalData.headUrl}/index.php?s=/api/user/wechatuserauth?application=app&application_client_type=weixin&token=&ajax=ajax`, //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            authcode: res.code,
            type:that.data.shop
          },
          dataType: 'json',
          success(res) {
            console.log(res)
            if (res.data.data.openid){
              that.setData({
                openid:res.data.data.openid
              })
            }else{
              that.setData({
                openid:res.data.data.weixin_openid
              })
            }
            console.log(that.data.openid);
          }
        })
        
      }
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
     
        console.log(res.authSetting['scope.userInfo']);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('授权成功',res);
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
             
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
      
  },

 
  getCategoryList(item) {
    console.log("用户的信息如下：");
    console.log(item)
    setTimeout(function(){
      // wx.switchTab({
      //   url: '/pages/index/index'
      // })
      // wx.navigateBack({})
      // wx.navigateTo({
      //   url: "/component/subscribe/index",
      // })
    },1000)
     
    // let res = await ajax({ url: 'api/user/wechatuserinfo', method: 'POST', data: { encrypted_data, iv, openid, referrer} token: app.globalData.token })
    // console.log(app.globalData.token)

  },
  bindGetUserInfo: function (e) {
    console.log('群里',e);
    let that = this
  
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      that.myhideBuyModal()
   
      // 获取到用户的信息了，打印到控制台上看下
      wx.request({
        url:`${app.globalData.headUrl}/index.php?s=/api/user/wechatuserinfo?application=app&application_client_type=weixin&token=&ajax=ajax`, //仅为示例，并非真实的
        // url: 'http://debug.nncaixiao2.cn/index.php?s=/api/user/wechatuserinfo?application=app&application_client_type=weixin&token=&ajax=ajax', //仅为示例，并非真实的
          method: 'POST',
          data: {
            encrypted_data:e.detail.encryptedData,
            iv:e.detail.iv,
            openid: that.data.openid,
            referrer: that.data.referrer,
            type: that.data.shop,
          },
          dataType: 'json',
          success(res) {
            wx.setStorageSync('openid', that.data.openid),
            wx.setStorageSync('token', res.data.data.token),
            wx.setStorageSync('QRcode', res.data.data.referrer_url),
            wx.setStorageSync('enid', res.data.data.enid)
            wx.setStorageSync('userid', res.data.data.id)
            wx.setStorageSync('hotel_juese', res.data.data.hotel_juese)
              app.globalData.token = res.data.data.token
              console.log("用户信息",res);
             
              if(res.data.code == 0){
                that.setData({
                  code:res.data.data.referrer_url
                })
                that.zymshowModal()
                wx.showToast({
                  title: '授权成功',
                  duration:3000
                })
              }else{
                wx.showToast({
                  title: '授权失败',
                  duration:3000
                })
              }

          }
        })
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      let referrer=wx.getStorageSync('referrer');
      if(referrer!==""){

      }
      console.log(referrer);
      
      console.log(154)
      that.getCategoryList(e.detail)
      
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法享受平台带给您的服务，请重新授权',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
            
          }
        }
      });
    }
  },

  myhideBuyModal() {

    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        myshowModalStatus: false
      })

    }.bind(this), 200)
  },
 myshowModal() {
        // ////////console.log("点击了订单")
    
 
    
        var animation = wx.createAnimation({
          duration: 200,
          timingFunction: "ease",
          delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
          animationData: animation.export(),
          myshowModalStatus: true
        })
        setTimeout(() => {
          animation.translateY(0).step()
          this.setData({
            animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
          })
        }, 200)
      },
  onShow(){
    this.getMsg()

    let code =  wx.getStorageSync('QRcode')
    if(app.globalData.token == ''){
      this.myshowModal()
    }


    this.setData({
      code:`${code}`
    })

    console.log("二维码",this.data.code)
  

  },
  async getMsg(){
    
    let res = await ajax({
      url: '/api/index/adtitle',
      method: 'get',
      data:{
        type:1
      }
    })

    this.setData({
      title:res.data
    })
    console.log(res.data)
  },
  clicklist(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      listindex: index
    })
  },
  go(){
      wx.navigateTo({
        url: '/pages/yongjin/index',
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  
  async clickImg(){
    // api/index/Invite

    let res = await ajax({
      url: 'api/user/Invite',
      method: 'get',
    })
      let that = this
    if(res.data == '' ){
      wx.navigateTo({
        url: "/component/zation/index"
      })
    }else{
      that.setData({ code:`${res.data}` })

        wx.setStorage({
          data: res.data,
          key: 'QRcode',
        })
    }

    console.log(res)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let referrer=wx.getStorageSync('enid');
    let that = this
    console.log("that.data.titl",that.data.title)
    return {
      title:that.data.title,
      path: "/private/invitation/index?referrer="+referrer
    }
  }
  // onShareAppMessage: function () {
  //   let referrer=wx.getStorageSync('enid');
  //   console.log("referrer",referrer)
  //   return {
  //     title:"自定义标题",
  //     path: "/private/invitation/index",
  //     imageUrl:"../../images/tabar/car.png"
  //   }
  // }

})