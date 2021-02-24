<template>
	<view class="">
		<view class="goods-goods">
			<common></common>
			<!-- 轮播开始 -->
			<goodsbanner :goods="goods"></goodsbanner>


			<!-- 价格开始1111111111111111111111111111111111111111111111111111 -->

			<!--价格结束11111111111111111111111111111111111111111111111111  -->
			<!-- 商品信息开始22222222222222222222222222222222222222222222222 -->

			<view v-if="goods_attr" class="miaosha-bar flex-row">
				<!-- <image class='img_bg' src='{{__wxapp_img.miaosha.ms_activity_bg.url}}'></image> -->

				<view :class="'miaoshaHeader ' + (miaosha_end_time_over.type == 0?'over':'future')" :style="'background: url(' + (vip?goods.banberImg.b:(goods.is_start?goods.banberImg.a:goods.banberImg.d)) + ') no-repeat;background-size: 100% 107rpx;'">
					<view class="pull-left ns-flex">
						<view class="fs-24 ">￥<text class="ns-text-bold" style="font-size: 50rpx;">{{filters.priceStr(goods.price)[0]}}.</text><text
							 class="ns-text-bold">{{filters.priceStr(goods.price)[1]}}</text></view>
						<view class="ns-flex ns-align-items-flex-center">
							<view>
								<view class="price-tips">秒杀</view>
								<view class="ns-text-through fs-24 color-999999" style="opacity: 0.6;">
									<text>￥</text>
									<text class="ns-text-bold color-999999 fs-24">{{goods.original_price}}</text>
								</view>
							</view>
						</view>
						<!-- 佣金 -->
						<!-- <view class="flex ns-align-items-flex-center ml-10 mt-20" wx:if="{{role=='shoper' && goods.c1>0}}">
								<view class="yongjin fs-28">赚</view>
								<view class="fs-28 color-fff">￥{{goods.c1}}</view>
							</view> -->
					</view>
					<view class="pull-right clear">
						<view class="pull-left">
							<view class="clear">
								<view class="timer pull-left">
									<text class="timer-num">{{miaosha_end_time_over.h}}</text>
									<text class="timer-split">:</text>
									<text class="timer-num">{{miaosha_end_time_over.m}}</text>
									<text class="timer-split">:</text>
									<text class="timer-num">{{miaosha_end_time_over.s}}</text>
								</view>
								<view class="pull-left miaoshaStatus">{{goods.is_start?'后结束':'后开始'}}</view>
							</view>
							<view class="pr progress">
								<view :class="'pa ' + (miaosha_end_time_over.type == 0?'overPro':'futurePro')" :style="'width:' + (goods.haveBuy + '%')"></view>
								<view class="progressText color-2C2C2C" :style="'color: ' + (miaosha_end_time_over.type == 0?'#E05D21':'')">

									{{'已抢' + goods.haveBuy + '%'}}
								</view>
							</view>
						</view>
						<view class="pull-left miaoshaImg">
							<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/lightning.png"></image>
						</view>
					</view>
				</view>
				<!-- oldCode -->
				<!-- <view class='activity_box'>
				        <view class="time-over-text" wx:if='{{miaosha_end_time_over.type == 0}}'>距离结束仅剩</view>
				        <view class="time-over-text" wx:if='{{miaosha_end_time_over.type == 1}}'>距离开始仅剩</view>
				        <view class="timer">
				            <text class="timer-num">{{miaosha_end_time_over.h}}</text>
				            <text class="timer-split">:</text>
				            <text class="timer-num">{{miaosha_end_time_over.m}}</text>
				            <text class="timer-split">:</text>
				            <text class="timer-num">{{miaosha_end_time_over.s}}</text>
				        </view>
				    </view> -->
			</view>


			<!-- <view class="commission-box">
					<view class="flex-x-center">
						<view class="show-btn" bindtap="commisionBtn">{{is_commission?'不显示佣金':'显示佣金'}}</view>
					</view>
					<view wx:if="{{is_commission}}" class="flex justify-between" style="margin-top: 18rpx;">
						<view class="text-center" wx:if="{{goods.c1}}">
							<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr(goods.c1)[0]}}.</text><text>{{filters.priceStr(goods.c1)[1]}}</text></view>
							<view class="fs-22" style="color: #65482C;">黄金(赚)</view>
						</view>
						<view class="text-center">
							<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr('10.00')[0]}}.</text><text>{{filters.priceStr('10.00')[1]}}</text></view>
							<view class="fs-22" style="color: #65482C;">钻石(赚)</view>
						</view>
						<view class="text-center">
							<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr('10.00')[0]}}.</text><text>{{filters.priceStr('10.00')[1]}}</text></view>
							<view class="fs-22" style="color: #65482C;">皇冠(赚)</view>
						</view>
					</view>
				</view> -->

			<!-- 满减优惠 -->
			<!-- <block wx:if="{{preferential}}">
				  <navigator url="/pages/fullReduction/fullReduction?youhui_id={{goods.youhui.id?goods.youhui.id:goods.youhui['0'].id}}" hover-class="none">
				    <view class="preferential" data-id="{{goods.id}}">
				      <view class="flex-row flex-y-center select_attrs" style="margin-bottom:0">
				        <view class="flex-grow-1 flex-row flex-y-center">
				          <text style="color:#2c2c2c;" class="fs-28 ns-text-bold">满减优惠</text>
				          <text class='attrs'>{{goods.youhui['0'].desc}}</text>
				        </view>
				        <view class="flex-grow-0">
				          <image class='img' src="{{__wxapp_img.store.jiantou_r.url}}" />
				        </view>
				      </view>
				    </view>
				  </navigator>
				</block> -->
			<!-- 价格是面议、快速购买、则不显示 -->
			<view class="goods_info_box clear pr" style="border-bottom: 1rpx solid #F4F4F4;">
				<view class="flex ns-justify-content-space-between ns-align-items-flex-center">
					<view style="width: 100%;">
						<view class="goods_name fs-30 ns-text-limit2 mb-24" v-if="goods.name"><text :data-text="goods.name" @longtap="copy">{{goods.name}}</text></view>
						<view class="color-666666 fs-26">{{goods.desc}}</view>

					</view>
				</view>
			</view>
			<block v-if="quick != 1 && !goods.is_negotiable && __user_info.blacklist !== 1">
				<!-- <view bindtap="showAttrPicker" class="flex-row flex-y-center select_attrs">
						<view class="flex-grow-1 flex-row flex-y-center">
							<text style="color:#333333;" class='fs-30'>赠品</text>
							<text class='attrs fs-24 color-999999'>
								<text style="margin-right:10rpx" wx:key="key">随单赠送，不用添加购物车</text>
							</text>
						</view>
						<view class="flex-grow-0">
							<text class="iconfont icon-jinru fs-34 color-8D8D8D"></text>
						</view>
					</view> -->
				<view class="flex-row flex-y-center select_attrs" v-if="role=='shoper'">

					<view class="flex-grow-1 flex-row flex-y-center">
						<block v-if="is_commission">
							<view style="color:#333333;" class="fs-30">佣金</view>
							<view class="attrs flex align-center">
								<view class="text-center flex align-center" v-if="goods.c1>0">
									<view class="fs-22" style="color: #65482C;">销售佣金</view>
									<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr(goods.c1)[0]}}.</text><text>{{filters.priceStr(goods.c1)[1]}}</text></view>
								</view>
								<!-- <view class="text-center ml-24 flex align-center" v-if="goods.c19>0">
									<view class="fs-22" style="color: #65482C;">大亲(赚)</view>
									<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr(goods.c19)[0]}}.</text><text>{{filters.priceStr(goods.c19)[1]}}</text></view>

								</view> -->
							</view>
						</block>
						<block v-else>
							<text style="color:#333333;" class="fs-30">提示</text>
							<text class="attrs">
								<text style="margin-right:10rpx">绑定微信号，选货，比价，推荐</text>
								<!-- <view class="text-center">
									<view class="fs-30 color-FF0200 ns-text-bold">￥ <text class="fs-40">{{filters.priceStr('10.00')[0]}}.</text><text>{{filters.priceStr('10.00')[1]}}</text></view>
									<view class="fs-22" style="color: #65482C;">钻石(赚)</view>
								</view> -->
							</text>
						</block>
					</view>
					<view class="flex-grow-0">
						<text :class="'iconfont ' + (is_commission?'icon-yanjing':'icon-yanjing1') + ' fs-34 color-8D8D8D'" @tap="commisionBtn"></text>
					</view>
				</view>
				<view class="flex-row flex-y-center select_attrs" v-if="goods.service_list.length > 0">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#333333;" class="fs-30 flex-grow-0">服务</view>
						<view class="attrs flex-grow-1 ns-text-limit2">
							<text v-for="(item, index) in goods.service_list" :key="index" class="fs-24" :style="'padding-right: 16rpx;margin-right: 16rpx;' + (index<goods.service_list.length - 1?'border-right: 1rpx solid #888;':'')">{{item}}</text>
						</view>
					</view>
				</view>
				<view @tap="showAttrPicker" class="flex-row flex-y-center select_attrs">
					<view class="flex-grow-1 flex-row flex-y-center">
						<text style="color:#333333;" class="fs-30">规格</text>
						<text class="attrs">
							<text v-for="(item, index) in attr_group_list" :key="index" style="margin-right:10rpx">{{item.attr_list.length}}种{{item.attr_group_name}}</text>
						</text>
					</view>
					<view class="flex-grow-0">
						<text class="iconfont icon-jinru fs-34 color-8D8D8D"></text>
					</view>
				</view>
				<!-- <view bindtap="showAttrPicker" class="flex-row flex-y-center select_attrs">
						<view class="flex-grow-1 flex-row flex-y-center">
							<text style="color:#333333;" class='fs-30'>评价</text>
							<text class='attrs fs-24 color-999999'>
								<text style="margin-right:10rpx" wx:key="key">官网好评度 91.2%</text>
							</text>
						</view>
						<view class="flex-grow-0 flex align-center">
							<view class="flex mr-16" style="color: #999999;">
								<view wx:for="{{spendList}}" wx:key="key" class="iconfont {{item}} fs-40"></view>
							</view>
							<view class="fs-24 color-999999">推荐</view>
						</view>
					</view> -->
				<view class="flex-row select_attrs" v-if="goods.supplier_role == 1 || goods.supplier_role == 2">
					<view class="flex-grow-1 flex-row">
						<view class="flex-grow-0 fs-30" style="color:#333333;">送至</view>
						<view class="flex-grow-1" style="margin-left: 30rpx;">
							<view @tap="goToAddress" class="ns-text-limit" style="width: 570rpx;">
								<text class="iconfont icon-location fs-30" style="color: #FF401A;margin-right: 13rpx;"></text>
								<text class="fs-24 color-999999">{{jd_send.address?jd_send.address:'请选择收货地址'}}</text>
							</view>
							<view class="mt-24 fs-24 ns-text-limit2" v-if="jd_send.promiseTips">
								<text style="color: #FF401A;margin-right: 12rpx;">现货</text>
								<text class="fs-24">{{jd_send.promiseTips}}</text>
							</view>
						</view>
					</view>
					<view class="flex-grow-0">
						<text class="iconfont icon-jinru fs-34 color-8D8D8D"></text>
					</view>
				</view>
				<view @tap="openParameter" class="flex-row flex-y-center select_attrs" v-if="goods.param_json.length>0">
					<view class="flex-grow-1 flex-row flex-y-center">
						<text style="color:#333333;" class="fs-30">参数</text>
						<text class="attrs">
							<text style="margin-right:10rpx">类型，包装等参数</text>
						</text>
					</view>
					<view class="flex-grow-0">
						<text class="iconfont icon-jinru fs-34 color-8D8D8D"></text>
					</view>
				</view>
				<view class="flex-row flex-y-center select_attrs" v-if="goods.express_desc">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#333333;" class="fs-30">发货</view>
						<view class="attrs flex align-center">
							<!-- <view class="ziti fs-24" wx:if="{{goods.delivery_type==2}}">自提</view> -->
							<view class="kuaidi fs-24">{{goods.express_desc}}</view>
							<!-- <view class="fs-24 color-999999 ml-16" wx:if="{{goods.delivery_type==2}}">{{goods.deliveryPick.data.pick_start_time_str}}</view> -->
						</view>
					</view>
				</view>
			</block>



			<block v-if="pageType ==='PINTUAN'">
				<view class="ns-padding-sm ns-bdb-default ns-bg-white mt-20">
					<view class="ns-flex ns-margin-bottom-sm ns-text-xs">
						<view>拼团须知</view>
						<view class="ns-text-gray ns-padding-left-sm">简单4步，一起拼好货</view>
					</view>
					<view>
						<image class="ptt-box" src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/pingtuanguize.jpg "></image>
					</view>
				</view>
				<view v-if="group_num > 0" class="friend-group">
					<view class="flex-y-center">
						<view class="ns-padding-vertical-sm ns-text-sm flex-row  flex-grow-1">
							小伙伴在拼团，可直接参与
						</view>
						<!-- <view bindtap="more" class='pt-rule-right flex-grow-0 flex-y-center'>
					            更多
					        </view> -->
						<!-- <view class='pt-rule-more flex-grow-0 flex-y-center'>
					            <image src='{{__wxapp_img.share.right.url}}'></image>
					        </view> -->
					</view>
					<view v-for="(item, index) in group_list" :key="index" class="friend-group-item ns-bdb-default flex-row flex-y-center"
					 v-if="index<3">
						<view class="friend-corver-pic flex-grow-0 flex-y-center">
							<image :src="item.avatar_url"></image>
						</view>
						<view class="friend-name flex-grow-1 flex-y-center">
							{{item.nickname}}
						</view>
						<view class="flex-grow-0 flex-col">
							<view class="flex-grow-0 group-short" style="text-align:right">
								还差<text class="ns-text-red">{{item.surplus}}</text>人成团
							</view>
							<view class="flex-grow-0 group-short-time">
								还剩 {{item.limit_time.days}}:{{item.limit_time.hours}}:{{item.limit_time.mins}}:{{item.limit_time.secs}}
							</view>
						</view>
						<view class="flex-grow-0 go-offered flex-y-center flex-x-center" @tap="goToGroup" :data-id="item.id">
							去参团
						</view>
					</view>
				</view>
			</block>


			<!-- <block wx:if="{{pageType ==='PINTUAN'}}">
				  <view class='goods-comment-title flex-row flex-y-center ns-bg-white ns-padding-horizontal-sm ns-bdb-default' bindtap='goToComment'>
				      <view style='line-height:100rpx;' class='ns-text-sm flex-grow-1 flex-y-center ns-flex '>
				        <view class='ns-text-sm ns-text-black'>用户评论</view>
				        <view class='ns-text-xs ns-text-gray ns-padding-left-sm'> {{comment_num}}个评价</view>   -->
			<!-- <text wx:if='{{__is_sales}}' style='margin-left:10rpx;'>| 销量 {{goods.virtual_sales}}</text> -->
			<!-- </view>
				      <view class='comment-more flex-grow-0 flex-y-center'>
				          <image src='{{__wxapp_img.share.right.url}}'></image>
				      </view>
				  </view>
				</block> -->
			<!-- 商品服务 -->
			<!-- <view wx:if="{{goods.service_list&&goods.service_list.length>0}}" class="bg-white mb-20 flex-row check-list">
					<view class="check-item flex-y-center" wx:for="{{goods.service_list}}">
						<view class="flex flex-y-center" bindlongtap="copyText" data-text="{{goods.service_list}}">
							<view class="iconfont icon-zhengque fs-30" style="color: #48C183;"></view>
							<view class="ml-10">{{item}}</view>
						</view>
					</view>
				</view>
				<view wx:else class="mb-20"></view> -->
			<!-- 品牌推荐 -->

			<view class="mb-16 ns-bg-white" v-if="goods.brand">
				<view @tap="goBrand" :data-brandid="goods.brand.id" class="ns-padding-sm ns-flex ns-justify-content-space-between">
					<view class="ns-flex">
						<view>
							<image style="width:100rpx;height:100rpx;border-radius: 12rpx;box-shadow: 0rpx 8rpx 10rpx #F4F4F4;" :src="goods.brand.img"
							 mode="aspectFit"></image>
						</view>
						<view class style="margin-left: 25rpx;">
							<view class="fs-36 color-333333">{{goods.brand.name}}</view>
							<view class="ns-text-smblack ns-text-xs ns-margin-top-sm ns-text-limit fs-24 color-999999" style="width: 500rpx;margin-top: 21rpx;">{{goods.brand.desc}}</view>
						</view>
					</view>
					<view class="flex ">
						<view style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多<text class="iconfont icon-jinru color-fff ml-10"
							 style="border-radius: 50%;background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text></view>
					</view>
				</view>
				<view style="padding: 0 24rpx;" v-if="linkGoods &&linkGoods.length!=0||goods.hot_goods&&goods.hot_goods.length!=0">
					<!-- <view class="ns-flex ns-text-center">
					  <view class="ns-w50 ns-text-sm ns-text-bold ns-text-smgray nav-item {{brandIndex==0?'active':''}}" data-index="0" bindtap="brandNav" wx:if="{{goods.link_goods.length!=0}}">
					    <text>相关推荐</text>
					  </view>
					  <view class="ns-w50 ns-text-sm ns-text-bold ns-text-smgray nav-item {{brandIndex==1?'active':''}}" data-index="1" catchtap="brandNav" wx:if="{{goods.hot_goods.length!=0}}">
					    <text>热销商品</text>
					  </view>
					</view> -->
					<view v-if="linkGoods&&linkGoods.length>0">
						<scroll-view class="scroll-view" scroll-x="true">
							<view v-for="(item, index) in linkGoods" :key="index" class="order fs-24" @tap="goGoods" :data-id="item.id">
								<image class="order-img" :src="item.cover_pic"></image>
								<view class=" pt-20 ns-text-limit  fs-24 color-333333">
									{{item.name}}
								</view>
								<view class="ns-flex ns-justify-content-space-between align-center">
									<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-26">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
									<!-- 	<view class="add-cart-icon"></view> -->
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>




			<!-- 同类推荐 -->

			<view class="bg-white p-24" v-if="sameList&&sameList.length>0">
				<view class="flex-x-center pr" style="margin-bottom: 38rpx;">
					<view class=" fs-30 color-333333 ns-text-bold">同类推荐</view>
					<view class="under-line"></view>
				</view>
				<view class style="height: 650rpx;">
					<swiper circular="true" duration="500" style="height: 650rpx;">
						<swiper-item v-for="(item, index) in sameList" :key="index" class="flex ns-wrap" style="height: 650rpx;">
							<view v-for="(goods, index2) in sameList" :key="index2" :class="'same fs-24 ' + ((index+1)%3==0?'':'mr-15')"
							 @tap="goGoods" :data-id="goods.id">
								<image class="same-img" :src="goods.first_cover_pic"></image>
								<view class=" pt-20 ns-text-limit  fs-24 color-333333">
									{{goods.name}}
								</view>
								<view class="ns-flex ns-justify-content-space-between align-center">
									<view class="fs-20 color-FF0200 ns-text-bold">￥<text class="fs-26">{{filters.priceStr(goods.price)[0]}}.</text><text>{{filters.priceStr(goods.price)[1]}}</text></view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<!-- lqq -->
			<view class="tab-group">
				<view class="flex-row tab-group-header">
				</view>
				<view class="tab-group-body">
					<view :class="'tab-group-item ' + tab_detail">
						<view class="goods-detail">
							<!--  :str="article_detail" -->

							<jyf-parser :html="article_detail"></jyf-parser>
						</view>
					</view>
				</view>
			</view>
			<!-- lqq -->

			<!-- 相关推荐 -->
			<!-- lqqqqqqq BUG <view class="p-24" v-if="linkGoods&&linkGoods.length>0">-->
			<view class="p-24" v-if="true">
				<view v-if="linkGoods&&linkGoods.length>0" class="flex-x-center pr" style="margin-bottom: 38rpx;">
					<view class=" fs-30 color-333333 ns-text-bold">大家都在看</view>
					<view class="under-line"></view>
				</view>
				<view class=" flex ns-wrap justify-between">
					<view v-for="(item, index) in linkGoods" :key="index" class="fs-24 pb-20" style="width: 340rpx;" @tap="goGoods"
					 :data-id="item.id">
						<image style="width: 340rpx;height: 340rpx;border-radius: 20rpx;" :src="item.cover_pic"></image>
						<view class=" pt-20 ns-text-limit  fs-28 color-333333">
							{{item.name}}
						</view>
						<view class="ns-flex ns-justify-content-space-between align-center">
							<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
							<!-- <view class="add-cart-icon" style="width: 40rpx;height: 40rpx;"></view> -->
						</view>
					</view>
				</view>
			</view>

			<!-- 分享 -->
			<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose"
			 v-if="sharePic">
				<view :class="'share-modal-body ' + __device" @tap.stop="shop">
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

			<!-- 分享给朋友 -->
			<view :class="'modal flex-row ' + hide" @tap="close">
				<view class="flex-y-center" style="width:100%;height:100%;position:relative;">
					<image :src="__wxapp_img.store.close2.url" style="width:50rpx;height:50rpx;position:absolute;left:24rpx;top:60rpx"></image>
					<video :src="url" id="video" style="height:80%" autoplay="true"></video>
				</view>
			</view>


			<!-- 生成海报 -->
			<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose">
				<view class="goods-qrcode-body flex-col" @tap.stop="shop">
					<view class="flex-grow-1" style="position: relative">
						<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
							<view class="goods-qrcode-box">
								<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
									<view class="flex-x-center flex-col">
										<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
										<view style="color: #888">海报生成中</view>
									</view>
								</view>
								<image @tap="goodsQrcodeClick" mode="aspectFit" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode"
								 :src="goods_qrcode"></image>
							</view>
						</view>
					</view>
					<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
						<view>
							<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">
								保存图片
							</button>
							<button v-else style="opacity: .4">保存图片</button>
						</view>
					</view>
					<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
						<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
					</view>
				</view>
			</view>




			<!-- 快速购买开始··························· -->
			<!-- 快速购买 购物车 -->
			<block v-if="quick == 1">
				<block data-src="/components/shopping_cart/shopping_cart">
					<!-- 购物车商品列表 -->
					<view v-if="shoppingCartModel" :class="'shopping-cart-list ' + (_navbar ? 'shopping-cart-list2' : '')">
						<view class="carHeader">
							<view class="yixuan">已选商品</view>
							<view class="clearAll" @tap="clearShoppingCart">
								<image :src="__wxapp_img.store.clear.url" style="width:22rpx; height:22rpx;margin-right:10rpx; "></image>
								<text style="font-size:27rpx;color:#BDBDBD;">清空</text>
							</view>
						</view>
						<view class="hr"></view>
						<scroll-view scroll-y="true" style="max-height: 500rpx;width:100%">
							<block v-for="(cargood, index) in carGoods" :key="index">
								<block v-if="cargood.attr == ''">
									<block v-if="cargood.num > 0">
										<view class="carGood">
											<view class="goodsname" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{cargood.goods_name}}</view>
											<view class="goodsNumPrice">
												<view class="goodsTotalPrice" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">￥{{cargood.goods_price}}</view>
												<view class="goodsNum">
													<view class="carStandard" @tap="jia" :data-index="index" :data-id="cargood.goods_id">
														<image :src="__wxapp_img.store.jia.url" class="carStandard"></image>
													</view>
													<view class="carStandard" id="carStandard_num">{{cargood.num}}</view>
													<view class="carStandard" @tap="jian" :data-index="index" :data-id="cargood.goods_id">
														<image :src="__wxapp_img.store.jian.url" class="carStandard"></image>
													</view>
												</view>
											</view>
										</view>
									</block>
								</block>
								<block v-else>
									<block v-if="cargood.num > 0">
										<view class="carGood">
											<view class="goods_attr_name">
												<view class="cargood_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{cargood.goods_name}}</view>
												<view class="cargood_attr_name" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;float:left;">
													<text v-for="(item, index2) in cargood.attr" :key="index2">{{item.attr_group_name}}:{{item.attr_name}}</text>
												</view>
											</view>
											<view class="goodsNumPrice">
												<view class="goodsTotalPrice">￥{{cargood.goods_price}}</view>
												<view class="goodsNum">
													<view class="carStandard" @tap="jia" :data-index="index" :data-id="cargood.goods_id">
														<image :src="__wxapp_img.store.jia.url" class="carStandard"></image>
													</view>
													<view class="carStandard" id="carStandard_num">{{cargood.num}}</view>
													<view class="carStandard" @tap="jian" :data-index="index" :data-id="cargood.goods_id">
														<image :src="__wxapp_img.store.jian.url" class="carStandard"></image>
													</view>
												</view>
											</view>
										</view>
									</block>
								</block>
							</block>
						</scroll-view>
					</view>

					<view class="modal-mask" @tap="hideShoppingCart" v-if="shoppingCartModel"></view>


					<!-- 购物车 -->
					<view :id="__device" :class="'goods_car ' + (_navbar ? 'shopping_cart' : '')">
						<block v-if="total.total_num == 0">
							<view class="buy">
								<view class="car_pic">
									<image class="car_png" :src="__wxapp_img.store.car.url"></image>
								</view>
								<view class="weixuan">未选购商品</view>
							</view>
							<view class="goumai">立即购买</view>
						</block>
						<block v-if="total.total_num > 0">
							<view class="buy" @tap="shoppingCartListModel">
								<view class="car_pic">
									<image class="car_png" :src="__wxapp_img.store.yougoods.url"></image>
									<view class="total_num">{{total.total_num}}</view>
								</view>
								<view class="price">￥{{total.total_price}}</view>
							</view>
							<view class="pay" @tap="buynow">立即购买</view>
						</block>
					</view>
				</block>
			</block>
			<block v-else>
				<!-- <navigator url="/pages/cart/cart" class="cart-nav" open-type="redirect">
				                    <image src="{{__wxapp_img.nav.cart.url}}"></image>
				                </navigator> -->
				<block data-src="/components/goods/goods_buy">
					<view v-if="__user_info.blacklist !== 1" :class="'bar-bottom1 ' + __device">
						<view class="flex-row bar-bottom bg-white" v-if="goods_attr">
							<view class="flex-grow-0 flex-row">
								<!-- 商城模块多商户 -->
								<!-- <navigator wx:if="{{pageType === 'STORE' && goods.mch}}" class="flex-grow-0 flex-y-center bar-bottom-btn" url="/mch/shop/shop?mch_id={{goods.mch.id}}" open-type="redirect">
					            <view>
					                <image src="{{__wxapp_img.store.store.url}}"></image>
					                <text>店铺</text>
					            </view>
					        </navigator> -->

								<!-- 所有模块 -->
								<view class="flex-grow-0 flex-y-center bar-bottom-btn" @tap="goHome">
									<view>
										<text class="iconfont icon-shouye color-FFC330  iconsize" style="color: #F76436;"></text>
										<view class="color-666666 fs-20">店铺</view>
									</view>

								</view>
								<view class="flex-grow-0 flex-y-center  ns-text-center pr" @tap="goService">
									<!-- <view>
									<button open-type="contact" session-from="nickName={{nickName}}|avatarUrl={{avatarUrl}}|type={{type}}|userId={{userId}}|mchId={{mchId}}|storeId={{storeId}}|gsId={{gsId}}" bindcontact="handleContact" style="background:#fff;border:0;padding:0;margin:0;width:100%;height:100%;line-height: 1;" >
									    <text class="iconfont icon-kefu" style="font-size: 36rpx !important;margin-bottom: 5rpx;"></text>
										<view class="color-8D8D8D fs-20">客服</view>
									</button>
								</view> -->
									<view>
										<text class="iconfont icon-kefu color-616161 iconsize"></text>
										<view class="color-666666 fs-20">专属导购</view>
									</view>
									<view class="service-tips" v-if="is_show_again" @tap.stop="stop">
										<view class="fs-28 color-fff">添加店主微信，为您提供专属导购服务</view>
										<view class="flex align-center" style="margin-top: 12rpx;">
											<view :class="'iconfont mr-10 fs-40 color-fff ' + (is_show_again?'icon-weixuanzhong':'icon-xuanzhong ')"
											 @tap="showAgain"></view>
											<view class="fs-22 color-999999">知道了，不用再提示</view>
										</view>
									</view>
								</view>
								<view class="flex-grow-0 flex-y-center bar-bottom-btn" @tap="goCar">
									<view>
										<text class="iconfont icon-gouwuche_weixuanzhong color-616161 iconsize"></text>
										<view class="color-666666 fs-20">购物车</view>
									</view>
								</view>

							</view>

							<!-- 商城 -->
							<block v-if="pageType === 'STORE'">
								<view v-if="goods.is_negotiable" class="flex-grow-1 flex-row">
									<view class="flex-grow-1 flex-y-center flex-x-center add-cart" v-if="store.good_negotiable.contact==1" style="background:#118eea">
										<block v-if="__platform=='wx'">
											<view @tap="kfMessage" class="flex-x-center flex-y-center _negotiable" v-if="!store.show_customer_service">客服</view>
											<!-- <button wx:else open-type="contact" class="flex-x-center flex-y-center _negotiable" session-from="{{__user_info.nickname}}|">客服</button> -->
										</block>
										<block v-if="__platform=='my'">
											<view class="float-icon-btn" style="position: relative">
												<view class="flex-x-center flex-y-center" style="z-index:2;width: 100%;border-radius:50%;height: 100%;position: absolute;left: 0;top:0;opacity: 0">
													<contact-button size="60" :tnt-inst-id="__alipay_mp_config.cs_tnt_inst_id" :scene="__alipay_mp_config.cs_scene"></contact-button>
												</view>
												客服
											</view>
										</block>
									</view>

									<view v-if="store.good_negotiable.web_contact==1" class="flex-grow-1 flex-y-center flex-x-center contact">
										<navigator :url="'/pages/web/web?url=' + store.option.web_service_url" open-type="navigate" hover-class="none">客服</navigator>
									</view>

									<view v-if="store.good_negotiable.tel==1" class="flex-grow-1 flex-y-center flex-x-center buy-now" @tap="callPhone"
									 :data-info="store.contact_tel">联系电话</view>
								</view>
								<view v-else class="flex-grow-1 flex-row align-center pr-24 fs-26 justify-end">
									<block v-if="goods.start_buy==1">
										<view class=" flex-y-center flex-x-center add-cart mr-16" @tap="addCart">加入购物车</view>
										<view class=" flex-y-center flex-x-center buy-now" @tap="buyNow">{{goods.buy_txt}}</view>
									</block>
									<block v-if="goods.start_buy==0">
										<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: #489A19;width: 374rpx;"
										 @tap="addCart">加入购物车</view>
									</block>
									<block v-if="goods.start_buy==-1">
										<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: #D6D6D6;width: 374rpx;">{{goods.buy_txt}}</view>
									</block>
								</view>
							</block>
							<!-- 团购 -->
							<block v-if="pageType === 'PROUPGOODS'">
								<view class="flex-grow-1 flex-row align-center pr-24">
									<block v-if="goods.start_buy==1">
										<view class="flex-grow-1 flex-y-center flex-x-center add-cart" @tap="addCart">加入购物车</view>
										<view class="flex-grow-1 flex-y-center flex-x-center buy-now" @tap="buyNow">{{goods.buy_txt}}</view>
									</block>
									<block v-if="goods.start_buy==0">
										<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: #489A19;"
										 @tap="addCart">加入购物车</view>
									</block>
									<block v-if="goods.start_buy==-1">
										<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: #D6D6D6;">{{goods.buy_txt}}</view>
									</block>
								</view>
							</block>
							<!-- 秒杀 -->
							<block v-if="pageType === 'MIAOSHA'">
								<view v-if="goods.is_start" class="flex-grow-1 flex-row align-center pr-24">
									<block v-if="lestNum>0">
										<view class="flex-grow-1 flex-y-center flex-x-center buy-now" @tap="buyNow">立即购买</view>
									</block>
									<block v-else>
										<view class="flex-grow-1 flex-row">
											<!-- <view class="flex-grow-1 flex-y-center flex-x-center buy-now" style="background-color:#489A19" bindtap="doNothing">提醒我</view> -->
											<view class="flex-grow-1 flex-y-center flex-x-center buy-now" style="background-color:#ccc" @tap="doNothing">已抢光</view>
										</view>
									</block>
								</view>
								<view v-else class="flex-grow-1 flex-row align-center">
									<!-- <view class="flex-grow-1 flex-y-center flex-x-center buy-now" style="background-color:#489A19" bindtap="doNothing">提醒我</view> -->
									<view class="flex-grow-1 flex-y-center flex-x-center buy-now" style="background-color:#ccc" @tap="doNothing">暂未开始</view>
								</view>
							</block>

							<!-- 预约 -->
							<block v-if="pageType === 'BOOK'">
								<view class="flex-grow-1 flex-y-center flex-x-center group-buy" @tap="bespeakNow" :style="goods.is_only==1?'width: 338rpx':''">
									立即预约
								</view>
							</block>

							<block v-if="pageType === 'INTEGRAL'">
								<view class="flex-grow-1 flex-row">
									<view class="flex-grow-1 flex-y-center flex-x-center buy-now" @tap.stop="exchangeGoods">立即兑换</view>
								</view>
							</block>

							<!-- 拼团 -->
							<block v-if="pageType === 'PINTUAN'">
								<block v-if="hasStart">
									<block v-if="lestNum">
										<navigator :url="'/pages/goods/goods?id=' + goods.id" class="flex-grow-1 flex-col flex-y-center flex-x-center align-center alone-buy"
										 v-if="goods.is_only>0 && goods.only_price != goods.price">
											<view class="flex-gorw-0 money">
												¥{{goods.only_price}}
											</view>
											<view class="flex-grow-0">
												单独购买
											</view>
										</navigator>
										<view class="flex-grow-1 flex-col flex-y-center flex-x-center align-center group-buy" @tap="buyNow" :style="goods.is_only>1?'width: 220rpx':''">
											<view class="flex-gorw-0 money">
												¥{{goods.price}}
											</view>
											<view class="flex-grow-0">
												{{oid ? "参团" : "发起拼团"}}
											</view>
										</view>
									</block>
									<block v-else>
										<view style="background:#ccc;" class="flex-grow-1 flex-col flex-y-center flex-x-center group-buy">
											已抢光
										</view>
									</block>
								</block>
								<block v-else>
									<view style="background:#ccc;" class="flex-grow-1 flex-col flex-y-center flex-x-center group-buy">
										活动未开始
									</view>
								</block>
							</block>

							<!-- 步数宝 -->
							<block v-if="pageType === 'STEP'">
								<view class="flex-grow-1 flex-row">
									<view class="flex-grow-1 flex-y-center flex-x-center buy-now" @tap.stop="exchangeGoods" style="background-color:#ff9d1e;width:644rpx">立即兑换</view>
								</view>
							</block>
						</view>
					</view>
				</block>

			</block>


			<!-- 快速购买结束··························· -->

			<!-- 不知道是什么组件开始 -->
			<block v-if="get_coupon_list&&get_coupon_list.length>0">
				<view class="get-coupon flex-y-center flex-x-center">
					<view class="get-coupon-box" style="overflow: visible">
						<image mode="widthFix" class="get-coupon-bg" :src="__wxapp_img.coupon.bg.url"></image>
						<view class="flex-x-center mb-20">
							<image :src="get_coupon_list[0].type==2?'/images/icon-receive-coupon.png':'/images/img-get-coupon-title.png'"
							 style="width: 226rpx;height: 51rpx"></image>
						</view>
						<scroll-view class="coupon-list" scroll-y="true">
							<view v-for="(item, index) in get_coupon_list" :key="index" class="coupon-item flex-y-center">
								<image mode="widthFix" :src="__wxapp_img.coupon.item_bg.url" style="width: 100%;height: 100%"></image>
								<view style="width: 100%">
									<view class="flex-row flex-y-center">
										<view class="flex-grow-1 flex-row flex-y-bottom">
											<view style="line-height: 1">￥</view>
											<view style="font-size: 23pt;line-height: .85">{{item.sub_price}}</view>
										</view>
										<view class="flex-grow-0" style="font-size: 9pt;line-height: 32rpx;">
											满{{item.min_price}}元可用
										</view>
									</view>
									<view @tap="hideGetCoupon" class="use-now" :data-url="item.url">立即使用</view>
									<view style="font-size: 9pt">{{item.desc}}</view>
								</view>
							</view>
						</scroll-view>
						<view class="flex-x-center">
							<image :src="__wxapp_img.store.close3.url" style="width:100rpx;height:100rpx;" @tap="closeCouponBox"></image>
						</view>
					</view>
				</view>
			</block>
			<!-- 不知道是什么组件结束 -->


			<!-- 商品信息结束2222222222222222222222222222222222222222222222 -->
			<!-- 测试开始 -->

			<!-- 测试结束 -->


			<!-- 多规格开始 -->
			<block data-src="/components/goods/specifications_model.wxml">
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
														<input style="padding:0;" class="flex-grow-1 number-input" :value="form.number" type="number" step="1"
														 min="1" @blur="numberBlur"></input>
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
								<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal' || pageType == 'addMenu'">
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
			</block>
			<!-- 多规格结束 -->
		</view>
	</view>
