<template>
<!--pages//private/home/home.wxml-->

<view class="page pr">
	
	<block v-if="is_login">
		<view class="ns-column flex-y-center" style="padding-top: 400rpx;">
			<view class="mb-20">您尚未登录，无法体验该功能，请先登录</view>
			<button style="border:1px solid #04be01;width:500rpx;height:80rpx;line-height:80rpx;border-radius:80rpx;color:#04be01;margin-bottom:40rpx;" @tap="myLogin" class="btn new-modal-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</button>
		</view>
	</block>
	<block v-else>
		<view class="header fixed">
			<view class="tips plr-25 fs-24 color-fff" v-if="nowStatus.code == 1 && type == 2">{{nowStatus.time}}</view>
			<view style="padding-top: 20rpx;">
				<view class="cu-bar bg-white search">
					<navigator hover-class="none" url="/private/privateSearch/privateSearch" class="search-form round">
						<view class="iconfont icon-sousuo fs-30"></view>
						<view style="color: #AAAAAA;">搜索商品名称</view>
					</navigator>
				</view>
			</view>
			<view v-if="type == 1" class="padding-lr bg-white fs-24 color-636363 padding-bottom pr mt-20">
				<view class style="line-height: 40rpx;">{{showgg}}</view>
				<block v-if="is_moreAD">
					<view class="mt-20">
						<view class="mb-10">
							<scroll-view scroll-x="true">
								<view class="flex">
									<view class="ad-img" v-for="(item, index) in ad_img" :key="index">
										<image class="ad-img" mode="aspectFill" :src="item"></image>
									</view>
								</view>
							</scroll-view>
						</view>
						<view class="flex mb-10">
							<view class="fs-24 ns-text-bold" style="width: 100rpx;color: #636363;">地址</view>
							<view>{{ad_address}}</view>
						</view>
						<view class="flex mb-10">
							<view class="fs-24 ns-text-bold" style="width: 100rpx;color: #636363;">电话</view>
							<view>{{ad_mobile}}</view>
						</view>
						<view class="flex mb-10">
							<view class="fs-24 ns-text-bold" style="width: 100rpx;color: #636363;">联系人</view>
							<view>{{ad_name}}</view>
						</view>
					</view>
				</block>
				<view class="ns-align-content-flex-end open" @tap="moreAD">{{is_moreAD?'收起':'展开'}}</view>
			</view>

			<view v-else class="padding-lr bg-white fs-24 color-636363 pb-20 pr mt-20">
				<navigator url="/private/privateNotice/privateNotice" class="color-9B9B9B fs-24 ns-text-limit3" style="height: 120rpx;line-height: 40rpx;">{{ad}}</navigator>
				<view class="flex ns-row-reverse">
					<navigator hover-class="none" url="/private/privateSetting/privateSetting" class="edit-btn fs-24 color-fff">自营设置</navigator>
				</view>
			</view>
		</view>
		<view class="zhezhao" v-if="is_moreAD" @tap="moreAD"></view>
		<block v-if="type==1">
			<block data-src="/components/goods/specifications_model.wxml"><view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_first">
	<view class="get-card-modal-main-first pr flex-y-center" :style="'background: url(' + first_order_img + ') no-repeat center;background-size: 750rpx 772rpx;'">
		<view class="text-center" style="width: 750rpx; height: 772rpx;">
			<view class="get-card-modal-text-first" style="margin-top: 275rpx;">
				<view>送你一次</view>
				<view>首单享会员机会</view>
			</view>
			<view class="small-tips-first text-center">首次下单可以享受会员价</view>
			<view class="btn-text-first text-center" @tap="closeModal">确定</view>
		</view>
	</view>
