<template>
	<view>
		<!-- 搜索框开始 -->
		<view class="select-seach">
			<view class="iconfont icon-sousuo icon"></view>
			<input @input="inputChange" placeholder="输入品牌名称" :value="inputValue"></input>
		</view>
		<!-- 搜索框结束 -->
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ 0 + 'px - 284rpx)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="zimu pl-24">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item11" v-for="(items,sub) in 2" :key="sub">
							<view class="content">
								<view class="aaaa">
									Faskdfasl啊收到了
								</view>
								<view class="showstate acitve">
									<text class="iconfont icon-gouxuan"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 120rpx;">
				<!-- 占高 -->
			</view>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + 0 + 'px )'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
					{{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
		
		<!-- 底部按钮 -->
		<view>
			<view class="num_brand">
				300个品牌
			</view>
			<view class="sure_add" hover-class="click" @tap="sure_add">
				确认添加
			</view>
		</view>
	</view>
</template>

<script>
	//函数节流
	import {throttle} from '../../utils/util.js';
	export default {
		data() {
			return {
				StatusBar: getApp().globalData.statusBar,
				CustomBar: getApp().globalData.customBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
			};
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			//确定添加
			sure_add : throttle(()=>{
				// console.log('ffff');
				//将选择的结果放在缓存里面  上一个页面通过onShow 钩子获取
				let choose_brand = {
					time:Number(Date.now()),
					checkArr: [],
					checkArrName: []
				};
				uni.setStorageSync('choose_brand',choose_brand);
			},1000)	
			,
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / uni.upx2px(30));
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		width:100%;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		// bottom: 0px;
		top:20rpx;
		padding: 120rpx 10rpx 0rpx 60rpx;
		display: flex;
		align-items: flex-start;
	}

	.indexBar .indexBar-box {
		width: 40rpx;
		height: auto;
		// background: #fff;
		// display: flex;
		flex-direction: column;
		// box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
	}

	.indexBar-item {
		flex: 1;
		width: 40rpx;
		height: 30rpx;
		display: flex;
		// align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #333; 
	}

	movable-view.indexBar-item {
		width: 40rpx;
		height: 40rpx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10rpx;
		height: 20rpx;
		width: 4rpx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80rpx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		margin: auto;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 48rpx;
	}
	
	/* input框 */
	
	.select-seach {
		width: 702rpx;
		margin: 24rpx 0 0 24rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		background-color: #F4F4F4;
		padding: 0 25rpx;
		color: #616161;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
	
	.select-seach>view {
		margin-right: 15rpx;
		font-size: 24rpx;
	}
	
	.select-seach input {
		flex: 1;
	}
	
	.cu-item11{
		height: 60rpx;
		padding-left: 24rpx;
		font-size: 30rpx;
		color: #666666;
		display: flex;
		align-items: center;
	}
	.zimu{
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
	.content{
		width:100%;
		display: flex;
		height: 60rpx;
		flex-flow: row nowrap;
		align-items: center;
		.aaaa{
			flex:1;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.showstate{
			width:32rpx ;
			height: 32rpx;
			box-sizing: border-box;
			// border: 1rpx solid #BEBEBE;
			box-shadow: 0 0 0rpx 1rpx #BEBEBE ;
			margin-right:72rpx ;
			margin-left: 80rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				font-size: 26rpx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
		.acitve{
			background-color:#8714EE ;
			box-shadow: none;
		}
	}
	
	.num_brand{
		
		font-size: 24rpx;
		text-align: center;
		color: #999999;
		line-height: 70rpx;
	}
	.sure_add{
		width: 702rpx;
		height: 98rpx;
		background: #8714EE;
		border-radius: 49rpx;
		margin-left: 24rpx;
		line-height: 98rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
