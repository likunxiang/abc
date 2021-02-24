<template>
	<view class="">
		<view>
			<navigator :url="'/member/topic/topic?ht_id=' + item.ht_id + '&id=' + item.id" class="goods-box mb-24 bg-white">
				<view class="goods-img pr">
					<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item.cover_pic"></image>
					<view class="topic-title fs-30 color-fff ns-text-bold">{{item.ht_name}}</view>
					<!-- <view class="topic-tag text-center color-fff fs-30">话题</view> -->
				</view>
				<view class style="padding: 18rpx 26rpx 25rpx 16rpx;">
					<view>
						<view class="fs-24 color-9B9B9B ns-text-limit2">
							<rich-text :nodes="item.content"></rich-text>
						</view>
						<!-- <view class="fs-24 color-9B9B9B ns-text-limit2" style="margin-top: 6rpx;" v-if="item.content">
							<rich-text :nodes="item.content"></rich-text>
						</view> -->
					</view>
					<view class="flex justify-end align-center" style="margin-top: 24rpx;">
						<view class="flex justify-end">
							<navigator :url="'/member/topic/topic?ht_id=' + item.ht_id + '&id=' + item.id" class="material-icon align-center flex-x-center"
							 @tap.stop="stop">
								<text class="fs-24">好物说</text>
							</navigator>
						</view>
						<view v-if="token">
							<button open-type="share" class="transmit-btn align-center fs-24" @tap.stop="stop" v-if="item.share_content"
							 data-type="one_key_share" :data-text="item.share_content" :data-id="item.id" :data-htid="item.ht_id" :data-pic="item.cover_pic"
							 :data-name="item.ht_name">一键转发</button>
							<button open-type="share" class="transmit-btn align-center fs-24" @tap.stop="stop" v-else data-type="one_key_share"
							 :data-text="item.share_content" :data-id="item.id" :data-htid="item.ht_id" :data-pic="item.cover_pic"
							 :data-name="item.ht_name">转发</button>
						</view>
						<button class="transmit-btn align-center fs-24" @tap.stop="needLogin" v-else>一键转发</button>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: this.getApp().core.getStorageSync('ACCESS_TOKEN') || '',
				role: this.getApp().core.getStorageSync('role') || ''
			}
		},
		props: {
			show_title: {
				type: Boolean,
				default: false
			},
			item: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			stop() {
				return
			},
			needLogin() {
				console.log(222);
				this.$emit('needLogin')
			}
		}
	}
</script>

<style scoped>
	.topic-title {
		position: absolute;
		width: 100%;
		bottom: 0rpx;
		left: 0rpx;
		padding: 24rpx 17rpx;
		/* background: rgba(0,0,0,.6);
		box-shadow: 0rpx -5rpx 10rpx 0rpx rgba(0,0,0,.6); */
		background: linear-gradient(0deg, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0.01));
	}

	.topic-tag {
		position: absolute;
		left: 16rpx;
		top: 16rpx;
		width: 100rpx;
		height: 46rpx;
		background: #333333;
		opacity: 0.6;
		border-radius: 6rpx;
		line-height: 46rpx;
	}

	.material-icon {
		height: 56rpx;
		border: 1rpx solid #F23005;
		border-radius: 28rpx;
		line-height: 54rpx;
		font-size: 24rpx;
		color: #F23005;
		padding: 0 22rpx;
	}

	.transmit-btn {
		height: 56rpx;
		line-height: 56rpx;
		color: #fff;
		background: #F23005;
		box-shadow: 0px 5rpx 12rpx 0px rgba(242, 48, 5, 0.36);
		border-radius: 28rpx;
		text-align: center;
		margin-left: 16rpx;
		margin-right: 0rpx;
	}
</style>