</view>
<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + ((__device=='device_iphone_x' && pageType != 'normal')?'bottom: 175rpx':'')" v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
	<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (pageType == 'addMenu'?'bottom: 90rpx':'') + ' ' + ((__device=='device_iphone_x' && pageType != 'normal')?'bottom: 175rpx':'')" @tap.stop="">
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
		<view class v-if="role=='shoper' && is_commission">
			<view class="commission-box-cart flex align-end">
				<view class="fs-24 color-333333 flex align-end" v-if="goods.c1">
					<view style="margin-bottom: 4rpx;margin-right: 4rpx;">小亲(赚)</view>
					<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c1}}</view>
				</view>
				<view class="fs-24 color-333333 flex align-end" style="margin-left: 57rpx;" v-if="goods.c19">
					<view style="margin-bottom: 4rpx;margin-right: 4rpx;">大亲(赚)</view>
					<view class="fs-30 color-FF0000 ns-text-bold">¥ {{goods.c19}}</view>
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
					<view class="attr-group" v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" v-if="attr_group.attr_list.length>0">
						<view class="attr-group-name fs-28 color-333333 ns-text-bold">{{attr_group.attr_group_name}}</view>
						<view class="attr-list">
							<text :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')" v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :data-groupindex="groupindex" :data-childindex="childindex" @tap="item.isHave?'storeAttrClick':''">{{item.attr_name}}</text>
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
									<view :class="'flex-grow-0 number-btn number-sub iconfont icon-jian ' + (form.number<=1?'disabled':'')" style="margin-top: -6rpx;" @tap="numberSub"></view>
									<view class>
										<input style="padding:0;" class="flex-grow-1 number-input" :value="form.number" type="number" step="1" min="1" @blur="numberBlur"></input>
									</view>
									<view :class="'flex-grow-0 number-btn number-add iconfont icon-jia ' + (form.number>=goods.goods_num?'disabled':'')" style="margin-top: 0rpx;" @tap="numberAdd"></view>
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
				<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
					<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
				</view>
			</view>
		</scroll-view>

	</scroll-view>
</view>
<!-- 产品参数 -->
<view class="attr-picker" :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter" catchtouchmove="preventTouchMove" @tap="closeParameter">
	<view @tap.stop="" class="content-box" :style="'padding:32rpx 24rpx 0;border-radius:30rpx 30rpx 0px 0px;' + (__device=='device_iphone_x'?'bottom: 175rpx':'')">
		<view class="flex-x-center fs-38 color-333333 mb-30">产品参数</view>
		<scroll-view scroll-y="true" style="max-height: 500rpx;">
			<view class="parameter-list flex fs-30" v-for="(item, index) in goods.param_json" :key="index">
				<view class="color-999999" style="width: 246rpx;">{{item.name}}</view>
				<view class="color-333333">{{item.value}}</view>
			</view>
		</scroll-view>
		<view class="save-btn" @tap="closeParameter">确定</view>
	</view>
