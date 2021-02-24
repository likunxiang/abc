<template>
	<view class="page ">
		<custom title="我的会员" mode="2" btnMode="2" fixed="fixed" :height="customBar" background="#fff" titleColor="#2C2C2C" backColor="#2C2C2C" borderColor="#535353"></custom>
		<view class="tab-bar flex justify-between pr" :style="'top:' + customBar + 'px;'">
			
			<view :class="'tab color-8D8D8D ' + (ins==index?'color-2C2C2C':'color-8D8D8D')" v-for="(item,index) in tabList" :key='index'
			 @click="changeTab(index)">
				<ivew class="fs-30 ns-text-bold">{{item.title}}</ivew>
				<view><text class="fs-50">{{item.num}}</text><text class="fs-24 ml-24">张</text></view>
			</view>
			<navigator url="/member/buyCard/buyCard" class="buy-btn">购买</navigator>
		</view>
		<view  :style="'height: calc(150rpx + ' + customBar + 'px);'"></view>
		<view class="main" :style="'height: calc(100vh - 150rpx - ' + customBar + 'px);'">
			<!-- 列表为空 -->
			<view v-if="cardList.length <= 0" class="flex-x-center flex-y-center ns-column" style="height: 100%;">
				<!-- 可用亲卡为空 -->
				<view v-show="ins == 0">
					<view class="iconfont icon-kongbaiye text-center color-D6D6D6" style="font-size: 180rpx;"></view>
					<view class="text-center fs-30 color-8D8D8D" style="line-height: 42rpx;margin-top: 67rpx;">
						<view>没有可用亲卡了</view>
						<view>去买一张来送人吧</view>
					</view>
					<navigator url="/member/buyCard/buyCard" class="cu-btn to-buy-btn">点击，立即购买</navigator>
				</view>
				<!-- 待领取亲卡为空 -->
				<view v-show="ins == 1" class="flex ns-column flex-x-center">
					<view class="iconfont icon-kongbaiye text-center color-D6D6D6" style="font-size: 180rpx;"></view>
					<view class="text-center fs-30 color-8D8D8D" style="line-height: 42rpx;margin-top: 67rpx;">
						<view>亲卡都被领光了</view>
						<view>你真棒</view>
					</view>
					<navigator url="/pages/vipList/vipList" class="cu-btn to-buy-btn">查看我的会员</navigator>
				</view>
			</view>
			<!-- 列表有数据 -->
			<view class="" v-else>
				<view class="card-box flex-y-center" :style="'background: url(' + (item.use_exptime_status==1?no_valid_pic:have_valid_pic) + ') no-repeat;background-size: 100% 100%'"
				 v-for="(item,index) in cardList" :key="index">
					<view class="flex align-center justify-between flex-grow-1">
						<view class="color-fff">
							<view class="fs-36 ns-text-bold">{{item.desc}}</view>
							<view class="mt-20 fs-28">有效期至：{{item.use_exptime_str}}</view>
							<view class="fs-24 mt-5">* {{item.subsidy_str}}</view>
						</view>
						<button open-type="share" class="send-btn" v-if="item.exptime_str <= 0" :data-id="item.id">赠送</button>
						<view v-else class="fs-28 text-center color-fff">
							<view>剩余</view>
							<view>{{item.timer_str}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				customBar:getApp().globalData.customBar,
				tabList: [{
					title: '可用亲卡',
					type: 0,
					num: '0'
				}, {
					title: '待领取亲卡',
					type: 1,
					num: '0'
				}],
				ins: 0,
				issue_card: '0', // 可用亲卡
				wait_card: '0', // 待领取亲卡
				have_valid_pic: '', // 有有效期图片
				no_valid_pic: '', // 无有效期图片
				cardList: [],
				stopLoadMore: false,
				page: 1

			}
		},
		components: {
			custom
		},
		onLoad() {
			uni.hideShareMenu()
		},
		onShow() {
			this.getCardList()
			this.getShareImg()
		},
		methods: {
			changeTab(index) {
				this.ins = index
				this.stopLoadMore = false
				this.page = 1
				this.getCardList()
			},
			getCardList() {
				this.getApp().request({
					url: this.getApp().api.default.share_mem_card_data,
					data: {
						type: this.ins + 1
					},
					success: res => {
						if (res.code == 0) {
							this.tabList[0].num = res.data.issue_card
							this.tabList[1].num = res.data.wait_card
							this.issue_card = res.data.issue_card
							this.wait_card = res.data.wait_card
							this.have_valid_pic = res.data.coupon_a
							this.no_valid_pic = res.data.coupon_b
							this.cardList = res.data.list
							this.sid = res.data.sid
							this.sign = res.data.sign
							for (let i in this.cardList) {
								var timer_str_hour = parseInt(this.cardList[i].exptime_str / 60 / 60) + '时'
								var timer_str_min = parseInt(this.cardList[i].exptime_str / 60 % 60) + '分'
								this.cardList[i].timer_str = timer_str_hour + timer_str_min
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				})
			},
			sendCard(e) {
				this.getApp().request({
					url: this.getApp().api.default.sharer_card_info,
					data: {
						id: e,
						sign: this.sign
					},
					success: res => {
						if (res.code == 0) {} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				});
			},
			getShareImg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareImg: res.data.vipImg,
								share_step: this.getApp().core.getStorageSync('_img').share1,
								share_member: this.getApp().core.getStorageSync('_img').shareMenber
							});
						}
					}
				});
			},

		},
		onReachBottom() {
			var self = this;
			var page = self.page;
			var data = {
				type: this.ins + 1
			};
			var url = this.getApp().api.default.share_mem_card_data;
			this.getApp().core.pading(self, url, data, function(res) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true
					});
					return;
				}

				var newActList = res.data.list;
				console.log(newActList);
				var nowActList = self.cardList.concat(newActList);
				self.cardList = nowActList
			});
		},
		onShareAppMessage: function(options) {
			console.log(options);
			var card_id = options.target.dataset.id
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
			var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
			var title = nickname + ' 送你一张超值会员卡，大家一起省钱啊，感恩～';
			var img = this.shareImg;
			this.sendCard(card_id)
			this.getCardList()
			// var img = this.shareImg;
			console.log(this.sign, this.sid);
			return {
				title: title,
				path: '/member/getVipCard/getVipCard?sid=' + this.sid + '&sign=' + this.sign + '&card_id=' + card_id + '&type=1' +
					'&mch_id=' + mch_id,
				imageUrl: img
			};
		},
	}
