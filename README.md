# 出入管理小程序
线上小程序微信搜索：智云出入管理


## 本项目时间已较久，不在维护。感谢关注。
为了方便社区人员出入门岗登记流程，减少人员接触，开发了这个小程序。出入人员可通过微信扫码进入到填表界面，完成填表后提交信息，方可通过门岗。

小程序使用了微信的**云开发**，可无需单独部署后端服务器运行，节省使用成本降低开发难度。单独的后端正在开发中，近期上线。

### 特点

1. 微信扫码填表，一次填写个人信息。免除每次填写个人信息烦恼。
2. 方便统计，管理员可将出入信息保存到手机。方便信息核对。
3. 完全开源免费，你可以根据自己的需求进行二开。
4. 使用微信云开发，无需单独部署后端程序，无需单独购买服务器。节省资金。

### 部署安装教程

 1. 在微信公众平台上注册小程序账号（[微信公众平台](https://mp.weixin.qq.com/ )）注册账号类型选择小程序，如果您没有公司或者个体营业执照，可以个人主体的，这个不影响此类小程序的使用。注册完成后查找一下获得appid，这个很重要。

 2. 下载微信开发者工具（[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/stable.html)），导入该项目，注意appid需要改成自己的。在本地运行没有问题后，上传即可。

 3. 代码上传后等待微信官方审核，审核时间比较短，通过后即可随时发布为正式版本。

 4. 云数据库中需要新建system_area、system_record、system_user三个集合。其中area和record两个集合权限须设置为所有用户可读，仅创建者可写。

 5. 本地调试时，提示node moudles未安装，须在终端执行"npm install wx-server-sdk"。

    

    #### 在程序开发过程中，使用到了colorUI，在此表示感谢。

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

  

