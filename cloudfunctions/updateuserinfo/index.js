// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const db = cloud.database();
  console.log("走一步");
  db.collection('system_user').where({
    _openid: wxContext.OPENID
  }).update({
    data: {
      username: event.username,
      idcard: event.idcard,
      phonenumber: event.phonenumber,
      address: event.address,
      carnumber: event.carnumber,
      date: new Date(),
      status: 1
    },
    success:function(res){
      console.log("修改数据库");
      console.log(res);
    }
  })

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}