</view></block>
			<!-- 重要通知 -->
			<view class="earnings-rule-zhezhao flex flex-y-center" v-if="isInvite" :style="'width:' + x + 'px;height:' + y + 'px'" @tap="closeInvite" catchtouchmove="true">
				<view class="invite-dear" @tap.stop="">
					<view class="invite-title fs-30 ns-text-bold color-fff">重要提示</view>
					<view class="invite-body border-bottom" style="padding-bottom: 30rpx;">
						<!-- <rich-text nodes="{{listData.big_message}}"></rich-text> -->
						<view>
							<rich-text :nodes="importanceTips"></rich-text>
						</view>
						<navigator :url="'/pages/article-detail/article-detail?id=' + fwxy_id" class style="text-decoration: underline">查看服务协议</navigator>
						<!-- <view class="mt-30">
							<rich-text nodes="{{listData.big_message_two}}"></rich-text>
						</view> -->
						<view class="mt-30 flex ns-align-items-flex-center" @tap.stop="agreeInvite">
							<view :class="'iconfont ' + (isAgreeInvite?'icon-xuanzhong color-252E3E fs-40':'icon-weixuanzhong fs-40')"></view>

							<view class="ml-20">我同意以上约定</view>
						</view>
					</view>
					<view class="invite-btn flex">
						<navigator open-type="navigateBack" class="flex1 ns-text-center" style="border-right: 2rpx solid #D6D6D6;" @tap.stop="closeInvite">取消</navigator>
						<view class="flex1 ns-text-center" @tap.stop="agreeJoin">确定</view>
					</view>
				</view>
			</view>
			<view style="padding-top: 210rpx;">
				<view class="VerticalBox">
					<scroll-view class="VerticalNav nav1" style="height:calc(100vh - 210rpx);" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
						<view style="padding-bottom: 130rpx;">
							<block v-for="(item, index) in list" :key="index">

								<view :class="(['cu-item',index==tabCur?'text-green cur':'']) + ' fs-28'" :data-id="index" :data-cid="item.id" :data-event-opts="[['tap',[['TabSelect',['$event']]]]]" @tap="TabSelect">{{item.name}}</view>
							</block>
						</view>

					</scroll-view>
					<scroll-view class="VerticalMain" style="height:calc(100vh - 210rpx);" scroll-y @scrolltolower="getMore">
						<view style="padding-bottom: 130rpx;">
							<block v-if="goodsList.length>0">
								<view :id="'main-'+index">
									<!-- <view class="cu-bar solid-bottom bg-white">
										<view class="action"><text class="cuIcon-title text-green"></text>{{item.name}}</view>
									</view> -->
									<view class="cu-list menu-avatar">
										<navigator hover-class="none" :url="'/private/privateGoods/privateGoods?id=' + item.id" v-for="(item, index) in goodsList" :key="index" class="goods flex mb-20">
											<view style="width: 160rpx;height: 160rpx;margin-right: 18rpx;">
												<image style="width: 160rpx;height: 160rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
											</view>
											<view class="flex1" style="padding-top: 5rpx;">
												<view class="fs-30 ns-text-limit" style="height: 70rpx;">{{item.name}}</view>
												<view class="color-489A19 flex fs-24 mt-5">
													<view class="mr-10"><text v-for="(tag, index2) in item.tags" :key="index2" class="mr-10">{{tag}}</text></view>
												</view>
												<view class="flex ns-align-items-flex-center justify-between">
													<view class="flex ns-align-items-flex-center">
														<view class="color-FF9100 fs-28 ns-text-bold mr-10">¥ {{item.min_price}}</view>
														<!-- <view class="color-9B9B9B fs-20 ns-text-through">¥ 520</view> -->
													</view>
													<view class="flex align-center">
														<block v-if="item.cart_num>0">
															<view class="iconfont icon-jianshao1 fs-40 color-2C2C2C" @tap.stop="reduceNum" :data-index="index" :data-id="item.id" :data-price="item.min_price"></view>
															<view style="width: 50rpx;text-align: center;">{{item.cart_num}}</view>
														</block>
														<block v-if="filters.parseInt(item.cart_num)>=item.num">
															<view class="iconfont icon-add-fill fs-50" style="color: #C8C7C7;" @tap.stop></view>
														</block>
														<block v-else>
															<view class="iconfont icon-add-fill fs-50 color-FF9100" @tap.stop="addNum" :data-index="index" :data-id="item.id" :data-price="item.min_price"></view>
														</block>
													</view>
												</view>
											</view>
										</navigator>
									</view>
								</view>
							</block>
							<block v-else>
								<view class="flex-x-center flex-y-center">
									<view>
										<view class="iconfont icon-kong ns-text-center" style="font-size: 150rpx;"></view>
										<view style="font-size: 24rpx;color: #B0B0B0;text-align: center;margin-top: 31rpx;line-height: 53rpx;">
											<view>这里没有商品呢</view>
											<view>去其他分类看看吧～</view>
										</view>
									</view>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>

			<view class="footer">
				<view class="footer-content flex ns-align-items-flex-center color-fff fs-28">
					<block v-if="role == 'shoper'">
						<navigator hover-class="none" url="/private/home/home?type=2" class="flex1 flex-x-center ns-align-items-flex-center" style="border-right: 2rpx solid #FFFFFF;">
							<text class="iconfont icon-iconset0156 fs-40 mr-10"></text>
							<text>整理商品</text>
						</navigator>
					</block>
					<block v-else>
						<view class="flex1 flex-x-center ns-align-items-flex-center" style="border-right: 2rpx solid #FFFFFF;" @tap="copyText">
							<text class="iconfont icon-weixin fs-40 mr-10"></text>
							<text>联系店主</text>
						</view>
					</block>
					<navigator hover-class="none" url="/private/privateCart/privateCart" class="flex1 flex-x-center ns-align-items-flex-center pr">
						<view class="iconfont icon-cailanzi- fs-36 mr-10"></view>
						<view>我的篮子</view>
						<view class="num-box" v-if="cartNum>0">{{cartNum}}</view>
					</navigator>
					<navigator hover-class="none" url="/private/privateOrder/privateOrder" class="flex1 flex-x-center ns-align-items-flex-center">
						<view class="iconfont icon-icon- fs-40 mr-10"></view>
						<view>自营订单</view>
					</navigator>
				</view>
			</view>
		</block>
		<block v-else>
			<block v-if="list.length == 0">
				<view class="flex-x-center flex-y-center" style="height: 100%;">
					<view class="fs-30 color-9B9B9B text-center" style="line-height: 40rpx;">
						<view>还没有商品哦～</view>
						<view>点击底部的「商品管理」</view>
						<view>开始添加你的第一款自营商品吧</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view :style="(nowStatus.code == 1?'padding-top: 360rpx':'padding-top: 280rpx;') + ';'">
					<view class="VerticalBox">
						<scroll-view class="VerticalNav nav1" :style="(nowStatus.code == 1?'height:calc(100vh - 360rpx)':'height:calc(100vh - 280rpx)') + ';'" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
							<view style="padding-bottom: 130rpx;">
								<block v-for="(item, index) in list" :key="index">

									<view :class="(['cu-item',index==tabCur?'text-green cur':'']) + ' fs-28'" :data-id="index" :data-cid="item.id" :data-event-opts="[['tap',[['TabSelect',['$event']]]]]" @tap="TabSelect">{{item.name}}</view>
								</block>
								<navigator hover-class="none" url="/private/privateGoodsClassify/privateGoodsClassify" :class="(['cu-item',index==tabCur?'text-green cur':'']) + ' fs-28 color-FF9100'">添加分类</navigator>
							</view>

						</scroll-view>
						<scroll-view class="VerticalMain" :style="(nowStatus.code == 1?'height:calc(100vh - 360rpx)':'height:calc(100vh - 280rpx)') + ';'" scroll-y @scrolltolower="getMore">
							<view style="padding-bottom: 130rpx;">
								<block v-if="goodsList.length>0">
									<view class="fs-24" :id="'main-'+index" v-for="(item, index) in goodsList" :key="index">
										<view class="cu-list menu-avatar">
											<navigator :url="'/private/privateGoods/privateGoods?id=' + item.id" hover-class="none" class="goods flex  mb-20">
												<view style="width: 160rpx;height: 160rpx;margin-right: 18rpx;">
													<image style="width: 160rpx;height: 160rpx;" mode="aspectFill" :src="item.first_cover_pic"></image>
												</view>
												<view class="flex1" style="padding-top: 5rpx;">
													<view class="fs-30 ns-text-limit" style="height: 70rpx;">{{item.name}}</view>
													<view class="color-489A19 flex fs-24 mt-10">
														<view class="mr-10">
															<text v-for="(tag, index2) in item.tags" :key="index2" class="mr-10">{{tag}}</text>
														</view>
													</view>
													<view class="flex ns-align-items-flex-center justify-between mt-10">
														<view class="flex ns-align-items-flex-center">
															<view class="color-FF9100 fs-28 ns-text-bold mr-10">¥ {{item.min_price}}</view>
															<!-- <view class="color-9B9B9B fs-20">¥ 520</view> -->
														</view>
														<view class="flex color-9B9B9B align-center" @tap.stop="setTop" :data-id="item.id">
															<view class="iconfont icon-zhiding1 fs-26 mr-10"></view>
															<view class="fs-20">移至最前</view>
														</view>
													</view>
												</view>
											</navigator>
										</view>
									</view>
								</block>
								<block v-else>
									<view class="flex-x-center flex-y-center">
										<view>
											<view class="iconfont icon-kong ns-text-center" style="font-size: 150rpx;"></view>
											<view style="font-size: 24rpx;color: #B0B0B0;text-align: center;margin-top: 31rpx;line-height: 53rpx;">
												<view>这里没有商品呢</view>
												<view>去其他分类看看吧～</view>
											</view>
										</view>
									</view>
								</block>
							</view>
						</scroll-view>
					</view>
				</view>
			</block>

			<view class="footer">
				<view class="footer-content flex ns-align-items-flex-center color-fff fs-28">
					<view class="flex1 flex-x-center ns-align-items-flex-center" style="border-right: 2rpx solid #FFFFFF;" @tap="showShareModal">
						<text class="iconfont icon-weixin fs-40 mr-10"></text>
						<text>分享店铺</text>
					</view>
					<navigator url="/private/privateGoodsList/privateGoodsList" class="flex1 flex-x-center ns-align-items-flex-center">
						<view class="iconfont icon-tianjiashangpin- fs-36 mr-10"></view>
						<view>商品管理</view>
					</navigator>
					<navigator url="/private/privateShopOrder/privateShopOrder" class="flex1 flex-x-center ns-align-items-flex-center">
						<view class="iconfont icon-icon- fs-40 mr-10"></view>
						<view>处理订单</view>
					</navigator>
				</view>
			</view>

		</block>

		<block data-src="/components/share/share.wxml"><view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="true">
	<view :class="'share-modal-body ' + __device" @tap.stop="">
		<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
		<!-- <view class="shareGet">分享赚 <span>¥ 65</span></view>
		        <view class="tips">收益仅自己可见</view> -->
		<view class="flex-row">
			<view class="flex-grow-1 flex-x-center">
				<button open-type="share" class="share-bottom" style="height:100%;">
					<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
					<view>分享给好友</view>
				</button>
			</view>
			<view class="flex-grow-1 flex-x-center">
				<view @tap="getGoodsQrcode" class="share-bottom">
					<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
					<view>生成商品海报</view>
				</view>
			</view>
		</view>
		<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
	</view>
