<template>
	<view class="body after-navber">
	<common></common>
		<!-- <view class="bottom-bar" style="display: none">
	        <navigator url="/pages/address-edit/address-edit">添加新地址</navigator>
	    </view> -->
		<view class="address-list">
			<view style="margin-bottom: 32rpx;padding-top: 20rpx;">
				<view v-if="address_list.length==0" style="color: #888;text-align: center;padding: 32rpx 0;">暂无收货地址</view>
				<block v-else>
					<view v-for="(item, index) in address_list" :key="index" @tap="pickAddress" :data-index="index" class="address-item mb-20">
	
						<view class="fs-28">
							<view class="userinfo flex-row fs-30 color-333333 ns-text-bold">
								<view class>{{item.name}}</view>
								<view style="margin-left: 37rpx;">{{item.mobile}}</view>
							</view>
							<view class="address-detail fs-24 color-666666">收货地址：{{item.address}}</view>
						</view>
						<view class="flex ns-justify-content-space-between" @tap.stop="no" style="padding-top: 20rpx;border-top: 1rpx solid #ccc;margin-top: 20rpx;">
							<!-- <view class="ns-text-bold"> {{item.id<0?'店主代收':''}}</view> -->
							<view class="color-FF0200">{{item.is_check==0?'该地址不完整，点击「编辑」进行修改':''}}</view>
							<view v-if="item.id>0" class="flex ns-align-items-flex-end">
								<navigator class="address-option " :url="'/pages/address-edit/address-edit?id=' + item.id">
									<text>编辑</text>
								</navigator>
								<view class="address-option" @tap="deleteAddress" :data-index="index" :data-id="item.id">
									<text>删除</text>
								</view>
							</view>
	
						</view>
					</view>
	
				</block>
			</view>
			<view class="flex-row btn-box flex-x-center">
				<view class="px-24">
					<navigator class="btn btn-red" url="/pages/address-edit/address-edit">添加新的地址</navigator>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>

export default {
  data() {
    return {
      address_list: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getApp().page.onShow(this);
    var self = this;
    uni.showNavigationBarLoading();
    this.getApp().request({
      url: this.getApp().api.user.address_list,
      success: function (res) {
        uni.hideNavigationBarLoading();

        if (res.code == 0) {
          self.setData({
            address_list: res.data.list
          });
        }
      }
    });
  },
  methods: {
    pickAddress: function (e) {
      var index = e.currentTarget.dataset.index;
      var address = this.address_list[index];

      if (address.is_check != 1) {
        uni.showToast({
          title: '该地址不可用，请先进行编辑',
          icon: 'none'
        });
        return;
      }

      uni.setStorageSync(this.getApp().const.PICKER_ADDRESS, address);
      uni.navigateBack();
    },
    deleteAddress: function (e) {
      var self = this;
      var address_id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      uni.showModal({
        title: "提示",
        content: "确认删除改收货地址？",
        success: function (res) {
          if (res.confirm) {
            uni.showLoading({
              title: "正在删除",
              mask: true
            });
            self.getApp().request({
              url: self.getApp().api.user.address_delete,
              data: {
                address_id: address_id
              },
              success: function (res) {
                if (res.code == 0) {
                  uni.hideLoading();
                  self.getApp().request({
                    url: self.getApp().api.user.address_list,
                    success: function (res) {
                      uni.hideNavigationBarLoading();

                      if (res.code == 0) {
                        self.setData({
                          address_list: res.data.list
                        });
                      }
                    }
                  });
                }

                if (res.code == 1) {
                  uni.hideLoading();
                 uni.showToast({
                    title: res.msg
                  });
                }
              },
              complete: function () {
               uni.hideLoading();
              }
            });
          }
        }
      });
    },
    getWechatAddress: function (e) {
		let self = this;
      wx.chooseAddress({
        success: function (e) {
          if (e.errMsg != 'chooseAddress:ok') return;
          uni.showLoading();
          self.getApp().request({
            url: self.getApp().api.user.add_wechat_address,
            method: "post",
            data: {
              national_code: e.nationalCode,
              name: e.userName,
              mobile: e.telNumber,
              detail: e.detailInfo,
              province_name: e.provinceName,
              city_name: e.cityName,
              county_name: e.countyName
            },
            success: function (res) {
              if (res.code == 1) {
                uni.showModal({
                  title: '提示',
                  content: res.msg,
                  showCancel: false
                });
                return;
              }

              if (res.code == 0) {
                uni.setStorageSync(getApp().const.PICKER_ADDRESS, res.data);
                uni.navigateBack();
              }
            },
            complete: function () {
              uni.hideLoading();
            }
          });
        }
      });
    },
	no(){
		
	}
  }
};
</script>

<style>
page {
	height: 100%;
}
.page {
	height: 100%;
}

.bottom-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.body {
	height: 100%;
}
.address-option image{
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
}
.bottom-bar navigator{
    background: #c10000;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    color: #fff;
}

.address-list{
	position: relative;
	min-height: 100%;
    padding-bottom: 100rpx;
}

.address-item{
    background: #fff;
    padding: 32rpx 24rpx;
   
}
.userinfo{
    margin-bottom: 24rpx;
}
.address-detail{
}
.address-option{
   width: 101rpx;
	height: 51rpx;
	line-height: 49rpx;
	border:1rpx solid rgba(51,51,51,.3);
	border-radius:25rpx;
    margin-left: 16rpx;
	text-align: center;
}


.btn-box {
  position: absolute;
  width: 100%;
  bottom: 30rpx;
  left: 0;
}
.btn{
    width: 340rpx;
	height: 88rpx;
	line-height: 86rpx;
	text-align: center;
	color: #333333;
	border: 1rpx solid rgba(97, 97, 97, .4);
	border-radius: 44rpx;
}

.btn:active{
    background: #fff;
    opacity: .65;
}

.btn:after{
    display: none;
}

.btn.btn-red{
    width: 340rpx;
	height: 88rpx;
	line-height: 88rpx;
	background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	border: none;
	text-align: center;
	border-radius: 44rpx;
	color: #fff;
}
</style>
