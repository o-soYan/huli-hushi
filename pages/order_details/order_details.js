import Toast from 'vant-weapp/toast/toast';

const QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
const {
    request
} = require("../../utils/request")
var util = require('../../utils/util.js');
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
        opinion:'',
        Score: 0,
        //安全到达打卡
        safetyClock: false,
        // 安全到达时间
        safetyTime: '',
        safetyImg: '',
        safetyAddress: '',
        isSafety: false,
        //护理结束
        nurseEndClock: false,
        nurseEndImg: '',
        measures: '',
        evaluate: '',
        isNurseEnd: false,
        nurseEndTime: '',
        nurseEndAddress: '',
        //护理前
        nurseBeforeClock: false,
        nurseTime: '',
        nurseAddress: '',
        nurseBeforeImg: '',
        // 评估报告数据
        pgdj: '',
        zznl: '',
        yszt: '',
        dxb: '',
        yj: '',
        xy: '',
        xlzt: '',
        gmywsw: '',
        isPinggu: false,

        //到达打卡
        arriveClock: false,
        arriveTime: '',
        arriveImg: '',
        arriveAddress: '',
        isArrive: false,
        //实名认证
        attestation: false,
        patientName: '',
        idenNo: '',
        patientImg: '',
        // 出门打卡
        goOutClock: false,
        goOutime: '',
        goOutImg: "",
        goOutAddress: "",
        isGoOut: false,

        infolist: {
            status: "待服务",
            buycount: "1",
            serveperson: '温秀秀',
            phone: '135434343',
            serveaddress: '广东广州海珠',
            servetime: '2019-09-22',
            history: '5',
            pricelist: '221',
            remark: '疑难杂症',
        },
        myLatitude: "",
        myLongitude: "",
        list: {
            status: "",
            buycount: "",
            serveperson: '',
            phone: '',
            serveaddress: '',
            servetime: '',
            history: '',
            yuyueprice: '',
            pricelist: '',
            remark: '',
        },
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
        },
        orderId: '',
        show: true
    },
    //到达安全地点打卡
    onSafety(){
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                safetyTime: time,
                                safetyImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
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
                                that.setData({
                                    safetyAddress: res.result.address
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    // 护理结束打卡
    NurseEnd() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        console.log(res);
                        var time = util.formatHour(new Date());

                        if (data.ResultCode == 0) {
                            that.setData({
                                nurseEndImg: data.ResultMsg,
                                nurseEndTime: time
                            })
                        }
                    }
                }) //    用微信提供的api获取经纬度
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
                                that.setData({
                                    nurseEndAddress: res.result.address,
                                    nurseEndClock: true
                                })
                            }
                        })
                    }
                })
            }
        })

    },
    //护理前打卡
    NurseBefore() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                nurseTime: time,
                                nurseBeforeImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
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
                                that.setData({
                                    nurseAddress: res.result.address,
                                    nurseBeforeClock: true
                                })
                            }
                        })
                    }
                })
            }
        })

    },
    // 出门打卡
    takePhoto() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                goOuttime: time,
                                goOutImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
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
                                that.setData({
                                    goOutAddress: res.result.address,
                                    goOutClock: true
                                })
                            }
                        })
                    }
                })
            }
        })


    },
    // 到达打卡
    onarriveClock() {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                var time = util.formatHour(new Date());
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    method: "POST",
                    url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    success: function (res) {
                        let data = JSON.parse(res.data)
                        if (res.statusCode == 200) {
                            that.setData({
                                arriveClock: true,
                                arriveTime: time,
                                arriveImg: data.ResultMsg
                            })
                        }
                    }
                })
                //    用微信提供的api获取经纬度
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
                                that.setData({
                                    arriveAddress: res.result.address
                                })
                            }
                        })
                    }
                })
            }
        })


    },
    //实名认证 
    attestationClock() {
        let that = this
        let arriveImg = that.data.arriveImg

        if (that.data.patientName == '' || that.data.idenNo == '') {
            Toast.fail('请输入患者姓名或身份证号');
        } else {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    const tempFilePaths = res.tempFilePaths
                    wx.uploadFile({
                        method: "POST",
                        url: 'https://api.gdbkyz.com/AppUser/api/ImgFile/SaveImages',
                        filePath: tempFilePaths[0],
                        name: 'file',
                        success: function (res) {
                            let data = JSON.parse(res.data)
                            if (res.statusCode == 200) {
                                that.setData({
                                    patientImg: data.ResultMsg,
                                    attestation: true
                                })
                            }
                        }
                    })
                }
            })
        }
        return true;

    },
    //取消订单
    onOderderOff() {
        request({
            url: 'NurseOrder/BillOrderFailed',
            data: {
                orderId: this.data.orderId,
            }
        }).then(res => {
            console.log(res);

        })
    },

    // 下一步
    onNextStep() {
        let that = this
        let arriveImg = that.data.arriveImg
        let patientImg = that.data.patientImg
        let {
            tabs
        } = this.data;
        if (!this.data.arriveClock) {
            Toast.fail('请先打卡');
            // } else if (!this.data.attestation) {
            //     Toast.fail('请先实名认证');
        } else {
            let imgsArr = []
            imgsArr.push(arriveImg)
            imgsArr.push(patientImg)
            request({
                method: 'POST',
                url: 'NurseOrder/TwoConfirm',
                data: {
                    orderId: this.data.orderId,
                    location: that.data.arriveAddress,
                    baseImg: imgsArr.join(','),
                    patientName: that.data.patientName,
                    idenNo: that.data.idenNo,
                    Score: '',
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode == 0) {
                    //  实名认证成功
                    tabs[2].isShow = false
                    tabs[3].isActive = true
                    tabs[3].isShow = true
                    that.setData({
                        isArrive: true
                    })
                } else {
                    Toast.fail('出了一点问题，请稍后再试');
                }
            })
            this.setData({
                tabs
            })
        }

    },
    radioChangeGmyw: function (e) {
        this.setData({
            gmywsw: e.detail.value
        })
    },
    radioChangeXlzt: function (e) {
        this.setData({
            xlzt: e.detail.value
        })
    },
    radioChangeXy: function (e) {
        this.setData({
            xy: e.detail.value
        })
    },
    radioChangeYj: function (e) {
        this.setData({
            yj: e.detail.value
        })
    },
    radioChangeDxb: function (e) {
        this.setData({
            dxb: e.detail.value
        })
    },
    radioChangeYszt: function (e) {
        this.setData({
            yszt: e.detail.value
        })
    },
    radioChangeZznl: function (e) {
        this.setData({
            zznl: e.detail.value
        })
    },
    radioChangePgdj: function (e) {
        this.setData({
            pgdj: e.detail.value
        })
    },
    radioChangeHldj: function (e) {
        this.setData({
            hldj: e.detail.value
        })
    },
    //验证 患者姓名
    onChangeName(e) {
        this.setData({
            patientName: e.detail
        })
    },
    onChangeOpinion(e){
     this.setData({
            opinion: e.detail
        })
    },
    //护理记录
    onChangeMeasures(e) {
        this.setData({
            measures: e.detail
        })
    },
    onChangeEvaluate(e) {
        this.setData({
            evaluate: e.detail
        })
    },
    // 身份证
    onChangeCode(e) {
        console.log(e)
        this.setData({
            idenNo: e.detail
        })
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
        let that = this
        request({
            method: "POST",
            url: 'NurseOrder/OrderSuccess',
            data: {
                orderId: this.data.orderId,
                location:that.data.safetyAddress,
                baseImg: that.data.safetyImg,
                patientName: '',
                idenNo: '',
                Score: '',
            }
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == 0) {
                that.setData({
                    safetyClock: true,
                    isSafety: true
                })
            } else {
                console.log(res.data.ResultMsg);
            }
        })
    },
    // 护理结束
    onNurseEnd() {
        let that = this
        let {
            tabs
        } = this.data;
        if (!this.data.nurseBeforeClock || !this.data.nurseEndClock) {
            Toast.fail('请先打卡');
            } else if (this.data.measures=='' || this.data.evaluate=='') {
                Toast.fail('请填写护理记录');
        } else {
            tabs[4].isShow = false
            tabs[5].isActive = true
            tabs[5].isShow = true
            this.setData({
                tabs
            })
            let addressArr = []
            addressArr.push(that.data.nurseAddress)
            let imgArr = []
            imgArr.push(that.data.nurseBeforeImg)
            imgArr.push(that.data.nurseEndImg)
            request({
                method: 'POST',
                url: 'NurseOrder/ThreeConfirm',
                data: {
                    orderId: this.data.orderId,
                    location: addressArr.join(','),
                    baseImg: imgArr.join(','),
                    patientName: '',
                    idenNo: ''
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode == 0) {
                    that.setData({
                        isNurseEnd: true
                    })
                } else {
                    console.log(res.data.ResultMsg);
                }
            })
            request({
                url: 'NurseOrder/OrderRecord',
                data: {
                    orderId: 2,
                    Measures: that.data.measures,
                    Record: that.data.evaluate,
                }
            }).then(res => {
                console.log(res);
                if (res.data.ResultCode === '0') {
                    that.setData({
                        isNurseEnd: true
                    })
                }
            })
        }
        return true
    },
    // 开始护理
    onNurse() {
        let that = this
        let {
            tabs
        } = that.data;
      if (!this.data.gmywsw) {
        Toast.fail('请选择过敏药物食物');
      }else if(!this.data.xlzt){
        Toast.fail('请选择心理状态');
      } else if (!this.data.xy ||!this.data.yj || !this.data.dxb) {
        Toast.fail('请先勾选');
      } else if (!this.data.yszt) {
        Toast.fail('请选择意识状态');
      } else if (!this.data.zznl) {
        Toast.fail('请选择自主能力');
      } else if (!this.data.pgdj) {
        Toast.fail('请选择评估等级');
      } else if (!this.data.hldj) {
        Toast.fail('请选择护理等级');
      }
      else{
        request({
          url: 'NurseOrder/NurseDetail',
          data: {
            orderId: this.data.orderId,
            gmywsw: that.data.gmywsw,
            xlzt: that.data.xlzt,
            xy: that.data.xy,
            yj: that.data.yj,
            dxb: that.data.dxb,
            yszt: that.data.yszt,
            zznl: that.data.zznl,
            pgdj: that.data.pgdj
          }
        }).then(res => {
          console.log(res);
            if (res.data.ResultCode === '0') {
                tabs[3].isShow = false
                tabs[4].isActive = true
                tabs[4].isShow = true
                that.setData({
                    tabs,
                    isPinggu: true
                })
            }
        })
      }
  
    },

    // 准备完成
    onPrepare() {
        let {
            tabs
        } = this.data;
      if (!this.data.goOutClock) {
        Toast.fail('请先打卡');
      }else{
        tabs[1].isShow = false
        tabs[2].isActive = true
        tabs[2].isShow = true
        let that = this
        request({
            method: 'POST',
            url: 'NurseOrder/OneConfirm',
            data: {
                orderId: this.data.orderId,
                location: that.data.goOutAddress,
                baseImg: that.data.goOutImg,
                patientName: '',
                idenNo: ''
            }
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == '0') {
                that.setData({
                    arriveClock: true,
                    isGoOut: true
                })
            } else {
                console.log(res.data.ResultMsg);
            }
        })
        this.setData({
          tabs
        })
      }
     
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
        let id = options.id
        let infolist =this.data.infolist
        this.setData({
            orderId: id
        })

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