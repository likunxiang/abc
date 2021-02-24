<template>
	<view class="flex flex-y" style="height: 100vh;">
		<common></common>
		<view>
			<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
			 fixed="fixed" title="视频购物" titleColor="#2C2C2C" background="#FFFFFF"></custom>
		</view>
		<view class="flex-1" style="overflow: hidden;">
			<video src="" controls :autoplay="true" :show-center-play-btn="true" @ended="next_video" :style="'width: 100%;background-color: red;margin: 0;padding: 0;height:calc(100vh - '+customBar+'px)'"></video>
		</view>



		<!-- 商品列表开始 -->
		<view class="" style="position: fixed;bottom: 50rpx;left: 0;z-index: 9;width: 100%;">
			<!-- 商品列表开始 -->
			<view class="goods_box pl-24 pr-24" style="margin-top: 8rpx;overflow: hidden;">
				<view style="background-color: #FFFFFF;padding:15rpx;border-radius: 8rpx;animation: open 0.3s;" class="goods_all mt-20 fs-28 flex" v-for="(item,index) in goods"
				 :key="index" @tap.stop="less(toApp,'pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=taobao')" hover-class="click1">
					<view class="left">
						<!-- 图片 -->
						<image :src="item.goods_img" style="width: 220rpx;height: 220rpx;" class="banner" mode="aspectFit"></image>
					</view>
					<view class="right pl-20 flex-1 flex flex-y flex-x-b">
						<!-- 商品名 -->
						<view class="name">
							{{item.goods_name || ''}}
							<!-- 小图标 -->
							<image :src="item.logo" class="icon_type" mode=""></image>
						</view>
						<!-- 评分 所属 店名 -->
						<view class="fs-24" style="font-weight: bold;color: #EB0401;">
							{{item.limit_buy_special_text ? (item.limit_buy_special_text[0] ? item.limit_buy_special_text [0] : ' ') : " "}}
						</view>
						<!-- 券后价 -->
						<view class="flex flex-y-end flex-x-b" style="color: #EB0401;font-weight: bold;">
							<!-- <text style="font-size: 20rpx;line-height: 20rpx;">¥</text><text style="font-size: 24rpx;line-height: 24rpx;">{{filters.priceStr(xs(item.price,2))[0] || '0'}}</text><text class="min" style="line-height: 18rpx;">.{{filters.priceStr(xs(item.price,2))[1] || '0'}}</text>  <text style="font-size: 20rpx;color: #8D8D8D;margin-left: 14rpx;">¥ 45.</text><text style="font-size: 20rpx;color: #8D8D8D;">00</text> -->
							<view class="flex  flex-y-end">
								<view style="font-size: 22rpx;margin-right: 6rpx;">¥</view>
								<view style="font-size: 26rpx;transform: translateY(1rpx);">{{filters.priceStr(xs(item.final_price,2))[0] || '0'}}</view>
								<view class="min" style="font-size: 20rpx;">.{{filters.priceStr(xs(item.final_price,2))[1] || '0'}}</view>
								<view style="font-size: 22rpx;color: #8D8D8D;margin-left: 14rpx;">¥
									{{filters.priceStr(xs(item.goods_price,2))[0] || '0'}}.</view>
								<view style="font-size: 20rpx;color: #8D8D8D;">{{filters.priceStr(xs(item.goods_price,2))[1] || '0'}}</view>
							</view>
							<view style="color:#8D8D8D;font-size: 24rpx;font-weight: normal;">
								{{item.comment_content || ''}}
							</view>
						</view>

						<!-- 券  小亲赚-->
						<view class="flex flex-x-b flex-y-end line4">
							<view class="flex">
								<text class="quan1" v-if="item.discount_price">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
								<text class="zhuan" v-if="role_ == 'shoper' && commission_show">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
							</view>
							<!-- <button @tap.stop="mycopy(item.share_font)" v-if="app=='lianmeng'" open-type="share" class="share" :data-title="item.desc?item.desc:item.goods_name"
							 :data-id="item.goods_id" :data-img="item.goods_img" :data-type="showType">一键转发</button> -->
							<text style="color: #EB0401;font-size: 24rpx;text-decoration: underline;">查看详情</text>
						</view>



					</view>
				</view>
			</view>
			<!-- 商品列表结束 -->
		</view>
		<!-- 商品列表结束 -->


		<!-- 右上角按钮开始 -->
		<view class="flex flex-y color-fff fs-24" style="position: fixed;z-index: 9;right: 34rpx;top: 0;animation: open-left 0.3s;" :style="{'top':customBar+'px'}">
			<view class="flex flex-y flex-x-center flex-y-center" style="margin-top: 30rpx;">
				<view class="iconfont icon-iconfontpaixingbang "></view>
				<view style="margin-top: 4rpx;">2.5万</view>
			</view>
			<view class="flex flex-y flex-x-center flex-y-center" style="margin-top: 30rpx;">
				<view class="iconfont icon-youyong"></view>
				<view style="margin-top: 4rpx;">3564</view>
			</view>
		</view>
		<!-- 右上角按钮结束 -->

		<!-- 右下角按钮开始 -->
		<view class="flex flex-y color-fff fs-20" style="position: fixed;z-index: 9;right: 34rpx;bottom: 350rpx;animation: open-left 0.3s;">
			<view class="flex flex-y flex-x-center flex-y-center" style="margin-top: 40rpx;width: 80rpx;height: 80rpx;background-color: rgba(112,113,115,0.5);border-radius: 40rpx;background-color: red;">
				<view class="iconfont icon-xiazai1"></view>
				<view>下载</view>
			</view>
			<view v-if="login(false) == false" @tap.stop="less(login)" class="flex flex-y flex-x-center flex-y-center" style="margin-top: 40rpx;width: 80rpx;height: 80rpx;background-color: rgba(112,113,115,0.5);border-radius: 40rpx;background-color: red;">
				<view class="iconfont icon-zhuanfa"></view>
				<view>分享</view>
			</view>
			<button v-else open-type="share" class="share-clear" style="line-height: 0;">
				<view class="flex flex-y flex-x-center flex-y-center fs-20 color-fff" style="margin-top: 40rpx;width: 80rpx;height: 80rpx;background-color: rgba(112,113,115,0.5);border-radius: 40rpx;background-color: red;line-height: 26rpx;">
					<view class="iconfont icon-zhuanfa"></view>
					<view>分享</view>
				</view>
			</button>
		</view>
		<!-- 右下角按钮结束 -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				customBar: getApp().globalData.customBar,
				goods: [{}],
				filters: require('../../utils/filters.js'),
				id:'',
			}
		},
		onLoad(e) {
			this.getApp().page.onLoad(this,e);
			if(e.id){
				this.id = e.id;
				this.loadData(e.id);
			}
		},
		methods: {
			//获取数据
			loadData(id){
				
			},
			//视频播放结束，加载下一个视频和数据
			next_video(){
				
			}
		}
	}
