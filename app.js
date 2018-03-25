//app.js
const URL = 'https://www.boyaxuetang.top/boya'
App({
  onLaunch: function () {
    //课程分类
    wx.request({
      url: URL + '/classType/list',
      method: 'GET',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: res => {
        const classTypeData = res.data.data.classTypeList
        wx.setStorage({
          key: 'classType',
          data: classTypeData
        })
      }
    })



    // 登录验证
    // wx.checkSession({
    //   success: function () {                                                                
    //     //session 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function () {
    //     //登录态过期
    //     wx.login({
    //       success: res => {
    //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //         console.log(res);
    //         if(res.code){
    //           wx.request({
    //             url: URL+'/user/login',
    //             data:{
    //               code:res.code
    //             },
    //             method:'POST',
    //             header:{'Content-Type':'application/x-www-form-urlencoded'},
    //             success:res2 =>{
    //               //登陆 调用后台接口成功
    //               //用户信息
    //               wx.setStorage({
    //                 key:'user',
    //                 data:res2.data.data.user
    //               })
    //               //热门课程
    //               wx.setStorage({
    //                 key: 'hotClassList',
    //                 data: res2.data.data.hotClassList
    //               })
    //               wx.showToast({
    //                 title: res2.data.msg,
    //               })
    //             }
    //           })
    //         }else{
    //           console.log("登陆失败"+res.errMsg)
    //         }
    //       }
    //     }) //重新登录
    //   }
    // })

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: URL + '/user/login',
            data: {
              code: res.code
            },
            method: 'POST',
            header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success: res2 => {
              //登陆 调用后台接口成功
              //用户信息
              console.log(res2);
              wx.setStorage({
                key: 'user',
                data: res2.data.data.user
              })
              //热门课程
              wx.setStorage({
                key: 'hotClassList',
                data: res2.data.data.hotClassList
              })
              wx.showToast({
                title: res2.data.msg,
              })
            }
          })
        } else {
          console.log("登陆失败" + res.errMsg)
        }
      }
    }) //重新登录



    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序获取用户信息，后续调用 wx.startRecord 接口不会弹窗询问
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }else{
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})