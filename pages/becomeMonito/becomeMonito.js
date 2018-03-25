// pages/becomeMonito/becomeMonito.js
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
      userCenter: true
    },
    //擅长领域
    rangeArr: ["a", "b"],
    rangeIndex:0,
    //达人或机构
    arr:["达人","机构"],
    index:0,
    yes:false,
    user:{},
    bindImage:"",
    name:"",
    tel:"",
    description:"",
    experience:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    const user = wx.getStorageSync('user')
    this.setData({
      user: user
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
    if (flag) {
      this.dbFunc.jumpToNotBack(url);
    }
  },
  //添加头像
  addImage(){
    const _this=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:res =>{
        console.log("选择图片")
        _this.dbFunc.uploadImage(URL, res, _this.bindImage)
      }
    })
  },
  //绑定已选择的头像
  bindImage(res){
    //返回的服务器图像路径
    const imgUrl = JSON.parse(res.data).data.imagePath;
    this.setData({
      bindImage:imgUrl
    })
    console.log("设置图片成功")
  },
  //擅长领域的选择更改 普通选择器的点击事件
  bindPickerChange: function (e) {
    this.setData({
      rangeIndex: e.detail.value
    })
  },
  //几个输入的绑定数据，防止空字符串传入后台
  nameInput(event){
    this.setData({
      name: event.detail.value
    })
  },
  telInput(event) {
    this.setData({
      tel: event.detail.value
    })
  },
  descriptionInput(event){
    this.setData({
      description: event.detail.value
    })
  },
  experienceInput(event) {
    this.setData({
      experience: event.detail.value
    })
  },
  //同意法律声明
  agree(event){
    this.setData({
      yes:!this.data.yes
    });
  },
  //提交表单
  formSubmit(event){
    const formData=event.detail.value;
    const _this=this;
    wx.request({
      url: URL +'/user/applyTeacher',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:formData,
      success:res =>{
        console.log(res);
        //提交成功后需要更改用户信息，状态改为2
        _this.setData({
          user:res.data.data.user
        })
        wx.setStorageSync('user', res.data.data.user)
        wx.showToast({
          title: res.data.msg,
          icon:'success'
        })
      },
      fail:res=>{
        wx.showToast({
          title: res,
        })
        console.log(res);
      }
    })
  }
})