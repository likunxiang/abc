<template>
	<view class="lqq-custom" :style="{'height':height?height:(customBar+'px')}">
		<!--头部导航栏 -->
		<view class="lqq-content" :class="{'mode1':mode == 1,'mode2':mode == 2,'otherMode':btnMode == 2 && mode == 2}" :style="{'height': customBar   + 'px','padding-top':statusBar+'px','background':background,'position':(fixed?fixed:'relative')}">
			<view class="lqq-left" :style="{'height':customBar - statusBar +'px'}">
				<text @click="goback" v-if="!hiddenBtn&&btnMode==1" :style="{'color':backColor}" class="iconfont icon-zuojiantoubeifen aaa"></text>
				<view class="btnMode2" :style="{'border-color':borderColor,'border-radius':(customHeight/2) + 'px','color':backColor,'height':'58rpx','background-color':houseBackgroundColor} "
				 v-if="!hiddenBtn&&btnMode==2">
					<text @click="goback" class="btnIcon iconfont icon-zuojiantoubeifen"></text><text @click="goback2" class="btnIcon iconfont icon-zhuye"></text>
					<view class="line-line" :style="{'background-color':lineColor || backColor}">

					</view>
				</view>
			</view>
			<view class="lqq-center" :style="{'height':customBar - statusBar +'px'}">
				<text :style="{'color':titleColor}">{{title}}</text>
				<slot name="slot1"></slot>
			</view>
			<view class="lqq-right" :style="{'height':customBar - statusBar +'px'}">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		naem: 'custom',
		data() {
			return {
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				customHeight: (getApp().globalData.custom.bottom - getApp().globalData.custom.top) || 0,

			};
		},
		props: {
			//是否固定，不会随着页面滚动
			fixed: {
				type: String,
				default: ''
			},
			//整个导航栏的高度决定是否占高
			height: {
				type: String,
				default: ''
			},
			//背景色，background属性
			background: {
				type: String,
				default: ''
			},
			//显示模式 ，1：所有元素左浮动效果，2：标题居中显示
			mode: {
				type: [String, Number],
				default: 1
			},
			//中部标题
			title: {
				type: String,
				default: ''
			},
			//标题样式颜色
			titleColor: {
				type: String,
				default: '#FFFFFF'
			},
			//返回按钮样式颜色
			backColor: {
				type: String,
				default: '#FFFFFF'
			},
			//隐藏返回按钮
			hiddenBtn: {
				type: Boolean,
				default: false
			},
			//返回按钮模式 1 普通模式***  2 双按钮模式
			btnMode: {
				type: [String, Number],
				default: 1
			},
			// 边框的颜色
			borderColor: {
				type: String,
				default: 'rgba(0,0,0,1)'
			},
			//双按钮背景色 又透明度
			houseBk: {
				type: Boolean,
				default: false
			},
			lineColor: {
				type: String,
				default: ''
			},
		    // 是否用自己的返回按钮
			pageBack: {
				type: Boolean,
				default: false
			}

		},
		methods: {
			goback() {
				if(this.pageBack) {
					this.$emit('goback')
				} else {
					this.uniBack();
				}
			},
			goback2() {
				uni.reLaunch({
					url: "/pages/index/index",
					fail: res => {
						uni.reLaunch({
							url: '/pages/qinUnion/qinUnion'
						})
					}
				})
			}
		},
		computed: {
			houseBackgroundColor() {
				if (this.houseBk)
					return 'rgba(255, 255, 255, 0.7)';
				return 'rgba(255, 255, 255, 0)';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lqq-custom {
		width: 750rpx;
		position: relative;
		z-index: 999;

		.lqq-content {
			overflow: hidden;
			width: 750rpx;

			.lqq-left,
			.lqq-right,
			.lqq-center {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				text {
					font-size: 32rpx;
				}
			}

		}

		.mode1 {
			display: flex;
			flex-flow: row nowrap;

			.lqq-left,
			.lqq-right,
			.lqq-center {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				// color: #FFFFFF;
			}

			.lqq-left {
				padding-left: 20rpx;
				box-sizing: border-box;

				.aaa {
					width: 50rpx;
					height: 100%;
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
				}
			}

			.lqq-center {
				padding-left: 20rpx;
				font-size: 32rpx;
			}

		}

		.mode2 {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-between;

			.lqq-left {
				width: 70rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				// color: #FFFFFF;
				font-size: 20rpx;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				.aaa {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

			.lqq-right {
				width: 70rpx;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
			}

			.lqq-center {
				flex: 1;
				text-align: center;
				// color: #FFFFFF;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				justify-content: center;
				font-size: 32rpx;
			}
		}
	}

	.btnMode2 {
		width: 158rpx;
		border: 0.5px solid #FFFFFF;
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		position: relative;

		.btnIcon {
			width: 50%;
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
		}

		.line-line {
			position: absolute;
			content: "";
			right: 50%;
			top: 50%;
			transform: translateY(-50%);
			width: 0.5px;
			height: 36rpx;
			opacity: 0.6;
		}
	}

	.lqq-custom {
		.otherMode {
			.lqq-left {
				width: 180rpx;
			}


			.lqq-right {
				width: 180rpx;
			}

			.lqq-center {
				white-space: nowrap;
				text-overflow: ellipsis;

			}
		}
	}
</style>
