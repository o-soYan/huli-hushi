const QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');

// 实例化API核心对象，对象调用方法实现功能
let qqmapsdk = new QQMapWX({
    key: '53IBZ-7X36X-CWE4D-TKKLE-T7K3V-STBS3'
});
//  console.log(qqmapsdk);
Page({

    /**
     * 页面的初始数据
     */
    data: {
          infolist: {
              status: "待服务",
              buycount: "1",
              serveperson: '温秀秀',
              phone: '135434343',
              serveaddress: '广东广州海珠',
              servetime: '2019-09-22',
              history: '5',
            //   yuyueprice: '119',
              pricelist: '221',
              remark: '疑难杂症',
          },
        myLatitude: "",
        myLongitude: "",
        myAddress: "",
        img: "",
        value1: 3,
        list: {
            status: "",
            buycount: "",
            serveperson: '',
            phone:'',
            serveaddress: '',
            servetime:'',
            history:'',
            yuyueprice:'',
            pricelist: '',
            remark:'',
        },
        items: [
            {
                title: "过敏药物食物",
                name: 'food',
                option: {
                    a: '有',
                    b: "无"
                }

            },
            {
                title: "心里状态",
                name: 'status',
                option: {
                    a: '有',
                    b: "无"
                },

                checked: 'true'
            },
            {
                title: "吸烟",
                name: 'XY',
                option: {
                    a: '有',
                    b: "无"
                },


            },
            {
                title: "饮酒",
                name: 'YJ',
                option: {
                    a: '有',
                    b: "无"
                },

            },
            {
                title: "大小便",
                name: 'DAB',
                option: {
                    a: '正常',
                    b: "异常"
                }
            },
            {
                title: "意识状态",
                name: 'YSZT',
                option: {
                    a: '清醒',
                    b: "嗜睡",
                    c: "烦躁",
                    d: "昏迷",
                    e: "其他",
                }

            }, {
                title: "自主能力",
                name: 'ZZNL',
                option: {
                    a: '正常',
                    b: "全瘫",
                    c: "截瘫",
                    d: "偏瘫",
                    e: "其他",
                }

            }, {
                title: "评估等级",
                name: 'PG',
                option: {
                    a: '一般',
                    b: "病重",
                    c: "病危",
                }

            }, {
                title: "护理等级",
                name: 'HL',
                option: {
                    a: '一级',
                    b: "二级",
                    c: "三级",
                    d: "特级",
                }
            },
        ],
        datas: [{
            id: 1,
            proLogo: '../../img/wechat.png',
            proName: "换药",
            price: "119",
            time: "30",
            proDesc: "更换敷料、检查伤口、清洁伤口"
        }],
        tabs: [{
                id: 0,
                title: "预约信息",
                isActive: true,
                isShow: true,
            },
            {
                id: 1,
                title: "出门准备",
                isActive: false,
                isShow: false,
            },
            {
                id: 2,
                title: "到达地点",
                isActive: false,
                isShow: false,
            }, {
                id: 3,
                title: "评估报告",
                isActive: false,
                isShow: false,
            }, {
                id: 4,
                title: "　 护理",
                isActive: false,
                isShow: false,
            }, {
                id: 5,
                title: "安全打卡",
                isActive: false,
                isShow: false,
            }
        ],
        cart: {
            goods_logo: '../../img/wechat.png',
            goods_name: "换药",
            goods_price: "119",
            goods_time: "30分钟",
            goods_info: "更换敷料、检查伤口、清洁伤口"
        }
    },
    takePhoto() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                console.log(res);
                const tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths[0]);
                that.setData({
                    img: tempFilePaths[0]
                })
            }
        })
        //用微信提供的api获取经纬度
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                that.setData({
                    myLatitude: res.latitude,
                    myLongitude: res.longitude
                })
                //用腾讯地图的api，根据经纬度获取城市
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: that.data.myLatitude,
                        longitude: that.data.myLongitude
                    },
                    success: function (res) {
                        console.log(res)
                        var a = res.result.address_component
                        that.setData({
                            myAddress: a.city + a.district
                        })
                        console.log(that.data.myAddress)
                    }
                })
            }
        })

    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    onChange(event) {
        // event.detail 为当前输入的值
        console.log(event.deta每日一丧il);
    },
    // 查看费用清单
    onExpense() {
        wx.navigateTo({
            url: '../expense/expense'
        })
    },
    //查看病历
    onHistory() {
        console.log("查看病历");
        wx.navigateTo({
            url: '../history/history'
        })
    },
    onSubmit() {
        console.log("护理已结束");

    },
    // 护理结束
    onNurseEnd() {
        let {
            tabs
        } = this.data;
        tabs[4].isShow = false
        tabs[5].isActive = true
        tabs[5].isShow = true
        this.setData({
            tabs
        })
    },
    // 开始护理
    onNurse() {
        let {
            tabs
        } = this.data;
        tabs[3].isShow = false
        tabs[4].isActive = true
        tabs[4].isShow = true
        this.setData({
            tabs
        })
    },

    // 下一步
    onNextStep() {
        let {
            tabs
        } = this.data;
        tabs[2].isShow = false
        tabs[3].isActive = true
        tabs[3].isShow = true
        this.setData({
            tabs
        })
    },
    // 准备完成
    onPrepare() {
        let {
            tabs
        } = this.data;
        tabs[1].isShow = false
        tabs[2].isActive = true
        tabs[2].isShow = true
        this.setData({
            tabs
        })
    },
    // 开始服务
    onStartService() {
        let {
            tabs
        } = this.data;
        tabs[0].isShow = false
        tabs[1].isActive = true
        tabs[1].isShow = true
        this.setData({
            tabs
        })
        console.log(tabs);

    },
    // 改变tabs标签的选中效果
    handleTitleChange(e) {
        const {
            index
        } = e.detail;
        let {
            tabs
        } = this.data;
        tabs.forEach((v, i) => i === index ? v.isShow = true : v.isShow = false);
        this.setData({
            tabs
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},

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