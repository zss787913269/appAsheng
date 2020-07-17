//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    tableList: [],
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    text: "nihao",
    checkedAll: true,
    totalPrice: 0,
    totelid: [],
    currentTab:1,
  },

  onLoad: function(options) {
    this.getlist(1)
  },
  onShow:function(){
    this.getlist(this.data.currentTab)
  },
  async paymented(e) {   //个人采购提交订单
    console.log(e)
    return
    let that = this
    let params = {
      buy_type:'cart',
      ids: that.data.dataids,
    }
    let res = await ajax({
      url: 'api/buy/add', method: 'POST', data: { buy_type: "cart", ids: that.data.dataids, payment_id: that.data.payment_list[0].id, address_id: that.data.addreslist.id, is_purchase: 0 }
    })
    that.setData({
      orderid: res.data.data.order.id

    })
    that.orderPay()
  },
  async getlist(index) {
    let that = this
    let params = {   //酒店购物车需要传参
      is_purchase: 1
    }
    if(index == 1){
      let res = await ajax({
        url: 'api/cart/index',
        method: 'POST',
        data: params
      })
      that.setData({
        tableList: res.data.data.data,
        hotelList: res.data.data.data
      })
      console.log(res)
    }else if(index == 2){
      let res = await ajax({
        url: 'api/cart/index',
        method: 'POST',
      })
      that.setData({
        tableList: res.data.data.data,
        personList: res.data.data.data
      })
      console.log(res)
    }
    that.getTotalPrice()
  },
  // 加减商品
  async subadd(id, goods, stock) {
    let that = this
    let res = await ajax({
      url: 'api/cart/stock',
      method: 'POST',
      data: {
        id: id,
        goods_id: goods,
        stock: stock
      }
    })
  },
  remove(e) {
    const index = e.currentTarget.dataset.index;
    this.subdelect(index)
  },
  // 移除商品
  async subdelect(e) {
    let that = this
    let res = await ajax({
      url: 'api/cart/delete',
      method: 'POST',
      data: {
        id: e
      }
    })
    wx.showToast({
      title: '删除成功',
      duration:3000
    })
    that.getlist(that.data.currentTab)
  },


  //事件处理函数
  sub(e) {
    const index = e.currentTarget.dataset.index;
    let tableList = this.data.tableList;
    let num = tableList[index].stock;
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    if (num == 0) {
      num = 1
    }
    tableList[index].stock = num;
    this.setData({
      tableList: tableList
    })
    this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    this.getTotalPrice()
  },
  add(e) {
    const index = e.currentTarget.dataset.index;
    let tableList = this.data.tableList;
    let num = parseInt(tableList[index].stock);
    num = num + 1;
    tableList[index].stock = num;
    this.setData({
      tableList: tableList
    })
    this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    this.getTotalPrice()
  },

  // 计算商品价格
  getTotalPrice(e) {
    let tableList = this.data.tableList;
    let sum = 0;
    for (let i = 0; i < tableList.length; i++) {
      sum += tableList[i].stock * tableList[i].price;
    }
    this.setData({
      totalPrice: sum.toFixed(2),
      tableList: tableList
    })
  },




  checkboxChange: function(e) {
    var that = this
    that.setData({
      totelid: e.detail.value,
    }) 
    let num = 0;
    if (e.detail.value.length <= 0) {
      that.setData({
        totalPrice: 0
      })
    } else {
      for (let i = 0; i < that.data.tableList.length; i++) {
        for (let j = 0; j <= e.detail.value.length; j++) {
          if (e.detail.value[j] == that.data.tableList[i].id) {
            num += that.data.tableList[i].stock * that.data.tableList[i].price;
            that.setData({
              totalPrice: num
            })
          }
        }
      }
    }



  
  },
  clickTab: function (e) {  //点击切换
    var that = this;
    if (e.target.dataset.current == 1){
      that.getlist(1)
    } else if (e.target.dataset.current == 2){
      that.getlist(2)
    }
    that.setData({
      currentTab: e.target.dataset.current
    })
    console.log(that.data.currentTab);
    // }
  },
  submit: function() {    //提交订单
    var that = this
    // var list = that.data.list
    
      var num=[];
      console.log(that.data.tableList)
      for (var i = 0; i < that.data.tableList.length; i++){
        num.push(that.data.tableList[i].id)
      }
      that.setData({
        totelid: num
      })
     var item = that.data.totelid
    var ids = item.toString()
    console.log(ids) //输出商品id
    if (that.data.currentTab == 2) {   //个人订单提交订单
      if (ids != '') {
        wx.navigateTo({
          url: `/pages/cartdetal/index?ids=${ids}`
        })
      } else {
        wx.showToast({
          title: '无可提交商品',
          icon:'none',
          duration:3000
        })
      }
    } else if (that.data.currentTab == 1){    //酒店提交订单
      if (ids != '') {
        that.subOrder(ids)
      } else {
        wx.showToast({
          title: '无可提交商品',
          icon: 'none',
          duration:3000
        })
      }
     
    }
   
  },
  async subOrder(ids){   //酒店提交订单
      var that = this
    let res = await ajax({
      url: '/api/buy/add',
      method: 'POST',
      data: {
        buy_type: "cart",
        ids:ids,
        is_purchase:1,
      }
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '提交成功',
        icon:'none',
        duration:3000
      })
      wx.navigateTo({
        url: '/private/hotelpeople/index',
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

  //111111111111


  // 步进器
  bindMinus: function() {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  bindPlus: function() {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    if (num >= 999) {
      num = 999
    }
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },


})