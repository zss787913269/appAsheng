var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/orderlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    hoteInfo:'',   //酒店信息
    hoteList:[],   //酒店订单列表
    hoteRole:'',   //酒店角色
    nowUserId:'',    //当前进入页面的酒店角色
    page:1,   //分页
    hoteRoleNow:'',   //当前登录的用户id
    pages:1,
    myShop:[],
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    if (e.target.dataset.current == 2){
      that.getSelfShop(that.data.pages)
    }
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getHoteInfo()
    
  },  
  // exchange(){    //退换货申请

  // },
  // async exchange(e){    //退换货请求
  //   var that = this
  //   // order_id = 订单id, title = 退货理由 order_detail_id = 商品详情id, price = 价格, number = 数量
  //   // type = 1退货退款, 2换货
  //   let params = {
  //     id: e.currentTarget.dataset.id
  //   }
  //   let res = await ajax({
  //     url: 'api/quickorder/delivery', method: 'POST', data: params
  //   })
  //   if (res.data.code == 0) {
  //     wx.showToast({
  //       title: '申请成功',
  //       icon: 'none'
  //     })
  //     that.getHoteOrder(1)
  //   } else {
  //     wx.showToast({
  //       title: res.data.msg,
  //       icon: 'none'
  //     })
  //   }
  // },
  async receivingGoods(e){    //确认收货
    var that = this
    let params = {
      id:e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/order/collect', method: 'POST', data: params
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '收货成功',
        icon:'none',
        duration:3000
      })
      that.getHoteOrder(1)
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  detalis(e){    //跳转去详情页
    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}`,
    })
  },
  payment(e){   //去支付页面
  // let item = JSON.stringify(e.currentTarget.dataset.id)
  let items = e.currentTarget.dataset
      wx.navigateTo({
        url: `/person/cartdetal/index?where=hote&&id=${items.id}&num=${items.num}&price=${items.price}`,
      })
  },
  async addPlatform(e){   //添加到平台
    var that = this
    let params = {
      type:2,
      order_id: e.currentTarget.dataset.orderid,
      order_detail_id: e.currentTarget.dataset.orderdetid
    }
    let res = await ajax({
      url: 'api/quickorder/SelfOrderAdd', method: 'POST', data: params
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '操作成功',
        icon:'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    console.log(res)
  },
  async getSelfShop(pages){   //获取自购订单
    var that = this
    let params = {
      page:pages
    }
    let res = await ajax({
      url: 'api/quickorder/MySelfOrder', method: 'POST', data: params
    })
    console.log(res)
    if(res.data.code == 0){
      that.setData({
        myShop:res.data.data.data,
        myOrder:res.data.data.total
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  async getHoteOrder(num){   //获取酒店订单列表
  console.log('diaoyongl')
      var that = this
      let params = {
        type:1,
        page:num
      }
    let res = await ajax({
      url: '/api/quickorder/HotelList', method: 'POST', data: params
    })
    console.log(res)
    if(res.data.code == 0){
      if (num == 1){
        that.setData({
          hoteList:[],
          hotelOrder:res.data.data.total
        })
        if(res.data.data.data.length === 0){
          wx.showToast({
            title: '暂无酒店订单',
            icon:'none',
            duration:3000
          })
        }
      }else{
        wx.showToast({
          title: '到底了，已无其他订单信息',
          icon:'none',
          duration:3000
        })
      }
      if(res.data.data.data.length !== 0){
        that.setData({
          hoteList: that.data.hoteList.concat(res.data.data.data),
          hoteRoleNow: res.data.data.data[0].user_id,  
          total: res.data.data.page_total == res.data.data.total,
        })
        let hoteList = that.data.hoteList
        for (var i = 0; i < hoteList.length;i++){
          hoteList[i].other_role = JSON.parse(hoteList[i].other_role)
        }
        that.setData({
          hoteList
        })
        console.log(hoteList);
        that.getHoteRole()
      }
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
      wx.navigateTo({
        url: '/private/hotelAddress/index'
      })
    }
  }, 

  async confirmOrder(e){   //确认订单
      var that = this
    if (that.data.nowUserId != 7 && that.data.nowUserId != 5){
        // 其他角色确认订单
      let res = await ajax({
        url: 'api/quickorder/OtherRoleIsOk', method: 'POST', data: { id: e.currentTarget.dataset.id }
      })
      if (res.data.code == 0) {
        wx.showToast({
          title: '确认成功',
          icon:'none',
          duration:3000
        })
        that.getHoteOrder(1)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:3000
        })
      }
    }else{
      let res = await ajax({
        url: 'api/quickorder/roleIsOk', method: 'POST', data: { id: e.currentTarget.dataset.id }
      })
      if (res.data.code == 0) {
        wx.showToast({
          title: '确认成功',
          icon:'none',
          duration:3000
        })
        that.getHoteOrder(1)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:3000
        })
      }
    }
    
  },
  async cancelOrder(e) {   //取消订单
    var that = this
    let res = await ajax({
      url: 'api/order/cancel', method: 'POST', data: { id: e.currentTarget.dataset.id }
    })
    console.log(res)
    if(res.data.code == 0){
      wx.showToast({
        title: '取消成功',
        icon:'none',
        duration:3000
      })
      that.getHoteOrder(1)
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  
  async getHoteInfo() {   //获取酒店信息
    var that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel', method: 'get'
    })
    console.log(res)
    that.setData({
      hoteInfo:res.data.data 
    })
    // that.getHoteOrder(1)
    // that.getHoteRole()
    // that.getroleIsOk()
  },

  async getHoteRole() {   //获取酒店角色
    var that = this
    let params = {
      id: that.data.hoteInfo.id
    }
    let res = await ajax({
      url: 'api/quickorder/HotelRole', method: 'POST', data: params
    })
    let quickorder = res.data.data
    that.setData({
      hoteRole:res.data.data
    })
    let hoteList = that.data.hoteList
    for (var i = 0; i < hoteList.length; i++) {
      if (hoteList[i].is_role_ok == 0) {
        if (hoteList[i].other_role != null) {
          for (let j in hoteList[i].other_role) {
            if (hoteList[i].user_id == j) {
              hoteList[i].nowRole = false
              console.log(hoteList[i].nowRole)
            } else {
              hoteList[i].nowRole = true
            }
          }
        }else{
          hoteList[i].nowRole = true
        }
      } else {
        hoteList[i].nowRole = false
      }

    }
    console.log(hoteList[0].nowRole)
    // that.setData({
    //   hoteList
    // })
    
    // let isOk = that.data.hoteList
    // console.log(quickorder)
    // for (let key in quickorder){
    //   if (quickorder[key][0] == that.data.hoteRoleNow){
    //     that.setData({
    //       nowUserId: quickorder[key][1]
    //     })
    //   }
    // }
    for (let key in quickorder){
      console.log(quickorder[key][0])
      for (let i = 0; i < hoteList.length;i++)
        if (hoteList[i].role_user_id != null){
          if (quickorder[key][0] == hoteList[i].role_user_id){
            hoteList[i].surePayment = true
        }
      }else{
          hoteList[i].surePayment = false
      }
      // if (isOk[i].other_role != null){
      //   if (quickorder[key][0] == isOk[i].other_role) {
      //     isOk[i].surePayment = true
      //   }
      // }
      that.setData({
        hoteList
      })
     
    }
    console.log(that.data.hoteList)
    // let hoteList = that.data.hoteList
    // for (var i = 0; i < hoteList.length; i++) {
    //   if (hoteList[i].is_role_ok == 0) {
    //     if (hoteList[i].other_role != null) {
    //       for (let j in hoteList[i].other_role) {
    //         console.log(j)
    //         if (hoteList[i].user_id == j) {
    //           hoteList[i].nowRole = false
    //           console.log(hoteList[i].nowRole)
    //         } else {
    //           hoteList[i].nowRole = true
    //         }
    //       }
    //     }
    //   } else {
    //     hoteList[i].nowRole = true
    //   }

    // }
    // that.setData({
    //   hoteList
    // })
    // console.log(that.data.nowUserId)
    // console.log(that.data.hoteList)
    // quickorder.forEach(function (item,index){
    //   console.log(item)
    // })
  },
  //打印
  print(index){
    console.log(index);
    let myData=index.currentTarget.dataset.value;
    let shop_name="";
    myData.items.forEach(item=>{
      shop_name+=item.title+",";
    })
    shop_name=shop_name.substring(0,shop_name.lastIndexOf(','));
    lpapi.openPrinter('')    //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 40;

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
      console.log(y)
      lpapi.drawText(`订单号：${myData.order_no}`, 0, y, 4)
      y = y + 5
      lpapi.drawText(`商品名：${shop_name}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`${myData.describe}`, 0, y, 5)
      y = y + 5
      lpapi.drawText(`已付：${myData.pay_price}`, 0, y, 5)
      y = y + 15
    lpapi.endDrawLabel();
    lpapi.print();
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
      var that = this
    that.getHoteOrder(that.data.page)
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
      var that = this
      that.setData({
        page:that.data.page + 1
      })
    console.log(that.data.total)
    that.getHoteOrder(that.data.page)  
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})