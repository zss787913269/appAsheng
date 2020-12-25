// details/editShopGoods/index.js

import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
        goodsId:'',//商品id
        list:[],
        specList:{
          name:'',
          data:[]
        }
        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options)
      // this.getGoods(1934)
      this.getGoods(options.id)
  },

  async getGoods(id){

    //如何讲js数组中的某个相同的对象合并成一个
    let that = this
    let res = await ajax({
      url:"api/goods/goodsinfo",
      method:"post",
      data:{
        goods_id:id
      }
    })

    let newArr = []
    let teamArr = []
    let listData = res.data.spec_base
    for (let i = 0; i < listData.length; i++) {
      if (!teamArr.includes(listData[i]['typename'])) {
        newArr.push({
          type: listData[i]['typename'],
          name: listData[i]['name'],
          data: [listData[i]]
        })
        teamArr.push(listData[i]['typename'])
      } else {
        for (let n = 0; n < newArr.length; n++) {
          if (newArr[n]['type'] == listData[i]['typename']) {
            newArr[n].data.push(listData[i])
            break
          }
        }
      }
    }
 
    console.log(newArr)



      that.setData({
        list:res.data,
        specList:newArr
      })
    
    console.log("detail",res.data)
},


})