<template>
	<view class="guanyiguan" style="overflow:hidden;">
		<common></common>
		<!-- 头部开始 -->
		<view id="g-header" class="bbbb">
			<view style="background-color: #F23005;padding-bottom: 48rpx;">
				<view class="con top-main flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view></view>
					<view class="fs-30 color-fff">导购商城</view>
					<view></view>
				</view>
				<!-- 搜索开始 -->

				<view class="flex flex-y-center pl-24 pr-24 mt-24 fs-24">
					<image :src="init_img.c_qdg" style="width: 140rpx;height: 56rpx;transform: scale(1.1);" mode=""></image>
					<view @tap="to_seach" class="flex flex-1 flex-y-center" style="height: 56rpx;margin-left: 24rpx;border-radius: 28rpx;background-color: #FFFFFF;">
						<text class="iconfont icon-sousuo " style="color: #F23005;padding-left: 12rpx;font-size: 28rpx;"></text>
						<input disabled="true" class="flex-1  fs-24" style="height: 56rpx;padding-left: 12rpx;padding-right: 12rpx;" type="text"
						 placeholder="请输入关键词" />
						<text class="flex flex-x-center flex-y-center fs-24" style="background-color:#F23005;width: 100rpx;height: 50rpx; border-radius: 25rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
					</view>
				</view>
				<!-- 搜索结束 -->
			</view>

			
			<view class="guang-nav-list flex" style="padding:0rpx 24rpx;position: relative;z-index: 2;border-radius: 30rpx 30rpx 0 0 ; margin-top: -24rpx;background-color: #F4F4F4;">
				<view style="width: 100%;height: 76rpx;">
					<scroll-view scroll-x="true" enable-flex="true">
						<view class="flex align-center">
							<view :class="'nav flex-grow-0 ' + (index==navIns?'active':'')" @tap="changeNav" v-for="(item, index) in catalog_old"
							 :key="index" :data-index="index" :data-id="item.id">{{filters.substring(item.name,4)}}</view>
						</view>
					</scroll-view>
				</view>

			</view>


			<view v-if="cat_id==0">
				<!-- 轮播开始 -->
				<view class="swiper-box mb-32" v-if="swiperList.length>0">
					<swiper class="muSwiper" indicator-active-color="#F23005" style="width: 100%;border-radius: 20rpx;overflow: hidden;"
					 indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500">
						<swiper-item style="height: 100%; height: 260rpx;" v-for="(item, index) in swiperList" :key="index">
							<navigator style="height: 100%;" :url="item.page_url" hover-class="none">
								<image style="width: 100%;border-radius: 20rpx;height: 260rpx;" :src="item.pic_url" mode="aspectFill"></image>
							</navigator>
						</swiper-item>
					</swiper>

				</view>
				<!-- 新保龄球路口开始 -->
				<!-- <scroll-view :scroll-x="true" style="width: 750rpx;"> -->
					<view class="hot_list">
						<view class="hot_item" v-for="(item,index) in hot_navs" :key="index" @tap="less(navTo,item.jump_url,item.name)">
							<image :src="item.pic_url" mode=""></image>
							<text>{{item.name}}</text>
						</view>
					</view>
				<!-- </scroll-view> -->
				<!-- 新保龄球路口结束 -->
				
			</view>
			<view class="plr-24" v-if="catalog_old && cat_id>0">
				<view class="guang-nav-list-er flex ns-wrap mb-32">
					<navigator v-if="item.page_url" :url="item.page_url" :data-url="item.page_url" class="nav-er flex-grow-0" v-for="(item, index) in catalog_old[navIns].child"
					 :key="index" :data-index="index" :data-id="item.id">
						<view class="flex-x-center">
							<image lazy-load="true" style="width: 120rpx;height: 120rpx;border-radius: 50%;overflow: hidden;" mode="aspectFill"
							 :src="item.pic_url"></image>
						</view>
						<view class="ns-text-center fs-22 color-333333 mt-10">{{item.name?filters.substring(item.name,4):''}}</view>
					</navigator>
					<view v-if="!item.page_url" class="nav-er flex-grow-0" @tap="toGYGDetail" v-for="(item, index) in catalog_old[navIns].child"
					 :key="index" :data-index="index" :data-id="item.id" :data-text="item.name">
						<view class="flex-x-center">
							<image lazy-load="true" style="width: 120rpx;height: 120rpx;border-radius: 50%;overflow: hidden;" mode="aspectFill"
							 :src="item.pic_url"></image>
						</view>
						<view class="ns-text-center fs-22 color-333333 mt-10">{{item.name?filters.substring(item.name,4):''}}</view>
					</view>
				</view>
			</view>
			<!-- 轮播结束 -->
		</view>
		
		<view style="padding-bottom: 0px;" class="body after-navber">

			<view v-if="cat_id==0">
				<!-- <view class="myhu"></view> -->
				<view>
					<view class="flex align-center justify-between mb-24 plr-24">
						<view class="flex align-center">
							<view class="flex align-center">
								<view class="tab-tips"></view>
								<view class="tab-title">我的关注</view>
							</view>
							<view class="fs-24" style="color: #9A9A9A;margin-left: 18rpx;" v-if="brandLikeList.length > 0">(关注品牌，掌握每一条新动态)</view>
						</view>
						<navigator url="/pages/brandLike/brandLike" v-if="brandLikeList.length > 0" style="width: 130rpx;height: 50rpx;background: #8814EE;border-radius: 25rpx;text-align:center;font-size:20rpx;color:#fff;line-height:50rpx;display:flex;align-item:center;justify-content: center;">继续添加<text
							 class="iconfont icon-jinru color-fff" style="line-height:50rpx;display:inline-block;width:15rpx;"></text></navigator>
					</view>
				</view>
				<block v-if="brandLikeList.length == 0">
					<navigator class="plr-24 mb-20" style="height: 94rpx;" hover-class="none" url="/pages/brandLike/brandLike">
						<image :src="brankLikeImg" style="width: 100%;height: 94rpx;;border-radius: 20rpx" mode="aspectFill"></image>
					</navigator>
				</block>
				<!-- v1.10 品牌关注结束 -->
				<!-- 关注品牌列表开始-->
				<view class="mt-20 plr-24" v-if="brandLikeList.length > 0">
					<scroll-view scroll-x="true">
						<view class="flex">
							<view v-for="(item, index) in brandLikeList" :key="index">
								<!-- 一行 -->
								<view class="bg-white mb-24 mr-24" style="border-radius: 20rpx;" v-if="item.show_style == 1">
									<!-- 单品牌内容 -->
									<!-- 品牌名字 -->
									<view style="padding: 25rpx 24rpx;">
										<navigator :url="'/pages/activity/activity?aid=' + item.id" class="flex ns-justify-content-space-between"
										 hover-class="none">
											<view class="flex" style="width: 85%;">
												<view class="flex-grow-0">
													<image lazy-load="true" style="width: 90rpx;height: 90rpx;border-radius: 20rpx;border: 2rpx solid #F4F4F4;background: #fff;"
													 :src="item.banner"></image>
												</view>
												<view class="ml-30 flex-grow-1">
													<view class="fs-30 color-333333">{{item.name}}</view>
													<view class="fs-24 color-999999 ns-text-limit flex mt-10" style="width: 400rpx;">共{{item.goods_sum}}款，全场¥<text
														 class="color-FF0200">{{item.min_price}}</text>起</view>
												</view>
											</view>
											<view class="flex " style>
												<!-- <view style="margin-right: 12rpx;color:#999999;font-size:18rpx;">更多<text class="iconfont icon-jinru color-fff ml-10"
												 style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center; "></text></view> -->
												<view class="iconfont icon-guanbi color-fff" style="color: #BABABA;" @tap.stop="delBrandLike" :data-id="item.id"></view>
											</view>
										</navigator>
									</view>
									<!-- 品牌商品 -->
									<view class="flex " style="padding: 0rpx 24rpx 20rpx; ">
										<scroll-view scroll-x="true">
											<view class="flex">
												<navigator v-for="(item1, index2) in item.goods" :key="index2" :url="'/pages/goods/goods?id=' + item1.id"
												 style="width: 178rpx;margin-right: 24rpx;" :data-id="item1.goods_id">
													<view style="position: relative;width: 178rpx;height: 178rpx;">
														<image lazy-load="true" mode="aspectFill" :src="item1.first_cover_pic" style="background: #ccc;width: 178rpx;height: 178rpx;position: relative;border-radius: 20rpx;"></image>
														<view class="sell-up " v-if="item1.goods_num==0">
															<view>已抢光</view>
															<view class="line"></view>
															<view style="font-size: 17rpx;">sold out</view>
														</view>
													</view>

													<view class="clear miaosha_price mt-20 flex align-center" style="font-size:26rpx;">
														<view class="qiang-tips">抢</view>
														<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-28">{{filters.priceStr(item1.price)[0]}}.</text><text>{{filters.priceStr(item1.price)[1]}}</text></view>
													</view>
													<view class="text-more-1 fs-24 color-333333 mt-16">{{item1.name}}</view>
												</navigator>

											</view>
										</scroll-view>

									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- v1.12素材推荐 -->
				<view v-for="(value, index) in newActsList" :key="index" style="padding: 0 25rpx;border-radius: 8rpx;background: #f4f4f4;"
				 v-if="newActsList.length>0">
					<view class="flex align-center justify-between mb-24">
						<view class="flex align-center">
							<view class="tab-tips"></view>
							<view class="tab-title">{{value.name}} {{value.list?value.list[0].show_style?value.list[0].show_style:'':''}}</view>
						</view>
						<view>
							
						</view>
					</view>
					<block v-if="value.list?value.list.length>0:''">
						<view v-for="(item, index2) in value.list" :key="index2">
							<!-- 一行 -->
							<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="value.show_style == 1">
								<!-- 单品牌内容 -->
								<!-- 品牌名字 -->
								<active :item='item' :goodsList="item.activity_data.goods"></active>
							</view>

						</view>
					</block>
				</view>

				<!-- 关注品牌列表结束 -->

				<!-- 联营商活动开始 -->
				<view style="padding: 0 25rpx;border-radius: 8rpx;background: #f4f4f4;" v-if="actStoreList.length>0">
					<view class="flex align-center justify-between mb-24">
						<view class="flex align-center">
							<view class="tab-tips"></view>
							<view class="tab-title">{{actStoreName}}</view>
						</view>
						<view class>
							<navigator url="/pages/activityCollect/activityCollect?waiting=3" style="margin-right: 12rpx;color:#999999;font-size:18rpx">
								更多<text class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background-color: #F23005;;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text>
							</navigator>
						</view>
					</view>
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
				</view>

				<!-- 联营活动结束 -->

				<!-- 普通活动开始 -->
				<view style="padding: 0 25rpx;border-radius: 8rpx;background: #f4f4f4;" v-if="actList.length>0">
					<view class="flex align-center justify-between mb-24">
						<view class="flex align-center">
							<view class="tab-tips"></view>
							<view class="tab-title">{{actName}}</view>
						</view>

					</view>
					<block v-if="actList.length>0">
						<view v-for="(item, index) in actList" :key="index" class="cida">
							<!-- 一行 -->
							<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.show_style == 1">
								<!-- 单品牌内容 -->
								<!-- 品牌名字 -->
								<active :item='item' :goodsList="item.goods"></active>
							</view>
							<!-- 多行 -->

							<!-- 爆品返场 -->
							<view class="pb-24" v-if="item.show_style == 2">
								<view class="flex align-center justify-between mb-24">
									<view class="flex align-center">
										<view class="tab-tips"></view>
										<view class="tab-title">{{item.name}}</view>
									</view>
									<view class>
										<navigator :url="'/pages/activity/activity?aid=' + item.id" style="margin-right: 12rpx;color:#999999;font-size:18rpx">
											<!--更多<text
										 class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text>
			       -->
											<view class="flex align-center " style="width: 100rpx;height: 50rpx;background: linear-gradient(-90deg, #FF3750, #FF7006);border-radius: 25rpx;text-align:center;font-size:20rpx;color:#fff;line-height:50rpx;display:flex;align-item:center;justify-content: center;">进入<text
												 class="iconfont icon-jinru color-fff" style="line-height:24rpx;width: 24rpx;height: 24rpx;background: #fff;border-radius: 50%;color: #FF7006;margin-left: 6rpx;"></text></view>
										</navigator>
									</view>
								</view>
								<view>
									<navigator v-for="(item1, index2) in item.goods" :key="index2" :url="'/pages/goods/goods?id=' + item1.id"
									 class="goods-box mb-24 bg-white">
										<view class="goods-img pr">
											<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item1.recommend_thumb"></image>
											<view class="goods-tips" v-if="item1.is_show_icon == 1">{{item1.icon_label}}</view>
											<view v-if="item1.goods_num==0" class="nonum-tip">已抢光</view>
										</view>
										<view class style="padding: 18rpx 26rpx 25rpx 16rpx;">
											<view>
												<view class="fs-30 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{item1.name}}</view>
												<view class="fs-24 color-9B9B9B ns-text-limit2" style="margin-top: 6rpx;" v-if="item1.desc">{{item1.desc}}</view>
											</view>
											<view class="flex justify-between align-center" style="margin-top: 21rpx;">
												<view class="flex align-center">
													<view class="color-FF343B ns-text-bold">
														<text class="fs-24">¥ </text><text style="font-size: 48rpx;">{{filters.priceStr(item1.price)[0]}}.</text><text
														 class="fs-24">{{filters.priceStr(item1.price)[1]}}</text>
													</view>
													<view class="fs-24 color-9B9B9B ml-10 ns-text-through" style="margin-top: 15rpx;" v-if="item1.original_price">¥
														{{item1.original_price}}</view>
												</view>
												<!-- <view class="add-cart-icon fs-30 iconfont icon-gouwuche_weixuanzhong color-fff" catchtap="openCart" data-id="{{item.id}}"
												 data-index="{{index}}"></view> -->
												<navigator :url="'/pages/goods/goods?id=' + item1.id" class="add-cart-btn color-fff flex align-center">
													<view class="pl-20 pr-24 fs-20" style="border-right: 1rpx solid #fff;">仅剩 {{item1.goods_num}} 件</view>
													<view class="plr-20 fs-24">立即抢</view>
												</navigator>
											</view>
										</view>
									</navigator>
								</view>
							</view>
							<!-- 图片 -->
							<navigator hover-class="none" :url="'/pages/activity/activity?aid=' + item.id" class="gyg-act-img" v-if="item.show_style == 3">
								<image mode="aspectFill" style="width: 702rpx;height: 237rpx;border-radius:20rpx;" :src="item.banner"></image>
							</navigator>

						</view>
					</block>
					<block v-else>
						<view class="ns-text-center" style="padding-top: 50rpx;">
							暂无活动商品，您可以到其他分类中逛一逛！
						</view>
					</block>
				</view>
				<!-- 普通活动结束 -->
			</view>

			<view v-else>

				<view class="two-scroll">
					<view class="guang-nav-list-er flex ns-wrap mb-32" v-if="catalog[navIns]&&catalog[navIns].child&&catalog[navIns].child.length>0">
						<navigator v-for="(item, index) in catalog[navIns].child" :key="index" v-if="item.page_url" :url="item.page_url"
						 :data-url="item.page_url" class="nav-er flex-grow-0 " :data-index="index" :data-id="item.id">
							<view class="flex-x-center">
								<image lazy-load="true" style="width: 120rpx;height: 120rpx;border-radius: 50%;overflow: hidden;" mode="aspectFill"
								 :src="item.pic_url"></image>
							</view>
							<view class="ns-text-center fs-22 color-333333 mt-10">{{item.name?filters.substring(item.name,4):''}}</view>
						</navigator>
						<view v-for="(item, index) in catalog[navIns].child" :key="index" v-if="!item.page_url" class="nav-er flex-grow-0"
						 @tap="toGYGDetail" :data-index="index" :data-id="item.id" :data-text="item.name">
							<view class="flex-x-center">
								<image style="width: 120rpx;height: 120rpx;border-radius: 50%;overflow: hidden;" mode="aspectFill" :src="item.pic_url"></image>
							</view>
							<view class="ns-text-center fs-22 color-333333 mt-10">{{item.name?filters.substring(item.name,4):''}}</view>
						</view>
					</view>
					<!-- 活动 -->
					<view>
						<view class="cat-activity flex justify-between mb-32">
							<view class>
								<view class="fs-36 text-bold" style="color: #FF401A;">超值疯抢</view>
								<view class="cat-activity-label fs-20 color-fff">活动速递</view>
							</view>
							<!-- <view class="flex-y-center">
								<view style="width:2rpx;height:25rpx;background: #BABABA;"></view>
							</view> -->
							<!-- 添加 -->
							<navigator hover-class="none" :url="'/pages/activityCollect/activityCollect?cat_id=' + cat_id + '&waiting=2'">
								<view class="flex align-center">
									<view class="fs-36 text-bold color-333333">热播预告</view>
								</view>
								<view class="fs-20 color-333333 text-center">即将开始</view>
							</navigator>
							<!-- 添加 -->
							<navigator hover-class="none" :url="'/pages/activityCollect/activityCollect?cat_id=' + cat_id + '&waiting=1'">
								<view class="flex align-center">
									<view class="fs-36 text-bold color-333333">更多活动</view>
									<!-- <view class="iconfont icon-jinru color-333333 fs-40"></view> -->
								</view>
								<view class="fs-20 color-333333 text-center">等你来抢</view>
							</navigator>
						</view>

						<view v-for="(item, index) in actList" :key="index" class="cida bg-white mb-24" style="border-radius: 20rpx;">
							<!-- 单品牌内容 -->
							<!-- 品牌名字 -->
							<active :item='item' :goodsList="item.goods"></active>
						</view>
					</view>
					<!-- 分类筛选 -->
				
					<view class="flex ns-wrap justify-between mt-24">
						<navigator v-for="(item, index) in goodList" :key="index" :url="'/pages/goods/goods?id=' + item.id" class="cidb goods mb-20 ">
							<view style="width: 340rpx;height: 340rpx;position: relative;">
								<image style="width: 340rpx;height: 340rpx;background: #ccc;border-radius: 20rpx;" mode="aspectFill" :src="item.cover_pic"></image>
								<view v-if="item.goods_num==0" class="nonum-tip">
									已抢光
								</view>
							</view>

							<view class="goods-msg">
								<view class="goods-msg-title">{{item.name}}</view>
								<view class="fs-28 flex justify-between align-center">
									<view class="flex align-center">
										<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
										<!-- <view class="color-8D8D8D ns-text-through ml-16">¥ {{item.original_price}}</view> -->
									</view>
									<view class="add-cart-icon color-fff fs-26 iconfont icon-gouwuche_weixuanzhong" style="width: 40rpx;height: 40rpx;line-height: 40rpx;line-height: 40rpx;"
									 @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>

								</view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
			<view class="flex-x-center ns-padding-bottom-sm fs-24 color-999999 ns-padding-top-sm" v-if="is_no_more">已经浏览完了，去看看别的</view>
		</view>
	
		<to-top :scrollStop="scrollStop" :is_top="is_top" :page="page1" :totalPage="totalPage"></to-top>

		<!-- 回到头部按钮结束 -->
		<!-- 底部导航栏开始 -->
		<tabbar></tabbar>
		<!-- 底部导航栏结束 -->

		<!-- 多规格开始 -->
		<view v-if="true">
			<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_first">
				<view class="get-card-modal-main-first pr flex-y-center" :style="'background: url(' + first_order_img + ') no-repeat center;background-size: 750rpx 772rpx;'">
					<view class="text-center" style="width: 750rpx; height: 772rpx;">
						<view class=" get-card-modal-text-first" style="margin-top: 275rpx;">
							<view>送你一次</view>
							<view>首单享会员机会</view>
						</view>
						<view class="small-tips-first text-center">首次下单可以享受会员价</view>
						<view class="btn-text-first text-center" @tap="closeModal">确定</view>
					</view>
				</view>
			</view>
			<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
			 v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + '' + (__device=='device_iphone_x'?'bottom: 175rpx':'')"
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
							<block v-if="pageType === 'PINTUAN'">
								<view style="font-size: 40rpx;" class="flex color-FF0200">
									<view class>¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view>
							</block>
							<block v-else>
								<view style class="flex ns-align-items-flex-center">
									<view class="color-FF0200" style="font-size: 40rpx;">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
									<!-- <view class="oldMoney ns-text-bold" wx:if="{{goods.price<(goods.origin_price?goods.origin_price:goods.original_price)}}">￥{{goods.origin_price?goods.origin_price:goods.original_price}}</view> -->
									<!-- <view class="ml-10 color-595959 fs-24" wx:if="{{role=='shoper'&&goods.c1>0}}">赚￥{{goods.c1}}</view> -->
									<!-- <text wx:if="{{goods.is_member_price === true}}" class='is_member_price'>会员价</text> -->
								</view>
							</block>
							<!-- <view class="fs-24 color-333333">已选：红色 ，L码：一件</view> -->
							<!-- <view style="font-size:9pt">
								库存{{goods.num}}
							</view> -->
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						
						<view style="padding: 24rpx 28rpx">
							<view class="mb-24" v-if="role=='shoper' && is_commission">
								<view class="attr-group flex align-center">
									<view class=" fs-28 color-333333 ns-text-bold" style="margin-right: 32rpx;">佣金</view>
									<view class="fs-24 color-333333 flex" v-if="goods.c1">
										<view>销售佣金</view>
										<view>¥{{goods.c1}}</view>
									</view>
									<!-- <view class="fs-24 color-333333 flex ml-24" v-if="goods.c19">
										<view>大亲(赚)</view>
										<view>¥{{goods.c19}}</view>
									</view> -->
								</view>
							</view>
							<view>
								<view class="attr-group" v-if="groupNum && !oid">
									<view class="attr-group-name">{{attr_group_num.attr_group_name}}</view>
									<view class="attr-list">
										<!--删除了 bindtap="groupCheck" -->
										<text :class="'attr-item ' + (group_checked?'':'active')">{{goods.group_num}}人团</text>
										<!-- <text class="attr-item {{item.checked?'active':''}}" wx:if="{{attr_group_num.attr_list.length>0}}" wx:for="{{attr_group_num.attr_list}}" wx:key="{{item.id}}" data-id="{{item.id}}" bindtap="attrNumClick">{{item.group_num}}人团
			                            </text> -->
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
												<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'disabled':'')"
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
							<view class="flex flex-x-center" v-if="pageType == 'cart'">
								<navigator :url="'/pages/goods/goods?id=' + goods_id + '&from=' + from" class="edit-standard-btn mr-20">查看详情</navigator>
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'private'">
								<view class="edit-standard-btn" @tap="saveEditStandard">确认</view>
							</view>
							<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal'">
								<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
							</view>
						</view>
					</scroll-view>

				</scroll-view>
			</view>
			<!-- 产品参数 -->
			<view class="attr-picker " :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter"
			 catchtouchmove="preventTouchMove" @tap="closeParameter">
				<view @tap.stop="stop" class="content-box" :style="'padding:32rpx 24rpx 0;border-radius:30rpx 30rpx 0px 0px;' + (__device=='device_iphone_x'?'bottom: 175rpx':'')">
					<view class="flex-x-center fs-38 color-333333 mb-30">产品参数</view>
					<scroll-view scroll-y="true" style="max-height: 500rpx;">
						<view v-for="(item, index) in goods.param_json" :key="index" class="parameter-list flex fs-30">
							<view class="color-999999" style="width: 246rpx;">{{item.name}}</view>
							<view class="color-333333">{{item.value}}</view>
						</view>
					</scroll-view>
					<view class="save-btn" @tap="closeParameter">确定</view>
				</view>
			</view>
		</view>
		<!-- 多规格结束 -->
	</view>
