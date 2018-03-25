// pages/myClass/myClass.js
import { DBFunc } from "../../pages/js/DBFunc";
import {data} from "../../pages/js/data.js";
const URL ='https://www.boyaxuetang.top/boya';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //选项0或者1
    selectNum:0,
    classData:[],
    //付了但未上的课程
    haveClass:[],
    //已上课程
    hadClass:[],
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
    const user = wx.getStorageSync('user');
    const _this = this;
    //支付未上的课程
    wx.request({
      url: URL +'/userSelectionClassMap/queryList',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        userId:user.id,
        isEnd: 0
      },
      success:res=>{
        console.log(res);
        _this.setData({
          haveClass:res.data.data.classList
        })
      }
    })
    //支付已上的课程
    wx.request({
      url: URL + '/userSelectionClassMap/queryList',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        userId: user.id,
        isEnd: 1
      },
      success: res => {
        _this.setData({
          hadClass: res.data.data.classList
        })
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
  },
  //添加头像
  addImage() {
    const _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log("选择图片")
        _this.dbFunc.uploadImage(URL, res)
      }
    })
  },
})