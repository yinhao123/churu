// miniprogram/pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    idcard:'',
    phonenumber:'',
    carnumber:'',
    address:'',
    button:'保存',
    modify:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    });

    var _openid = getApp().globalData.openid;


    if(options.info == 1){
    wx.showModal({
      content: '第一次使用，请先完善个人信息',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消');
          wx.redirectTo({
            url: '/pages/center/center'
          })
        }
      }
    })
    }else{
      // 将按钮保存为修改
      _this.setData({
        button:'修改',
        modify:true
      })
      const db = wx.cloud.database();
      db.collection('system_user').where({
        // 获取到小区的名字
        _openid: _openid
      }).get({
        success: function (res) {
          console.log(res);
          // 设置该用户信息
          _this.setData({
            username: res.data[0].username,
            idcard: res.data[0].idcard,
            phonenumber: res.data[0].phonenumber,
            carnumber: res.data[0].carnumber,
            address: res.data[0].address
          })
        }
      }
      )
    }
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

  },
  saveUserInfo:function (){
    wx.cloud.callFunction({
      name:"adduserinfo",
      // 成功回调
      complete: console.log
    })
  },
  formSubmit: function (e) {
 
    const db = wx.cloud.database();
    if(this.data.modify==false){
      db.collection('system_user').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          username: e.detail.value.username,
          idcard: e.detail.value.idcard,
          phonenumber: e.detail.value.phonenumber,
          address: e.detail.value.address,
          carnumber: e.detail.value.carnumber,
          date: new Date(),
          status: 1
        },
        success: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res)
        }
      });
    }else{
      // 通过云函数修改用户信息
      wx.cloud.callFunction({
        name:'updateuserinfo',
        data:{
          username: e.detail.value.username,
          idcard: e.detail.value.idcard,
          phonenumber: e.detail.value.phonenumber,
          address: e.detail.value.address,
          carnumber: e.detail.value.carnumber,
          date: new Date(),
          status: 1
        },
        success: function (res) {
          console.log(res);
          wx.showModal({
            content: '提交成功',
            showCancel:false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.navigateBack({
                  
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  

    wx.cloud.callFunction({
      name: "adduserinfo",
      data:{
        username:e.detail.value.username,
        idcard: e.detail.value.idcard,
        phonenumber: e.detail.value.phonenumber,
        address: e.detail.value.address,
        carnumber: e.detail.value.carnumber
      },
      // 成功回调
      complete: console.log
    })
  },
})