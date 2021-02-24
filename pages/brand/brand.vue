<template>
	<view>
		<common></common>

		<block>
			<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose"
			 v-if="sharePic">
				<view :class="'share-modal-body ' + __device" @tap.stop="stop">
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
			<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose"
			 v-if="share_type == 'code'">
				<view class="goods-qrcode-body flex-col" @tap.stop="stop">
					<view class="flex-grow-1" style="position: relative">
						<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
							<view class="goods-qrcode-box">
								<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
									<view class="flex-x-center flex-col">
										<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system.loading2.url"></image>
										<view style="color: #888">海报生成中</view>
									</view>
								</view>
								<image @tap="goodsQrcodeClick" mode="aspectFill" :class="'goods-qrcode ' + (goods_qrcode?'active':'')"
								 :data-src="goods_qrcode" :src="goods_qrcode"></image>
							</view>
						</view>
					</view>
					<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
						<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">保存图片</button>
						<button v-else style="opacity: .4">保存图片</button>
					</view>
					<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
						<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
					</view>
				</view>
			</view>
		</block>
		<view class="page">
			<block v-if="brand">
				<view class="nav pr" :style="'opacity: '+(transparent?0:1)+';'">
					<!-- 头部内容 -->
					<view class="activity-header" :style="'position: relative;z-index: 2;background: url(' + brand.background + ') no-repeat;background-size: 100% 100%;'">
						<view class="con flex justify-between align-center color-fff" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;'">
							<view class="backBtn flex1 flex align-center" @tap="goBack">
								<view class="iconfont icon-zuojiantoubeifen icon-box" :style="'height:' + ((customBar - statusBar)/2) + 'px;width: ' + ((customBar - statusBar)/2) + 'px;;'"></view>
							</view>
							<view class="flex1 text-center">品牌主页</view>
							<view class="flex1"></view>
						</view>
						<view style="position: absolute;right: 157rpx;top: 154rpx;">
							<view style="width: 50rpx;height: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
							 class="iconfont icon-guanzhu" @tap="brandAttention"></view>
							<view class="fs-20 text-center">关注</view>
						</view>
						<navigator hover-class="none" url="/pages/newSearch/newSearch" style="position: absolute;right: 82rpx;top: 154rpx;">
							<view style="width: 50rpx;height: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
							 class="iconfont icon-sousuo" @tap="toSearch"></view>
							<view class="fs-20 text-center">搜索</view>
						</navigator>
						<view style="position: absolute;right: 20rpx;top: 154rpx;">
							<view style="width: 50rpx;height: 50rpx;border-radius: 50%;background: rgba(0,0,0,0.4);text-align: center;line-height: 50rpx;color: #fff;"
							 class="iconfont icon-fenxiang" @tap="showShareModal"></view>
							<view class="fs-20 text-center">分享</view>
						</view>
						<view class="flex align-center">
							<image style="width: 100rpx;height: 100rpx;border-radius: 12rpx;background: #fff;" mode="aspectFill" :src="brand.img"></image>
							<view class="ml-24 color-fff" style="width: 440rpx;">
								<view class="fs-36 ns-text-bold" :data-text="brand.name" @longtap="copy">{{brand.name}}</view>
								<view class="fs-24 mt-20 ns-text-limit" style="width: 100%;">{{brand.desc}}</view>
							</view>
						</view>
					</view>
					<view class="tuijian-box" v-if="hotSaleList.length>0" style="position: relative;z-index: 4;">
						<view class="fs-30 color-333333 ns-text-bold">好评推荐</view>
						<view style="margin-top: 32rpx;">
							<scroll-view scroll-x="true" class="pr-24">
								<view class="flex">
									<navigator class="flex-grow-0 miaosha-goods" style="background: #fff;margin-right: 16rpx;width: 200rpx;" v-for="(item, key) in hotSaleList"
									 :key="key" :url="'/pages/goods/goods?id=' + item.id">
										<view class="pr">
											<image mode="aspectFill" style="width: 200rpx;height: 200rpx;border-radius: 20rpx;" :src="item.cover_pic"></image>
										</view>
										<view class="flex ns-align-items-flex-center" style="font-size:26rpx;">
											<view class="ms-price-tips">会员价</view>
											<view class="color-FF0200" style="margin-right:10rpx;font-weight:600">
												<text class="fs-20">￥</text><text>{{filters.priceStr(item.price)[0]}}</text>.<text class="fs-20">{{filters.priceStr(item.price)[1]}}</text>
											</view>
										</view>
										<view class="ns-text-limit fs-24 color-333333" style="margin-bottom: 14rpx;">{{item.name}}</view>
									</navigator>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 第二头 -->
				<!-- 第二头部开始 -->
				<view class="header_tow" v-show="transparent">
					<custom mode="2" background="#fff" title="品牌主页" backColor="#333" titleColor="#333"></custom>
					<view class="guang-nav-list flex justify-between pr" style="padding:0rpx 0rpx 0 24rpx;">
						<view class="more-content-two" v-if="showChangeMore_2">
							<!--  more-active -->
							<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')"
							 @tap="changeNav" :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
							</view>
						
						</view>
						<view style="width: 66%;">
							<!-- :scroll-into-view="toview" -->
							<scroll-view scroll-x="true" enable-flex="true">
								<view class="flex align-center">
									<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
										<view class="color-333333" @tap.stop="showChange1">全部品类
											<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore_2?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
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
							</scroll-view>
						</view>
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="commissionSort" v-if="role == 'shoper'">
							<view>佣金</view>
							<view class="ml-10 fs-40 color-D6D6D6">
								<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
								<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
							</view>
						</view>
						<view class="flex ml-20 ns-align-items-flex-center color-333333" @tap="priceSort">
							<view>价格</view>
							<view class="ml-10 fs-40 color-D6D6D6">
								<text v-if="priceDefault" class="iconfont icon-paixu"></text>
								<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
							</view>
						</view>

					</view>
				</view>
				<!-- 第二头部结束 -->
				<view style="background-color: #f4f4f4;">
					<view class="guang-nav-list flex ns-justify-content-space-between" :style="'padding:0rpx 0rpx 0 24rpx;opacity: '+(transparent?0:1)+';'">
						<view style="width: 66%;">
							<!-- :scroll-into-view="toview" -->
							<scroll-view scroll-x="true" enable-flex="true">
								<view class="flex align-center">
									<view style="margin-right:10rpx" :class="'pr nav-tab ns-flex-shrink-no ' + (chooseIns==0?'color-333333':'')">
										<view class="color-333333" @tap.stop="showChange1">全部品类
											<text :class="'iconfont icon-xiangxia-copy  ' + (showChangeMore?'change':'')" style="display:inline-block;transition:all 0.3s;"></text>
										</view>
										<!-- <view wx:if="{{chooseIns==0}}" class="nav-active"></view> -->
									</view>
									<!-- <view class="nav-tab flex-grow-0 ns-flex-shrink-no pr {{value.id==chooseIns?'color-333333':''}}" bindtap="changeNav"
									 wx:for="{{catsArr}}" wx:for-item="value" wx:key="id" wx:for-index="index" data-num="{{index}}" data-index="{{value.id}}"
									 data-text="{{value.catsName}}">
										<view>{{value.catsName}}</view>
										<view wx:if="{{value.id==chooseIns}}" class="nav-active"></view>
									</view> -->
									<scroll-view class="check-scroll" style="width:400rpx;" scroll-x>
										<view v-for="(value, index) in catsArr" :key="index" :class="'more-list  ' + (value.checked?'more-active':'')"
										 @tap="changeNav" v-if="value.checked" :data-num="index" :data-index="value.id" :data-text="value.catsName"
										 style="float:none;" enable-flex="true">{{value.catsName}}
											<text class="iconfont icon-guanbi2 fs-20"></text>
										</view>
									</scroll-view>

								</view>
							</scroll-view>
						</view>
						<view class="flex align-center">
							<view class="flex ml-20 align-center color-333333" @tap="commissionSort" v-if="role == 'shoper' && is_commission">
								<view>佣金</view>
								<view class="ml-10 fs-40 color-D6D6D6">
									<text v-if="commissionDefault" class="iconfont icon-paixu"></text>
									<text v-else :class="'iconfont color-F49E3A ' + (commissionUp?'icon-asc':'icon-shengxu')"></text>
								</view>
							</view>
							<view class="flex ml-20 align-center color-333333" @tap="priceSort">
								<view>价格</view>
								<view class="ml-10 fs-40 color-D6D6D6">
									<text v-if="priceDefault" class="iconfont icon-paixu"></text>
									<text v-else :class="'iconfont color-F49E3A ' + (priceUp?'icon-asc':'icon-shengxu')"></text>
								</view>
							</view>
						</view>

					</view>
					<block v-if="goodList.length>0">
						<view class="goods-list flex ns-wrap ns-justify-content-space-between pr" style="background: #F4F4F4;">
							<!-- 多选....................................................... -->
							<view class="more1" v-if="showChangeMore||showChangeMore_2" @tap.stop="closeChange" catchtouchmove="preventTouchMove"
							 @touchmove.stop.prevent="stop">
								<view class="more-content" v-if="showChangeMore">
									<!--  more-active -->
									<view v-for="(value, index) in catsArr" :key="index" :class="'more-list ' + (value.checked?'more-active':'')"
									 @tap="changeNav" :data-num="index" :data-index="value.id" :data-text="value.catsName">{{value.catsName}}
									</view>

								</view>
							</view>
							<!-- 内容 -->
							<navigator :url="'/pages/goods/goods?id=' + item.id" class="goods mb-20" v-for="(item, key) in goodList" :key="key">
								<view style="width: 340rpx;height: 340rpx;position: relative;">
									<image style="width: 340rpx;height: 340rpx;" mode="aspectFill" :src="item.cover_pic"></image>
									<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
								</view>
								<view class="goods-msg">
									<view class="goods-msg-title">{{item.name}}</view>
									<view :class="'fs-28 flex align-center ' + (role == 'shoper'?'':'justify-between')">
										<view class="flex align-center">
											<view class="fs-28 color-FF0200 ns-text-bold">￥<text class="fs-36">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
											<!-- <view class="color-8D8D8D ns-text-through ml-16">¥ {{item.original_price}}</view> -->
										</view>
										<view class="flex align-center ml-30" v-if="role == 'shoper' && item.commission > 0 && is_commission">
											<view class="zhuan-box">赚</view>
											<view class="fs-20 color-FF0200 ns-text-bold">￥
												<text class="fs-28">{{filters.priceStr(item.commission || '0.00')[0]}}.</text>
												<text>{{filters.priceStr(item.commission  || '0.00')[1]}}</text>
											</view>
										</view>
										<view class="add-cart-icon iconfont fs-24 color-fff icon-gouwuche_weixuanzhong" v-if="role != 'shoper'" style="width: 40rpx;height: 40rpx;line-height: 40rpx;"
										 @tap.stop="openCart(key)" :data-id="item.id" :data-index="key"></view>

									</view>
								</view>
							</navigator>

						</view>
					</block>
					<block v-else>
						<view class="flex-x-center" :style="hotSaleList.length>0?'padding-top: 212rpx;':'padding-top: 322rpx;'">
							<view class="iconfont icon-kong color-B0B0B0" style="font-size: 200rpx;"></view>

						</view>
						<view class="flex-x-center mt-30">
							<view class="ns-text-center fs-24 color-B0B0B0" style="width: 336rpx;">哎呀，手慢了，品牌活动已结束
								下次早点来哦～</view>
						</view>
					</block>
				</view>

			</block>
			<view class="flex-x-center color-8D8D8D ns-padding-bottom-sm" v-if="is_no_more">没有更多啦~</view>
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
			<view class="attr-picker" style="bottom: 0rpx" v-if="show_attr_picker" catchtouchmove="preventTouchMove" @tap="hideAttrPicker">
				<scroll-view class="content-box" style="bottom: 0rpx" @tap.stop="stop">
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
								</view>
							</block>
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
		<slide-icon :showPic="mrtj_sc" :cartNum="cartNum"></slide-icon>
		<!-- 多规格结束 -->
	</view>
