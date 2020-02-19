// pages/push/push.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      record:'',
      time:'',
      date:'',
      recordList:{}

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
    this.getNewInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    watcher.close();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    watcher.close();
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
   * 获取出入最新信息
   */
  getNewInfo: function(){
    var _this = this;
    const db = wx.cloud.database()
    const watcher = db.collection('system_record')
      // 按 progress 降序
      .orderBy('_id', 'desc')
      // 取按 orderBy 排序之后的前 10 个
      .limit(10)
      .where({
        areaid: getApp().globalData.scene
      })
      .watch({
        onChange: function (res) {
          wx.playVoice({
            filePath: '/static/music/didi.mp3',
            complete() { 
              console.log("play mp3");
            }
          })
         

          console.log(res);
          console.log(res.docChanges[0]);
          console.log(res.docs); 
          
          var now = res.docChanges[0].doc.date;
          var times = _this.dateFormat("HH:MM", res.docChanges[0].doc.date);
          var dates = _this.dateFormat("YYYY-mm-dd", res.docChanges[0].doc.date);

          // 遍历结果，处理date类型
          
          for (var i in res.docs) {
            let date = _this.dateFormat("YYYY-mm-dd HH:MM", res.docs[i].date);
            res.docs[i].date = date;
          }
         
          
          _this.setData({
            record: res.docChanges[0].doc,
            recordList: res.docs.reverse(),
            time: times,
            date: dates
          })
        },
        onError: function (err) {
          console.error('the watch closed because of error', err)
        }
      })
    // ...
    // 等到需要关闭监听的时候调用 close() 方法
   
  },
  dateFormat:function (fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for(let k in opt) {
  ret = new RegExp("(" + k + ")").exec(fmt);
  if (ret) {
    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
  };
};
return fmt;
}
})