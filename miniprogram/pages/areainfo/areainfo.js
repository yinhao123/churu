// pages/areainfo/areainfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['北京市', '北京市', '海淀区'],
    address: '',
    phonenumber:'',
    linkperson:'',
    name:'',
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("登录记录");
    wx.showToast({
      title: '请先授权',
      icon: 'none',
      duration: 2000
    });
    console.log(getApp().globalData.logged);
    if (!getApp().globalData.logged) {
      wx.navigateTo({
        url: '/pages/loginwx/loginwx',
      })
    }
   // console.log("show : " + options.show);
    if(!options.show){
      this.setData({
        show: options.show
      })
    }
    var areainfo = getApp().globalData.areainfo;
    // 判断 如果 areainfo未定义 则跳过去这一块
    if (typeof areainfo != "undefined"){
      console.log("status" + getApp().globalData.areainfo.status);
      console.log(getApp().globalData.areainfo.address);

      this.setData({
        region: areainfo.city ? areainfo.city : '',
        address: areainfo.address ? areainfo.address : '',
        phonenumber: areainfo.phonenumber ? areainfo.phonenumber : '',
        linkperson: areainfo.linkperson ? areainfo.linkperson : '',
        name: areainfo.name ? areainfo.name : ''
      })
    }
 
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
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    const db = wx.cloud.database();
    db.collection('system_area').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        city: e.detail.value.city,
        address: e.detail.value.address,
        phonenumber: e.detail.value.phonenumber,
        linkperson: e.detail.value.linkperson,
        name: e.detail.value.name,
        date: new Date(),
        status: 1
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        if(res.errMsg == "collection.add:ok"){
          wx.showModal({
            showCancel:false,
            content: '提交成功',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
                // 提交成功，返回到上一页
                wx.switchTab({
                  url: '/pages/arealist/arealist'
                })
              }
            }
          })
        
        }
      }
    });

    wx.cloud.callFunction({
      name: "adduserinfo",
      data: {
        username: e.detail.value.username,
        idcard: e.detail.value.idcard,
        phonenumber: e.detail.value.phonenumber,
        address: e.detail.value.address,
        carnumber: e.detail.value.carnumber,
        name: e.detail.value.name
      }
      
    })
  },
 

})