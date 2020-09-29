//app.js
import wxValidate from './utils/wxValidate.js'
App({
  globalData: {
    userInfo: null,
    token: '',
  },
  wxValidate: (rules, messages) => new wxValidate(rules, messages),
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // async getCategoryList() {
    //   let res = await fetch('categories')
    //   this.data.categoryList = res.data
    //   this.setData(this.data)  app.globalData
    // }
    // 登录  
    
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  },
  globalData: {
    userInfo: null,
    currentPrinter: {
      factory: '',        // 打印机生产厂家
      name: '',           // 打印机名称
      UUID: '',           // 打印机标识码
      MAC: '',            // 打印机MAC地址
      printerType: 0,     // 打印机类型
      DPI: 203,           // 打印机DPI
      width: 384,         // 打印机能打印的宽度
      softVersion: '',    // 打印机软件版本号
      hardVersion: '',    // 打印机硬件版本号
      seriesName: '',     // 产品系列名称，如 DT20
      devIntName: '',     // 内部型号名称，如 DT20S
    },
  },
  wxRequest(method, url, data, callback, errFun, token) {
    wx.request({
      url: `https://second.chchgg.com/index.php?s=${url}&application=app&application_client_type=weixin&token=${this.globalData.token}&ajax=ajax`,
      // url: `https://debug.nncaixiao2.cn/index.php?s=${url}&application=app&application_client_type=weixin&token=${this.globalData.token}&ajax=ajax`,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'token': token
      },
      dataType: 'json',
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        errFun(err);
      }
    })
  }
})