// pages/uploadmycard/uploadmycard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    uploaderList1: [],
    uploaderNum1:0,
    showUpload1:true,
    certificateList: [],
    certificateNum: 0,
    certificateShowUpload: true
  },
 // 删除身份证正面图片
 clearImg:function(e){
  var nowList = [];//新数据
  var uploaderList = this.data.uploaderList;//原数据
  for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
          continue;
      }else{
          nowList.push(uploaderList[i])
      }
  }
  this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
  })
},
//展示身份证正面图片
showImg:function(e){
  var that=this;
  wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
  })
},
//上传身份证正面图片
upload: function(e) {
  var that = this;
  wx.chooseImage({
      count: 1 - that.data.uploaderNum, // 默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length==1){
              that.setData({
                  showUpload:false
              })
          }
          that.setData({
              uploaderList: uploaderList,
              uploaderNum: uploaderList.length,
          })
      }
  })
},
// 删除身份证反面图片
clearImg1:function(e){
 var nowList = [];//新数据
 var uploaderList = this.data.uploaderList1;//原数据
 for (let i = 0; i < uploaderList.length;i++){
     if (i == e.currentTarget.dataset.index){
         continue;
     }else{
         nowList.push(uploaderList[i])
     }
 }
 this.setData({
     uploaderNum1: this.data.uploaderNum1 - 1,
     uploaderList1: nowList,
     showUpload1: true
 })
},
//展示身份证反面图片
showImg1:function(e){
 var that=this;
 wx.previewImage({
     urls: that.data.uploaderList1,
     current: that.data.uploaderList1[e.currentTarget.dataset.index]
 })
},
//上传身份证反面图片
upload1: function(e) {
 var that = this;
 wx.chooseImage({
     count: 1 - that.data.uploaderNum1, // 默认1
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function(res) {
         console.log(res)
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         let tempFilePaths = res.tempFilePaths;
         let uploaderList = that.data.uploaderList1.concat(tempFilePaths);
         if (uploaderList.length==1){
             that.setData({
                 showUpload1:false
             })
         }
         that.setData({
             uploaderList1: uploaderList,
             uploaderNum1: uploaderList.length,
         })
     }
 })
},
// 删除证书图片
certificateClearImg:function(e){
 var nowList = [];//新数据
 var uploaderList = this.data.certificateList;//原数据
 for (let i = 0; i < uploaderList.length;i++){
     if (i == e.currentTarget.dataset.index){
         continue;
     }else{
         nowList.push(uploaderList[i])
     }
 }
 this.setData({
      certificateNum: this.data.certificateNum - 1,
      certificateList: nowList,
      certificateShowUpload: true
 })
},
//展示证书图片
certificateShowImg:function(e){
 var that=this;
 wx.previewImage({
     urls: that.data.uploaderList1,
     current: that.data.uploaderList1[e.currentTarget.dataset.index]
 })
},
//上传证书图片
certificateUpload: function(e) {
 var that = this;
 wx.chooseImage({
     count: 1 - that.data.certificateNum, // 默认1
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function(res) {
         console.log(res)
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
         let tempFilePaths = res.tempFilePaths;
         let uploaderList = that.data.certificateList.concat(tempFilePaths);
         that.setData({
          certificateList: uploaderList,
          certificateNum: uploaderList.length,
          certificateShowUpload:false
         })
     }
 })
},
//点击按钮增加上传证书
certificateAdd: function (e) {
  this.setData({
    certificateShowUpload: true
  })
},
    submitThis () {
        wx.navigateTo({
        url: '../submitresult/submitresult',
        })
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