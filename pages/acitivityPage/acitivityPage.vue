<template>
	<view class="c-page">
		<common></common>
		<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="true">
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
		
		<!-- 生成海报 -->
		<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose" v-if="share_type == 'code'">
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
							<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode" :src="goods_qrcode"></image>
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
		</view>
		
		<!-- 内容部分 内容部分内容部分内容部分内容部分内容部分内容部分内容部分内容部分-->
		
		<view class="page ns-column">
			<view class="header pr">
				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
					<view class="backBtn" @tap="goBack"><text class="iconfont icon-zuojiantoubeifen"></text></view>
					<view></view>
					<view></view>
				</view>
				<image :src="bg" style="height: 100%;width: 100%;background: #ccc;position: absolute;top: 0rpx;left: 0rpx;z-index: -1;"></image>
				<view
					class="text-center"
					style="width: 50rpx;height: 50rpx;position: absolute;right: 24rpx;bottom: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
					@tap="showShareModal"
				>
					<view class="iconfont icon-fenxiang"></view>
					<view class="fs-18 color-fff" style="margin-top: -10rpx;">分享</view>
				</view>
				<view class="roll-tips flex-x-center align-center">
					<swiper autoplay="true" interval="5000" duration="300" vertical="true" circular="true" style="width: 300rpx;height: 52rpx;">
						<swiper-item v-for="(item, index) in scrollList" :key="index">
							<view class="flex-x-center align-center" style="width: 300rpx;height: 52rpx;">
								<view class="roll-tips-img"><image class="roll-tips-img bg-blue" mode="aspectFill" :src="item.avatar_url"></image></view>
								<view class="ml-10 fs-20 color-fff">恭喜 {{ item.name }} {{ item.msg }}</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="nav-tab flex align-center bg-white justify-between">
				<view
					v-for="(item, index) in navList"
					:key="index"
					:class="'fs-30 pr ' + (navIns == index ? 'color-333333' : 'color-999999')"
					:data-index="index"
					@tap="changeNav"
					style="margin-right: 46rpx;"
				>
					<view>{{ item }}</view>
					<view class="under-line" v-if="navIns == index"></view>
				</view>
			</view>
			<scroll-view scroll-y="true" style="height: calc(100vh - 372rpx);background-color: #F4F4F4;padding: 24rpx;" @scrolltolower="getMore">
				<!-- 必抢 -->
				<navigator
					v-for="(item, index) in miaoshaList"
					:key="index"
					:url="'/pages/miaosha/details/details?id=' + item.goods_id"
					class="goods-box flex mb-24"
					v-if="navIns == 0"
				>
					<view class="goods-img ns-flex-shrink-no">
						<image style="width: 100%;height: 100%;background-color: #ccc;" mode="aspectFill" :src="item.first_cover_pic"></image>
					</view>
					<view class="flex ns-column justify-between">
						<view>
							<view class="fs-28 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{ item.name }}</view>
							<view class="goods-desc color-FFA102 fs-22 ns-flex-shrink-no mt-16">{{ item.desc }}</view>
						</view>
						<view class="cu-progress" style="border-radius: 12rpx;">
							<view class :style="loading ? 'border-radius: 12rpx;width:61.8%;background:linear-gradient(-90deg,rgba(255,55,80,1),rgba(255,112,6,1));' : ''">
								61.8%
							</view>
						</view>
						<view class="flex justify-between">
							<view class="flex align-center ns-text-bold">
								<view class="color-FF0200">
									<text class="fs-28">¥</text>
									<text class="fs-36">{{ filters.priceStr(item.price)[0] }}.</text>
									<text class="fs-28">{{ filters.priceStr(item.price)[1] }}</text>
								</view>
								<!-- <view class="fs-28 color-999999 ml-16 ns-text-through">¥ {{item.original_price}}</view> -->
							</view>
							<view class="buy-btn fs-24 color-fff text-center" @tap.stop="openCart" :data-id="item.id" :data-index="index">马上抢</view>
						</view>
					</view>
				</navigator>
				<!-- 预告 -->
				<navigator v-for="(item, index) in miaoshaList" :key="index" hover-class="none" class="goods-box flex mb-24" v-if="navIns == 1">
					<view class="goods-img ns-flex-shrink-no">
						<image style="width: 100%;height: 100%;background-color: #ccc;" mode="aspectFill" :src="item.first_cover_pic"></image>
					</view>
					<view class="flex ns-column justify-between">
						<view>
							<view class="fs-28 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{ item.name }}</view>
							<view class="goods-desc color-FFA102 fs-22 ns-flex-shrink-no mt-16">{{ item.desc }}</view>
						</view>
						<view class="flex justify-between">
							<view class="flex align-center ns-text-bold">
								<view class="color-3DBB12">
									<text class="fs-28">¥</text>
									<text class="fs-36">{{ filters.priceStr(item.price)[0] }}.</text>
									<text class="fs-28">{{ filters.priceStr(item.price)[1] }}</text>
								</view>
								<!-- <view class="fs-28 color-999999 ml-16 ns-text-through">¥ {{item.original_price}}</view> -->
							</view>
							<view class="buy-btn fs-24 color-fff text-center" style="background: #3DBB12;" @tap.stop="openCart" :data-id="item.id" :data-index="index">加入</view>
						</view>
					</view>
				</navigator>
			</scroll-view>
			<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		</view>
		
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
</template>

