// pages/courseDetail/courseDetail.js
import { DBFunc } from "../../pages/js/DBFunc";
const URL = 'https://www.boyaxuetang.top/boya'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试数据
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    class:{
      className:'如何过4级',
      description:'balbalabalabalaalalalalala啊发放都是该死的鬼地方鬼地方',
      classRoom:'12jiao',
      classBeginTime:'19:10',
      classEndTime:'20:00',
      status:2,
      singlePrice:10,
      isAllowGroup:1,
      groupPrice:1,
      groupNumberLimit:5,
      countNumber:5,
      numberLimit:10,
      maxNumber:50,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classId=options.classId;
    wx.request({
      url: URL +'/class/queryById',
      method:'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        classId:classId
      },
      success:res=>{
        console.log(res)
        this.setData({
          class:res.data.data.class
        })
        if (res.data.data.class.classImagePath){
          this.setData({
            movies: [{ url: (URL + "/" + res.data.data.class.classImagePath) }]
          })
        }
      }
    })
    this.dbFunc=new DBFunc();
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
  //返回的跳转
  onJumpBack(event) {
    const url = event.currentTarget.dataset.url;
    this.dbFunc.jumpToBack(url);
  }
})