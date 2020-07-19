import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()
var time = require('../../utils/util.js')
Page({
  data: {
    rightHeight:"",
    classfiySelect: "",
    active: 0,
    currentTab: 0,
    mydata: [],
    mylist: [],
    showModalStatus: false, //遮罩的显示与隐藏
    city: '成都',
    ads: ['/images/temp/ad.jpg', '/images/temp/ad_2.jpg'],
    currentTab: 0,
    select: 1,
    selected: 1,
    url: '/person/commis/index',
    url1: '/person/integral/index',
    url2: '/private/invitation/index',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tableList: [],
    tableListone: [],
    tableListtwo: [],
    tableListre: [],
    bottom: 200, //元素初始位置 
    initialBottom: 0, //元素变化后的位置  
    tableid: '',
    recommend: '红烧土豆', //新菜推荐
    pageNumber: '', //分类翻页
    tbodyHeight: 0, //
    bottom2: 209,
    back: false,
    numGroup: 1,
    bigid2: '',
    commission: 0, //我的佣金
    integral: 0, //我的积分
    readBottom: true,
    scrollTop: '', //上次滑动的距离
    // 规格
    tablenorms: '',
    // 种类
    tabletype: '',
    // 加工
    ablemachin: '',
    // brand_id
    brand_id: '',
    // 重量
    tableKg: '',
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    // 大id
    bigid: '',
    // 商品id
    shopingid: '',
    groupShop: [],
    // 一级分类
    firstclass: '',
    itemed: 'http://second.chchgg.com/public',
    currentIndex: 0,
    groupStart: true,
  },
  toOldFood(e) { //去老菜新菜页面
    console.log(e.currentTarget.dataset.value)
    let value = e.currentTarget.dataset.value
    wx.reLaunch({ //跳转到tab页面
      url: '/pages/find/index?value=' + value + '&where=index'
    })
  },
  async getBanner() {
    var that = this
    let res = await ajax({
      url: '/api/index/getBanner'
    })
    console.log(res)
    if (res.data.code == 0) {
      that.setData({
        ads: res.data.data.banner_list
      })
    }

  },
  switchNav: function (e) {
    var page = this;
    var id = e.target.id;


    console.log(id)

    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      active: id
    });
  },
  advertisementAdd(e) {
    var that = this
    let type = e.currentTarget.dataset.type
    if (type == 1) {
      let tab = e.currentTarget.dataset.id.spec_base
      let tabCopy = JSON.parse(JSON.stringify(tab))
      for (var i = 0; i < tabCopy.length; i++) {
        tabCopy[i].value = {}
      }
      for (var i = 0; i < tab.length; i++) {
        for (var j = 0; j < tab[i].value.length; j++) {
          if (i == 0 && j == 0) {
            tabCopy[i].value[tab[i].value[j]] = true
          } else {
            tabCopy[i].value[tab[i].value[j]] = false
          }
        }
      }
      that.setData({
        tableid: tabCopy,
        shopingid: e.currentTarget.dataset.id.id,
        shopingid2: e.currentTarget.dataset.id.id,
        brand_id: e.currentTarget.dataset.id.brand_id,
        support: false
      })
      that.getShopPrice()
    } else if (type == 2) {
      wx.navigateTo({
        url: `/details/dishname/index?id=${e.currentTarget.dataset.value}`,
      })
    } else if (type == 3) {
      wx.showToast({
        title: '暂无',
        icon: 'none',
        duration: 3000
      })
    }
  },
  eliminate() {
    wx.removeStorage({
      key: 'token',
    })
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
  bindPlusGroup() { //商品数量加
    let numGroup = this.data.numGroup
    numGroup++
    this.setData({
      numGroup
    })
  },
  bindMinusGroup() { //商品数量减
    let numGroup = this.data.numGroup
    if (numGroup > 1) {
      numGroup--
    }
    this.setData({
      numGroup
    })
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (num >= 999) {
      num = 999
    } else if (num < 1) {
      num = 1
    }
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  personalPurchase() { //个人购买
    // pages/cartdetal/index
    if (this.data.numGroup < this.data.groupShop[this.data.groupShopIndex].goods_number) {
      wx.showToast({
        title: '最低购买数量' + this.data.groupShop[this.data.groupShopIndex].goods_number,
        icon: 'none',
        duration: 3000
      })
      return
    }
    //  活动id，商品规格，商品id，数量
    let shopAttribute = {
      id: this.data.activityId,
      shopId: this.data.shopId,
      spec: this.data.spce,
      num: this.data.numGroup
    }
    console.log(shopAttribute)
    shopAttribute = JSON.stringify(shopAttribute)
    wx.navigateTo({
      url: `/pages/cartdetal/index?where=group&shopAttribute=${shopAttribute}`,
    })
  },
  async hotelPurchase(e) { //酒店采购组团
    if (this.data.numGroup < this.data.groupShop[this.data.groupShopIndex].goods_number) {
      wx.showToast({
        title: '最低购买数量' + this.data.groupShop[this.data.groupShopIndex].goods_number,
        icon: 'none',
        duration: 3000
      })
      return
    }
    var that = this
    let params = {
      buy_type: "goods",
      is_purchase: 1,
      is_group_buy: 1, //组团商品
      activity_id: that.data.activityId, //活动id
      stock: that.data.numGroup, //商品数量
      goods_id: that.data.shopId, //商品id
      spec: that.data.spce, //商品规格
      price: e.currentTarget.dataset.price, //当前价格
    }
    console.log(params)
    let res = await ajax({
      url: '/api/buy/add',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '提交成功',
        duration: 3000
      })
      this.getcart()
      wx.navigateTo({
        url: '/private/hotelpeople/index',
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  lookAdvertisement() { //点击广告图片
    this.setData({
      currentIndex: this.data.currentIndexInitial,
      firstclass: this.data.groupId
    })
    // console.log(e.currentTarget.dataset.url)
    // this.setData({
    //   firstclass: e.currentTarget.dataset.url.id
    // })
    this.getsearch(this.data.firstclass)
    console.log(this.data.firstclass)
  },

  // 我的佣金
  gotoikPage: function (e) {
    if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url + '?integral=' + this.data.integral
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }

  },
  getWork() {

    console.log("zym")
    let that = this
    app.globalData.token = wx.getStorageSync('token')
    let url = 'api/staff/getStaffSendOrder'
    let data = {
      status: 0
    }
    app.wxRequest('POST', url, data, (res => {
      console.log(res);
      if (res.data.code == 0) {
        that.setData({
          total1: res.data.data.total
        })
      }
    }), (err => {
      console.log(err);
    }))
    let url1 = 'api/store/getStoreOrder'
    let data1 = {
      status: 1
    }
    app.wxRequest('POST', url1, data1, (res => {
      if (res.data.code == 0) {
        that.setData({
          total2: res.data.data.total
        })
      }
    }), (err => {
      console.log(err);
    }))
    app.wxRequest('POST', url1, data, (res => {
      if (res.data.code == 0) {
        that.setData({
          total3: res.data.data.total
        })
      }
    }), (err => {
      console.log(err);
    }))
    let url2 = 'api/order/index'
    let data2 = {
      page: 1
    }
    app.wxRequest('POST', url2, data2, (res => {
      if (res.data.code == 0) {
        that.setData({
          total4: res.data.data.total
        })
      }
    }), (err => {
      console.log(err);
    }))
    let url3 = 'api/quickorder/MySelfOrder'
    app.wxRequest('POST', url3, data2, (res => {
      if (res.data.code == 0) {
        that.setData({
          total5: res.data.data.total
        })
      }
    }), (err => {
      console.log(err);
    }))
    let url4 = '/api/quickorder/HotelList'
    let data3 = {
      type: 1,
      page: 1
    }
    app.wxRequest('POST', url4, data3, (res => {
      if (res.data.code == 0) {
        that.setData({
          total6: res.data.data.total
        })
        let total = this.data.total1 + this.data.total2 + this.data.total3 + this.data.total4 + this.data.total5 + this.data.total6
        if (total === 0) {
          wx.setTabBarBadge({
            index: 2,
            text: '',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
          });
        } else if (99 >= total > 0) {
          wx.setTabBarBadge({
            index: 2,
            text: '' + total + '',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
          });
        } else if (total > 99) {
          wx.setTabBarBadge({
            index: 2,
            text: '99+',
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
          });
        }
      }
    }), (err => {
      console.log(err);
    }))
  },

  //获取购物车数量
  getcart() {
    let url1 = 'api/cart/index'
    let data = { //酒店购物车需要传参
      is_purchase: 1
    }
    app.wxRequest('POST', url1, data, (res) => {
      if (res.data.code === 0) {
        this.setData({
          cartNum: res.data.data.data.length
        })
      }
    }, (err) => {
      console.log(err)
    })
    let url2 = 'api/cart/index'
    app.wxRequest('POST', url2, '', (res) => {
      if (res.data.code === 0) {
        console.log(res);
        this.setData({
          personNum: res.data.data.data.length
        })
        console.log(this.data.personNum);
      }
    }, (err) => {
      console.log(err)
    })
  },
  onLoad: function (options) {
    var that = this

    // that.getMyCommission()   //获取我的佣金积分
    // 获取导航栏
    app.globalData.token = wx.getStorageSync('token')
    that.getcart()
    // if (app.globalData.token == '') {
    //   wx.navigateTo({
    //     url: "/component/zation/index"
    //   })
    // } else {
    //   that.getCookInfo()
      // }





      

    that.gettableList();
    // 获取详情
    that.getBanner() //获取首页轮播图
    that.setData({ //元素动态变化
      initialBottom: that.data.bottom + 'px',
      tbodyHeight: that.data.bottom2
    })
    console.log(options)
    var scene = decodeURIComponent(options.q)
    //  scene = JSON.parse(scene)
    let res = scene.split("type=")[1] //酒店角色进入
    let resIndex = scene.split("referrer=")[1] //首页二维码进入
    console.log(scene)
    console.log(res)
    if (res != undefined) {
      wx.setStorage({
        key: "shop",
        data: res
      })
      if (app.globalData.token != '') {
        that.getBinDing(res)
      }
    }
    if (resIndex != undefined) {
      wx.setStorage({
        key: "Index",
        data: resIndex
      })
      if (app.globalData.token != '') {
        that.getBinDing(resIndex)
      }
    }
    // this.getQrcode()
  },

  async getBinDing(role) { //绑定角色
    var that = this
    let res = await ajax({
      url: 'api/user/hotelBrand',
      method: 'post',
      data: {
        type: role
      }
    })
    console.log(res)
    console.log('daozzzzzzzzzzz')
  },
  // async getMyCommission() {   //获取佣金
  //   var that = this
  //   let res = await ajax({
  //     url: 'api/user/getUserProperty',
  //     method: 'get',
  //   })
  //   if(res.data.data.Yongj === null){
  //     res.data.data.Yongj = "0.00"
  //   }
  //   that.setData({
  //     commission: res.data.data.Yongj,
  //     integral: res.data.data.integral
  //   })
  //   console.log(res)
  // },
  backTop() { //回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      // duration: 1000
    })
  },
  onReachBottom: function (e) { //触底函数
    var that = this
    that.setData({
      readBottom: false,
    })
  },
  onPageScroll: function (e) { //监听页面滚动距离




    // 如果滑动超过 300 就马上吸附

    // 但是每一次都会滑动

    // 设定一个标志位
    let flag = false;
    // 每一次进来的时候 都是false
    // 当大于300的时候 就等于true
    // 小于的时候 为false


    // if(e.scrollTop > 100 ){
    //   wx.pageScrollTo({
    //     selector: "#main",
    //     duration: 100
    //   })
    // }else{
    //   wx.pageScrollTo({
    //     selector: "#header",
    //     duration: 100
    //   })
    // }






    var that = this

    let distance = that.data.bottom - e.scrollTop + 'px'
    let tobody = that.data.bottom2 - e.scrollTop

    if (that.data.scrollTop < e.scrollTop) {
      that.setData({
        readBottom: true,
      })
    }
    if (that.data.readBottom == true) {
      that.setData({
        support: true,
        bigid2: '',
        num: 1,
        scrollTop: e.scrollTop
      })
    }
    if (e.scrollTop < 82) {
      that.setData({
        initialBottom: distance,
        tbodyHeight: tobody
      })
    }
    if (e.scrollTop > 200) {
      that.setData({
        back: true
      })
    }
    if (e.scrollTop < 100) {
      that.setData({
        back: false
      })
    }
  },


  onPullDownRefresh() {
    console.log(123)
  },


  // zym 点击商品的时候 滑动
  myscorll() {
    wx.pageScrollTo({
      selector: "#main",
      duration: 100
    })
  },
  // 获取导航栏
  async gettableList() {
    let that = this
    let res = await ajax({
      url: 'api/index/getOneCategory'
    })
    console.log('导航', res);
    if (res.data.code == 0) {
      let tableList = res.data.data
      for (var i = 0; i < tableList.length; i++) {
        let viceNmae = tableList[i].vice_name.toLowerCase()
        if (viceNmae == 'promotion') {
          that.setData({
            advertisement: tableList[i].big_images, //广告图片
            currentIndexInitial: Math.ceil(i / 6) - 1,
            groupId: tableList[i].id //组团id
          })
        }
      }
      console.log(that.data.advertisement)
      that.setData({
        tableList,
        pageNumber: Math.ceil(res.data.data.length / 6)
      })
      that.getsearch(res.data.data[0].id)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }

  },

  // 一级分类
  goUrl: function (e) { //点击一级分类
    console.log(e.currentTarget.dataset.url)
    this.setData({
      firstclass: e.currentTarget.dataset.url.id
    })
    this.getsearch(this.data.firstclass)
  },
  //点击切换
  clickTab: function (e) { //点击二级分类
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    })
    that.getsearchtre(that.data.currentTab)
    that.getGroup(that.data.currentTab)
    console.log(that.data.tableListre)
  },
  clickPurchase(e) { //点击组团规格
    let groupShop = this.data.groupShop
    let numGroup = this.data.numGroup
    for (var i = 0; i < groupShop.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        groupShop[i].purchase = true
      } else {
        groupShop[i].purchase = false
      }
    }
    numGroup = groupShop[e.currentTarget.dataset.index].goods_number
    this.setData({
      groupShop,
      numGroup,
      groupShopIndex: e.currentTarget.dataset.index,
      activityId: groupShop[e.currentTarget.dataset.index].id, //活动id
      shopId: groupShop[e.currentTarget.dataset.index].gid, //商品id
      spce: [{ //商品规格
        type: groupShop[e.currentTarget.dataset.index].spec[0].title,
        value: groupShop[e.currentTarget.dataset.index].spec[0].value[0],
      }]
    })
  },
  // 获取二级分类详情
  async getsearch(id) {
    let that = this
    console.log(id)
    let res = await ajax({
      url: 'api/index/getAllInfoByCategoryId',
      method: 'POST',
      data: {
        id: id
      }
    })
    if (res.data.code == 0) {
      that.setData({
        tableListre: res.data.data,
        firstclass: id
      })
      that.getsearchtre(res.data.data[0].id)
      if (that.data.groupId == id) {
        that.setData({
          groupStart: false
        })
        that.getGroup(res.data.data[0].id)
      } else {
        that.setData({
          groupStart: true
        })
      }
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
      that.setData({
        tableListre: []
      })
    }

  },
  // 获取三级分类
  async getsearchtre(id) {
    let that = this
    let res = await ajax({
      url: 'api/index/getAllInfoByCategoryId',
      method: 'POST',
      data: {
        id: id
      }
    })
  
    if (res.data.code == 0) {


     

      // console.log('第三季',res);
      let arr = res.data.data
      arr.forEach(item => {
        let itemFor = item.goods;
        item.goods.sort(function (a, b) {
          return a.price - b.price
        })
        itemFor.forEach(item1 => {
          item1.hidden = true
          if (item1.images) {
            item1.images = 'http://second.chchgg.com/public' + item1.images
          }
          // item1.show_keyword = JSON.parse(item1.show_keyword)
        })
      })

      // console.log("zym")
      console.log(arr)

      that.setData({
        tableListone: arr,
        currentTab: id
      })
      that.length()
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
      that.setData({
        tableListone: []
      })
    }

  },
  async getGroup(id) {
    var that = this
    let res = await ajax({
      url: 'api/index/getGroupGoodsByCategoryId',
      method: 'POST',
      data: {
        category_id: id
      }
    })
    console.log(res)
    if (res.data.code == 0) {
      let groupShop = res.data.data
      that.setData({
        groupShop,
        groupWhether: true
      })
      for (var i = 0; i < groupShop.length; i++) {
        groupShop[i].start_time = time.formatTimeTwo(groupShop[i].start_time, 'D号')
        // groupShop[i].end_time = time.formatTimeTwo(groupShop[i].end_time, 'M月D日 h')
        groupShop[i].raise_time_sta = time.formatTimeTwo(groupShop[i].raise_time_sta, 'M月D日 h')
        groupShop[i].send_time = time.formatTimeTwo(groupShop[i].send_time, 'D号 h')
        groupShop[i].purchase = false
        // if (groupShop[i].)
        that.getNowPrice(groupShop[i].id, groupShop[i].gid, groupShop[i].spec, i)
      }
      console.log(groupShop)
      that.setData({
        groupShop
      })

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
      that.setData({
        groupWhether: false
      })
    }
    // if(res.data.code == 0){
    //   that.setData({
    //     groupWhether:true
    //   })
    // }else{
    //   that.setData({
    //     groupWhether: false
    //   })
    // }
  },
  async getNowPrice(activity_id, goods_id, specTime, i) { //查询组团价格

    var that = this
    console.log(specTime[0])
    let groupShop = that.data.groupShop
    let params = {
      activity_id,
      goods_id,
      spec: [{
        type: specTime[0].title,
        value: specTime[0].value[0]
      }]
    }
    let res = await ajax({
      url: 'api/index/getGroupPrice',
      method: 'POST',
      data: params
    })
    console.log(res.data.code)
    if (res.data.code == 0) {
      groupShop[i].nowPrice = res.data.data
      that.setData({
        groupShop
      })
    }
    console.log(res)
    console.log(that.data.groupShop)
  },
  // seeGroup(){
  //   wx.navigateTo({
  //     url: `/details/groupAll/index?id=${this.data.currentTab}`,
  //   })
  // },
  // 获取item

  // zym 弹出
  clickse: function (e) {


    this.showModal()
    var that = this
    let tab = e.currentTarget.dataset.id.spec_base
    let tabCopy = JSON.parse(JSON.stringify(tab))
    for (var i = 0; i < tabCopy.length; i++) {
      tabCopy[i].value = {}
    }

    for (var i = 0; i < tab.length; i++) {
      for (var j = 0; j < tab[i].value.length; j++) {
        if (i == 0 && j == 0) {
          tabCopy[i].value[tab[i].value[j]] = true
        } else {
          tabCopy[i].value[tab[i].value[j]] = false
        }
      }
    }
    that.setData({
      tableid: tabCopy,
      shopingid: e.currentTarget.dataset.id.id,
      shopingid2: e.currentTarget.dataset.id.id,
      brand_id: e.currentTarget.dataset.id.brand_id,
      support: false,
      mylist: e.currentTarget.dataset.id,
      mydata: e.currentTarget.dataset.id.spec_base
    })
    that.getShopPrice()

    console.log(this.data.mylist)
    console.log(this.data.mydata)


  },
  myclick(e) {
    console.log(e.currentTarget.dataset)
  },

  clickgui: function (e) {
    var that = this;
    let tableId = that.data.tableid
    for (var i = 0; i < tableId.length; i++) {
      if (tableId[i].title == e.currentTarget.dataset.indx) {
        if (tableId[i].value[e.currentTarget.dataset.index] == true) {
          tableId[i].value[e.currentTarget.dataset.index] = false
        } else {
          for (let j in tableId[i].value) {
            console.log(e.currentTarget.dataset.index)
            tableId[i].value[j] = false
            tableId[i].value[e.currentTarget.dataset.index] = true
          }
        }

      }
    }
    that.setData({
      tableid: tableId
      // tablenormsName: e.currentTarget.dataset.index,    //属性值获取
      // tablenormsTitle: e.currentTarget.dataset.indx    //属性值获取
    })
    that.getShopPrice()
  },
  async getShopPrice() {
    var that = this
    let tableid = that.data.tableid
    let spec = []
    for (var i = 0; i < tableid.length; i++) {
      let obj = {}
      for (let j in tableid[i].value) {
        // console.log(tableid[i].value[j] )
        if (tableid[i].value[j] == true) {
          obj.type = tableid[i].title
          obj.value = j
          spec.push(obj)
        }
      }
    }
    // console.log(spec)
    let params = {
      id: that.data.shopingid,
      spec
    }
    let res = await ajax({
      url: '/api/goods/SpecDetail',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      that.setData({
        shopPrice: res.data.data.price
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  // 遮罩层


  hideBuyModal() {

    // this.changeState()
    // 隐藏遮罩层
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
    // console.log("点击了订单")
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


  clickid: function (e) {

    //  this.showBuyModal()

    // console.log(this.data.groupShop)

    var that = this;
    that.setData({
      bigid: e.currentTarget.dataset.index,
      bigid2: e.currentTarget.dataset.index
    })
    // console.log(that.data.bigid2 + 'clickid')
  },

  // tablemachin: '',
  clickzhong: function (e) {
    var that = this;
    that.setData({
      tabletype: e.currentTarget.dataset.color
    })
  },
  clickjia: function (e) {
    var that = this;
    that.setData({
      tablemachin: e.currentTarget.dataset.color
    })

  },
  clickKg: function (e) {
    var that = this;
    that.setData({
      tableKg: e.currentTarget.dataset.color
    })

  },

  clickcancel: function () { //返回按钮
    // var that = this
    // that.changeState()
    this.hideBuyModal()
  },
  async changeState() {
    var that = this
    let res = await ajax({
      url: '/save',
      method: 'POST',
    })
    that.setData({
      tableid: '',
      num: 1,
      tablenorms: '',
      tabletype: '',
      tablemachin: '',
      tableKg: '',
      bigid2: ''
    })
  },
  clickselet: function () { //个人采购加入购物车
    var that = this;
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } else {
      that.clickseleted();
    }
  },
  async clickseleted(id) {
    let that = this
    let spex = []
    for (var i = 0; i < that.data.tableid.length; i++) {
      for (let j in that.data.tableid[i].value) {
        if (that.data.tableid[i].value[j] == true) {
          let obj = {}
          obj.type = that.data.tableid[i].title
          obj.value = j
          spex.push(obj)
        }
      }
    }
    let params = {
      goods_id: that.data.shopingid, //商品id
      stock: that.data.num, //商品数量  
      // 商品规格
      spec: spex
    }
    console.log(params)
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: params
    })
    that.setData({
      tableid: '',
      num: 1,
      tablenorms: '',
      tabletype: '',
      tablemachin: '',
      tableKg: '',
      bigid2: ''
    })
    if (res.data.msg == "没有相关规格") {
      wx.showToast({
        title: "请选择相关规格",
        icon: 'none',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
      this.getcart()
    }

  },
  determine() { //加入酒店购物车
    var that = this;

    console.log(that.data.tablenorms)
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } else {
      that.commodity();
    }
  },
  async commodity() {
    let that = this
    let spex = []
    for (var i = 0; i < that.data.tableid.length; i++) {
      for (let j in that.data.tableid[i].value) {
        if (that.data.tableid[i].value[j] == true) {
          let obj = {}
          obj.type = that.data.tableid[i].title
          obj.value = j
          spex.push(obj)
        }
      }
    }
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: {
        is_purchase: 1,
        goods_id: that.data.shopingid,
        stock: that.data.num,
        spec: spex
      }
    })
    that.setData({
      tableid: '',
      num: 1,
      tablenorms: '',
      tabletype: '',
      tablemachin: '',
      brand_id: '',
      tableKg: '',
      bigid2: ''
    })
    console.log(that.data.bigid2)
    if (res.data.code == 0) {
      wx.showToast({
        title: "加入成功",
        icon: 'none',
        duration: 3000
      })
      this.getcart()
      console.log(res)
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
    // if (res.data.msg == "没有相关规格") {
    //   wx.showToast({
    //     title: "请选择相关规格",
    //   })
    // } else {

    // }
    console.log(res)

  },
  gouwuche: function () {
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } else {
      wx.navigateTo({
        url: "/pages/cart/index"
      })
    }
  },
  clickHotel: function () {
    var that = this
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
      return
    }
    that.getOrder()


  },
  async getOrder() { //快速下单
    var that = this
    let res = await ajax({
      url: '/api/Quickorder/QuickOrder',
      method: 'get',
    })
    console.log(res)
    if (res.data.code == -1) {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
      return
    }
    let data = JSON.stringify(res.data)
    wx.navigateTo({
      url: `/pages/cart/index`
    })
  },
  // zym 滚动条
  scroll1: function (e) {

    wx.pageScrollTo({
      selector: "#main",
      duration: 100
    })
  },
  scroll: function (e) {


    wx.pageScrollTo({
      selector: "#main",
      duration: 100
    })

    
    // let that = this
    // let top  = e.detail.scrollTop
    // let arr = this.data.rightHeight
    // let t = this.data.tableListone[0].id

    // // console.log(arr)

    // for(var i = arr.length - 1; i >= 0 ;i--){
    //   if(arr[i] <= top){
    //       t = that.data.tableListone[i].id
    //       break
    //   }
    // }

    // console.log("t:------"+t)
    // console.log("classfiySelect"+ this.data.classfiySelect)
    
    // if(t !== this.data.classfiySelect){
    //   that.setData({
    //     classfiySelect:t
    //   })
    // }
  

    
    
    

    
    
  

  },

  //求每一栏高度
  length: function () {
    var that = this;


    wx.createSelectorQuery().selectAll('.leftTitle').boundingClientRect(function (rect) { }).exec(function (res) { 

      // console.log(res[0].map(r=>r.top)
      // console.log(res[0].map(r=>r.scrollTop))
      // that.data.rightHeight = res[0].map(r=>r.top)

      that.setData({
        rightHeight:res[0].map(r=>r.top-457)
      })

    });

  

  },

  // zym 点击左侧导航栏
  clickLeftItem(e) {

    // this.length()
    let id = e.currentTarget.dataset.id;
    // console.log(id)

    let that = this

    that.setData({
      classfiySelect: id
    })

  },


  onShow: function () { //监听页面显示

   
    


    var that = this
    // if (app.globalData.token != '') {
    //   that.getMyCommission() //获取我的佣金积分
    // }
    this.getcart()
    // this.getWork()
  },
  
})

