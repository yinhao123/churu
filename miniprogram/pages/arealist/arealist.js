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
    this.setLoginStatus();
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
   // console.log("this is arealist show methods");
  //  this.loginStatus();
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
  //  this.loginStatus();
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
    console.log(getApp().globalData.loginstatus);
    console.log("=============================");
    console.log(typeof (getApp().globalData.loginStatus) == 'undefined');

    if (typeof(getApp().globalData.loginStatus) == 'undefined') {
      wx.showModal({
        content: '请先登记您的小区信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            console.log("app.js 跳转到areainfo")
            wx.navigateTo({
              url: '/pages/areainfo/areainfo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消');

          }
        }
      })

    } else {
      wx.navigateTo({
        url: '/pages/qrcode/qrcode',
      })
    }
  
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
    console.log(getApp().globalData.loginstatus);
    if (typeof(getApp().globalData.loginstatus) == 'undefined') {
      wx.showModal({
        content: '请先登记您的小区信息',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            console.log("app.js 跳转到areainfo")
            wx.navigateTo({
              url: '/pages/areainfo/areainfo',
            })
          } else if (res.cancel) {
            console.log('用户点击取消');

          }
        }
      })

    }else{
      wx.navigateTo({
        url: '/pages/record/record',
      })
    }
   
  },
  /**
   * 控制管理状态的函数 
   */
  loginStatus: function () {

    // 首先获取数据验证当前用户是否已经填写小区信息
    var localOpenid = getApp().globalData.openid;
    console.log("Get openid");
    console.log(localOpenid);
    const db = wx.cloud.database();
    db.collection('system_area').where({
      _openid: localOpenid,
    }).
      get({
        success: function (res) {
          console.log(res.data);
          // 判断如果的出的是空数组，则证明该用户没有设置小区信息
          if(res.data.length != 0){
            // 保存登录信息
            getApp().globalData.loginstatus = true;
          }
          console.log(res.data.length);
          if (res.data.length == 0) {
            console.log("nav to areainfo");
            // wx.navigateTo({
            //   url: '/pages/areainfo/areainfo',
            // })
          } else {
            if (res.data[0].status == 1) {
              console.log("nav to listinfo");
              getApp().globalData.areainfo = res.data[0];
              console.log("globalData" + getApp().globalData.areainfo);
              wx.navigateTo({
                url: '/pages/arealist/arealist',
              })
            } else {
              console.log("nav to areainfo");
              wx.navigateTo({
                url: '/pages/areainfo/areainfo',
              })
            }
          }


        }
      });
  },
/**
 * 切换到arealist后先获取到小区的信息，设置为true
 */
setLoginStatus: function(){

  // 首先获取数据验证当前用户是否已经填写小区信息
  var localOpenid = getApp().globalData.openid;
  console.log("Get openid");
  console.log(localOpenid);
  const db = wx.cloud.database();
  db.collection('system_area').where({
    _openid: localOpenid,
  }).
    get({
      success: function (res) {
        console.log(res.data);
        // 判断如果的出的是空数组，则证明该用户没有设置小区信息
        if (res.data.length != 0) {
          // 保存登录信息
          getApp().globalData.loginstatus = true;
        }
        console.log("登录结果：" + getApp().globalData.loginstatus);
      }
    });
}

})