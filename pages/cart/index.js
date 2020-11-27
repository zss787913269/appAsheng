//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    hotelstatus:"",
    allList:[],//全部
    unpaid:[],//未支付
    needcheck:[],//待验收
    completed:[],//已完成
    unsend:[],//待发货
    shopStatus:true,
    showModalStatus: false, //遮罩的显示与隐藏
    completed: [], //已经完成
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
    currentTab1:2,
    type: 1,
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
    checkboxNum: true,
    hotelMsg: [],
    hotel: true,
    index: "",
    wfk: "",
    yfk: "",
    dys: "",
    ywc: "",
  },

  onLoad: function (options) {

    //console.log("options",options)

    this.getHotel()
    this.getTopCount()
    this.getCount()
    this.getHotelOrderDetail()
    this.getCommon()
    this.getOK()


      if(options.page == 2){
        this.setData({
          listindex:2
        })
      }

  },
  onShow: function () {
    this.getHotel()
    this.getCount()
    this.getTopCount()
    this.getHoteOrder()


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
  buyAgain(e){
    let item = e.currentTarget.dataset.item,that = this
    console.log(item)
  
      for(let j of item.detail){
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
  async getHoteOrder(num) { //获取酒店订单列表

    let that = this
    
    let res = await ajax({
      url: 'api/order/TodayHotelOrderGoods',
      method: 'POST',
    })


     if(res.data.code != 0){
      wx.showToast({
        title: '还未注册酒店，请先注册',
        icon:"none"
      })
     }else{
      let allList = res.data.data,unpaid = [],completed = [],needcheck = [],unsend = []
      for(let i of allList){
        if(i.status_name == '待确认'){
        
              for(let j of i.detail){ if(j.is_ok == 1){i.shopStatus = "已接单" } }
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
            for(let j of i.detail){ if(j.is_ok == 1){i.shopStatus = "已接单" } }
          }else{
            unpaid.push(i)
          }
        }
      }
      console.log("全部商品",allList)
        this.setData({ allList,unpaid,needcheck,completed,unsend})
    
     }
      

      

   
  },

  detalis(e) { //跳转去详情页

    //console.log(e.currentTarget.dataset.shouhuo)

    wx.navigateTo({
      url: `/details/detail/index?id=${e.currentTarget.dataset.id}&enter=${e.currentTarget.dataset.shouhuo}`,
    })
  },
  async receivingGoods(e) { //确认收货
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }

  



    let res = await ajax({
      url: 'api/order/collect',
      method: 'POST',
      data: params
    })

    //console.log(res)

    if (res.data.code == 0) {
      wx.showToast({
        title: '收货成功',
        icon: 'none',
        duration: 3000
      })
      that.getHotelOrderDetail()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  payment(e) { //去支付页面


    let items = e.currentTarget.dataset

    //console.log(items)
    if (items.docat == 1) {
      wx.showToast({
        title: "此订单中有商品未划价，等待划价",
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.navigateTo({
        url: `/person/cartdetal/index?where=hote&&id=${items.id}&num=${items.num}&price=${items.price}`,
      })
    }


  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/details/detail/index?id=" + id,
    })

  },
  hideBuyModal() {

    // this.changeState()
    // 隐藏遮罩层
    this.setData({
      jgNumber: false,num:1
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })

    }.bind(this), 200)
  },
    // 遮罩层显示
  showModal() {
    // ////////console.log("点击了订单")

    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
      return 
    }

    if(this.data.hotel == false){
      wx.showToast({
        title: '还未注册酒店，请先注册',
        icon: "none"
      })
      return 
    }

    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
    }, 200)
  },
  async getOK() {
    let params = {
      type: 1,
      status: 4
    }
    let res = await ajax({
      url: '/api/quickorder/HotelList',
      method: 'POST',
      data: params
    })
    let completed = []

    if (res.data.code == 0) {

      let shoplist = res.data.data.data

      for (let i of shoplist) {
        if (params.status == 4) {
          completed.push(i)
        }
      }
      //console.log("已完成", completed)

      this.setData({
        completed
      })
    }


  },
  async getHotel() { //获取酒店
    var that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })

    console.log(res.data)
    if (res.data.data == null) {
      wx.showToast({
        title: '还未注册酒店，请先注册',
        icon: "none"
      })
      this.setData({
        hotel: false
      })
    } else {
      this.setData({
        hotelMsg: res.data.data,
        hotel: true
      })
    }


  },
  async getCommon() {//常买清单
    let that = this
    let res = await ajax({
      url: "api/quickorder/AllOrderGoodsList",

      method: "post"
    })
    let commomIds = []
    let list = res.data.data
    //console.log("常用清单", res.data.data)


    if (res.data.code == 0) {
      for (let i of list) {
        // //console.log(i)
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

    //console.log(this.data.index)

    let index = this.data.index
    let number = this.data.countNumber,
      title = this.data.thtitle,
      order_detail_id = this.data.id,
      order_id = this.data.shopId

    if (index == 1) {
      let params = {
        order_id,
        title,
        number,
        order_detail_id,
        type: 1
      }

      //console.log("params", params)

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
            //console.log("申请退货", res.data)

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
            //console.log('用户点击取消')
          }
        }
      })
    }else if(index == 2){


      
      wx.showModal({
        title: '提示',
        content: '确认退货吗',
        async success(res) {
          if (res.confirm) {
            let res = await ajax({
              url:"api/order/tuihuo",
              method:"post",
              data:{
                id:order_detail_id,
                number
              }
            })
            //console.log("申请退货", res.data)

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
            //console.log('用户点击取消')
          }
        }
      })
     
     
    }








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

    if (!this.data.hotel) {
      wx.showToast({
        title: '还未注册酒店,请先注册',
        icon: "none"
      })
    }

    this.setData({
      listindex: index
    })
    if(index == 1){
      this.getCount()
    }else if (index == 2) {
      this.getCommon()
    }else if(index ==3){
      this.getHoteOrder()
    }

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

    if (this.data.hotel) {
      this.setData({
        showDialog: !this.data.showDialog
      });
    } else {
      wx.showToast({
        title: '还未注册酒店,请先注册',
        icon: "none"
      })
    }



  },
  toggleDialog2() {
    this.setData({
      showDialog2: !this.data.showDialog2
    });

  },

  async getmsg() {

    let res = await ajax({
      url: "api/test/sendwxappinfo",
      method: "post"
    })
    //console.log("小程序消息", res)
  },
  async getHotelOrderDetail(id) {

    let that = this
    let len = []

    let res = await ajax({
      url: 'api/order/TodayHotelOrderGoods',
      method: 'POST',
    })

    //console.log("getHotelOrderDetail1", res.data)

    let hotelOrderDetail = res.data.data

    let wfk = [],
    yfk = [],
    dys = [],
    ywc = []
  for (let i of hotelOrderDetail) {
    if (i.juese == 1) {
      if (userid == i.user_id) {
        if (i.status == 1 || i.status == 0) {
          wfk.push(i)
        } else if (i.status == 2) {
          yfk.push(i)
        } else if (i.status == 3) {
          dys.push(i)
        } else if (i.status == 4) {
          ywc.push(i)
        }
      }
    } else {

      // //console.log("22222222222",i)
      if (i.status == 1 || i.status == 0) {
        wfk.push(i)
      } else if (i.status == 2) {
        yfk.push(i)
      } else if (i.status == 3) {
        dys.push(i)
      } else if (i.status == 4) {
        ywc.push(i)
      }

    }
  }



    this.setData({
      hotelOrderDetail,
      wfk,yfk,dys,ywc

    })
  },
  async queren() {

    let that = this

      

    if (that.data.num2 == "") {
      wx.showToast({
        title: '商品数量为空，请重新输入',
        icon: "none"
      })
      return
    } else if (this.data.title == "") {
      wx.showToast({
        title: '商品名字为空，请重新输入',
        icon: "none"
      })
      return
    }

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
        // that.toggleDialog()
        that.hideBuyModal()

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        })
        that.hideBuyModal()
      }

    }




  },
  // 订阅消息
  dy() {
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: ['vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'],
      async success(res) {

        that.submit()
        //accept--用户同意 reject--用户拒绝 ban--微信后台封禁,可不管
        if (res['vYVFNRkK5EBsPGROgCXmIJJRUIIlZWrkS7hRQT4KibE'] == 'accept') {

          let res = await ajax({
            url: "api/user/updatewxappsendmsgst",
            method: "post"
          })
        } 

      }
    })
  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.current
    this.setData({
      currentTab1: index
    })
    this.getHoteOrder()

  },
  async getTopCount() {
    let that = this
    let res = await ajax({
      url: "api/cart/carttypecount",
      method: "post"
    })

    if (res.data.code == 0) {
      let hotelCount, pcount

      for (let i of res.data.data) {
        
        if (i.is_purchase == 1) {
          hotelCount = i.num
        } else {
          pcount = i.num
        }
      }

      if(hotelCount > 0){
        this.setData({
          listindex:1
        })
      }
      that.getCount()
      this.setData({
        hotelCount,
        pcount
      })
    }

  },
  sqth(e) {

    //console.log(e.currentTarget.dataset)
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let shopId = e.currentTarget.dataset.shopid
    let count = e.currentTarget.dataset.count

    //console.log("shopID",shopId)

    // //console.log(shopId)

    this.setData({
      id,
      shopId,
      index,count
    })

    this.toggleDialog2()

  },
  async completeOrderDetail(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let res = await ajax({
      url: 'api/order/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })

    //console.log("确认收货", res)

    that.getHoteOrder()
    
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
      url: 'api/order/HotelCompleteOrderDetail',
      method: 'POST',
      data: {
        id
      }
    })

    //console.log("一键收货", res.data.data)

    if (res.data.code == 0) {
      that.getHoteOrder()
      wx.showToast({
        title: '收货成功',
        icon: "none"
      })
    }


  },

  async getCount() { //酒店购物车
    let that = this

    let params = {
      is_purchase: 1
    }
    let res = await ajax({
      url: "api/cart/categorygoodscount",
      method: "post",
      data: params
    })

  
    // for (let i of res.data.data) {
    //   for (let j of i.goods) {
     
    //     console.log("商品：",j.title+"-----"+"数量：",j.stock)
    //   }
    // }

    if (res.data.code == 0) {
      let list = res.data.data

      let ids = []

      for (let i of list) {
        // //console.log(i)
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
    //console.log(list)

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
      // //console.log("2132")
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
            that.getCount()
            wx.showToast({
              title: '清空成功',
              icon: "none"
            })
          }
        } else if (res.cancel) {
          //console.log('用户点击取消')
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
    console.log("加减商品",res.data)
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
          that.getCount()
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
          tableList.push(j)
        }

      
      }
    }

    console.log("减商品",tableList[index].stock)

    this.setData({
      leftList: list
    })
    this.subadd(tableList[index].id, tableList[index].goods_id, tableList[index].stock)
    this.getTotalPrice()
  },
  add(e) {
    const index = e.currentTarget.dataset.index;
    let item = e.currentTarget.dataset.item
    let list = this.data.leftList

    let tableList = []
    for (let i of list) {
      for (let j of i.goods) {
     
        if (j.id == item) {
          console.log('商品循环id',j.id)
          console.log('点击商品id',item)
          let num = parseInt(j.stock);
          num = num + 1;
          j.stock = num;

          tableList.push(j)
        }
      
      }
    }


    console.log("加商品",tableList[index].stock)

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


  checkboxChange2(e) {
    let value = e.detail.value


    if (value.length == 0) {
      this.setData({
        checkboxNum: false
      })
    } else {
      this.setData({
        checkboxNum: true
      })
    }

    this.setData({
      cartList: value,
      carlen: value.length
    })


    // //console.log(e.detail.value)

  },

  cartAdd() {

    let that = this
    let list = this.data.cartList
    let carData = []

    for (let i of list) {
      // //console.log(i.split('#'))
      carData.push(i.split("#"))
    }
    if (this.data.checkboxNum == false) {
      wx.showToast({
        title: "请添加商品",
        icon: "none"
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
    // //console.log("cartAdd", this.data.cartList)
    // //console.log("常用清单", this.data.commonList)

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

    if (app.globalData.token == '') {
      wx.navigateTo({ 
        url: "/component/zation/index"
      })
      return 
    }
    var that = this
    var item = that.data.ids
    var ids = item.toString()


    if (ids != '') {
      that.subOrder(ids)
    } else {
      wx.showToast({
        title: '无可提交商品',
        icon: 'none',
        duration: 3000
      })
    }

      //console.log("总价格",this.data.totalPrice)
      
      // let 

      // if(this.data.totalPrice < 300){
      //   wx.showModal({
      //     title: '提示',
      //     content: '订单金额小于300元,需要额外支付30元配送费',
      //     success (res) {
      //       if (res.confirm) {
      //         //console.log('用户点击确定')
      //       } else if (res.cancel) {
      //         //console.log('用户点击取消')
      //       }
      //     }
      //   })
      // }
    // if (that.data.currentTab == 0) { //个人订单提交订单
    //   if (ids != '') {
    //     wx.navigateTo({
    //       url: `/pages/cartdetal/index?ids=${ids}`
    //     })
    //   } else {
    //     wx.showToast({
    //       title: '无可提交商品',
    //       icon: 'none',
    //       duration: 3000
    //     })
    //   }
    // } else if (that.data.currentTab == 1) { //酒店提交订单

    // }

  },
  async subOrder(ids) { //酒店提交订单
    var that = this
    wx.showLoading({
      title: '提交中',
    })

    
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
      wx.hideLoading()
      that.getHoteOrder()
      that.getCount()
      that.setData({
        listindex:3
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
    //console.log(res)
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