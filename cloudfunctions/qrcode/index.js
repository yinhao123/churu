const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: '74b140b45e3e5f450c38f151527c94a0',
      path:'/pages/access/access',
      isHyaline:true
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}