</template>

<script>
	import toTop from '../../components/toTop/toTop.vue'
	import active from '@/components/guanyiguan/active.vue'
	// import pageFooter from '@/components/common/footer.vue'
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择

	export default {
		data() {
			return {
				catalog: [],
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				filters: require('../../utils/filters.js'),
				y: uni.getSystemInfoSync().windowHeight,
				navIns: 0,
				loadingSwitch: false,
				stopLoadMore: false,
				cat_id: 0,
				page: 1,
				totalPage: 0,
				is_no_more: false,
				swiperList: [],
				actStoreList: [], //联营活动
				actList: [], //普通活动
				is_top: false,
				goodList: [],

				//多规格开始
				show_attr_picker: false,
				is_show_first: false,
				isParameter: '',
				pageType: '',
				groupNum: '',
				role: '',
				attr_group_list: [],

				//多规格结束
				goods: {},
				form: {
					number: 1
				},
				brankLikeImg: '', //添加品牌背景图
				brandLikeList: [], //滑动卡片
				hotSearchList: [],
				newActsList: [],
				catalog_old: [], // 老分类
				scrollStop: true, //是否显示页面右下角
				page1: 1,
				pic_dljl: uni.getStorageSync('_img').pic_dljl,
				hot_navs: [], //保龄球内容


			}
		},
		computed: {
			init_img() {

				return this.$store.state.init_img || {};
			}
		},
		onLoad(options) {

			this.getApp().page.onLoad(this, options)

			//  获取老分类
			this.getOldCats();

			//导航栏和轮播
			this.getGYG();

			// //联营活动
			this.getStoreActivityFilter()
			// //普通活动
			//this.getActivityFilter()

			//添加品牌背景图

			this.brankLikeImg = uni.getStorageSync('_img').guanzhu_brand;

			//获取关注品牌列表
			//this.getBrandLike()
			this.getBuyCatsList();

			this.getHotSearch();

		},
		components: {
			toTop: toTop,
			active: active,
			// pageFooter: pageFooter
		},
		onShow() {
			gSpecificationsModel.init(this);
			this.getBrandLike();
		},
		methods: {
			navTo(url,name) {
				uni.navigateTo({
					url: url
				})
				this.sendEvent(name, {
					"用户ID": uni.getStorageSync('USER_INFO').id,
					"用户昵称": uni.getStorageSync('USER_INFO').nickname,
				})
			},
			// 跳到别的小程序
			toOrder(appid, route) {
				console.log(appid, route);
				uni.navigateToMiniProgram({
					appId: appid,
					path: route,
					extraData: {
						// 传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
						mch_id: uni.getStorageSync('_mchInfo').id,
						token: uni.getStorageSync(this.getApp().const.ACCESS_TOKEN)
					},
					envVersion: 'trial',

					// 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效
					success(res) {
						// 打开成功
					},

					fail: function(res) {}
				});
			},
			getOldCats: function() {
				var self = this;
				var page = self.page;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_old_cats,
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();
							self.setData({
								catalog_old: res.data
							});

							if (self.catalog.length > 0) {
								self.cat_id = self.catalog[0].id;
								self.getActivityFilter(function() {
									// var query = wx.createSelectorQuery();
									// query.select('#g-header').boundingClientRect(function(res) {
									// 	self.setData({
									// 		headerHeigh: res.height
									// 	});
									// }).exec();
								});
							}
						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			changeNav(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				let cat_id = e.currentTarget.dataset.id;
				//console.log('cat_id',cat_id,'navIns',index)
				self.setData({
					navIns: index,
					loadingSwitch: true,
					stopLoadMore: false,
					cat_id: cat_id,
					page: 1,
					is_no_more: false
				});
				uni.pageScrollTo({
					scrollTop: 0
				});

				if (this.cat_id == 0) {
					self.getActivityFilter()
				} else {
					self.getActivityFilter()
					self.getWalkGoodsList()
				}
			},
			//获取联营活动
			getStoreActivityFilter() {
				var self = this
				uni.showLoading({
					title: '加载中',
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_active_list,
					data: {
						cat_ids: this.cat_id,
						is_home: this.cat_id == 0 ? 2 : ''
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
			//  获取关注品牌列表
			getBrandLike() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.walk_active_list,
					data: {
						is_rec: 1
					},
					success: function(res) {
						if (res.code == 0) {
							uni.hideLoading();

							for (let x in res.data.common) {
								var catsArr = res.data.common[x].cats;
								var arr = [];

								for (let i in catsArr) {
									var obj = {
										id: i,
										catsName: catsArr[i]
									};
									arr.push(obj);
								}

								res.data.common[x].cats = arr;
							}

							self.setData({
								// brandLikeName: res.data.name,
								brandLikeList: res.data.data || []
							});
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},
			//获取普通互动
			getActivityFilter(callback) {
				var self = this
				uni.showLoading({
					title: '加载中',
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_active_list,
					data: {
						cat_ids: this.cat_id,
						is_home: this.cat_id == 0 ? 1 : ''
					},
					success: (res) => {

						if (res.code == 0) {
							uni.hideLoading();
							for (let x in res.data.common) {
								var catsArr = res.data.common[x].cats
								var arr = []
								for (let i in catsArr) {
									var obj = {
										id: i,
										catsName: catsArr[i],
									}
									arr.push(obj)
								}
								res.data.common[x].cats = arr
							}
							// actList: res.data.data
							//console.log('普通数据',res)
							self.setData({
								actName: res.data.name,
								actList: res.data.data,
								totalPage: res.data.meta.totalCount || 0 // 从接口获取总页数
							})
							if (callback) {
								callback()
							}
						}
					},
					complete: function() {

						uni.stopPullDownRefresh();
					}

				})
			},
			//非首页活动
			getWalkGoodsList() {
				var self = this
				uni.showLoading({
					title: '加载中',
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list,
					data: {
						cat_ids: this.cat_id,
					},
					success: (res) => {
						if (res.code == 0) {
							self.setData({
								goodList: res.data.list,
								totalPage: res.data.meta.totalCount || 0 // 从接口获取总页数
							})
						}
					},
					complete: () => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}

				})
			},
			//获取导航栏
			getGYG() {
				var self = this
				var page = this.page
				uni.showLoading({
					title: '加载中',
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_cats,
					success: (res) => {
						// console.log('ppppppppppp', res)
						if (res.code == 0) {
							uni.hideLoading();

							this.catalog = res.data,
								this.swiperList = res.data[0] ? (res.data[0].child || []) : []
							if (this.catalog.length > 0) {
								this.cat_id = this.catalog[0].id;
								let arr1 = this.catalog.concat();
								arr1.splice(0, 1);
								this.hot_navs = arr1;

								self.getActivityFilter(function() {
									// var query = wx.createSelectorQuery()
									// query.select('#g-header').boundingClientRect(function(res) {
									// 	self.setData({
									// 		headerHeigh: res.height
									// 	})
									// }).exec();
								})
							}

						}
					},
					fail: function() {},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				})
			},
			// 上拉分页
			getMore() {

				var self = this

				var page = self.page
				var index = page
				var data = {
					cat_ids: this.cat_id,
					is_home: this.cat_id == 0 ? 1 : ''
				}
				if (this.cat_id == 0) {
					//console.log('this.cat_id==0')
					var url = this.getApp().api.default.walk_active_list
					this.getApp().core.pading(self, url, data, (res, index) => {
						//console.log('首页上拉',res)
						if (res.data.data.length == 0) {
							self.setData({
								stopLoadMore: true,
								is_no_more: true
							})
							return
						}
						//var newActList = res.data.data
						var newActList = res.data.data
						var nowActList = self.actList.concat(newActList)
						self.setData({
							actList: nowActList,
							loadingSwitch: true
						})
					})
				} else {
					//console.log('this.cat_id!!!!==0')
					var url = this.getApp().api.default.walk_goods_list
					this.getApp().core.pading(self, url, data, (res, index) => {
						if (res.data.list.length == 0) {
							self.setData({
								stopLoadMore: true,
								is_no_more: true
							})
							return
						}
						var newGoodList = res.data.list
						var nowGoodList = self.goodList.concat(newGoodList)
						self.setData({
							goodList: nowGoodList,
							loadingSwitch: true
						})
					})
				}
			},
			//去商品详情页
			toGYGDetail(e) {
				// url="/pages/guangNavDetail/guangNavDetail?cat_id={{item.id}}"
				var cat_id_detail = e.currentTarget.dataset.id
				var index = e.currentTarget.dataset.index
				var text = e.currentTarget.dataset.text
				var self = this
				var navID = self.navIns
				var catalog = self.catalog[navID]
				uni.navigateTo({
					url: "/pages/guangNavDetail/guangNavDetail?cat_id=" + cat_id_detail + "&name=" + text
				})

			},
			//打开选择规格
			// 购物车相关
			openCart(e) {
				var id = e.currentTarget.dataset.id
				var index = e.currentTarget.dataset.index
				var goods = this.goodList[index]
				this.setData({
					show_attr_picker: true,
					goods: goods,
					['form.number']: 1
				})
				this.getGoodsAttr(id)
				gSpecificationsModel.init(this);
			},
			getGoodsAttr: function(id) {
				var self = this
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: id,
						from: 4
					},
					success: function(res) {
						if (res.code == 0) {
							if (res.data.attr[0].num == 0) {
								for (var i in res.data.attr) {
									if (res.data.attr[i].num > 0) {
										res.data.attr[0].total_num = true
										break;
									}

								}
							}
							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
							});
							if (res.data.attr != null && res.data.attr_group_list != null) {
								self.selectDefaultAttr(res.data);
							}

						}

					}
				})
			},
			// 删除关注品牌
			delBrandLike(e) {
				var id = e.currentTarget.dataset.id;
				uni.showModal({
					content: '关闭展示后之后可到品牌关注中恢复显示',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							this.getApp().request({
								url: this.getApp().api.default.close_activity,
								method: 'POST',
								data: {
									activity_id: id
								},
								success: res => {
									if (res.code == 0) {
										this.getBrandLike();
									}
								}
							});
						}
					}
				});
			},
			//加入购物车
			addCart: function() {
				var self = this
				var token = uni.getStorageSync('ACCESS_TOKEN')
				if (!token) {
					self.setData({
						showGetLogin: true
					})
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
				}
				this.submit('ADD_CART');
			},
			submit: function(type) {
				var self = this
				if (self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}
				if (type == 'ADD_CART') { //加入购物车
					uni.showLoading({
						title: "正在提交",
						mask: true,
					});
					self.getApp().request({
						url: self.getApp().api.cart.add_cart,
						method: "POST",
						data: {
							goods_id: self.goods.id,
							sku: self.goods.sku,
							num: self.form.number,
							from: 4
						},
						success: function(res) {
							uni.hideLoading();
							uni.showToast({
								title: res.msg,
								duration: 1500,
								icon: 'none'
							});
							self.setData({
								show_attr_picker: false,
							});
							self.sendEvent("加入购物车", {
								"商品名称": self.goods.name,
								"商品ID": self.goods.id,
							})


						}
					});
				}
			},
			getHotSearch() {
				// 获取热搜
				this.getApp().request({
					url: this.getApp().api.default.hot_search_nav,
					success: res => {
						if (res.code == 0 && res.data.length != 0) {
							this.setData({
								hotSearchList: res.data
							});
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});
			},
			// 获取每日推荐分类
			getBuyCatsList() {

				this.getApp().request({
					url: this.getApp().api.default.buy_cats_list,
					data: {
						showSite: 2
					},
					success: res => {
						if (res.code == 0) {
							var catsList = res.data;
							this.setData({
								newActsList: catsList
							});

							for (let i in catsList) {
								this.getBuyActsList(catsList[i].id, i, catsList[i].name);
							}
						}
					},
					complete: res => {
						uni.hideLoading();
					}
				});
			},
			getBuyActsList(id, i) {

				var newActsList = this.newActsList;
				this.getApp().request({
					url: this.getApp().api.default.buy_acts_list,
					data: {
						circleType: id
					},
					success: res => {
						if (res.code == 0) {
							newActsList[i].list = res.data.list;
							// this.setData({
							//   newActsList: newActsList
							// });
							this.newActsList = newActsList.concat();
						}
					}
				});
			},
			to_seach() {
				uni.navigateTo({
					url: "/pages/newSearch/newSearch"
				})
			},
		},

		onPullDownRefresh(e) {

			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000)


			let cat_id = this.cat_id
			// this.getGYG()
			if (cat_id == 0) {
				this.getActivityFilter();
				this.getBrandLike();
			} else {
				this.getWalkGoodsList()
			}
			this.setData({
				page: 1,
				is_no_more: false
			})


		},
		onReachBottom() {
			this.getMore();
		},

		onPageScroll(e) {
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
				let info = uni.createSelectorQuery().select(".guanyiguan");
				info.boundingClientRect((data) => { //data - 各种参数

					height = data.height;
					let class1 = '.cidb';
					if (this.cat_id == 0) {
						class1 = '.cida'
					}
					let info2 = uni.createSelectorQuery().select(class1);
					info2.boundingClientRect((data) => { //data - 各种参数
						//console.log('data',data)
						if (data == null) {
							return;
						}
						height_b = data.height; //一个子元素的高度

						//console.log('距离底部', (height - this.y) - top)

						let cha = parseInt(((height - this.y) - top) / (height_b * 5)) > 0 ? parseInt(((height - this.y) - top) /
							(height_b * 5)) : 1;



						let page = this.page;
						if (this.is_no_more == true) {
							--page;
						}
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


		},
	}
</script>

<style>
	@import url("~@/components/goods/specifications_model.css");

	page {
		height: 100%;
		background-color: #F4F4F4;

	}

	.discounts-pic {
		width: 270rpx;
		height: 69rpx;
	}

	.material-icon {
		width: 130rpx;
		height: 50rpx;
		line-height: 48rpx;
		border: 1rpx solid rgba(255, 64, 26, .5);
		border-radius: 25rpx;
		color: #FF401A;
	}

	.guanyiguan {
		/* background-color: red; */
		/* touch-action: none */
	}

	.page {
		/* min-height: 100%; */
	}

	.gg-nav {
		height: 300rpx;
		width: 100%;
		color: #fff;
	}

	.con {
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		padding: 0 24rpx;
	}

	.header-title {
		position: absolute;
		width: 100%;
		left: 0rpx;
		bottom: 0rpx;
		background: #fff;
		border-radius: 30rpx 30rpx 0 0;
		padding: 23rpx 0 19rpx;

	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.cu-custom-gg {
		/* background: linear-gradient(0deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1)); */
		width: 140%;
		height: 418rpx;
		padding-left: 60rpx;
		padding-right: 60rpx;
		border-radius: 0 0 40% 40%;
		margin-left: -20%;
		position: relative;
		z-index: -1;
	}


	#g-header {
		/* background: linear-gradient(0deg, #F4F4F4, #FFBF22); */
		z-index: 10;
	}




	.guang-nav-list {
		width: 100%;
		overflow: hidden;
		color: #fff;

	}

	.classify-zhezhao {
		position: fixed;
		top: 83rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.35);
		z-index: 100;
	}

	.classify {

		width: 100%;
		padding: 14rpx 25rpx;
		padding-right: 5rpx;
		background: #fff;
	}

	.classify-btn {
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 8rpx;
		background-color: #F1F1F1;
		font-size: 28rpx;
		color: #595959;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}

	.classify-btn-active {
		color: #fff;
		background-color: #F49E3A;
	}


	/* .nav {
		padding: 0rpx 20rpx;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 20rpx;
		color: #FF9C02;
		opacity: 0.5;
		border-radius: 18rpx;
		background: #FFFFFF;
		margin-right: 14rpx;
	} */
	.nav {
		padding: 18rpx 12rpx;
		font-size: 24rpx;
		color: #333333;
		opacity: 0.7;
	}


	.active {
		font-size: 30rpx;
		color: #F23005;
		opacity: 1;
		font-weight: bold;
	}

	.swiper-box {
		padding: 0 24rpx;
		width: 100%;
		height: 260rpx !important;
	}

	.tuijian-box {
		padding: 0 24rpx;
		width: 100%;
		height: 328rpx;
		margin-top: 32rpx;
	}

	.tuijian-box-main {
		width: 702rpx;
		height: 328rpx;
		padding: 0 24rpx;
		padding-top: 100rpx;
		border-radius: 20rpx;
	}

	.tuijian-goods {
		width: 208rpx;
		height: 208rpx;
		border-radius: 20rpx;
		background-color: #fff;
		overflow: hidden;
		position: relative;
	}

	.tuijian-goods-msg {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 80rpx;
		padding: 13rpx;
		text-align: center;
		background: linear-gradient(-90deg, rgba(255, 55, 80, 1), rgba(255, 112, 6, 1));
		opacity: 0.9;
	}

	.guang-nav-list-er {
		padding: 32rpx 16rpx 0;
		background: #fff;
		border-radius: 20rpx;
	}

	.nav-er {
		width: 20%;
		margin-bottom: 24rpx;
	}

	.goods {
		width: 340rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.goods-list {
		padding: 0 25rpx;
	}

	.today-recommend {
		padding: 18rpx 25rpx;
		background: #fff;
		border-radius: 8rpx;
	}

	.today-price-box {
		width: 80rpx;
		padding: 2rpx 0;
		background: #252E3E;
		border-radius: 15rpx;
		text-align: center;
		font-size: 20rpx;
		color: #fff;
		margin-right: 15rpx;

	}

	.big-nav {
		padding: 0 50rpx;
	}

	.big-nav-box {
		padding: 27rpx 40rpx 20rpx;
	}

	.big-nav-detail {
		width: 100rpx;
		padding: 2rpx 0;
		font-size: 20rpx;
		color: #8D8D8D;
		text-align: center;
		margin: 5rpx auto 0;
	}

	.big-nav-detail-active {
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		color: #fff;
		border-radius: 15rpx;
	}

	.sell-up {
		width: 113rpx;
		height: 113rpx;
		border-radius: 50%;
		background: rgba(38, 38, 38, 0.45);
		position: absolute;
		left: 44rpx;
		top: 43rpx;
		padding: 24rpx 0;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
	}

	.line {
		width: 67rpx;
		height: 2rpx;
		background: #fff;
		margin: 4rpx auto;
	}

	.text-more-1 {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.toFixed {
		position: fixed;
		width: 100%;
		background: #fff;
		top: 32px;
		left: 0;
		z-index: 99;
		margin-bottom: 65px;
	}

	.activity-name {
		width: 148rpx;
		height: 74rpx;
		left: 26rpx;
		bottom: 4rpx;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 8rpx;
		padding-top: 2rpx;
	}

	.two-scroll {
		width: 100%;
		background-color: #F4F4F4;
		padding: 24rpx;
	}

	.goods-msg {
		padding: 18rpx 10rpx;
		margin-top: -4rpx;
	}

	.goods-msg-title {
		font-size: 28rpx;
		color: #333333;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.add-cart-icon {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.add-cart-btn {
		height: 50rpx;
		background: rgba(255, 52, 59, 1);
		border-radius: 25rpx;
		padding: 10rpx 0;
	}

	.goods-box {
		background-color: #fff;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.goods-box-group {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 16rpx;
		overflow: hidden;
	}

	.goods-img-group {
		width: 248rpx;
		height: 248rpx;
	}

	.goods-img {
		width: 100%;
		height: 320rpx;
	}

	.goods-desc {
		background: rgba(254, 248, 225, 1);
		border-radius: 6rpx;
		padding: 5rpx 15rpx;
	}

	.tips {
		position: absolute;
		top: 0rpx;
		left: 23rpx;
		width: 140rpx;
		height: 50rpx;
		background: linear-gradient(315deg, rgba(48, 35, 174, 1) 0%, rgba(57, 39, 176, 1) 12%, rgba(57, 39, 176, 1) 33%, rgba(200, 109, 215, 1) 100%);
		border-radius: 0px 0px 16rpx 16rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 24rpx;
		color: #fff;

		font-weight: bold;
	}

	.tab-tips {
		width: 10rpx;
		height: 34rpx;
		/* background: linear-gradient(0deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1)); */
		background-color: #F23005;
		border-radius: 5rpx;
	}

	.tab-title {
		margin-left: 13rpx;
		font-size: 38rpx;
		font-family: YouSheBiaoTiHei;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.gyg-act-img {
		margin: 24rpx auto;
		border-radius: 20rpx;
	}

	.cat-activity {
		padding: 0rpx 56rpx;
	}

	.cat-activity-label {
		width: 142rpx;
		height: 34rpx;
		line-height: 34rpx;
		text-align: center;
		background: rgba(255, 64, 26, 1);
		border-radius: 17rpx;
		margin-top: 8rpx;
	}

	.muSwiper {
		/* height: 260rpx!important; */
		height: 260rpx !important;

	}

	.after-navber {
		position: relative;
		/* overflow-y: hidden; */
	}

	.myhu {
		position: absolute;
		top: -20rpx;
		left: 0;
		width: 750rpx;
		height: 140rpx;
		background-color: #FF9E02;
		z-index: 0;
		/* border-radius: 0 0 190rpx 190rpx /0 0 30rpx 30rpx; */
		border-radius: 0 0 250rpx 250rpx /0 0 40rpx 40rpx;
	}

	.to-top-btn {
		position: fixed;
		bottom: 200rpx;
		right: 40rpx;
		border-radius: 50%;
		width: 70rpx;
		height: 70rpx;
		background: rgba(61, 61, 61, 0.5);
		z-index: 10;
		padding: 6rpx 0;

	}

	.brandheader {
		width: 90rpx;
		height: 90rpx;
		display: block;
	}

	.aaaa {
		background-color: red;
	}

	/* 新保龄球路口开始 */
	.hot_list {
		width: 100%;
		/* margin-top: 30rpx; */
		padding: 0 30rpx;
		display: flex;
		flex-flow: row wrap;
		white-space: nowrap;
	}

	.hot_list .hot_item {
		width: 25%;
		/* padding: 0 30rpx; */
		/* width: 90rpx; */
		/* margin-left: 48rpx; */
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		color: #333333;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}

	/* .hot_list .hot_item:first-of-type {
		margin-left: 42rpx;
	}

	.hot_list .hot_item:last-of-type {
		box-sizing: content-box;
		padding-right: 42rpx;
		/* background-color: red; 
	} */

	.hot_item image {
		width: 90rpx;
		height: 90rpx;
		/* background-color: rgba(0, 0, 0, 0.1); */
		font-size: 0rpx;
		transform: scale(1.2);
		margin-top: 3rpx;
	}

	.hot_item text {
		margin-top: 10rpx;
		white-space: nowrap;
	}

	/* 新保龄球路口结束 */
</style>
