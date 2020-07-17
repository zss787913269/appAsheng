import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()
// details/searchResult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',   
    number:1,   //初始页数
    shopSearchList: [],   //商品搜索结果
    foodSearchList:[],   //菜品搜索结果
    specifications:false,
    shopIndex:-1,    //当前点击的商品行
    pageNumber:'',
    num:1,  //商品数量
    minusStatus: 'disabled',
    shopSpecifications:'',    //商品规格
    tablenorms:'',   
    tabletype:'',
    tablemachin:'',
    tableKg:'',
    shopId:'',    //商品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      that.setData({
        value:options.value,
      })
      if(options.where == 'shop'){
        that.getSearchResult(that.data.number)
        that.setData({
          switc:true
        })
      } else if (options.where == 'food'){
        that.getSearchResultFood()
        that.setData({
          switc: false
        })
      }
  },
    async getSearchResult(num){    //商品搜索
      var that = this
      let parmes = {
        keywords:that.data.value,
        page:num
      }
      let res = await ajax({ url: 'api/search/index', method: 'post', data:parmes})
      console.log(res)
      let shopSearchList = res.data.data.data
      for (let i = 0; i < shopSearchList.length;i++){
        shopSearchList[i].show_keyword = JSON.parse(shopSearchList[i].show_keyword)
      }
      that.setData({
        shopSearchList: that.data.shopSearchList.concat(shopSearchList),
      })
      that.setData({
        pageNumber: Math.ceil(that.data.shopSearchList.length / 2)
      })
      console.log(that.data.shopSearchList)
  },
  async getSearchResultFood() {    //菜品搜索
  console.log(123123)
    var that = this
    let parmes = {
      keywords: that.data.value,
    }
    let res = await ajax({ url: '/api/dishes/search', method: 'post', data: parmes })
    console.log(res)
    that.setData({
      foodSearchList: res.data.data,
    })
  },
  determine() {    //点击确定
    var that = this;
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
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: {
        is_purchase: 1,
        brand_id: that.data.brand_id,
        goods_id: that.data.shopId,
        stock: that.data.num,
        spec: [{
          type: '规格',
          value: that.data.tablenorms
        }, {
          type: '种类',
          value: that.data.tabletype
        }, {
          type: '加工',
          value: that.data.tablemachin
        }, {
          type: '重量',
          value: that.data.tableKg
        }]
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
      bigid2: '',
      shopIndex: -1
    })
    console.log(that.data.bigid2)
    if (res.data.msg == "没有相关规格") {
      wx.showToast({
        title: "请选择相关规格",
        icon:'none',
        duration:3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
    console.log(res)

  },
  clickcancel(){   //返回
    var that = this
    that.setData({
      shopIndex:-1,
      tablenorms:'',
      tabletype:'',
      tablemachin:'',
      tableKg:'',
    })
  },
  clickgui: function (e) {
    var that = this;
    that.setData({
      tablenorms: e.currentTarget.dataset.color
    })

  },
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
  clickselet: function () {    //加入个人购物车
    var that = this;
    console.log(app.globalData)
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
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: {
        goods_id: that.data.shopId,
        stock: that.data.num,
        spec: [{
          type: '规格',
          value: that.data.tablenorms
        }, {
          type: '种类',
          value: that.data.tabletype
        }, {
          type: '加工',
          value: that.data.tablemachin
        },
          {
            type: '重量',
            value: that.data.tableKg
          }]
      }
    })
    that.setData({
      tableid: '',
      num: 1,
      tablenorms: '',
      tabletype: '',
      tablemachin: '',
      tableKg: '',
      bigid2: '',
      shopIndex:-1
    })
    if (res.data.msg == "没有相关规格") {
      wx.showToast({
        title: "请选择相关规格",
        icon:'none',
        duration:3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }

  },
  // clickgui(e){   //选择规格
  //   var that = this
  //   let index = e.currentTarget.dataset.index
  //   let indexName = e.currentTarget.dataset.indexname
  //   let arr = that.data.shopSpecifications[index].value[indexName]
  //   console.log(arr)
  //   console.log(e.currentTarget.dataset.index)
  //   console.log(e.currentTarget.dataset.indexname)
  //   arr.isState = true
  //   that.setData({
  //     arr
  //   })
  //   console.log(that.data.shopSpecifications)
  //   // for (let i = 1; i < shopSpecifications.length;i++){

  //   // }
  // },
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
  open(e){
      var that = this
      console.log(e)
      that.setData({
        shopIndex:e.currentTarget.dataset.index,
        shopSpecifications: e.currentTarget.dataset.item,
        shopId: e.currentTarget.dataset.id
      })
      console.log(that.data.shopSpecifications)
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
          number:that.data.number + 1
        })
    that.getSearchResult(that.data.number)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})