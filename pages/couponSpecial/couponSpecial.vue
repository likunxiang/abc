<template>
	<view class="p-24">
		<block v-if="actStoreList.length>0">
			<view v-for="(item, index) in actStoreList" :key="index">
				<!-- 一行 -->
				<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.show_style == 1">
					<!-- 单品牌内容 -->
					<!-- 品牌名字 -->
					<active :item='item' :goodsList="item.goods"></active>
		
				</view>
		
			</view>
		</block>
		<block v-else>
			<view class="flex-y-center flex-x-center" style="height: 100%;padding-top: 200rpx;">
				<view class="text-center fs-28" style="color: #DBDBDB;">
					<view class="iconfont icon-kongbaiye1" style="font-size: 400rpx;"></view>
					<view style="line-height: 53rpx;">
						<view>暂时没有相关活动</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import active from '@/components/guanyiguan/active.vue'
	export default {
		data() {
			return {
				page: 1,
				stopLoadMore: false
			}
		},
		components: {
			active
		},
		onLoad() {
			this.getStoreActivityFilter()
		},
		methods: {
			getStoreActivityFilter() {
				var self = this
				uni.showLoading({
					title: '加载中',
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_active_list,
					data: {
						is_red: 1
					},
					success: (res) => {
						//console.log('联营数据',res)
						if (res.code == 0) {
							uni.hideLoading();
							// actStoreList: res.data.data
							self.setData({
								actStoreName: res.data.name,
								actStoreList: res.data.data
							})
						}
					},
					complete: () => {
						uni.stopPullDownRefresh();
					}

				})
			},
		},
		onReachBottom() {
			var self = this
			var page = self.page
			var data = {
				is_red: 1
			}
			var url = this.getApp().api.default.walk_active_list
			this.getApp().core.pading(self, url, data, (res, index) => {
				if (res.data.data.length == 0) {
					self.setData({
						stopLoadMore: true,
					})
					return
				}
				var newActList = res.data.data
				var nowActList = self.actStoreList.concat(newActList)
				self.setData({
					actStoreList: nowActList,
				})
			})
		},
	}
</script>

<style>

</style>
