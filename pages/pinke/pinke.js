// pages/pinke/pinke.js
import { DBFunc } from "../../pages/js/DBFunc";
const URL ='https://www.boyaxuetang.top/boya';
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
    class:{},
    user:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取课程详情
    const classId = options.classId;
    const user = wx.getStorageSync('user');
    this.setData({
      user:user
    })
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
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: '来来来，团购上车啦',
      path: '/pages/pinke/pinke?classId='+this.data.class.id,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
        console.log(res);
      }
    }
  },
  onJump(event) {
    const url = event.currentTarget.dataset.url;
    const flag = event.currentTarget.dataset.flag;
    if (flag) {
      this.dbFunc.jumpToNotBack(url);
    }
  }
})