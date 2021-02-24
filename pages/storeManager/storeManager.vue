<template>
	<view class="pr" style="height: 2490rpx;">
		<common></common>
		<view class="managerBox pr" :style="'background-image: url(' + to_mch_img + ');'">
			<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
				<view class="backBtn" @tap="goBack">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view></view>
				<view></view>
			</view>
			<!-- <view class="privilege">
				<view class="privilege-main" style="margin-bottom: 44rpx;">
					<view class="fs-36 ns-text-bold" style="color: #BC3534;">拥有一家自己的专属品牌店铺</view>
					<view class="fs-24 ns-text-bold" style="color: #BC3534;margin-top: 10rpx;">自定义店铺名称/描述，多品类经营</view>
				</view>
				<view class="privilege-main" style="margin-bottom: 44rpx;">
					<view class="fs-36 ns-text-bold" style="color: #BC3534;">开店即卖货，多品类经营赚收益</view>
					<view class="fs-24 ns-text-bold" style="color: #BC3534;margin-top: 10rpx;">品牌正品、源头直采、单品25%左右收益</view>
				</view>
				<view class="privilege-main">
					<view class="fs-36 ns-text-bold" style="color: #BC3534;">开启邀请奖励，津贴拿到手软</view>
					<view class="fs-24 ns-text-bold" style="color: #BC3534;margin-top: 10rpx;">每成功邀请一个新店主，立即到账500元津贴</view>
				</view>
			</view> -->
			<view class="user-msg-box">
				<view class="flex-x-center" style="font-size: 30rpx;font-weight: bold; color: #BC3534;">您的开店助手【{{nickname}}】</view>
				<view class="tutor-pic-box" style="margin: 30rpx auto 22rpx;">
					<image v-if="wechat_qr_pic" style="width: 270rpx;height: 270rpx;border-radius: 12rpx;" mode="aspectFill" :src="wechat_qr_pic"></image>
					<view v-else class="fs-30 rel" style="color:#333; line-height:270rpx; text-align:center;">
						<view class="zindex">【暂无二维码】</view>
						<image class="no_img" :src="code_img"></image>
					</view>
				</view>
				<!-- <view class="fs-30 color-000000 ns-text-bold text-center">您的专属导购【{{nickname}}】</view> -->
				<view v-if="wechat_qr_pic" style="width:100%; text-align:center; margin-bottom:30rpx;" @tap="saveImg">
					<view class="saveCode">保存二维码</view>
				</view>
				<view v-else style="width:100%; text-align:center; margin-bottom:30rpx; ">
					<view class="saveCode" style="color:#999; background-color:#f4f4f4;">保存二维码</view>
				</view>
				<view class="qq-flex justify-between">
			
					<view class="tutor-pic-box" style="width:90rpx;height:90rpx;border-radius: 50%;align-items: center; ">
						<image style="width: 90rpx;height: 90rpx;border-radius: 50%;border: 4rpx solid #C51F29;  " mode="aspectFill" :src="avatar_url"></image>
					</view>
					<view class="wx-box align-center align-items: center;">
						<text>微信号：<text class="ns-text-bold">{{wechat_name}}</text></text>
					</view>
					<view class="text-right fs-30 ns-text-bold">
						<text style="color: #C51F29;" @tap="copy" :data-text="wechat_name">复制</text>
					</view>
			
				</view>
			
			</view>
		</view>
		<view class="btn-box flex-x-center flex-y-center">
			<button open-type="share" class="shopBtn-empty">邀请好友，积累会员</button>
		</view>
	</view>
</template>

<script>
// pages/storeManager/storeManager.js
import utils from "../../utils/util";

