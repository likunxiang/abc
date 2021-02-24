<template>
	<view class="" >
		<view style="width:100%;height: 100vh;position: fixed;top: 0;left: 0;background-color: rgba(0,0,0,0.5);z-index: 99999;"
		 class="flex flex-y flex-x-center flex-y-center" v-if="hahaha" @touchmove.stop.prevent="">
		 
			<!-- 旧版本弹窗 -->
			<view v-if="false" class="fs-30" style="text-align: center;overflow: hidden;width: 580rpx;border-radius: 14rpx;background-color: #FFFFFF;">
				<image :src="init_img.qlm_tc" mode="scaleToFill" style="width: 580rpx;height: 280rpx;font-size: 0;"></image>
				<view class="color-666666" style="margin-top: 46rpx;">
					你是不是想要这个
				</view>
				<view class="" style="max-height: 400rpx;line-height: 40rpx;height: 80rpx;margin-top: 49rpx;text-overflow: ellipsis;color: #2C2419;padding-left: 55rpx;padding-right: 55rpx;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;word-break: break-word;overflow: hidden;text-overflow: ellipsis;">
					{{show_str}}
				</view>
		
				<view class="flex flex-x-a" style="margin-top: 49rpx;padding-left: 25rpx;padding-right: 25rpx;">
					<image :src="init_img.qinpu_icon" mode="" @tap="to_seach('/pages/seachAll/seachAll?type=1&keyword='+show_str)" style="width: 118rpx;height: 110rpx;"></image>
					<image :src="init_img.tb_icon" mode="" @tap="to_seach('/pages/seachAll/seachAll?type=3&keyword='+show_str)" style="width: 118rpx;height: 110rpx;"></image>
					<image :src="init_img.jd_icon" mode="" @tap="to_seach('/pages/seachAll/seachAll?type=2&keyword='+show_str)" style="width: 118rpx;height: 110rpx;"></image>
				</view>
		
				<view class="color-333333" style="margin-top: 42rpx;margin-bottom: 40rpx;">
					点击图标开始搜索
				</view>
			</view>
		
			<!-- 新版本弹窗 -->
			<view style="width: 580rpx;text-align: center;border-radius: 20rpx;background-color: #FFFFFF;">
				<view style="font-size: 44rpx;color:#333333;margin-top: 53rpx;font-weight: bold;">温馨提示</view>
				<view style="font-size: 30rpx;color: #666666;margin-top: 50rpx;">你是不是想要这个</view>
				<view style="padding: 49rpx 80rpx;color: #2C2419;font-size: 30rpx;font-weight: bold;max-height: 400rpx;overflow: hidden;text-overflow: ellipsis;">{{show_str}}</view>
				
				<view @tap.stop="less(to_search)" hover-class="click1" style="width: 500rpx;height: 88rpx;line-height: 88rpx;color: #FFFFFF;border-radius: 44rpx;margin-left: 40rpx;background: #FF401A;box-shadow: 0px 7px 16px 0px rgba(255, 69, 32, 0.55);margin-top: 60rpx;margin-bottom: 30rpx;">立即查看</view>
			</view>
			
		
			<view style="text-align: center;margin-top: 60rpx;">
				<text @tap="close" class="iconfont icon-guanbi color-fff" style="font-size: 60rpx;text-align: center;"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'link',
		data() {
			return {
				link1: '',
				images: {
					qinpu: '',
					taobao: '',
					jingdong: '',
					bg: '',
				},
				app: getApp().globalData.app,
			}
		},
		computed: {
			hahaha(){
				return this.$store.state.show_search;
			},
			show_str(){
				return this.$store.state.show_str;
			},
			haha() {
				//再亲联盟上显示
				if(this.app == 'qinpu') return;
				if (uni.getStorageSync('get_link') == "")
					return this.$store.state.link;
				uni.setStorageSync('get_link', '');
				setTimeout(() => {
					let link = uni.getStorageSync('link');
					uni.getClipboardData({
						success: (res) => {
							let str = res.data;
							if (str == "")
								return;
							if (str && link != str) {
								uni.showTabBar('str',str)
								this.link1 = str;
								this.$store.commit('vuexSet', {
									name: 'show_search',
									value: true
								})
								this.$store.commit('vuexSet', {
									name: 'show_str',
									value: str
								})
							}
							uni.setStorageSync('link', str);
						}
					});


				}, 500)
				return this.$store.state.link;
			}
		},
		methods: {
			open() {
				// this.$refs.link.open();
			},
			close() {
				// this.$refs.link.close();
				this.$store.commit('vuexSet', {
					name: 'show_search',
					value: false
				});
			},
			to_seach(url) {
				this.close();
				uni.navigateTo({
					url: url
				})

			},
			to_search(){
				this.close();
				uni.navigateTo({
					url: '/pages/taobao/taobao?keyword=' + this.show_str
				})
			}
		}

	}
</script>

<style>
</style>
