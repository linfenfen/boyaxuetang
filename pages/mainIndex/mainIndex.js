// pages/mainIndex/mainIndex.js
import {DBFunc} from "../../pages/js/DBFunc";
// import {data} from "../../pages/js/data";
const URL = 'https://www.boyaxuetang.top/boya'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //课程分类
    classTypeData:[],
    //热门课程
    classData:[],
    navigationUrl: {
      findClass: false,
      myClass: true,
      userCenter:true
    },
    //当前选择的分类
    nowType:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    //获取课程分类 先查询本地是否有保存课程信息
    const classTypeData = wx.getStorageSync('classType');
    //获取热门课程 先查询本地是否有保存课程信息
    const classData = wx.getStorageSync('hotClassList');
    console.log(classData);
    this.setData({
      classTypeData: classTypeData,
      classData: classData
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
  //不返回的跳转
  onJump(event){
    const url=event.currentTarget.dataset.url;
    const flag =event.currentTarget.dataset.flag;
    if(flag){
      this.dbFunc.jumpToNotBack(url);
    }
  },
  //返回的跳转
  onJumpBack(event){
    const url=event.currentTarget.dataset.url;
    this.dbFunc.jumpToBack(url);
  },
  chooseType(event){
    this.setData({
      nowType: event.currentTarget.dataset.id
    })
  }
})