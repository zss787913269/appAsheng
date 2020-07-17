import ajax from '../../utils/ajax'
import regeneratorRuntime from '../../utils/runtime.js'
var app = getApp()

// details/information/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
            that.getInfo();
        }
    
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

            number: {
                required: true,
                idcard: true,
            },
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

            number: {
                required: '请输入正确的身份证号',
            },
        })
    },
    //获取个人信息
    async getInfo(){
        let res=await ajax({
            url: '/api/dishes/getSelfCookInfo',
            method: 'get',
        })
        console.log(res);
        let dataBox=res.data.data;
        let pro_name="",pro_num=null;
        this.data.selectArray.forEach((item,index)=>{
            if(item.id===dataBox.pro_id){
                pro_name=item.name;
                pro_num=index;
            }
        })
        let card_id=dataBox.card_img.split(",");
        this.setData({
            data_id:dataBox.id,
            fullName:dataBox.name,
            number:dataBox.card_no,
            background:dataBox.work_experience,
            address:dataBox.now_address,
            tel:dataBox.tel,
            price:dataBox.price,
            cardPhoto:dataBox.cardimg[0],
            otherPhoto:dataBox.cardimg[1],
            healthyPhoto:dataBox.jiankang_img,
            cookPhoto:dataBox.chushi_img,
            styleGood_name:dataBox.disname,
            jk_img:dataBox.jk_img,
            ck_img:dataBox.ck_img,
            occupation:pro_name,
            occupationNum:pro_num,
            card_img1:card_id[0],
            card_img2:card_id[1]
        })
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
        console.log(res)
    },
    async getBegood() { //获取厨师擅长菜系
        var that = this
        let res = await ajax({
            url: 'api/user/dishesList',
            method: 'get',
        })
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
    submit(e) {
        var that = this
        var formData = e.detail.value;
        if (!this.WxValidate.checkForm(e)) {
            const error = this.WxValidate.errorList[0]
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
                card_no: number,
                work_experience: background,
                now_address: address,
                occupation: that.data.occupation,
                pro_id: that.data.occupationId,
                card_img: `${that.data.card_img1},${that.data.card_img2}`,
                jk_img: that.data.jk_img,
                ck_img: that.data.ck_img,
                tel: tel,
                note: that.data.styleGood_name,
                dishes_id: that.data.styleGood_id,
                price: price
            };
            console.log(params)

            if (that.data.card_img1 == '' || that.data.card_img2 == '') {
                wx.showToast({
                    title: `请上传身份证照`,
                    duration: 3000,
                    icon: 'none',
                })
                return
            }
            if (that.data.jk_img == '') {
                wx.showToast({
                    title: `请上传健康证`,
                    duration: 3000,
                    icon: 'none',
                })
                return
            }
            if (that.data.ck_img == '') {
                wx.showToast({
                    title: `请上传厨师证`,
                    duration: 3000,
                    icon: 'none',
                })
                return
            }
            that.getSubmit(params)
        }

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
        wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 3000,
            success(res){
                wx.navigateBack({
    
                })
            }
        })
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
            sizeType: ['original', 'compressed'],
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
            url: `http://second.chchgg.com/index.php?s=/api/user/upload&application=app&application_client_type=weixin&token=${app.globalData.token}&ajax=ajax`, //仅为示例，非真实的接口地址
            filePath: url,
            name: 'image',
            formData: {
                'name': 'image'
            },
            success(res) {
                let data = JSON.parse(res.data)
                console.log(data.data.id)
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