</template>



<script>
	var utils = require("../../../utils/helper.js");

	var gSpecificationsModel = require("../../../components/goods/specifications_model.js"); //商城多规格选择
	//商城多规格选择
	var goodsInfo = require("../../../components/goods/goods_info.js");
	var goodsBuy = require("../../../components/goods/goods_buy.js");
	import util from "../../../utils/util";
	import goodsBanner1 from '../../../components/goods/goods_banner.vue'
	import jyfParser from '../../../components/jyf-parser/jyf-parser.vue'
	var p = 1;
	var is_loading_comment = false;
	var is_more_comment = true;
	var share_count = 0;

	export default {
		data() {
			return {
				filters: require("../../../utils/filters.js"),
				haveBuy: '0%',
				//已抢百分比
				futureText: '',
				//活动即将开始文案
				pageType: "MIAOSHA",
				id: null,
				show_attr_picker: false,
				form: {
					number: 1
				},
				tab_detail: "active",
				tab_comment: "",
				comment_list: [],
				comment_count: {
					score_all: 0,
					score_3: 0,
					score_2: 0,
					score_1: 0
				},
				autoplay: false,
				hide: "hide",
				show: false,
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight - 20,
				miaosha_end_time_over: {
					h: "--",
					m: "--",
					s: "--",
					type: 0
				},
				lestNum: 0,
				role: uni.getStorageSync('role'),
				active2: 0,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				gsId: "",
				isReturn: false,
				nickName: "",
				avatarUrl: "",
				userId: "",
				mchId: "",
				storeId: "",
				type: 0,
				goods_attr: {},
				attr_group_list: [],
				roomId: "",
				customParams: "",
				liveStatus: "",
				live_room_status_desc: "",
				showGetLogin: false,
				user_info_show: false,
				linkGoods: [],
				allLookList: [],
				address_id: "",
				url: "",
				img_hide: "",
				get_coupon_list: [],
				article_detail: "",
				quick: '',
				sameList: [],
				goods_qrcode: '',
				isParameter: '',
				sameGoods: [],
				sharePic: '',
				is_show_first: false,
				goods_qrcode_active: '',
				goods: {
					cover_pic: [],
					link_goods: [],
					service_list: [],
					attr_list: [],
					param_json: [],
					hot_goods: [],
					attr: [],
					attr_list: [],
					youhui: [],
					linkGoods: [],
					brand_id: '',
					buy_max: 1,
					banberImg: {
						a: '',
						b: ''
					}
				},

				groupNum: 1,
				oid: 1,
				vip: '',
				shareTitle: ''
			};
		},

		components: {
			goodsbanner: goodsBanner1,
			jyfParser
		},
		computed: {
			is_commission() {
				return this.$store.state.show_commission
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			var self = this;
			//#ifdef MP-WEIXIN
			uni.hideShareMenu();
			//#endif
			share_count = 0;
			p = 1;
			is_loading_comment = false;
			is_more_comment = true; // var parent_id = 0;

			if (uni.getStorageSync('rel_id') && options.scene) {
				options.id = uni.getStorageSync('rel_id');
			}

			if (options.scene && uni.getStorageSync('s_id')) {
				this.getApp().request({
					url: this.getApp().api.default.get_share_info,
					data: {
						sid: uni.getStorageSync('s_id')
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.rel_id) {
								options.id = res.data.rel_id;
								self.setData({
									id: options.id,
									gsId: options.id,
									// scene_type: scene_type,
									role: uni.getStorageSync('role')
								});
							}

							gSpecificationsModel.init(this);
							goodsInfo.init(this);
							goodsBuy.init(this);
							this.goodsOnLoad();
							this.checkFirstOrder();
							self.getGoods();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			} else {
				self.setData({
					id: options.id,
					gsId: options.id,
					// scene_type: scene_type,
					role: uni.getStorageSync('role')
				});
				gSpecificationsModel.init(this);
				goodsInfo.init(this);
				goodsBuy.init(this);
				this.goodsOnLoad();
				this.checkFirstOrder();
				self.getGoods();
			}

			var pages = getCurrentPages();

			var prevPage = pages.length < 2 ? false : true;

			if (prevPage) {
				self.setData({
					isReturn: true
				});
			}

			self.setData({
				nickName: uni.getStorageSync('USER_INFO').nickname,
				avatarUrl: uni.getStorageSync('USER_INFO').avatar_url,
				userId: uni.getStorageSync('USER_INFO').id,
				mchId: uni.getStorageSync('_mchInfo').id,
				storeId: uni.getStorageSync('STORE').id,
				type: 2
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function(options) {
			this.getApp().page.onReady(this);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function(options) {

			this.getApp().page.onShow(this);
			goodsBuy.init(this);
			gSpecificationsModel.init(this)
			var self = this;
			var address_id = 0;
			var address = uni.getStorageSync(this.getApp().const.PICKER_ADDRESS);

			if (address) {
				self.setData({
					address_id: address.id
				});
			}

			if (self.goods && (self.goods.supplier_role == 1 || self.goods.supplier_role == 2)) {
				self.getJDSend();
			}
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function(options) {
			this.getApp().page.onHide(this);
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function(options) {
			this.getApp().page.onUnload(this);
		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function(options) {
			this.getApp().page.onPullDownRefresh(this);
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function(options) {
			this.getApp().page.onReachBottom(this);
			var self = this;
			self.getCommentList(true);
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var user_info = uni.getStorageSync(this.getApp().const.USER_INFO);
			var mch_info = uni.getStorageSync('_mchInfo');

			switch (res.from) {
				case 'button':
					var res = {
						path: "/pages/miaosha/details/details?id=" + this.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
						title: self.shareTitle,
						imageUrl: self.sharePic
					};
					break;

				case 'menu':
					var res = {
						path: "/pages/miaosha/details/details?id=" + this.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
						title: self.goods.name,
						imageUrl: self.goods.first_cover_pic
					};
					break;

				default:
					break;
			}

			self.shareModalClose();
			return res;
		},
		methods: {
			// 全局切换佣金显隐
			commisionBtn() {
				console.log(this.$store.state.show_commission);
				this.$store.commit('vuexSet', {
					name: 'show_commission',
					value: !this.$store.state.show_commission
				})
				console.log(this.$store.state.show_commission);
			},
			getGoodsAttr: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: self.id,
						from: 2,
						address_id: self.address_id || ''
					},
					success: function(res) {
						if (res.code == 0) {
							let lestNum = 0;

							if (res.data.attr) {
								for (let i in res.data.attr) {
									lestNum = lestNum + res.data.attr[i].num;
								}
							}

							self.selectDefaultAttr(res.data);
							self.getJDSend();
							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								lestNum: lestNum
							});
						}
					}
				});
			},
			getGoods: function() {
				var self = this;
				var data = {};
				data.from = 2;

				if (self.id) {
					data.id = self.id;
				}

				if (self.goods_id) {
					data.goods_id = self.datat.goods_id;
				} // data.scene_type = self.data.scene_type;


				this.getApp().request({
					url: this.getApp().api.default.goods,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							var detail = res.data.detail;
							//WxParse.wxParse("detail", "html", detail, self)
							setTimeout(() => {
								self.article_detail = detail;
							}, 200);
							var goods = res.data;
							goods.service_list = goods.service_list || [];
							goods.param_json = goods.param_json || [];
							// this.goods.service_list;
							// this.goods.param_json
							if (res.data.live_id) {
								var mch_id = uni.getStorageSync('_mchInfo').id;
								var user_id = uni.getStorageSync('USER_INFO').id;
								let roomId = res.data.live_id; // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取

								let customParams = encodeURIComponent(JSON.stringify({
									sid: this.sid,
									mch_id: mch_id,
									user_id: user_id
								})); // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）

								let live_room_status_desc = res.data.live_status_str;
								let liveStatus = res.data.live_status;
								self.setData({
									roomId,
									customParams,
									liveStatus,
									live_room_status_desc
								});
							}

							self.setData({
								goods: goods
							});
							self.getGoodsAttr();
							self.getCommentList();
							self.getAllLook();
							self.setMiaoshaTimeOver();
							self.getSameTuijian();
							self.getLook();
						}

						if (res.code == 1) {
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						}
					}
				});
			},
			addCart: util.throttle(function() {
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}

				this.submit('ADD_CART');
			}, 1000),
			buyNow: util.throttle(function() {
				// if (!this.data.fsd.miaosha) {
				//     getApp().core.showModal({
				//         title: "提示",
				//         content: '秒杀商品当前时间暂无活动',
				//         showCancel: false,
				//         success: function(res) {}
				//     });
				//     return;
				// }
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}

				this.submit('BUY_NOW');
			}, 1000),
			submit: function(type) {
				var self = this;

				if (!self.show_attr_picker) {
					self.setData({
						show_attr_picker: true
					});
					return true;
				}

				///选择全部规格后才允许下单,加入购物车
				if (!this.check_all()) {
					return;
				}
				console.log('全选了')
				//选择全部规格后才允许下单，加入购物车

				if (self.goods && self.goods.num > 0 && self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}

				if (this.goods.start_time > Date.parse(new Date())) {
					uni.showToast({
						title: "活动未开始",
						icon: 'none'
					});
					return true;
				}

				if (self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: 'none'
					});
					return true;
				}

				if (type == 'ADD_CART') { //加入购物车
					self.sendEvent("加入购物车", {
						"商品名称": self.goods.name,
						"商品ID": self.goods.id,
					})
				}

				if (type == 'BUY_NOW') {
					//立即购买
					self.setData({
						show_attr_picker: false
					});
					var goods_list = [];
					goods_list.push({
						goods_id: self.id,
						num: self.form.number,
						sku: self.goods.sku,
						from: 2
					});
					var goods = self.goods;
					var mch_id = 0;

					if (goods.mch != null) {
						mch_id = goods.mch.id;
					}

					var mch_list = [];
					mch_list.push({
						mch_id: mch_id,
						goods_list: goods_list
					});
					uni.navigateTo({
						url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(mch_list)
					});
				}
			},
			favoriteAdd: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.user.favorite_add,
					method: "post",
					data: {
						goods_id: self.goods.id
					},
					success: function(res) {
						if (res.code == 0) {
							var goods = self.goods;
							goods.is_favorite = 1;
							self.setData({
								goods: goods
							});
						}
					}
				});
			},
			favoriteRemove: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.user.favorite_remove,
					method: "post",
					data: {
						goods_id: self.goods.id
					},
					success: function(res) {
						if (res.code == 0) {
							var goods = self.goods;
							goods.is_favorite = 0;
							self.setData({
								goods: goods
							});
						}
					}
				});
			},
			tabSwitch: function(e) {
				var self = this;
				var tab = e.currentTarget.dataset.tab;

				if (tab == "detail") {
					self.setData({
						tab_detail: "active",
						tab_comment: ""
					});
				} else {
					self.setData({
						tab_detail: "",
						tab_comment: "active"
					});
				}
			},
			commentPicView: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var pic_index = e.currentTarget.dataset.picIndex;
				uni.previewImage({
					current: self.comment_list[index].pic_list[pic_index],
					urls: self.comment_list[index].pic_list
				});
			},
			getCommentList: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list,
					data: {
						brand_id: self.goods.brand_id
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								linkGoods: res.data.list
							});
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},

			getAllLook() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_rec,
					data: {
						position: 1 // 1->商品详情页推荐， 2->购物车推荐， 3->品牌主页推荐

					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								allLookList: res.data.list
							});
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
				});
			},

			play: function(e) {
				var url = e.target.dataset.url; //获取视频链接

				this.setData({
					url: url,
					hide: '',
					show: true
				});
				var videoContext = uni.createVideoContext('video');
				videoContext.play();
			},
			close: function(e) {
				if (e.target.id == 'video') {
					return true;
				}

				this.setData({
					hide: "hide",
					show: false
				});
				var videoContext = uni.createVideoContext('video');
				videoContext.pause();
			},
			hideFun: function(e) {
				if (e.detail.current == 0) {
					this.setData({
						img_hide: ""
					});
				} else {
					this.setData({
						img_hide: "hide"
					});
				}
			},
			closeCouponBox: function(e) {
				this.setData({
					get_coupon_list: []
				});
			},
			setMiaoshaTimeOver: function() {
				var self = this;

				function _init() {
					var time_over = self.goods.start_time - self.goods.now_time;

					if (time_over >= 0) {
						self.goods.is_start = 0;
					} else {
						self.goods.is_start = 1;
						time_over = self.goods.end_time - self.goods.now_time;
					}

					time_over = time_over < 0 ? 0 : time_over;
					self.goods.now_time++;
					self.setData({
						goods: self.goods,
						miaosha_end_time_over: secondToTime(time_over)
					});
				}

				_init();

				setInterval(function() {
					_init();
				}, 1000);

				function secondToTime(second) {
					var _h = parseInt(second / 3600);

					var _m = parseInt(second % 3600 / 60);

					var _s = second % 60;

					var type = 0;

					if (_h >= 1) {
						// 小时大于1则减至1
						// _h -= 1,
						type = 1;
					}

					return {
						h: _h < 10 ? "0" + _h : "" + _h,
						m: _m < 10 ? "0" + _m : "" + _m,
						s: _s < 10 ? "0" + _s : "" + _s,
						type: type
					};
				}
			},
			to_dial: function(e) {
				var contact_tel = this.store.contact_tel;
				uni.makePhoneCall({
					phoneNumber: contact_tel
				});
			},
			shop() {},
			check_all() { //选择全部规格返回true，漏选返回false

				let attr_group_list = this.attr_group_list;
				console.log('attr_group_list1111111111111', this.attr_group_list);
				let index = 0;
				let checkAll = true;
				for (let key in attr_group_list) {
					console.log(attr_group_list[key]);
					let name = attr_group_list[key].attr_group_name; //规格分类
					let checked = false;
					attr_group_list[key].attr_list.forEach((val, ind) => {
						if (val.checked) {
							checked = true;
						}
					}); //有无选择
					if (checked == false) {
						uni.showToast({
							title: '请选择' + name,
							icon: 'none',
							duration: 2000
						})
						checkAll = false;
						return false;
					}
				}
				return checkAll;
			}
		}
	};
