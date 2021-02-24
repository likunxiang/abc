<template>
	<view class="page">
		<common></common>
		<block data-src="/components/goods/specifications_model.wxml"><view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="is_show_first">
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
	<view class="attr-picker" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + ' ' + (__device=='device_iphone_x'?'bottom: 175rpx':'')" v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
		<scroll-view class="content-box" :style="((pageType == 'group' || pageType == 'normal')?'bottom: 0rpx;':'') + '' + (__device=='device_iphone_x'?'bottom: 175rpx':'')" @tap.stop="stop">
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
								<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'') + ' ' + (item.isHave ?'':'attr_num_0')" :data-groupindex="groupindex" :data-childindex="childindex" @tap="item.isHave?'storeAttrClick':''">{{item.attr_name}}</text>
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
					<view class="flex flex-x-center" v-if="pageType == 'group' || !pageType || pageType == 'normal'">
						<view class="edit-standard-btn edit-standard-btn-yellow" @tap="addCart">确认</view>
					</view>
				</view>
			</scroll-view>
	
		</scroll-view>
	</view>
	<!-- 产品参数 -->
	<view class="attr-picker " :style="__device=='device_iphone_x'?'bottom: 175rpx':''" v-if="isParameter" catchtouchmove="preventTouchMove" @tap="closeParameter">
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
		<view class="header" :style="'background: url(' + groupImage + ');background-size: 100% 100%; background-repeat: no-repeat'">
			<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
				<view class="backBtn" @tap="goBack">
					<text class="iconfont icon-zuojiantoubeifen"></text>
				</view>
				<view></view>
				<view></view>
			</view>
			<view style="height: 250rpx;position: relative;">
				<view class="tips flex color-fff padding-left padding-right align-center" v-if="groupNotice">
					<view class="iconfont icon-tongzhi1 fs-40"></view>
					<view class="fs-24 ml-20">{{groupNotice}}</view>
				</view>
				<view class="roll-tips flex align-center color-fff" style="bottom: 165rpx;">
					<view class="fs-24 mr-16">距结束还剩 </view>
					<view class="flex ns-align-items-flex-center fs-20">
						<view class="time-box">{{ed?ed:'12'}}</view>
						<view>:</view>
						<view class="time-box">{{eh?eh:'36'}}</view>
						<view>:</view>
						<view class="time-box">{{em?em:'48'}}</view>
					</view>
				</view>
				<view class="roll-tips flex align-center">
					<swiper autoplay="true" interval="5000" duration="300" vertical="true" circular="true" style="width: 268rpx;height: 52rpx;">
						<swiper-item v-for="(item, index) in scrollList" :key="index">
							<view class="flex-x-center align-center" style="width: 268rpx;height: 52rpx;">
								<view class="roll-tips-img">
									<image class="roll-tips-img bg-blue" mode="aspectFill" :src="item.avatar_url"></image>
								</view>
								<view class="ml-10 fs-20 color-fff">
									恭喜 {{item.name}} {{item.msg}}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="text-center" style="width: 50rpx;height: 50rpx;position: absolute;right: 20rpx;bottom: 95rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;" @tap="showShareModal">
					<view class="iconfont icon-fenxiang"></view>
					<view class="fs-20 color-fff" style="margin-top: -10rpx;">分享</view>
				</view>
			</view>
		</view>
		
		
		<view class="flex justify-between align-center address-box">
			<view class="flex align-center ns-text-limit" style="width: 70%;">
				<view class="iconfont icon-dingwei fs-30 color-333333"></view>
				<view class="ml-20 fs-24 color-333333 ns-text-limit">{{pickAddress?pickAddress.address:'请选择地址'}}</view>
			</view>
			<navigator :url="'/member/groupPickUp/groupPickUp?id=' + groupId" class="flex align-center color-489A19 ns-flex-shrink-no">
				<view class="ml-20 fs-20 color-999999">请选择自提点</view>
				<view class="iconfont icon-jinru"></view>
			</navigator>
		</view>
		<scroll-view scroll-y="true" style="height: calc(100vh - 430rpx)" @scrolltolower="getMore">
			<view class="main p-24 flex justify-between ns-wrap">
				<navigator v-for="(item, index) in groupList" :key="index" :url="'/pages/goods/goods?id=' + item.id + '&from=' + item.from" hover-class="none" class="goods bg-white mb-20">
					<view>
						<image style="width: 340rpx;height: 340rpx;background-color: #ccc;" mode="aspectFill" :src="item.first_cover_pic"></image>
					</view>
					<view class="goods-msg">
						<view class="fs-28 color-333333 ns-text-limit">{{item.name}}</view>
						<view class="ziti flex align-center text-center fs-20 mb-16" style="color: #FFC330;" v-if="item.delivery_type == 2">
							<view style="border-right: 1rpx dashed #FFC330;width: 64rpx;">自提</view>
							<view class="flex1">{{item.delivery_str}}</view>
						</view>
						<!-- <view class="mt-30">
							<view class="type-box1 flex-x-center flex-y-center color-F49E3A fs-24" wx:if="{{item.delivery_type == 1}}">{{item.delivery_str}}</view>
							<view class="type-box2 flex-x-center flex-y-center color-489A19 fs-24" wx:else>{{item.delivery_str}}</view>
						</view> -->
						<view class="flex justify-between">
							<view class="flex color-FF0200">
								<view class="fs-28">¥ <text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
							</view>
							<view class="iconfont add-cart-icon icon-gouwuche_weixuanzhong fs-30 color-fff" @tap.stop="openCart" :data-id="item.id" :data-index="index"></view>
						</view>
					</view>
				</navigator>
			</view>
		</scroll-view>
		<view class="cart flex ns-align-items-flex-center ns-justify-content-space-between color-fff">
			<navigator url="/pages/index/index" class="ns-text-center flex1">
				<view class="iconfont icon-shouye fs-40"></view>
				<view class="fs-20">首页</view>
			</navigator>
			<navigator url="/pages/cart/cart" class="pr ns-text-center flex1">
				<view class="iconfont icon-show_goumai mr-10 fs-40"></view>
				<view class="fs-20">购物车</view>
				<view class="pa" v-if="cartNum>0" style="width: 30rpx;height: 30rpx;line-height:30rpx;overflow: hidden;text-align: center;top: 0rpx;right: 10rpx;background: #c10000;border-radius: 50%;font-size: 10px;">{{cartNum}}</view>
			</navigator>
		</view>
	
		<block data-src="/components/share/share.wxml">
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
	</view></block> 
	</view>
