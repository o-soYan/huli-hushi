// pages/forgetPwdO/forgetPwdO.js
const {
  request
} = require("../../utils/request")

import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    phone: ''
  },

  onChangeName(event) {
    // event.detail 为当前输入的值
    this.setData({
        userName: event.detail
    });
  },
  onChangePhone(event) {
    // event.detail 为当前输入的值
    this.setData({
      phone: event.detail
    });
  },
  formSubmit() {
    let that = this
    let phoneRes = /^1(3|4|5|6|7|8|9)\d{9}$/
    if (that.data.userName == "" || that.data.userName == null || that.data.userName == undefined) {
        Toast.fail('请输入用户名');
        return
    } else if (that.data.phone == '') {
        Toast.fail('请输入手机号');
        return
        //  } else if (that.data.sms == '') {
        //      Toast.fail('请输入验证码');
    } else if (!phoneRes.test(this.data.phone)) {
        Toast.fail('手机号码格式不正确');
        return
    } else {
        request({
            method: "POST",
            url: 'NurseRegister/ValidAccount',
            data: {
                UserName: that.data.userName,
                Phone: that.data.phone,
                NurseId: '',
                OldPassword: '',
                NewPassword: '',
            }
        }).then(res => {
            console.log(res);
            if (res.data.ResultCode == 1) {
                wx.showToast({
                    title: "认证成功",
                    icon: 'success',
                    duration: 3000,
                    success: function () {
                        wx.navigateTo({
                            url: '../fogetPwdT/forgetPwdT?id=' + res.data.row,
                        })
                    }
                })
            } else {
                Toast.fail(res.data.Message);
                return false
            }
        })
    }
    return true;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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