</script>

<style>
	.page {
		min-height: 100%;
	}

	.tab-bar {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		background: #fff;
		padding: 22rpx 24rpx;
		padding-left: 150rpx;
		padding-right: 130rpx;
		z-index: 1;
	}

	.main {
		padding: 30rpx 24rpx;
	}

	.buy-btn {
		width: 107rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background: #EB0401;
		box-shadow: 0px 0px 2rpx 0px rgba(210, 29, 29, 0.5);
		border-radius: 48rpx 10rpx 10rpx 48rpx;
		position: absolute;
		right: 0rpx;
		bottom: 20rpx;
		font-size: 28rpx;
		color: #fff;
	}

	.to-buy-btn {

		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		box-shadow: 0px 0px 2rpx 0rpx rgba(210, 29, 29, 0.5);
		border-radius: 10rpx;
		color: #fff;
		height: 80rpx;
		margin-top: 30rpx;
	}

	.card-box {
		width: 100%;
		height: 200rpx;
		padding-left: 210rpx;
		padding-right: 29rpx;
		margin-bottom: 20rpx;
	}

	.send-btn {
		width: 100rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 2rpx 0px rgba(210, 29, 29, 0.5);
		border-radius: 10rpx;
		color: #EB0401;
		font-size: 28rpx;
		margin-left: 0;
		margin-right: 0;
		padding-left: 0px;
		padding-right: 0px;
	}
</style>
