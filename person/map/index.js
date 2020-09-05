//index.js
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//获取应用实例 
const app = getApp()

Page({
  data: {
    currentTab: 1,
    userInfo: {},
    hasUserInfo: false,
    isChecked:false,
    categoryList:[],
    defaultaddes: {}
  },
  onLoad(options){
   
  },
  onShow(){
    this.getCategoryList()
  },
  // 删除
  deleteed: function (e) {
    this.deleted(e.currentTarget.dataset.id)
  },

  async deleted(id){
    console.log(id)
    let res = await ajax({ url: 'api/useraddress/delete', method: 'POST',data:{id:id} })
    if(res.data.code == 0){
      wx.showToast({
        title: '删除成功',
        duration:3000
      })
      this.getCategoryList()
    }
   
  },
  async getCategoryList() {
     let that=this
     let res = await ajax({ url:'api/useraddress/index', method:'GET'})
    that.setData({
      categoryList: res.data.data
    })
    console.log("useraddress",that.data.categoryList)
  },
  //点击切换
  checkboxChange(e){
    var that = this;
    that.getCateList(e.currentTarget.dataset.id)
  },
    
  async getCateList(id) {
    let that = this
    let res = await ajax({ url: 'api/useraddress/setdefault', method: 'POST', data: { id: id }})
    wx.showToast({
      title: '操作成功',
        duration:3000
    })
    this.getCategoryList()
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  editor:function(e){
    
    wx.navigateTo({
      url: '/person/add/index?id='+e.currentTarget.dataset.id
    })
  },
  

})