</template>



<script>
// pages/groupBuy/groupBuy.js
var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
//商城多规格选择
var share = require("../../components/share/share.js");

export default {
  data() {
    return {
		
	  filters:require('../../utils/filters.js'),
      share_modal_active: '',
      goods_qrcode_active: '',
      show_attr_picker: false,
      // 购物车
      pageType: 'group',
      page: 1,
      is_down: true,
      share_type: 'code',
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
      groupId: "",
      mch: "",
      scrollList: "",
      shareAcitivity: "",
      ed: "",
      eh: "",
      em: "",
      end_date: "",
      goods: "",
      groupNotice: "",
      groupImage: "",
      groupName: "",
      goods_attr: "",
      attr_group_list: "",
      showGetLogin: false,
      user_info_show: false,
      groupList: "",
      minGoodsInfo: "",
      no_scroll: false,
      is_commission: false,
      goods_qrcode: "",
      pickAddress: "",
      stopLoadMore: false,
      cartNum: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
              this.setData({
                groupId: res.data.rel_id,
                mch: uni.getStorageSync('_mchInfo')
              });
              this.checkGroupGoods();
              this.getScrollList();
              setInterval(this.timeData, 60000);
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
      this.setData({
        groupId: options.id,
        mch:uni.getStorageSync('_mchInfo')
      });
      this.checkGroupGoods();
      this.getScrollList();
      setInterval(this.timeData, 60000);
    } // if (options.scene) {
    // 	var scene = decodeURIComponent(options.scene);
    // 	var scene_obj = getApp().helper.scene_decode(scene);
    // 	if (scene_obj.id) {
    // 		this.setData({
    // 			groupId: scene_obj.id,
    // 			mch: getApp().core.getStorageSync('_mchInfo'),
    // 		})
    // 	}
    // } else {
    // 	this.setData({
    // 		groupId: options.id,
    // 		mch: getApp().core.getStorageSync('_mchInfo'),
    // 	})
    // }


    uni.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCartNum();
    gSpecificationsModel.init(this);
    share.init(this);
    var pickAddress = uni.getStorageSync('PICK_ADDRESS');
    this.setData({
      pickAddress: pickAddress
    });
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
    this.getGroupGoods();
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
    var title = '社区团购第一波开抢啦~源头直供品质保障，售后无忧';
    var user_info = this.getApp().getUser();
    var mch_info = uni.getStorageSync('_mchInfo');

    switch (res.from) {
      case 'button':
        var res = {
          path: "/pages/QPgroupBuy/QPgroupBuy?id=" + self.groupId + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: title,
          imageUrl: self.shareAcitivity
        };
        self.shareModalClose();
        break;

      case 'menu':
        var res = {
          path: "/pages/QPgroupBuy/QPgroupBuy?id=" + self.groupId + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
          title: title
        };
        break;

      default:
        break;
    }

    return res;
  },
  methods: {
    goBack() {
      uni.navigateBack({
        fail: res => {
          uni.redirectTo({
            url: '/pages/index/index'
          });
        }
      });
    },

    getScrollList() {
      this.getApp().request({
        url: this.getApp().api.group.get_buy_record,
        success: res => {
          if (res.code == 0) {
            this.setData({
              scrollList: res.data
            });
          }
        }
      });
    },

    getBackground() {
      this.getApp().request({
        url: this.getApp().api.group.get_pick_backgroud,
        success: res => {
          if (res.code == 0) {
            this.setData({
              shareAcitivity: res.data.share_activity,
              is_down: true
            });
          } else {
            uni.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    // 倒计时
    timeData: function () {
      var self = this;
      var end_date = self.end_date;
      var ed, eh, em;
      ed = Math.floor(end_date / 60 / 60 / 24);
      eh = Math.floor(end_date / 60 / 60 % 24);
      em = Math.floor(end_date / 60 % 60);

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
          end_date: end_date - 60
        });
      }
    },

    // 购物车相关
    openCart(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      var goods = this.groupList[index];
      this.setData({
        show_attr_picker: true,
        goods: goods,
        ['form.number']: 1
      });
      this.getGoodsAttr(id);
    },

    checkGroupGoods() {
      this.getApp().request({
        url: this.getApp().api.group.check_group,
        success: res => {
          if (res.code == 0) {
            let id = res.data.id;
            this.setData({
              groupId: id,
              groupNotice: res.data.notice,
              groupImage: res.data.image,
              groupName: res.data.name
            });

            if (!uni.setStorageSync('groupId', id)) {
              uni.setStorageSync('groupId', id);
            }

            this.getGroupGoods(id);
          } else {}
        }
      });
    },

    getGoodsAttr: function (id) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.default.goods_attr,
        data: {
          id: id,
          from: 4
        },
        success: function (res) {
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
    addCart: function () {
      var self = this;
      var token = uni.getStorageSync('ACCESS_TOKEN');

      if (!token) {
        self.setData({
          showGetLogin: true,
          user_info_show: true
        });
		this.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
        return;
      }

      this.submit('ADD_CART');
    },
    submit: function (type) {
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
        self.getApp().request({
          url: self.getApp().api.cart.add_cart,
          method: "POST",
          data: {
            goods_id: self.goods.id,
            sku: self.goods.sku,
            num: self.form.number,
            from: 4
          },
          success: function (res) {
            uni.hideLoading();
            uni.showToast({
              title: res.msg,
              duration: 1500,
              icon: 'none'
            });
            self.setData({
              show_attr_picker: false
            });
            self.getCartNum();
			self.sendEvent("加入购物车", {
				"商品名称": self.goods.name,
				"商品ID": self.goods.id,
			})
          }
        });
      }
    },

    getGroupGoods() {
      this.getApp().request({
        url: this.getApp().api.group.group_list,
        data: {
          community_group_buy_id: this.groupId
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              end_date: res.data.surplus_time,
              groupList: res.data.list,
              minGoodsInfo: res.data.min_goods_info
            });
            this.timeData();
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

    showShareModal: function () {
      var self = this;
      this.getBackground();
      self.setData({
        share_modal_active: "active",
        no_scroll: true
      });
    },
    shareModalClose: function () {
      var self = this;
      self.setData({
        share_modal_active: "",
        no_scroll: false,
        is_down: false
      });
    },
    shareModalClose: function () {
      var self = this;
      self.setData({
        share_modal_active: "",
        no_scroll: false,
        is_commission: true
      });
    },
    getGoodsQrcode: function () {
      var self = this;
      self.setData({
        goods_qrcode_active: "active",
        share_modal_active: ""
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
          qrcode_type: 14
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
              title: "提示",
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {}
              }
            });
          }
        }
      });
    },

    saveGoodsQrcode: function () {
      var self = this;

      if (!uni.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        uni.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      uni.showLoading({
        title: "正在保存图片",
        mask: false
      });
      self.downloadFile({
        url: self.goods_qrcode,
        success: function (e) {
          uni.showLoading({
            title: "正在保存图片",
            mask: false
          });
          uni.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function () {
             uni.showModal({
                title: '提示',
                content: '商品海报保存成功',
                showCancel: false
              });
            },
            fail: function (e) {
             uni.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete: function (e) {
             uni.hideLoading();
            }
          });
        },
        fail: function (e) {
         uni.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.goods_qrcode,
            showCancel: false
          });
        },
        complete: function (e) {
         uni.hideLoading();
        }
      });
    },

    getMore() {
      var self = this;
      var page = self.page;
      var index = page;
      var data = {
        community_group_buy_id: this.groupId
      };
      var url = this.getApp().api.group.group_list;
      this.getApp().core.pading(self, url, data, function (res) {
        if (res.data.list.length == 0) {
          self.setData({
            stopLoadMore: true
          });
          return;
        }

        var newGoodList = res.data.list;
        var nowGoodList = self.groupList.concat(newGoodList);
        self.setData({
          groupList: nowGoodList
        });
      });
    },

    getCartNum: function () {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.default.cartCount,
        success: function (res) {
          if (res.code == 0) {
            self.setData({
              cartNum: res.data.count
            });
          }
        }
      });
    }
  }
};
</script>
<style>
/* pages/groupBuy/groupBuy.wxss */
@import "../../components/goods/specifications_model.css";
@import "../../components/share/share.css"; 
page {
	background-color: #F8F8F8;
	height: 100%;
}
.add-cart-icon {
	width: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	background-color: #F23005;
	border-radius: 50%;
}