</template>

<!-- <script module="filters" lang="wxs" src="../../utils/filters.wxs"></script> -->

<script>
	//商城多规格选择
	var gSpecificationsModel = require("../../components/goods/specifications_model.js"); //商城多规格选择
	var shareWay = require("../../components/share/share.js");
	import slideIcon from "../../components/slideIcon/slideIcon";
	import custom from '@/components/custom/custom.vue'
	export default {
		data() {
			return {
				chooseOpen: false,
				filters: require('../../utils/filters.js'),
				moren: '全部产品',
				cartNum: 0,
				priceDefault: true,
				commissionDefault: true, // 佣金排序
				commissionUp: true, // 佣金
				priceUp: true,
				cat_id: '',
				page: 1,
				count: 0,
				goodList: [],
				goodListMsg: [],
				chooseText: '',
				chooseIns: 0,
				x: getApp().globalData.windowWidth,
				y: getApp().globalData.windowHeight,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				pageType: 'normal',
				share_type: 'code',
				brand_id: "",
				cat: "",
				is_no_more: false,
				show_attr_picker: false,
				goods: {},
				goods_attr: [],
				attr_group_list: [],
				showGetLogin: false,
				user_info_show: false,
				goods_qrcode_active: "",
				share_modal_active: "",
				goods_qrcode: "",
				brand: {
					img: ''
				},
				hotSaleList: [],
				sort: "",
				by: "",
				stopLoadMore: false,
				goodBuy: false,
				//多规格变量
				is_show_first: false,
				isParameter: '',
				role: '',
				groupNum: 0,
				form: {
					number: 1
				},
				showChangeMore: false, //展示多选按钮
				showChangeMore_2: false,
				transparent: false,
				sharePic: '', // 分享卡片
				shareTitle: ''  // 分享卡片的标题
			};
		},
		props: {},
		components: {
			slideIcon,
			custom
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
			var self = this;
			this.getApp().page.onLoad(self, options);
			this.role = this.getApp().core.getStorageSync('role')
			if (options.scene && this.getApp().core.getStorageSync('s_id')) {
				this.getApp().request({
					url: this.getApp().api.default.get_share_info,
					data: {
						sid: this.getApp().core.getStorageSync('s_id')
					},
					success: res => {
						if (res.code == 0) {
							if (res.data.rel_id) {
								options.brand_id = res.data.rel_id;
								this.setData({
									brand_id: options.brand_id
								});
								uni.showLoading({
									title: '加载中'
								});
								this.loadData(options);
								this.getWalkGoodsList();
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
					brand_id: options.brand_id
				});
				uni.showLoading({
					title: '加载中'
				});
				this.loadData(options);
				this.getWalkGoodsList();
			} // wx.setNavigationBarTitle({
			// 	title:options.name
			// })

		},
		onShow: function() {
			gSpecificationsModel.init(this);
			shareWay.init(this);
			this.getCartNum();
		},

		onReachBottom() {
			var self = this;
			var page = self.page;
			var index = page;
			var data = {
				brand_id: self.brand_id,
				sort: self.sort || '',
				by: self.by || '',
			};
			var url = this.getApp().api.default.walk_goods_list;
			this.getApp().core.pading(self, url, data, function(res, index) {
				if (res.data.list.length == 0) {
					self.setData({
						stopLoadMore: true,
						is_no_more: true
					});
					return;
				}

				var newGoodList = res.data.list;
				var nowGoodList = self.goodList.concat(newGoodList);
				self.setData({
					goodList: nowGoodList
				});
			});
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var user_info = this.getApp().core.getStorageSync(this.getApp().const.USER_INFO);
			var mch_id = uni.getStorageSync('_mchInfo').id;
			var title = self.shareTitle;
			var img = self.sharePic
			// if (res.from === 'button') {
			// 	if (res.target.dataset.id) {
			// 		var path = 'id=' + res.target.dataset.id;
			// 		var imageUrl = res.target.dataset.image;
			// 	} else {
			// 		var path = "brand_id=" + self.brand_id;
			// 		var imageUrl = res.target.dataset.image;
			// 	}
			// } else {
			// 	var path = "brand_id=" + self.brand_id;
			// 	var imageUrl = self.brand.background;
			// }

			return this.getApp().page.onShareQp(this, 'brand_id=' + self.brand_id, title,img);
		},
		onPageScroll(e) {
			var self = this
			// clearTimeout(this.timer) // 每次滚动前 清除一次
			// this.scrollStop = false;
			// this.timer = setTimeout((e) => {
			// 	self.scrollStop = true;
			// }, 1000);
			// if (e.scrollTop > 200) {
			// 	this.is_top = true;
			// } else {
			// 	this.is_top = false;
			// }
			console.log(e.scrollTop);
			//控制头部隐藏显示
			if (e.scrollTop >= 290) {
				this.transparent = true;
			} else {
				this.transparent = false;
			}
		},
		onPullDownRefresh: function() {
			var self = this;
			uni.showLoading({
				title: '加载中'
			});
			this.getApp().request({
				url: this.getApp().api.default.brand_list,
				data: {
					brand_id: self.brand_id,
					cat_id: self.cat_id || '',
					page: 1
				},
				success: function(res) {
					// console.log('fffffffffffffffffffff',res)
					if (res.code == 0) {
						self.setData({
							// goodListMsg: res.data,
							// goodList: res.data.list.list,
							// count: res.data.list.row_count,
							brand: res.data,
							// cat: res.data.cat,
							page: 1,
							sort: '',
							by: '',
							discountDefault: true,
							priceDefault: true,
							is_no_more: false
						});
					}

					;
				},
				complete: function() {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				}
			});
		},
		methods: {
			//多选关闭
			showChange1: function() {
				console.log('我被点了');
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
			openChoose: function() {
				var self = this;
				this.setData({
					chooseOpen: !self.chooseOpen
				});
			},
			stop() {

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

			chooseAll: function() {
				var self = this;
				var catsArr = self.cat;
				var arr = [];

				for (let i in catsArr) {
					catsArr[i].checked = false;
				}

				self.setData({
					cat: catsArr,
					chooseIns: 0,
					cat_id: '',
					priceDefault: true,
					is_no_more: false
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.brand_list,
					data: {
						brand_id: self.brand_id
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goodList: res.data.list.list,
								count: res.data.list.row_count,
								page: 1
							});
						}
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			},
			toSearch: function() {
				uni.navigateTo({
					url: '/pages/allseach/allseach'
				});
			},
			toBrandDetail: function() {
				var self = this;
				uni.navigateTo({
					url: '/pages2/brandDetails/brandDetails?brand_id=' + self.brand_id
				});
			},

			// 购物车相关
			openCart(index) {
				var id = this.goodList[index].id;
				var goods = this.goodList[index];
				this.setData({
					show_attr_picker: true,
					goods: goods,

				});
				this.form.number = 1
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
				var token = this.getApp().core.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
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
			showShareModal: function() {
				var self = this;
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					self.setData({
						showGetLogin: true,
						user_info_show: true
					});
					self.$store.commit('vuexSet', {
						name: 'show_loginTpl',
						value: true
					})
					return;
				}
				self.setData({
					share_modal_active: "active",
					no_scroll: true
				});
				if (!self.sharePic) {
					self.getSharePic()
				}
			},
			getGoodsQrcode: function() {
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
				var self = this;
				var list = self.brand.min_goods_info;
				var activityMsg = self.brand;
				var activity_name = activityMsg.name;
				var imgUrl = list.first_cover_pic;
				var tmpprice = list.price; // 结束时间获取

				var data = {
					goods_pic: imgUrl,
					act_name: activity_name,
					price_str: tmpprice,
					activity: self.brand_id,
					page_url: 'pages/brand/brand',
					sidFsShare: 1
				};
				this.getApp().request({
					url: this.getApp().api.default.activity_qrcode,
					data: data,
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								goods_qrcode: res.data.pic_url
							});
						}
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
			// 开启分享前，先获取分享卡牌
			getSharePic() {
				var self = this
				var goods_name = self.brand.name
				var tmpprice = self.brand.min_goods_info.price; // 手机适配
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
						id: self.brand_id,
						type: '103',
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
				let self = this;
				this.getApp().request({
					url: this.getApp().api.default.brand_list,
					data: {
						brand_id: self.brand_id
					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								brand: res.data,
							});
						}

						;
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},

			getWalkGoodsList() {
				var self = this;
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list,
					data: {
						brand_id: self.brand_id
					},
					success: function(res) {
						if (res.code == 0) {
							var goodList = res.data.list
							var imgUrl = []
							for (let i in goodList) {
								if (i < 4) {
									imgUrl.push(goodList[i].cover_pic)
								} else {
									break
								}
							}
							self.setData({
								goodList: res.data.list,
								imgUrl: imgUrl.toString(),
							});
						}
					},
					complete: function() {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
				this.getApp().request({
					url: this.getApp().api.default.walk_goods_rec,
					data: {
						brand_id: self.brand_id,
						position: 3 // 1->商品详情页推荐， 2->购物车推荐， 3->品牌主页推荐

					},
					success: function(res) {
						if (res.code == 0) {
							self.setData({
								hotSaleList: res.data.list
							});
						}
					},
					complete: function() {
						uni.stopPullDownRefresh();
					}
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
						sort: '1',
					});
					this.getApp().request({
						url: this.getApp().api.default.walk_goods_list,
						data: {
							brand_id: self.brand_id,
							cat_id: self.cat_id,
							sort: self.sort,
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.list,
									page: 1
								});
							}

							;
						},
						complete: function() {}
					});
				} else {
					self.setData({
						sort: '5',
					});
					this.getApp().request({
						url: this.getApp().api.default.walk_goods_list,
						data: {
							brand_id: self.brand_id,
							cat_id: self.cat_id,
							sort: self.sort,
						},
						success: function(res) {
							uni.hideLoading();

							if (res.code == 0) {
								self.setData({
									goodList: res.data.list,
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
						sort: '3',
					});
					this.getApp().request({
						url: this.getApp().api.default.walk_goods_list,
						data: {
							brand_id: self.brand_id,
							cat_id: self.cat_id,
							sort: 3,
						},
						success: function(res) {
							if (res.code == 0) {
								self.setData({
									goodList: res.data.list,
									page: 1
								});
							}

							;
						},
						complete: function() {
							uni.hideLoading();
						}
					});
				} else {
					self.setData({
						sort: '2',
					});
					this.getApp().request({
						url: this.getApp().api.default.walk_goods_list,
						data: {
							brand_id: self.brand_id,
							cat_id: self.cat_id,
							sort: 2,
						},
						success: function(res) {
							if (res.code == 0) {
								self.setData({
									goodList: res.data.list,
									page: 1
								});
							}

							;
						},
						complete: function() {
							uni.hideLoading();
						}
					});
				}
			},
			// 复制标题
			copy: function(e) {
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
			changeNav: function(e) {
				let index = e.currentTarget.dataset.index;
				this.setData({
					chooseIns: index,
					priceDefault: true
				});
				uni.showLoading({
					title: '加载中'
				});
				this.getApp().request({
					url: this.getApp().api.default.brand_list,
					data: {
						brand_id: this.brand_id,
						cat_id: index
					},
					success: res => {
						uni.hideLoading();

						if (res.code == 0) {
							this.setData({
								goodList: res.data.list.list,
								count: res.data.list.row_count,
								page: 1
							});
						}

						;
					}
				});
			},
			buyShop: function(e) {
				var user_info = uni.getStorageSync(this.getApp().const.USER_INFO);
				uni.redirectTo({
					url: '/pages/goods/goods?id=' + e.currentTarget.dataset.id + '&user_id=' + user_info.id
				});
			},
			doNothing: function() {
				return;
			},
			//关注店铺品牌
			brandAttention() {
				var userId = uni.getStorageSync('USER_INFO').id;

				if (!userId) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
				} else {
					this.getApp().request({
						url: this.getApp().api.default.add_brand,
						method: 'POST',
						data: {
							brand_ids: this.brand_id || '',
							user_ids: userId
						},
						success: res => {
							if (res.code == 0) {
								uni.showToast({
									icon: 'none',
									title: '添加成功'
								});
							}
						}
					});
				}
			},
			goodsQrcodeClick() {},
		}

	}
</script>
<style>
	@import "./brand.css";
</style>
