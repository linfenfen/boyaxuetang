// pages/payMoney/payMoney.js
import { DBFunc } from "../../pages/js/DBFunc";
const URL = 'https://www.boyaxuetang.top/boya'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:{},
    pin:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取课程详情
    const classId = options.classId;
    const pin=options.pin;
    if(pin){
      this.setData({
        pin:pin
      })
    }
    wx.request({
      url: URL + '/class/queryById',
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        classId: classId
      },
      success: res => {
        console.log(res)
        this.setData({
          class: res.data.data.class
        })
      }
    })
    this.dbFunc = new DBFunc();
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
  },
  //选课
  chooseClass(event){
    const user=wx.getStorageSync('user');
    const _this=this;
    wx.request({
      url: URL +'/class/chooseClass',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        userId:user.id,
        classId: this.data.class.id,
        isGroup:this.data.pin
      },
      success:res=>{
        console.log(res);
        const data = res.data.userSelectionClassMap;
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:2000
        })
        console.log(res.data.msg)
        wx.redirectTo({
          url: '/pages/dingdan/dingdan?classId='+_this.data.class.id+'&&userId='+user.id,
        })
      }
    })
  }
})