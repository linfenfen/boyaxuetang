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
    rangeArr: [],
    rangeIndex: 0,
   //是否拼课
    yes:false,
    user:{},
    teacher:{},
    pic:'',
    begindate:'',
    begintime:'',
    enddate:'',
    endtime:'',
    startDate:'',
    //input 绑定的一些数据
    className:'',
    classRoom:'',
    singlePrice:'',
    numberLimit:'',
    maxNumber:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbFunc = new DBFunc();
    const _this =this;
    const user = wx.getStorageSync('user');
    const classType = wx.getStorageSync('classType');
    //获取日期
    const data = new Date();
    const startDate = data.toLocaleDateString();
    this.setData({
      user:user,
      rangeArr:classType,
      startDate: startDate
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
  //选择器
  bindPickerChange(e){
    this.setData({   
      rangeIndex: e.detail.value
    })
  },
  bindDateChange(e){
    const flag = e.currentTarget.dataset.flag;
    if(flag==1){
      //flag=1代表开课时间
      this.setData({
        begindate: e.detail.value
      })
    }else{
      this.setData({
        enddate: e.detail.value
      })
    }
  },
  bindTimeChange(e){
    const flag = e.currentTarget.dataset.flag;
    if (flag == 1) {
      //时间不能比开课时间早
      const begin = this.data.begindate + e.detail.value;
      const end = this.data.enddate + this.data.endtime;
      this.setData({
        begintime: e.detail.value
      })
    } else {
      //时间不能比开课时间早
      const begin = this.data.begindate + this.data.begintime;
      const end = this.data.enddate + e.detail.value;
      if (begin > end) {
        this.setData({
          endtime: ''
        })
      } else {
        this.setData({
          endtime: e.detail.value
        })
      }
    }
  },
  //绑定的input事件
  classNameInput(event){
    this.setData({
      className:event.detail.value
    })
  },
  classRoomInput(event) {
    this.setData({
      classRoom: event.detail.value
    })
  },
  singlePriceInput(event) {
    this.setData({
      singlePrice: event.detail.value
    })
  },
  numberLimitInput(event) {
    this.setData({
      numberLimit: event.detail.value
    })
  },
  maxNumberInput(event) {
    this.setData({
      maxNumber: event.detail.value
    })
  },
  //添加图片
  addImage() {
    const _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        console.log("选择图片")
        _this.dbFunc.uploadImage(URL, res, _this.bindImage)
      }
    })
  },
  //绑定已选择的图片
  bindImage(res) {
    //返回的服务器图像路径
    const imgUrl = JSON.parse(res.data).data.imagePath;
    this.setData({
      pic: imgUrl
    })
    console.log("设置图片成功")
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