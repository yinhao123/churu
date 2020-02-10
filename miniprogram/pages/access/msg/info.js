// pages/access/msg/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      res:'',
      userinfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var _id = options.id;
    console.log("_id :"+_id);
    const db = wx.cloud.database();
    db.collection('system_record').doc(_id).get({
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        // 根据id查询出来用户名
        db.collection('system_user').where({
          _openid:res.data._openid
        }).get({
          success:function(res){
            console.log(res);
            _this.setData({
              userinfo:res.data[0]
            })
          }
        })
        _this.setData({
          res:res
        })
      }
    });
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
   * 返回到首页
   */
  navToIndexPage:function(){
      wx.navigateTo({
        url: '/pages/center/center',
      })
  }
})