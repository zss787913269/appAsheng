// 封装一个通用的fetch函数，用于发送微信小程序的ajax请求
// 要求：支持promise
const app = getApp()
function ajax(options) {
  // 判断参数的类型， 如果options如果是字符串，把当成url来处理
  // 如果是options是对象，当成参数对象来处理即可

  if (typeof options === 'string') {
    let url = options
    options = {
      url: url
    }
  }

 
  app.globalData.token = wx.getStorageSync('token')
  //1. 能够支持promise
  //2. 发送ajax请求
  return new Promise((resolve, reject) => {
    wx.request({
      // url: `https://locally.uieee.com/${options.url}`,
      url: `https://second.chchgg.com/index.php?s=${options.url}&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`,
      data:options.data,
      method: options.method,
      dataType: options.dataType,
      success: function (res) {
        resolve(res)
        if(res.data.code == -400){
          wx.navigateTo({
            url: '/component/zation/index',
          })
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}


// 把fetch函数导出去
export default ajax;