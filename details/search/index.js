import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例
const app = getApp()

// details/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zymspec:"",
    showsearch:true,
    showModalStatus2: false, //遮罩的显示与隐藏
    showDialog: false,
    jgNumber: false,
    inputBz: "",
    showModalStatus: false, //遮罩的显示与隐藏
    value:'',   //用户输入的值
    hotSearch:'',   //热门搜索
    meSearch:'',    //个人搜索历史
    where:'',   //从哪里来  
    historicalRecord:true,    //搜索商品就显示历史记录，菜品就不显示
    searchList:[],
    shopid:"",
    detailList:[],
    tableid:[],
    shopPrice:"",
    imgurl:"",
    shopName:"",
    selectedNumber: 0,
    num:1,//商品数量
    showbtn:false,
    title:"",
    spec:"",
    num2:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getHotSearch()
    that.getMeSearch()
    // that.getSpecDetail()
    //console.log(options.where)
    if (options.where == 'food' && options.where == 'cook'){
      that.setData({
        historicalRecord:false
      })
    }
    that.setData({
      where:options.where
    })
  },

  hideBuyModal2() {

    // this.changeState()
    // 隐藏遮罩层
    this.setData({
      title:"",num2:"",spec:""
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
        showModalStatus2: false
      })

    }.bind(this), 200)
  },
    // 遮罩层显示
  showModal2() {
    // ////////console.log("点击了订单")
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus2: true
    })
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      })
    }, 200)
  },
  inputname(e){
    let value = e.detail.value;
 
    this.setData({
      title:value
    })
  },
  inputnum(e){
    let value = e.detail.value;

    this.setData({
      num2:value
    })
  },
  inputspec(e){
    let value = e.detail.value;
      this.setData({
        spec:value
      })
  },
  async queren(){

    let that = this


    if(this.data.title == ""){
      wx.showToast({
        title: '请输入商品名字',
        icon:'none'
      })
    }else if(this.data.num2 == ""){
      wx.showToast({
        title: '请输入商品数量',
        icon:'none'
      })
    }else{

      let params = {
        title:this.data.title,
        spec:this.data.spec
        
      }

      console.log(params,"params")
  
        let res = await ajax({
          url: '/api/goods/addgoods',
          method: 'post',
          data:params
        })
        console.log(res)
          //console.log("购买数量",that.data.num)
        if(res.data.code == 0){
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
          console.log(res2)
  
          if (res2.data.code == 0) {
            wx.showToast({
              title: "加入购物车成功",
              icon: 'none',
              duration: 3000
            })
            that.hideBuyModal2()
           
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
            that.hideBuyModal2()
          }
  
        }
    }


    

   

  },
  modalInput(e) {
    // ////////console.log(e.detail.value)
    this.setData({
      inputBz: e.detail.value
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  async determine() { //加入酒店购物车
    var that = this;
    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    } 

    if(this.data.zymspec.length == 1){
      if(this.data.zymspec[0].type.indexOf('加工') == 0){
      wx.showToast({
        title: '不能单选加工项,请重新选择',
        icon:"none"
      })
      return 
    }
    }

    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })
    let hotelInfo = res.data.data

    if(hotelInfo == null){
      wx.showToast({
        title: '请先添加酒店',
        icon:"none"
      })
      return 
    }
  

    if(that.data.jgNumber === true && that.data.selectedNumber === ""){
      wx.showToast({
        title: '请选择商品',
        icon:"none"
      })
    }else{
      that.commodity();
      that.hideBuyModal()
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
    console.log("购买数量",this.data.num)
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: {
        is_purchase: 1,
        goods_id: that.data.shopid,
        stock: that.data.num,
        spec: spex,
        goods_mark: that.data.inputBz
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
    //console.log(res.data)
    if (res.data.code == 0) {
      wx.showToast({
        title: "加入购物车成功",
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
    // if (res.data.msg == "没有相关规格") {
    //   wx.showToast({
    //     title: "请选择相关规格",
    //   })
    // } else {

    // }
    ////////console.log(res)

  },
  clickselet: function () { //个人采购加入购物车

    var that = this;

    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
    }

    if(that.data.jgNumber === true && that.data.selectedNumber === ""){
      wx.showToast({
        title: '请选择商品',
        icon:"none"
      })
    }else{
      that.clickseleted();
      this.hideBuyModal()
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
      goods_id: that.data.shopid, //商品id
      stock: that.data.num, //商品数量  
      // 商品规格
      spec: spex,
      goods_mark: that.data.inputBz
    }
    let res = await ajax({
      url: 'api/cart/save',
      method: 'POST',
      data: params
    })
    //console.log("params",params)
    
    that.setData({
      tableid: '',
      num: 1,
      tablenorms: '',
      tabletype: '',
      tablemachin: '',
      tableKg: '',
      bigid2: ''
    })
    //////console.log(res)

    // if(res.data.code == 0){
       wx.showToast({
        title: "加入成功",
        icon: 'none',
        duration: 3000
      })
 
    // }

    if (res.data.msg == "商品规格不存在") {
      wx.showToast({
        title: "请选择相关规格",
        icon: 'none',
        duration: 3000
      })
    } 

  },
  clickcancel: function () { //返回按钮

    this.hideBuyModal()
  },
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
    console.log(e.detail.value)
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },

  showModal() {
 
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
  clickgui: function (e) {
    var that = this;
    let tableId = that.data.tableid

    for (var i = 0; i < tableId.length; i++) {

      if (tableId[i].title == e.currentTarget.dataset.indx) {
        if (tableId[i].value[e.currentTarget.dataset.index] == true) {
          tableId[i].value[e.currentTarget.dataset.index] = false

          that.setData({
         shopPrice: 0
      })

          // ////////console.log(tableId[i].title.indexOf("加工"))
          if (tableId[i].title.indexOf("加工") == 0) {
            that.setData({
              jgNumber: false
            })
          }
          if (tableId[i].title.indexOf("净体") == 0) {
            that.data.selectedNumber = ""
            that.setData({
              selectedNumber: ""
            })
          } else if (tableId[i].title.indexOf("活体") == 0) {
            that.setData({
              selectedNumber: ""
            })
          }

        } else {
          for (let j in tableId[i].value) {

            tableId[i].value[j] = false
            tableId[i].value[e.currentTarget.dataset.index] = true


            if (tableId[i].title.indexOf("加工") == 0) {
              that.setData({
                jgNumber: true
              })
            }



            if ((tableId[i].title.indexOf("净体") == 0 || tableId[i].title.indexOf("活体") == 0) && tableId.length > 2) {


              if (tableId[i].title.indexOf("净体") == 0) {
                that.data.selectedNumber = 0
              } else if (tableId[i].title.indexOf("活体") == 0) {
                that.data.selectedNumber = 1
              }

              if (tableId[0].value[j]) {
                for (let z in tableId[1].value) {
                  tableId[1].value[z] = false
                  tableId[i].value[e.currentTarget.dataset.index] = true
                }

              }
              if (tableId[1].value[j]) {
                for (let z in tableId[0].value) {
                  tableId[0].value[z] = false
                  tableId[i].value[e.currentTarget.dataset.index] = true
                }
              }
            }


          }
        }

      }
    }
    that.setData({
      tableid: tableId
    })
    that.getShopPrice()

  },
  clickse: function (e) {
    //console.log(e)
    this.showModal()
    let that = this
    let id = e.currentTarget.dataset.id
    let tab = e.currentTarget.dataset.item.spec_base
    console.log("tab",tab)

    let arr = []

    tab.forEach((item)=>{
    
      if(item.title.indexOf("加工") == 0){
        arr.push(item)
      }else{
        arr.unshift(item)
      }
    })

    console.log("arr",arr)

    let tabCopy = JSON.parse(JSON.stringify(arr))
    for (var i = 0; i < tabCopy.length; i++) {
      tabCopy[i].value = {}
    }
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].value.length; j++) {
        if (i == 0 && j == 0) {
          tabCopy[i].value[arr[i].value[j]] = true
        } else {
          tabCopy[i].value[arr[i].value[j]] = false
        }
      }
    }
      console.log("tabCopy",tabCopy)
    let oldarr = []

    tabCopy.forEach((item)=>{
    
      if(item.title.indexOf("加工") == 0){
        oldarr.push(item)
      }else{
        oldarr.unshift(item)
      }
    })
    
    //console.log("tabCopy",tabCopy)
    that.setData({
      tableid: oldarr,
 
    })

   

    this.setData({
      shopid:id,detailList: tabCopy
    })
    this.getShopPrice()
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
  async  getHotSearch(){    //获取热门搜索
      var that = this
      let res = await ajax({
        url: '/api/search/getKeyWords'
      })
      that.setData({
        hotSearch:res.data.data
      })
      //console.log(that.data.hotSearch)
    },
  async  getMeSearch() {    //获取个人搜索历史
    var that = this
    let res = await ajax({
      url: 'api/search/getHistory'
    })
    that.setData({
      meSearch: res.data.data
    })
  },
  searchPage(e){
    var that = this
     that.setData({
       value:e.currentTarget.dataset.text
     })
     //console.log(that.data.value)
    that.toSearchResult()
  },
  int(e){   //获取用户输入的搜索值
    var that = this
    that.setData({
      value:e.detail.value
    })


    that.searchResult()

    if(e.detail.value == ""){
      this.setData({
        searchList:[]
      })
    }

    
  },
  clearseach(){
    
    this.setData({
      value:"",
      searchList:[],
      showsearch:!this.data.showsearch
    })
  },
  async searchResult(){   
    let that = this


    if (app.globalData.token == '') {
      wx.navigateTo({
        url: "/component/zation/index"
      })
      return 
    }

    let parmes = {
      keywords:that.data.value,
    }


    //console.log(parmes)
    if(parmes.keywords != ''){
    
      let res = await ajax({ url: 'api/index/searchgoods', method: 'post', data:parmes})
     
   

 
      if(res.data.code == 0){
    
        if(res.data.data.length != 0){
          this.setData({
            searchList:res.data.data, showbtn:false,showsearch:!this.data.showsearch
          })
        }else{
          this.setData({
            showbtn:true,
            searchList:[],
            showsearch:!this.data.showsearch
          })
        }
      }else{
      
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
  
  
    }
   

     
    //console.log("搜索结果",res.data)

  },
  qc(){
    this.setData({
      value:'',
      searchList:[]
    })
  },
  async getShopPrice() {

    var that = this
    let tableid = that.data.tableid
    let spec = []
    for (var i = 0; i < tableid.length; i++) {
      let obj = {}
      for (let j in tableid[i].value) {
        if (tableid[i].value[j] == true) {

          obj.type = tableid[i].title
          obj.value = j
          spec.unshift(obj)
        }
      }
    }

    let zymarr = []
    spec.forEach((item)=>{
      if(item.type.indexOf("加工") == 0){
        zymarr.push(item)
      }else{
       
        zymarr.unshift(item)
      }
    })


    let params = {
      id: that.data.shopid,
      spec:zymarr
    }
    this.setData({
      zymspec:zymarr
    })
    //console.log("params",params)
    let res = await ajax({
      url: '/api/goods/SpecDetail',
      method: 'POST',
      data: params
    })

    //console.log("SpecDetail",res.data.data)
    if (res.data.code == 0) {
    
      let price = res.data.data.price
      let imgurl = 'http://second.chchgg.com'+res.data.data.goods.images
      let shopName = res.data.data.goods.title
      //console.log(res.data.data)

      that.setData({
        shopPrice: price,
        imgurl,shopName
      })
    } else {
      // wx.showToast({
      //   title: res.data.msg,
      //   icon: 'none',
      //   duration: 3000
      // })
    }
  },
 
})