<script>
// pages/acitivityPage/acitivityPage.js
var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
//商城多规格选择
var shareWay = require("../../components/share/share.js");
import slideIcon from '../../components/slideIcon/slideIcon';

export default {
	data() {
		return {
			navList: ['今日必抢', '明日预告'],
			navIns: 0,
			loading: false,
			page: 1,
			statusBar: getApp().globalData.statusBar,
			customBar: getApp().globalData.customBar,
			custom: getApp().globalData.custom,
			share_type: 'code',
			show_attr_picker: false,
			goods: '',
			goods_attr: '',
			attr_group_list: '',
			goods_qrcode_active: '',
			share_modal_active: '',
			goods_qrcode: '',
			showGetLogin: false,
			bg: '',
			miaoshaList: '',
			minGoodsInfo: '',
			scrollList: '',
			stopLoadMore: false,
			filters:require('../../utils/filters.js'),
			mrtj_sc:'',
			cartNum:0,
			//多规格开始
			show_attr_picker: false,
			is_show_first: false,
			isParameter: '',
			groupNum: '',
			role: '',
			 pageType: 'normal',
			 form:{
				 number:1
			 }
			//多规格结束
		};
	},

	components: {
		slideIcon
	},
	props: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let that = this;
		this.getApp().page.onLoad(this, options);
		setTimeout(function() {
			that.setData({
				loading: true
			});
		}, 500);
		this.getMiaosha();
		this.getScrollList();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.getCartNum();
		gSpecificationsModel.init(this);
		shareWay.init(this);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function(res) {
		var self = this;
		var title = '限时秒杀';

		if (res.from === 'button') {
			// 来自页面内转发按钮
			this.shareModalClose();
		}

		return self.getApp().page.onShareQp(this, '', title);
	},
	methods: {
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

		// 购物车相关
		openCart(e) {
			if(!uni.getStorageSync('ACCESS_TOKEN')){
				this.$store.commit('vuexSet',{
					name:'show_loginTpl',
					value:true
				})
				return;
			}
			var id = e.currentTarget.dataset.id;
			var index = e.currentTarget.dataset.index;
			var goods = this.miaoshaList[index];
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
		getGoodsQrcode: function() {
			var self = this;
			self.setData({
				goods_qrcode_active: 'active',
				share_modal_active: ''
			});

			if (self.goods_qrcode) {
				return true;
			}

			this.getQrcode();
		},

		getQrcode() {
			var picInfo = this.minGoodsInfo;
			var end_date = picInfo.end_date; // 结束时间获取

			var endTime = new Date(end_date * 1000);
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
			this.getApp().request({
				url: this.getApp().api.default.activity_qrcode,
				data: {
					goods_pic: picInfo.goods_pic,
					act_name: picInfo.act_name,
					price_str: picInfo.price_str,
					end_date: show_end_time,
					activity: picInfo.activity,
					qrcode_type: 12
				},
				success: res => {
					if (res.code == 0) {
						this.setData({
							goods_qrcode: res.data.pic_url
						});
					}

					if (res.code == 1) {
						this.goodsQrcodeClose();
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
								}
							}
						});
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
				this.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
				return ;
			}

			this.submit('ADD_CART');
		},
		submit: function(type) {
			var self = this;

			if (self.form.number > self.goods.num) {
				uni.showToast({
					title: '商品库存不足，请选择其它规格或数量',
					icon: 'none'
				});
				return true;
			}

			if (type == 'ADD_CART') {
				//加入购物车
				uni.showLoading({
					title: '正在提交',
					mask: true
				});
				this.getApp().request({
					url: this.getApp().api.cart.add_cart,
					method: 'POST',
					data: {
						goods_id: self.goods.id,
						sku: self.goods.sku,
						num: self.form.number,
						from: 4
					},
					success: function(res) {
						uni.hideLoading();
						self.getCartNum()
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

		changeNav(e) {
			var index = e.currentTarget.dataset.index;
			this.setData({
				navIns: index
			});
			this.getMiaosha();
		},

		getMiaosha: function() {
			var self = this;
			uni.showLoading({
				title: '加载中'
			});
			this.getApp().request({
				url: this.getApp().api.default.miaosha_list,
				data: {
					show_time: self.navIns,
					mode: 'page'
				},
				success: function(res) {
					if (res.code == 0) {
						self.setData({
							bg: res.data.banner.a,
							miaoshaList: res.data.list,
							minGoodsInfo: res.data.min_goods_info
						});
					}
				},
				complete: function() {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			});
		},

		getScrollList() {
			this.getApp().request({
				url: this.getApp().api.default.ms_record,
				success: res => {
					if (res.code == 0) {
						this.setData({
							scrollList: res.data
						});
					}
				}
			});
		},

		getMore() {
			var self = this;
			var page = self.page;
			var index = page;
			var data = {
				show_time: self.navIns,
				mode: 'page'
			};
			var url = this.getApp().api.default.miaosha_list;
			this.getApp().core.pading(self, url, data, function(res) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true
					});
					return;
				}

				var newGoodList = res.data.list;
				var nowGoodList = self.miaoshaList.concat(newGoodList);
				self.setData({
					miaoshaList: nowGoodList
				});
			});
		},
		//空函数
		shop(){},
		goodsQrcodeClick(){}
	}
};
</script>
<style>
@import url("~@/components/goods/specifications_Model.css");
.share-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);
	z-index: 10000;
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
.goods-qrcode-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;
	background: rgba(0, 0, 0, 0.5);
	padding: 0rpx 40rpx;
	padding-top: 140rpx;
	padding-bottom: 100rpx;
	transform: translateY(100%);
	opacity: 0.5;
	transition: opacity 250ms;
	visibility: hidden;
}

