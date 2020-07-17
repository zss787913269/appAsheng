import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city: '成都',
    isHidden: true,
    currentTab: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    disNameList: [], //菜品列表
    cookList:[],   //私厨列表
    num:1,   //分页
    type:'',    //搜索类型
    inpNmae:'请输入食材或者菜名',
    value:'',    //用户输入的值
    multiArray:[], //存时间
    multiIndex: [],   //表示选择了 range 中的第几个（下标从 0 开始）
    startDate:'',
    cookNumber:''
  },
  goDetail(e){
    console.log(e);
  },
  toSearch(){
      var that = this
    if (that.data.currentTab == 1){
      that.getSearchResultFood()
    } else if (that.data.currentTab == 2){
      that.getCook()
    }
  },
  toFoodPublish(){
    wx.navigateTo({
      url: '/details/dishes/index',
    })
  },
  pickerTap: function () {    //时间选择器
    var date = new Date();

    var monthDay = [];
    var hours = [];
    var minute = [];
    var currentHours = date.getHours();
    var currentMinute = date.getMinutes();
    // 月-日
    for (var i = 0; i <= 30; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
      monthDay.push(md+'日');
    }

    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }
    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i + '时');
      }

      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i + '分');
      }

    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i + '时');
      }

      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i + '分');
      }
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },
  bindMultiPickerColumnChange: function (e) {

    var date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    var currentHours = date.getHours();
    var currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
    console.log(that.data.multiArray)
  },

  loadData: function (hours, currentMinute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = hours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        currentMinute.push(i);
      }
    } else {
      // 时
      for (var i = hours; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        currentMinute.push(i);
      }
    }
  },

  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i + '时');
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },

  loadMinute: function (hours, currentMinute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = hours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
    } else {
      // 时
      for (var i = hours; i < 24; i++) {
        hours.push(i + '时');
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      currentMinute.push(i);
    }
  },
  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    if (monthDay === "今天") {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      var month = monthDay.split("-")[0]; // 返回月
      var day = monthDay.split("-")[1]; // 返回日
      monthDay = month + "月" + day + "日";
    }

    var startDate = monthDay + " " + hours + ":" + minute;
    that.setData({
      startDate: startDate
    })
  },
  onLoad: function (options) {
    var that = this
    that.pickerTap()
    that.setData({
      value: options.value
    })
    if (options.index != undefined) {
      that.setData({
        currentTab: options.index
      })
     
    }
    console.log(options.value, options.where)
    if (options.where == 'index') {   //说明是从首页跳转过来的
      that.getSearchResultFood(that.data.num)
    } else {
      that.getDishName(that.data.num)
    }
    if(options.where == 'cook'){    //从菜品详情页来的
    that.setData({
      currentTab:2
    })
      that.getCookS(options.userId)
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  async getCook() {    //厨师搜索
    var that = this
    let parmes = {
      name: that.data.value,
    }
    let res = await ajax({ url: '/api/dishes/CookSearch', method: 'post', data: parmes })
    if (res.data.code == 0) {
      that.setData({
        cookList: res.data.data,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        duration:3000
      })
    }
  },
  async getCookS(id) {    //厨师搜索
    var that = this
    let parmes = {
      user_id: id,
    }
    let res = await ajax({ url: '/api/dishes/CookSearch', method: 'post', data: parmes })
    console.log(res)
    if(res.data.code == 0){
      that.setData({
        cookList: res.data.data,
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
   
  },
  async getSearchResultFood() {    //菜品搜索
    var that = this
    let parmes = {
      keywords: that.data.value,
    }
    let res = await ajax({ url: '/api/dishes/search', method: 'post', data: parmes })
    console.log(res)
    that.setData({
      disNameList: res.data.data,
    })
  },
  int(e) {   //获取用户输入的搜索值
    var that = this
    that.setData({
      value: e.detail.value
    })
  },
  giveFive(e){   //点赞
    var that = this
    console.log(e.currentTarget.dataset.index)
    let id = e.currentTarget.dataset.index
    that.getFive(id)
  },
   async getFive(id){
     var that = this
     let params = {
       id:id
     }
     let res = await ajax({
       url: 'api/dishes/fabulous',
       method: 'POST',
       data: params
     }) 
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
      
    })
    if (e.target.dataset.current == 1) {
      that.getDishName(1)
      that.setData({
        inpNmae:'请输入食材或者菜名'
      })
    } else if (e.target.dataset.current == 2){
      that.getCookName(1)
      that.setData({
        inpNmae: '请输入厨师名'
      })
    }
    console.log(that.data.currentTab);
    // }
  },
  async getCookName(page){    //获取私厨列表
    var that = this
    let params = {
      page
    }
    let res = await ajax({
      url: '/api/dishes/getCookList',
      method: 'POST',
      data:params
    })
    that.setData({
      cookList:that.data.cookList.concat(res.data.data.data)
    })
    console.log(res)
  },
  async getDishName(num) { //获取菜品列表
    var that = this
    let params = {
      page:num
    }
    let res = await ajax({
      url: '/api/dishes/lists',
      method: 'POST',
      data: params
    })
    console.log(res)
    if(res.data.code == 0){
      that.setData({
        disNameList: that.data.disNameList.concat(res.data.data.data)
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
   
    console.log(that.data.disNameList)
  },
  fabulous() { //点赞取消   //需要传菜品id
    var that = this
    let res = ajax({
      url: 'api/dishes/fabulous',
      method: 'POST',
      data: params
    })
  },
  show: function(e) {
    this.setData({
      isHidden: false, //显示模态框
      cookId:e.currentTarget.dataset.cookid,
      userId: e.currentTarget.dataset.userid,
    })
  },
  sunmit: function() {
    this.setData({
      isHidden: true //显示模态框
    })
  },
  haveMeals(e){   //获取输入的人数
      this.setData({
        cookNumber:e.detail.value
      })
  },
  async sunmitInfo(){
    var that = this
    let params = {   //cook_id=厨师id    make_time=用餐时间   number=人数  to_user_id=厨师用户id
      cook_id: that.data.cookId,
      to_user_id: that.data.userId,
      make_time:that.data.startDate,
      number: that.data.cookNumber
    }
    if (params.make_time == ''){
      wx.showToast({
        title: '请选择时间',
        icon:'none',
        duration:3000
      })
      return
    }
    if (params.number == '') {
      wx.showToast({
        title: '请输入人数',
        icon:'none',
        duration:3000
      })
      return
    }
    let res = await ajax({
      url: 'api/user/makeCook',
      method: 'POST',
      data: params
    })
    if(res.data.code == 0){
     wx.navigateTo({
       url: '/pages/makeanapp/index',
     })
      that.setData({
        isHidden: true //显示模态框
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none',
        duration:3000
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
      var that = this
      that.setData({
        num:that.data.num + 1
      })
      if(that.data.currentTab == 1){
        that.getDishName(that.data.num)
      }else{
        that.getCookName(that.data.num)
      }
   
      console.log(that.data.num)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})