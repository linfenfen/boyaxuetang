// pages/myClass/myClass.js
import { DBFunc } from "../../pages/js/DBFunc";
import {data} from "../../pages/js/data.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选项0或者1
    selectNum:0,
    classData:[],
    navigationUrl:{
      findClass:true,
      myClass:false,
      userCenter:true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    this.setData({
      classData:data
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
  onJump(event) {
    const url = event.currentTarget.dataset.url;
    const flag = event.currentTarget.dataset.flag;
    if (flag) {
      this.dbFunc.jumpToNotBack(url);
    }
  },
  //切换tab
  onSelectTab(event){
    const id=event.currentTarget.dataset.id;
    this.setData({
      selectNum:id
    })
  }
})