.goods-qrcode-body {
	height: 1052rpx;
	width: 608rpx;
	margin: 0 auto;
	border-radius: 10rpx;
	position: relative;
}

.goods-qrcode-modal.active {
	transform: translateY(0);
	opacity: 1;
	visibility: visible;
}

.goods-qrcode-modal .goods-qrcode-box {
	height: 100%;
	position: relative;
	box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
}

.goods-qrcode-modal .goods-qrcode-loading {
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}

.goods-qrcode-modal .goods-qrcode {
	top: 0;
	left: 0;
	position: absolute;
	width: 608rpx;
	height: 924rpx;
	background: #fff;
	display: none;
}

.goods-qrcode-modal .goods-qrcode.active {
	display: block;
}

.goods-qrcode-modal .goods-qrcode-close {
	position: absolute;
	right: 0rpx;
	padding: 15rpx;
}
.share-btn {
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

.shareShop {
	width: 508rpx;
	height: 616rpx;
	background: #fff;
	margin: 0 auto;
	border-radius: 13rpx 13rpx 0 0;
	transform: translateY(-100rpx);
}

.appcode-img {
	width: 250rpx;
	height: 250rpx;
	display: block;
	margin: 0 auto;
	transform: translateY(60rpx);
}

.shopHead {
	height: 246rpx;
	background: #1a4c4b;
	padding: 20rpx 0;
	color: #fff;
	text-align: center;
	font-size: 12px;
	border-radius: 13rpx 13rpx 0 0;
}

.shopHead image {
	width: 111rpx;
	height: 111rpx;
	border: 10rpx solid #f5f5f5;
	border-radius: 50%;
	display: block;
	margin: 0 auto;
}

.shopHead .font_blod {
	font-weight: 600;
	margin-top: 20rpx;
}

.shopBottom {
	text-align: center;
	font-size: 14px;
	color: #595959;
	letter-spacing: 0;
	height: 76rpx;
	background: #fff;
	border-radius: 0 0 13rpx 13rpx;
	position: relative;
	overflow: hidden;
}

.shopBottom > view:nth-child(2) {
	color: #c11111;
}
.shop-close {
	position: absolute;
	bottom: -52px;
	left: 50%;
	transform: translateX(-50%);
}
.page {
}
.header {
	width: 100%;
	height: 286rpx;
}
.con {
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	padding: 0 24rpx;
}

.backBtn {
	font-size: 36rpx;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
	color: #ffffff;
	opacity: 0.5;
}
.roll-tips {
	position: absolute;
	width: 366rpx;
	height: 54rpx;
	bottom: 25rpx;
	left: 24rpx;
	background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	border-radius: 25rpx;
}
.roll-tips-img {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
}
.nav-tab {
	padding: 25rpx 154rpx;
}
.nav-active {
	border-bottom: 8rpx solid #ffc901;
}
.under-line {
	position: absolute;
	left: 50%;
	width: 44rpx;
	height: 8rpx;
	background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	border-radius: 4rpx;
	margin-left: -22rpx;
	bottom: -24rpx;
}
.goods-box {
	padding: 16rpx;
	background-color: #fff;
	border-radius: 20rpx;
}
.goods-img {
	width: 248rpx;
	height: 248rpx;
	border-radius: 12rpx;
	margin-right: 24rpx;
	overflow: hidden;
}
.goods-desc {
	height: 30rpx;
	line-height: 30rpx;
	background: rgba(254, 248, 225, 1);
	border-radius: 6rpx;
	padding: 0 15rpx;
}
.buy-btn {
	width: 103rpx;
	height: 45rpx;
	line-height: 45rpx;
	background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
	border-radius: 23rpx;
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
</style>
