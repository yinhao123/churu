// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database();
   var rList = {};
   try{
     return await db.collection('system_record').aggregate()
       .lookup({
         from: 'system_user',
         localField: '_openid',
         foreignField: '_openid',
         as: 'recordLists',
       })
       .end()
   }catch(err){
    console.log(err);
   }  
 
    //   .then(res => { console.log(res); return res;})
    // .catch(err => console.error(err));
  // return {
  //   rList,
  //   event
  // }
}