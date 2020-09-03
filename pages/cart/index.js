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
    listindex:"",
    hisList: [],
    hisTotalPrice: '',
    ids: [],
    showqx: false,
    leftList: [],
    hotelCount: "",
    pcount: ""
  },

  onLoad: function (options) {

    this.getTopCount()


  },
  onShow: function () {
    this.getCount()
  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.current
    console.log(index)
    this.setData({
      currentTab: index
    })
   this.getCount()

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
    console.log(hotelCount,pcount)

    if(hotelCount == undefined){
      that.setData({
        currentTab:0
      })
    
    }else if(pcount == undefined){
      that.setData({
        currentTab:1
      })
    
    }

    that.getCount()
   
    this.setData({
      hotelCount,
      pcount
    })
    // console.log(hotelCount,pcount)
  },
  async getCount() {
    let that = this

    // console.log(e)
    // if (e == undefined) {
    //   e = that.data.currentTab
    // }
    let params = {
      is_purchase: that.data.currentTab
    }
    let res = await ajax({
      url: "api/cart/categorygoodscount",
      method: "post",
      data: params
    })

    console.log(res.data.data)

    if (res.data.data.length == 0) {
      wx.showToast({
        title: '购物车没有商品',
        icon: "none"
      })
      that.setData({
        showqx: false,
        leftList:[]
      })
    } else {
      let list = res.data.data

      let ids = []
      let data

      for (let i of list) {
        // console.log(i)
        for (let j of i.goods) {
          j.isSelected = true,
            ids.push(j.id)
          j.spec = JSON.parse(j.spec)

        }
      }
      console.log(ids)

      that.setData({
        leftList: list,
        showqx: true,
        ids
      })
    }
    this.getTotalPrice()


    // console.log("getCount",res.data.data)

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
     let  num = 0
      for (let i of list) {
        for (let j of i.goods) {
          for(let k of e.detail.value){
            if(j.id == k){
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


    for(let i of list){
      for(let j of i.goods){
        if(j.id == item){
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
    for(let i of list){
      for(let j of i.goods){
        tableList.push(j)
        if(j.id == item){
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
        if(j.isSelected == true){
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

    console.log(e)

    if (e.currentTarget.dataset.current == 1) {
      that.getCount(1)
    } else if (e.currentTarget.dataset.current == 2) {
      that.getCount(0)
    }
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })

  },
  submit: function () { //提交订单
    var that = this
    var item = that.data.ids
    var ids = item.toString()

    if (that.data.currentTab == 2) { //个人订单提交订单
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
    console.log(res)
  },

  //111111111111


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