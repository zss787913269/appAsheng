// private/hotelinfo/index.js

import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

app.globalData.token = wx.getStorageSync('token')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: "https://wxapp.mccxx.com/static/banner/wxapp/",
    hotelInfo: [],
    hotelList:[],
    name: "",
    hotelQR: "",
    showDialog: false,
    show: false,
    xdy:[],
    csz:[],
    cg:[],
    ck:[],
    cw:[],
    dz:[],
    lb:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotel()
    this.getjueseinfo()
    this.getHotelMsg()
  },
  toggleDialog() {
    this.getjueseinfo()
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  onShow(){
    this.getjueseinfo()
  
  },

 deteleObject(obj) { //去掉对象中重复的对象
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
},

go(){
  wx.navigateTo({ url: '/private/hotelAddress/index'}) 
},

  async getHotelMsg(){

    let that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })
    console.log("获取酒店",res.data)



      if(res.data.code == 0){
        //1.hotelist.length 等于空  hotel 等于 null
        //2.hotelist.length 等于空  hotel 不等于Null
        //3.hotelist.length 不等于空 hotel 等于null
        //4.hotelist.length 不等于空 hotel 不等于null
        let hotelist = res.data.data.hotelist,hotel = res.data.data.hotel,hotelInfo=[]
        if(hotelist.length == 0 && hotel == null){
            wx.navigateTo({ url: '/private/hotelAddress/index'}) 
        }else if(hotelist.length != 0 && hotel != null){
          hotelInfo = hotelist.concat(hotel.hotel)
          // that.deteleObject(obj)
        }else if(hotelist.length != 0 && hotel == null){
           hotelInfo = hotelist
        }else if(hotelist.length == 0 && hotel != null){
          hotelInfo = hotelInfo.concat(hotel.hotel)
       }

        console.log('hotelInfo',hotelInfo)
        this.setData({
          hotelList:hotelInfo
        })

      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }

  },

  async getHotel() { //获取酒店
    var that = this
    let res = await ajax({
      url: '/api/quickorder/getHotel',
      method: 'get'
    })
    // console.log("获取酒店",res.data.data)

    let hotelInfo = []

    let data = res.data.data

    if(res.data.data.hotel == null){
      hotelInfo =  data.hotelist
    }else if(res.data.data.hotelist.length == 0){
      hotelInfo = data.hotel
    }
    else{
     
      hotelInfo =  data.hotelist.concat(data.hotel)
    }

    // console.log('hotelInfo',hotelInfo)
    // if(res.data.data.hotelist.length == 0){
    //   this.setData({
    //     hotelList:{hotelInfo}
    //   })
    // }else{
    //   this.setData({
    //     hotelList:hotelInfo
    //   })
    // }
  
    // if(res.data.code != 0){
    //   wx.showToast({
    //     title: '还未注册酒店，请先注册',
    //     icon:"none"
    //   })
    // }
    // 第一个注册有二维码
    // 当第一个分享给老板以后 二维码隐藏
    // let hotelInfo = res.data.data

    // console.log(hotelInfo)
    // if (hotelInfo != null) {
    
    //   let type = hotelInfo.type
    //   let name

      


    //   if (type == 1) {
    //     name = "下单员"
    //   } else if (type == 2) {
    //     name = "厨师长"
    //   } else if (type == 3) {
    //     name = "采购"
    //   } else if (type == 4) {
    //     name = "仓库"
    //   } else if (type == 5) {
    //     name = "财务"
    //   } else if (type == 6) {
    //     name = "店长"
    //   } else if (type == 7) {
    //     name = "老板"
    //   }

    //   console.log("hotelInfo",hotelInfo)

    //    let res1 = await ajax({
    //           url: 'api/hotel/jueseinfo',
    //           method: 'post',
    //           data:{hotelid:hotelInfo.id}
    //         })
  
    //     var xdy = [],csz= [],cg = [],ck = [],cw =[],dz = [],lb = []
  
    //     console.log("getjueseinfo",res1.data.data)
  
    //     if(res.data.code == 0){
    //       if(res1.data.data.length != 0){
    //         for(let i of res1.data.data){
    //           if(i.type == 1){
    //             xdy = i
    //           }else if(i.type == 2){
    //             csz = i
    //           }else if(i.type == 3){
    //             cg = i
    //           }else if(i.type == 4){
    //             ck = i
    //           }else if(i.type == 5){
    //             cw = i
    //           }else if(i.type == 6){
    //             dz = i
    //           }else if(i.type == 7){
    //             lb = i
    //           }
    //         }
    //       }
    //     }
  
    //     console.log("下单员：",xdy)
        
    //     this.setData({
    //       xdy,csz,cg,ck,cw,dz,lb
    //     })
    //   this.setData({
    //     hotelInfo,
    //     name
    //   })
    // }else{
    //   wx.showToast({
    //     title: '还未注册酒店，请先注册',
    //     icon:"none"
    //   })
    // }

  },

  goHotel(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    console.log(index)

    switch (index) {
      case "1":
        wx.navigateTo({
          url: '/private/hotelpeople/index'
        }) //酒店订单
        break;
      case "2":
        wx.navigateTo({
          url: '/private/hotelAddress/index?id='+id
        }) //注册酒店
        break;

    }

  },

  async sendQRCode(e) {
    let that = this

    this.toggleDialog()
    console.log(e.currentTarget.dataset.index)
    let params = {
      id: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.index
    }
    let res = await ajax({
      url: 'api/Quickorder/addCode',
      method: 'POST',
      data: params
    })
    console.log(res.data.data)
    if (res.data.code == 0) {
      that.setData({ //角色二维码
        hotelQR: res.data.data.img_url,
        showQR: true
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 3000
      })
    }
  },

  async getjueseinfo(){
    let that = this
  
    

    
  },

})

