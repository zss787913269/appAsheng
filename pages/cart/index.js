//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    classfiySelect:"",
    listindex: 1,
    tableList: [],
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    text: "nihao",
    checkedAll: true,
    checkedAll2:true,
    totalPrice: 0,
    totelid: [],
    currentTab: 1,
    type:1,
    hisList:[],
    hisTotalPrice:'',
    ids:[]
  },

  onLoad: function (options) {
    this.getlist(1)
    this.getlist(2)
    this.getFirstList()
 

  },
  onShow: function () {
    this.getlist(this.data.currentTab)
  },
  //点击切换列表
  clickList(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      listindex: index
    })

  },
  // 全选
  allChecked(){
  
    let that = this
    let list = this.data.tableList
    let ids = []

    for(let i of list){
      i.isSelected = !i.isSelected

      if(this.data.checkedAll == false){
        i.isSelected = true
      }
      
      if(i.isSelected == true){
        ids.push(i.id)
      }
    }
    // 点击全选的时候 把所有的id获取

    let num = 0

    if(this.data.checkedAll == true){
      that.setData({
        totalPrice: 0
      })
    }else{

      console.log("checkedAll=true")
      if (ids <= 0) {
        that.setData({
          totalPrice: 0
        })
      } else {

        console.log("ids大于0",ids)
     
        for (let i = 0; i < that.data.tableList.length; i++) {

        
          for (let j = 0; j <= ids.length; j++) {
      
            if (ids[j] == that.data.tableList[i].id) {
              // console.log(that.data.tableList[i].stock * that.data.tableList[i].price)
         
              num += that.data.tableList[i].stock * that.data.tableList[i].price;
              that.setData({
                totalPrice: num.toFixed(2)
              })
            }
          }
        }
      }
      
    }
   
    this.setData({
      checkedAll:!that.data.checkedAll,
      tableList:list,
      ids
    })
 
   

  },
  checkboxChange: function (e) {
    var that = this

    let list = this.data.tableList
    let checkedAll

  
    
    // for(let i of this.data.tableList){
    //   if(i.isSelected == true){
    //     checkedAll = true
    //   }
    // }

    that.setData({
      ids: e.detail.value,
      
    })

    console.log("ids",this.data.ids.length)
    console.log("value",e.detail.value.length)

    if(this.data.ids.length != this.data.tableList.length){
      checkedAll = false
    }else {
      checkedAll = true
    }
    this.setData({
      checkedAll
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
              totalPrice: num.toFixed(2)
            })
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
  // 获取快速下单数据
  async getCartHisOrder() {

    let res = await ajax({
      url: 'api/cart/cartHisOrder',
      method: "POST",

    })
    this.setData({
      hisList:res.data
    })
 

  },
  async deleteAll(){

    let that = this

    wx.showModal({
      title: '提示',
      content: '是否清空购物车',
      async success (res) {
        if (res.confirm) {
          let res = await ajax({
            url: 'api/cart/DeleteAll',
            method: 'POST'
          })

          console.log(res.data)
      
          if(res.data.code == 0){
            that.getlist(1)
            that.getlist(2)
            wx.showToast({
              title: '清空成功',
              icon:"none"
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   

  },



  // 获取首次进入购物车的数据
  async getFirstList() {
    let that = this

    let params = { //酒店购物车需要传参
      is_purchase: 1
    }

    let res = await ajax({
      url: 'api/cart/index',
      method: 'POST',
      data: params
    })
    let list = res.data.data.data
    let ids  = []

    for(let i of list){
      i.isSelected = true
      ids.push(i.id)
    }
    if (res.data.data.data.length == 0) {
      // 个人订单
      let res2 = await ajax({
        url: 'api/cart/index',
        method: 'POST',
      })
      let list = res2.data.data.data
      let id  = []

      for(let i of list){
        i.isSelected = true
        id.push(i.id)
      }
      // console.log("个人订单",res2.data.data.data)
      that.setData({
        currentTab: 2,
        tableList: res2.data.data.data,
        ids:id
      })
    } else {
      that.setData({
        hotelList: res.data.data.data,ids
      })
    }

    this.getTotalPrice()
  },

  async getlist(index) {
    let that = this
    let params = { //酒店购物车需要传参
      is_purchase: 1
    }
    if (index == 1) {
      let res = await ajax({
        url: 'api/cart/index',
        method: 'POST',
        data: params
      })

      // console.log("公司订单",res.data.data.data)

      let list = res.data.data.data
      let ids  = []

      for(let i of list){
        i.isSelected = true
        ids.push(i.id)
      }

      that.setData({
        tableList: res.data.data.data,
        hotelList: res.data.data.data,
        ids,
        
      })
    
      // console.log(res)
    } else if (index == 2) {
      let res = await ajax({
        url: 'api/cart/index',
        method: 'POST',
      })
      // console.log("个人订单", res.data.data.data)
      let list = res.data.data.data
      let ids  = []

      for(let i of list){
        i.isSelected = true
        ids.push(i.id)
      }

      that.setData({
        tableList: res.data.data.data,
        personList: res.data.data.data,ids
      })

      // console.log(res) 
    }
    that.getTotalPrice()
    that.getHisTotalPrice()

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
      async success (res) {
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
          that.getlist(that.data.currentTab)
        } else if (res.cancel) {
         
        }
      }
    })
  

  
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
    this.getHisTotalPrice()
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
    this.getHisTotalPrice()
  },

  // 计算购物车商品价格
  getTotalPrice(e) {
    let tableList = this.data.tableList;
    let sum = 0;
    for (let i = 0; i < tableList.length; i++) {
      sum += tableList[i].stock * tableList[i].price;
      tableList[i].single = (tableList[i].stock * tableList[i].price).toFixed(2);
    }
    this.setData({
      totalPrice: sum.toFixed(2),
      tableList: tableList
    })
  },
  
  // 计算历史商品价格
  getHisTotalPrice(e) {
    let hisList = this.data.hisList;
    let sum = 0;
    for (let i = 0; i < hisList.length; i++) {

      sum += hisList[i].buy_number * hisList[i].price;
      // tableList[i].single = (tableList[i].buy_number * tableList[i].price).toFixed(2);
    }
    this.setData({
      hisTotalPrice: sum.toFixed(2)
    })
  },


 


  clickTab: function (e) { //点击切换
    var that = this;

    console.log(e)

    if (e.currentTarget.dataset.current == 1) {
      that.getlist(1)
    } else if (e.currentTarget.dataset.current == 2) {
      that.getlist(2)
    }
    that.setData({
      currentTab: e.currentTarget.dataset.current
    })
    console.log(that.data.currentTab);
    // }
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