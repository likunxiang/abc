<template>
	<view>
		<view v-if="list.length>0" class="goods_box1" :style="'background-color:'+ background+' ;'">
			<view class="goods_all mt-20 pl-24 pr-24 fs-28 flex" v-for="(item,index) in list" :key="index" @tap="less(good_detail,'/pages/goodsTK/goodsTK?type='+type+'&id=' + item.goods_id,item.goods_id)">
				<view class="left">
					<!-- 图片 -->
					<image :src="item.goods_img" class="banner" mode="aspectFit"></image>
				</view>
				<view class="right pl-20 flex-1 flex flex-y flex-x-b" style="overflow: hidden;">
					<!-- 商品名 -->
					<view class="name">
						{{item.goods_name || ''}}
						<!-- 小图标 -->
						<image :src="item.logo" class="icon_type" mode=""></image>
					</view>
					<!-- 评分 所属 店名 -->
					<view class="flex flex-y-center fs-20 color-fff line1 text-hidden">

						<!-- 评分 -->
						<text class="pingfen mr-10" v-if="item.descScore">{{xs(item.descScore,1)}}分</text>
						<!-- RRRRRR -->
						<text class="iconfont icon-ai-r mr-10 rr " v-if="false"></text>
						<!-- 自营 -->
						<text class="ziying mr-10 " v-if="item.shop_labels && item.shop_labels.self_market">{{item.shop_labels.self_market}}</text>
						<!-- 京东国际 -->
						<text class="guoji mr-10 " v-if="item.shop_labels && item.shop_labels.jd_national">{{item.shop_labels.jd_national}}</text>
						<!-- 京东好店 -->
						<text class="haodian mr-10" v-if="item.shop_labels && item.shop_labels.jd_good_shop">{{item.shop_labels.jd_good_shop}}</text>
						<!-- 品牌自供 -->
						<text class="zigong mr-10" v-if="item.shop_labels && item.shop_labels.brand_supply">{{item.shop_labels.brand_supply}}</text>

						<text class="text-hidden" style="color: #8D8D8D;">{{item.shop_name || item.shopName || ' '}}</text>
					</view>
					<!-- 券后价 -->
					<view class="flex flex-y-end line2" style="width: 100%;">
						<!-- <view class="flex flex-y-end text-hidden">
							<text style="line-height: 28rpx;">{{item.price_label || '券后价'}} ¥ {{filters.priceStr(xs(item.final_price,2))[0]}}.</text>
							<text  style="line-height: 17rpx;font-size: 18rpx;">{{filters.priceStr(xs(item.final_price,2))[1]}}000000</text>
						</view> -->
						<view class="flex flex-y-end text-hidden" style="color: #EB0401;">
							<text style="line-height: 28rpx;">{{item.price_label || '券后价'}} ¥ {{filters.priceStr(xs(item.final_price,2))[0]}}.</text>
							<text  style="font-size: 18rpx;">{{filters.priceStr(xs(item.final_price,2))[1]}}</text>
						</view>
						<view class="flex flex-y-end text-hidden" style="margin-left: 24rpx;font-weight: normal;">
							<text style="color: #8D8D8D;line-height: 28rpx;">{{item.goods_price_label || '原价'}} ¥ {{filters.priceStr(xs(item.goods_price,2))[0]}}.</text>
							<text  style="color: #8D8D8D;font-size: 18rpx;">{{filters.priceStr(xs(item.goods_price,2))[1]}}</text>
						</view>
					</view>
					<!-- 原价 -->
					
					<!-- 券  小亲赚-->
					<view class="flex flex-x-b flex-y-end line4">
						<view class="flex">
							<text class="quan1" v-if="item.discount_price!=''&&item.discount_price!=0">券<text class="quan_num">{{item.discount_price || '0'}}元</text></text>
							<text class="zhuan" v-if="role_ == 'shoper' && commission_show && item.commission">赚<text class="zhuan_num">{{xs(item.commission,2) || ''}}</text></text>
						</view>
					</view>
					<view class="flex flex-y-end line3">
						
						<view class="flex-1">{{item.comment_content?item.comment_content : (item.monthSales?('月销量'+item.monthSales):'')}}</view>
						<view v-if="compare == true" @tap.stop="bijia(item.goods_name)" class="fs-24" style="color:#EB0401;text-decoration: underline;">
							比价
						</view>
						<button @tap.stop="mycopy(item.share_font)" v-if="true||(app=='qinpu'&&type == 1) || (app=='lianmeng'&&type!=1) || type == 'jingdong'"
						 open-type="share" class="share" :data-title="item.desc?item.desc:item.goods_name" :data-id="item.goods_id"
						 :data-img="item.goods_img" :data-type="showType" style="margin-left: 30rpx;transform: translateY(-2rpx);">一键转发</button>
					</view>

					
				</view>
			</view>
		</view>
		<slot name="footer"></slot>
	</view>
</template>

<script>
	export default {
		name: 'goodsAll',
		data() {
			return {
				app: getApp().globalData.app || 'qinpu',
				filters: require('../utils/filters.js'),
			};
		},
		props: {
			///类型 taobao  或  jingdong
			type: {
				type: [String, Number],
				default: 'taobao'
			},
			//源数据
			list: {
				type: Array,
				default: []
			},
			//商品列表背景色
			background: {
				type: String,
				default: '#FFFFFF'
			},
			//展示默认尾部
			showFooter: {
				type: Boolean,
				default: false
			},
			//share 类型 
			showType: {
				type: String,
				default: '1'
			},
			myclick: {
				type: Boolean,
				default: false
			},
			compare:{
				type: Boolean,
				default: false
			}
		},
		methods: {
			//比价
			bijia(name){
				if(this.compare){
					this.$emit('compare',name);
				}
			},
			good_detail(url) {
				if (this.myclick) {
					this.$emit('good_detail', url);
					return;
				}
				// @tap.stop="less(toApp,'pages/goodsTK/goodsTK?id=' + item.goods_id + '&type=' + type)
				this.toPage(url);
				// this.toApp(url);
				
			},
			has_lable(lable, arr) {
				if (typeof arr == 'object') {
					if (arr.lable) {
						return true;
					}

				}
				return false;

			}
		}
	}
</script>

<style lang="scss" scoped>
.goods_box1 {
		padding-bottom: 20rpx;
		overflow: hidden;
		.left {
			width: 250rpx;
			height: 250rpx;
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
			.line1{
				font-size: 24rpx;
				color: #8D8D8D;
				width: 400rpx;
				.pingfen{
					padding:  0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}
				.rr{
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
					-webkit-background-clip: text;
					color: transparent;
					-webkit-text-fill-color: transparent;
					text-fill-color: transparent;
					
				}
				.ziying{
					padding:  0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(146deg, #EB0301 0%, #F93101 72%, #FD3D01 100%);
				}
				.guoji{
					padding:  0 5rpx;
					border-radius: 4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					line-height: 30rpx;
					background: linear-gradient(135deg, #3023AE 0%, #C86DD7 100%);
				}
				.haodian{
					padding:  0 5rpx;
					border-radius: 4rpx;
					color: #8F7DDF;
					font-size: 20rpx;
					line-height: 28rpx;
					border: 1rpx solid #8F7DDF;
				}
				.zigong{
					padding:  0 5rpx;
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
					// transform: translateY(-6rpx);
					line-height: 24rpx;
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
				
			}
			button{
				margin: 0;
				padding: 0;
				line-height:30rpx;
				color: #EB0401;
				font-size: 24rpx;
				text-decoration: underline;
				background-color: rgba(0,0,0,0);
			}
		}
	}
</style>
