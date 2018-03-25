class DBFunc{
  construct(){

  }
  //导航跳转链接
  jumpToNotBack(url){
    wx.reLaunch({
      url: url,
      fail(){
      }
    })
  }
  jumpToBack(url) {
    wx.navigateTo({
      url: url,
    })
  }
  //上传图片
  uploadImage(URL,res,func){
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    var tempFilePath = res.tempFilePaths[0]
    var tempFile = res.tempFiles[0]
    //先上传图片
    wx.uploadFile({
      url: URL + '/util/uploadImage',
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      name: 'image',
      filePath: tempFilePath,
      success: res => {
        console.log("上传图片成功")
        console.log(res);
        func(res)
      }
    })
  }
}
export { DBFunc }