</script>
<style>
	/* goods.wxss */
	/* goods.wxss */

	@import "~@/components/goods/goods_banner.css";
	@import "/components/goods/specifications_model.css";
	@import "/components/goods/goods_info.css";
	@import "/components/goods/goods_buy.css";
	@import "/components/quick-navigation/quick-navigation.css";


	view {
		overflow: visible;
	}

	.no-scroll {
		height: 100%;
		overflow-y: hidden;
	}

	.especially-tip {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 29rpx 30rpx 20rpx;
	}

	.bar-bottom-btn {
		border: none;
		background: #fff;
		font-size: 0;
		line-height: normal;
		padding: 0;
		margin: 0;
		box-shadow: none;
		border-radius: 0;
		position: inherit;
		width: 110rpx;
	}

	.bar-bottom-btn:after {
		display: none;
	}

	.bar-bottom-btn:first-child {
		border-left: none;
	}

	.bar-bottom-btn.button-hover {
		background: rgba(255, 255, 255, 0.85);
	}

	.bar-bottom-btn view {
		text-align: center;
		width: 100%;
	}

	.bar-bottom-btn image {
		width: 38rpx;
		height: 38rpx;
		margin-bottom: 0rpx;
	}

	.bar-bottom-btn text {
		font-size: 8pt;
		color: #888;
		display: block;
	}

	.bar-bottom .add-cart {
		background: #f39800;
		color: #fff;
	}

	.bar-bottom .buy-now {
		background: #F49E39;
		color: #fff;
	}

	.goods-detail {
		box-sizing: border-box;
		padding: 24rpx 0;
		background: #fff;
	}

	.goods-detail text,
	.goods-detail image,
	.goods-detail view {
		box-sizing: border-box;
		max-width: 100%;
	}

	.tab-group .tab-group-header {
		background: #fff;
		border-bottom: 1rpx solid #e3e3e3;
	}

	.tab-group .tab-group-header .tab-group-item text {
		height: 100rpx;
		border-bottom: 2rpx solid transparent;
	}

	.tab-group .tab-group-header .tab-group-item.active text {
		color: #c10000;
		border-bottom-color: #c10000;
	}

	.tab-group .tab-group-body .tab-group-item {
		display: none;
	}

	.tab-group .tab-group-body .tab-group-item.active {
		display: block;
	}

	.comment-count {
		background: #fff;
		margin-bottom: 20rpx;
	}

	.comment-count .comment-count-item {
		text-align: center;
		padding: 20rpx 0;
		font-size: 9pt;
	}

	.comment-item {
		background: #fff;
		border-bottom: 1rpx solid #e3e3e3;
		padding: 32rpx 24rpx;
	}

	.comment-item .nickname {
		padding-left: 24rpx;
		height: 70rpx;
		font-weight: bolder;
	}

	.comment-item .addtime {
		color: #888;
	}

	.comment-item .pic-list {
		margin-left: -8rpx;
		margin-top: -8rpx;
	}

	.comment-item .pic-item {
		width: 200rpx;
		height: 200rpx;
		margin-left: 8rpx;
		margin-top: 8rpx;
		display: inline-block;
		float: left;
	}

	.comment-item .score-tag {
		display: inline-block;
		background: #eee;
		font-size: 9pt;
		padding: 4rpx 12rpx;
		border-radius: 5rpx;
	}

	.hide {
		display: none;
	}

	.miaosha-bar {
		height: 88rpx;
		position: relative;
	}

	.miaosha-bar .img_bg {
		width: 100%;
		height: 100%;
	}

	.miaosha-bar .activity_box {
		position: absolute;
		right: 50rpx;
	}

	.miaosha-bar-right {
		width: 240rpx;
	}

	.miaosha-bar-right>view {
		width: 100%;
	}

	.miaosha-bar .time-over-text {
		margin-top: 10rpx;
		text-align: center;
		font-size: 7pt;
		color: #c10000;
		line-height: 1;
	}

	.miaosha-bar .timer {
		text-align: center;
	}

	.miaosha-bar .timer-num {
		background: #fff;
		font-size: 7pt;
		color: #555;
		width: 44rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		display: inline-block;
		border-radius: 10rpx;
	}

	.miaosha-bar .timer-split {
		color: #fff;
		display: inline-block;
		height: 40rpx;
		line-height: 40rpx;
		margin: 0 8rpx;
	}

	/* 修改样式 */
	.miaosha-bar {
		height: 104rpx;
		font-size: 8pt;
	}

	.miaosha-bar .miaoshaHeader {
		padding: 14rpx 30rpx;
		padding-right: 18rpx;
		width: 100%;
		color: #fff;
		font-size: 8pt;
	}

	/* .miaosha-bar .over{background: #c10000;} */
	.miaosha-bar .future {
		background: #272D42;
	}

	.miaoshaImg image {
		width: 19rpx;
		height: 50rpx;
		margin-left: 14rpx;
		margin-top: 16rpx;
	}

	.miaosha-bar .timer-num {
		width: 34rpx;
		height: 34rpx;
		line-height: 34rpx;
		font-size: 7pt;
		font-weight: 600;
	}

	.miaosha-bar .miaoshaStatus {
		margin-top: 6rpx;
		margin-left: 10rpx;
	}

	.miaosha-bar .progress {
		width: 100%;
		height: 22rpx;
		line-height: 22rpx;
		text-align: center;
		font-size: 7pt;
		background: #fff;
		margin-top: 10rpx;
		border-radius: 8rpx;
	}

	.miaosha-bar view.pa {
		border-radius: 8rpx;
		height: 100%;
	}

	.miaosha-bar .overPro {
		background: #F7B436;
		max-width: 100%;
	}

	.miaosha-bar .futurePro {
		background: #286E00;
	}

	.miaosha-bar .progressText {
		position: relative;
		z-index: 2;
	}

	.miaosha-bar .original_price {
		text-decoration: line-through;
		margin-left: 6rpx;
	}

	.miaoshaHeader .blod {
		margin-right: 10rpx
	}

	.miao-label {
		margin-bottom: 5rpx;
		width: 50rpx;
		height: 25rpx;
		line-height: 25rpx;
		border-radius: 8rpx;
		background: #FFFFFF;
		font-size: 9px;
		text-align: center
	}

	.goods-goods {
		padding-bottom: 100rpx;
	}
</style>
