<template>
	<view>
		<common></common>
		<block v-if="show">
			<view class="top-top" style="width: 100%;">
				<view style="position: relative;z-index: 99;">
					<custom fixed="fixed"></custom>


					<view class="flex flex-x-center">
						<image :src="info.avatar_url || ''" mode="aspectFit" style="width: 120rpx;height: 120rpx;border-radius: 60rpx;display: inline-block;margin: 70rpx auto 0 auto;background-color: rgba(255,255,255,0.3);"></image>
					</view>

					<view class="" style="padding: 0 40rpx;color: #FFCD98;margin-top: 40rpx;font-size: 40rpx;text-align: center;">
						{{info.nickname || ""}}的红包
					</view>

					<view class="" style="padding: 0 40rpx;color: #FFCD98;font-size: 50rpx;margin-top: 100rpx;text-align: center;">
						{{info.desc || ''}}
					</view>
				</view>

				<view :class="{'opne_reward':opne_reward}" class="btn-open" @tap="less(lingqu)">
					開
				</view>

				<view class="ainio">

				</view>
			</view>

			<view class="btn-b" @tap="less(toDetail)">
				查看领取详情
			</view>

		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				id: '',
				show: false,
				opne_reward: false,
				mp3_src: '',
			}
		},

		onLoad(e) {
			this.getApp().page.onLoad(this, e);
			if (this.login()) {
				return;
			}
			uni.hideShareMenu();
			if (!e.sid) {
				this.uniBack();
				return;
			}


			this.get_data_sid(e.sid);
			this.download_mp3();
		},
		methods: {
			play(){
				const Audio = uni.createInnerAudioContext();
				Audio.src = this.mp3_src; //音频地址  
				Audio.play(); //执行播放 
			},
			download_mp3() {
				
				this.downloadFile({
					url: this.init_img.open_red_mp3, //仅为示例，并非真实的资源
					success: (res) => {
						this.mp3_src = res.tempFilePath || '';
					},
					fail: res => {
						console.log('error',res)
					}
				});
			},
			//通过sid获取红包id
			get_data_sid(sid) {
				if (sid == '')
					return;
				this.getApp().request({
					data: {
						sid: sid
					},
					url: this.getApp().api.taoke.tk_share_data,
					success: (res) => {
						if (res.code == 0) {
							if (res.data) {
								this.id = res.data.rel_id;
								if (this.id) {
									this.get_reward_info();
								}
							}
						}
					}
				});
			},
			//获取红包领取状态
			get_reward_info() {
				this.getApp().request({
					data: {
						id: this.id
					},
					method: "GET",
					url: this.getApp().api.jintie.status,
					success: (res) => {
						if (res.code == 0) {
							// status  1可领取  2已经领取过  3红包已经被领取完 4红包过期 5成为会员再来领取  6店主不能领取别人的红包
							if (res.data) {
								let status = res.data.status;
								this.info = {
									avatar_url: res.data.avatar_url || '',
									desc: res.data.desc || '',
									nickname: res.data.nickname || '',
								}
								// return ;
								if (status == 1) {
									this.show = true;
									return;
								}
								if (status == 2) {
									uni.redirectTo({
										url: '/tool/rewardDetail/rewardDetail?id=' + this.id
									})
									return;
								}
								if (status == 3) {
									uni.redirectTo({
										url: '/tool/rewardDetail/rewardDetail?id=' + this.id + '&status=3'
									})
									return;
								}
								if (status == 4) {
									uni.redirectTo({
										url: '/tool/rewardDetail/rewardDetail?id=' + this.id + '&status=4'
									})
									return;
								}
								if (status == 5) {
									//先成为会员在领取
									uni.redirectTo({
										url: '/tool/rewardDetail/rewardDetail?id=' + this.id + '&status=5'
									})
									return;
								}
								if (status == 6) {
									//店主不可以领取自己和别人的红包
									uni.redirectTo({
										url: '/tool/rewardDetail/rewardDetail?id=' + this.id + '&status=6'
									})
									return;
								}
								uni.showToast({
									title: '未知错误',
									icon: 'none'
								});
								setTimeout(_ => {
									this.uniBack();
								}, 500)
								return;

							}
						}
						if (res.code == 1) {
							this.uniBack();
						}
					},
					complete: _ => {
						// this.show = true;
					}
				});
			},
			//领取红包
			lingqu() {
				if (this.login()) {
					return;
				}
				
				//播放声音
				this.play();
				// return ;
				///动画
				this.opne_reward = true;
				setTimeout(() => {
					this.opne_reward = false
				}, 1000)
				///动画

				this.getApp().request({
					data: {
						id: this.id
					},
					url: this.getApp().api.jintie.open,
					success: (res) => {
						//领取后取详情页，无论有没有领导，到详情页统一处理
						if (res.code == 0) {
							uni.redirectTo({
								url: '/tool/rewardDetail/rewardDetail?id=' + this.id
							})
						}
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: res.msg || ''
							})
						}
					},
					complete: _ => {
						// this.show = true;
					}
				});
			},
			//查看详情
			toDetail() {
				uni.navigateTo({
					url: '/tool/rewardDetail/rewardDetail?id=' + this.id
				})
			}
		},
	}
</script>

<style>
	page {
		height: 100vh;
		overflow: hidden;
		background-color: #BD3025;
	}

	/* 75 */
	.top-top {
		width: 100%;
		height: 75vh;
		/* background-color: #DA3F33; */
		position: relative;
		z-index: 9;
		/* border-radius: 0rpx 0rpx 375rpx 375rpx/0rpx 0rpx 80rpx 80rpx;
		box-shadow: 0rpx 9rpx 20rpx 0rpx rgba(213, 49, 36, 0.2); */
	}

	.ainio {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
		width: 2600rpx;
		height: 2600rpx;
		background-color: #DA3F33;
		/* background-color: blue; */
		z-index: -1;
		border-radius: 50%;
		box-shadow: 0rpx 9rpx 20rpx 0rpx rgba(213, 49, 36, 0.2);

	}

	.btn-open {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 50%);
		width: 230rpx;
		height: 230rpx;
		background-color: #FFCD98;
		color: #333333;
		line-height: 230rpx;
		font-size: 120rpx;
		/* font-weight: bold; */
		text-align: center;
		border-radius: 115rpx;
		box-shadow: 0 0 10rpx 0rpx rgb(0, 0, 0, 0.1);
	}

	.btn-b {
		position: fixed;
		left: 50%;
		display: inline-block;
		bottom: 80rpx;
		transform: translate(-50%, 0);
		color: #FDF0CE;
		font-size: 30rpx;
		text-decoration: underline;
	}

	.opne_reward {
		animation: open 0.6s;
	}

	@keyframes open {
		0% {
			transform: translate(-50%, 50%) scale(1.3);
		}

		100% {
			transform: translate(-50%, 50%) scale(1);
		}
	}
</style>