</view>

<!-- 生成海报 -->
<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose" v-if="share_type == 'code'">
	<view class="goods-qrcode-body flex-col" @tap.stop="">
		<view class="flex-grow-1" style="position: relative">
			<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
				<view class="goods-qrcode-box">
					<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
						<view class="flex-x-center flex-col">
							<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
							<view style="color: #888">海报生成中</view>
						</view>
					</view>
					<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode" :src="goods_qrcode"></image>
				</view>
			</view>
		</view>
		<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
			<view>
				<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">保存图片</button>
				<button v-else style="opacity: .4">保存图片</button>
			</view>
		</view>
		<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
			<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
		</view>
	</view>
</view>
<!-- 生成店铺码 -->
<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose" v-if="share_type == 'onlyCode'">
	<view class="shareShop">
		<view>
			<view class="shopHead">
				<image :src="mch.user.avatar_url" class="shopHeadImg"></image>
				<view class="font_blod">{{mch.name?mch.name:mch.user.nickname}}</view>
				<view class="tipss">邀请您来这里逛逛呀～</view>
			</view>
			<!-- 小程序码 -->
			<view class="shopCode" style="height:370rpx">
				<image class="appcode-img" :src="goods_qrcode"></image>
			</view>
		</view>
		<view class="flex shopBottom flex-x-center">
			<view class="flex1" style="color: #c11111" @tap.stop="saveGoodsQrcode">保存图片</view>
			<icon type="clear" size="40" color="#fff" class="shop-close" @tap="closeShop"></icon>
		</view>
	</view>
