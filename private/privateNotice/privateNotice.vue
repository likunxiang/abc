<template>
<!--pages//private/privateNotice/privateNotice.wxml-->
<view class="page">
	<view class="p-20">
		<view class="private-notice bg-white mb-20">
			<view class="p-20 border-bottom fs-28 color-2C2C2C ns-text-bold">
				<view>店铺公告</view>
			</view>
			<view class="p-20 fs-24">
				<textarea @blur="getShopAd" :value="shopAd" placeholder-style="color: #C8C7C7;" placeholder="这里是我的自营好货，感兴趣的亲亲，直接下订单哦～我会在第一时间安排送货"></textarea>
			</view>
		</view>

		<view class="plr-20 bg-white mb-20">
			<view :class="'flex justify-between align-center ' + (picList.length>0?'border-bottom':'')">
				<view class="fs-28 color-2C2C2C ns-text-bold" style="line-height: 79rpx;">图片展示</view>
				<button class="cu-btn bg-FF9100 sm fs-24 color-fff" @tap="upPic">添加</button>
			</view>
			<view class="ptb-20" style="flex-wrap:wrap" v-if="picList.length>0">
				<scroll-view scroll-x="true" enable-flex="true" style="height: 150rpx;">
					<view class="flex">
						<view class="notice-pic pr" v-for="(item, index) in picList" :key="index">
							<image class="notice-pic" mode="aspectFill" :src="item" @tap="viewPic" :data-url="item"></image>
							<view class="iconfont icon-guanbi1 pa bg-white" style="top: 0rpx;right: 0rpx;border-radius: 50%;overflow: hidden;" @tap="delPic" :data-index="index"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="msg plr-20 bg-white">
			<view class="ptb-20 flex fs-28 border-bottom">
				<view class="color-2C2C2C ns-text-bold" style="width: 140rpx;">地址</view>
				<view class="flex1">
					<input :value="shopAddress" @blur="getShopAddress" type="text" style="width: 100%;" placeholder="无"></input>
				</view>
			</view>
			<view class="ptb-20 flex fs-28 border-bottom">
				<view class="color-2C2C2C ns-text-bold" style="width: 140rpx;">电话</view>
				<view class="flex1">
					<input :value="shopMobile" @blur="getShopMobile" type="number" maxlength="11" style="width: 100%;" placeholder="无"></input>
				</view>
			</view>
			<view class="ptb-20 flex fs-28">
				<view class="color-2C2C2C ns-text-bold" style="width: 140rpx;">联系人</view>
				<view class="flex1">
					<input :value="shopBoss" @blur="getShopBoss" type="text" style="width: 100%;" placeholder="无"></input>
				</view>
			</view>
		</view>
	</view>
	
	<view class="footer" @tap="editShop">保存</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      picList: [],
      shopAd: '',
      shopAddress: '',
      shopMobile: '',
      shopBoss: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdAndSetting();
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
    getAdAndSetting() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_my_shop,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            var picList = [];

            for (var j in res.data.cover_pic_arr) {
              wx.downloadFile({
                url: res.data.cover_pic_arr[j],

                success(res) {
                  if (res.statusCode === 200) {
                    picList.push(res.tempFilePath);
                    self.setData({
                      picList: picList
                    });
                  }
                }

              });
            }

            self.setData({
              shopAd: res.data.ad,
              shopAddress: res.data.address,
              shopMobile: res.data.mobile,
              shopBoss: res.data.name
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    upPic() {
      var self = this;
      var picList = self.picList;
      wx.chooseImage({
        success(res) {
          var tempPic = res.tempFilePaths;
          self.setData({
            picList: picList.concat(tempPic)
          });
        }

      });
    },

    viewPic(e) {
      var self = this;
      var url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: self.picList,
        current: url
      });
    },

    delPic(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var picList = self.picList;
      picList.splice(index, 1);
      self.setData({
        picList: picList
      });
    },

    editShop() {
      var self = this;
      var pic_complete_count = 0;
      var pic_url_list = [];

      if (self.picList.length > 0) {
        this.getApp().core.showLoading({
          title: "正在上传图片",
          mask: true
        });

        for (var i in self.picList) {
          (function (i) {
            self.getApp().core.upFile({
              url: self.getApp().api.selfSupport.upload_image,
              filePath: self.picList[i],
              name: "image",
              success: function (res) {},
              complete: function (res) {
                pic_complete_count++;

                if (res.statusCode == 200) {
                  res = JSON.parse(res.data);

                  if (res.code == 0) {
                    pic_url_list[i] = res.data.image;
                  }
                }

                if (pic_complete_count == self.picList.length) {
                  self.getApp().core.hideLoading();

                  _submit();
                }
              }
            });
          })(i);
        }
      } else {
        _submit();
      }

      function _submit() {
        self.getApp().request({
          url: self.getApp().api.selfSupport.edit_shop,
          method: 'POST',
          data: {
            userId: self.getApp().core.getStorageSync('USER_INFO').id,
            cover_pic: pic_url_list,
            ad: self.shopAd,
            address: self.shopAddress,
            mobile: self.shopMobile,
            name: self.shopBoss
          },

          success(res) {
            if (res.code == 0) {
              wx.showModal({
                title: res.msg,
                showCancel: false,
                success: res => {
                  if (res.confirm) {
                    wx.navigateBack();
                  }
                }
              });
            } else {
              wx.showModal({
                title: res.msg,
                showCancel: false
              });
            }
          }

        });
      }
    },

    getShopAd(e) {
      this.setData({
        shopAd: e.detail.value
      });
    },

    getShopAddress(e) {
      this.setData({
        shopAddress: e.detail.value
      });
    },

    getShopMobile(e) {
      this.setData({
        shopMobile: e.detail.value
      });
    },

    getShopBoss(e) {
      this.setData({
        shopBoss: e.detail.value
      });
    }

  }
};
</script>
<style>
@import "./privateNotice.css";
</style>