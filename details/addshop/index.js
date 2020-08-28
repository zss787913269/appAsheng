import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    selectArray: [{
      "id": "0",
      "name": "暂无数据"
    }],
    selectArrayIndex:"",
    twoSelectArray:[{
      "id": "0",
      "name": "请先选择类型" 
    }],
    attribute:[],   //商品属性
    twoClassification:'请先选择',
    condition:false,
    threeClassification:'商品类型',
    shopCompany:'',   //商品单位
    one: '',    //一级分类id
    twoId: '',    //二级分类id
    threeId:'',    //三级分类id
    spec_id:'',   //属性id
    price:{},    //商品价格
    shopId:'',    //商品id，当编辑的时候能用上
    quotationLine:'',   //报价行
    exhibition:'',   //展示行
    exhibitionNum:1,
    arr:[],   //用户输入的展示词
    quotationLineCopy:'',
    obj:{},
    specificationsNum:'',    //用户选择了规格属性下的
    numTwo:'',
    sHOPNAME:'',
    showSelectArray:false,
    listData:{},//装获取数据的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // that.text()
    getApp().setWatcher(that.data, {
      numTwo:function(){
        that.setData({
          obj:{}
        })
      }
    }); // 设置监听器
    this.setData({
      specificationsNum:''
    })
    that.getOneCategory()
    if(options.id != undefined){
      let optionsData=wx.getStorageSync('shopInfo');
      //console.log(optionsData);
      that.setData({
        listData:optionsData,
        shopName:options.name,
        shopId:options.id
      })
    }
  },

  bindPickerChange: function(e) {
   
    let index = e.detail.value   // 获取点击的下拉列表的下标
    let id = this.data.selectArray[index].id
    this.setData({
      selectArrayIndex: index,
      one:id,
      showSelectArray: !this.data.showSelectArray
    });
    this.getTwoCategory(this.data.one)
  
  },
  optionTap(e){
    //console.log(e);
      let index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
        selectArrayIndex: index,
        one:e.currentTarget.dataset.id,
        showSelectArray: !this.data.showSelectArray
      });
      this.getTwoCategory(this.data.one)
  },
  selectClick(){    //显示下拉框
    this.setData({
      showSelectArray:true
    })
  },
  async  getOneCategory(){    //获取一级分类
      var that = this
      let res = await ajax({
        url: 'api/store/getOneCategory',
        method: 'get',
      })
      if(res.data.code == 0){
        //console.log(res)
        that.setData({
          selectArray: res.data.data,
          // oneSpecId:res.data.data[0].spec_id
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          duration:3000
        })
      }
    },
  open(){   //  打开选择二级  三级分类
    this.setData({
      condition: !this.data.condition
    })
  },
  submit(){   //提交
      var that = this
      //console.log(that.data.shopId)
      if(that.data.shopId != ''){
        that.setAddCommodity(that.data.shopId)
      }else{
        that.setAddCommodity()
      }
  },
  intChang(e){
      //console.log(e)
      this.setData({
        shopCompany:e.detail.value
      })
  },
  sendPrice(e){    //获取价格输入框的内容
  var that = this
    let index = e.currentTarget.dataset.index   //
    let item = e.currentTarget.dataset.item
    let value = e.detail.value
    let idx = e.currentTarget.dataset.idx
    let quotationLineCopy = that.data.quotationLine
    let quotationLineCopySall = that.data.quotationLineCopy
    let obj = that.data.obj
    //console.log(idx)
    for (let k in that.data.quotationLine){
      if (k == that.data.specificationsNum){
        for (let j in that.data.quotationLine[k]) {
          if (j == that.data.numTwo){
            for (let i in that.data.quotationLine[k][j]) {
              for (let g in that.data.quotationLine[k][j][i]){
               if(idx == g){
                 //console.log(g)
                 quotationLineCopy[k][j][i][g] = value 
                 quotationLineCopySall[k][j] = that.data.obj
                 //console.log(quotationLineCopySall[k][j])
                 quotationLineCopySall[k][j][g] = value
                    that.setData({
                      shopPrice: quotationLineCopySall
                  })
               }
              }
              
         
            }
          }
          
        }
      }
    }
    that.setData({
      quotationLine: quotationLineCopy
    })
   
  },

  async setAddCommodity(id){
    //console.log(id)
      var that = this
    let shopPrice = that.data.shopPrice
    if (shopPrice == undefined){
      wx.showToast({
        title:'请至少选择一种属性',
        icon:'none',
        duration:3000
      })
      return
    }
      for(var i in that.data.quotationLine){
          for (var j in that.data.quotationLine[i]){
            if (that.data.shopPrice[i][j] == ''){
              delete shopPrice[i][j]
            }
          }
      }
    //console.log(shopPrice)
   
      let params = {
        title: that.data.threeClassification,
        one:that.data.one,
        two:that.data.twoId,
        category_id: that.data.threeId,
        spec_id: that.data.spec_id,
        price: shopPrice,
        show_name: that.data.exhibition,
        inventory_unit:that.data.shopCompany
      }
      console.log("params",params);
      if(id != undefined){
        params.id = id
      }
      //console.log(params)
    let res = await ajax({
      url: 'api/store/goodsAdd',
      method: 'POST',
      data: params
    })
    if(res.data.code == 0){
      wx.showToast({
        title: '提交成功',
        icon:'none',
        duration:3000
      })
      // zym
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        duration:3000
      })
    }
    //console.log(res)
  },
  getDate: function (e) { //获取下拉选择的内容   用户选择的类型
    var that = this
    //console.log('下拉获取',e);
    that.getTwoCategory(e.detail.id)
    that.setData({
      one: e.detail.id,
      oneSpecId: e.detail.specId
    })
  },
  async getTwoCategory(id){    //获取二级分类和绑定的属性分类
    var that = this
    let params = {
      id
    }
    //console.log(params)
    let res = await ajax({
      url: 'api/store/getTwoCategoryAndSpec',
      method: 'POST',
      data:params
    })
    //console.log('id',res)
    if(res.data.code == 0){
        
      // console.log("获取二级分类和绑定的属性分类",res.data.data)
      that.setData({
        provinces: res.data.data,
        spec_id: res.data.data[0].spec_id,
        citys: res.data.data[0].three,
        twoClassification: res.data.data[0].name,
        threeClassification:res.data.data[0].three[0].name,
        twoId: res.data.data[0].id,
        threeId: res.data.data[0].three[0].id,
        attribute: res.data.data[0].items,
        shipId: res.data.data[0].three[0].spec_id
      })
    }
 
    if (that.data.shipId != 0 && that.data.shipId != null){
      that.getAttribute(that.data.shipId)
    } else{
      if (that.data.spec_id != 0 && that.data.spec_id != null){
        that.getAttribute(that.data.spec_id)
      }else{
        if (that.data.oneSpecId != 0 && that.data.oneSpecId != null){
          that.getAttribute(that.data.oneSpecId)
        }else{
          wx.showToast({
            title:'当前属性没有绑定',
            icon:'none',
            duration:3000
          })
        }
      }
    }
    
  },
  bindChange(e){   //选择二，三级类别
  //console.log(e)
    var that = this
    var val = e.detail.value
    let index = val[0]
    let idx = val[1]
    // console.log(val)
    console.log("spec_id",that.data.provinces[index].three[idx])
    console.log("spec_id",that.data.provinces[index].three[idx].spec_id)
   
    that.setData({
      spec_id: that.data.provinces[index].three[idx].spec_id,
      citys:that.data.provinces[index].three,
      twoClassification: that.data.provinces[index].name,
      threeClassification: that.data.provinces[index].three[idx].name,
      twoId: that.data.provinces[index].id,
      threeId: that.data.provinces[index].three[idx].id,
      attribute: that.data.provinces[index].items,
      shipId: that.data.provinces[index].three[idx].spec_id
    })
    // console.log("spec_id",that.data.provinces)
    if (that.data.shipId != 0 && that.data.shipId != null) {
      that.getAttribute(that.data.shipId)
    } else {
      if (that.data.spec_id != 0 && that.data.spec_id != null) {
        that.getAttribute(that.data.spec_id)
      } else {
        if (that.data.oneSpecId != 0 && that.data.oneSpecId != null) {
          that.getAttribute(that.data.oneSpecId)
        } else {
          wx.showToast({
            title: '当前属性没有绑定',
            icon: 'none',
            duration:3000
          })
        }
      }
    }
    // that.getAttribute(that.data.shipId)
  },
  async getAttribute(id){
    var that = this
    //console.log(id)
    let params = {
      id
    }
    let res = await ajax({
      url: 'api/store/getSpec',
      method: 'POST',
      data: params
    })
  
    if(res.data.code == 0){
      if(res.data.data == ''){
        wx.showToast({
          title:res.data.msg,
          icon:'none',
          duration:3000
        })
        return
      }
      // console.log("getSpec",res.data.data)
      let quotationLineCopy = JSON.parse(JSON.stringify(res.data.data.spec))
      for (let i in quotationLineCopy){
        for (let j in quotationLineCopy[i]){
          for (let g in quotationLineCopy[i][j]){
            for (let k in quotationLineCopy[i][j][g]) {
            }
          }
         
          quotationLineCopy[i][j] = ''
         
        }
      }
      that.setData({
        quotationLine: res.data.data.spec,    //报价行
        exhibition: res.data.data.show,   //展示行
        quotationLineCopy
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        duration:3000
      })
    }
  },
  toQuot(e){   //用户点击了规格
  //console.log(e)
    this.setData({
      specificationsNum:e.currentTarget.dataset.index
    })
  },
  toQuotTwo(e){  //用户点击了规格的下级
      this.setData({
        numTwo:e.currentTarget.dataset.index,
        sHOPNAME:''
      })
      // //console.log(this.data.sHOPNAME)
      
  },
  intExhibition(e){   //获取展示行
    let index = e.currentTarget.dataset.index
    let exhibition = this.data.exhibition
      exhibition[index] = e.detail.value
  },
 
 
})