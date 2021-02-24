<template>
	<view v-if="show" style="width: 100%;overflow: hidden;">
		<view class="flex pl-24 pr-24" style="background-color: #FFFFFF;padding-top: 24rpx;" :style="{'padding-bottom':mode == 1 ?'0':'30rpx'}">
			<image :src="mch_info_.logo" mode="aspectFill" style="width: 70rpx;height: 70rpx;border-radius: 50%;"></image>
			<view class="flex-1 pl-20" style="color: #2C2C2C;font-size: 24rpx;">
				<view class="fs-30 color-595959">{{mch_info_.name}}</view>
				<view class="fs-24 color-8D8D8D" style="margin-top: 5rpx;">加我好友，为你推荐 帮你省钱</view>
			</view>
			<view @tap.stop="changeAddMch" class="fs-28 flex flex-x-center flex-y-center" style="height: 54rpx;border-radius: 27rpx;border:2rpx solid #489A19;color: #489A19;text-align: center;align-items: center;padding: 0 16rpx;"
						 hover-class="click1" v-if="!is_normal_member">
							加好友，免费领会员
						</view>
			<view @tap.stop="open" class="fs-28 flex flex-x-center flex-y-center" style="height: 54rpx;border-radius: 27rpx;border:2rpx solid #489A19;color: #489A19;text-align: center;align-items: center;padding: 0 16rpx;"
			 hover-class="click1" v-else>
				加好友
			</view>
		</view>

		<uni-popup ref="shoper" type="center" :maskClick="false">

			<view class="pr" style="width: 611rpx;height: 749rpx; transform: translateX(-24rpx);" @tap="mycopy(mch_info_.wechat_name)">
				<image :src="init_img.tk_jhy" mode="" style="width: 611rpx;height: 749rpx;"></image>
				<view class="flex flex-y flex-x-center flex-y-center" style="position: absolute;bottom: 40rpx;left: 140rpx;">
					<image :src="mch_info_.logo" mode="" style="width: 166rpx;height: 166rpx;border-radius: 50%;"></image>
					<view class="flex flex-x-center flex-y-center" style="margin-top: 40rpx;width: 381rpx;height: 60rpx;border: 1rpx solid #FFFFFF;color: #FFFFFF;font-size: 30rpx;border-radius: 32rpx;opacity: 0.5;">
						{{mch_info_.wechat_name }}
					</view>
					<view class="fs-30 color-fff" style="margin-top: 40rpx;">
						点击复制微信号
					</view>
				</view>
			</view>
			<view style="text-align: center;margin-top: 50rpx;">
				<text @tap="close" class="iconfont icon-guanbi color-fff" style="font-size: 60rpx;text-align: center;"></text>
			</view>
		</uni-popup>

		<uni-popup type="center" ref="pop2" :maskClick="false">

			<view style="overflow: hidden;width: 580rpx;border-radius: 20rpx;background-color: #FFFFFF;text-align: center;">
				<view style="font-size: 44rpx;color:#333333;font-weight: bold;margin-top: 50rpx;">添加店主微信</view>
				<view style="text-align: left;margin-top: 54rpx;padding: 0 47rpx;font-size: 30rpx;color: #333333;">复制下面微信号，添加店主微信，领取该商品优惠券</view>
				<view class="flex flex-y-center" style="padding: 0 46rpx;margin-top: 42rpx;">
					<image :src="mch_info_.logo" mode="" style="width: 60rpx;height: 60rpx;border-radius: 30rpx;margin-right: 17rpx;"></image>
					<view class="flex flex-y-center pl-24 fs-24" style="flex:1;height: 60rpx;border-radius: 30rpx;background-color: #F4F4F4;">
						<text class="pr-24 color-999">微信号</text>
						<text class="color-333333">{{mch_info_.wechat_name}}</text>
					</view>
				</view>

				<view hover-class="click1" @tap.stop="copy_wechat" style="margin-top: 60rpx;margin-left: 40rpx;width: 500rpx;color: #FFFFFF;border-radius: 44rpx;line-height: 88rpx;font-size: 32rpx;background: #FF401A;box-shadow: 0px 7px 16px 0px rgba(255, 69, 32, 0.55);margin-bottom: 30rpx;">一键复制微信号</view>
			</view>

			<view style="text-align: center;margin-top: 50rpx;">
				<text @tap="close_2" class="iconfont icon-guanbi color-fff" style="font-size: 60rpx;text-align: center;"></text>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		name: 'goods_shoper',
		data() {
			return {
				image: '',
				name: '',
				show: false,
				wechat_name: ''
			}
		},
		methods: {
			open() {
				this.$refs.shoper.open();
				// this.$refs.pop2.open();
			},
			close() {
				this.$refs.shoper.close();
			},
			close_2() {
				this.$refs.pop2.close();
			},
			show_wechat() {
				this.$refs.pop2.open();
			},
			copy_wechat() {
				this.mycopy(this.mch_info_.wechat_name);
				this.$refs.pop2.close();
				this.$refs.shoper.close();
			},
			changeAddMch() {
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch',
					value: true
				})
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch_page',
					value: true
				})
			},
		},
		props: {
			mode: '',
			is_normal_member: true
		},
		mounted() {
			this.show = true;
			return ;
			this.getApp().request({
				url: this.getApp().api.default.get_superior_info,
				data: {
					userId: this.getApp().core.getStorageSync('USER_INFO').id
				},
				success: res => {
					// avatar_url: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYbrH1a0HCOsGmsRkGYEDvt1JKxQ3miaxia9UHNCYvedjCuH92CV5ic4I4jjpJhxs0LltVyHKJy0OnA/132"
					// nickname: "陈挽2"
					// realname: "陈挽"
					// wechat_name: "seeker-m"
					// wechat_qr_pic: "http://imgm.test.qinpu.cloud/uploads/image/store_22/390ae9f3bd636a7bc512d72c0330a5bd76bf47cd.jpg"
					if (res.code == 0) {
						// console.log(res);
						if (res.data.nickname) {
							
							this.name = res.data.nickname;
							this.image = res.data.avatar_url;
							this.wechat_name = res.data.wechat_name;
						}
					}
				}
			});
		}
	}
</script>

<style lang="scss">
</style>
