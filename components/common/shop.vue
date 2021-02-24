<template>
	<view v-if="is_choose_mch" style="position: relative;z-index: 100000;">
		<!-- <view class="flex flex-x-center flex-y-center"  @touchmove.stop.prevent="" style="width: 100%;height: 100vh;background-color: rgba(0,0,0,0.7);position: fixed;z-index: 99999;">
			
		</view> -->
		
		<uni-popup ref="shop" type="center" :maskClick="false">
			<view class="shop-content">
				<view class="shop-h">
					<view>温馨提示</view>
					<view>即将进入新店铺</view>
				</view>
				
				<view class="flex flex-x-b flex-y-center" style="padding:0 75rpx;">
					
					<view class="flex flex-y flex-x-center flex-y-center" style="width: 180rpx;white-space: nowrap;">
						<view v-if="show_type == 1" class="fs-30" style="margin-top: 50rpx;color: #595959;">【店铺已关】</view>
						<view v-else class="fs-30" style="margin-top: 50rpx;color: #595959;">【上一家店铺】</view>
						<view class="img-head pr" hover-class="click1"  @tap="choose1">
							<image :src="old_mch_info.logo" mode=""></image>
							<view v-if="show_type==1" class="close-shop">已关店</view>
						</view>
						<view class="mt-20">{{old_mch_info.mch_name}}</view>
					</view>
					
					<view style="margin-top: 60rpx;">
						<text v-if="show_type==1" class="iconfont icon-jinrufasong fs-40" style="color: #595959;"></text>
						<text v-else style="font-size: 30rpx;color:#595959 ;">或</text>
					</view>
					
					<view class="flex flex-y flex-x-center flex-y-center" style="width: 180rpx;white-space: nowrap;">
						<view v-if="show_type == 1" class="fs-30" style="margin-top: 50rpx;color: #595959;">【即将进入】</view>
						<view v-else class="fs-30" style="margin-top: 50rpx;color: #595959;">【当前店铺】</view>
						<view  class="img-head" hover-class="click1" @tap="choose2">
							<image :src="new_mch_info.logo" mode=""></image>
						</view>
						<view class="mt-20">{{new_mch_info.mch_name}}</view>
					</view>
					
				</view>
				
				
				<view class="fs-30" style="color: #595959;text-align: center;margin-top: 56rpx;">
					<block v-if="show_type == 1">
						<view>你之前访问的店铺已关店</view>
						<view>分配这位新店主为你继续服务</view>
					</block>
					
					<block v-else>
						<view style="color: #EB0401;font-size: 34rpx;font-weight: bold;">点击店主头像</view>
						<view style="color: #EB0401;font-size: 34rpx;font-weight: bold;margin-bottom: 58rpx;">选择你想要进入的店铺</view>
					</block>
					
					<view  @tap="choose2" hover-class="click1" v-if="show_type==1" class="flex flex-x-center flex-y-center color-fff fs-30" style="width: 400rpx;height: 70rpx;border-radius: 35rpx;margin-left: 115rpx;margin-top: 19rpx;margin-bottom: 60rpx;background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);">知道了</view>
				</view>
				
				
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:'shop',
		data(){
			return {
				show_type:2, //1上一家已关店  2进入新店铺
				new_mch_info: {},
				old_mch_info: {},
				request_end: false
			}
		},
		computed:{
			is_choose_mch() {
				return this.$store.state.is_choose_mch
			},
		},
		mounted() {
			if (this.is_choose_mch) {
				this.getMchInfo()
			}
		},
		methods:{
			choose1(){
				if(this.show_type == 1)
				return ;
				this.$refs.shop.close();
			},
			choose2(){
				let route = this.getPath()
				let new_mch_id = this.new_mch_info
				console.log(route + '?mch_id=' + new_mch_id);
				uni.setStorageSync('_mchInfo',{})
				uni.reLaunch({
					url: '/' + route + '?' + this.getApp().helper.objectToUrlParams(this.$store.state.options)
				})
				console.log(this.getApp().helper.objectToUrlParams(this.$store.state.options));
				console.log('state',this.$store.state.options);
				uni.removeStorage('new_mch_id')
				this.$refs.shop.close();
			},
			close(){
				this.$refs.shop.close();
			},
			getMchInfo() {
				console.log(uni.getStorageSync('_mchInfo').id);
				let old_mch_id = uni.getStorageSync('_mchInfo').id
				let new_mch_id = uni.getStorageSync('new_mch_id')
				console.log('弹窗里的new',new_mch_id);
				this.getApp().request({
					url: this.getApp().api.default.select_mch,
					data: {
						old_mch_id: old_mch_id,
						now_mch_id: new_mch_id
					},
					success: (res) => {
						console.log(res); 
						if( res.code == 1) {
							let old_mch_info = res.data.old
							let new_mch_info = res.data.now
							this.old_mch_info = old_mch_info
							this.new_mch_info = new_mch_info
							this.$refs.shop.open();
							
							// is_open 0 关店   1开店
							if (old_mch_info.is_open == 0) {
								this.show_type = 1
							} else {
								this.show_type = 2
							}
						} else {
						}
					},
				})
			}
		},
	}
</script>

<style lang="scss">
	.shop-content{
		width: 630rpx;
		overflow: hidden;
		border-radius: 18rpx;
		background-color: #FFFFFF;
		.shop-h{
			width: 100%;
			height: 152rpx;
			background: linear-gradient(270deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
			color: #FFFFFF;
			text-align: center;
			font-size: 40rpx;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-items: center;
		}
		
		
		.img-head{
			margin-top: 24rpx;
			width:180rpx;
			height: 180rpx;
			border-radius: 90rpx;
			overflow: hidden;
			image{
				width: 180rpx;
				height: 180rpx;
				border-radius: 50%;
			}
			// background-color: red;
			box-shadow: 0 0 1rpx 1rpx rgba(0,0,0,0.8);
			color:#595959;
			font-size: 30rpx;
			
			.close-shop{
				position: absolute;
				width: 180rpx;
				height: 180rpx;
				z-index: 2;
				background-color: rgba(0,0,0,0.5);
				line-height: 180rpx;
				color: #FFFFFF;
				text-align: center;
				left: 0;
				top:0;
				font-size: 30rpx;
			}
		}
	}
</style>
