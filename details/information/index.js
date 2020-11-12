import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/information/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countDownNum:60,
        showcode:true,
        code:"",//验证码
        cardPhoto: '/images/temp/zheng.png', //身份证照正面,默认图片
        otherPhoto: '/images/temp/fan.png', //身份证反面
        healthyPhoto: '/images/temp/kang.png', //健康证
        cookPhoto: '/images/temp/chushi.png', //厨师证
        fullName: '', //名字
        number: '', //身份证号
        price: '', //私厨价格
        beGood: '', //擅长  
        beGoodBox:[],//用于渲染四中选项
        styleGood_num:[],//装下标
        styleGood_id:[],//装ID
        styleGood_name:null,//渲染名字
        beGoodId: '', //擅长id 
        beGoodList: [{
            "id": "0",
            "text": "烧开水"
        }, {
            "id": "1",
            "text": "煮饭"
        }, {
            "id": "2",
            "text": "吃"
        }], //擅长列表
        type_1:3,//申请是否通过 0 未审核 1未通过 2通过
        background: '', //  工作经验
        address: '', //地址
        tel: '', //联系方式
        occupation: '', //职业
        occupationId: '', //职业id
        occupationNum:null,//选择职业下标
        card_img1: '', //身份证正面id
        card_img2: '', //身份证反面id
        jk_img: '', //健康证id
        ck_img: '', //厨师证
        options_id:"0",//判断是编辑还是新增
        data_id:"",//编辑是需要的ID
        selectArray: [{
            "id": "0",
            "text": "厨师"
        }, {
            "id": "1",
            "text": "切墩"
        }, {
            "id": "2",
            "text": "洗盘子"
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.getOccupation();
        that.getBegood();
     
        if(options.id==="1"){
            that.setData({
                options_id:options.id
            })
           
        }

        that.getInfo();
 
    
            //表单验证规则
        this.WxValidate = app.wxValidate({
            fullName: {
                required: true,
                minlength: 2,
                maxlength: 10,
            },
            tel: {
                required: true,
                tel: true,
            },
            address: {
                required: true,
                minlength: 1,
                maxlength: 100,
            },

            background: {
                required: true,
                minlength: 1,
                maxlength: 100,
            },

            // number: {
            //     required: true,
            //     idcard: true,
            // },
        }, {
            fullName: {
                required: '您填写的姓名格式错误',
            },
            tel: {
                required: '您填写的联系方式错误',
            },
            address: {
                required: '请输入地址',
            },

            background: {
                required: '请输入您的工作经验',
            },

            // number: {
            //     required: '请输入正确的身份证号',
            // },
        })
    },
  
    goback(){
        wx.navigateBack({
          delta: 0,
        })
    },
    //获取个人信息
    async getInfo(){
        let res=await ajax({
            url: '/api/dishes/getSelfCookInfo',
            method: 'get',
        })

        console.log(res.data,"获取个人信息");

        if(res.data.code == 0){

           this.setData({
               options_id:"1"
           })
            let dataBox=res.data.data;
            let pro_name="",pro_num=null;
            this.data.selectArray.forEach((item,index)=>{
                if(item.id===dataBox.pro_id){
                    pro_name=item.name;
                    pro_num=index;
                }
            })
            let card_id=dataBox.card_img.split(",");

            console.log("id-------",Array.from(dataBox.dishes_id.split(",")))
            this.setData({
                occupationId:dataBox.pro_id,
                data_id:dataBox.id,
                fullName:dataBox.name,
                // number:dataBox.card_no,
                number:'',
                background:dataBox.work_experience,
                address:dataBox.now_address,
                tel:dataBox.tel,
                price:dataBox.price,
                // cardPhoto:dataBox.cardimg[0],
                // otherPhoto:dataBox.cardimg[1],
                // healthyPhoto:dataBox.jiankang_img,
                // cookPhoto:dataBox.chushi_img,
                cardPhoto:"",
                otherPhoto:"",
                healthyPhoto:'',
                cookPhoto:'',
                styleGood_name:dataBox.disname,
                jk_img:dataBox.jk_img,
                ck_img:dataBox.ck_img,
                occupation:pro_name,
                occupationNum:pro_num,
                // card_img1:card_id[0],
                // card_img2:card_id[1],
                card_img1:'',
                card_img2:'',
                type_1:dataBox.type_1,
                styleGood_id:Array.from(dataBox.dishes_id.split(","))
            })
        }else{
            this.setData({
                type_1:3//还没有申请
            })
        }
    },
    async getOccupation() { //获取厨师职业
        var that = this
        let res = await ajax({
            url: 'api/user/professionList',
            method: 'get',
        })
        that.setData({
            selectArray: res.data.data
        })
      
    },
    async getBegood() { //获取厨师擅长菜系
        var that = this
        let res = await ajax({
            url: 'api/user/dishesList',
            method: 'get',
        })
        console.log(res.data,'菜系')
        let styleGood=res.data.data;
        styleGood.splice(0,0,{id:null,name:"--"});
        let styleGood_box=[];
        for(let a=0;a<4;a++){
            styleGood_box.push(styleGood)
        }
        that.setData({
            beGood: res.data.data,
            beGoodBox:styleGood_box
        })
        
    },
    getDate: function(e) { //获取下拉选择的内容
        console.log(e.detail)
        this.setData({
            occupation: e.detail.text,
            occupationId: e.detail.id
        })
    },

    getDatebeGood(e) { //用户擅长
        console.log(e.detail)
        this.setData({
            beGood: e.detail.text,
            beGoodId: e.detail.id
        })
    },
    //选择擅长菜系
    changeGoods(e){
        console.log(e.detail.value);
        let arr=e.detail.value;
        let newArr=[];
        for(let a=0;a<arr.length;a++){
            if(arr[a]===0){ //去掉下标0
                arr.splice(a,1);
            }
            if(!newArr.includes(arr[a])){//去重
                newArr.push(arr[a])
            }
        }
        let styleGood_id="";
        let styleGood_name="";
        let beGoods=this.data.beGoodBox[0];
        newArr.forEach(item=>{//赋值
            styleGood_id+=beGoods[item].id+",";
            styleGood_name+=beGoods[item].name+",";
        })
        styleGood_id=styleGood_id.substring(0,styleGood_id.lastIndexOf(','));
        styleGood_name=styleGood_name.substring(0,styleGood_name.lastIndexOf(','));
        if(newArr.length===0){//判断是否选的有
            styleGood_name=null;
        }
        this.setData({
            styleGood_num:newArr,
            styleGood_name:styleGood_name,
            styleGood_id:styleGood_id
        })
    },
    //选择职位
    changePosition(e){
        let occupation_id=this.data.selectArray[Number(e.detail.value)].id;
        let occupation_name=this.data.selectArray[Number(e.detail.value)].name;
        this.setData({
            occupationNum:Number(e.detail.value),
            occupationId:occupation_id,
            occupation:occupation_name
        })
    },
    bindKeyInput(e){
        this.setData({
            code: e.detail.value
            })
    },
    submit(e) {
        var that = this
        var formData = e.detail.value;

        console.log(formData,"data")
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList[0]

            console.log(error,"error")
            wx.showToast({
                title: `${error.msg}`,
                duration: 3000,
                icon: 'none',
            })
        } else {
      
            var fullName = formData.fullName;
            var tel = formData.tel;
            var beGood = that.data.beGood;
            var address = formData.address;
            var background = formData.background;
            var occupation = that.data.occupation;
            var number = formData.number;
            var price = formData.price;
            var params = {
                name: fullName,
                // card_no: number,
                card_no: '',
                work_experience: background,
                now_address: address,
                occupation: that.data.occupation,
                pro_id: that.data.occupationId,
                // card_img: `${that.data.card_img1},${that.data.card_img2}`,
                // jk_img: that.data.jk_img,
                // ck_img: that.data.ck_img,
                card_img: '',
                jk_img: '',
                ck_img: '',
                tel: tel,
                note: that.data.styleGood_name,
                dishes_id: that.data.styleGood_id,
                price: price,
                code:that.data.code
            };
            console.log(params)

            // if (that.data.card_img1 == '' || that.data.card_img2 == '') {
            //     wx.showToast({
            //         title: `请上传身份证照`,
            //         duration: 3000,
            //         icon: 'none',
            //     })
            //     return
            // }
            // if (that.data.jk_img == '') {
            //     wx.showToast({
            //         title: `请上传健康证`,
            //         duration: 3000,
            //         icon: 'none',
            //     })
            //     return
            // }
            // if (that.data.ck_img == '') {
            //     wx.showToast({
            //         title: `请上传厨师证`,
            //         duration: 3000,
            //         icon: 'none',
            //     })
            //     return
            // }
            that.getSubmit(params)
        }

    },
    countDown: function () {

            let that = this;
        
            let countDownNum = 61;//获取倒计时初始值
        
            //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
        
            that.setData({
        
              timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        
                //每隔一秒countDownNum就减一，实现同步
        
                countDownNum--;
        
                //然后把countDownNum存进data，好让用户知道时间在倒计着
        
                that.setData({
        
                  countDownNum: countDownNum
        
                })
        
                //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        
                if (that.data.countDownNum == 0) {
        
                  //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
        
                  //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
        
                  clearInterval(that.data.timer);
        
                  //关闭定时器之后，可作其他处理codes go here
        
                  that.setData({
        
                    showcode:true
        
                  })
        
                }
        
              }, 1000)
        
            })
      },
      async sendCode() { //发送验证码
        var that = this
    
        console.log(that.data.tel)
    
        wx.request({
          url: `${app.globalData.headUrl}/api/Open/sendSMS`, //仅为示例，并非真实的接口地址
          data: {
            tel: that.data.tel,
            type: 'hotel'
          },
          method: "POST",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
         
            console.log(res.data)
    
              if (res.data.code == 0) {
                that.countDown()
                that.setData({
                  showcode:false
                })
                wx.showToast({
                  title: '发送成功',
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
    
          }
        })
    
    
    
    
      },
    async getSubmit(e) {
        if(this.data.options_id==="1"){
            e.is_edit=1;
            e.id=this.data.data_id;
        }else{
            e.is_edit=0;
        }
        let res = await ajax({
            url: '/api/user/applycook',
            method: 'POST',
            data: e
        })

        console.log("是否保存成功",res.data)
        if(res.data.code == 0){
            wx.showToast({
                title: '发布成功',
                icon: 'none',
                duration: 3000,
                success(res){
                    wx.reLaunch({
                        url: "/pages/user/index",
                      })
                }
            })
        }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
        }
      
    },

    upload: function(e) {
        var that = this
        var index = e.currentTarget.dataset.index
        wx.showActionSheet({
            itemList: ['从手机相册选择', '拍照'],
            success: function(res) {
                console.log(res.tapIndex + '相册')
                that.getImg(res.tapIndex, index)
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        })
    },
    getImg: function(e, index) {
        var _this = this
        if (e == 0) {
            e = 'album'
        } else {
            e = 'camera'
        }
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: [e],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                if (index == 0) {
                    _this.setData({
                        cardPhoto: tempFilePaths[0]
                    })
                } else if (index == 1) {
                    _this.setData({
                        otherPhoto: tempFilePaths[0]
                    })
                } else if (index == 2) {
                    _this.setData({
                        healthyPhoto: tempFilePaths[0]
                    })
                } else if (index == 3) {
                    _this.setData({
                        cookPhoto: tempFilePaths[0]
                    })
                }
                _this.upImg(tempFilePaths[0], index)
            }
        })
    },

    upImg(url, index) { //上传图片
        let _this = this
        console.log(url, index)
        app.globalData.token = wx.getStorageSync('token')
        wx.uploadFile({
           url: `${app.globalData.headUrl}/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`,
            // url: `http://debug.nncaixiao2.cn/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`, //仅为示例，非真实的接口地址
            filePath: url,
            name: 'image',
            formData: {
                'name': 'image'
            },
            success(res) {
              
                let data = JSON.parse(res.data)
                console.log(data)
                
                if (index == 0) { //返回上传照片的id，记录下来
                    _this.setData({
                        card_img1: data.data.id
                    })
                } else if (index == 1) {
                    _this.setData({
                        card_img2: data.data.id
                    })
                } else if (index == 2) {
                    _this.setData({
                        jk_img: data.data.id
                    })
                } else if (index == 3) {
                    _this.setData({
                        ck_img: data.data.id
                    })
                }
                //do something
            },
            fail(res) {
                const data = res.data
                console.log(data + '失败')
            }
        })
    },
    // submit(){
    //   var that = this
    //   console.log(that.data.formInfo.fullName)
    // },
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