export default {
  data() {
    return {
      loading: false,
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
      to_mch_img: "",
      parent_id: "",
      store_id: "",
      store_group_id: "",
      sid: "",
      shareImg: "",
	  wechat_qr_pic:'',
	  avatar_url:'',
	  code_img:'',
	  wechat_name:'',
	  nickname:''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    // #ifdef MP-WEIXIN
	uni.hideShareMenu();
	//#endif
    this.setData({
      to_mch_img: uni.getStorageSync('_img').tomch || ''
    });
    setTimeout(function () {
      self.setData({
        loading: true
      });
    }, 500);
    this.getSuperiorInfo();
    this.getShareData();
    this.getShareImg();
  },
  // 支付

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
  onShareAppMessage: function () {
    var mch_id = uni.getStorageSync('_mchInfo').id || '';
    var user_id = uni.getStorageSync('USER_INFO').id || '';
    var nickname = uni.getStorageSync('USER_INFO').nickname || '';
    var title = nickname + '邀请您来开通会员~';
    var img = this.getApp().core.getStorageSync('_img').open_member;
    this.shareVip();
    return {
      title: title,
      path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
      imageUrl: img
    };
  },
  methods: {
    getSuperiorInfo() {
      this.getApp().request({
        url: this.getApp().api.default.get_superior_info,
        data: {
          userId: uni.getStorageSync('USER_INFO').id || ''
        },
        success: res => {
          if (res.code == 0) {
            this.setData(res.data);
          } else {
            uni.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    copy: function (e) {
      var text = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: text,

        success(res) {
          uni.getClipboardData({
            success(res) {
              uni.showToast({
                title: '已复制成功，前往微信添加好友',
                icon: 'none'
              });
            }

          });
        }

      });
    },

    saveImg() {
      var self = this;

      if (!uni.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        uni.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      this.downloadFile({
        url: self.wechat_qr_pic,
        success: function (e) {
          uni.showLoading({
            title: "正在保存图片",
            mask: false
          });
          uni.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function () {
              uni.showModal({
                title: '提示',
                content: '二维码保存成功',
                showCancel: false
              });
            },
            fail: function (e) {
              uni.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete: function (e) {
             uni.hideLoading();
            }
          });
        },
        fail: function (e) {
          uni.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.wechat_qr_pic,
            showCancel: false
          });
        },
        complete: function (e) {
          uni.hideLoading();
        }
      });
    },

    // getVipList() {
    // 	getApp().request({
    // 		url: getApp().api.LockPowder.vip_list,
    // 		data: {
    // 			userId: getApp().core.getStorageSync('USER_INFO').id,
    // 			only_get: 'member'
    // 		},
    // 		success: (res) => {
    // 			if (res.code == 0) {
    // 				this.setData({
    // 					member: res.data.member,
    // 				})
    // 			}
    // 		}
    // 	})
    // },
    // 生成购买会员订单
    goBack() {
      uni.navigateBack({
        fail: res => {
          uni.redirectTo({
            url: '/pages/index/index'
          });
        }
      });
    },

    // 分享会员
    getShareData() {
      this.getApp().request({
        url: this.getApp().api.default.share_data,
        data: {
          userId: uni.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              parent_id: res.data.parent_id,
              store_id: res.data.store_id,
              store_group_id: res.data.store_group_id,
              sid: res.data.id
            });
          } // else {
          // 	wx.showToast({
          // 		title: res.msg,
          // 		icon: 'none'
          // 	})
          // }

        }
      });
    },

    getShareImg() {
      this.getApp().request({
        url: this.getApp().api.default.vip_share_img,
        success: res => {
          if (res.code == 0) {
            this.setData({
              shareImg: res.data.vipImg
            });
          }
        }
      });
    },

    shareVip() {
      this.getApp().request({
        url: this.getApp().api.default.share_vip,
        data: {
          userId:uni.getStorageSync('USER_INFO').id || ''
        },
        success: res => {}
      });
    }

  }
};
</script>
<style>
.managerBox {
	width: 750rpx;
	height: 2355rpx;
	/* background-size: 750rpx 2355rpx; */
	background-repeat: no-repeat;
	
	background-size: 100% 2355rpx;
	
}

.privilege {
	position: absolute;
	bottom: 795rpx;
	height: 454rpx;
	width: 100%;
	padding: 0 24rpx;
	padding-left: 157rpx;
}

.privilege-main {
	width: 569rpx;
	height: 122rpx;
	box-shadow: 0px 8rpx 16rpx 0px rgba(151, 137, 116, 0.39);
	border-radius: 12rpx;
	padding: 21rpx 24rpx 0rpx;
}

.con {
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	padding: 0 24rpx;
	position: fixed;
}

.progress-box {
	position: absolute;
	bottom: 870rpx;
	padding: 0 56rpx;
	width: 100%;
}

.backBtn {
	font-size: 36rpx;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
	color: #FFFFFF;
	opacity: 0.5;
}

.tutor-pic-box {
	width: 270rpx;
	height: 270rpx;
	background: #fff;
	border-radius: 12rpx;
}

.wx-box {
	width: 434rpx;
	height: 80rpx;
	line-height: 80rpx;
	background: #C51F29;
	border-radius: 40rpx;
	padding: 0 32rpx;
	color: #FBE7C9;
	font-size: 30rpx;
}

/*保存二维码 */
.saveCode {
	display: inline-block;
	width: 241rpx;
	height: 70rpx;
	background: #FE5B2A;
	border-radius: 35px;
	line-height: 70rpx;
	color: #FCE8C9;
	font-size: 30rpx;
	text-align: center;
	margin: auto;

}

.qq-flex {
	display: flex;
	align-items: center;
	padding: 0 58rpx
}

.rel {
	position: relative;

}

.no_img {
	position: absolute;
	top: 0;
	left: 0;
	width: 200rpx;
	height: 200rpx;
	border-radius: 12rpx;
	opacity: 0.1;

}

.zindex {
	position: relative;
	z-index: 4;
}
.user-msg-box {
	position: absolute;
	bottom: 128rpx;
	width: 100%;
}
.btn-box {
	position: fixed;
	bottom: 0rpx;
	width: 750rpx;
	height: 140rpx;
	background: #CB292F;
	box-shadow: -1rpx -6rpx 12rpx 0px rgba(94, 35, 37, 0.38);
	z-index: 10;
}
.shopBtn-empty {
	width: 702rpx;
	height: 80rpx;
	background: #FD5B29;
	border-radius: 40rpx;
	font-size: 34rpx;
	color: #FBE7C9;
	font-weight: bold;
}
</style>