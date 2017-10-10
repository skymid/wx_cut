const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropper = require('../../welCropper/welCropper.js');

console.log(device)

Page({
  data: {
  },
  onLoad: function () {
    var that = this
    // 初始化组件数据和绑定事件
    cropper.init.apply(that, [W, H]);
  },
  selectTap() {
    var that = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath)


        // 将选取图片传入cropper，并显示cropper
        that.showCropper({
          src: tempFilePath,
          sizeType: ['original', 'compressed'],   //'original' | 'compressed'(default)
          callback: (resPath) => {
            console.log("crop callback:" + resPath)
            wx.previewImage({
              current: '',
              urls: [resPath]
            })

            // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
          }
        })
      }
    })
  }
})