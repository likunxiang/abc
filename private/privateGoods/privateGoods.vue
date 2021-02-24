<template>
<!--pages//private/privateGoods/privateGoods.wxml-->
<view class="page">
	<block v-if="is_login">
		<view class="ns-column flex-y-center" style="padding-top: 400rpx;">
			<view class="mb-20">您尚未登录，无法体验该功能，请先登录</view>
			 <button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;" @tap="myLogin" class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
		</view>
	</block>
	<block v-else>
		<view style="padding-bottom: 120rpx">
			<view class="swiper pr">
				<swiper class="swiper" indicator-dots="true">
					<swiper-item v-for="(item, index) in cover_pic" :key="index">
						<image class="swiper" :src="item" mode="aspectFill"></image>
					</swiper-item>
				</swiper>
				<view class="lable color-fff fs-30">店主自营</view>
				<view @tap="downMaterial" class="pa share_btn_img down_btn_img">
					<text class="iconfont icon-xiazai" style="font-size: 30rpx;"></text>
				</view>
				<view @tap="showShareModal" class="pa share_btn_img">
					<text class="iconfont icon-show_fenxiang" style="font-size: 30rpx;"></text>
				</view>
				<view v-if="isReturn" @tap="back" class="pf back">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view v-else @tap="toHome" class="pf back">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
			</view>
			<view class="goodsHeader flex ns-justify-content-space-between ns-align-items-flex-center" v-if="true">
				<view class="flex">
					<view class="flex">
						<view style="padding-top: 56rpx;font-size: 24rpx;">￥</view>
						<view style="font-size: 78rpx;">{{min_price}}</view>
					</view>
					<!-- <view class="ns-flex ns-align-items-flex-center ml-20">
						<view> -->
							<!-- <view class="miao-label">爆款</view> -->
							<!-- <view wx:if="{{true}}" class="ns-flex ns-align-items-flex-center" style="margin-top: 40rpx;"> -->
								<!-- <text class="ns-text-through ns-text-xxxs">零售价</text> -->
								<!-- <text class='original_price ns-text-through fs-18' wx:if="{{true}}">￥{{goods.original_price}}</text>
							</view>
						</view>
					</view> -->
				</view>
				<!-- 佣金 -->
				<!-- <view class="flex ns-align-items-flex-center ml-20 mt-30" wx:if="{{role=='shoper' && goods.c1>0}}">
					<view class="yongjin fs-28">赚</view>
					<view class="fs-28 color-fff">￥{{goods.c1}}</view>
				</view> -->
				<view class="fs-28">{{goods.show_txt}}</view>
			</view>
			
			<view class="bg-white padding-lr ptb-24 mb-20">
				<view class="fs-28 color-2C2C2C ns-text-bold">{{name}}</view>
				<view class="fs-24 color-489A19 mt-10"><text v-for="(item, index) in tag" :key="index" style="margin-right: 15rpx;">{{item}}</text></view>
			</view>
			
			<view class="bg-white padding-lr mb-20">
				<!-- <view class="flex justify-between align-center border-bottom" bindtap="showAttrPicker">
					<view class="flex-grow-1 flex-row flex-y-center ptb-24">
						<text style="color:#2c2c2c;" class='fs-28 ns-text-bold'>尺码规格</text>
						<text class='attrs'>
							<text wx:for="{{attr_group_list}}" style="margin-right:10rpx" wx:key="key">{{item.attr_list.length}}种{{item.attr_group_name}}</text>
						</text>
					</view>
					<view class="flex-grow-0">
						<text class="iconfont icon-gengduo1 fs-34 color-8D8D8D"></text>
					</view>
				</view> -->
				<view class="ptb-24 fs-28 color-2C2C2C" v-if="desc">{{desc}}</view>
			</view>
			
			<view class="ptb-24 bg-white">
				
				<image v-for="(item, index) in cover_pic_detail" :key="index" class="swiper" :src="item" mode="aspectFill"></image>
			</view>
		</view>
		
		<view class="footer">
			<view class="flex">
				<view class="jump-box flex fs-20 color-8D8D8D">
					<navigator class="text-center flex1" url="/private/home/home?type=1">
						<view class="iconfont icon-icon- fs-40"></view>
						<view>全部商品</view>
					</navigator>
					<navigator class="text-center flex1" url="/private/privateCart/privateCart">
						<view class="iconfont icon-cailanzi- fs-40"></view>
						<view>我的篮子</view>
					</navigator>
				</view>
				<view class="flex1 flex text-center">
					<view class="flex1 btn-box bg-F49E3A" @tap="addCart">加入篮子</view>
					<view class="flex1 btn-box bg-F76436" @tap="buyNow">立即购买</view>
				</view>
			</view>
		</view>
		
		<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="true">
			<view :class="'share-modal-body ' + __device" @tap.stop="shop">
				<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
				<!-- <view class="shareGet">分享赚 <span>¥ 65</span></view>
		        <view class="tips">收益仅自己可见</view> -->
				<view class="flex-row">
					<view class="flex-grow-1 flex-x-center">
						<button open-type="share" class="share-bottom" style="height:100%;">
							<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
							<view>分享给好友</view>
						</button>
					</view>
					<view class="flex-grow-1 flex-x-center">
						<view @tap="getGoodsQrcode" class="share-bottom">
							<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
							<view>生成商品海报</view>
						</view>
					</view>
				</view>
				<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
			</view>
		</view>
		
		<!-- 生成海报 -->
		<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose">
			<view class="goods-qrcode-body flex-col" @tap.stop="shop">
				<view class="flex-grow-1" style="position: relative">
					<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
						<view class="goods-qrcode-box">
							<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
								<view class="flex-x-center flex-col">
									<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
									<view style="color: #888">海报生成中</view>
								</view>
							</view>
							<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode" :src="goods_qrcode"></image>
						</view>
					</view>
				</view>
				<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
					<view>
						<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">保存图片</button>
						<button v-else style="opacity: .4">保存图片</button>
					</view>
				</view>
				<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
					<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
				</view>
			</view>
		</view>
	</block>
	
