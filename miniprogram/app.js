//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.onGetOpenid();
    this.authorize();
    this.globalData = {
      loginStatus:false,
      logged:false
    }
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.globalData.openid = res.result.openid
       
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      
      }
    })
  },

   base64src:function(base64data, cb) {
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
    if(!format) {
      return (new Error('ERROR_BASE64SRC_PARSE'));
    }
     const filePath = `${wx.env.USER_DATA_PATH}/${'tmp_base64src'}.${format}`;
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
  },

  /**
  * 登录状态
  */
  checkLoginStatus: function () {
    // 如果已经登录，则放行，如果未登录则跳转到添加到社区信息页面
    console.log(this.globalData.loginStatus);
    if (typeof(this.globalData.loginStatus) == 'undefined'){
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
            console.log('用户点击取消')
          }
        }
      })
     
    }
  },
  /**
   * 检查授权状态
   */
  authorize:function(){
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("授权未失效");
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log("授权已经失效");
        wx.login() //重新登录
      }
    })
  }


})