</script>

<style lang="scss">
	.goods_box {
		padding-bottom: 20rpx;
		overflow: hidden;

		.left {
			width: 220rpx;
			height: 220rpx;
			overflow: hidden;

			image {
				width: 250rpx;
				height: 250rpx;
				border-radius: 8rpx;
				background-color: rgba(0, 0, 0, 0.1);
				font-size: 0;
				line-height: 0;
			}
		}

		.right {
			position: relative;
			padding-bottom: 0rpx;

			.name {
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-word;
				position: relative;
				text-indent: 40rpx;
				min-height: 80rpx;
				word-wrap: break-word;
				word-break: break-all;
			}

			.icon_type {
				position: absolute;
				top: 5rpx;
				left: 0;
				// background-color: rgba(0, 0, 0, 0.05);
				width: 30rpx;
				height: 30rpx;
				z-index: 1;
				border-radius: 4rpx;
			}

			.line1 {
				font-size: 24rpx;
				color: #8D8D8D;
				width: 400rpx;

				.pingfen {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.rr {
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
					-webkit-background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					text-fill-color: transparent;

				}

				.ziying {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}

				.guoji {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
				}

				.haodian {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #8F7DDF;
					font-size: 20rpx;
					line-height: 28rpx;
					border: 1rpx solid #8F7DDF;
				}

				.zigong {
					padding: 0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}
			}

			.line2 {
				color: #EB0401;
				font-size: 24rpx;
				font-weight: bold;

				.min {
					font-size: 18rpx;
					transform: translateY(-6rpx);
				}
			}

			.line3 {
				font-size: 24rpx;
				color: #8D8D8D;

				.min {
					font-size: 18rpx;
					transform: translateY(-3rpx);
				}
			}

			.line4 {
				.quan1 {
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 0 8rpx;
					background: linear-gradient(135deg, #F76436 0%, #F49E3A 100%);
					margin-right: 10rpx;
					position: relative;
					font-size: 24rpx;
					color: #FFFFFF;

					.quan_num {
						padding-left: 20rpx;
					}

					&::before {
						content: "";
						position: absolute;
						width: 0.5px;
						height: 29rpx;
						left: 39rpx;
						top: 50%;
						transform: translate(0, -50%);
						background-color: #FFFFFF;
						z-index: 2;
						opacity: 0.5;
					}
				}

				.zhuan {
					border-radius: 8rpx;
					line-height: 40rpx;
					padding: 0 8rpx;
					background: linear-gradient(127deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
					margin-right: 10rpx;
					position: relative;
					font-size: 24rpx;
					color: #FFFFFF;

					.zhuan_num {
						padding-left: 20rpx;
					}

					&::before {
						content: "";
						position: absolute;
						width: 0.5px;
						height: 29rpx;
						left: 39rpx;
						top: 50%;
						transform: translate(0, -50%);
						background-color: #FFFFFF;
						z-index: 2;
						opacity: 0.5;
					}
				}

				button {
					margin: 0;
					padding: 0;
					line-height: 30rpx;
					color: #EB0401;
					font-size: 24rpx;
					text-decoration: underline;
					background-color: rgba(0, 0, 0, 0);
				}
			}
		}
	}
	
	
	@keyframes open {
		0% {
			transform: translateY(130%);
		}
	
		100% {
			transform: translateY(0);
		}
	}
	
	@keyframes open-left {
		0% {
			transform: translateX(130%);
		}
	
		100% {
			transform: translateY(0);
		}
	}
</style>