.ziti {
	width: 170rpx;
	height: 38rpx;
	line-height: 34rpx;
	border: 2rpx solid #FFC330;
	border-radius: 19rpx;
}
.page {
	height: 100%;
}
.header {
	width: 100%;
	background-color: #ccc;
}
.time-box {
	width: 34rpx;
	height: 40rpx;
	text-align: center;
	line-height: 40rpx;
	background: #fff;
	font-size: 22rpx;
	color: #080808;
	margin: 0 5rpx;
	font-weight: bold;
	border-radius: 8rpx;
}
.con {
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	padding: 0 24rpx;
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
	font-size: 36rpx;
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
	color: #FFFFFF;
	opacity: 0.5;
}
.tips {
	position: absolute;
	bottom: 0rpx;
	height: 72rpx;
	line-height: 72rpx;
	width:100%;
	height:72rpx;
	background:rgba(0,0,0,0.5);
	z-index: 1;
}
.share-btn1 {
	position: absolute;
	top: 25rpx;
	right: 30rpx;
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background-color: #489A19;
	z-index: 1;
}
.roll-tips {
	padding-left: 12rpx;
	position: absolute;
	width: 368rpx;
	height: 54rpx;
	bottom: 95rpx;
	left: 24rpx;
	background:rgba(0,0,0,0.5);
	border-radius:25rpx;
}
.roll-tips-img {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
}
.goods {
	width: 340rpx;
	border-radius: 20rpx;
	overflow: hidden;
}
.goods-msg {
	padding: 16rpx;
}
.cart {
	position: fixed;
	bottom: 90rpx;
	width: 228rpx;
	height: 80rpx;
	padding: 5rpx 30rpx;
	background:rgba(46,46,46,0.7);
	border-radius: 0 6rpx 6rpx 0;
}
.address-box {
	height:70rpx;
	padding: 0rpx 25rpx;
	background:rgba(255,255,255,1);
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
.share-modal-body text.close{
  width: 28rpx;height: 28rpx;right: 34rpx;top: 34rpx;
}
.share-modal-body .shareGet{
  color: #2c2c2c;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 20rpx;
}
.share-modal-body .tips{color:#D6D6D6;font-size: 12px;margin-bottom:90rpx;}
.shareGet span{color:#c10000;margin-left: 10rpx;}
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
	background: #4CB202;
}

.share-modal .share-bottom:active image {
    opacity: 0.7;
}

.share-modal .share-modal-close {
    background: #fff;
    height: 100rpx;
    border-top: 1rpx solid #eee;
}

/* 生成二维码 */
.goods-qrcode-modal{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0,0,0,.5);
    padding: 40rpx;
    transform: translateY(100%);
    opacity: .5;
    transition: opacity 250ms;
    visibility: hidden;
}

.goods-qrcode-modal.active{
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

.goods-qrcode-body{
    background: #fff;
    height: 100%;
    border-radius: 10rpx;
    z-index: 99999;
}

.goods-qrcode-modal .goods-qrcode-box{
    height: 100%;
    position: relative;
    box-shadow: 0 0 15rpx rgba(0,0,0,.15);
}

.goods-qrcode-modal .goods-qrcode-loading{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
}

.goods-qrcode-modal .goods-qrcode{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    display: none;
}

.goods-qrcode-modal .goods-qrcode.active{
    display: block;
}

.goods-qrcode-modal .goods-qrcode-close{
    position: absolute;
    top:40rpx;
    right: 40rpx;
    padding: 15rpx;
}
.shareShop {
	width: 508rpx;
	height: 616rpx;
	background: #fff;
	margin: 0 auto;
	border-radius: 13rpx 13rpx 0 0;
	transform: translateY(-100rpx)
}

.appcode-img {
	width: 250rpx;
	height: 250rpx;
	display: block;
	margin: 0 auto;
	transform: translateY(60rpx)
}

.shopHead {
	height: 246rpx;
	background: #1A4C4B;
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

.shopBottom>view:nth-child(2) {
	color: #c11111;
}
.shop-close {
	position: absolute;
	bottom: -52px;
	left: 50%;
	transform: translateX(-50%)
}
</style>