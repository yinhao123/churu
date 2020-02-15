// pages/qrcode/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:'/static/image/qrcode.png',
    _openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    wx.showLoading({
      title: '获取中',
    })
    console.log("openid"+getApp().globalData.openid);
    // 可以先用当前用户信息查询scene 注：这一步其实可以省略，直接使用全局变量中的openid，这样做的好处是，可以验证该用户已经提交小区信息
    const db = wx.cloud.database();
    db.collection('system_area').where({
      _openid: getApp().globalData.openid
    })
      .get({
        success: function (res) {
          console.log(res.data[0]._id);
        _this.setData({
         _openid: res.data[0]._openid
        })
        }
      })


   
      // 请求云函数生成二维码,参数是当前用户的社区id
    console.log("scene: " + _this.data._openid);
    wx.cloud.callFunction({
      name:'qrcode',
      data:{
        scene: getApp().globalData.openid
      },
      // 成功回调
      success: function (res) {
        console.log(res.result.buffer);
        let imagebase64 = wx.arrayBufferToBase64(res.result.buffer);
        let imgUrl = 'data:image/jpg;base64,' + imagebase64;
        _this.base64src(imgUrl, res => {
          _this.setData({
            imageurl: res
          });
          wx.hideLoading();
        });
      },
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
   * 保存图片到手机
   */
  saveQrcode:function (){
    var _this = this;
    console.log("将二维码保存到手机");
    console.log(_this.data.imageurl);
    wx.saveImageToPhotosAlbum({
      filePath:_this.data.imageurl,
      success(res) {
        console.log("保存成功");
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
       }
    })
    
  },
  /**
   * 将base64格式图片转为url地址
   */
  base64src: function (base64data, cb) {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if (!format) {
      return (new Error('ERROR_BASE64SRC_PARSE'));
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${'wx_qrcode'}.${format}`;
    const buffer = wx.base64ToArrayBuffer(bodyData);
    wx.getFileSystemManager().writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success() {
        cb(filePath);
      },
      fail() {
        return (new Error('ERROR_BASE64SRC_WRITE'));
      },
    })
  }

})