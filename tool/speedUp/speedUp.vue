<template>
	<view class="page">
		<view class="tab-bar flex">
			<view class="flex1 text-center pr" v-for="(item,index) in tabList" :key="index" @click="changeTab(index)">
				<view :class="(tabIns == index?'fs-34 color-2C2C2C ns-text-bold':'fs-34 color-8D8D8D ns-text-bold')">{{item.name}}</view>
				<view class="tab-active" v-if="tabIns == index"></view>
			</view>
		</view>
		<view style="height: 103rpx;width: 100%;">
		</view>

		<view v-if="false">
			<view class="main-list mb-20" v-for="(item,index) in 5" :key="index">
				<view class="fs-30 color-2C2C2C ns-text-bold ns-text-limit">恭喜你开店成功，新手指引已帮你准备好啦</view>
			
				<view class="ns-text-limit2 fs-28 color-8D8D8D mt-5">这个是跟上内容的描述，描述的内容只展示2行之内容后台会控制好文字的数量多。</view>
			
				<view class="flex justify-between mt-24">
					<view class="fs-24 color-8D8D8D">2020-12-02 17:00</view>
					<view class="main-list-btn flex justify-between">
						<view class="fs-24 color-fff">查看</view>
						<view class="iconfont icon-youjiantou-tianchong color-fff fs-24 ml-20"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="" style="height: 100%;padding-top: 200rpx;">
			<view class="iconfont icon-kongbaiye1 text-center" style="font-size: 300rpx;color: #DBDBDB;"></view>
			<block v-if="tabIns==0">
				<view class="text-center fs-24" style="color: #B0B0B0;">你当前是最佳状态</view>
				<view class="text-center fs-24" style="color: #B0B0B0;margin-top: 20rpx;">静待新的提醒</view>
			</block>
			<block v-else>
				<view class="text-center fs-24" style="color: #B0B0B0;">全部提醒都处理完了</view>
				<view class="text-center fs-24" style="color: #B0B0B0;margin-top: 20rpx;">你真棒呀</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						name: '最新提醒',
						id: '0'
					},
					{
						name: '历史提醒',
						id: '1'
					}
				],
				tabIns: 0
			}
		},
		methods: {
			changeTab(index) {
				this.tabIns = index
			}
		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}

	.page {
		padding: 24rpx;
		padding-top: 0rpx;
		min-height: 100%;
	}

	.tab-bar {
		position: fixed;
		width: 100%;
		top: 0rpx;
		left: 0rpx;
		background: #F4F4F4;
		padding-top: 30rpx;
		padding-bottom: 24rpx;
		z-index: 9;
	}

	.tab-active {
		position: absolute;
		bottom: -14rpx;
		left: 50%;
		margin-left: -80rpx;
		width: 160rpx;
		height: 10rpx;
		background: #EB0401;
		border-radius: 6rpx;
	}

	.main-list {
		padding: 24rpx;
		background: #fff;
		border-radius: 8rpx;
	}

	.main-list-btn {
		padding: 0rpx 24rpx;
		height: 48rpx;
		line-height: 48rpx;
		background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
		box-shadow: 0px 2px 2px 0px rgba(170, 170, 170, 0.5);
		border-radius: 24rpx;
	}
</style>
