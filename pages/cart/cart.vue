<template>
	<view class="cart">
		<common></common>
		<!-- 公共结束 -->
		<!-- 购物车开始000000000000000000000000000000000000 -->
		<!-- 结算条开始 -->
		<view class="bottom-bar" :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-show="(show_cart)">
			<view class="flex-row align-center justify-between" style="height: 100rpx;border-top: 1rpx solid #e3e3e3;">
				<view class="flex align-end">
					<view @tap="cartCheckAll" class="flex-grow-0 flex-y-center" style="margin-right: 20rpx">
						<!-- <view class="cart-checkbox {{cart_check_all?'active':''}}" style="margin-right: 10rpx"></view> -->
						<view :class="'iconfont ' + (cart_check_all?'icon-xuanzhong color-F23005':'icon-weixuanzhong') + ' mr-10'"></view>
						<text class="fs-24 " style="white-space: nowrap">全选</text>
					</view>
					<view class="flex-grow-1 align-end" style="white-space: nowrap">
						<text class="color-595959 fs-28 color-333333">总计:</text><text class="color-F76436 ns-text-bold color-FF0200">￥<text
							 class="fs-36">{{filters.priceStr(total_price)[0]}}.</text><text class="ns-text-bold color-FF0200">{{filters.priceStr(total_price)[1]}}</text></text>
					</view>
				</view>
				<view class="flex">
					<block v-if="show_cart_edit">
						<view class="flex-y-center flex-grow-0 flex-x-center edit-btn" @tap="cartDone">完成</view>
						<view style="background:linear-gradient(90deg,rgba(255,64,26,1),rgba(255,85,26,1));color:#fff" class="ml-16 flex-y-center flex-grow-0 flex-x-center submit-btn"
						 @tap="cartDelete">删除</view>
					</block>
					<block v-else>
						<view class="flex-y-center flex-grow-0 flex-x-center edit-btn" @tap="cartEdit">编辑</view>
						<view :class="'flex-y-center flex-grow-0 flex-x-center submit-btn ml-16 ' + (submitState?'carActive':'carActiveBold')"
						 @tap="gotoUnlock">结算</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 结算条结束 -->

		<!-- 可能喜欢列表开始 -->
		<view v-if="(!show_cart) && !mch_list.length && !loading">
			<view class="empty flex-x-center flex-y-center">
				<view class="text-center">
					<view class="empty-img-box">
						<image class="empty-img-box" :src="cart_empty_img"></image>
					</view>
					<view class="fs-30 color-999999">购物车空空的</view>
					<navigator url="/pages/index/index" open-type="redirect" class="to-home">去首页</navigator>
				</view>
			</view>
			<view class="like">
				<view class="like-title">- 你可能喜欢 -</view>
				<view class="goods-list clear">
					<navigator v-for="(item, index) in like_list" :key="index" :url="'../goods/goods?id=' + item.id" hover-class="navigator-hover">
						<view class="list-box">
							<view class="pr">
								<image :src="item.cover_pic"></image>
								<!--<view class="pa shopTab" wx:if="{{filters.parseInt(item.price)!==filters.parseInt(item.original_price)}}">{{filters.toFix((item.price/item.original_price)*10,1)}}折</view> -->
							</view>
							<view class="list-msg">
								<view class="box-des">{{item.name}}</view>
								<view class="box-price flex justify-between align-center">
									<view>
										<text class="fs-20 color-FF0200 ns-text-bold">¥ <text class="fs-30">{{filters.priceStr(item.price)[0]}}.</text>{{filters.priceStr(item.price)[1]}}</text>
										<text class="ns-text-through fs-20 color-999999 ml-16">¥ {{filters.toFix1(item.original_price)}}</text>
									</view>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 可能喜欢结束 -->

		<!-- 购物车列表开始111111111111111111111111-->
		<block v-else>
			<block v-if="(show_cart)">
				<navigator :url="couponStatus==1?'/pages/activity/activity?aid=' + coupon_id:''" class="discounts-box pf flex align-center justify-between" style="background: #FFFBE0;" v-if="couponStatus != 2">
					<view class="flex align-center">
						<view class="discounts-pic">
							<image style="width: 100%;height: 100%;" :src="logo_gift" mode="aspectFit"></image>
						</view>
						<view class="fs-24">{{couponStatus == 1?'哎呀～错失隐藏红包，去加点商品试试看吧～':'恭喜你，即将开启隐藏红包，快去下单领取吧～'}}</view>
					</view>
					<view class="iconfont icon-jinru " v-if="couponStatus==1"></view>
				</navigator>
				<!-- 占位 -->
				<view v-if="couponStatus != 2" class="discounts-box"></view>
				<view class="cart-list" style="overflow: hidden;">
					<view v-for="(value, key) in cart_list" :key="key" class="bg-white" style="border-radius: 20rpx;">
						<block v-if="key == 13 && value.list.length > 0">
							<view class="flex align-center justify-between pr-24">
								<view class="flex align-center">
									<view :data-index="index" :data-id="item.cart_id" :data-key="key" data-type="self" data-mch-index="0" @tap="cartCheck13"
									 class="flex-grow-0 flex-y-center" style="padding: 24rpx">
										<view :class="'iconfont fs-40 ' + (is_sel_13==1?'icon-xuanzhong color-F23005':'icon-weixuanzhong')"></view>
									</view>
									<view class="fs-30 color-333333 ns-text-bold">{{value.desc.supplier}}</view>
								</view>
								<view class="flex align-center">
									<navigator url="/member/vipFirst/vipFirst?type=1" class="fs-24 color-333333 ns-text-bold" v-if="value.desc.status == 2">{{value.desc.text}}</navigator>
									<view v-else class="fs-24 color-333333 ns-text-bold mr-20 color-FF0200">{{value.desc.text}}</view>
									<navigator url="/pages2/addMenu/addMenu" class="fs-24 color-333333 flex align-center" v-if="value.desc.status == 1">
										<text>去凑单</text>
										<text class="iconfont icon-jinru"></text>
									</navigator>
								</view>
							</view>
						</block>
						<blcok v-if="key != 13 && value.list.length > 0">
							<view class="flex align-center justify-between pr-24">
								<view class="flex align-center">
									<view :data-index="index" :data-id="item.cart_id" :data-key="key" data-type="self" data-mch-index="0" @tap="cartCheck16"
									 class="flex-grow-0 flex-y-center" style="padding: 24rpx">
										<view :class="'iconfont fs-40 ' + (is_sel_16==1?'icon-xuanzhong color-F23005':'icon-weixuanzhong')"></view>
									</view>
									<view class="fs-30 color-333333 ns-text-bold">{{value.desc.supplier}}</view>
								</view>
								<view class="free-mail" v-if="value.desc.text">{{value.desc.text}}</view>
							</view>
						</blcok>
						<view class="flex cart-goods-box" v-for="(item, index) in value.list" :key="index" :style="stopStyle">
							<view class="cart-item flex-row ns-flex-shrink-no" :style="'width: 750rpx;' + item.Style" @touchstart="touchS"
							 @touchmove="touchM" @touchend="touchE" :data-index="index" :data-key="key">
								<view v-if="!item.disabled || show_cart_edit" :data-index="index" :data-id="item.cart_id" :data-key="key"
								 data-type="self" data-mch-index="0" @tap="cartCheck" class="flex-grow-0 flex-y-center" style="padding: 24rpx">
									<view :class="'iconfont fs-40 ' + (item.is_sel==1?'icon-xuanzhong color-F23005':'icon-weixuanzhong')"></view>
								</view>
								<!-- 失效 -->
								<view v-else class="flex-grow-0 flex-y-center" style="padding: 24rpx">
									<view style="width: 40rpx">
										<view class="iconfont icon-shixinyuanxing" style="color: #F4F4F4;font-size: 42rpx;"></view>
									</view>
								</view>


								<view class="flex-grow-1" style="padding-right: 24rpx;">

									<view class="flex-grow-1 flex-row">
										<view class="flex-grow-0">
											<navigator class="pr goods-pic mr-24" :url="'/pages/goods/goods?id=' + item.goods_id + '&from=' + item.from">
												<image style="width: 100%;height: 100%;border-radius: 14rpx;" mode="aspectFill" :src="item.goods_pic"></image>
											</navigator>
										</view>
										<view class="ns-column justify-between pr" style="padding-bottom: 10rpx;width: 374rpx;">
											<view class="flex-grow-1">
												<view class="goods-name mb-24" :style="item.is_stock==0?'':'margin-bottom: 125rpx;'">
													<navigator :url="'/pages/goods/goods?id=' + item.goods_id + '&from=' + item.from" class="fs-30 color-333333">{{item.goods_name}}</navigator>
												</view>
												<!-- <view class="attr-list" bindtap="openEditStandard" data-id="{{item.goods_id}}"> -->
												<view v-if="item.is_stock==0" class="attr-list flex" style="margin-bottom: 61rpx;" :data-disabled="item.disabled"
												 :data-key="key" :data-id="item.goods_id" :data-num="item.num" :data-status="item.gstatus" :data-index="index"
												 :data-from="item.from" @tap="showAttrPicker">
													<!-- 规格 -->
													<view class="attr-item-box ns-text-limit">
														<view class="attr-item" v-for="(attr, id) in item.attr_list" :key="id" :data-id="item.goods_id" :data-num="item.num"
														 :data-index="index">
															<!-- <view class="attr-item" wx:for="{{item.attr_list}}" wx:for-item="attr" wx:key="id"> -->{{attr.attr_group_name}}:{{attr.attr_name}}</view>
													</view>
													<view class="iconfont icon-xiangxia fs-24"></view>
												</view>
											</view>
											<view class="vip-price flex align-center ns-text-bold" v-if="item.m_price && item.m_price > 0">
												<view class="fs-24" style="color: #F0D0A5;">会员价:</view>
												<view class="fs-26 color-fff">{{item.m_price}}</view>
											</view>
											<view>
												<block v-if="item.max_num>0 && item.start_buy!=0">
													<view class="flex justify-between">
														<view class="flex">
															<view class="flex price flex">
																<view class="fs-24" style="color: #FF0200;margin-top: 14rpx;margin-right: 10rpx;">¥</view>
																<view style="font-size: 37rpx;color: #FF0200;">{{item.unitPrice}}</view>
															</view>
															<!-- <view class="flex" style="margin-top: 14rpx;">
																<view class="ns-text-through fs-24 color-BDBDBD" style="margin-left: 8rpx;">¥ {{item.price}}</view>
															</view> -->
														</view>
														<view>
															<view class="flex">
																<view v-if="item.num>1" @tap="cartLess" :data-index="index" :data-key="key" :id="item.cart_id" class="flex-grow-0 image1 number-sub iconfont icon-jian"
																 style="margin-top: -3rpx;color:#252E3E;"></view>
																<view v-else class="image1 number-sub iconfont icon-jian color-D6D6D6" style="margin-top: -3rpx"></view>


																<view class="row-data">{{item.num}}</view>

																<view v-if="item.num>=item.max_num" class="image1 number-add iconfont icon-jia color-D6D6D6" style="margin-top: 3rpx"></view>
																<view v-else @tap="cartAdd" :data-index="index" :data-key="key" :id="item.cart_id" class="image1 number-add iconfont icon-jia"
																 style="margin-top: 3rpx;color:#252E3E;"></view>
															</view>
														</view>
													</view>
												</block>
												<block v-else>
													<block v-if="item.start_buy==0">
														<view class="flex ns-align-items-flex-center ns-justify-content-space-between">
															<view class="price fs-24" style="color: #FF9100;">{{item.buy_txt}}</view>
														</view>
													</block>
													<block v-else-if="item.gstatus==1">
														<block v-if="item.is_stock==0">
															<view class="flex ns-align-items-flex-center ns-justify-content-space-between">
																<view class="price fs-24" style="color: #FF9100;">你可以考虑选择其他规格</view>
																<view class="reelect fs-24 color-2C2C2C" @tap="showAttrPicker">重选</view>
															</view>
														</block>
														<block v-else>
															<view class="flex ns-align-items-flex-center ns-justify-content-space-between">
																<view class="price fs-24" style="color: #FF9100;">抱歉，这款商品库存不足</view>
															</view>
														</block>
													</block>
													<block v-else>
														<view class="flex ns-align-items-flex-center ns-justify-content-space-between">
															<view class="price fs-24" style="color: #FF9100;">抱歉，这款商品已结束下单</view>
														</view>
													</block>

												</block>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 滑动删除 -->
							<view class="flex-y-center flex-x-center" style="width: 150rpx;background:linear-gradient(90deg,rgba(255,64,26,1),rgba(255,85,26,1));text-align: center;color: #fff;font-size: 24rpx;"
							 @tap="delGoods" :data-index="index" :data-key="key" :data-id="item.cart_id">删除</view>
						</view>
					</view>
				</view>
			</block>

			<view style="height: 109rpx"></view>
		</block>

		<!-- 购物车列表结束111111111111111111111111 -->

		<!-- 购物车结结束0000000000000000000000000000000000 -->






		<!-- 底部导航栏开始 -->
		<tabbar></tabbar>
		<!-- 底部导航栏结束 -->


		<!-- 多规格开始 -->
		<view v-if="true">
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
							<view class="fs-30 color-333333 ns-text-limit2">{{goods.name}}</view>
							<block v-if="pageType === 'PINTUAN'">
								<!-- <view style="font-size: 40rpx;" class="flex color-FF0200">
									<view class="">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view> -->
								<view class="fs-36 color-FF0100 ns-text-bold mt-20">{{goods.price}}</view>
							</block>
							<block v-else>
								<view style class="flex ns-align-items-flex-center mt-20">
									<view class="fs-36 color-FF0100 ns-text-bold">¥ {{goods.price}}</view>
									<view class="flex align-center" v-if="goods.m_price">
										<view class="iconfont icon-ziyuan101 fs-20 vip-icon" style="color: #F5DBAA;"></view>
										<view class="fs-36 color-333333 ns-text-bold">¥ {{goods.m_price}}</view>
									</view>
									<!-- <view class="color-FF0200" style="font-size: 40rpx;">¥ <text style="font-size: 60rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view> -->
									<!-- <view class="oldMoney ns-text-bold" wx:if="{{goods.price<(goods.origin_price?goods.origin_price:goods.original_price)}}">￥{{goods.origin_price?goods.origin_price:goods.original_price}}</view> -->
									<!-- <view class="ml-10 color-595959 fs-24" wx:if="{{role=='shoper'&&goods.c1>0}}">赚￥{{goods.c1}}</view> -->
									<!-- <text wx:if="{{goods.is_member_price === true}}" class='is_member_price'>会员价</text> -->
								</view>
							</block>
						</view>
						<view class="flex-grow-0">
							<view @tap="hideAttrPicker" class="flex-x-center flex-y-center">
								<view style="width: 30rpx;height: 30rpx;font-size: 30rpx;" class="iconfont icon-guanbi2"></view>
							</view>
						</view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 650rpx;">
						<!-- <view class="commission-cart flex align-center justify-between text-center">
							<view class="flex align-end">
								<view class="fs-24 color-333333">黄金(赚)</view>
								<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ {{goods.c1}}</view>
							</view>
							<view class="flex align-end">
								<view class="fs-24 color-333333">钻石(赚)</view>
								<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ 10.00</view>
							</view>
							<view class="flex align-end">
								<view class="fs-24 color-333333">皇冠(赚)</view>
								<view class="fs-30 ns-text-bold" style="color: #FF0000;">¥ 10.00</view>
							</view>
						</view> -->
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
	import util from "../../utils/util";
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择

	export default {
		data() {
			return {
				y: uni.getSystemInfoSync().windowHeight,
				pageType: 'cart',
				total_price: 0.00,
				cart_check_all: false,
				cart_list: [],
				loading: true,
				check_all_self: false,
				show: 2,
				submitState: true,
				like_list: [],
				isOpenStandard: false,
				delBtnWidth: 82,
				page: 1,
				goods: {},
				form: {
					number: 0
				},
				goods_attr: [],
				attr_group_list: '',
				showGetLogin: false,
				startX: "",
				index: "",
				list: [],
				stopStyle: "",
				show_cart_edit: false,
				stopLoadMore: false,
				show_no_data_tip: false,
				count: "",
				cart_empty_img: "",
				editIndex: "",
				goods_id: "",
				from: "",
				filters: require('../../utils/filters.js'),
				mch_list: [],
				show_cart: false,
				//多规格开始
				show_attr_picker: false,
				is_show_first: false,
				isParameter: '',
				groupNum: '',
				role: '',
				coupon_id: '',  // 	购物车列表请求时， status =1 还没满足满减金额时，返回给你的距离满足满减的最近一场活动的活动id
				couponStatus: 2,   // 0有满足满减金额 1还没满足满减金额 2没有满减活动
				logo_gift: uni.getStorageSync('_img').logo_gift
			};
		},

		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			uni.hideShareMenu();
			this.sendEvent("进入购物车", {
				"用户ID": uni.getStorageSync('USER_INFO').id,
				"用户昵称": uni.getStorageSync('USER_INFO').nickname,
			})
			// this.getCartList();
			// gSpecificationsModel.init(this);
		},

		onPullDownRefresh() {
			this.getCartList();
			var self = this;
			self.setData({
				show_cart_edit: false,
				check_all_self: false,
				stopLoadMore: false,
				page: 1
			});
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.checkCoupon()
			this.getApp().page.onShow(this);
			gSpecificationsModel.init(this);
			var self = this;
			this.getCartList();
			self.setData({
				cart_check_all: false,
				show_cart_edit: false,
				check_all_self: false
			});
		},
		methods: {
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
			},

			getGoodsAttr: function(id) {
				var self = this;
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
			openEditStandard: function(e) {
				var goods_id = e;
				this.setData({
					isOpenStandard: true
				});
			},
			// 获取商品信息
			getGoodsMsg: function(goods_id) {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods,
					data: {
						id: goods_id
					}
				});
			},
			//手指刚放到屏幕触发
			touchS: function(e) {
				//判断是否只有一个触摸点
				// console.log(e.touches[0].clientX)
				var self = this;
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;
				if (e.touches.length == 1) {
					this.setData({
						//记录触摸起始位置的X坐标
						startX: e.touches[0].clientX
					});
					self.cart_list[key].list[index].Style = ''; //获取手指触摸的是哪一项
					this.list[key].list[index].Style = self.cart_list[key].list[index].Style
					self.setData({
						['cart_list[' + key + '].cart_list[' + index + '].Style']: self.cart_list[key].list[index].Style,
						index: index
					});
				}
			},
			//触摸时触发，手指在屏幕上每移动一次，触发一次
			touchM: function(e) {
				var that = this;
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;
				if (e.touches.length == 1) {
					//记录触摸点位置的X坐标
					var moveX = e.touches[0].clientX; //计算手指起始点的X坐标与当前触摸点的X坐标的差值

					var disX = that.startX - moveX; //delBtnWidth 为右侧按钮区域的宽度

					var delBtnWidth = that.delBtnWidth;
					var txtStyle = "";

					if (disX == 0 || disX < 0) {
						//如果移动距离小于等于0，文本层位置不变
						txtStyle = "margin-left:0px";
					} else if (disX > 0) {
						//移动距离大于0，文本层left值等于手指移动距离
						txtStyle = "margin-left:-" + disX + "px";

						if (disX >= delBtnWidth) {
							//控制手指移动距离最大值为删除按钮的宽度
							txtStyle = "margin-left:-" + 150 + "rpx";
						}
						that.cart_list[key].list[index].Style = txtStyle; //获取手指触摸的是哪一项

						that.setData({
							cart_list: JSON.parse(JSON.stringify(that.cart_list)),
							index: index,
							stopStyle: 'overflow：hidden;'
						});
					}
				}

				;
			},
			touchE: function(e) {
				var that = this;
				that.clearDelete();
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;

				if (e.changedTouches.length == 1) {
					//手指移动结束后触摸点位置的X坐标
					var endX = e.changedTouches[0].clientX; //触摸开始与结束，手指移动的距离

					var disX = that.startX - endX;
					var delBtnWidth = that.delBtnWidth; //如果距离小于删除按钮的1/2，不显示删除按钮

					var sty = disX > delBtnWidth / 2 ? "margin-left:-" + 150 + "rpx" : "left:0px";
					that.list[key].list[index].Style = sty; //获取手指触摸的是哪一项
					// that.list[key].list[index].Style = sty
					that.setData({
						cart_list: this.list,
						index: index
					});
				}
			},
			clearDelete: function() {
				//移动其他商品时，当前商品删除none
				// for (var i = 0; i < this.data.list.length; i++) {
				// 	this.data.list[i].Style = "left:0px";
				// 	this.data.list[i].txtStyle = "display:none";
				// }
				for (let i in this.list) {
					for (let j in this.list[i].list) {
						this.list[i].list[j].Style = "left:0px";
						this.list[i].list[j].txtStyle = "display:none";
					}
				}

				this.setData({
					cart_list: JSON.parse(JSON.stringify(this.list))
				});
			},
			// 规格确定
			saveEditStandard: function(e) {
				var self = this;
				var cart_list = self.cart_list;
				var index = self.editIndex;
				var key = self.editKey;
				cart_list[key].list[index].num = parseInt(self.form.number);
				cart_list[key].list[index].max_num = parseInt(self.goods.num);
				cart_list[key].list[index].attr_list = self.goods.attr_list;
				cart_list[key].list[index].sku = self.goods.sku;
				cart_list[key].list[index].price = self.goods.price * self.form.number;
				cart_list[key].list[index].unitPrice = self.goods.price;
				cart_list[key].list[index].m_price = self.goods.m_price
				self.setData({
					cart_list: cart_list // ['cart_list[' + index + '].max_num']: parseInt(max_num),
					// ['cart_list[' + index + '].attr_list']: attr_list,
					// ['cart_list[' + index + '].sku']: sku,
					// ['cart_list[' + index + '].price']: price,
					// ['cart_list[' + index + '].unitPrice']: unitPrice

				});
				self.oneSaveCart(index, key);
				self.hideAttrPicker();
			},
			getCartList: function() {
				var self = this;
				uni.showNavigationBarLoading();
				self.setData({
					show_no_data_tip: false,
					loading: true,
					submitState: true,
					page: 1,
					stopLoadMore: false
				});
				this.getApp().request({
					url: this.getApp().api.cart.list,
					data: {
						address_id: this.getApp().core.getStorageSync(this.getApp().const.PICKER_ADDRESS).id || ''
					},
					success: function(res) {
						if (res.code == 0) {
							let total_price = 0;
							let list = res.data.list;

							for (let i in res.data.list) {
								// console.log(res.data.list[i]);

								if (res.data.list[i].list.length > 0) {
									var show_cart = true;
									break
								} else {
									var show_cart = false;
								}

								for (let j in res.data.list[i].list) {
									if (res.data.list[i].list[j].is_sel == 1) {
										total_price = total_price + res.data.list[i].list[j].unitPrice * res.data.list[i].list[j].num;
									}
								}
							} // 判断各供应商 初始选择状态


							for (let i in res.data.list) {
								var is_sel_2;

								for (let j in res.data.list[i].list) {
									// 判断各供应商 初始选择状态
									if (i == 2 && !res.data.list[i].list[j].disabled) {
										if (res.data.list[i].list[j].is_sel == 2) {
											is_sel_2 = 2;
											break;
										} else {
											is_sel_2 = 1;
										}
									}
								}
							}

							for (let i in res.data.list) {
								var is_sel_13;

								for (let j in res.data.list[i].list) {
									// 判断各供应商 初始选择状态
									if (i == 13 && !res.data.list[i].list[j].disabled) {
										if (res.data.list[i].list[j].is_sel == 2) {
											is_sel_13 = 2;
											break;
										} else {
											is_sel_13 = 1;
										}
									}
								}
							}

							for (let i in res.data.list) {
								var is_sel_16;

								for (let j in res.data.list[i].list) {
									// 判断各供应商 初始选择状态
									if (i == 16 && !res.data.list[i].list[j].disabled) {
										if (res.data.list[i].list[j].is_sel == 2) {
											is_sel_16 = 2;
											break;
										} else {
											is_sel_16 = 1;
										}
									}
								}
							}

							let cart_list = res.data.list;
							let sku_list = [];

							for (let x in cart_list) {
								for (let y in cart_list[x].list) {
									if (cart_list[x].list[y].sku_list.length > 0) {
										for (let z in cart_list[x].list[y].sku_list) {
											if (cart_list[x].list[y].sku_list[z].num > 0) {
												cart_list[x].list[y].is_stock = 0;
												break;
											}
										}
									}
								}
							}
							self.setData({
								list: list,
								cart_list: cart_list,
								total_price: total_price.toFixed(2),
								show_cart_edit: false,
								total_price: res.data.all_price,
								count: res.data.row_count,
								show_cart: show_cart,
								is_sel_2: is_sel_2,
								is_sel_13: is_sel_13,
								is_sel_16: is_sel_16
							});
							// let listarr = self.data.cart_list
							// let num = 0
							// for (let i in self.data.cart_list) {
							// 	if (self.data.cart_list[i].is_sel == 1) {
							// 		num++;
							// 	}
							// }
							// if (num==listarr.length) {
							// 	var cart_check_all = true
							// } else {
							// 	var cart_check_all = false
							// }
							// self.setData({
							// 	cart_check_all: cart_check_all,
							// })
						} // self.setData({
						// 	show_no_data_tip: (self.data.cart_list.length == 0),
						// });

					},
					complete: function() {
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						self.setData({
							loading: false
						});
					}
				}); // TODO

				if (self.cart_list.length == 0) {
					// 猜你喜欢
					this.getApp().request({
						url: this.getApp().api.default.walk_goods_rec,
						data: {
							position: 2
						},
						success: function(res) {
							if (res.code == 0) {
								self.setData({
									like_list: res.data.list,
									cart_empty_img: uni.getStorageSync('_img').cart_empty
								});
							}
						}
					});
				}
			},
			showAttrPicker: function(e) {
				var self = this;
				var token = uni.getStorageSync('ACCESS_TOKEN')
				if (!token) {
					this.$store.commit({
						name: 'show_loginTpl',
						value: true
					})
					return
				}



				var id = e.currentTarget.dataset.id;
				var goods_id = self.goods_id || 0;
				var num = e.currentTarget.dataset.num;
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;
				var status = e.currentTarget.dataset.status;
				var disabled = e.currentTarget.dataset.disabled;
				var from = e.currentTarget.dataset.from;

				if (disabled == true && status == 0) {
					uni.showToast({
						title: '抱歉，该商品库存不足或已下架',
						icon: 'none',
						duration: 2000
					});
					return false;
				}

				if (status == 0) {
					uni.showToast({
						title: '该商品已下架',
						duration: 2500,
						icon: 'none'
					});
					return;
				}

				//判断如果id相同就不加载数据了，直接打开多规格选择弹窗
				if ((id == this.goods_id) && this.goods_attr.length > 0) {

					this.show_attr_picker = true;
					return;
				}

				self.setData({
					['form.number']: num,
					editIndex: index,
					editKey: key,
					goods_id: id,
					from: from
				});

				self.setData({
					show_attr_picker: true
				});
				if (goods_id != id) {
					self.getGoodsAttr(id);
				}
			},
			//购物车减少
			cartLess: function(e) {
				var self = this;
				var cart_list = self.cart_list;
				var index = e.currentTarget.dataset.index
				var key = e.currentTarget.dataset.key;

				if (e.currentTarget.id == cart_list[key].list[index]['cart_id']) {
					cart_list[key].list[index].num = self.cart_list[key].list[index]['num'] - 1;
					cart_list[key].list[index].price = self.cart_list[key].list[index]['unitPrice'] * cart_list[key].list[index][
						'num'
					];
					self.setData({
						cart_list: cart_list
					});
				}

				self.oneSaveCart(index, key);
				self.updateTotalPrice();
			},
			//购物车添加
			cartAdd: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;
				var cart_list = self.cart_list;

				if (e.currentTarget.id == cart_list[key].list[index]['cart_id']) {
					cart_list[key].list[index].num = self.cart_list[key].list[index]['num'] + 1;
					cart_list[key].list[index].price = self.cart_list[key].list[index]['unitPrice'] * cart_list[key].list[index][
						'num'
					];
					self.setData({
						cart_list: cart_list
					});
				}

				self.oneSaveCart(index, key);
			},
			cartCheck: function(e) {
				var self = this;
				var cart_list = self.cart_list;
				var index = e.currentTarget.dataset.index;
				var key = e.currentTarget.dataset.key;
				var cart_id = e.currentTarget.dataset.id;
				var type = e.currentTarget.dataset.type;
				var mch_index = e.currentTarget.dataset.mchIndex;
				var isAll = true;
				self.setData({
					submitState: false
				});
				cart_list[key].list[index].is_sel = cart_list[key].list[index].is_sel == 1 ? 2 : 1;
				self.setData({
					cart_list: cart_list
				});

				for (var i in self.cart_list) {
					for (var j in self.cart_list[i].list) {
						if (self.cart_list[i].list[j].is_sel == 2) {
							isAll = false;
						} else {
							self.setData({
								submitState: true
							});
						}
					}
				}
				for (var i in self.cart_list) {
					for (var j in self.cart_list[i].list) {
						if (i == 2 && !cart_list[i].list[j].disabled) {
							if (self.cart_list[i].list[j].is_sel == 2) {
								self.setData({
									is_sel_2: 2
								});
								break;
							} else {
								self.setData({
									is_sel_2: 1
								});
							}
						}
					}
				}

				for (var i in self.cart_list) {
					for (var j in self.cart_list[i].list) {
						if (i == 13 && !cart_list[i].list[j].disabled) {
							if (self.cart_list[i].list[j].is_sel == 2) {
								self.setData({
									is_sel_13: 2
								});
								break;
							} else {
								self.setData({
									is_sel_13: 1
								});
							}
						}
					}
				}

				for (var i in self.cart_list) {
					for (var j in self.cart_list[i].list) {
						if (i == 16 && !cart_list[i].list[j].disabled) {
							if (self.cart_list[i].list[j].is_sel == 2) {
								self.setData({
									is_sel_16: 2
								});
								break;
							} else {
								self.setData({
									is_sel_16: 1
								});
							}
						}
					}
				}

				if (isAll) {
					self.setData({
						cart_check_all: true
					});
				} else {
					self.setData({
						cart_check_all: false
					});
				}

				self.oneSaveCart(index, key);
			},
			cartCheck13() {
				var self = this;
				var cart_list = self.cart_list;

				for (let i in cart_list) {
					for (let j in cart_list[i].list) {
						if (self.show_cart_edit) {
							if (i == 13) {
								if (self.is_sel_13 == 2) {
									cart_list[i].list[j].is_sel = 1
								} else {
									cart_list[i].list[j].is_sel = 2
								}
							}
						} else {
							if (i == 13 && !cart_list[i].list[j].disabled) {
								if (self.is_sel_13 == 2) {
									cart_list[i].list[j].is_sel = 1
								} else {
									cart_list[i].list[j].is_sel = 2
								}
							}
						}
					}
				}

				self.setData({
					cart_list: cart_list,
					is_sel_13: self.is_sel_13 == 2 ? 1 : 2
				}); // self.updateTotalPrice();

				var sel = self.is_sel_13 == 2 ? 1 : 2;
				self.checkAll(sel, 13);
			},

			cartCheck16() {
				var self = this;
				var cart_list = self.cart_list;

				for (let i in cart_list) {
					for (let j in cart_list[i].list) {
						if (self.show_cart_edit) {
							if (i == 16) {
								if (self.is_sel_16 == 2) {
									cart_list[i].list[j].is_sel = 1
								} else {
									cart_list[i].list[j].is_sel = 2
								}
							}
						} else {
							if (i == 16 && !cart_list[i].list[j].disabled) {
								if (self.is_sel_16 == 2) {
									cart_list[i].list[j].is_sel = 1
								} else {
									cart_list[i].list[j].is_sel = 2
								}
							}
						}
					}
				}

				self.setData({
					cart_list: cart_list,
					is_sel_16: self.is_sel_16 == 2 ? 1 : 2
				}); // self.updateTotalPrice();

				var sel = self.is_sel_16 == 2 ? 1 : 2;
				self.checkAll(sel, 16);
			},
			cartCheckAll: function() {
				var self = this;
				var cart_list = self.cart_list;
				var checked;

				if (self.cart_check_all) {
					checked = 2;
				} else {
					checked = 1;
				}

				for (var i in cart_list) {
					for (var j in cart_list[i].list) {
						if (!cart_list[i].list[j].disabled || self.show_cart_edit) {
							cart_list[i].list[j].is_sel = checked;
						}
					}
				}

				self.setData({
					cart_check_all: !self.cart_check_all,
					is_sel_16: checked,
					is_sel_2: checked,
					is_sel_13: checked,
					submitState: checked,
					cart_list: cart_list
				});
				var sel = checked == 2 ? 1 : 2;
				self.checkAll(sel);
			},
			// 全选
			checkAll(sel, key) {
				this.getApp().request({
					url: this.getApp().api.cart.cart_click,
					data: {
						supplier_id: key || '',
						is_sel: sel == 2 ? 1 : 2
					},
					success: res => {
						if (res.code == 0) {
							this.checkCoupon()
							this.setData({
								total_price: res.data
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			// 已选商品费用逻辑
			updateTotalPrice: function() {
				var self = this;
				var total_price = 0.00;
				var cart_list = self.cart_list;
				//console.log(cart_list);

				for (var i in cart_list) {
					if (cart_list[i].is_sel == 1) {
						total_price += +cart_list[i].price;
					}
				}

				// self.setData({
				// 	total_price: total_price.toFixed(2)
				// });
			},
			gotoUnlock: util.throttle(function() {
				this.cartSubmit();
			}, 3000),

			/**
			 * 提交
			 *
			 */
			cartSubmit: function() {
				var self = this;
				var cart_list = self.cart_list;
				var mch_list = self.mch_list;
				var cart_id_list = [];
				var mch_id_list = [];
				var _mch_list = [];
				var goods_list = [];

				for (var i in cart_list) {
					for (var j in cart_list[i].list)
						if (cart_list[i].list[j].is_sel == 1) {
							cart_id_list.push(cart_list[i].list[j].cart_id);
							goods_list.push({
								cart_id: cart_list[i].list[j].cart_id,
								from: cart_list[i].list[j].from
							});
						}
				}

				if (cart_id_list.length > 0) {
					_mch_list.push({
						mch_id: 0,
						goods_list: goods_list
					});
				}

				if (cart_id_list.length == 0) {
					return true;
				}

				uni.showLoading({
					title: '正在提交',
					mask: true
				});
				uni.hideLoading();
				self.saveCart(_mch_list, function() {
					uni.navigateTo({
						url: '/pages/new-order-submit/new-order-submit?mch_list=' + JSON.stringify(_mch_list)
					});
				});
			},
			cartEdit: function() {
				var self = this;
				var cart_list = self.cart_list;

				for (var i in cart_list) {
					for (var j in cart_list[i].list) {
						cart_list[i].list[j].is_sel = 2;
					}
				}

				self.setData({
					cart_list: cart_list,
					show_cart_edit: true,
					cart_check_all: false,
					is_sel_13: 2,
					is_sel_16: 2
				});
				self.updateTotalPrice();
			},
			cartDone: function() {
				var self = this;
				var cart_list = self.cart_list;

				for (var i in cart_list) {
					for (var j in cart_list[i].list) {
						cart_list[i].list[j].is_sel = 2;
					}
				}

				self.setData({
					cart_list: cart_list,
					show_cart_edit: false,
					cart_check_all: false,
					is_sel_13: 2,
					is_sel_16: 2
				});
				self.updateTotalPrice();
			},
			// 单品删除
			delGoods: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var id = e.currentTarget.dataset.id;
				var key = e.currentTarget.dataset.key;
				var cart_id_list = [];
				cart_id_list.push(id);
				uni.showModal({
					content: "确认删除该商品",
					success: function(res) {
						if (res.cancel) return true;
						uni.showLoading({
							title: "正在删除",
							mask: true
						});
						self.getApp().request({
							url: self.getApp().api.cart.delete,
							data: {
								cart_id_list: cart_id_list.toString()
							},
							success: function(res) {
								uni.hideLoading();
								uni.showToast({
									title: res.msg
								});

								if (res.code == 0) {
									var list = self.list;
									list[key].list.splice(index, 1);

									for (let i in this.list) {
										for (let j in this.list[i].list) {
											this.list[i].list[j].Style = "left:0px";
										}
									}

									self.setData({
										cart_list: list,
										list: self.list
									});
									self.getCartList();
									self.checkCoupon()
								}

								if (res.code == 1) {}
							}
						});
					}
				});
			},
			cartDelete: function() {
				var self = this;
				var cart_list = self.cart_list;
				var cart_id_list = [];

				for (var i in cart_list) {
					for (var j in cart_list[i].list) {
						if (cart_list[i].list[j].is_sel == 1) cart_id_list.push(cart_list[i].list[j].cart_id);
					}
				}

				if (cart_id_list.length == 0) {
					return true;
				}

				uni.showModal({
					title: "提示",
					content: "确认删除" + cart_id_list.length + "项内容？",
					success: function(res) {
						if (res.cancel) return true;
						uni.showLoading({
							title: "正在删除",
							mask: true
						});
						self.getApp().request({
							url: self.getApp().api.cart.delete,
							data: {
								cart_id_list: cart_id_list.toString()
							},
							success: function(res) {
								uni.hideLoading();
								uni.showToast({
									title: res.msg
								});

								if (res.code == 0) {
									//self.cartDone();
									self.getCartList();
									self.checkCoupon()

								}

								if (res.code == 1) {}
							}
						});
					}
				});
			},
			saveCart: function(list, callback) {
				var self = this;
				var cart = JSON.stringify(list);
				this.getApp().request({
					url: this.getApp().api.cart.cart_edit,
					method: 'post',
					data: {
						list: cart
					},
					success: function(res) {
						if (res.code == 0) {}
					},
					complete: function() {
						if (typeof callback == 'function') callback();
					}
				});
			},
			oneSaveCart: function(index, key) {
				var self = this;
				var obj = [{
					cart_id: self.cart_list[key].list[index].cart_id,
					sku: self.cart_list[key].list[index].sku,
					is_sel: self.cart_list[key].list[index].is_sel,
					num: self.cart_list[key].list[index].num
				}];
				var cart = JSON.stringify(obj);
				this.getApp().request({
					url: this.getApp().api.cart.cart_edit,
					method: 'post',
					data: {
						list: cart
					},
					success: function(res) {
						if (res.code == 0) {
							self.checkCoupon()
							if (key == 13) {
								var cart_list = self.cart_list;
								self.cart_list[key].desc.text = res.msg;
								self.cart_list[key].desc.status = res.data.status;
								self.setData({
									cart_list: cart_list,
									total_price: res.data.all_price
								});
							}

							self.setData({
								total_price: res.data.all_price
							});
						}
					},
					complete: function() {}
				});
			},
			checkGroup: function(e) {
				var self = this;
				var type = e.currentTarget.dataset.type;
				var index = e.currentTarget.dataset.index;

				if (type == 'self') {
					for (var i in self.cart_list) {
						self.cart_list[i].checked = !self.check_all_self;
					}

					self.setData({
						check_all_self: !self.check_all_self,
						cart_list: self.cart_list
					});
				}

				self.updateTotalPrice();
			},
			// 检测优惠券
			checkCoupon() {
				this.getApp().request({
					url: this.getApp().api.coupon.check_cart,
					data: {
					},
					success: (res) => {
						console.log(res);
						if (res.code == 0) {
							this.couponStatus = res.data.status
							if (res.data.status == 1) {
								this.coupon_id = res.data.rel_id
							}
						}
					}
				})
			},
		}
	};
</script>

<style>
	@import url("~@/components/goods/specifications_model.css");

	.cart {
		/* touch-action: none */
	}

	.carActive {
		background: #F49E3A;
	}

	.free-mail {
		width: 60rpx;
		height: 32rpx;
		line-height: 28rpx;
		border: 2rpx solid #FF401A;
		opacity: 0.6;
		border-radius: 6rpx;
		text-align: center;
		font-size: 22rpx;
		color: #FF401A;
	}

	.vip-price {
		height: 36rpx;
		line-height: 36rpx;
		padding: 0 15rpx;
		background: #1A1A1A;
		border-radius: 18px;
		position: absolute;
		top: 111rpx;
	}

	.disabled {
		background: #f6f6f6;
		color: #aaa;
	}

	.device_iphone_x {
		padding-bottom: 65rpx;
	}

	.carActiveBold {
		background: #BDBDBD;
	}

	.empty {
		height: 900rpx;

	}

	.empty-img-box {
		width: 750rpx;
		height: 360rpx;
	}

	.to-home {
		width: 219rpx;
		height: 82rpx;
		border: 2rpx solid #F23005;
		border-radius: 40rpx;
		margin: auto;
		margin-top: 47rpx;
		font-size: 30rpx;
		color: #F23005;
		line-height: 78rpx;
		text-align: center;
	}

	.like-title {
		text-align: center;
		padding: 30rpx 0;
		color: #333333;
	}

	.goods-list {
		margin: 0 12rpx;
		padding-bottom: 20rpx;
	}

	.list-box {
		width: 340rpx;
		float: left;
		margin-left: 18rpx;
		margin-bottom: 21rpx;
		background: #fff;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.list-box image {
		width: 340rpx;
		height: 340rpx;
	}

	.list-msg {
		padding: 22rpx 16rpx 16rpx;
	}

	.box-des {
		font-size: 28rpx;
		color: #333333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.box-price {
		font-size: 28rpx;
		padding-top: 8rpx;
		padding-bottom: 18rpx;
	}

	.add-cart-icon {
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #F23005;
		border-radius: 50%;
	}

	.bottom-bar {
		position: fixed;
		bottom: 110rpx;
		left: 0;
		background: #fff;
		padding: 0 24rpx;
		width: 750rpx;
		z-index: 99;
	}
	.discounts-box {
		/* position: fixed;
		top: 0;
		left: 0; */
		top: 0;
		left: 0;
		width: 750rpx;
		height: 56rpx;
		line-height: 56rpx;
		color: #FF0000;
		padding-left: 24rpx;
		padding-right: 20rpx;
		z-index: 1;
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
	.cart-list {
		padding: 24rpx;
		width: 750rpx;
	}

	.cart-goods-box {
		width: 100%;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 24rpx;
	}

	.bottom-bar .submit-btn {
		color: #fff;
		width: 180rpx;
		text-align: center;
		height: 72rpx;
		background: #F23005;
		border-radius: 36rpx;
	}

	.bottom-bar .edit-btn {
		background: #fff;
		color: #333;
		width: 180rpx;
		text-align: center;
		height: 72rpx;
		border: 1px solid rgba(97, 97, 97, .5);
		border-radius: 36rpx;
		font-size: 26rpx;
	}

	.shopTab {
		padding: 4rpx 8rpx;
		text-align: center;
		color: #fff;
		left: 16rpx;
		bottom: 16rpx;
		background: #C10000;
		font-size: 20rpx;
		border-radius: 4rpx;
	}

	.cart-checkbox {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		background-size: 100% 100%;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMDgzZTc4NS0yZWUwLTk3NDYtODQ2NC1mNDdlYTAyYzc0ZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjY3OTc5QzU2MjEzMTFFN0FDRjRERTQzREY3RkRCMEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY3OTc5QzQ2MjEzMTFFN0FDRjRERTQzREY3RkRCMEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmYyOWE3YjUtNWQzNy00YzQyLTkyMmEtNDI5MmQxOTI4ZjAwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTJjMmQwMzEtNWIxYS0xMWU3LThmZWQtOWJlNjEyYzhjM2FmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mTXtkwAAAvtJREFUeNrMmTtMU1EYx09vCgNClYADCjIJPuNATQyTipsxxgUwGo3BQaJgdDImYkLVjcEomySKD4wOxriY+Oio0TooPhmhylJfCA6tov+/+d/YNLW9rX2cL/mFpL093y/33HvO+T58oVDI5BEOWA82gSBoAUvBAn0/B96DCRABYfAUzOeayJ/j9Y3gINgFvoIH4CZ4C6bArK6rBk2gFbSDC2AhuAqGQbTQgnVgEOwEF8FWMJ7h+k/iObihz9aCfeAFGAMD4KOXqcoWneAV+KmpPJpF7l8xrt8u11gcs+t/7iC/Owc6wDY9Q4UI3rV+MAqugY2gD/zI5Q5WgVugWS9BoeSSI6Kxm5WryqugX88I38TtYMYUL2aUY045/V4EzwMf2AMSpviRUC6fcmcU7NIztxvETekirpwdWinSCnIpOQu6izytmaa7Ww6L0wme0qL7zJQvmPs6CKUuM8s0vS2m/DGoLfIMmHTvYC+4BGIWCMa0W/W6U+zoAR0x9sSInBz3VMKN/6VFgtwGv9CNgpvBPWNf3OdxjoJt4LGFgnQKOjqzvbFQkE6tFGwAHywU5Im8gYI14JuFgnSqcdfBX8bScGQasNDtz8xScBossVCQVeI0Bd+BlRYKrqCboxPEBgsF6RRxVFRvsVCQTmEKPgGLwGqL5OhSy2LNUTviCuixSLBHTvPuOsh2xF5Qb4FcvVyGk4/8UR21BywQPKF2STS1s0C51zpZl6suaVPhtCpd0cSWxGEV0OXYWQLKfcQkNZVS62JO80NwGVSUUK5COcPq12TsLPTr72iJJF05Rp+X1kdc1T0bjreLPN0B5ahWzrgXQcZ3NXUmzd8uVKEjqLGZY4dyGq+CblPngN7uO2pJ1BVAzG2xcMyTypHIdB7MFnxx2L6tVMU/BNbkuX0NaYxKjTmW7Udee9QxVfqnwSFwF3xWafhIR7appNKBh80mtVLatfHXavtaZ4rQRDdJO84xcFwFP2vqTok06mFnzOraCS36+02e/4b4LcAAUnSneJ5vIwgAAAAASUVORK5CYII=);
	}

	.cart-checkbox.active {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEBklEQVRYhe2Yf2hVZRjHP2d6d+9Ga2uym27qjmVzWWP9mKgNLm1hm5mYkfaPLQorZEH/WBtBWDGo4ZCguxlbrGER4o80JZhYCy5tJWK1hLwE5rk1RmxsunTzrrVOf5z3np177zn3x7n3ygS/fx3e93ne98N7zvO853ngllKTFHpQVTUpR58krQPWApVAOVAKLBLTY0AA8AODwBmPqv6QFJgkJQ/ok6Qi4ClgM1APOBLcbwboBU4Cxz2qOpp2QJ8k7QAagA0JQlnpNHDAo6qfpQXQJ0l3A68CjSR+YvE0A7QDXo+qXrQN6JOktUATsDVNYJE6BrR6VPVM0oAC7h2gLkNwIZ0C9kRChgCzzDzEa226AXCIPZrEnlEyBUT75jL1Ws20VewZpShAEa2NmaBwFjhZuWcXizdWmU03ir3DFAYo8lwD6YvWMJV1dlD8dgfLOw6Tt6IwctoBNAgGc0C0JJxqnjNVUXU5OWtqAXC5XUwNXzEz2yAYLAE3ZwIOCUpa2nDJMkFF4cLjNcz+85+VdRiDDiju1vpM8C3bUcftj24C4FrfEUb7/WB9cdULlnBAtIs/7d+es8DJnc2tAEyeG+DPlvcM2ddUDsECwELDRGW64QDkN18jd7W29OWDXVy9NJ6Im85iPMHy9KJB3opC8rftAmDi1BcEPjyQqKvOYgQsTR+aJrl1rx4Yo/v3MTttGRiR0lmMgItMDG3LXVOhp5VrfUcY/rI/GXedxeqqS0kLnFks936KS5aZ+nWQv7zeeIFhKSPgWFrogGU7n9ED4+pXnzP+UyBWWjGTzmIEDMTyWLyxisreo9xxf3HMlXPcubh3z6WVP9q8SZFFshgB/VbWzgInS9s+Jr/uae452Y+7psJyZfmtZlyyDMBY1z6uj0zZAdRZjICDVtbTV6YZ/+QDgoqCS5aRu09QvKU6yq7wwVLynnwO0NKK0nnUDlwYy4LQwwvaZ/y8ccyoywM/43RMkF32AC5ZJnddLVnjfv7+5aIeAGU93dxWtZ6gojD0xitMXhqxAzcDtPTAEBhOUNStvbE8f2/rYeT93fpJLnn3I+TG7Sx0ZFG8pRrnqocAuH62j5Fvz9uBA+g11tBhNYlPkl4COuOtsPTZx7jr4NdzA4HvYclqyM7X/lZqH070SjPTyx5V7bKqSY6j1a0xNXToG357Ys3cQOl6yM4HYOLw/lTgTgsGXVFVnfjt7iben40ERY+Uc+93F/ShoKLw430r+Xdq1g7cDPBiqKC3rOqEQXvc5VQYHfBzvqKEyXMDBBWF4eadduEA2s26DaZ1sSgB95JgZZfjziWnpEi7MezpGPC6sctw0xTuN2/rI6R53TyKAJ2f7Tej5nUD0wT2hrSAbylV/Q8gq3gWasfUPAAAAABJRU5ErkJggg==);
	}

	.cart-item {
		background: #fff;
		padding: 32rpx 24rpx 16rpx 0;
	}

	.cart-item .goods-pic {
		width: 200rpx;
		height: 200rpx;
		border-radius: 14rpx;
	}

	.cart-item .goods-name {
		margin-bottom: 10rpx;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.cart-item .attr-list,
	.cart-item .num {
		font-size: 9pt;
		color: #888;
	}

	.cart-item .attr-list {
		min-width: 200rpx;
		width: 320rpx;
		height: 40rpx;
		background-color: #F4F4F4;
		border-radius: 20rpx;
		padding: 0rpx 16rpx;
		line-height: 40rpx;
	}

	.attr-item-box {
		width: 380rpx;

	}

	.reelect {
		width: 86rpx;
		height: 45rpx;
		line-height: 45rpx;
		text-align: center;
		border: 1rpx solid #979797;
		border-radius: 10rpx;
	}

	.cart-item .attr-list .attr-item {

		display: inline-block;
		margin-right: 10rpx;
	}

	.cart-item .attr-list .attr-item:last-child {
		margin-right: 0;
	}

	.cart-item .price {
		color: #c10000;
	}

	.cart-item .cart-tag {
		font-size: 8pt;
		color: #c10000;
		background: #ffd3d6;
		padding: 3rpx 6rpx;
	}

	.page.show_navbar .body .bottom-bar {
		bottom: 115rpx;
	}


	.image1 {

		font-size: 48rpx;
	}

	.row-data {

		margin: 7rpx 4rpx;
		width: 60rpx;
		text-align: center;
		background: #f7f7f7;
		font-size: 11pt;
		color: #353535;
	}

	.mch-header {
		background: #fff;
		border-top: 1rpx solid #e3e3e3;
		border-bottom: 1rpx solid #e3e3e3;
	}

	/* 修改规格UI */
	.edit-standard-zhezhao {
		position: fixed;
		left: 0;
		z-index: 99999;
		width: 100%;

		background: rgba(0, 0, 0, 0.35);

	}

	.edit-standard {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 24rpx 20rpx 0 40rpx;
		height: 635rpx;
		background: #ffff;
	}

	.option-box {
		width: 86rpx;
		height: 45rpx;
		text-align: center;
		line-height: 41rpx;

		border-radius: 3rpx;
		font-size: 20rpx;
		color: #979797;
		border: 2rpx solid #979797;
	}

	.option-box-active {
		color: #fff;
		background: #252E3E;
		border: 2rpx solid #252E3E;
	}


	.edit-standard-btn-opc {
		background: #FACD9D;
	}

	.bg-white {
		background-color: #fff !important;
	}

	.type-box1 {
		margin-top: 10rpx;
		width: 130rpx;
		height: 40rpx;
		background-color: rgb(244, 158, 58);
		border-radius: 0 8rpx 8rpx 0;
	}

	.type-box2 {
		bottom: 13rpx;
		margin-top: 10rpx;
		width: 180rpx;
		height: 40rpx;
		background-color: rgb(72, 154, 25);
		border-radius: 0 8rpx 8rpx 0;
	}
</style>
