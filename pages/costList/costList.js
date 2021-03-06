// pages/costList/costList.js
import Dialog from 'vant-weapp/dialog/dialog';
const {
  request
} = require("../../utils/request")
let costList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveCost1: 10,
    cost1: 10,
    costValue1: 1,
    list: '',
    orderId: '',
    unitList: [],
    allCost: ''
  },
  onChange(event) {
    // let list1 = this.data.list
    // let index = event.currentTarget.dataset['index']
    // list1[index].amount = event.detail
    // this.setData({
    //   list: list1
    // })
  },
  addChange(e) {
    let price = e.currentTarget.dataset['price']
    let amount = e.currentTarget.dataset['amount']
    let index = e.currentTarget.dataset['index']
    let list1 = this.data.list
      
    let saveCost1 = costList[index].Money
    list1[index].amount = amount+1
    let cost = Number(price) + Number(saveCost1)
     let allCost = 0
     for (let i in list1) {
         allCost += Number(list1[i].Money) * list1[i].amount
     }
    // list1[index].Money = cost
    // costList = list1
    
    this.setData({
      cost1: cost,
      list: list1,
      allCost
    })
    console.log(allCost);
    
    console.log(this.data.list);
    // this.getUnitList()
  },
  cutChange(e) {
    let price = e.currentTarget.dataset['price']
    let amount = e.currentTarget.dataset['amount']
    let index = e.currentTarget.dataset['index']
    let saveCost1 = costList[index].Money
    let list1 = this.data.list
    list1[index].amount = amount-1
    let cost = Number(price) - Number(saveCost1)
        let allCost = 0
        for (let i in list1) {
            allCost += Number(list1[i].Money) * list1[i].amount
        }
    // list1[index].Money = cost
    // costList = list1
    this.setData({
      cost1: cost,
      list: list1,
      allCost
    })
  },
  getUnitList () {
    request({
        url: 'NurseOrder/GetUnitList',
        data: {orderId:  this.data.orderId}
    }).then(res => {
        // if (res.data.ResultCode === '0') {
          let arr = []
          let unitList = []
          let allCost = 0
          for (let i in res.data.UnitList) {
            let obj = res.data.UnitList[i]
            obj.amount = 0
            arr.push(obj)
            allCost += Number(res.data.UnitList[i].Money) * obj.amount
            costList.push(res.data.UnitList[i].Money)
            unitList.push(res.data.UnitList[i].UnitNo)
          }
          this.setData({
            list: arr,
            unitList: unitList,
            allCost
          })
          console.log(this.data.allCost);
          
          costList = arr
        // }
    })
  },
  submit () {
    let unitLists = []
    for (let i in this.data.list) {
      let item = this.data.list[i]
      if (item.amount >= 1) {
        for (let k = 0; k < item.amount; k ++) {
          unitLists.push(item.UnitNo)
        }
      }
    }
    if (unitLists.length == 0) {
      wx.showToast({
        title: '请至少选择一项数量不为零的项目',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Dialog.confirm({
      title: '',
      message: '是否确定增加缴费项目'
    }).then(() => {
      let params = wx.getStorageSync("hlpinggu")
      request({
          url: 'NurseOrder/NurseAssessment',
          data: params
      }).then(res => {
          console.log(res);
          wx.removeStorageSync("hlpinggu")
          if (res.data.ResultCode === '0') {
            request({
              url: 'NurseOrder/GetUnitMoney',
              data: {visitNo: unitLists.join(',')}
            }).then(res => {
                if (res.data.ResultCode === '0') {
                  request({
                    url: 'NurseOrder/CreateBillOrder',
                    data: {
                      visitNo: unitLists.join(','),
                      orderId: this.data.orderId,
                      recipeSeq: '',
                      prescMoney: res.data.SumMoney,
                      Remark: ''
                    }
                  }).then(res => {
                      if (res.data.ResultCode === '0') {
                        wx.showToast({
                          title: '提交成功',
                          icon: 'success',
                          duration: 2000,
                          success: function () {
                            wx.switchTab({
                              url: '../index/index'
                            })
                          }
                        })
                        
                      } else {
                        wx.showToast({
                          title: '提交失败',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                  })
                } else {
                  wx.showToast({
                    title: '提交失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
            })
          } else {
              Toast.fail(res.data.ResultMsg);
          }
      })
    }).catch(() => {
      // on cancel
    });
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
      // orderId: 38
    })
    this.getUnitList()
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