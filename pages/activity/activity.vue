<template>
	<view class="active-active">
		<common></common>
		<view class="activity flex ns-column" style="overflow-x: hidden;overflow-y: hidden;" v-if="!show_search_page">
			<view class="nav pr" :style="'opacity: '+(transparent?0:1)+';'">
				<!-- 头部内容 -->
				<view class="activity-header">
					<custom mode="1" btnMode="2" background="linear-gradient(145deg, #fe4001, #eb0301);" backColor="#fff" titleColor="#333" borderColor="#fff">
						<view slot='slot1'>
							<view class="search-box flex align-center">
								<view class="iconfont icon-sousuo flex-grow-0" style="color: #fff;opacity: 0.4;margin-right: 14rpx;"></view>
								<input class="fs-24 color-fff flex-grow-1" placeholder-style="color: #fff" type="text" :value="searchValue" placeholder="搜索活动内的商品" @blur="inputSearch" />
							</view>
						</view>
					</custom>
					<view class="act-msg pr">
						<image style="width: 100%;height: 100%;position: absolute;background: #fff;z-index: -1;top: 0;left: 0;" mode="aspectFill"
						 :src="bg_act"></image>
						<view class="flex justify-between">
							<view class="flex align-center flex-grow-1">
								<image class="act-msg-logo flex-grow-0" :src="goodListMsg.banner" mode="aspectFit"></image>
								<view class="flex-grow-1">
									<view class="fs-34 ns-text-bold">{{filters.substring(goodListMsg.name,11)}}</view>
									<!-- <view class="mt-20 fs-24">共{{total_count}}款，全场¥{{goodListMsg.min_goods_info.price}}起</view> -->
									<view class="flex align-center" style="margin-top: 35rpx;">
										<view class="fs-24" style="margin-right: 18rpx;">距活动{{(daojishi)?'结束':'开始'}}</view>
										<block v-if="daojishi">
											<block v-if="ed>='00' &&eh>='00' & em>='00'">
												<view class="flex ns-align-items-flex-center fs-20 color-fff">
													<view class="time-box">{{ed}}</view>
													<view>天</view>
													<view class="time-box">{{eh}}</view>
													<view>时</view>
													<view class="time-box">{{em}}</view>
													<view>分</view>
												</view>
											</block>
											<block v-else>
												<view class="flex ns-align-items-flex-center fs-20 color-fff">
									
													<view>活动已结束</view>
												</view>
											</block>
										</block>
										<block v-if="kaishishi">
											<block v-if="sd>='00' &&sh>='00' & sm>='00'">
												<view class="flex ns-align-items-flex-center fs-20 color-fff mt-16">
													<view class="time-box">{{sd}}</view>
													<view>天</view>
													<view class="time-box">{{sh}}</view>
													<view>时</view>
													<view class="time-box">{{sm}}</view>
													<view>分</view>
												</view>
											</block>
										</block>
									</view>
								</view>
							</view>
							<navigator v-if="topic.ht_id > 0" :url="'/member/topic/topic?ht_id=' + topic.ht_id + '&id=' + topic.id" class="header-share-btn flex-grow-0 flex-y-center" style="margin-right: 21rpx;">
								<text class="fs-24">好物说</text>
							</navigator>
							<view class="header-share-btn flex-grow-0 flex-y-center" @tap="showShareModal">
								<text class="fs-24">分享</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 多选 ................................................................-->
			<view class="guang-nav-list flex ns-justify-content-space-between" :style="'padding:0rpx 0rpx 0 24rpx;opacity: '+(transparent?0:1)+';'">
				<view style="width: 66%;">
					<!-- :scroll-into-view="toview" -->
					<view class="flex align-center">
						<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
							<view class="color-333333" @tap.stop="showChange1">全部品类
								<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
							</view>
						</view>
						<scroll-view class="check-scroll" style="width:280rpx;" scroll-x>
							<view v-for="(value, index) in catsArr" :key="index" :class="'more-list  ' + (value.checked?'more-active':'')"
							 @tap="changeNav" v-if="value.checked" :data-num="index" :data-index="value.id" :data-text="value.catsName"
							 style="float:none;" enable-flex="true">{{value.catsName}}
								<text class="iconfont icon-guanbi2 fs-20"></text>
							</view>
						</scroll-view>

					</view>
				</view>
				<view class="flex align-center">
					<view class="flex ml-20 align-center color-333333" @tap="commissionSort" v-if="role == 'shoper' && is_commission">
						<view>佣金</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>
					<view class="flex ml-20 align-center color-333333" @tap="priceSort">
						<view>价格</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="priceDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>
				</view>

			</view>
			<!-- 第二头部开始 -->
			<view class="header_tow" v-show="transparent">
				<custom mode="1" btnMode="2" background="linear-gradient(145deg, #fe4001, #eb0301);" backColor="#fff" titleColor="#333" borderColor="#fff">
					<view slot='slot1'>
						<view>
							<block v-if="daojishi">
								<block v-if="ed>='00' &&eh>='00' & em>='00'">
									<view class="flex ns-align-items-flex-center fs-20 color-fff">
										<view class="fs-26 ml-16 mr-16">剩余</view>
										<view class="time-box">{{ed}}</view>
										<view>天</view>
										<view class="time-box">{{eh}}</view>
										<view>时</view>
										<view class="time-box">{{em}}</view>
										<view>分</view>
									</view>
								</block>
								<block v-else>
									<view class="flex ns-align-items-flex-center fs-20 color-fff">
						
										<view>活动已结束</view>
									</view>
								</block>
							</block>
							<block v-if="kaishishi">
								<block v-if="sd>='00' &&sh>='00' & sm>='00'">
									<view class="flex ns-align-items-flex-center fs-20 color-fff">
										<view class="fs-30 color-333333 ml-16 mr-16">预告</view>
										<view class="time-box">{{sd}}</view>
										<view>天</view>
										<view class="time-box">{{sh}}</view>
										<view>时</view>
										<view class="time-box">{{sm}}</view>
										<view>分</view>
									</view>
								</block>
							</block>
						</view>
					</view>
				</custom>
				<view class="guang-nav-list flex justify-between" style="padding:0rpx 0rpx 0 24rpx;">
					<view style="width: 66%;">
						<!-- :scroll-into-view="toview" -->
						<view class="flex align-center">
							<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
								<view class="color-333333" @tap.stop="showChange1">全部品类
									<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
								</view>
							</view>
							<scroll-view class="check-scroll" style="width:280rpx;" scroll-x>
								<view v-for="(value, index) in catsArr" :key="index" :class="'more-list  ' + (value.checked?'more-active':'')"
								 @tap="changeNav" v-if="value.checked" :data-num="index" :data-index="value.id" :data-text="value.catsName"
								 style="float:none;" enable-flex="true">{{value.catsName}}
									<text class="iconfont icon-guanbi2 fs-20"></text>
								</view>
							</scroll-view>

						</view>
					</view>
					<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="commissionSort" v-if="role == 'shoper'">
						<view>佣金</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>
					<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
						<view>价格</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="priceDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>

				</view>
				<!-- 多选....................................................... -->
				<view class="more1" v-if="!showChangeMore&&showChangeMore_2" @tap.stop="closeChange" catchtouchmove="preventTouchMove"
				 @touchmove.stop.prevent="stop">
					<view class="more-content" @tap.stop="showChange" :style="'margin-top:'+margin_top">
						<!--  more-active -->
						<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')"
						 @tap="changeNav" :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
						</view>

					</view>
				</view>
				<!-- 多选....................................................... -->
			</view>
			<!-- 第二头部结束 -->


			<view :class="'share-modal ' + share_modal_active" catchtouchmove="true" @tap="shareModalClose" v-if="sharePic">
				<view class="share-modal-body" @tap.stop="stop">
					<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
					<view class="flex-row">
						<view class="flex-grow-1 flex-x-center">
							<button open-type="share" class="share-bottom" style="height:100%;">
								<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
								<view>分享给好友</view>
							</button>
						</view>
						<view class="flex-grow-1 flex-x-center">
							<view @tap="showShare" class="share-bottom">
								<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
								<view>生成商品海报</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="share pa" v-if="isShowShare" :style="'height: ' + y + 'px;'" @tap="closeShare" catchtouchmove="true">

				<view style="width: 608rpx;height: 924rpx;background: #fff;margin-bottom: 50rpx;" class="pr">
					<view class="pa" style="left: 240rpx;top: 300rpx;" v-if="!qrcode_pic">
						<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
						<view style="color: #888">海报生成中</view>
					</view>
					<image style="height: 924rpx;width: 608rpx;" mode="widthFix" class="share_image" :src="qrcode_pic"></image>
					<button class="share-btn" @tap.stop="savePhotoThrottle">
						<view class="fs-24 color-fff">保存到相册</view>
					</button>
				</view>

			</view>
		</view>
		<view v-else>
			<view class="header_tow">
				<custom mode="1" btnMode="2" background="linear-gradient(145deg, #fe4001, #eb0301);" fixed="fixed" backColor="#fff" titleColor="#333" borderColor="#fff">
					<view slot='slot1'>
						<view class="search-box flex align-center">
							<view class=" flex align-center flex-grow-1">
								<view class="iconfont icon-sousuo flex-grow-0" style="color: #fff;opacity: 0.4;margin-right: 14rpx;"  @click.stop="clearSearch"></view>
								<input class="fs-24 color-fff flex-grow-1 mr-10" type="text" :value="searchValue" placeholder="搜索活动内的商品" @blur="inputSearch" />
								<view class="iconfont icon-guanbi1 flex-grow-0" style="color: #fff;" @click.stop="clearSearch"></view>
							</view>
						</view>
					</view>
				</custom>
				<view class="guang-nav-list flex justify-between" style="padding:0rpx 0rpx 0 24rpx;">
					<view style="width: 66%;">
						<!-- :scroll-into-view="toview" -->
						<view class="flex align-center">
							<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
								<view class="color-333333" @tap.stop="showChange1">全部品类
									<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
								</view>
							</view>
							<scroll-view class="check-scroll" style="width:400rpx;" scroll-x>
								<view v-for="(value, index) in catsArr" :key="index" :class="'more-list  ' + (value.checked?'more-active':'')"
								 @tap="changeNav" v-if="value.checked" :data-num="index" :data-index="value.id" :data-text="value.catsName"
								 style="float:none;" enable-flex="true">{{value.catsName}}
									<text class="iconfont icon-guanbi2 fs-20"></text>
								</view>
							</scroll-view>

						</view>
					</view>
					<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="commissionSort" v-if="role == 'shoper'">
						<view>佣金</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>
					<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
						<view>价格</view>
						<view class="ml-10 fs-40 color-999999">
							<text v-if="priceDefault" class="iconfont icon-paixu"></text>
							<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
						</view>
					</view>

				</view>
				<!-- 多选....................................................... -->
				<view class="more1" v-if="showChangeMore ||showChangeMore_2" @tap.stop="closeChange" catchtouchmove="preventTouchMove"
				 @touchmove.stop.prevent="stop">
					<view class="more-content" @tap.stop="showChange" :style="'margin-top:'+margin_top">
						<!--  more-active -->
						<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')"
						 @tap="changeNav" :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
						</view>

					</view>
				</view>
				<!-- 多选....................................................... -->
			</view>
			<!-- 占位 -->
			<view :style="'height:' + customBar + 'px'"></view>
			<view style="height: 88rpx;"></view>
		</view>
		<!-- 商品区 -->
		<!-- 优惠券提示 -->
		<view class="discounts-box flex align-center" :style="'top:calc( ' + customBar + 'px' + ' + 88rpx );'" v-if="couponStatus != 2 && !showChangeMore">
			<view class="discounts-pic">
				<image style="width: 100%;height: 100%;" :src="logo_gift" mode="aspectFit"></image>
			</view>
			<view>{{couponStatus == 1?'抱歉，你还达不到奖励条件，再添加一点商品试试看吧～':'恭喜你，已经达到奖励条件啦，快去下单领取吧～'}}</view>
		</view>
		<view class="goods-list flex ns-wrap ns-justify-content-space-between pr">
			<!-- 多选....................................................... -->
			<view class="more1" v-if="showChangeMore && !show_search_page" @tap.stop="closeChange" catchtouchmove="preventTouchMove"
			 @touchmove.stop.prevent="stop">
				<view class="more-content" @tap.stop="showChange">
					<!--  more-active -->
					<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')" @tap="changeNav"
					 :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
					</view>

				</view>
			</view>
			<!-- 多选....................................................... -->
			<!-- <scroll-view scroll-y="true" class="goods-list flex ns-wrap ns-justify-content-space-between" style="height: calc(100vh - 376rpx);" @scrolltolower="getMore"> -->
			<navigator v-for="(item, index) in goodList" :key="index" :url="'/pages/goods/goods?id=' + item.id" class="goods mb-20 bg-white">
				<view class="yyyy">
					<view style="width: 340rpx;height: 340rpx;position: relative;">
						<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
						<view v-if="item.goods_num==0" class="nonum-tip">
							已抢光
						</view>
					</view>

					<view class="goods-msg flex ns-column justify-between">
						<view class="goods-msg-title ns-text-limit2">{{item.name}}</view>
						<view :class="'fs-28 flex align-center ' + (role == 'shoper'?'':'justify-between')">
							<view class="flex align-center">
								<view class="fs-20 color-FF0200 ns-text-bold">￥
									<text class="fs-28">{{filters.priceStr(item.price)[0]}}.</text>
									<text>{{filters.priceStr(item.price)[1]}}</text>
								</view>
								<!-- <view class="color-8D8D8D ns-text-through ml-16">¥ {{item.original_price}}</view> -->
							</view>
							<view class="flex align-center ml-30" v-if="role == 'shoper' && item.xq_commission > 0 && is_commission">
								<view class="zhuan-box">赚</view>
								<view class="fs-20 color-FF0200 ns-text-bold">￥
									<text class="fs-28">{{filters.priceStr(item.xq_commission || '0.00')[0]}}.</text>
									<text>{{filters.priceStr(item.xq_commission  || '0.00')[1]}}</text>
								</view>
							</view>
							<view v-if="role != 'shoper'" class="add-cart-icon fs-26 iconfont color-fff icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
							 @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>

						</view>
					</view>
				</view>
			</navigator>
			<view class="mt-24 p-24" v-if="list.length > 0">
				<view class="flex-x-center pr">
					<view>更多活动</view>
					<view class="under-line"></view>
				</view>
				<view v-for="(acitivity, index) in list" :key="index">
					<view v-for="(item, index2) in acitivity" :key="index2" class="bg-white mb-20" style="border-radius: 20rpx;" v-if="item.banner!=null">
						<!-- 单品牌内容 -->
						<!-- 品牌名字 -->
						<view style="padding: 25rpx 24rpx;">
							<navigator :url="'/pages/activity/activity?aid=' + item.id" class="flex ns-justify-content-space-between"
							 hover-class="none">
								<view class="flex" style="width: 85%;">
									<image lazy-load="true" style="width: 100rpx;height: 100rpx;border-radius: 20rpx;box-shadow: 0rpx 3rpx 10rpx #888888;"
									 mode="aspectFit" :src="item.banner"></image>
									<view class="ml-30 flex1">
										<view class="fs-36 color-333333">{{item.name}}</view>
										<view class="fs-24 color-999999 ns-text-limit flex mt-10" style="width: 400rpx;">
											<view v-for="(value, index) in item.cats" :key="index" class="flex mr-10 align-center">
												<view>{{value}}</view>
												<view class="ml-10" style="border-right: 1rpx solid #999999;height: 25rpx;"></view>
											</view>
										</view>
									</view>
								</view>
								<view class="flex ">
									<view style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多
										<text class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text>
									</view>

								</view>
							</navigator>

						</view>
						<!-- 品牌商品 -->
						<view class="flex " style="padding: 0rpx 24rpx 20rpx; ">
							<scroll-view scroll-x="true">
								<view class="flex">
									<navigator v-for="(item, index) in item.goods" :key="index" :url="'/pages/goods/goods?id=' + item.id" style="width: 200rpx;margin-right: 16rpx;"
									 :data-id="item.goods_id">
										<view style="position: relative;width: 180rpx;height: 180rpx;">
											<image lazy-load="true" mode="aspectFill" src style="background: #ccc;width: 180rpx;height: 180rpx;position: relative;border-radius: 20rpx;"></image>
											<view class="sell-up " v-if="item.num==0">
												<view>已抢光</view>
												<view class="line"></view>
												<view style="font-size: 17rpx;">sold out</view>
											</view>
										</view>
										<view class="text-more-1 fs-24 color-333333 mt-15">{{item.name}}</view>
										<view class="miaosha_price m-10 flex align-center" style="font-size:20rpx;">
											<view class=" color-FF0200 ns-text-bold">￥
												<text class="fs-26">{{filters.priceStr(item.price)[0]}}.</text>
												<text>{{filters.priceStr(item.price)[1]}}</text>
											</view>
										</view>

									</navigator>

								</view>
							</scroll-view>

						</view>
					</view>
				</view>
			</view>
			<!-- </scroll-view> -->
		</view>
		<pageFooter></pageFooter>

		<!-- 多规格开始 -->
		<block data-src="/components/goods/specifications_model.wxml">
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
				 @tap.stop="stop">
					<view class="flex-row" style="padding: 24rpx">
						<view class="flex-grow-0">
							<view class="goods-pic-box">
								<block v-if="goods.attr_pic">
									<image @tap="previewImage" :data-url="goods.attr_pic" mode="aspectFill" :src="goods.attr_pic"></image>
								</block>
								<block v-else>
									<image @tap="previewImage" :data-url="goods.first_cover_pic" mode="aspectFill" :src="goods.first_cover_pic"></image>
								</block>
							</view>
						</view>
						<view class="flex-grow-1" style="padding: 0 24rpx">
							<view class="fs-30 color-333333 ns-text-limit2">{{goods.name}}</view>
							<view style class="flex ns-align-items-flex-center mt-20">
								<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
								<view class="flex align-center" v-if="goods.m_price">
									<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
									<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
								</view>
							</view>
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<view class v-if="role=='shoper' && is_commission">
						<view class="commission-box-cart flex align-end">
							<view class="fs-24 color-333333 flex align-end" v-if="goods.c1">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">销售佣金</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c1}}</view>
							</view>
							<!-- <view class="fs-24 color-333333 flex align-end" style="margin-left: 57rpx;" v-if="goods.c19">
								<view style="margin-bottom: 4rpx;margin-right: 4rpx;">大亲(赚)</view>
								<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c19}}</view>
							</view> -->
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						<view style="padding: 24rpx 28rpx">
							<view>
								<view class="attr-group" v-if="groupNum && !oid">
									<view class="attr-group-name">{{attr_group_num.attr_group_name}}</view>
									<view class="attr-list">
										<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
									</view>
								</view>
								<view v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" class="attr-group" v-if="attr_group.attr_list.length>0">
									<view class="attr-group-name fs-28 color-333333 ns-text-bold">{{attr_group.attr_group_name}}</view>
									<view class="attr-list">
										<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')"
										 :data-groupindex="groupindex" :data-childindex="childindex" :data-type="item.isHave?1:0" @tap="storeAttrClick">{{item.attr_name}}</text>
									</view>
								</view>
							</view>
							<view style="height: 0;border-bottom: 1rpx solid #F4F4F4;margin-bottom: 23rpx"></view>
							<!-- 积分商品详情隐藏购买数量 -->
							<block v-if="pageType !== 'INTEGRAL' && pageType!== 'BOOK'">
								<view style="padding-bottom: 40rpx">
									<view class="flex-row flex-y-center mb-20">
										<view class="flex-grow-1 flex">
											<view class="fs-28 color-333333 ns-text-bold">数量</view>
											<view class v-if="goods.buy_max?filters.parseInt(goods.buy_max)!=0:(goods.buy_limit?filters.parseInt(goods.buy_limit)!=0:false)">（限购{{goods.buy_max?goods.buy_max:goods.buy_limit}}件）</view>
										</view>
										<view class="flex-grow-0">

											<view class="flex number-input-box ns-align-items-flex-center">
												<!-- <view style='margin-right:0.01rem;' class="flex-grow-0 flex-x-center flex-y-center number-btn number-sub {{form.number<=1?'disabled':''}}" bindtap="numberSub">-
							                </view> -->
												<view :class="'flex-grow-0 number-btn number-sub iconfont icon-jian ' + (form.number<=1?'disabled':'')"
												 style="margin-top: -6rpx;" @tap="numberSub"></view>
												<view class>
													<input style="padding:0;" class="flex-grow-1 number-input" :value="form.number" type="number" step="1" min="1"
													 @blur="numberBlur"></input>
												</view>
												<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'':'disabled')"
												 style="margin-top: 0rpx;" @tap="numberAdd"></view>
												<!-- <view class="flex-grow-0 flex-x-center flex-y-center number-btn number-add" bindtap="numberAdd">+
							                </view> -->
											</view>
										</view>
									</view>
								</view>
							</block>
							<block v-if="false">
								<view class="fs-28 color-333333 ns-text-bold">保障服务</view>
								<view style="margin-top: 24rpx;">
									<view class="flex align-center">
										<view></view>
										<view class="fs-24 color-333333">全面保障</view>
									</view>
									<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
									<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-xuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
								</view>
								<view style="margin-top: 24rpx;">
									<view class="flex align-center">
										<view></view>
										<view class="fs-24 color-333333">全面保障</view>
									</view>
									<view class="flex justify-between mb-20" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
									<view class="flex justify-between" style="padding-left: 33rpx;padding-top: 22rpx;">
										<view class="flex">
											<view class="iconfont icon-weixuanzhong color-FF0200 fs-30"></view>
											<view class="fs-24 ml-10">
												<view class="color-333333">次年电池换新</view>
												<view class="color-999999 mt-10">容量续航问题免费换原厂电池</view>
											</view>
										</view>
										<view class="fs-24 color-FF0200">¥9.90</view>
									</view>
								</view>
							</block>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>

				</scroll-view>
			</view>
		</block>
		<!-- 多规格结束 -->

		<!-- 回到头部按钮开始 -->
		<!-- <totop :is_top="is_top" :page="page1" :totalPage="totalPage" :scrollStop="scrollStop"></totop> -->
		<totop :scrollStop="scrollStop" :is_top="is_top" :page="page1" :totalPage="totalPage"></totop>

		<!-- 回到头部按钮结束 -->
		<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		<!-- 宝箱 -->
		<redPack :active_id="active_id" @setRedPackTips="setRedPackTips"></redPack>
	</view>
