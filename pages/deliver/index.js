var lpapi = require('../../utils/LPAPI/LPAPI.js');
import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
//index.js
//获取应用实例
const app = getApp()
// pages/created/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myimgid:"",
    total2:"",
    total3:"",
    ads: ['/images/temp/ad.jpg', '/images/temp/caipin.png'],
    deliveryList: [], //派送订单
    deliveryListYes: [], //已完成订单
    currentTab: 1,
    contact: false,
    shopInfo: '',
    showModal: false,
    shopNum: 1,
    shopPrice: '',
    tuidanModal: false,
    card_img: [],
    card_imgid: [], //图片id
    PeisongList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getDeliveryClerkList()
    this.getDistributorClerkList()
    this.getPeisongList()
    // that.look()
  },
  onShow: function () {
    this.getDeliveryClerkList()
  },

  // zym

  upload: function (e) { //上传图片
    var that = this
    if (that.data.card_imgid.length > 9) {
      wx.showToast({
        title: '最多只能上传9张图片',
        icon: 'none',
        duration: 3000,
      })
      return
    }
    var id = e.currentTarget.dataset.id

    console.log("currentTarget", e.currentTarget.dataset)
    wx.showActionSheet({
      itemList: ['拍照'],
      success: function (res) {
        that.getImg(res.tapIndex, id)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  upImg(url, shopid) { //上传图片
    let _this = this
    console.log(url)
    app.globalData.token = wx.getStorageSync('token')
    wx.uploadFile({
      url: `https://second.chchgg.com/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`,
      filePath: url,
      name: 'image',
      formData: {
        'name': 'image'
      },
      success(res) {
        let data = JSON.parse(res.data)
        //返回上传照片的id，记录下来
        let id = _this.data.card_imgid

        if (data.code == 0) {

          id.push(data.data.id)
          _this.setData({
            card_imgid: id
          })
        }

    
      },
      fail(res) {
        const data = res.data
        console.log(data + '失败')
      }
    })
  },
  getImg: function (e, id) {
    var _this = this

    console.log("e",id)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = _this.data.card_img
        tempFilePaths.push(res.tempFilePaths[0])
        console.log(tempFilePaths)

        

        let peisongList = _this.data.PeisongList
        for (var i = 0; i < peisongList.length; i++) {
          if(peisongList[i].id == id){
            peisongList[i].imgurl = tempFilePaths
          }
         
        }

        console.log(_this.data.PeisongList)


        _this.setData({
          card_img: tempFilePaths,
          PeisongList:peisongList
        })

        _this.upImg(res.tempFilePaths[0], id)
      }
    })
  },


  async enterSend(e) {
    let that = this
    let shopid = e.currentTarget.dataset.id ,params,imgid = that.data.card_imgid

    if(imgid.length != 0){
       params = {
        id: shopid,
        images_id:imgid
      }
    }else{
      params = {
        id: shopid,
        images_id:1
      }
    }

    console.log(params)

    let res = await ajax({
      url: 'api/staff/completeOrder',
      method: 'post',
      data: params
    })

    console.log("确认送达", res)

    if (res.data.code == 0) {
      wx.showToast({
        title: '已确认送达',
      })
      
      this.getDistributorClerkList()
      this.getPeisongList()
    }



  },

  async takeDelivery(e) { //取货
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    let res = await ajax({
      url: 'api/staff/pick',
      method: 'post',
      data: params
    })

    console.log("取货", res.data)

    if (res.data.msg == "success") {

      wx.showToast({
        title: '取货成功',
        icon: 'none',
        duration: 3000
      })
      that.getDeliveryClerkList()
      that.lookApi()
      // 行行超甜

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  returnAndExchange(e) { //退换货
    console.log(e);
    this.setData({
      tuidanModal: true,
      shopExch: e.currentTarget.dataset.item
    })
  },



  //打印
  print(value) {
    console.log(value.currentTarget.dataset.value);
    let myData = value.currentTarget.dataset.value;
    lpapi.openPrinter('') //连接打印机    为空就是列表第一个
    var width = 100;
    var height = 40;

    lpapi.startDrawLabel('test', this, width, height, 0);

    lpapi.setItemOrientation(0)
    lpapi.setItemHorizontalAlignment(0);
    let y = 5
    lpapi.drawText(`订单号：${myData.order_no}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`收货人：${myData.address.name}`, 0, y, 4)
    y = y + 5
    lpapi.drawText(`电话：${myData.address.tel}`, 0, y, 5)
    y = y + 5
    let myAddress = myData.address.province_name + myData.address.city_name + myData.address.county_name + myData.address.address;
    lpapi.drawText(`地址：${myAddress}`, 0, y, 5)
    y = y + 15
    lpapi.endDrawLabel();
    lpapi.print();
  },
  hideModal() {
    this.setData({
      tuidanModal: false
    })
  },
  async onConfirmTui() { //拒绝原因
    var that = this
    if (that.data.shopReason == undefined) {
      wx.showToast({
        title: '请输入拒绝原因',
        icon: "none",
        duration: 3000
      })
      return
    }
    let params = {
      order_id: that.data.shopExch.id,
      order_detail_id: that.data.shopExch.order_id,
      status: 4,
      type: 2,
      title: that.data.shopReason
    }
    let res = await ajax({
      url: 'api/quickorder/confirm',
      method: 'post',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        duration: 3000
      })
      that.setData({
        tuidanModal: false
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  async onCancelTui() { //确认退单
    var that = this
    // order_id=订单id, order_detail_id ,status=1同意,4拒绝  ,  title = 拒绝原因   type=1退货退款,2换货
    let params = {
      order_id: that.data.shopExch.id,
      order_detail_id: that.data.shopExch.order_id,
      status: 1,
      type: that.data.shopExch.is_after_type
    }
    let res = await ajax({
      url: 'api/quickorder/confirm',
      method: 'post',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '成功',
        duration: 3000
      })
      that.setData({
        tuidanModal: false
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  shopNum(e) { //配送员输入的数量
    this.setData({
      shopNum: e.detail.value
    })
  },
  inputChangeTui(e) { //获取配送员输入发拒单原因
    this.setData({
      shopReason: e.detail.value
    })
  },
  shopPrice(e) { //配送员输入的价格
    this.setData({
      shopPrice: e.detail.value
    })
  },
  onCancel() {
    this.setData({
      showModal: false,
    })
  },
  async onConfirm() { //修改数量和价格
    var that = this
    if (that.data.shopPrice == '') {
      wx.showToast({
        title: '请输入价格',
        icon: 'none',
        duration: 3000
      })
      return
    }
    let params = {
      id: that.data.shopOneInfo.id,
      price: that.data.shopPrice,
      number: that.data.shopNum,
    }
    let res = await ajax({
      url: 'api/staff/upOrderByStaff',
      method: 'post',
      data: params
    })
    console.log(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '修改成功',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
    that.setData({
      showModal: false
    })
  },
  async orderReceiving(e) { //接单
    var that = this
    let params = {
      id: e.currentTarget.dataset.id
    }
    console.log('object', params);
    let res = await ajax({
      url: 'api/staff/sendture',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      wx.showToast({
        title: '接单成功',
        duration: 3000
      })
      that.setData({
        showModal: true,
        shopOneInfo: e.currentTarget.dataset.item
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: "none",
        duration: 3000
      })
    }
  },
  look(e) { //查看清单
    var that = this
    that.setData({
      detailedId: e.currentTarget.dataset.id,
      detailedIndex: e.currentTarget.dataset.index,
    })
    that.lookApi()
  },

  async lookApi() {
    var that = this
    let idx = that.data.detailedIndex //点击哪个商品的索引
    let params = {
      id: that.data.detailedId
    }
    let res = await ajax({
      url: 'api/staff/getOrderDetail',
      method: 'post',
      data: params
    })

    if (res.data.code == 0) {
      let shopInfo = res.data.data
      let deliveryList = that.data.deliveryList
      let peisongList = that.data.PeisongList
      let finshList = that.data.deliveryListYes

      for (var i = 0; i < shopInfo.length; i++) {
        shopInfo[i].spec = JSON.parse(shopInfo[i].spec)
      }
      for (let i in deliveryList) {
        if (i == idx) {
          deliveryList[i].is_select = !deliveryList[i].is_select
        } else {
          deliveryList[i].is_select = false
        }
      }
      for (let i in peisongList) {
        if (i == idx) {
          peisongList[i].is_select = !peisongList[i].is_select
        } else {
          peisongList[i].is_select = false
        }
      }

      for (let i in finshList) {
        if (i == idx) {
          finshList[i].is_select = !finshList[i].is_select
        } else {
          finshList[i].is_select = false
        }
      }

      that.setData({
        contact: true,
        shopInfo,
        PeisongList: peisongList,
        deliveryListYes: finshList,
        deliveryList
      })

    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  clickTab(e) {

    let that = this

    this.setData({
      currentTab: e.currentTarget.dataset.current
    })

    if (e.currentTarget.dataset.current == 3) {
      this.getDistributorClerkList()
    } else if (e.currentTarget.dataset.current == 2) {
      that.getPeisongList()
    }
  },
  async getDeliveryClerkList() { //获取配送员未处理订单
    var that = this
    let params = {
      status: 0
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      console.log("获取配送员未处理订单", res.data.data.data)
      let deliveryListOne = res.data.data.data
      for (var i = 0; i < deliveryListOne.length; i++) {
        deliveryListOne[i].is_select = false
      }
      console.log("deliveryListOne", deliveryListOne)
      that.setData({
        deliveryList: deliveryListOne,
        total: res.data.data.total,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },
  // 配送中的数据
  async getPeisongList() {
    let params = {
      status: 1
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })

    let peisongList = res.data.data.data
    for (var i = 0; i < peisongList.length; i++) {
      peisongList[i].is_select = false
    }

    this.setData({
      PeisongList: peisongList,
      total2: res.data.data.total,
    })
    console.log("total2",this.data.total2)
  },

  async getDistributorClerkList() { //获取配送员已处理订单
    var that = this
    let params = {
      status: 2
    }
    let res = await ajax({
      url: 'api/staff/getStaffSendOrder',
      method: 'post',
      data: params
    })
    if (res.data.code == 0) {
      console.log('获取配送员已完成订单', res)

      let deliveryListYes = res.data.data.data
      for (var i = 0; i < deliveryListYes.length; i++) {
        deliveryListYes[i].is_select = false
      }


      let total = res.data.data.total
      that.setData({
        // deliveryListYes: that.data.deliveryListYes.concat(res.data.data.data),
        deliveryListYes: res.data.data.data,
        total3: res.data.data.total,
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },





})