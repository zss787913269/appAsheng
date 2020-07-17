import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/dishesone/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    dishName: '',
    describe: '',
    card_imgid: '',
    ingredients:[], //食材
    consumption1:[], //食材用量
    mixedIngredients:[], //配料
    consumption2: [], //；配料用量
    seasoning:[],   //调料
    amountOfSeasoning:[],   //调料用量
    step:[], //步骤
    arr: [1],
    arr2: [1],
    arr3: [1],
    arr4: [1],
  },
  stepLineFeed(e) {    //input获取焦点了   步骤
    var that = this
    let index = e.currentTarget.dataset.item
    if (index+1 == that.data.arr3.length) {
      var arr3 = that.data.arr3
      arr3.push(1)
      that.setData({
        arr3
      })
    }
  },
  matchLineSeas(e){    //配料获取焦点了
    var that = this
    let index = e.currentTarget.dataset.item
    if (index + 1 == that.data.arr4.length) {
      var arr4 = that.data.arr4
      arr4.push(1)
      that.setData({
        arr4
      })
    }
  },
  mainLineFeed(e) {    //input获取焦点了   主要食材
    var that = this
    let index = e.currentTarget.dataset.item
    if (index+1 == that.data.arr.length) {
      var old = that.data.arr
      old.push(1)
      that.setData({
        arr: old
      })
    }
  },
  matchLineFeed(e) {    //input获取焦点了   配料
    var that = this
    let index = e.currentTarget.dataset.item
    if (index + 1 == that.data.arr2.length) {
      let arr2 = that.data.arr2
      arr2.push(1)
      that.setData({
        arr2
      })
    }
  },
  stepRecipes(e) {     //输入步骤
    var that = this
    let index = e.currentTarget.dataset.index
    let step = that.data.step
    step[index] = e.detail.value
      that.setData({
        step
      })
  },
  matchSeasoning(e) {     //输入调料
    var that = this
    let index = e.currentTarget.dataset.index
    let idx = e.currentTarget.dataset.idx
    console.log(index, idx)
    if (index != undefined) {
      let seasoning = that.data.seasoning
      seasoning[index] = e.detail.value
      that.setData({
        seasoning
      })
    }
    if (idx != undefined) {
      let amountOfSeasoning = that.data.amountOfSeasoning
      amountOfSeasoning[idx] = e.detail.value
      that.setData({
        amountOfSeasoning
      })
    }
  },
  matchRecipes(e) {     //输入配料
    var that = this 
    let index = e.currentTarget.dataset.index
    let idx = e.currentTarget.dataset.idx
    console.log(index, idx)
    if (index != undefined) {
      let mixedIngredients = that.data.mixedIngredients
      mixedIngredients[index] = e.detail.value
      that.setData({
        mixedIngredients
      })
    }
    if (idx != undefined) {
      let consumption2 = that.data.consumption2
      consumption2[idx] = e.detail.value
      that.setData({
        consumption2
      })
    }
  },
  mainRecipes(e) {    //输入主要食材
    var that = this
    let index = e.currentTarget.dataset.index
    let idx = e.currentTarget.dataset.idx
    console.log(index,idx)
    if(index != undefined){
      let ingredients = that.data.ingredients
      ingredients[index] = e.detail.value
      that.setData({
        ingredients
      })
    }
    if (idx != undefined) {
      let consumption1 = that.data.consumption1
      consumption1[idx] = e.detail.value
      that.setData({
        consumption1
      })
    }
  },
  //  motaikuang
  showDialogBtn: function() { //发布按钮
    let that = this
    console.log(that.data.ingredients, that.data.consumption1, that.data.consumption2, that.data.mixedIngredients)
    if (that.data.ingredients == '' || that.data.consumption1 == '' || that.data.mixedIngredients == '' || that.data.consumption2 == '' || that.data.step == '') {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 3000
      })
      return
    }
    that.getRelease()


  },
  async getRelease() {
    var that = this
    console.log(that.data.amountOfSeasoning)
    var params = {
      name: that.data.dishName,
      picture_id: that.data.card_imgid,
      describe: that.data.describe,
      main_food: that.data.ingredients,
      main_liang: that.data.consumption1,
      f_food: that.data.mixedIngredients,
      f_liang: that.data.consumption2,
      step: that.data.step,
      tiaoliao: that.data.seasoning,
      tiaoliao_liang: that.data.amountOfSeasoning
    }
    console.log(params)
    let res = await ajax({
      url: 'api/user/dishesAdd',
      method: 'POST',
      data: params
    })
    if (res.data.code == 0) {
      that.setData({
        showModal: true
      })
      setTimeout(function() {
        that.hideModal();
      }, 1000)
    }else{
      wx.showToast({
        title:res.data.msg,
        icon:'none',
        detail:3000
      })
    }
  },
  hideModal: function() {
    this.setData({
      showModal: false,
    });;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({ //接收上一个页面传过来的值
      dishName: options.dishName,
      describe: options.describe,
      card_imgid: options.card_imgid
    })
    console.log(that.data.dishName, that.data.describe, that.data.card_imgid)
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