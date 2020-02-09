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
    this.globalData = {}
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
  }


})
