import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广西壮族自治区', '南宁市', '西乡塘区'],
    shopName: '', //店铺名称
    account: '', //帐期
    category: [{
      "id": "0",
      "name": "暂无数据"
    }], //
    code: '', //验证码
    address: '', //地址
    tel: '', //联系方式
    market: [{
      "id": "0",
      "name": "暂无数据"
    }],
    condition: false, //选择地址界面开关
    value: [0, 0, 0],
    cityids: 0,
    provinces: [],
    citys: [],
    countys: [],
    provinceid:'',   //省
    tel2:'',   
    classMarket:null,    //类别id
    foodMarket:null,   //菜市场id
    foodMarketNum:null,//菜市场选择器ID
    classMarketNum:null,//类别选择ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.getFoodMarket()
 
    //表单验证规则
    this.WxValidate = app.wxValidate({
      shopName: {
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      tel: {
        required: true,
        tel: true,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
      code: {
        required: true,
      },
      account: {
        required: true,
        max:365,
      },
    }, {
      shopName: {
        required: '您填写的店铺名称错误',
      },
      tel: {
        required: '您填写的联系方式错误',
      },
      address: {
        required: '请输入地址',
      },
        code: {
        required: '请输入验证码',
      },
        account: {
        required: '请输入正确的帐期',
      },
    })
  },
  //获取已有的信息
  async getExistingData(){
    let res = await ajax({
      url: 'api/user/storeInfo',
      method: 'get',
    })
    if(res.data.code!==-1){
      let allData=res.data.data;
      let city=allData.region.split(",");
      this.getCity(city[0]);
      this.getCounty(city[1]);
      let province_name="",city_name="",county_name="";
      this.data.provinces.forEach(item=>{
        if(city[0]===item.id){
          province_name=item.name;
        }
      })
      this.data.citys.forEach(item=>{
        if(city[1]===item.id){
          city_name=item.name;
        }
      })
      this.data.countys.forEach(item=>{
        if(city[2]===item.id){
          county_name=item.name;
        }
      })
      let market_num=null;
      this.data.market.forEach((item,index)=>{
        if(item.id===allData.market_id){
          market_num=index;
        }
      })
      let class_num=null;
      this.data.category.forEach((item,index)=>{
        if(item.id===allData.brand_category_id){
          class_num=index;
        }
      })
      this.setData({
        shopName:allData.name,
        account:allData.number,
        address:allData.address,
        tel:allData.tel,
        foodMarket:allData.market_id,
        classMarket:allData.brand_category_id,
        foodMarketNum:market_num,
        classMarketNum:class_num,
        provinceid:city[0],
        citysid:city[1],
        countysid:city[2],
        province:province_name,
        city:city_name,
        county:county_name
      })
    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  getInputValue(e) {   //获取手机号
    var that = this
    that.setData({
      tel2: e.detail.value
    })
  },
  sendCode() {   //发送短信验证码
    var that = this
    that.sendCode2()
    console.log(that.data.tel2)
  },
  async sendCode2() {
    var that = this
    let params = {
      tel: that.data.tel2,
      type: 'store'
    }
    let res = await ajax({
      url: 'api/Quickorder/sendSMS',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '发送成功',
        icon: 'none',
        duration:3000
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration:3000
      })
    }
  },
  
  async getFoodMarket() { //获取菜市场
    var that = this
    let res = await ajax({
      url: 'api/user/getmarketandcategory',
      method: 'get',
    })
    if(res.data.code == 0){
      that.setData({
        market: res.data.data.market,
        category: res.data.data.category
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
   
    console.log(res)
  },
  changeMarket(e){//用户选择菜市场
    let valueNum=Number(e.detail.value)
    let market_id=this.data.market[valueNum].id;
    this.setData({
      foodMarket:market_id,
      foodMarketNum:valueNum
    })
  },
  changeClass(e){//用户选择类别
    let valueNum=Number(e.detail.value)
    let market_id=this.data.category[valueNum].id;
    console.log("market_id",market_id)
    this.setData({
      classMarket:market_id,
      classMarketNum:valueNum
    })
  },
  getDate: function(e) { //获取用户选择的菜市场
    this.setData({
      foodMarket:e.detail.id,
    })
    // console.log(this.data.foodMarket)
  },
  getDatecategory(e) { //获取用户选择的类别
    this.setData({
      classMarket: e.detail.id
    })
    console.log(this.data.classMarket)
  },
  submit(e) {
    var that = this
    var formData = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg}`,
        duration:3000,
        icon: 'none',
      })
    } else {
      var shopName = formData.shopName;
      var tel = formData.tel;
      var code = formData.code;
      var address = formData.address;
      var account = formData.account;
      var params = {
        name: shopName,
        number:account,
        code: code,
        address: address,
        tel: tel,
        market_id: that.data.foodMarket,
        category_id: that.data.classMarket,
        region: `${that.data.region}`   //省市区id
      };
      console.log(params)
      if (that.data.foodMarket == null) {
        wx.showToast({
          title: `请选择菜市场`,
          duration:3000,
          icon: 'none',
        })
        return
      }
      if (that.data.classMarket == null) {
        wx.showToast({
          title: `请选择类别`,
          duration: 3000,
          icon: 'none',
        })
        return
      }
      that.getSubmit(params)
    }

  },
  async getSubmit(e) {
    
    let res = await ajax({
      url: 'api/user/storeadd',
      method: 'POST',
      data:e
    })
    console.log(res)
    if(res.data.code != 0){
      wx.showToast({
        title:res.data.msg,
        icon: 'none',
        duration: 3000
      })
      
    }else{
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 3000
      })
      setTimeout(function () {
        wx.navigateBack({

        })
      }, 2000)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})