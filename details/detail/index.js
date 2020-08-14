//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    classfiySelect: "",
    orderlist: '',
    shopAttribute: '',
    currentTab: '',
    shopId: '', //商品id
    showDialog: false,
    countNumber: "", //输入框数量
    show: false,
    hotelOrderDetail: [], //商品
    title: "",
    id: "",
    count: "" //商品原本的数量
  },

  onLoad: function (options) {
 

    let that = this

    this.setData({
      shopId:options.id
    })

    if(options.enter == 4){
      that.setData({
        show:true
      })
    }


    this.getlist(this.data.shopId)
    this.getOrderShop(this.data.shopId)
    this.getHotelOrderDetail(this.data.shopId)
  },
  // 确认收货
  async completeOrderDetail(e){
    let that = this
    let id = e.currentTarget.dataset.id
    let res = await ajax({
      url: 'api/staff/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    that.getHotelOrderDetail(that.data.shopId)
 
  },

  // 一键收货
  async getAllHotel(){
    let that = this
    let id = this.data.shopId
    console.log(id)
    let res = await ajax({
      url: 'api/staff/HotelCompleteOrder',
      
      method: 'POST',
      data: {
        id
      }
    })
    console.log(res.data)

    if(res.data.code == 0){
      wx.showToast({
        title: '收货成功',
        icon:"none"
      })
      that.getHotelOrderDetail(that.data.shopId)
    }

  

  },


  toggleDialog(e) {

    let that = this
    this.setData({
      title: "",
      countNumber: ""
    })

    if (e.currentTarget.dataset.id != undefined) {
      that.setData({
        id: e.currentTarget.dataset.id,
        count: e.currentTarget.dataset.count
      })
    }

    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  // 点击左侧
  clickLeftItem(e) {
    let that = this

    let id = e.currentTarget.dataset.id;

    console.log(id)
    that.setData({
      classfiySelect: id
    })

  },
  async getHotelOrderDetail(id) {

    let that = this

    let res = await ajax({
      url: 'api/order/HotelOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })

    console.log("getHotelOrderDetail", res.data.data)

    let hotelOrderDetail = that.data.hotelOrderDetail

    if (res.data.code == 0) {
      hotelOrderDetail = res.data.data
    }

    this.setData({
      hotelOrderDetail
    })

  },

  // 请输入理由
  inputTitle(e) {
    let value = e.detail.value;
    this.setData({
      title: value
    })
  },
  // 请输入数量
  inputedit(e) {
    let value = e.detail.value;
    let count = this.data.count

    if (value > count) {
      value = count
    }

    this.setData({
      countNumber: value
    })

  },
  // 确认按钮
  async config(e) {
    let that = this
    let number = this.data.countNumber,
      title = this.data.title,
      order_detail_id = this.data.id,
      order_id = this.data.shopId

      let params = {
        order_id,
        title,
        number,
        order_detail_id,
        type: 1
      }
  
    if (number == "") {
      wx.showToast({
        title: '请输入数量',
        icon: "none",
        duration: 1000
      })
    } else {

      let res = await ajax({
        url: 'api/quickorder/delivery',
        method: 'POST',
        data: params
      })
      console.log(res.data)

      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        
        that.setData({
          showDialog: !that.data.showDialog
        });
        
         that.getHotelOrderDetail(that.data.shopId)
      }
    }

  },

  scroll1: function (e) {

    wx.pageScrollTo({
      selector: "#main",
      duration: 100
    })
  },
  async getOrderShop(id) { //获取订单二级列表
    let that = this
    let res = await ajax({
      url: 'api/order/getCategoryById',
      // url:'api/order/BrandOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    //console.log("secondaryClassification",res.data.data)
    if (res.data.code == 0) {
      that.setData({
        secondaryClassification: res.data.data,
        currentTab: res.data.data[0].category_id
      })
      that.getsecondaryClassShop(this.data.secondaryClassification[0].category_id)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async getsecondaryClassShop(category_id) { //根据二级分类id和订单id获取商品
    let that = this
    let params = {
      id: that.data.shopId,
      category_id
    }
    let res = await ajax({
      url: 'api/order/getGoodsById',
      method: 'POST',
      data: params
    })
    //console.log(res)
    if (res.data.code == 0) {
      let secondaryClassShop = res.data.data
      for (var i = 0; i < secondaryClassShop.length; i++) {
        secondaryClassShop[i].spec = JSON.parse(secondaryClassShop[i].spec)
      }
      that.setData({
        secondaryClassShop
      })
      //console.log(that.data.secondaryClassShop)
      // that.getsecondaryClassShop(this.data.secondaryClassification[0].category_id)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  exchange(e) { //退换货
    // //console.log(this.data.shopAttribute)
    // order_id = 订单id, title = 退货理由 order_detail_id = 商品详情id, price = 价格, number = 数量
    // type = 1退货退款, 2换货
    // let shopAttribute = this.data.shopAttribute
    let shop = {
      order_id: this.data.shopId,
      order_detail_id: e.currentTarget.dataset.item.id,
      price: e.currentTarget.dataset.item.price,
      number: e.currentTarget.dataset.item.buy_number
    }
    shop = JSON.stringify(shop)
    // let shop = JSON.stringify(this.data.shopAttribute)
    wx.navigateTo({
      url: `/pages/exchange/index?shop=${shop}`,
    })
  },
  clickTab(e) { //
    // //console.log(e.currentTarget.datascurrentTarget.datasetet.index)
    var that = this
    let currentTab = e.currentTarget.dataset.current //当前二级分类id
    let index = e.currentTarget.dataset.index
    that.setData({
      // shopAttribute: that.data.orderlist.items[index],
      currentTab
    })
    that.getsecondaryClassShop(currentTab)
  },
  async getlist(id) {

    let that = this
    let res = await ajax({
      url: 'api/order/Detail',
      method: 'POST',
      data: {
        id: id
      }
    })
    if (res.data.code == 0) {
      this.setData({
        orderlist: res.data.data.data,
        // shopAttribute: res.data.data.data.items[0],
        // currentTab: res.data.data.data.items[0].id
      })
      //console.log("orderlist",this.data.orderlist)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }

    // wx.showToast({
    //   title: res.data.msg,
    // })
    //console.log(res)
  },
  async addSelfShop() {
    var that = this
    let params = {
      type: 1,
      order_id: that.data.shopId,
      order_detail_id: that.data.shopAttribute.id
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
      // that.getlist(that.data.shopId)
      that.getsecondaryClassShop(taht.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async deletShop(e) { //删除商品
    var that = this
    //console.log(e)
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/Quickorder/delete',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 3000
      })
      // that.getlist(that.data.shopId)
      that.getsecondaryClassShop(that.data.currentTab)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  add(e) { //商品加
    var that = this
    let tableList = that.data.shopAttribute;
    let num = parseInt(tableList.buy_number);
    num = num + 1;
    tableList.buy_number = num;
    this.setData({
      shopAttribute: tableList
    })
    that.getShopNum(num, that.data.shopAttribute.id)
  },
  // 跳转详情
  sub(e) { //商品减
    var that = this
    let tableList = that.data.shopAttribute;
    let num = parseInt(tableList.buy_number);
    if (num <= 0) {
      return false;
    }
    num = num - 1;
    if (num == 0) {
      num = 1
    }
    tableList.buy_number = num;
    that.setData({
      shopAttribute: tableList
    })
    // this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    that.getShopNum(num, that.data.shopAttribute.id)
  },
  async getShopNum(num, id) {
    var that = this
    let params = {
      id: id,
      number: num
    }
    let res = await ajax({
      url: 'api/Quickorder/updateNumber',
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
  },
})