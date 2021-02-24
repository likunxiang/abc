<template>
<!--member/memberQrcode/memberQrcode.wxml-->
<view class="page">
	<view class="pr" :style="'width: 100%;height: 1206rpx;background: url(' + pic_url + ') no-repeat;background-size: 100% 1206rpx;'">
		<view class="save-btn fs-36" @tap="saveMaterial">保存海报</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      sid: "",
      pic_url: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShareData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getShareData() {
      this.getApp().request({
        url: this.getApp().api.default.share_data,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              sid: res.data.id
            });
            this.getQrcode();
          }
        }
      });
    },

    getQrcode() {
      this.getApp().request({
        url: this.getApp().api.default.member_share_qrcode,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          sid: this.sid
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              pic_url: res.data.pic_url
            });
          }
        }
      });
    },

    // 保存素材
    saveMaterial() {
      this.downloadFile({
        url: this.pic_url,

        success(res) {
          if (res.statusCode === 200) {
            // 保存内容为海报
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                uni.showToast({
                  title: '保存成功！',
                  icon: 'none'
                });
              },

              fail(res) {
                uni.showToast({
                  title: '保存失败！',
                  icon: 'none'
                });
              }

            });
          }
        }

      });
    }

  }
};
</script>
<style>
@import "./memberQrcode.css";
</style>