</template>

<script>
	import util from "../../utils/util";
	var activity_id = '';
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	import slideIcon from "../../components/slideIcon/slideIcon";
	import totop from '../../components/toTop/toTop.vue'
	import custom from '@/components/custom/custom.vue'
	import redPack from '@/components/activity/redPack.vue'
	import search from '@/components/activity/search.vue' // 单品搜索
	import pageFooter from '@/components/common/footer.vue'


	export default {
		data() {
			return {
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				chooseOpen: false,
				optionList: [],
				moren: '全部品类',
				chooseText: '',
				isShowShare: false,
				cartNum: 0,
				is_show: false,
				goodListMsg: {},
				goodList: [],
				discountDefault: true,
				priceDefault: true,
				commissionDefault: true, // 佣金排序
				commissionUp: true, // 佣金
				discountUp: true,
				priceUp: true,
				cat_id: '',
				page: 1,
				page_count: 0,
				count: 0,
				// 总的数据条数
				qrcode_pic: '',
				// 二维码图片
				role: 'user',
				scrollTop: false,
				chooseIns: 0,
				choose: [],
				//多选数组
				catsArr: [],
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				pageType: 'normal',
				pageUrl: 'acitity',
				showChangeMore: false, //展示多选按钮

				share_modal_active: "",
				no_scroll: false,
				total_count: 0,
				invalid_areas: "",
				end_date: "",
				start_data: "",
				sd: "",
				sh: "",
				sm: "",
				kaishishi: false,
				ed: "",
				eh: "",
				em: "",
				daojishi: false,
				is_no_more: false,
				sort: "",
				by: "",
				goods: "",
				goods_attr: "",
				attr_group_list: "",
				showGetLogin: false,
				filters: require('../../utils/filters.js'),
				list: [],
				//多规格开始
				show_attr_picker: false,
				is_show_first: false,
				isParameter: '',
				groupNum: '',
				//多规格结束
				is_top: false,
				transparent: false,
				showChangeMore_2: false,
				form: {
					number: 1
				},
				scrollStop: false,
				couponStatus: 2, // 0有满足满减金额 1还没满足满减金额 2没有满减活动
				sharePic: '', // 分享卡片
				shareTitle: '', // 分享卡片的标题
				page1: 1,
				totalPage: 1,
				active_id: 0,
				searchValue: '', // 搜索关键字
				show_search_page: false, // 显示单页面搜索
				logo_gift: uni.getStorageSync('_img').logo_gift,
				topic: {
					id: 0,
					ht_id: 0
				},
				bg_act: uni.getStorageSync('_img').bg_act
			};
		},

		components: {
			slideIcon,
			totop,
			custom,
			redPack,
			search,
			pageFooter
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.active_id = options.aid || 0;
			var self = this;
			this.getApp().page.onLoad(this, options);

			if (options.scene && uni.getStorageSync('s_id')) {
				this.getApp().request({
					url: this.getApp().api.default.get_share_info,
					data: {
						sid: uni.getStorageSync('s_id')
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.rel_id) {
								options.aid = res.data.rel_id;
								activity_id = options.aid;
								this.loadData(options);
								setInterval(self.timeData, 1000);
							}
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			} else {
				activity_id = options.aid, this.loadData(options);
				setInterval(self.timeData, 1000);
			}

			this.setData({
				role: uni.getStorageSync('role') || 'user'
			});

			//gSpecificationsModel.init(this);
		},

		onReady: function() {},


		onShow: function() {
			this.getCartNum();
			this.getCouponStatus()
			gSpecificationsModel.init(this);
			// this.checkCoupon()
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */

		onReachBottom(e) {
			this.getMore();
		},
		onPageScroll(e) {
			//////显示分页开始
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.scrollStop = true
			}, 300)
			var self = this;
			var top = e.scrollTop
			var touchTop = top + 300
			if (top >= 600) {
				self.setData({
					is_top: true
				})
				/////////////
				if (this.totalPage == 0) {
					this.scrollStop = true;
					return;
				}
				this.scrollStop = false;
				let height = 0;
				let height_a = 0;
				let height_b = 0;
				let info = uni.createSelectorQuery().select(".active-active");
				info.boundingClientRect((data) => { //data - 各种参数
					if (data == null) {
						return;
					}
					height = data.height;
					let info2 = uni.createSelectorQuery().select('.yyyy');
					info2.boundingClientRect((data) => { //data - 各种参数
						// console.log('data',data)
						if (data == null) {
							return;
						}
						height_b = data.height; //一个子元素的高度

						//console.log('距离底部', (height - this.y) - top)

						let cha = parseInt(((height - this.y) - top) / (height_b * 5)) > 0 ? parseInt(((height - this.y) - top) /
							(height_b * 5)) : 1;



						let page = this.page;
						// if (this.is_no_more == true) {
						// 	--page;
						// }
						if (cha > page) {
							cha = page;
						}

						this.page1 = (page - cha + 1) > this.totalPage ? this.totalPage : (page - cha + 1);

					}).exec()
				}).exec()
			}
			if (top < 600 && self.is_top) {
				self.setData({
					is_top: false
				})

			}
			console.log(e.scrollTop);
			//控制头部隐藏显示
			if (e.scrollTop >= 145) {
				this.transparent = true;
			} else {
				this.transparent = false;
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.setData({
				page: 1
			});
			self = this;
			uni.showLoading({
				title: '加载中'
			});
			this.getApp().request({
				url: this.getApp().api.default.active_list,
				data: {
					aid: activity_id,
					cat_id: self.cat_id || '',
					page: 1,
					q: this.searchValue || ''
				},
				success: function(res) {
					if (res.code == 0) {

						self.setData({
							goodListMsg: res.data.activity,
							goodList: res.data.page.goods,
							total_count: res.data.page.row_count,
							invalid_areas: res.data.activity.invalid_areas,
							sort: '',
							by: '',
							discountDefault: true,
							priceDefault: true,
							is_no_more: false,
						});
					}
				},
				complete: function() {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var title = self.shareTitle;
			var img = self.sharePic
			if (res.from === 'button') {
				// 来自页面内转发按钮
				this.shareModalClose();
			}

			return this.getApp().page.onShareQp(this, 'aid=' + activity_id, title, img);
		},
		computed: {
			margin_top() {
				let margin_top1 = uni.upx2px(86) + this.customBar + 'px';
				return margin_top1;
			},
			is_commission() {
				return this.$store.state.show_commission
			} 
		},
		methods: {
			inputSearch(e) {
				if (e.detail.value) {
					this.searchValue = e.detail.value
					this.priceDefault = true,
						this.commissionDefault = true,
						this.show_search_page = true
					this.closeChange()
					uni.showLoading({
						title: '加载中'
					});
					this.getApp().request({
						url: this.getApp().api.default.active_list,
						data: {
							aid: activity_id,
							cat_id: this.chooseIns,
							q: this.searchValue || ''
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.page.goods,
									page: 1
								});
							}
						}
					});
				} else {
					this.show_search_page = false
				}

			},
			clearSearch() {
				console.log(222333);
				this.searchValue = '',
					this.show_search_page = false
			},
			// 获取优惠券提示状态
			setRedPackTips(e) {
				this.couponStatus = e
			},
			getCouponStatus() {
				this.getApp().request({
					url: this.getApp().api.coupon.check_cart,
					data: {
						aid: activity_id
					},
					success: (res) => {
						if (res.code == 0) {
							this.couponStatus = res.data.status;
						}

					}
				})
			},
			changeNav: function(e) {
				var index = e.currentTarget.dataset.index;
				var num = e.currentTarget.dataset.num;
				let newCatArr = this.catsArr;
				newCatArr[num].checked = !newCatArr[num].checked;
				var newChooseIns = [];
				newCatArr.map((item, index) => {
					if (item.checked) {
						newChooseIns.push(item.id);
					}
				}); // console.log(newChooseIns.join(','))

				this.setData({
					chooseIns: newChooseIns.join(','),
					cat_id: newChooseIns.join(','),
					priceDefault: true,
					commissionDefault: true,
					catsArr: newCatArr
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: activity_id,
						cat_id: this.chooseIns,
						q: this.searchValue || ''
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							self.setData({
								goodList: res.data.page.goods,
								page: 1
							});
						}
					}
				});
			},

			goBack() {
				uni.navigateBack({
					delta: 1,
					fail: res => {
						uni.redirectTo({
							url: '/pages/index/index'
						});
					}
				});
			},

			openDescription: function() {
				var show = this.is_show;
				this.setData({
					is_show: !show
				});
			},
			showShareModal: function() {
				var self = this;
				self.setData({
					share_modal_active: "active",
					no_scroll: true
				});
				if (!self.sharePic) {
					self.getSharePic()
				}
			},
			shareModalClose: function() {
				var self = this;
				self.setData({
					share_modal_active: "",
					no_scroll: false
				});
			},
			// 开启分享前，先获取分享卡牌
			getSharePic() {
				var self = this
				var goodListMsg = self.goodListMsg
				var list = goodListMsg.min_goods_info;
				var goods_name = goodListMsg.name
				var tmpprice = list.price; // 手机适配
				uni.showLoading({
					title: '加载中'
				})
				self.getApp().request({
					url: self.getApp().api.default.shareCard,
					method: 'POST',
					data: {
						pics: self.imgUrl,
						// price: tmpprice,
						sale_price: tmpprice,
						id: activity_id,
						type: '102',
						goods_name: goods_name
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading()
							self.setData({
								sharePic: res.data.pic_url,
								shareTitle: res.data.goods_name
							})
						}
						if (res.code == 1) {
							uni.hideLoading()
							uni.showToast({
								title: '卡片图片获取失败，请稍后再试',
								duration: 2500,
								icon: 'none'
							})
						}
					},
					fail: function() {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误，请稍后再试',
							duration: 2500,
							icon: 'none',
						})
					}
				})
			},
			loadData: function(options) {
				self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: activity_id
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							var catsArr = res.data.activity.cats;
							var arr = [];

							for (let i in catsArr) {
								var obj = {
									id: i,
									catsName: catsArr[i],
									checked: false
								};
								arr.push(obj);
							}
							var goodList = res.data.page.goods
							var imgUrl = []
							for (let i in goodList) {
								if (i < 4) {
									imgUrl.push(goodList[i].first_cover_pic)
								} else {
									break
								}
							}
							self.setData({
								goodListMsg: res.data.activity,
								mrtj_sc: res.data.mrtj_sc,
								goodList: res.data.page.goods,
								catsArr: arr,
								imgUrl: imgUrl.toString(),
								totalPage: res.data.page.page_count,
								total_count: res.data.page.row_count,
								invalid_areas: res.data.activity.invalid_areas,
								end_date: res.data.activity.end_date,
								start_data: res.data.activity.start_date
							}); 
							if (res.data.mrtj_ht.code == 0) {
								self.topic.id = res.data.mrtj_ht.data.id
								self.topic.ht_id = res.data.mrtj_ht.data.ht_id
							}
							// var objKeys=Object.keys(catsArr);
							// console.log(objKeys.length);
							// var arr = []
							// for (var i=0;i<objKeys.length;i++) {
							// 	arr.id = 
							// }
							// wx.setNavigationBarTitle({
							// 	title: res.data.activity.name
							// })

							self.timeData();
						}

						if (res.code == 1) {
							uni.showModal({
								content: res.msg,
								icon: 'none',
								complete: function() {
									uni.redirectTo({
										url: '/pages/index/index'
									});
								}
							});
						}
					}
				});
			},
			// 倒计时
			timeData: function() {
				var self = this;
				var end_date = self.end_date;
				var start_data = self.start_data;
				var now_date = parseInt(new Date().getTime() / 1000);

				if (start_data - now_date > 0) {
					var time_date = start_data - now_date;
					var sd, sh, sm;
					sd = Math.floor(time_date / 60 / 60 / 24);
					sh = Math.floor(time_date / 60 / 60 % 24);
					sm = Math.floor(time_date / 60 % 60);

					if (sd < 10) {
						sd = '0' + sd;
					}

					if (sh < 10) {
						sh = '0' + sh;
					}

					if (sm < 10) {
						sm = '0' + sm;
					}

					if (sd >= '00' && sh >= '00' & sm >= '00') self.setData({
						sd: sd,
						sh: sh,
						sm: sm,
						kaishishi: true
					});
				} else {
					var time_date = end_date - now_date;
					var ed, eh, em;
					ed = Math.floor(time_date / 60 / 60 / 24);
					eh = Math.floor(time_date / 60 / 60 % 24);
					em = Math.floor(time_date / 60 % 60);

					if (ed < 10) {
						ed = '0' + ed;
					}

					if (eh < 10) {
						eh = '0' + eh;
					}

					if (em < 10) {
						em = '0' + em;
					}

					if (ed >= '00' && eh >= '00' & em >= '00') {
						self.setData({
							ed: ed,
							eh: eh,
							em: em,
							daojishi: true
						});
					}
				}
			},
			// 复制标题
			copyText: function(e) {
				var text = e.currentTarget.dataset.text;
				this.setClipboardData({
					data: text,

					success(res) {
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
			},
			getCartNum: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.cartCount,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								cartNum: res.data.count
							});
						}
					}
				});
			},
			openChoose: function() {
				var self = this;
				this.setData({
					chooseOpen: !self.chooseOpen
				});
			},
			closeChoose: function() {
				this.setData({
					chooseOpen: false
				});
			},
			chooseAll: function() {
				var self = this;
				var catsArr = self.goodListMsg.cats;
				var arr = [];

				for (let i in catsArr) {
					var obj = {
						id: i,
						catsName: catsArr[i],
						checked: false
					};
					arr.push(obj);
				}

				self.setData({
					catsArr: arr,
					chooseIns: 0,
					cat_id: '',
					priceDefault: true,
					is_no_more: false
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: activity_id,
						q: this.searchValue || ''
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							self.setData({
								goodList: res.data.page.goods,
								count: res.data.page.row_count,
								page: 1
							});
						}
					}
				});
			},
			//打开多选
			showChange: function() {
				if (!this.transparent) {
					this.setData({
						showChangeMore: true
					});
				} else {
					this.showChangeMore_2 = true;
				}

			},
			//多选关闭
			showChange1: function() {
				if (!this.transparent) {
					this.setData({
						showChangeMore: !this.showChangeMore
					});
				} else {
					this.setData({
						showChangeMore_2: !this.showChangeMore_2
					});
				}

			},
			//多选关闭
			closeChange: function() {
				this.setData({
					showChangeMore: false,
					showChangeMore_2: false
				});
			},
			// 佣金
			commissionSort: function() {
				//多选关闭
				this.setData({
					showChangeMore: false,
					showChangeMore_2: false
				});
				let self = this;
				var up = self.commissionUp;
				self.setData({
					priceDefault: true,
					commissionDefault: false,
					commissionUp: !up
				});
				uni.showLoading({
					title: '加载中'
				});

				if (self.commissionUp == true) {
					self.setData({
						sort: 'c1',
						by: 'desc'
					});
					this.getApp().request({
						url: this.getApp().api.default.active_list,
						data: {
							aid: activity_id,
							cat_id: self.cat_id,
							sort: self.sort,
							by: self.by,
							q: this.searchValue || ''
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.page.goods,
									page: 1
								});
							}

							;
						},
						complete: function() {}
					});
				} else {
					self.setData({
						sort: 'c1',
						by: 'asc'
					});
					this.getApp().request({
						url: this.getApp().api.default.active_list,
						data: {
							aid: activity_id,
							cat_id: self.cat_id,
							sort: self.sort,
							by: self.by,
							q: this.searchValue || ''
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.page.goods,
									page: 1
								});
							}

							;
						},
						complete: function() {}
					});
				}
			},
			// 价格排序
			priceSort: function() {
				//多选关闭
				this.setData({
					showChangeMore: false,
					showChangeMore_2: false
				});
				let self = this;
				var up = self.priceUp;
				self.setData({
					priceDefault: false,
					commissionDefault: true,
					priceUp: !up
				});
				uni.showLoading({
					title: '加载中'
				});

				if (self.priceUp == true) {
					self.setData({
						sort: 'price',
						by: 'desc'
					});
					this.getApp().request({
						url: this.getApp().api.default.active_list,
						data: {
							aid: activity_id,
							cat_id: self.cat_id,
							sort: self.sort,
							by: self.by,
							q: this.searchValue || ''
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.page.goods,
									page: 1
								});
							}

							;
						},
						complete: function() {}
					});
				} else {
					self.setData({
						sort: 'price',
						by: 'asc'
					});
					this.getApp().request({
						url: this.getApp().api.default.active_list,
						data: {
							aid: activity_id,
							cat_id: self.cat_id,
							sort: self.sort,
							by: self.by,
							q: this.searchValue || ''
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.page.goods,
									page: 1
								});
							}

							;
						},
						complete: function() {}
					});
				}
			},

			showShare: function() {
				this.setData({
					isShowShare: true
				});
				this.shareModalClose();
				this.getAcitivityQrcode();
			},
			createImage: function() {
				var self = this;
				var list = self.goodList;
				var activityMsg = self.goodListMsg;
				var activity_name = activityMsg.name;
				var imgUrl = list[0].first_cover_pic;
				var tmpprice = parseInt(list[0].price); // 手机适配

				var rpx = self.x / 375; // 结束时间获取

				var endTime = new Date(self.end_date * 1000);
				var month = endTime.getMonth() + 1;

				if (month < 10) {
					month = '0' + month;
				}

				var d = endTime.getDate();

				if (d < 10) {
					d = '0' + d;
				}

				var h = endTime.getHours();

				if (h < 10) {
					h = '0' + h;
				}

				var m = endTime.getMinutes();

				if (m < 10) {
					m = '0' + m;
				}

				var show_end_time = month + '月' + d + '日' + '  ' + h + ':' + m + '结束';
			},
			getAcitivityQrcode: function() {
				var self = this;
				var list = self.goodListMsg.min_goods_info;
				var activityMsg = self.goodListMsg;
				var activity_name = activityMsg.name;
				// var imgUrl = list.first_cover_pic;
				var imgUrl = self.imgUrl
				var tmpprice = list.price; // 手机适配

				var rpx = self.x / 375; // 结束时间获取

				var endTime = new Date(self.end_date * 1000);
				var month = endTime.getMonth() + 1;

				if (month < 10) {
					month = '0' + month;
				}

				var d = endTime.getDate();

				if (d < 10) {
					d = '0' + d;
				}

				var h = endTime.getHours();

				if (h < 10) {
					h = '0' + h;
				}

				var m = endTime.getMinutes();

				if (m < 10) {
					m = '0' + m;
				}

				var show_end_time = month + '月' + d + '日' + '  ' + h + ':' + m + '结束';
				var data = {
					goods_pic: imgUrl,
					act_name: activity_name,
					price_str: tmpprice,
					end_date: show_end_time,
					activity: activity_id,
					sidFsShare: 1
				};
				this.getApp().request({
					url: this.getApp().api.default.activity_qrcode,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								qrcode_pic: res.data.pic_url
							});
						}
					}
				});
			},
			closeShare: function() {
				this.setData({
					isShowShare: false
				});
			},
			savePhotoThrottle: util.throttle(function() {
				this.savePhoto();
			}, 1000),
			savePhoto: function() {
				var self = this;

				if (!self.qrcode_pic) {
					uni.showToast({
						title: '请等待图片加载完成~',
						duration: 2000,
						icon: 'none'
					});
					return;
				}

				uni.getImageInfo({
					src: self.qrcode_pic,

					success(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.path,

							success(res) {
								uni.showModal({
									content: '图片已保存到相册，赶紧晒一下吧~',
									showCancel: false,
									confirmText: '知道了',
									confirmColor: '#72B9C3',
									success: function(res) {
										if (res.confirm) {
											self.setData({
												isShowShare: false
											});
										}
									}
								});
							},

							fail: function(res) {
								if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
									uni.showToast({
										title: '请前往设置开启相册授权',
										duration: 2000,
										icon: 'none'
									});
								}
							}
						});
					}

				});
			},
			toSearch: function() {
				uni.navigateTo({
					url: '/pages/newSearch/newSearch'
				});
			},

			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id;
				var index = e.currentTarget.dataset.index;
				var goods = this.goodList[index];
				this.setData({
					show_attr_picker: true,
					goods: goods,
					['form.number']: 1
				});
				this.getGoodsAttr(id);
				gSpecificationsModel.init(this);
			},

			getGoodsAttr: function(id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: self.goods.from ? self.goods.from : '1'
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.attr[0].num == 0) {
								for (var i in res.data.attr) {
									if (res.data.attr[i].num > 0) {
										res.data.attr[0].total_num = true;
										break;
									}
								}
							}

							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list
							});

							if (res.data.attr != null && res.data.attr_group_list != null) {
								self.selectDefaultAttr(res.data);
							}
						}
					}
				});
			},
			//加入购物车
			addCart: function() {
				var self = this;
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
						showGetLogin: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return
				}

				this.submit('ADD_CART');
			},
			submit: function(type) {
				var self = this;

				if (self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}

				if (type == 'ADD_CART') {
					//加入购物车
					uni.showLoading({
						title: "正在提交",
						mask: true
					});
					this.getApp().request({
						url: this.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: self.goods.from ? self.goods.from : '1'
						},
						success: function(res) {
							uni.hideLoading();
							self.getCartNum()
							if(self.couponStatus != 2) {
								self.getCouponStatus()
							}
							uni.showToast({
								title: res.msg,
								duration: 1500,
								icon: 'none'
							});
							self.setData({
								show_attr_picker: false
							});
							self.sendEvent("加入购物车", {
								"商品名称": self.goods.name,
								"商品ID": self.goods.id,
							})
						}
					});
				}
			},

			/**
			 * 页面上拉触底事件的处理函数
			 */
			getMore: function() {
				var self = this;
				var page = self.page;

				if (self.page < self.totalPage) {
					++page;
					self.setData({
						page: page
					});
				} else {
					self.setData({
						is_no_more: true
					});
					return;
				}

				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.active_list,
					data: {
						aid: activity_id,
						cat_id: self.cat_id,
						sort: self.sort || '',
						by: self.by || '',
						page: page,
						q: this.searchValue || ''
					},
					success: function(res) {
						uni.hideLoading();

						if (res.code == 0) {
							var newGoodList = res.data.page.goods;
							var nowGoodList = self.goodList.concat(newGoodList);
							self.setData({
								goodList: nowGoodList
							});
						}
					}
				});
			},
			//
			open_again() {
				this.show_again = true;
			},
			// 检测优惠券
			checkCoupon() {
				//以显示过的活动iD列表

			},
			//空函数
			stop() {

			}
		}
	};
