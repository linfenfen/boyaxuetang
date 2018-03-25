// pages/dingdan/dingdan.js
import { DBFunc } from "../../pages/js/DBFunc";
const URL = 'https://www.boyaxuetang.top/boya'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    class:{},
    price:0,
    dingdan:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const classId = options.classId;
    const userId = options.userId;
    const _this = this;
    //查询课程
    wx.request({
      url: URL +'/class/queryById',
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        classId: classId
      },
      success: res => {
        this.setData({
          class: res.data.data.class
        })
      }
    })
    //查询订单
    wx.request({
      url: URL +'/userSelectionClassMap/query',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        classId:classId,
        userId:userId
      },
      success:res =>{
        _this.setData({
          dingdan: res.data.data.userSelectionClassMap
        })
        if (res.data.data.userSelectionClassMap.isGroup == 0) {
          _this.setData({
            price: _this.data.class.singlePrice
          })
        }else{
          _this.setData({
            price:_this.data.class.groupPrice
          })
        }
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
  //不返回的跳转
  onJump(event) {
    const url = event.currentTarget.dataset.url;
    const flag = event.currentTarget.dataset.flag;
    if (flag) {
      this.dbFunc.jumpToNotBack(url);
    }
  },
  //调起支付接口
  pay(event){
    const user = wx.getStorageSync('user');
    const _this = this;
    wx.request({
      url: URL +'/payment/getPaySign',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data:{
        userId:user.id,
        selectionMapId:this.data.dingdan.id
      },
      success:res =>{
        console.log(res);
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:2000
        })


        const param = res.data.data.sign;
        wx.requestPayment({
          timeStamp: param.timeStamp,
          nonceStr: param.nonceStr,
          package: param.package,
          signType: 'MD5',
          paySign: param.paySign,
          success: function (res) {
            console.log("支付成功：" + res.errMsg);
            // success
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function (res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              fail: function (res) {
                // fail
                wx.showToast({
                  title: res+'失败',
                  icon: 'none',
                  duration: 2000
                })
                console.log(res);
              },
              complete: function () {
                // complete
              }
            })
          },
          fail: function (res) {
            // fail
            console.log(res);
          },
          complete: function () {
            // complete
          }
        })
      }
    })
  }
})