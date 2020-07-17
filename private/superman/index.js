// private/superman/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{ name: '信息审核', title: "员工超级端" },
            { name: '我的同事', title: "我的同事" },
            { name: '酒店管理', title: "酒店管理" },
            { name: '供应商管理', title: "供应商管理" }
        ],
        active: 0
    },
    changeActive(e) {
        this.setData({
            active: e.currentTarget.dataset.index
        })
        if (e.currentTarget.dataset.title !== "供应商管理") {
            wx.setNavigationBarTitle({
                title: e.currentTarget.dataset.title,
            });
        } else {
            wx.navigateTo({
                url: '/details/Promanage/index'
            });

        }
    },
    goTo() {
        wx.navigateTo({
            url: '/details/reviews/index',
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        if (this.data.active !== 0) {
            this.setData({
                active: 0
            })
        }
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