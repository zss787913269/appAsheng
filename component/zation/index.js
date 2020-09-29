import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    url: 'person/add/index',
    openid:"",
    shop: '',    //酒店角色
    indexQR:'',    //首页二维码进入
    referrer:'',//推荐码
  },

  onLoad: function () {
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
        console.log('rescode',res.code);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId api/user/wechatuserinfo
        var that = this
        wx.request({
          url: 'https://second.chchgg.com/index.php?s=/api/user/wechatuserauth?application=app&application_client_type=weixin&token=&ajax=ajax', //仅为示例，并非真实的接口地址
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
              console.log(res);
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

 
  bindGetUserInfo: function (e) {
    console.log(e);
    let that = this
  
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      
      // 获取到用户的信息了，打印到控制台上看下
      wx.request({
        url: 'https://second.chchgg.com/index.php?s=/api/user/wechatuserinfo?application=app&application_client_type=weixin&token=&ajax=ajax', //仅为示例，并非真实的
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
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
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


  // async getCategoryList(item) {
   getCategoryList(item) {
    console.log("用户的信息如下：");
    console.log(item)
    setTimeout(function(){
      wx.switchTab({
        url: '/pages/index/index'
      })
      // wx.navigateTo({
      //   url: "/component/subscribe/index",
      // })
    },1000)
     
    // let res = await ajax({ url: 'api/user/wechatuserinfo', method: 'POST', data: { encrypted_data, iv, openid, referrer} token: app.globalData.token })
    // console.log(app.globalData.token)

  },
})
