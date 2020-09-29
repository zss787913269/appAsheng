import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

Page({
  data: {
    region: ['广西壮族自治区', '南宁市', '西乡塘区'],
    provinces: [],
    province: "",
    // 省分id
    provinceid: "",
    citys: [],
    city: "",
    // 城市id
    cityid:'',
    countys: [],
    county: '',
    // 区域id
    countyid: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    isChecked: false,
    is_default:0,//默认状态是否选中
    contactId: '',//地址id
    defaultaddes:{},
    cityids:0,
    streets:'',  //街道列表
    street:'',   //当前选择的街道
    streetId:'',    //当前选择的街道id
  },
  // 编辑地址
  onLoad: function (options) {
    var that = this;

    that.getprovince(20, 0),
      that.getcitys(310, 0),
      that.getcountys(3166,0)
    that.getStreet(30646,0)
    if (options.id) {
      that.getCateList(options)
    }
    // 编辑绑定地址id
   
      //表单验证规则
      this.WxValidate = app.wxValidate({
        fullname: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
        telephone: {
          required: true,
          tel: true,
        },

        address: {
          required: true,
          minlength: 2,
          maxlength: 100,
        },
      },
        {
          fullname: {
            required: '您填写的姓名格式错误',
          },
          telephone: {
            required: '您填写的联系方式错误',
          },
          address: {
            required: '请输入详细收货地址',
          },
        })



  },
  // 
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    
  },
  async getprovince(e,y) {     //获取省份
    let that = this
   
    let res = await ajax({ url: 'api/region/index', method: 'post',data:0})
       that.setData({
         provinces: res.data.data,
       })
    console.log("获取省份",res.data)
       if(e==2){
         that.setData({
           province: that.data.provinces[0].name,
           provinceid: that.data.provinces[0].id,
         })
       }
    },
  async getcitys(e, y) {   //获取城市
    let that = this
    let res = await ajax({ url: 'api/region/index', method: 'post', data: { pid: e}})
    that.setData({
      citys: res.data.data,
    })
    if (that.data.citys.length > 0) {
    if (y == 0){
      that.setData({
        city: that.data.citys[0].name,
        cityid: that.data.citys[0].id
      })
    } else {
      that.setData({
        city: that.data.citys[that.data.citysid].name,
        cityid: that.data.citys[that.data.citysid].id
      })
    }
    }
   
  },
  async getcountys(e,y) {    //获取区县
    let that = this
    let res = await ajax({ url: 'api/region/index', method: 'post', data: { pid: e}})
    that.setData({
      countys: res.data.data,
    })
    if (that.data.countys.length>0){
      if (y == 0) {
        that.setData({
          county: that.data.countys[0].name,
          countyid: that.data.countys[0].id
        })
      } else {
        that.setData({
          county: that.data.countys[that.data.countysid].name,
          countyid: that.data.countys[that.data.countysid].id,
        })
      }
    }
    
  },
  async getStreet(e, y) {   //获取街道
    let that = this
    let res = await ajax({ url: 'api/region/index', method: 'post', data: { pid: e} })
    that.setData({
      streets: res.data.data,
    })
    console.log(res)
    if (that.data.streets.length > 0) {
      console.log(y)
      if (y == 0) {
        that.setData({
          street: that.data.streets[0].name,
          streetId: that.data.streets[0].id
        })
      } else {
        that.setData({
          street: that.data.streets[that.data.streetId].name,
          streetId: that.data.streets[that.data.streetId].id,
        })
      }
    }else{
      that.setData({
        street:''
      })
    }
  },
// 变换地址
  bindChange: function (e) {
    console.log('change',e);
    var val = e.detail.value
    var t = this.data.values;
    // 省分
    console.log(val)
    for (let i = 0; i < this.data.provinces.length; i++) {
      if (i == val[0]){
        // {{province}}-{{city}}-{{county}}
        this.getcitys(this.data.provinces[i].id)
        this.setData({
          province: this.data.provinces[i].name,
          provinceid: this.data.provinces[i].id
        })
        
       }
      console.log(this.data.province)
      }
    
      // 城市
    if (this.data.citys.length>0){
        for (let i = 0; i < this.data.citys.length; i++) {
          if (i == val[1]) {
            this.getcountys(this.data.citys[i].id)
            this.setData({
              citysid: i,
            })
          }
        }
      }
   
      // 区域
    if (this.data.countys.length > 0) {
    for (let i = 0; i < this.data.countys.length; i++) {
      if (i == val[2]){
        this.getStreet(this.data.countys[i].id)
        this.setData({
          countysid: i
        })
       }
      }
    }
  //  街道
    if (this.data.streets.length > 0) {
      for (let i = 0; i < this.data.streets.length; i++) {
        if (i == val[3]) {
          this.setData({
            streetId: i
          })
        }
      }
    }

  },
  // 打开地址
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  // 复选框
  checkboxChange:function(e){
    let isChecked = e.currentTarget.dataset.checked;
    if (isChecked == "false" || isChecked == false) {     //即将选中   将其值设为true
      isChecked = true;
      this.setData({
        is_default:1
      });
      
    } else {
      isChecked = false;
      this.setData({
        is_default:0
      });
    }
    this.setData({
      isChecked: isChecked
    });
    console.log(this.data.is_default)
  },
 
  async getCateList(e) {
    let that=this
    //  let res = await ajax({ url:'api/useraddress/index', method:'GET', token:app.globalData.token})
    let res = await ajax({ url: 'api/useraddress/index', method: 'GET' })
    var arr=[]
    console.log('getCateList',res);
    for (let i = 0; i < res.data.data.length; i++) {
     if (res.data.data[i].id == e.id){
         that.setData({
           defaultaddes: res.data.data[i],
           fullname: res.data.data[i].name,
           telephone: res.data.data[i].tel,
           provinceid: res.data.data[i].province,
           province: res.data.data[i].province_name,
           cityid: res.data.data[i].city,
           city: res.data.data[i].city_name,
           county: res.data.data[i].county_name,
           countyid: res.data.data[i].county,
           address: res.data.data[i].address,
           is_default: res.data.data[i].is_default,
           id: res.data.data[i].id,
           region:res.data.data[i].region.split(",")
        })
      }
    }
    if (that.data.defaultaddes.is_default==0){
      that.setData({
        isChecked: false
      })
    }else{
      that.setData({
        isChecked: true
      })
    }
  },
   
  

  async getuseraddress(e) {
    console.log("地址",e)
    let res = await ajax({ url: 'api/useraddress/save', method: 'POST', data: e })
    wx.showToast({
      title: '操作成功',
      duration:3000
    })
    // wx.redirectTo({
    //   url: '/person/map/index',
    // })

  },
  onShow() {
    console.log('12',app.globalData.token)
  },
  // 新增加地址
  addreform: function (e) {
    console.log(this.data.is_default)
    var that = this;
    console.log(e.detail.value)
    var formData = e.detail.value;
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      console.log(error)
      wx.showToast({
        title: `${error.msg}`,
        duration: 3000,
        icon:'none'
      })
    }else{
      var name = formData.fullname;
      var tel = formData.telephone;
      var province = that.data.provinceid;
      var city = that.data.cityid;
      var county = that.data.countyid;
      var address = formData.address;
      var is_default = that.data.is_default;
      if (that.data.id!=0){
        var id = that.data.id;
      }
      var params = {
        name: name,
        tel: tel,
        province: 20,
        city: 310,
        county: 3166,
        address: address,
        is_default: is_default,
        id:id,
        quarters:that.data.streetId,
        region:that.data.region.toString()
      };
      console.log("params",params)
      that.getCategoryList(params)
    }
    
      
  },

  async getCategoryList(e) {
    console.log("地址",e)
    let res = await ajax({ url: 'api/useraddress/save', method: 'POST',data:e })
    wx.showToast({
      title: '新增成功',
      duration:3000
    })
    wx.navigateBack({
     
    })
    
  },
})