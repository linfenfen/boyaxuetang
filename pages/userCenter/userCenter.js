// pages/userCenter/userCenter.js
import { DBFunc } from "../../pages/js/DBFunc";
const URL = 'https://www.boyaxuetang.top/boya'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigationUrl: {
      findClass: true,
      myClass: true,
      userCenter: false
    },
    user:{},
    modifyBoxFlag:false,
    tempUserName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    const user = wx.getStorageSync('user')
    this.setData({
      user:user
    })
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
  //跳转至
  onJump(event) {
    const url = event.currentTarget.dataset.url;
    const flag = event.currentTarget.dataset.flag;
    if(flag){
      this.dbFunc.jumpToNotBack(url);
    }
  },
  //选择图片
  chooseImg(event){
    const _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePath = res.tempFilePaths[0]
        var tempFile = res.tempFiles[0]
        //先上传图片
        wx.uploadFile({
          url: URL + '/util/uploadImage',
          method: 'POST',
          header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          name:'image',
          filePath: tempFilePath,
          success:res => {
            //返回的服务器图像路径
            const imgUrl = JSON.parse(res.data).data.imagePath;
            //上传成功后，请求调用修改用户信息接口，修改头像
            wx.request({
              url: URL + '/user/modifyUser',
              method: 'POST',
              header: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                userId: _this.data.user.id,
                image:imgUrl
              },
              success: res => {
                wx.showToast({
                  title: '修改头像成功',
                })
                //更改成功后更改本地存储与绑定
                wx.setStorageSync('user', res.data.data.user)
                _this.setData({
                  user: res.data.data.user,
                  modifyBoxFlag: false
                })
              },
              fail: res => {
                console.log("失败")
              }
            })
          }
        })
      }
    })
  },
  //更改姓名
  userName(event){
    this.setData({
      tempUserName:event.detail.value
    })
  },
  //修改用户资料
  onchangInfo(event){
    if(this.data.user.userName !== this.data.tempUserName && this.data.tempUserName != ''){
      const name = this.data.tempUserName;
      wx.request({
        url: URL + '/user/modifyUser',
        method: 'POST',
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          userId: this.data.user.id,
          userName: name
        },
        success: res => {
          wx.showToast({
            title: '更改成功',
          })
          //更改成功后更改本地存储与绑定
          wx.setStorageSync('user', res.data.data.user)
          this.setData({
            user: res.data.data.user,
            modifyBoxFlag: false
          })
        },
        fail: res => {
          wx.showToast({
            title: '更改失败',
          })
        }
      })
    }else{
      alert('名称未修改')
    }
  },
  //显示修改弹框
  showModifyBox(event){
    this.setData({
      modifyBoxFlag: true
    })
  },
  //隐藏修改弹框
  hideModifyBox(event){
    this.setData({
      modifyBoxFlag: false
    })
  }
})