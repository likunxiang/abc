<template>
	<!--components/select/select.wxml wx:if="{{isShow}}-->
	<view class="selectAll" catchtouchmove="stop" @tap.stop="quxiao">
		<view class="select-content" @tap.stop="stop">
			<!-- 标题开始 -->
			<!-- <view class="select-title">{{title}}</view> -->
			<!-- 标题结束 -->

			<!-- 搜索框开始 -->
			<view class="select-seach">
				<view class="iconfont icon-sousuo icon"></view>
				<input @input="inputChange" :placeholder="inputText" :value="inputValue"></input>
			</view>
			<!-- 搜索框结束 -->
			<!-- 选择区域开始 -->
			<view v-if="!showNone" class="flex-content">

				<scroll-view scroll-x="true" class="select-checked">
					<view v-for="(item, index) in checkArrName" :key="index" @tap="del" class="checked-item">{{item}}
						<text class="iconfont icon-guanbi2" :data-index="index" @tap="del"></text>
					</view>
				</scroll-view>
				<!-- 滑动区域 -->
				<block v-if="arrData.length == 0">
					<!-- 文字提示 -->
					<block v-if="selectType == 1">
						<view class="isNone">
							<view>抱歉，暂无用户</view>
						</view>
					</block>
					<block v-else>
						<view class="isNone">
							<view>抱歉，暂无该品牌 </view>
							<view>点击确认，我们会联系供应商</view>
							<view>尽快帮你选过来</view>
						</view>
					</block>
				</block>
				<block v-else>
					<view class="select-box">
						<scroll-view scroll-y="true" lower-threshold="50" @scrolltolower="more">
							<view v-for="(item, index) in arrData" :key="index" class="list">
								<view class="select-left">
									<image v-if="false"></image>
									<text class="name">{{item.nickname?item.nickname:item.name}}</text>
								</view>
								<view v-if="item.status == 1" class="fs-24 color-999999">已添加</view>
								<view v-else class="change_state_box" @tap.stop="add" :data-id="item.id" :data-name="item.nickname?item.nickname:item.name">
									<view class="change_state" :class="{'acitve':has_checked(item.id)}">
										<text class="iconfont icon-gouxuan"></text>
									</view>
								</view>


								<!-- <text :data-id="item.id" :data-name="item.nickname?item.nickname:item.name" class="add" @tap.stop="add">添加</text> -->
							</view>
							<view class="zanwei"></view>
						</scroll-view>
					</view>
				</block>
			</view>
			<!-- 选择区域结束 -->

			<!-- 按钮开始 -->
			<!-- <view class="bottom-box">
				<view class="btn" @tap.stop="quxiao">取消</view>

				<block v-if="checkArrName.length > 0 || inputValue">
					<view class="btn1" style="background: #616161;" @tap.stop="sure">确定</view>
				</block>
				<block v-else>
					<view class="btn1">确定</view>
				</block>
			</view> -->

			<view @tap.stop="sure" class="bottom-box3" style="width: 702rpx;height: 98rpx;background: #8714EE;border-radius: 49rpx;font-size: 30rpx;line-height: 98rpx;text-align: center;color: #FFFFFF;margin-left: 24rpx;margin-top: 24rpx;">
				确定添加
			</view>
			<!-- 按钮结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'select1',
		data() {
			return {
				//加载更多
				moreTime: true,
				inputValue: '',
				//input的值
				addValue: 0,
				nameLength: 10,
				checkArrName: []
			};
		},

		components: {},
		props: {
			//数据默认值
			arrData: {
				type: Array,
				default: function() {
					return []
				}
			},
			//选择字段
			selectString: {
				type: String,
				default: 'name'
			},
			//是否显示组件
			isShow: {
				type: Boolean,
				default: false
			},
			//搜索框默认文字
			inputText: {
				type: String,
				default: '请输入顾客昵称'
			},
			//标题
			title: {
				type: String,
				default: '顾客昵称'
			},
			//搜索内容为空，是否显示文字提示
			showNone: {
				type: Boolean,
				default: false
			},
			selectType: {
				type: Number,
				default: 1
			},
			// 有时，把数据传进来
			checkArr: {
				type: Array,
				default: function() {
					return []
				}
			},
			radio: {
				type: Boolean,
				default: false
			}
			// checkArrName: {
			//   type: Array,
			//   default: function () {
			//   	return []
			//   }
			// }
		},
		options: {
			addGlobalClass: true
		},
		mounted: function() {},


		onPageShow: function() {
			// 页面被展示
			console.log("页面被展示");
		},
		onPageHide: function() {
			// 页面被隐藏
			console.log("页面被隐藏");
		},
		onPageResize: function(size) {
			// 页面尺寸变化
			console.log("页面尺寸变化");
		},
		methods: {
			getCheckArrName(value) {
				this.checkArrName = value;
				console.log(value);
			},
			stop: function() {},

			//取消
			quxiao() {
				this.$emit('quxiao', {
					detail: {}
				});
			},

			//点击添加按钮
			add(e) {
				// console.log(e);
				//单选
				if (this.radio) {
					this.checkArr.splice(0, this.checkArr.length);
					this.checkArrName.splice(0, this.checkArrName.length);
					this.checkArr.push(e.currentTarget.dataset.id);
					this.checkArrName.push(e.currentTarget.dataset.name);
					// console.log(this.checkArrName);
					this.setData({
						checkArr: this.checkArr,
						checkArrName: this.checkArrName
					});
				} else {
					//多选开始
					//多选
					if (this.checkArr.indexOf(e.currentTarget.dataset.id) > -1) {
						// uni.showToast({
						// 	title: '已添加，请勿重复添加',
						// 	icon: 'none'
						// })
						this.checkArr.splice(this.checkArr.indexOf(e.currentTarget.dataset.id), 1);
						this.checkArrName.splice(this.checkArrName.indexOf(e.currentTarget.dataset.name), 1);
						this.setData({
							checkArr: this.checkArr,
							checkArrName: this.checkArrName
						});
					} else {
						this.checkArr.push(e.currentTarget.dataset.id);
						this.checkArrName.push(e.currentTarget.dataset.name);
						// console.log(this.checkArrName);
						this.setData({
							checkArr: this.checkArr,
							checkArrName: this.checkArrName
						});
					}
					//多选结束

				}


				// console.log(this.checkArrName);
			},

			del(e) {
				this.checkArr.splice(e.currentTarget.dataset.index, 1);
				this.checkArrName.splice(e.currentTarget.dataset.index, 1);
				this.setData({
					checkArr: this.checkArr,
					checkArrName: this.checkArrName
				});
			},

			// addBrand () {
			// 	getApp().request({
			// 		url: getApp().api.maijia.add_brand,
			// 		method: 'POST',
			// 		data: {
			// 			brand_ids: this.data.checkArr,
			// 			// user_ids: 
			// 		},
			// 		success: (res) => {
			// 			console.log(res);
			// 			if (res.code == 0) {
			// 				this.getBrandList()
			// 			}
			// 		}
			// 	})
			// },
			//加载下一页
			more(e) {
				if (this.moreTime) {
					this.setData({
						moreTime: false
					});
					this.setData({
						nameLength: this.nameLength + 10
					});
					this.$emit('getmore');
					setTimeout(() => {
						this.setData({
							moreTime: true
						});
					}, 10);
				}
			},

			//input框值发生改变
			inputChange(e) {
				//console.log(e.detail.value)
				this.setData({
					inputValue: e.detail.value
				});
				var searchValue = {
					keyword: e.detail.value
				};
				this.$emit('search', {
					detail: searchValue
				});
			},

			//点击确定按钮
			sure() {
				if (this.checkArr.length == 0 &&  this.inputValue == "") {
					uni.showModal({
						title: '请点击其他空白处关闭弹窗'
					})
					return;
				}
				var myDetail = {
					checkArr: this.checkArr,
					checkArrName: this.checkArrName
				};
				this.$emit('binddata', {
					detail: myDetail
				});
				this.quxiao();
			},

			//重复点击判断是否被选择
			has_checked(id) {
				return this.checkArr.includes(id);
			}

		}
	};
