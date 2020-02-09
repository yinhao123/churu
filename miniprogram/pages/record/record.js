// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      areaid:'',// 小区id
      recordList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    var _this = this;
      // 需要根据个人openid查询出小区的areaid
    var app = getApp();  
    let openid = app.globalData.openid;
    const db = wx.cloud.database();
    db.collection('system_area').where({
      // 获取到小区的名字
      _openid:openid 
    }).get({
      success: function (res) {
        console.log(res);
        // 获取当前用的的小区id
        console.log(res.data[0]._id);
        // 通过小区的id查询记录
        db.collection('system_record').where({
          areaid: res.data[0]._id
        }).get({
          success:function(res){

           console.log( res.data);
            _this.setData({
              recordList:res.data
            })    
          }
        })
        _this.setData({
          areaid: res.data[0]._id
        })
      }
    }
    )
    wx.hideLoading();

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