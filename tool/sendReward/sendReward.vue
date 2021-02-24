<template>
	<view>
		<custom fixed="fixed" mode="2" background="#FFFFFF" backColor="#333333" titleColor="#333333" title="发红包"></custom>

		<!-- 内容 -->
		<view class="flex flex-x-b flex-y-center pl-24 pr-24" style="height: 90rpx;background-color: #FFFFFF;width: 100%;">
			<view class="fs-30" style="color: #999999;">
				你还有可用津贴 <text style="margin-left: 3rpx;color: #333333;">{{this.xs(money,2)}}元</text>
			</view>
			<view @tap="less(toPage,'/tool/giftRecord/giftRecord')" class="" style="line-height: 42rpx;color: #333333;border-radius: 21rpx;padding: 0 22rpx;font-size: 22rpx;border: 1rpx solid rgba(51,51,51,0.3);">
				赠送记录
			</view>
		</view>

		<view class="flex flex-x-a flex-y-center fs-36 color-999999" style="margin-top: 80rpx;margin-bottom: 20rpx;padding: 0 80rpx;">
			<text @tap="choose_type(1)" :class="{'font-active':type==1}">普通红包</text>
			<text @tap="choose_type(2)" :class="{'font-active':type==2}">手气红包</text>
		</view>

		<!-- 输入框 -->
		<view v-show="type == 1" class="flex flex-x-b flex-y-center reward">
			<view>
				单个金额
			</view>
			<view class="flex flex-x-end flex-y-center">
				<input class="flex" v-model="price1" type="digit" placeholder="0.00" />
				<text class="ml-20">元</text>
			</view>
		</view>

		<view v-show="type == 2" class="flex flex-x-b flex-y-center reward">
			<view>
				<text style="background-color: #F2B05E;display: inline-block; width: 30rpx;height: 32rpx;font-size: 26rpx;color: #FFFFFF;line-height: 30rpx;text-align: center;border-radius: 4rpx;margin-right: 11rpx;">拼</text>总金额
			</view>
			<view class="flex flex-x-end flex-y-center">
				<input v-model="price2" class="flex" type="digit" placeholder="0" />
				<text class="ml-20">元</text>
			</view>
		</view>
		<view class="flex flex-x-b flex-y-center reward">
			<view>
				红包个数
			</view>
			<view class="flex flex-x-end flex-y-center">
				<input v-model="number" class="flex" type="number" placeholder="0" />
				<text class="ml-20">个</text>
			</view>
		</view>

		<view class="flex flex-x-start flex-y-center reward">

			<input v-model="desc" class="" placeholder="买之前 问亲铺，谢谢你来" style="text-align: left;padding-right: 24rpx;width: 100%;" />

		</view>

		<view class="pl-24 flex flex-y-center" style="margin-top: 40rpx;">
			<view @tap="choose_level" class="flex flex-y-center flex-x-center" style="width: 32rpx;height: 32rpx;border-radius:50%;border: 2rpx solid #666666;">
				<view v-if="level.length == 1" class="" style="width: 18rpx;height: 18rpx;border-radius: 50%;background-color: #666666;"></view>
			</view>
			<view class="fs-30 color-333333 ml-24">
				店主不可领取该红包
			</view>
		</view>


		<view style="text-align: center;">
			<view style="color: #333333;font-size: 70rpx;margin-top: 182rpx;">
				¥ {{all}}
			</view>
			<view @tap="less(send)" :class="{'nopass':!pass}" style="font-size: 30rpx;color: #FFFFFF;line-height: 70rpx; padding: 0 50rpx;background-color: #F23005;border-radius: 10rpx;margin-top: 30rpx;display: inline-block;">
				塞钱进红包
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1, //1是普通红包，2是拼手气红包
				money: 0, //可用津贴
				number: '', //红包数量
				price1: '', //单个金额
				price2: '', //总金额
				desc: '', //祝福语
				all: '0.00', //总金额
				level: [2, 3], //店主是否可灵  【2，3】
			}
		},
		computed: {
			pass() {
				//余额不足
				if (parseFloat(this.xs(this.money, 2)) <= 0) {
					return false;
				}
				this.all = this.type == 1 ? this.xs((this.xs(parseFloat(this.xs(this.price1, 2)), 2) * this.xs(parseFloat(
					this.xs(
						this.number,
						-1)), 2)), 2) : (this.xs(this.price2, 2));
				//普通红包
				if (this.type == 1) {
					//金额或者数量为空
					if (this.price1.trim() == "" || this.number.trim() == "" || parseFloat(this.xs(this.price1,
							2)) <= 0) {
						return false;
					}

					//余额不足
					if (parseFloat(this.xs(this.price1, 2)) * parseFloat(this.xs(this.number, -1)) > parseFloat(this.xs(this.money, 2)) ||
						parseFloat(this.xs(this.price1, 2)) * parseFloat(this.xs(this.number, -1)) <= 0) {
						return false;
					}
					return true;
				}

				//拼手气红包
				else if (this.type == 2) {
					//金额或者数量为空
					if (this.price2.trim() == "" || this.number.trim() == "") {
						return false;
					}

					//余额不足
					if (parseFloat(this.xs(this.price2, 2)) > parseFloat(this.xs(this.money, 2)) || parseFloat(this.xs(this.price2, 2)) <=
						0 || parseInt(this.xs(this.number, -1)) <= 0) {
						return false;
					}

					//单个红包 <=0.01
					if (parseFloat(this.xs(this.price2, 2)) / parseInt(this.xs(this.number, -1)) <= 0.01) {
						return false;
					}

					return true;
				}
				return true;
			}
		},
		methods: {
			//选择店主可领取
			choose_level() {
				this.level = this.level.length == 2 ? [2] : [2, 3];
			},
			//获取账户余额
			get_money() {
				this.getApp().request({
					data: {},
					url: this.getApp().api.jintie.info,
					success: (res) => {
						// console.log('info', res);
						if (res.code == 0) {
							this.money = res.data.subsidy || 0;
						}
					}
				});
			},
			choose_type(type) {
				if (this.type != type)
					this.type = type;
			},
			send() {
				if (!this.pass) {
					this.show_error();
					return;
				}


				uni.showModal({
					title: '确定津贴信息',
					content: `红包类型：${this.type == 1 ? '普通':'拼手气'} \n ${this.type == 1 ? '单个金额：':'总金额：'} ${this.type == 1?(this.xs(this.price1,2)):(this.xs(this.price2,2))} \n 红包数量：${this.xs(this.number,-1)} \n 消耗津贴：${this.type ==1 ? (this.xs((this.xs(parseFloat(this.xs(this.price1, 2)), 2) * this.xs(parseFloat(this.xs(
										this.number,
										-1)), 2)),2)) : (this.xs(this.price2,2))}`,
					success: (res) => {
						if (res.confirm) {
							//////////////////////
							uni.showLoading({
								title: '',
								mask: false
							});
							this.getApp().request({
								data: {
									type: this.type,
									num: this.xs(this.number, -1),
									subsidy: this.type == 1 ? (this.xs(this.price1, 2)) : (this.xs(this.price2, 2)),
									desc: this.desc || '买之前 问亲铺，谢谢你来',
									level: (this.level || [2, 3]).join(',')
								},
								url: this.getApp().api.jintie.create,
								success: (res) => {
									if (res.code == 0) {
										let data = {
											sid: res.data.sid,
											share_msg: res.data.share_msg || '',
											share_img: res.data.share_img || '',
										}
										uni.redirectTo({
											url: '/tool/shareReward/shareReward?data=' + JSON.stringify(data)
										})
									} else if (res.code == 1) {
										this.timeOut(()=>{
											uni.showToast({
												icon: 'none',
												title: res.msg || '红包生成失败',
											})
										},200)
									}
								},
								complete: res => {
									uni.hideLoading();
								}
							});

							////////////////////
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});



			},
			//显示错误信息
			show_error() {
				//余额不足
				if (parseFloat(this.xs(this.money, 2)) <= 0) {
					uni.showToast({
						icon: 'none',
						title: '余额不足'
					});
					return false;
				}

				//普通红包
				if (this.type == 1) {
					//金额或者数量为空
					if (this.price1.trim() == "" || this.number.trim() == "" || parseFloat(this.xs(this.price1,
							2)) <= 0) {
						uni.showToast({
							icon: 'none',
							title: '请正确填写金额和数量'
						});
						return false;
					}

					//余额不足
					if (parseFloat(this.xs(this.price1, 2)) * parseFloat(this.xs(this.number, -1)) > parseFloat(this.xs(this.money, 2)) ||
						parseFloat(this.xs(this.price1, 2)) * parseFloat(this.xs(this.number, -1)) <= 0) {
						uni.showToast({
							icon: 'none',
							title: '余额不足'
						});
						return false;
					}
					return true;
				}

				//拼手气红包
				else if (this.type == 2) {
					//金额或者数量为空
					if (this.price2.trim() == "" || this.number.trim() == "") {
						uni.showToast({
							icon: 'none',
							title: '请正确填写金额和数量'
						});
						return false;
					}

					//余额不足
					if (parseFloat(this.xs(this.price2, 2)) > parseFloat(this.xs(this.money, 2)) || parseFloat(this.xs(this.price2, 2)) <=
						0 || parseInt(this.xs(this.number, -1)) <= 0) {
						uni.showToast({
							icon: 'none',
							title: '余额不足'
						});
						return false;
					}
					if (parseFloat(this.xs(this.price2, 2)) / parseInt(this.xs(this.number, -1)) <= 0.01) {
						uni.showToast({
							icon: 'none',
							title: '请正确填写金额和数量'
						});
						return false;
					}
					return true;
				}
				return true;
			},
		},
		onLoad(e) {
			//未登录
			if (this.login())
				uni.navigateTo({
					url: '/pages/user/user'
				})

			uni.hideShareMenu();
			//获取余额
			this.get_money();
		}
	}
</script>

<style scoped lang="scss">
	.font-active {
		color: #333333;
		font-weight: bold;
	}

	.reward {
		width: 702rpx;
		background-color: #FFFFFF;
		margin-left: 24rpx;
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #333333;
		height: 100rpx;
		padding: 0 26rpx;
		margin-top: 60rpx;

		input {
			height: 90rpx;
			font-size: 30rpx;
			text-align: right;
		}
	}

	.nopass {
		background-color: rgba(242, 48, 5, 0.3) !important;
	}
</style>