</view>
</template>

<script>

export default {
  data() {
    return {
      cardCur: 0,
      swiperList: [],
      dotStyle: false,
      towerStart: 0,
      direction: '',
      goods_num: 0,
      pageType: 'STORE',
      share_modal_active: '',
      goods_qrcode_active: '',
      isReturn: true,
      is_login: false,
      role: "",
      goods_qrcode: "",
      showGetLogin: false,
      user_info_show: false,
      is_commission: false,
      no_scroll: false,
      sharePic: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.getApp().core.getStorageSync('USER_INFO')) {
      this.setData({
        is_login: false,
        role: this.getApp().core.getStorageSync('role')
      });
    } else {
      this.setData({
        is_login: true
      });
    }

    this.getApp().page.onLoad(this, options);
    var pages = getCurrentPages();
    var prevPage = pages.length > 1 ? true : false;

    if (!prevPage) {
      this.setData({
        isReturn: false
      });
    }

    this.getGoodsData(options.id);
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
  onShareAppMessage: function (res) {
    var self = this;
    var user_info = this.getApp().getUser();
    var mch_info = wx.getStorageSync('_mchInfo');

    switch (res.from) {
      case 'button':
        var res = {
          path: "/private/privateGoods/privateGoods?id=" + self.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: self.name,
          imageUrl: self.sharePic
        };
        break;

      case 'menu':
        var res = {
          path: "/private/privateGoods/privateGoods?id=" + self.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: self.name,
          imageUrl: self.cover_pic[0]
        };
        break;

      default:
        break;
    }

    self.shareModalClose();
    return res;
  },
  methods: {
    back: function () {
      var self = this;
      wx.navigateBack();
    },
    toHome: function () {
      var self = this;
      wx.redirectTo({
        url: '/pages/index/index'
      });
    },

    getGoodsData(id) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_goods_data,
        data: {
          id: id
        },

        success(res) {
          if (res.code == 0) {
            self.setData(res.data);
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    addCart() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cart,
        data: {
          num: self.goods_num + 1,
          goods_id: self.id,
          price: self.min_price
        },

        success(res) {
          if (res.code == 0) {
            wx.showToast({
              title: '加入购物车成功',
              icon: 'none'
            });
            self.setData({
              goods_num: self.goods_num + 1
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

    buyNow() {
      var self = this;
      var goods_id = self.id;
      var goods_name = self.name;
      var goods_price = self.min_price;
      var goods_pic = self.cover_pic[0];
      var num = 1;

      if (self.num > 0) {
        wx.navigateTo({
          url: '/private/privateBasket/privateBasket?type=2&goods_id=' + goods_id + '&num=' + num + '&goods_name=' + goods_name + '&goods_price=' + goods_price + '&goods_pic=' + goods_pic
        });
      } else {
        wx.showToast({
          title: '库存不足',
          icon: 'none'
        });
      }
    },

    downMaterial: function () {
      var self = this;
      var picList = self.cover_pic;

      for (var i in picList) {
        wx.downloadFile({
          url: picList[i],

          success(res) {
            if (res.statusCode === 200) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (res) {
                  wx.showToast({
                    title: '保存成功！'
                  });
                },

                fail(res) {
                  wx.showToast({
                    title: '保存失败！'
                  });
                }

              });
            }
          }

        });
      }
    },

    getQrcode() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.qrcode,
        data: {
          type: 'goods',
          goods_id: this.id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              goods_qrcode: res.data.pic_url
            });
          }

          if (res.code == 1) {
            this.goodsQrcodeClose();
            this.getApp().core.showModal({
              title: "提示",
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {}
              }
            });
          }
        }
      });
    },

    showShareModal: function () {
      var self = this;
      var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

      if (!token) {
        self.setData({
          showGetLogin: true,
          user_info_show: true
        });
        return;
      }

      self.setData({
        share_modal_active: "active",
        is_commission: false,
        no_scroll: true
      });
      self.getSharePic();
    },
    shareModalClose: function () {
      var self = this;
      self.setData({
        share_modal_active: "",
        no_scroll: false,
        is_commission: true
      });
    },
    getSharePic: function () {
      var self = this;
      var goods = self.goods;
      this.getApp().core.showLoading({
        title: '加载中'
      });
      this.getApp().request({
        url: this.getApp().api.selfSupport.share_goods_qrcode,
        data: {
          goods_id: self.id,
          type: 'goods'
        },
        success: (res) => {
          if (res.code == 0) {
            this.getApp().core.hideLoading();
            self.setData({
              sharePic: res.data.pic_url
            });
          }

          if (res.code == 1) {
            this.getApp().core.hideLoading();
            wx.showToast({
              title: '卡片图片获取失败，请稍后再试',
              duration: 2500,
              icon: 'none'
            });
            self.setData({
              is_commission: true
            });
          }
        },
        fail:() => {
          this.getApp().core.hideLoading();
          wx.showToast({
            title: '网络错误，请稍后再试',
            duration: 2500,
            icon: 'none'
          });
          self.setData({
            is_commission: true
          });
        }
      });
    },
    getGoodsQrcode: function () {
      var self = this;
      self.setData({
        goods_qrcode_active: "active",
        share_modal_active: ""
      });

      if (self.goods_qrcode) {
        return true;
      }

      this.getQrcode();
    },
    goodsQrcodeClose: function () {
      var self = this;
      self.setData({
        goods_qrcode_active: "",
        no_scroll: false
      });
    },
    saveGoodsQrcode: function () {
      var self = this;

      if (!this.getApp().core.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        this.getApp().core.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      this.getApp().core.showLoading({
        title: "正在保存图片",
        mask: false
      });
      this.getApp().core.downloadFile({
        url: self.goods_qrcode,
        success: function (e) {
          this.getApp().core.showLoading({
            title: "正在保存图片",
            mask: false
          });
          this.getApp().core.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: () => {
              this.getApp().core.showModal({
                title: '提示',
                content: '商品海报保存成功',
                showCancel: false
              });
            },
            fail: (e) => {
              this.getApp().core.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete:(e) => {
              this.getApp().core.hideLoading();
            }
          });
        },
        fail: function (e) {
          this.getApp().core.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.goods_qrcode,
            showCancel: false
          });
        },
        complete: function (e) {
          this.getApp().core.hideLoading();
        }
      });
    }
  }
};
</script>
<style>
@import "./privateGoods.css";
</style>