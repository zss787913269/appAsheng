// person/rawalsre/index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  async getList(){
    let that = this
    let res = await ajax({
      url: 'api/cash/index',
      method: 'get',
   
    })
    console.log(res.data)
    if(res.data.code == 0){
      that.setData({
        list:res.data.data.data
      })
    }
  }
  
})