</view></block>

	</block>

</view>
</template>


<script>
// pages//private/home/home.js
var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
var gSpecificationsModel = require("../../components/share/share.js"); //商城多规格选择
//商城多规格选择

export default {
  data() {
    return {
      x: this.getApp().core.getSystemInfoSync().windowWidth,
      y: this.getApp().core.getSystemInfoSync().windowHeight,
      tabCur: 0,
      mainCur: 0,
      verticalNavTop: 0,
      load: true,
      is_moreAD: false,
      isInvite: false,
      pageType: 'private',
      show_attr_picker: false,
      page: 1,
      share_modal_active: '',
      goods_qrcode_active: '',
      role: this.getApp().core.getStorageSync('role'),
      share_type: 'onlyCode',
      is_login: false,
      mch: "",
      type: 0,
      goodsList: "",
      cartNum: "",
      showgg: "",
      ad: "",
      wx_mobile: "",
      ad_img: "",
      ad_address: "",
      ad_mobile: "",
      ad_name: "",
      nowStatus: "",
      list: "",
      listCur: "",
      cat_id: "",
      isAgreeInvite: "",
      importanceTips: "",
      fwxy_id: "",
      stopLoadMore: false,
	  filters: require('../../utils/filters.js'),
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.getApp().core.getStorageSync('USER_INFO')) {
      this.setData({
        is_login: false,
        role: this.getApp().core.getStorageSync('role'),
        mch: this.getApp().core.getStorageSync('_mchInfo')
      });
    } else {
      this.setData({
        is_login: true
      });
    }

    this.getApp().page.onLoad(this, options);
    wx.hideShareMenu();
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    if (options.type == 2) {
      this.setData({
        type: 2
      });
    } else {
      this.setData({
        type: 1
      });
    }

    this.getAdAndSetting();

    if (!this.getApp().core.getStorageSync('_isInvite')) {
      this.getTipsMsg();
      this.setData({
        isInvite: true
      });
    } else {
      this.setData({
        isInvite: false
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    uni.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    gSpecificationsModel.init(this);
    // share.init(this);
    this.setData({
      tabCur: 0
    });
    this.getCartNum();
    this.getCatList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getGoodsList();
    this.setData({
      page: 1,
      stopLoadMore: false
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var self = this;
    var title = '我的自营小店上新货啦，快进来看看吧～';
    var user_info = this.getApp().getUser();
    var mch_info = wx.getStorageSync('_mchInfo');

    switch (res.from) {
      case 'button':
        var res = {
          path: "/private/home/home?type=1" + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: title,
          imageUrl: self.sharePic
        };
        self.shareModalClose();
        break;

      case 'menu':
        var res = {
          path: "/private/home/home?type=1" + self.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: title,
          imageUrl: self.cover_pic[0]
        };
        break;

      default:
        break;
    }

    return res;
  },
  methods: {
    // 获取店主商品列表
    getGoodsList() {
      var self = this;

      if (self.type == 1) {
        var url = this.getApp().api.selfSupport.get_goods_list_user; // 用户端

        var data = {
          userId: uni.getStorageSync('USER_INFO').id,
          cat_id: self.cat_id || '',
          cart_sum_show: true
        };
      } else {
        var url = this.getApp().api.selfSupport.get_goods_list; // 店主端

        var data = {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          cat_id: self.cat_id || '',
          cart_sum_show: true,
          status: 1
        };
      }

      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      this.getApp().request({
        url: url,
        data: data,

        success(res) {
          if (res.code == 0) {
            self.setData({
              goodsList: res.data.list
            });
          } else {
            uni.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        },

        complete: res => {
          uni.hideLoading();
          uni.stopPullDownRefresh();
        }
      });
    },
	
    getCartNum() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cart_num,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              cartNum: res.data
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    copyText() {
      var text = this.wx_mobile;
      wx.makePhoneCall({
        phoneNumber: text
      }); // wx.setClipboardData({
      // 	data: text,
      // 	success(res) {
      // 		wx.showToast({
      // 			title: '手机已复制，快去联系吧',
      // 			duration: 3000,
      // 			icon: 'none'
      // 		})
      // 		wx.getClipboardData({
      // 			success(res) {
      // 			}
      // 		})
      // 	}
      // })
    },

    getAdAndSetting() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_my_shop,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            if (res.data.ad.length > 52) {
              var text = res.data.ad.substring(0, 52) + "...";
              self.setData({
                showgg: text
              });
            } else {
              var text = res.data.ad;
              self.setData({
                showgg: text
              });
            }

            self.setData({
              ad: res.data.ad,
              wx_mobile: res.data.wx_mobile,
              ad_img: res.data.cover_pic_arr,
              ad_address: res.data.address,
              ad_mobile: res.data.mobile,
              ad_name: res.data.name,
              nowStatus: res.data.nowStatus
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    getCatList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cat_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            var classifyList = res.data;
            self.setData({
              list: classifyList,
              listCur: classifyList[0] || '',
              cat_id: classifyList[0] ? classifyList[0].id : ''
            });
            self.getGoodsList();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    setTop(e) {
      var self = this;
      var id = e.currentTarget.dataset.id;
      this.getApp().request({
        url: this.getApp().api.selfSupport.set_goods_top,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id
        },

        success(res) {
          if (res.code == 0) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
            self.getGoodsList();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    moreAD() {
      if (this.is_moreAD) {
        var text = this.ad.substring(0, 52) + "...";
        this.setData({
          is_moreAD: false,
          showgg: text
        });
      } else {
        this.setData({
          is_moreAD: true,
          showgg: this.ad
        });
      }
    },

    // 加
    addNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var goodsNum = self.goodsList[index].cart_num;
      goodsNum = +goodsNum + 1;
      self.setData({
        ['goodsList[' + index + '].cart_num']: goodsNum
      });
      self.editCartNum(id, goodsNum, price);
    },

    reduceNum(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var price = e.currentTarget.dataset.price;
      var goodsNum = self.goodsList[index].cart_num;
      goodsNum = +goodsNum - 1;
      self.setData({
        ['goodsList[' + index + '].cart_num']: goodsNum
      });
      self.editCartNum(id, goodsNum, price);
    },

    editCartNum(id, num, price) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cart,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          num: num,
          goods_id: id,
          price: price
        },

        success(res) {
          if (res.code == 0) {
            self.getCartNum();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    TabSelect(e) {
      var tabCur = e.currentTarget.dataset.id;
      var mainCur = e.currentTarget.dataset.id;
      var cid = e.currentTarget.dataset.cid;
      var verticalNavTop = (e.currentTarget.dataset.id - 1) * 50;
      this.setData({
        tabCur: tabCur,
        mainCur: mainCur,
        verticalNavTop: verticalNavTop,
        cat_id: cid
      });
      this.getGoodsList();
    },

    VerticalMain(e) {
      let that = this;
      let tabHeight = 0;

      if (this.load) {
        for (let i = 0; i < this.list.length; i++) {
          let view = wx.createSelectorQuery().select("#main-" + this.list[i].id);
          view.fields({
            size: true
          }, data => {
            this.list[i].top = tabHeight;
            tabHeight = tabHeight + data.height;
            this.list[i].bottom = tabHeight;
          }).exec();
        }

        this.load = false;
      }

      let scrollTop = e.detail.scrollTop + 10;

      for (let i = 0; i < this.list.length; i++) {
        if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
          var verticalNavTop = (this.list[i].id - 1) * 50;
          var tabCur = this.list[i].id;
          this.setData({
            verticalNavTop: verticalNavTop,
            tabCur: tabCur
          });
          return false;
        }
      }
    },

    openInvite: function () {
      var self = this;
      self.setData({
        isInvite: true
      });
    },
    closeInvite: function () {
      var self = this;
      self.setData({
        isInvite: false
      });
    },
    agreeInvite: function () {
      var self = this;
      self.setData({
        isAgreeInvite: !self.isAgreeInvite
      });
    },
    agreeJoin: function () {
      var self = this;

      if (!self.isAgreeInvite) {
        wx.showToast({
          title: '请先同意约定',
          duration: 2500,
          icon: 'none'
        });
        return;
      }

      this.getApp().core.setStorageSync('_isInvite', 'true');
      self.closeInvite();
    },

    getTipsMsg() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_zy_article,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          type: 1
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              importanceTips: res.data.content,
              fwxy_id: res.data.user_fwxy
            });
          }

          if (res.code == 1) {
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
          }
        }
      });
    },

    showAttrPicker: function (e) {
      var self = this;
      self.setData({
        show_attr_picker: true
      });
    },

    getMore() {
      var self = this;
      var page = self.page;
      var index = page;
      var data = {
        userId: this.getApp().core.getStorageSync('USER_INFO').id,
        cat_id: self.cat_id || ''
      };
      var url = this.getApp().api.selfSupport.get_goods_list;
      this.getApp().core.pading(self, url, data, function (res) {
        if (res.data.list.length == 0) {
          self.setData({
            stopLoadMore: true
          });
          return;
        }

        var newGoodList = res.data.list;
        var nowGoodList = self.goodsList.concat(newGoodList);
        self.setData({
          goodsList: nowGoodList
        });
      });
    }

  }
};
</script>
<style>
@import "./home.css";
</style>