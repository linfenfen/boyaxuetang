// pages/publishClass/publishClass.js
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
    rangeArr: ["a", "b"],
    rangeIndex: 0,
   //是否拼课
    yes:false,
    user:{},
    teacher:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    const _this =this;
    const user = wx.getStorageSync('user');
    this.setData({
      user:user
    })
    wx.request({
      url: URL +'/teacher/getByUserId',
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        userId:user.id
      },
      success:res=>{
        _this.setData({
          teacher:res.data.data.teacher
        })
      },
      fail:res=>{
        console.log(res)
      }
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
  agree(event){
    this.setData({
      yes:!this.data.yes
    })
  },
  formSubmit(event){
    const formData = event.detail.value;
    console.log(formData);
    wx.request({
      url: URL +'/class/releaseClass',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:formData,
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '发布课程成功，等待审核',
        })
        wx.navigateTo({
          url: '/pages/userCenter/userCenter',
        })
      },
      fail:res=>{
        console.log(res);
        wx.showToast({
          title: '发布课程成功，等待审核',
          icon:'none'
        })
      }
    })
  }
})