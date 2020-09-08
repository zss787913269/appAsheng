//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    classfiySelect: "",
    listindex: 1,
    tableList: [],
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    text: "nihao",
    checkedAll: true,
    checkedAll2: true,
    totalPrice: 0,
    totelid: [],
    currentTab: 1,
    type: 1,
    listindex: "",
    hisList: [],
    hisTotalPrice: '',
    ids: [],
    showqx: false,
    leftList: [],
    hotelCount: "",
    pcount: "",
    title: "",
    num2: "",
    spec: "",
    listindex: 1,
    hotelOrderDetail: [],
    jrdd: "",
    showDialog: false,
    showDialog2: false,
    thtitle: "",
    countNumber: 1,
    id: "",
    shopId: "",
    commonList: [],
    commomIds: [],
    cartList: [],
    carlen: "",
    checkboxNum:true
  },

  onLoad: function (options) {

    this.getTopCount()
    this.getCount()
    this.getHotelOrderDetail()
    this.getCommon()


  },
  onShow: function () {
    // console.log("ids",this.data.ids)
    // console.log("leftList",this.data.leftList)

    this.getCount()
    this.getTopCount()


  },
  async getCommon() {

    let that = this
    let res = await ajax({
      url: "api/quickorder/AllOrderGoodsList",

      method: "post"
    })
    let commomIds = []
    let list = res.data.data
    console.log("常用清单", res.data.data)


    if (res.data.code == 0) {
      for (let i of list) {
        // console.log(i)
        for (let j of i.goods) {
          j.isSelected = true,
            commomIds.push(j.id)
          j.spec = JSON.parse(j.spec)

        }
      }
    }
    let carlen
    if (this.data.cartList.length == 0) {
      carlen = commomIds.length
    }



    this.setData({
      commonList: list,
      carlen
    })

  },
  async config(e) {
    let that = this
    let number = this.data.countNumber,
      title = this.data.thtitle,
      order_detail_id = this.data.id,
      order_id = this.data.shopId

    let params = {
      order_id,
      title,
      number,
      order_detail_id,
      type: 1
    }

    console.log("params", params)

    wx.showModal({
      title: '提示',
      content: '确认退货吗',
      async success(res) {
        if (res.confirm) {
          let res = await ajax({
            url: 'api/quickorder/delivery',
            method: 'POST',
            data: params
          })
          console.log("申请退货", res.data)

          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })

            that.setData({
              showDialog2: !that.data.showDialog2
            });

            that.getHotelOrderDetail()
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })







  },
  // 请输入理由
  inputTitle(e) {
    let value = e.detail.value;
    this.setData({
      thtitle: value
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

  //点击切换列表
  clickindex(e) {
    let index = e.currentTarget.dataset.index

    this.setData({
      listindex: index
    })


  },
  inputname(e) {
    let value = e.detail.value;

    this.setData({
      title: value
    })
  },
  inputnum(e) {
    let value = e.detail.value;

    this.setData({
      num2: value
    })
  },
  inputspec(e) {
    let value = e.detail.value;
    this.setData({
      spec: value
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  toggleDialog2() {
    this.setData({
      showDialog2: !this.data.showDialog2
    });

  },
  subTap: function () {
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['XS420zSr_wjra7YzoaZhAR9gWuHvmjrblK2eYYGP-2A', 'vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'],
      success(res) {
        that.setData({
          textcontent: '提示：授权成功'
        })
        that.getmsg()
      },
      fail(res) {
        that.setData({
          textcontent: '提示：授权失败'
        })
      }
    })
  },
  async getmsg() {

    let res = await ajax({
      url: "api/test/sendwxappinfo",
      method: "post"
    })
    console.log("小程序消息", res)
  },
  async getHotelOrderDetail(id) {

    let that = this
    let len = []

    let res = await ajax({
      url: 'api/order/TodayOrderGoods',
      method: 'POST',
    })

    // console.log("getHotelOrderDetail", res.data)

    let hotelOrderDetail = res.data.data

    if (hotelOrderDetail.length != 0) {
      for (let i of hotelOrderDetail) {

        for (let j of i.goods) {
          len.push(j)
        }
      }
    }

    console.log(len)



    this.setData({
      hotelOrderDetail,
      jrdd: len

    })
  },
  async queren() {

    let that = this

    let params = {
      title: this.data.title,
      spec: this.data.spec

    }

    let res = await ajax({
      url: '/api/goods/addgoods',
      method: 'post',
      data: params
    })

    if (res.data.code == 0) {
      let res2 = await ajax({
        url: 'api/cart/save',
        method: 'POST',
        data: {
          is_purchase: 1,
          goods_id: res.data.data.goods_id,
          stock: that.data.num2,
          spec: [res.data.data.spec],
          goods_mark: that.data.spec
        }
      })

      if (res2.data.code == 0) {
        wx.showToast({
          title: "加入购物车成功",
          icon: 'none',
          duration: 3000
        })
        this.getCount()
        this.getTopCount()
        that.toggleDialog()

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
        that.toggleDialog()
      }

    }




  },
  // 订阅消息
  dy() {
    wx.requestSubscribeMessage({
      tmplIds: ['vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'],
      async success(res) {

        console.log("模板信息", res)
        //accept--用户同意 reject--用户拒绝 ban--微信后台封禁,可不管
        if (res['vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'] == 'accept'){

            let res = await ajax({
              url:"api/user/updatewxappsendmsgst",
              method:"post"
            })

            console.log(res.data)


        }else{
          wx.showModal({
             title: '温馨提示',
            content: '您已拒绝授权，将无法在微信中收到下单通知！',
             showCancel: false,
          })
        }

      }
    })
  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.current
    // console.log(index)
    this.setData({
      currentTab: index
    })
    this.getCount()
    this.getHotelOrderDetail()

  },
  async getTopCount() {
    let that = this
    let res = await ajax({
      url: "api/cart/carttypecount",
      method: "post"
    })
    let hotelCount, pcount
    for (let i of res.data.data) {
      if (i.is_purchase == 1) {
        hotelCount = i.num
      } else {
        pcount = i.num
      }
    }
    // console.log(hotelCount,pcount)



    that.getCount()

    this.setData({
      hotelCount,
      pcount
    })
    console.log("hotelCount", this.data.hotelCount)
  },
  sqth(e) {

    console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.id
    let shopId = e.currentTarget.dataset.shopid

    console.log(shopId)

    this.setData({
      id,
      shopId
    })

    this.toggleDialog2()

  },
  async completeOrderDetail(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let res = await ajax({
      url: 'api/staff/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })
    that.getHotelOrderDetail()
  },

  onkey() {

    let len = this.data.jrdd



    for (let i = 0; i < len.length; i++) {
      this.shouhuo(len[i].id)
    }

  },

  async shouhuo(id) {
    let that = this
    let res = await ajax({
      url: 'api/staff/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })

    console.log("一键收货", res.data.data)

    if (res.data.code == 0) {
      that.getHotelOrderDetail()
      wx.showToast({
        title: '收货成功',
        icon: "none"
      })
    }


  },

  async getCount() {
    let that = this

    let params = {
      is_purchase: 1
    }
    let res = await ajax({
      url: "api/cart/categorygoodscount",
      method: "post",
      data: params
    })

    console.log("酒店购物车", res.data)

    if (res.data.code == 0) {
      let list = res.data.data

      let ids = []

      for (let i of list) {
        // console.log(i)
        for (let j of i.goods) {
          j.isSelected = true,
            ids.push(j.id)
          j.spec = JSON.parse(j.spec)

        }
      }
      that.setData({
        leftList: list,
        showqx: true,
        ids
      })
    } else {

      that.setData({
        showqx: false,
        leftList: [],
        ids: [],
        pcount: 0,
        hotelCount: 0
      })

      wx.setTabBarBadge({
        index: 1,
        text: "0"
      })

      // wx.showToast({
      //   title: '购物车没有商品',
      //   icon: "none"
      // })
    }


    this.getTotalPrice()


  },
  // 全选
  allChecked() {

    let that = this
    let list = this.data.leftList
    let ids = []

    for (let i of list) {
      for (let j of i.goods) {
        j.isSelected = !j.isSelected

        if (this.data.checkedAll == false) {
          j.isSelected = true
        }
        if (j.isSelected == true) {
          ids.push(j.id)
        }
      }
    }
    console.log(list)

    if (this.data.checkedAll == true) {
      that.setData({
        totalPrice: 0
      })
    } else {
      if (ids <= 0) {
        that.setData({
          totalPrice: 0
        })
      } else {
        that.getTotalPrice()
      }

    }

    this.setData({
      checkedAll: !that.data.checkedAll,
      leftList: list,
      ids
    })



  },

  checkboxChange: function (e) {
    var that = this
    let list = this.data.leftList
    let checkedAll

    that.setData({
      ids: e.detail.value,
    })

    let goods = []
    for (let i of list) {
      for (let j of i.goods) {
        goods.push(j)
      }
    }
    if (that.data.ids.length != goods.length) {
      checkedAll = false
    } else {
      checkedAll = true
    }
    this.setData({
      checkedAll
    })
    if (e.detail.value.length <= 0) {
      that.setData({
        totalPrice: 0
      })
    } else {
      // console.log("2132")
      let num = 0
      for (let i of list) {
        for (let j of i.goods) {
          for (let k of e.detail.value) {
            if (j.id == k) {
              num += j.stock * j.price;
              that.setData({
                totalPrice: num.toFixed(2)
              })
            }
          }
        }
      }
    }
  },
  // zym 点击左侧导航栏
  clickLeftItem(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      classfiySelect: id,
    })



  },

  // 清空
  async deleteAll() {

    let that = this

    wx.showModal({
      title: '提示',
      content: '是否清空购物车',
      async success(res) {
        if (res.confirm) {
          let res = await ajax({
            url: 'api/cart/DeleteAll',
            method: 'POST'
          })


          if (res.data.code == 0) {
            that.getCount(1)
            that.getCount(0)
            wx.showToast({
              title: '清空成功',
              icon: "none"
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


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
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      async success(res) {
        if (res.confirm) {
          let res = await ajax({
            url: 'api/cart/delete',
            method: 'POST',
            data: {
              id: e
            }
          })
          wx.showToast({
            title: '删除成功',
            duration: 3000
          })
          that.getCount(that.data.currentTab)
        } else if (res.cancel) {

        }
      }
    })



  },


  //事件处理函数
  sub(e) {

    const index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item
    let list = this.data.leftList;
    let tableList = []


    for (let i of list) {
      for (let j of i.goods) {
        if (j.id == item) {
          let num = j.stock;
          if (num <= 0) {
            return false;
          }
          num = num - 1;
          if (num == 0) {
            num = 1
          }
          j.stock = num;
        }

        tableList.push(j)
      }
    }



    this.setData({
      leftList: list
    })
    this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    this.getTotalPrice()
  },
  add(e) {
    const index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item
    // let tableList = this.data.tableList;
    let list = this.data.leftList


    let tableList = []
    for (let i of list) {
      for (let j of i.goods) {
        tableList.push(j)
        if (j.id == item) {
          let num = parseInt(j.stock);
          num = num + 1;
          j.stock = num;
        }
      }
    }




    this.setData({
      leftList: list
    })
    this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    this.getTotalPrice()
  },

  // 计算购物车商品价格
  getTotalPrice(e) {

    let tableList = this.data.leftList;
    let sum = 0;

    for (let i of tableList) {

      for (let j of i.goods) {
        if (j.isSelected == true) {
          sum += j.stock * j.price
        }

      }
    }

    this.setData({
      totalPrice: sum.toFixed(2),
    })
  },


  clickTab: function (e) { //点击切换
    var that = this;

    // console.log(e)

    if (e.currentTarget.dataset.current == 1) {
      that.getCount(1)
    } else if (e.currentTarget.dataset.current == 2) {
      that.getHotelOrderDetail()
      that.getCount(1)
    }
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })

  },

  checkboxChange2(e) {
    let value = e.detail.value


    if(value.length == 0){
      this.setData({
        checkboxNum:false
      })
    }else{
      this.setData({
        checkboxNum:true
      })
    }

    this.setData({
      cartList: value,
      carlen: value.length
    })


    // console.log(e.detail.value)

  },

  cartAdd() {

    let that = this
    let list = this.data.cartList
    let carData = []

    for (let i of list) {
      // console.log(i.split('#'))
      carData.push(i.split("#"))
    }
    if(this.data.checkboxNum == false){
      wx.showToast({
        title:"请添加商品",
        icon:"none"
      })
      return 
    }
    if (this.data.cartList.length == 0) {
      for (let i of that.data.commonList) {
        for (let j of i.goods) {
          let params = {
            is_purchase: 1,
            goods_id: j.goods_id, //商品id
            stock: j.buy_number, //商品数量  
            // 商品规格
            spec: j.spec,
            goods_mark: ""
          }
          that.cartSend(params)
        }
      }
    }


    for (let i of carData) {

      let spec = [{
        type: i[2],
        value: i[3]
      }]

      let params = {
        is_purchase: 1,
        goods_id: i[0], //商品id
        stock: i[1], //商品数量  
        // 商品规格
        spec: spec,
        goods_mark: ""
      }
      that.cartSend(params)
    }
    console.log("cartAdd", this.data.cartList)
    console.log("常用清单", this.data.commonList)

  },

  async cartSend(params) {


    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: params
    })

    console.log("加入购物车", res.data)


    if (res.data.code == 0) {
      wx.showToast({
        title: "加入购物车成功",
        icon: 'none',
        duration: 3000
      })
      this.getCount()
      this.setData({
        listindex: 1
      })

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })

    }




  },

  submit: function () { //提交订单
    var that = this
    var item = that.data.ids
    var ids = item.toString()

    if (that.data.currentTab == 0) { //个人订单提交订单
      if (ids != '') {
        wx.navigateTo({
          url: `/pages/cartdetal/index?ids=${ids}`
        })
      } else {
        wx.showToast({
          title: '无可提交商品',
          icon: 'none',
          duration: 3000
        })
      }
    } else if (that.data.currentTab == 1) { //酒店提交订单
      if (ids != '') {
        that.subOrder(ids)
      } else {
        wx.showToast({
          title: '无可提交商品',
          icon: 'none',
          duration: 3000
        })
      }

    }

  },
  async subOrder(ids) { //酒店提交订单
    var that = this
    let res = await ajax({
      url: '/api/buy/add',
      method: 'POST',
      data: {
        buy_type: "cart",
        // buy_type: "goods",
        ids: ids,
        is_purchase: 1,
      }
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 3000
      })
      that.getHotelOrderDetail()
      that.getCount()
   
      let hotel_juese = wx.getStorageSync('hotel_juese')
      if(hotel_juese == 1){
        this.setData({
          currentTab: 2
        })
      }else{
       wx.navigateTo({
          url: '/private/hotelpeople/index',
        })
      }
     
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
    console.log(res)
  },


  // 步进器
  bindMinus: function () {
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
  bindPlus: function () {
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