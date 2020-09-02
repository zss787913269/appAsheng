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
    showModalStatus: false, //遮罩的显示与隐藏
    value:'排骨',   //用户输入的值
    hotSearch:'',   //热门搜索
    meSearch:'',    //个人搜索历史
    where:'',   //从哪里来  
    historicalRecord:true,    //搜索商品就显示历史记录，菜品就不显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getHotSearch()
    that.getMeSearch()
    console.log(options.where)
    if (options.where == 'food' && options.where == 'cook'){
      that.setData({
        historicalRecord:false
      })
    }
    that.setData({
      where:options.where
    })
  },

  showModal() {
    // //////console.log("点击了订单")
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

  // id: "955"
  clickse: function (e) {
    console.log(e)
    this.showModal()
    // var that = this
    // let tab = e.currentTarget.dataset.id.spec_base

    // // //////console.log(tab)

    // let tabCopy = JSON.parse(JSON.stringify(tab))
    // for (var i = 0; i < tabCopy.length; i++) {
    //   tabCopy[i].value = {}
    // }
    // for (var i = 0; i < tab.length; i++) {
    //   for (var j = 0; j < tab[i].value.length; j++) {
    //     if (i == 0 && j == 0) {
    //       tabCopy[i].value[tab[i].value[j]] = true
    //     } else {
    //       tabCopy[i].value[tab[i].value[j]] = false
    //     }
    //   }
    // }
    // that.setData({
    //   tableid: tabCopy,
    //   shopingid: e.currentTarget.dataset.id.id,
    //   shopingid2: e.currentTarget.dataset.id.id,
    //   brand_id: e.currentTarget.dataset.id.brand_id,
    //   support: false
    // })
    // that.getShopPrice()
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
      console.log(that.data.hotSearch)
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
     console.log(that.data.value)
    that.toSearchResult()
  },
  int(e){   //获取用户输入的搜索值
    var that = this
    that.setData({
      value:e.detail.value
    })

    
  },
  async searchResult(){   //去搜索结果页
    let that = this
    let parmes = {
      keywords:that.data.value,
      page:1
    }

    console.log(parmes)

    let res = await ajax({ url: 'api/search/index', method: 'post', data:parmes})


    console.log("搜索结果",res.data)

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})