</script>
<style>
	/* components/select/select.wxss */

	.selectAll {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.select-content {
		position: fixed;
		width: 750rpx;
		bottom: 0;
		left: 0;
		height: 914rpx;
		background: #ffffff;
		border-radius: 30rpx 30rpx 0rpx 0rpx;

		z-index: 9;
		animation: open 0.3s;
	}

	.select-title {
		height: 42rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: #595959;
		line-height: 42rpx;
		text-align: center;
		margin-top: 30rpx;
	}


	/* input框 */

	.select-seach {
		width: 700rpx;
		margin: 30rpx 0 0 25rpx;
		height: 60rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		background-color: #f7f7f7;
		padding: 0 25rpx;
		color: #4d4d4d;
		font-size: 30rpx;
		display: flex;
		align-items: center;
	}

	.select-seach>view {
		margin-right: 30rpx;
	}

	.select-seach input {
		flex: 1;
	}


	/* 按钮.................. */

	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		box-sizing: border-box;
		padding: 35rpx;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.bottom-box .btn {
		width: 325rpx;
		height: 78rpx;
		background: #ffffff;
		border: 2rpx solid #616161;
		line-height: 78rpx;
	}

	.bottom-box .btn1 {
		width: 325rpx;
		height: 78rpx;
		background: rgba(97, 97, 97, 0.5);
		color: #616161;
		line-height: 78rpx;
		color: #ffffff;
	}

	.bottom-box .active {
		width: 325rpx;
		height: 78rpx;
		background: rgba(97, 97, 97, 1);
	}


	/* 选择区域 */

	.flex-content {
		width: 680rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
		height: 640rpx;
		margin-left: 35rpx;
		display: flex;
		flex-flow: column nowrap;
		overflow: hidden;
	}

	.select-checked {
		white-space: nowrap;
	}

	.checked-item {
		display: inline-block;
		line-height: 60rpx;
		margin-bottom: 20rpx;
		padding: 0 15rpx 0 30rpx;
		color: #7944e4;
		background-color: #e3d8fa;
		border-radius: 30rpx;
		margin-right: 30rpx;
	}

	.select-box {
		flex: 1;
		/* height: 260rpx; */
		position: relative;
		z-index: 99;
	}

	.select-box scroll-view {
		/* height: 595rpx; */
		height: 550rpx;
		/* background-color: red; */
	}

	.zanwei {
		height: 140rpx;
	}


	/* 列表 */

	.select-box .list {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		/* box-shadow:  0 0 3rpx #000; */
	}

	.select-box .list .select-left {
		flex: 1;
	}

	.select-box .list>text {
		display: inline-block;
		line-height: 40rpx;
		width: 90rpx;
		box-sizing: border-box;
		border: 1rpx solid #979797;
		font-size: 24rpx;
		font-weight: 400;
		color: #2c2c2c;
		border-radius: 20rpx;
		height: 40rpx;
		text-align: center;
	}

	/* 
 样式改变Lqq*/
	.change_state_box {
		height: 40rpx;
		display: flex;
		align-items: center;
	}

	.change_state {
		width: 32rpx;
		height: 32rpx;
		box-sizing: border-box;
		border: 1rpx solid #BEBEBE;
		/* box-shadow: 0 0 0rpx 1rpx #BEBEBE; */
		margin-right: 2rpx;
		margin-left: 40rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.change_state text {
		font-size: 26rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.change_state.acitve {
		background-color: #8714EE;
		/* box-shadow: none; */
		border: none;
	}

	/* 样式改变lqq */
	.select-box .list .select-left {
		flex: 1;
		font-size: 30rpx;
		font-weight: 400;
		color: #2C2C2C;
		line-height: 42rpx;
		display: flex;
		align-items: center;
	}

	.select-box .list .select-left image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 30rpx;
		border-radius: 40rpx;
		background: #eee;
	}


	/* 空 */

	.isNone {
		text-align: center;
		font-size: 3r0px;
		font-weight: 400;
		color: #9B9B9B;
		line-height: 42rpx;
		margin-top: 200rpx;
	}


	/* 隐藏滚动条 */

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	@keyframes open {
		0% {
			transform: translateY(100%);
		}

		100% {
			transform: translateY(0);
		}
	}
</style>