</script>

<style>
	@import url("~@/components/goods/specifications_model.css");

	page {
		height: 100%;
		background: rgba(207, 207, 207, 0.33);
	}

	.nav {
		color: #fff;
	}

	.activity-header {
		width: 100%;
	}

	.con {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
	}

	.search-box {
		width: 350rpx;
		height: 60rpx;
		background: rgba(255,255,255,.3);
		border-radius: 30rpx;
		padding: 0rpx 24rpx;
	}

	.act-msg {
		padding: 40rpx 24rpx 37rpx;
	}

	.header-share-btn {
		height: 40rpx;
		text-align: center;
		color: #EE001F;
		background: #FFFFFF;
		box-shadow: 0px 5rpx 10rpx 0px #F23529;
		border-radius: 20rpx;
		margin-top: 12rpx;
		padding: 0 20rpx;
	}

	.act-msg-logo {
		width: 120rpx;
		height: 120rpx;
		border-radius: 14rpx;
		margin-right: 21rpx;
	}

	.title {
		position: absolute;
		width: 100%;
		left: 0rpx;
		bottom: 0rpx;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 23rpx 0 19rpx;
	}

	.backBtn {
		margin-left: 30rpx;
		font-size: 36rpx;
		display: flex;
		align-items: center;
		height: 100%;
		justify-content: center;
		max-width: 100%;
		color: #fff;
		opacity: 0.5;
	}

	.activity {
		min-height: 100%;
	}

	.discounts-box {
		position: sticky;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 56rpx;
		line-height: 56rpx;
		padding: 0 8rpx;
		z-index: 1;
		color: #F23005;
		background: #EFEFEF;
		font-size: 24rpx;
	}

	.discounts-pic {
		width: 57rpx;
		height: 46rpx;
	}

	.discounts-box-icon {
		width: 36rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		background: #FF0000;
		color: #fff;
		font-size: 20rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}

	.guang-nav-list {
		width: 100%;
		overflow: hidden;
		color: #999;
		background: #fff;
		font-size: 30rpx;
		position: relative;
		z-index: 9;
	}

	.nav-tab {
		padding: 25rpx 0rpx;
		font-size: 30rpx;
		margin-right: 47rpx;
	}

	.nav-active {
		width: 44rpx;
		height: 8rpx;
		position: absolute;
		bottom: 0rpx;
		left: 50%;
		margin-left: -22rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
	}

	.shopTab {
		padding: 4rpx 8rpx;
		text-align: center;
		color: #fff;
		left: 15rpx;
		bottom: 15rpx;
		background: #c10000;
		font-size: 20rpx;
		border-radius: 4rpx;
	}

	.share-box {
		position: absolute;
		top: 25rpx;
		right: 20rpx;
		width: 50rpx;
		height: 50rpx;
		background-color: transparent;
		padding: 0;
		border: 0;
	}

	.share-box::after {
		border: 0;
	}

	.canvas-box {
		position: fixed;
		top: 99999px;
		left: 0;
	}

	.activity-head {
		width: 100%;
		height: 300rpx;
		position: relative;
	}

	.activity-title {
		width: 750rpx;
		height: 92rpx;
		background: rgba(0, 0, 0, 0.37);
		position: absolute;
		bottom: 0;
		padding: 5rpx 28rpx;
	}

	.time-box {
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		background: rgba(0,0,0,.5);
		font-size: 24rpx;
		color: #fff;
		margin: 0 5rpx;
		font-weight: bold;
		border-radius: 8rpx;
	}

	.tips-box {
		padding: 25rpx 27rpx 0;
		background: #fff;
		position: relative;
	}

	.tips {
		padding: 25rpx 24rpx;
		padding-bottom: 67rpx;
		background: rgba(255, 180, 180, 0.14);
	}

	.tip-btn {
		width: 100%;
		height: 43rpx;
		line-height: 43rpx;
		padding: 0 273rpx;
		left: 0;
		bottom: 0;
		background: rgba(255, 180, 180, 0.3);
		border-radius: 0px 0px 8rpx 8rpx;
	}

	.screen {
		padding: 24rpx 0;
	}

	.nav-screen {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		padding: 25rpx 24rpx;
		z-index: 999;
		background: black;
	}

	.choose-btn {
		padding: 4rpx 0 4rpx 20rpx;
		text-align: center;
		font-size: 28rpx;
		color: #fff;
		background: #f49e3a;
		border-radius: 24rpx;
	}

	.choose-option {
		position: absolute;
		top: 0;
		left: 0rpx;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.35);
		/* background: #fff; */
		z-index: 999;
	}

	.choose-option-content {
		width: 200rpx;
		text-align: center;
		border: 1rpx solid #8d8d8d;
		line-height: 1 !important;
		padding: 8rpx 8rpx;
		border-radius: 25rpx;
		margin-bottom: 20rpx;
		margin-right: 39rpx;
		font-size: 28rpx;
		color: #8d8d8d;
	}

	.choose-active {
		color: #ff9100;
		border: 1rpx solid #ff9100;
	}

	.choose-option-content-no {
		border: 2rpx solid #d6d6d6;
		color: #8d8d8d;
	}

	.goods-list {
		padding: 20rpx 24rpx 0;
		overflow: visible;
		margin-left: 0rpx;
		margin-right: 0rpx;
	}

	.goods {
		width: 340rpx;
		border-radius: 20rpx;
	}

	.goods-msg {
		padding: 18rpx 10rpx;
		margin-top: -4rpx;
		height: 150rpx;
	}

	.goods-msg-title {
		font-size: 24rpx;
		color: #333;
		margin-bottom: 8rpx;
	}

	.add-cart-icon {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.under-line {
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		margin-left: -30rpx;
		width: 60rpx;
		height: 8rpx;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 4rpx;
	}

	.change {
		transform: rotate(-180deg);
	}

	.share {
		left: 0;
		right: 0;
		z-index: 999;
		top: 0;
		background: rgba(0, 0, 0, 0.35);
		padding: 81rpx 71rpx 0;
		display: flex;
		align-items: center;
	}

	.share-content {
		width: 608rpx;
		height: 924rpx;
		background: #fff;
		padding: 25rpx;
	}

	.shop-name {
		width: 223rpx;
		padding: 8rpx 0;
		font-size: 28rpx;
		color: #fff;
		background: #252e3e;
		border-radius: 28rpx;
		margin: 0 auto 20rpx;
		text-align: center;
	}

	.content {
		margin: 51rpx auto 0;
		padding: 0 22rpx;
	}

	.content-bottom {
		padding-left: 22rpx;
		display: flex;
		align-items: flex-end;
	}

	.share-btn {
		position: absolute;
		bottom: -115rpx;
		width: 608rpx;
		height: 78rpx;
		line-height: 78rpx;
		background-color: #f49e3a;
		padding: 0;
		border: 0rpx solid #fff;
		border-radius: 0 !important;
		color: #fff;
		font-size: 30rpx;
	}

	button {
		background-color: none !important;
		border: none;
	}

	button::after {
		border: 1px solid rgba(0, 0, 0, 0);
	}

	.share-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.0);
		z-index: 1000;
		transform: translateY(100%);
		transition: background 250ms;
	}

	.share-modal .share-modal-body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding-top: 90rpx;
		transform: translateY(100%);
		transition: transform 250ms;
		text-align: center;
	}

	.share-modal-body text.close {
		width: 28rpx;
		height: 28rpx;
		right: 34rpx;
		top: 34rpx;
	}

	.share-modal-body .shareGet {
		color: #2c2c2c;
		font-weight: 600;
		font-size: 14px;
		margin-bottom: 20rpx;
	}

	.share-modal-body .tips {
		color: #d6d6d6;
		font-size: 12px;
		margin-bottom: 90rpx;
	}

	.shareGet span {
		color: #c10000;
		margin-left: 10rpx;
	}

	.share-modal.active {
		transform: translateY(0);
		background: rgba(0, 0, 0, 0.5);
	}

	.share-modal.active .share-modal-body {
		transform: translateY(0);
	}

	.share-modal .share-bottom {
		text-align: center;
		font-size: 9pt;
		margin: 0;
		padding: 0;
		margin-bottom: 70rpx;
		line-height: inherit;
		border: none;
		background: none;
		color: inherit;
		font-family: inherit;
		display: inline-block;
	}

	.share-modal .share-bottom:after {
		display: none;
	}

	.share-modal .share-bottom text {
		display: block;
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 50%;
		line-height: 100rpx;
		text-align: center;
		background: #4cb202;
	}

	.share-modal .share-bottom:active image {
		opacity: 0.7;
	}

	.share-modal .share-modal-close {
		background: #fff;
		height: 100rpx;
		border-top: 1rpx solid #eee;
	}

	/* QQQ */

	.more1 {
		width: 750rpx;
		height: 2000rpx;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		z-index: 2;
		left: 0;
		top: 0;
		overflow: hidden;
	}

	.more-content {
		width: 750rpx;
		background-color: #fff;
		padding: 6rpx 27rpx 0rpx 27rpx;
		border-radius: 0px 0px 30rpx 30rpx;
		min-height: 200rpx;
		animation: open 0.3s;
		overflow: hidden;
	}

	.more-list {
		display: inline-block;
		height: 54rpx;
		line-height: 54rpx;
		padding-left: 22rpx;
		padding-right: 22rpx;
		font-size: 26rpx;
		color: #999;
		border-radius: 27rpx;
		background-color: #f4f4f4;
		margin-right: 32rpx;
		margin-bottom: 32rpx;
	}

	.more-active {
		color: #ffc330;
		background-color: #fff3d6;
	}

	@keyframes open {
		from {
			transform: translateY(-200rpx);
		}

		to {
			transform: translateY(0);
		}
	}

	/* 旋转 */

	.change {
		transform: rotate(180deg);

	}

	.check-scroll {
		white-space: nowrap;
		height: 80rpx;
		padding-top: 15rpx;
	}

	.check-scroll>view {
		margin-bottom: 0;
		display: inline-block;
		white-space: nowrap;
	}

	.header_tow {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: red;
		min-height: 100rpx;
	}
	.zhuan-box {
		width: 30rpx;
		height: 30rpx;
		line-height: 30rpx;
		text-align: center;
		background: #F23005;
		border-radius: 50%;
		font-size: 18rpx;
		color: #fff;
		margin-right: 6rpx;
	}
</style>
