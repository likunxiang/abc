<template>
	<view class="page p-24">
		<!-- 我的 -->
		<view class="mine-box mb-20">
			<view class="mine-header flex align-center">
				<view class="fs-30 color-2C2C2C ns-text-bold">我的</view>
				<view class="fs-24 color-8D8D8D" style="margin-left: 22rpx;">方便用户联系到你，提升业绩收入</view>
			</view>
			<view class="mine-body">
				<view class="mine-info flex align-center justify-between">
					<view class="flex align-center flex-grow-1">
						<image class="flex-grow-0" :src="mch_book.my.avatar_url" mode="aspectFill" style="width: 111rpx;height: 111rpx;background: #007AFF;border-radius: 50%;margin-right: 21rpx;"></image>
						<view class="flex-grow-1">
							<view class="fs-30 ns-text-bold color-2C2C2C ns-text-limit">{{mch_book.my.nickname}}</view>
							<view class="fs-26 color-8D8D8D" v-if="!edit_mine_wechat">微信号：{{input_wechat?input_wechat:mch_book.my.wechat_name}}</view>
							<view v-else>
								<input class="fs-26 color-8D8D8D" type="text" :value="input_wechat" placeholder="请输入微信号或手机号" @blur="inputWechat" />
							</view>
						</view>
					</view>
					<view class="mine-btn flex-grow-0" @click="editWechat" v-if="!edit_mine_wechat">修改微信号</view>
					<view class="mine-btn flex-grow-0" style="background: #EB0401;color: #fff;" @click="saveWechat" v-else>保存</view>
				</view>
				<view class="mine-desc mt-16 fs-24 color-2C2C2C" style="line-height: 33rpx;">
					<jyf-parser :html="mch_book.my.desc" selectable="true"></jyf-parser>
				</view>
			</view>
		</view>
		<!-- 推荐人 -->
		<view class="mine-box mb-20" v-if="mch_book.parent.code == 0">
			<view class="mine-header flex align-center">
				<view class="fs-30 color-2C2C2C ns-text-bold">推荐人</view>
				<view class="fs-24 color-8D8D8D" style="margin-left: 22rpx;">感谢推荐人，让我们认识优秀的你</view>
			</view>
			<view class="mine-body">
				<view class="mine-info flex align-center justify-between">
					<view class="flex align-center flex-grow-1">
						<image class="flex-grow-0" :src="mch_book.parent.avatar_url" mode="aspectFill" style="width: 111rpx;height: 111rpx;background: #007AFF;border-radius: 50%;margin-right: 21rpx;"></image>
						<view class="flex-grow-1">
							<view class="fs-30 ns-text-bold color-2C2C2C ns-text-limit">{{mch_book.parent.nickname}}</view>
							<view class="fs-26 color-8D8D8D">微信号：{{mch_book.parent.wechat_name}}</view>
						</view>
					</view>
					<view class="mine-btn flex-grow-0" @click="copyText" :data-text="mch_book.parent.wechat_name">复制微信号</view>
				</view>
			</view>
		</view>
		<!-- 辅导人 -->
		<view class="mine-box" v-if="mch_book.group.code == 0">
			<view class="mine-header flex align-center">
				<view class="fs-30 color-2C2C2C ns-text-bold">辅导人</view>
				<view class="fs-24 color-8D8D8D" style="margin-left: 22rpx;">辅导人业绩很棒，加她好友，学习经验</view>
			</view>
			<view class="mine-body">
				<view class="mine-info flex align-center justify-between">
					<view class="flex align-center flex-grow-1">
						<image class="flex-grow-0" :src="mch_book.group.avatar_url" mode="aspectFill" style="width: 111rpx;height: 111rpx;background: #007AFF;border-radius: 50%;margin-right: 21rpx;"></image>
						<view class="flex-grow-1">
							<view class="fs-30 ns-text-bold color-2C2C2C ns-text-limit">{{mch_book.group.nickname}}</view>
							<view class="fs-26 color-8D8D8D">微信号：{{mch_book.group.nickname}}</view>
						</view>
					</view>
					<view class="mine-btn flex-grow-0"  @click="copyText" :data-text="mch_book.group.wechat_name">复制微信号</view>
				</view>
				<view class="mine-desc mt-16 fs-24 color-2C2C2C" style="line-height: 33rpx;">
					每一位小亲，都分配了特别有经验的大亲做辅导人🌹。看看你有没有在Ta的亲团群，还没有进去话，加Ta微信赶紧进群吧。给自己一个机会，认识更多牛人。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from '../../components/jyf-parser/jyf-parser.vue'
	export default {
		data() {
			return {
				edit_mine_wechat: false ,
				input_wechat: '',
				mch_book: {}
			}
		},
		onLoad() {
			this.getMchBook()
		},
		components: {
			jyfParser
		},
		methods: {
			editWechat() {
				this.edit_mine_wechat = true
			},
			inputWechat(e) {
				this.input_wechat = e.detail.value
			},
			// 保存需要调用接口
			saveWechat() {
				this.edit_mine_wechat = false
				if(this.input_wechat.length <= 0) {
					uni.showToast({
						title: '微信号或手机号不能为空',
						icon: 'none'
					})
					return
				} 
				uni.showLoading({
					title: '保存中',
					mask: true
				})
				this.getApp().request({
					url: this.getApp().api.user.keep_wechat,
					method: 'POST',
					data: {
						wechat_name: this.input_wechat,
						mch_id: this.mch_book.my.mch_id
					},
					success: res => {
						if(res.code == 0) {
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
					complete: res => {
						uni.hideLoading()
					}
				})
			},
			getMchBook() {
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.getApp().request({
					url: this.getApp().api.user.mch_book,
					data: {
						
					},
					success: res => {
						if(res.code == 0) {
							this.mch_book = res.data
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					},
					complete: res => {
						uni.hideLoading()
					}
				})
			},
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				uni.setClipboardData({
					data: text,
					success(res) {
						uni.showToast({
							title: '复制成功，去微信添加好友',
							duration: 3000,
							icon: 'none'
						});
						uni.getClipboardData({
							success(res) {}
			
						});
					}
			
				});
			},
		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}
	.mine-box {
		width: 100%;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 0 14rpx;
	}
	.mine-header {
		padding: 20rpx 22rpx;
		border-bottom: 1rpx solid rgba(207, 207, 207, 0.33);
	}
	.mine-body {
		padding: 24rpx 10rpx 24rpx 22rpx;
	}
	.mine-btn {
		width: 180rpx;
		padding: 10rpx 0;
		text-align: center;
		border-radius: 10rpx;
		border: 2rpx solid #EB0401;
		font-size: 28rpx;
		color: #EB0401;
	}
</style>
