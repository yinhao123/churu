// pages/arealist/arealist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  /**
   * 跳转到二维码页面
   */
  navToQrcodeInfoPage: function(){
    wx.navigateTo({
      url: '/pages/qrcode/qrcode',
    })
  },
  /**
   * 跳转到社区信息
   */
  navToAreaInfoPage: function(){
    // 从这一页进去之后隐藏掉社区信息的保存按钮
    wx.navigateTo({
      url: '/pages/areainfo/areainfo?show=false',
    })
  },
  /**
   * nav to navaToUserListPage
   */
  navaToUserListPage:function() {
    wx.navigateTo({
      url: '/pages/userlist/userlist',
    })
  },
  /**
   * 跳转到用户出入日志
   */
  navToRecordPage:function() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  }


})