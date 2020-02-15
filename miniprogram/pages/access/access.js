// pages/access/access.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'',// 单位名称
      username:'', // 用户姓名
      phonenumber:'', // 手机号
      carnumber:'',// 车牌号
      address:'',
      access:'', // 申请进门or出门
      health:'', // 是否健康
      temperature:'', // 体温
      remark:'',
      access:'',
      health:'',
      sence:'',
      addUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query, options) {
    
    var _this = this;
    const scene = decodeURIComponent(query.scene) ? decodeURIComponent(query.scene):options.scene;
  
    // 需要查询出该小区的名称
   this.setData({
     sence:scene
   });
 
   console.log("scence : "+scene);
  
   // 需要获取到单位名称和用户名称
    const db = wx.cloud.database();
    db.collection('system_area').where({
      _openid:this.data.scene
    }).get({
      success: function (res) {
          console.log(res);
          // 设置小区名称
          _this.setData({
            name:res.data[0].name
          })
        getApp().globalData.scene = res.data[0]._id;
          // 预备以后可能会用
        wx.setStorage({
          key: 'area_info',
          data: res.data[0],
        })

      }
    }
    )
    var app = getApp();     

    let openid = app.globalData.openid;

    if (typeof(openid) != 'undefined')
    // 获取用户名称
    db.collection('system_user').where({
      _openid:openid
    }).get({
      success: function (res) {
        console.log(res);
        if (res.data.length != 0){
          _this.setData({
            addUserInfo:true,
            username: res.data[0].username ? res.data[0].username : '',
            phonenumber: res.data[0].phonenumber ? res.data[0].phonenumber : '',
            carnumber: res.data[0].carnumber ? res.data[0].carnumber : '',
            address: res.data[0].address ? res.data[0].address : ''
          })
        }
     
      }
    })
    // 从数据中查询该用户的数据，如果有则自动填充，如果没有则，则不做改变

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
  formSubmit: function (e) {
    const db = wx.cloud.database();
    // 判断一下，如果有用户信息，则更新，如果没有则新增，如果有则跳过
    if(this.data.addUserInfo){
      // need update
      db.collection('system_user').add({
        data:{
          name: e.detail.value.name,
          username: e.detail.value.username,
          phonenumber: e.detail.value.phonenumber,
          carnumber: e.detail.value.carnumber
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }

    
    db.collection('system_record').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: e.detail.value.name,
        username: e.detail.value.username,
        phonenumber: e.detail.value.phonenumber,
        carnumber: e.detail.value.carnumber,
        access: e.detail.value.access,
        health: e.detail.value.health,
        temperature: e.detail.value.temperature,
        remark: e.detail.value.remark,
        areaid: this.data.sence,
        access:this.data.access,
        health:this.data.health,
        date: new Date(),
        status: 1
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res);
        // 如果成功，则跳转到成功的页面，带上id
        // wx.navigateTo({
        //   url: '/pages/access/msg/info?id='+res._id,
        // });
        wx.showModal({
        //  title: '提示',
          showCancel:false,
          content: '信息提交成功',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.navigateTo({
                url: '/pages/center/center',
              })
            } 
          }
        })

      },
      fail:function(res){
        console.log(res);
        wx.navigateTo({
          url: '/pages/access/msg/fail'
        })
      }
      
    });
  },
  /**
   * 改变radio选项
   */
  changeRadio: function(e){
    console.log(e.detail.value);
    this.setData({
      access: e.detail.value
    })
  },
  changeSwitch: function(e){
    console.log(e.detail.value);
    this.setData({
      health: e.detail.value
    })
  }
})