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

    currentTab: 2,
    hoteInfo: '', //酒店信息
    hoteList: [], //酒店订单列表
    page: 1, //分页
    pages: 1,
    myShop: [],
    first: true,
    hotel:true,
    hotelstatus:"",
    allList:[],//全部
    unpaid:[],//未支付
    needcheck:[],//待验收
    completed:[],//已完成
    unsend:[],//待发货
    shopStatus:true,




  },

  /**
   * 生命周期函数--监听页面加载
   */
  buyAgain(e){
    let item = e.currentTarget.dataset.item,that = this
    console.log(item)
  
      for(let j of item.items){
        let params = {
          is_purchase: 1,
          goods_id: j.goods_id, //商品id
          stock: j.buy_number, //商品数量  
          // 商品规格
          spec: j.spec,
          goods_mark: ""
        }
        console.log("参数",params)
        that.cartSend(params)
      }
    
  },
  async cartSend(params) {


    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: params
    })

    //console.log("加入购物车", res.data)


    if (res.data.code == 0) {
      wx.showToast({
        title: "加入购物车成功",
        icon: 'none',
        duration: 3000
      })    
      wx.switchTab({
        url: "/pages/cart/index",
      })
  
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })

    }




  },


  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id=" + id,
    })

  },
  onLoad: function (option) {
    var that = this

    //console.log(option,"goToPage")
    that.getHoteInfo()

    if (option.index == 'dzf') { that.setData({currentTab: 1})}
    if (option.index == 'dsh') { that.setData({currentTab: 3})}
    this.getHoteOrder()
   
  },
    //点击切换
    clickTab: function (e) {
      var that = this;
  
  
      if(!this.data.hotel){
        wx.showToast({
          title: '还未注册酒店，请先注册',
          icon:"none"
        })
      }
  
      that.setData({
        currentTab: e.target.dataset.current,
        first: false
      })
  
  
  
      that.getHoteOrder()
  
    },


  async exchange(e) { //退换货请求
    var that = this
    // order_id = 订单id, title = 退货理由 order_detail_id = 商品详情id, price = 价格, number = 数量
    // type = 1退货退款, 2换货
    let params = {
      order_id: e.currentTarget.dataset.id,
      title: "不想要",
      number: "100",
      order_detail_id: 955,
      price: 38.50,
      number: 1,
      type: 1
    }
    //console.log(params)
    let res = await ajax({
      url: 'api/quickorder/delivery',
      method: 'POST',
      data: params
    })
    //console.log(res.data)

  },
  async receivingGoods(e) { //确认收货
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }



    let res1 = await ajax({
      url: 'api/order/collect',
      method: 'POST',
      data: params
    })

    //console.log(res)
    wx.showModal({
      title: '提示',
      content: '确认收货吗',
      success (res) {
        if (res.confirm) {
          if (res1.data.code == 0) {
            wx.showToast({
              title: '收货成功',
              icon: 'none',
              duration: 3000
            })
            that.getHoteOrder()
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        } else if (res.cancel) {
          
        }
      }
    })



  },
  detalis(e) { //跳转去详情页

    //console.log(e.currentTarget.dataset.shouhuo)

    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`,
    })
  },
  payment(e) { //去支付页面


    let items = e.currentTarget.dataset
    let address = items.list.address
    let msg = items.list.name +  ' ' +items.list.tel

    //console.log(items)
    if (items.docat == 1) {
      wx.showToast({
        title: "此订单中有商品未划价，等待划价",
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: `/person/cartdetal/index?where=hote&&id=${items.id}&num=${items.num}&price=${items.price}&address=${address}&msg=${msg}`,
      })
    }







  },
  async addPlatform(e) { //添加到平台
    var that = this
    let params = {
      type: 2,
      order_id: e.currentTarget.dataset.orderid,
      order_detail_id: e.currentTarget.dataset.orderdetid
    }
    let res = await ajax({
      url: 'api/quickorder/SelfOrderAdd',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '操作成功',
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
    ////console.log(res)
  },
  async getSelfShop(pages) { //获取自购订单
    var that = this
    let params = {
      page: pages
    }
    let res = await ajax({
      url: 'api/quickorder/MySelfOrder',
      method: 'POST',
      data: params
    })
    ////console.log(res)
    if (res.data.code == 0) {
      that.setData({
        myShop: res.data.data.data,
        myOrder: res.data.data.total
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },

  //zym
  async getHoteOrder(num) { //获取酒店订单列表

    let that = this
    let param = {
      type: 1,
      status: -1
    }


    let res = await ajax({
      url: '/api/quickorder/HotelList',
      method: 'POST',
      data: param
    })

     console.log("商品",res.data)

     if(res.data.code != 0){
      wx.showToast({
        title: '还未注册酒店，请先注册',
        icon:"none"
      })
     }else{
      let allList = res.data.data.data,unpaid = [],completed = [],needcheck = [],unsend = []
      for(let i of allList){
        if(i.status_name == '待确认'){
        
              for(let j of i.items){ if(j.is_ok == 1){i.shopStatus = "已接单" } }
        }


      if(i.status == 3 ){
        if(i.status_name == '待收货'){
          i.shopStatus = "已接单"
          needcheck.push(i)
        }
         
        }

        if(i.status == 2){
          if(i.status_name == '待发货'){
            i.shopStatus = "已接单"
            unsend.push(i)
          }
        }
        if(i.status == 4){
          if(i.status_name == '已完成'){
            i.shopStatus = "已接单"
            completed.push(i)
          }
         
        }

        if(i.status == 0 || i.status == 1 || i.pay_status_name == '待支付'){
          if(i.status_name == '已取消'){
            for(let j of i.items){ if(j.is_ok == 1){i.shopStatus = "已接单" } }
            
          }else{
            unpaid.push(i)
          }
    
       
        }
      }

      console.log('支付',unpaid)

        this.setData({ allList,unpaid,needcheck,completed,unsend})
    
     }
      

      

   
  },

  async confirmOrder(e) { //确认订单
    var that = this


    this.setData({
      currentTab: Number(that.data.currentTab) + 1
    })


    if (that.data.nowUserId != 7 && that.data.nowUserId != 5) {
      // 其他角色确认订单
      let res = await ajax({
        url: 'api/quickorder/OtherRoleIsOk',
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        }
      })

      if (res.data.code == 0) {
        that.getHoteOrder()
        wx.showToast({
          title: '确认成功',
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
    } else {
      let res = await ajax({
        url: 'api/quickorder/roleIsOk',
        method: 'POST',
        data: {
          id: e.currentTarget.dataset.id
        }
      })
      if (res.data.code == 0) {
        wx.showToast({
          title: '确认成功',
          icon: 'none',
          duration: 3000
        })
        that.getHoteOrder()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
      }
    }

  },
  async cancelOrder(e) { //取消订单
    var that = this
    let res = await ajax({
      url: 'api/order/cancel',
      method: 'POST',
      data: {
        id: e.currentTarget.dataset.id
      }
    })

    console.log("取消订单",res.data)
    if (res.data.code == 0) {
      wx.showToast({
        title: '取消成功',
        icon: 'none',
        duration: 3000
      })
      that.getHoteOrder()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },

  async getHoteInfo() { //获取酒店信息
    var that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })

    if(res.data.data == null){
      wx.showToast({
        title: '还未注册酒店，请先注册',
        icon:"none"
      })
      that.setData({
        hotel:false
      })
    }else{
      that.setData({
        hotel:true
      })
    }

    that.setData({
      hoteInfo: res.data.data
    })

  },

  //打印
  print(index) {
    ////console.log(index);
    let myData = index.currentTarget.dataset.value;
    let shop_name = "";
    myData.items.forEach(item => {
      shop_name += item.title + ",";
    })
    shop_name = shop_name.substring(0, shop_name.lastIndexOf(','));
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 40;

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    ////console.log(y)
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
      page: that.data.page + 1
    })
    ////console.log(that.data.total)
    // that.getHoteOrder(that.data.page)  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})