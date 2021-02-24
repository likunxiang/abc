<template>
	<view class="index_index">
		<common></common>
		<!-- 头部开始 头部开始 头部开始 头部开始 头部开始 头部开始 头部开始 -->
		<view class="cu-custom-index" id="header" :style="'position: fixed;z-index: 10;background:#F4F4F4 url(' + header_bg + ') no-repeat;background-size: 100% 100%;'">

			<view class="pr" style="width: 100%;height: 100%;padding: 0 25rpx 24rpx;background:rgba(0,0,0,0.5);">

				<view class="con flex justify-between align-center" :style="'height:' + customBar + 'px;padding: 0 24rpx;padding-top:' + statusBar + 'px;'">
					<view></view>
					<view class="fs-36 text-bold color-fff">{{bar_title}}</view>
					<view></view>
				</view>
				
				<view class="flex ns-text-center align-center" style="position: absolute;right: 25rpx;bottom: 30rpx;" v-if="role == 'shoper'">

					<view class="call-shoper flex align-center ml-16" @click="showToMch">
						<view class="iconfont icon-ren11 fs-20 color-fff" style="margin-right: 6rpx;"></view>
						<view class="fs-24 color-fff">邀请开店</view>
					</view>
				</view>
				<view class="flex ns-text-center align-center" style="position: absolute;right: 25rpx;bottom: 30rpx;" v-else-if="vipLevel < 2">
					<view style="background: #fff;padding: 3rpx 4rpx;border-radius: 12rpx;">
						<view class="call-shoper flex align-center" style="background: #fff;border: 1rpx solid #F23005;border-radius: 10rpx;padding: 16rpx;height: 50rpx;" @click="changeAddMch">
							<view class="fs-20 color-F23005">免费领会员卡</view>
							<view class="iconfont fs-20 icon-jinru color-fff" style="margin-left: 6rpx;width: 26rpx;height: 26rpx;border-radius: 50%;background: linear-gradient(90deg, #FE4001, #EB0301);line-height: 26rpx;"></view>
						</view>
					</view>
				</view>
				<view class="flex ns-text-center align-center" style="position: absolute;right: 25rpx;bottom: 30rpx;" v-else>

					<navigator url="/member/homePage/homePage" class="call-me flex align-center ml-16">
						<view class="iconfont icon-weixin call-me-bg fs-20"></view>
						<view class="fs-24 color-fff">联系我</view>
					</navigator>
				</view>
				<view class="headerShop flex align-center">
					<image v-if="mch.logo" :src="mch.logo" class="slide-image pull-left"></image>
					<image v-else-if="mch.user.avatar_url" :src="mch.user.avatar_url?mch.user.avatar_url:user.avatar_url" class="slide-image pull-left"></image>
					<block v-if="mch.desc && mch.desc!=''">
						<view class="headInfo" style="margin-top: 4rpx;">
							<view v-if="mch.name" class="font_blod fs-30">{{filters.substring(mch.name,11)}}</view>
							<view class="describe fs-20 mt-10">{{mch.desc}}</view>
						</view>
					</block>
					<block v-else>
						<view class="headInfo mt-20">
							<view v-if="mch.name" class="font_blod fs-32">{{filters.substring(mch.name,11)}}</view>
							<view class="describe fs-24 mt-15 flex">
								同样的钱 更好的货 同样的货 更低的钱

							</view>
						</view>
					</block>
				</view>
			</view>
		</view>

		<view :style="'opacity:' + (headerHeigh!=0?1:0)+';'">

			<view class="cu-custom-index" :style="'width: 100%;height:' + headerHeigh + 'px;'"></view>
			<!-- 头部结束 头部结束 头部结束 头部结束 头部结束 头部结束 -->
			<!-- 滚动公告轮播开始 -->
			<view class="ns-text-xs " style="padding-bottom: 10rpx;padding-top: 15rpx; width:100%;">
				<view style="height: 36rpx;">
					<swiper autoplay="true" interval="3000" duration="1000" style="height: 36rpx ;" vertical="true" :disable-touch="true"
					 easing-function="linear" circular="true" >
						<swiper-item v-for="(item, index) in module_list.msg" :key="index">
							<view class="flex align-center" v-if="module_list.msg.length>0">
								<view>
									<view style="margin-left:25rpx;width:36rpx;height:36rpx;font-size: 30rpx;color: #F23005;background-color: #fff;"
									 class="iconfont icon-laba round text-center"></view>
								</view>
								<view class="color-999999 ns-padding-horizontal-xs">{{item.title}}</view>
								<rich-text class="color-999999" :nodes="item.content"></rich-text>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!-- 滚动公告轮播结束 -->
			<!-- 活动轮播图开始 -->
			<view class="swiper-box" style="height: 259rpx!important;" v-if="module_list.banner&&module_list.banner.length>0">
				<swiper v-if="module_list.banner&&module_list.banner.length>0" class="muSwiper" indicator-active-color="#F23005"
				 style="width: 100%;border-radius: 20rpx;overflow: hidden;" indicator-dots="true" circular="true" autoplay="true"
				 interval="5000" duration="500">
					<swiper-item v-for="(item, index) in module_list.banner" :key="index" style="">
						<navigator style="width: 100%;height: 259rpx;" :url="item.page_url">
							<image style="width: 100%;height: 259rpx;border-radius: 20rpx;" :src="item.pic_url" mode="aspectFill"></image>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 活动轮播图结束 -->
			
			<!-- 搜索开始 -->
			<view class="flex flex-y-center pl-24  mt-24 fs-24 mb-20" style="margin-right: 10rpx;margin-top: 40rpx;margin-bottom: 40rpx;">
				<image :src="init_img.c_qdg" style="width: 140rpx;height: 56rpx;" mode=""></image>
				<navigator class="flex-1" hover-class="none" url="/pages/newSearch/newSearch">
					<view class="flex flex-1 flex-y-center" style="height: 56rpx;margin-left: 24rpx;border-radius: 28rpx;background-color: #FFFFFF;">
						<text class="iconfont icon-sousuo " style="color: #F23005;padding-left: 12rpx;font-size: 28rpx;"></text>

						<input class="flex-1 fs-24" disabled style="height: 56rpx;padding-left: 12rpx;padding-right: 12rpx;" type="text"
						 placeholder="请输入关键词" />

						<text class="flex flex-x-center flex-y-center fs-24" style="background-color:#F23005;width: 100rpx;height: 50rpx; border-radius: 25rpx;color: #FFFFFF;margin-right: 5rpx;">搜索</text>
					</view>
				</navigator>
			</view>
			<!-- 搜索结束 -->

			<view class="bodypr">


				<!-- 秒杀开始 -->
				<view v-if="module_list.miaosha.length > 0" class="user-block" style="margin-top: 0;padding: 0rpx;">
					<view class="msHeader pr flex align-end">
						<view class="msHeader-while">
							<view class="flex align-center">
								<view class="tab-title">限时秒杀</view>
							</view>
						</view>
						<view class="msHeader-red">
							<navigator url="/pages/acitivityPage/acitivityPage" class="flex-grow-0 flex-row flex-y-center" hover-class="none">
								<view style="margin-right: 12rpx;color:#fff;font-size:22rpx">更多秒杀<text class="iconfont icon-jinru ml-10" style="border-radius: 50%;background:#fff;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;color: #ff4341;"></text></view>
							</navigator>
						</view>
						<view class="san-while"></view>
					</view>
					<view class="ms-main">
						<scroll-view scroll-x="true" v-if="module_list.miaosha.length > 0">
							<view class="flex">
								<navigator v-for="(item, index) in module_list.miaosha" :key="index" class="flex-grow-0 miaosha-goods" style="background: #fff;margin-right: 16rpx;width: 200rpx;"
								 :url="'/pages/miaosha/details/details?id=' + item.id">
									<view class="pr">
										<image mode="aspectFill" style="width: 200rpx;height: 200rpx;border-radius: 20rpx;" :src="item.first_cover_pic"></image>
										<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
									</view>
									<view class="miaosha_price flex ns-align-items-flex-center" style="font-size:26rpx;">
										<view class="ms-price-tips">秒杀价</view>
										<view class="color-FF0200" style="margin-right:10rpx;font-weight:600">
											<text class="fs-20">￥</text><text>{{filters.priceStr(item.price)[0]}}</text>.<text class="fs-20">{{filters.priceStr(item.price)[1]}}</text>
										</view>
									</view>
									<view class="ns-text-limit fs-24 color-333333" style="margin-bottom: 14rpx;">{{item.name}}</view>
									<view class="ms-btn fs-24">立即抢购</view>
								</navigator>
							</view>
						</scroll-view>
						<view class="noneGoods" v-else>
							暂无秒杀商品
						</view>
					</view>
				</view>
				<!-- 秒杀结束 -->
				<!-- 拼团开始 -->
				<view v-if="module_list.pintuan.length>0" class="user-block" style="margin-top: 24rpx;;padding: 0rpx;">
					<view class="msHeader pr flex align-end">
						<view class="msHeader-while">
							<view class="flex align-center">
								<view class="tab-title">实力拼团</view>
							</view>
						</view>
						<view class="msHeader-red">
							<navigator url="/pages2/ptNew/ptNew" class="flex-grow-0 flex-row flex-y-center" hover-class="none">
								<view style="margin-right: 12rpx;color:#fff;font-size:22rpx">更多拼团<text class="iconfont icon-jinru ml-10" style="border-radius: 50%;background:#fff;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;color: #ff4341;"></text></view>
							</navigator>
						</view>
						<view class="san-while"></view>
					</view>
					<scroll-view scroll-x="true" style="background: #fff;;padding-left:30rpx;padding-top: 30rpx;" v-if="module_list.pintuan.length>0">
						<view class="flex-row miaosha-goods-list">
							<navigator v-for="(item, index) in module_list.pintuan" :key="index" class="flex-grow-0 miaosha-goods " style="background: #fff;"
							 :url="'/pages/pt/details/details?id=' + item.goods_id">
								<form report-submit="true" @submit="_formIdSubmit">
									<button formType="submit" id="_formIdSubmit" style="padding: 0;background: #fff;">
										<view class="pr">
											<image lazy-load="true" mode="aspectFill" :src="item.first_cover_pic"></image>
											<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
										</view>
										<view class="miaosha_price flex ns-align-items-flex-center" style="font-size:28rpx;">
											<view class="ms-price-tips" style="white-space: nowrap;">拼团价</view>
											<view class="color-FF0200" style="margin-right:10rpx;font-weight:600">
												<text class="fs-20">￥</text><text>{{filters.priceStr(item.price)[0]}}</text>.<text class="fs-20">{{filters.priceStr(item.price)[1]}}</text>
											</view>
										</view>
										<view class="ns-text-limit fs-24 color-333333" style="margin-bottom: 14rpx;">{{item.name}}</view>
										<view class="ms-btn fs-24">立即抢购</view>
									</button>
								</form>
							</navigator>
						</view>
					</scroll-view>
					<view class="noneGoods" v-else>
						暂无拼团商品
					</view>
				</view>
				<!-- 拼团结束 -->

				<!-- 店主推荐开始 -->
				<view class="user-block" v-if="newActsList.length>0">
					<!-- v1.12素材推荐 -->
					<view v-for="(value, index) in newActsList" :key="index" style>
						<view class="flex align-center justify-between mb-24">
							<view class="flex align-center">
								<view class="tab-tips"></view>
								<view class="tab-title">{{value.name}} {{value.list?value.list[0].show_style?value.list[0].show_style:'':''}}</view>
							</view>
							<view class>
								<navigator :url="'/pages/homeGoods/homeGoods?id=' + value.id + '&pageName=' + value.name" style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多<text
									 class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background:#F23005;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text></navigator>
							</view>
						</view>
						<block>
							<view v-for="(item, id) in value.list" :key="id">
								<!-- 一行 -->
								<view class="bg-white mb-24" style="border-radius: 20rpx;" v-if="item.out_type == 2">
									<!-- 单品牌内容 -->
									<!-- 品牌名字 -->
									<active :item='item' :goodsList="item.activity_data.goods"></active>
								</view>
								<!-- 单商品 -->
								<view v-if="item.out_type == 1">
									<view>
										<navigator :url="'/pages/goods/goods?id=' + item.out_id" class="goods-box mb-24 bg-white">
											<view class="goods-img pr">
												<!-- <image style="width: 100%;height: 100%;" mode="aspectFill" src="{{item.first_cover_pic}}"></image> -->
												<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item.cover_pic"></image>
												<view class="tips" v-if="item.is_show_icon == 1">{{item.icon_label}}</view>
												<view v-if="item.goods_num==0" class="nonum-tip">已抢光</view>
											</view>
											<view class style="padding: 18rpx 26rpx 25rpx 16rpx;">
												<view>
													<view class="fs-30 color-333333 ns-text-limit2" style="line-height: 42rpx;">{{item.goods_name}}</view>
													<view class="fs-24 color-9B9B9B ns-text-limit2" style="margin-top: 6rpx;" v-if="item.content">
														<rich-text :nodes="item.content"></rich-text>
													</view>
												</view>
												<view class="flex justify-between align-center" style="margin-top: 21rpx;">
													<view class="flex align-center">
														<view class="color-FF343B ns-text-bold">
															<text class="fs-24">¥</text><text style="font-size: 48rpx;">{{filters.priceStr(item.goods_price)[0]}}.</text><text
															 class="fs-24">{{filters.priceStr(item.goods_price)[1]}}</text>
														</view>
														<view class="fs-24 color-9B9B9B ml-10 ns-text-through" style="margin-top: 15rpx;" v-if="item.goods_original_price">¥
															{{item.goods_original_price}}</view>
													</view>
													<!-- <view class="add-cart-icon fs-30 iconfont icon-gouwuche_weixuanzhong color-fff" catchtap="openCart" data-id="{{item.id}}"
															 data-index="{{index}}"></view> -->
													<view class="flex align-center">
														<!-- <view class="iconfont icon-fatusucaiku material-icon mr-20"></view> -->
														<view class="flex justify-end">
															<navigator :url="'/member/topic/topic?ht_id=' + item.ht_id + '&id=' + item.id" class="material-icon align-center flex-x-center"
															 v-if="item.ht_id > 0" @tap.stop="stop">
																<text class="fs-24">好物说</text>
															</navigator>
														</view>
														<view v-if="role=='shoper'">
															<button open-type="share" class="add-cart-btn color-fff flex align-center ml-30" @tap.stop="stop" v-if="item.share_content"
															 data-type="one_key_share_goods" :data-text="item.share_content" :data-id="item.goods_id" :data-htid="item.ht_id" :data-name="item.goods_name"
															 :data-pic="item.cover_pic">
																<view class="plr-20 fs-24">一键转发</view>
															</button>
															<button open-type="share" class="add-cart-btn color-fff flex align-center ml-30" @tap.stop="stop" v-else
															 data-type="one_key_share_goods" :data-text="item.share_content" :data-id="item.goods_id" :data-htid="item.ht_id" :data-name="item.goods_name"
															 :data-pic="item.cover_pic">
																<view class="plr-20 fs-24">转发</view>
															</button>
														</view>
														<view v-else>
															<navigator class="add-cart-btn color-fff flex align-center ml-30 fs-24 plr-20" :url="'/pages/goods/goods?id=' + item.out_id"
															 @tap.stop="stop">立即抢</navigator>
														</view>

													</view>
												</view>
											</view>
										</navigator>
									</view>
								</view>
								<!-- 话题开始 -->
								<view v-if="item.out_type == 3">
									<topic :item='item' @needLogin="needLogin"></topic>
								</view>
								<!-- 话题结束 -->
							</view>
						</block>
					</view>
				</view>
				<!-- 清仓开始 -->
				<view class="user-block" v-if="module_list.huodongs[0].length > 0" style="margin-top: 0rpx;">
					<!-- <view class="flex-row miaosha-header">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="font-size: 32rpx;color: #2c2c2c;margin-right: 30rpx;font-weight:600;margin-left:11rpx;">品牌专场</view>
						<view class="bottomLine"></view>
					</view> -->
					<!-- <navigator url="/pages/activity/activity?activity_id={{item.id}}" class="flex-grow-0 flex-row flex-y-center" wx:if="{{item.banner==null}}" hover-class="none">
						<view style="margin-right: 12rpx;color:#595959;font-size:12px">更多 <text class="iconfont icon-gengduo" style="font-size: 12px;"></text></view>
						
					</navigator> -->
					<!-- </view> -->

					<view v-for="(activityList, index) in module_list.huodongs" :key="index">
						<view v-for="(item, index2) in activityList" :key="index2" style="border-radius: 20rpx;overflow: hidden;">
							<view v-if="item.show_style == 1" class=" mb-24 bg-white">
								<active :item='item' :goodsList="item.goods"></active>
							</view>
							<view v-if="item.show_style == 2">
								<view class="flex align-center justify-between mb-24">
									<view class="flex align-center">
										<view class="tab-tips"></view>
										<view class="tab-title">{{item.name}}</view>
									</view>
									<view class>
										<navigator :url="'/pages/activity/activity?aid=' + item.id" style="margin-right: 12rpx;color:#999999;font-size:18rpx">更多<text
											 class="iconfont icon-jinru color-fff ml-10" style="border-radius: 50%;background:#F23005;width: 20rpx;height: 20rpx;font-size: 20rpx;text-align: center;"></text></navigator>
									</view>
								</view>
								<view>
									<navigator v-for="(item1, index) in item.goods" :key="index" :url="'/pages/goods/goods?id=' + item1.id" class="goods-box mb-24 bg-white">
										<view class="goods-img pr">
											<!-- <image style="width: 100%;height: 100%;" mode="aspectFill" src="{{item.first_cover_pic}}"></image> -->
											<image style="width: 100%;height: 100%;" mode="aspectFill" :src="item1.recommend_thumb"></image>
											<view class="tips" v-if="item1.is_show_icon == 1">{{item1.icon_label}}</view>
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
													<!-- <view class="pl-20 pr-24 fs-20" style="border-right: 1rpx solid #fff;">仅剩 {{item.goods_num}} 件</view> -->
													<view class="plr-20 fs-24">立即抢</view>
												</navigator>
											</view>
										</view>
									</navigator>
								</view>
							</view>
							<!-- 图片 -->
							<navigator hover-class="none" :url="'/pages/activity/activity?aid=' + item.id" style="font-size: 0 !important;"
							 class="gyg-act-img" v-if="item.show_style == 3">
								<image mode="aspectFill" style="width: 702rpx;height: 237rpx;border-radius:20rpx;font-size: 0 !important;" :src="item.banner"></image>
							</navigator>
							<!-- <view class="noneGoods bg-white p-20" wx:else>
							暂无活动商品
						</view> -->
						</view>
					</view>
				</view>

				<!-- 清仓结束 -->

			</view>

			<view class="flex-x-center ns-padding-bottom-sm fs-24 color-999999 ns-padding-top-sm" v-if="is_no_more">别拉啦～到底啦</view>



			<!-- 所有弹窗都在这所有弹窗都在所有弹窗都在这所有弹窗都在这所有弹窗都在这所有弹窗都在这所有弹窗都在这所有弹窗都在这这-->
			<!-- 有无赠送亲卡的弹窗 -->
			<giveCard></giveCard>
			<!-- 弹窗开始 -->
			<!-- vip弹窗开始 -->
			<vipModel :is_show_model="is_show_model" :card_bg="card_bg" @closeVipModel="closeVipModel"></vipModel>
			<!-- 赚取津贴 -->
			<!-- <redPacket v-if="showRed.status == 1" :status="redStatus" @closeModel="closeRedModel" :dataInfo="showRed.data"></redPacket> -->
			<view class="index-body after-navber">
				<block v-if="role == 'shoper'">
					<button @tap="showModalVip" class="vip-box color-fff text-center fs-20 showModalVip" :style="'background-image: url(' + bg_pic + ')'">
					</button>
				</block>
				<block v-else>
					<block v-if="change_xq">
						<button @tap="showModalVip" class="vip-box color-fff text-center fs-20 showModalVip" :style="'background-image: url(' + bg_pic + ')'">
						</button>
					</block>
					<block v-else>
						<navigator :url="vipUrl" class="vip-box color-fff text-center fs-20 vipUrl" :style="'background-image: url(' + bg_pic + ')'">
							{{vip_text}}
						</navigator>
					</block>
				</block>

				<!-- 分享好友开始 -->
				<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose">
					<view :class="'share-modal-body ' + __device" @tap.stop="shop">
						<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
						<view class="flex-row">
							<view class="flex-grow-1 flex-x-center">
								<button open-type="share" class="share-bottom" style="height:100%;" data-id="-1">
									<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
									<view>分享给好友</view>
								</button>
							</view>
							<view class="flex-grow-1 flex-x-center">
								<view @tap="shareShop" class="share-bottom">
									<text class="iconfont icon-dianpuma color-fff" style="font-size: 50rpx;"></text>
									<view>生成店铺码</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 分享好友结束 -->

				<!-- 生成店铺码开始 -->
				<view class="flex-y-center" :style="'width:' + x + 'px;height:' + y + 'px;position: fixed;top: 0;left:0;background: rgba(0, 0, 0, 0.4);z-index: 999;'"
				 v-if="shopShow" @tap="closeShop" catchtouchmove="true">
					<view class="shareShop">
						<view>
							<view class="shopHead">
								<image :src="mch.user.avatar_url" class="shopHeadImg"></image>
								<view class="font_blod">{{mch.name?mch.name:mch.user.nickname}}</view>
								<view class="tips">邀请您来这里逛逛呀～</view>
							</view>
							<!-- 小程序码 -->
							<view class="shopCode" style="height:370rpx">
								<image class="appcode-img" :src="codeImg.qrcode_pic"></image>
							</view>
						</view>
						<view class="flex shopBottom flex-x-center">
							<view class="flex1" style="color: #c11111" @tap.stop="downImg">保存图片</view>
							<icon type="clear" size="40" color="#fff" class="shop-close" @tap="closeShop"></icon>
						</view>
					</view>
				</view>
				<!-- 生成店铺码结束 -->


			</view>
			<!-- 获取津贴结束 -->
			<open-shop-lay></open-shop-lay>
			<Memberlist></Memberlist>
			<!-- 弹窗结束 -->

		</view>
		<!-- 邀请店主 -->
		<view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="to_mch_invite_show && tomch_invite_bg">
			<!-- <view class="get-card-modal flex-x-center flex-y-center ns-column" v-if="true"> -->
			<view class="get-card-modal-main_mch pr" :style="'background: url(' + tomch_invite_bg + ') no-repeat;background-size: 100% 100%;'">
				<view class="get-card-modal-main_tetx">想要赚到钱，还得靠创业，邀请好友一起开店，成功发展9个小亲即可申请大亲，享受更高收益</view>
				<button class="get-card-modal-btn_mch" open-type="share" data-type="invite_be_mch">立即邀请</button>
			</view>
			<view class="iconfont icon-guanbi color-999999" style="font-size: 60rpx;margin-top: 40rpx;" @tap="closeToMch"></view>
		</view>
		<!-- 回到头部按钮开始 -->
		<to-top :is_top="is_top"></to-top>
		<!-- 回到头部按钮结束 -->
		<!-- 底部导航栏开始 -->
		<tabbar :show_discount="show_discount"></tabbar>
		<!-- 底部导航栏结束 -->
	</view>
</template>

<script>
	import toTop from '../../components/toTop/toTop.vue';
	import vipModel from '@/components/popWindows/vipModel.vue';
	import Memberlist from '@/components/popWindows/Memberlist.vue';
	import openShopLay from '@/components/user/user-open-tips.vue';
	import redPacket from '@/components/popWindows/redPacket.vue';
	import moveBox from '@/components/common/moveBox.vue'
	import active from '@/components/guanyiguan/active.vue'
	import topic from '@/components/index/topic.vue'
	import giveCard from '@/components/index/giveCard.vue'
	export default {
		data() {
			return {

				is_top: false,
				header_bg: '', //头部背景图片
				customBar: getApp().globalData.customBar,
				statusBar: getApp().globalData.statusBar,
				mch: {
					user: {
						avatar_url: ''
					},
					name: '',
					logo: '',
					desc: ''
				},
				filters: require('../../utils/filters.js'),
				headerHeigh: 0,
				user: {
					avatar_url: ''
				},
				/////////////以上是头部内容变量/////////
				module_list: {
					msg: [],
					banner: [],
					huodongs: [
						[]
					],
					miaosha: [],
					pintuan: []
				},
				//////清仓数据/////////
				activityList: [],

				is_no_more: false,
				//弹窗相关变量
				is_show_model: false,
				vipUrl: '/member/vipFirst/vipFirst',
				vip_text: '',
				card_bg: '',
				bg_pic: this.getApp().core.getStorageSync('_img').member_apply,
				change_xq: false,
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				share_modal_active: false,
				codeImg: '',
				qrcode_pic: '',
				shopShow: false,
				bodyHeight: 0,
				stopLoadMore: false,
				newActsList: [], //店长推荐
				open_shop_tips: '',
				open_shop_review_status: '',
				show_discount: true, // 是否展示待领优惠券
				redStatus: 2, // 红包状态

				loadingSwitch: true, //上拉变量
				scroll_state: true, //上拉变量
				request_num: 0, //上拉变量
				to_mch_invite_show: false, // 是否显示邀请人开店
				tomch_invite_bg: uni.getStorageSync('_img').invite_open_mch, // 开店的图片
				pic_open_shop: uni.getStorageSync('_img').pic_open_shop,
				pic_invite_mch: uni.getStorageSync('_img').pic_invite_mch,
				vipLevel: '',
				topicList: [], // 话题列表
				showAddMch: false, // 是否显示添加店主弹窗
			}
		},
		components: {
			vipModel,
			Memberlist,
			toTop,
			openShopLay,
			redPacket,
			moveBox,
			active,
			topic,
			giveCard,
		},
		computed: {
			showRed() {
				return this.$store.state.check_mch_open_sub
			},
			bar_title() {
				return uni.getStorageSync('STORE').name
			},
			init_img() {

				return this.$store.state.init_img || {};
			}
		},
		methods: {
			changeAddMch() {
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch',
					value: true
				})
				this.$store.commit('vuexSet', {
					name: 'is_show_add_mch_page',
					value: true
				})
			},
			needLogin() {
				console.log(333);
				this.$store.commit('vuexSet', {
					name: 'show_loginTpl',
					value: true
				})
			},
			// 开启邀请开店弹窗
			showToMch: function() {
				this.to_mch_invite_show = true
			},
			// 关闭要求看点弹窗
			closeToMch: function() {
				this.to_mch_invite_show = false
			},
			// 关闭红包
			closeRedModel() {
				this.redStatus = 3;
				var data = {
					status: 0
				}
				this.$store.commit('vuexSet', {
					name: 'check_mch_open_sub',
					value: data
				})
			},
			// 获取初始化数据
			getInitInfo() {

				let mch = uni.getStorageSync('_mchInfo');
				//console.log('object',mch)
				if (typeof mch == 'object' && mch.id != '') {
					if (!mch.user) {
						mch.user = {
							avatar_url: ''
						}
					}
					this.mch = mch;
					console.log(this.mch);
				}
				this.setData({
					// mch:typeof  == 'object' ? uni.getStorageSync('_mchInfo') : self.mch,
					role: uni.getStorageSync('role'),
					header_bg: uni.getStorageSync('_mchInfo').header_bg || ''
				});

				// this.getApp().getConfig((config) => {
				// 	let store = config.store;
				// 	console.log(store);
				// 	if (store && store.name) {
				// 		this.setData({
				// 			bar_title: store.name
				// 		});
				// 		uni.setNavigationBarTitle({
				// 			title: store.name,
				// 		});
				// 	}
				// });
				let storeUser = uni.getStorageSync('USER_INFO') || {
					nickname: '',
					avatar_url: ''
				};
				//console.log('avatar_url',storeUser)
				if (storeUser && storeUser.length != 0) {
					this.setData({
						user: {
							nickname: storeUser.nickname,
							avatar_url: storeUser.avatar_url || ''
						}
					})
				}

			},

			//获取滚动公告
			getNotice() {
				this.getApp().request({
					url: this.getApp().api.default.index_other,
					data: {},
					success: (res) => {
						//console.log('公告',res);

						if (res.code == 0) {

							this.module_list.msg = res.data.msg;
							this.module_list.banner = res.data.banner;
							this.module_list.loginer = res.data.loginer;
							this.module_list.login_num = res.data.login_num;
							this.module_list.background_image = res.data.background_image;
							this.module_list.border_color = res.data.border_color;

						}
					}
				});
			},
			//获取活动列表
			getActivityList() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.activity_list,
					success: (res) => {
						if (res.code == 0) {
							for (let x in res.data) {
								var catsArr = res.data[x].cats;
								var arr = [];

								for (let i in catsArr) {
									var obj = {
										id: i,
										catsName: catsArr[i]
									};
									arr.push(obj);
								}

								res.data[x].cats = arr;
							}

							self.setData({
								['module_list.huodongs[0]']: res.data
							});
							self.getMore();
						}
					},
					complete: () => {
						this.getApp().core.hideLoading();
					}
				});
			},
			//获取更多
			getMore() {
				var self = this;
				var url = this.getApp().api.default.activity_list;
				var data = {};
				this.getApp().core.pading(self, url, data, function(res, index) {
					///////////////
					if (self.request_num >= 1) {
						self.request_num--;
						if (self.request_num == 0) {
							self.loadingSwitch = true;
						}
					}
					//////////////
					if (res.data.length == 0) {
						self.setData({
							stopLoadMore: true,
							is_no_more: true
						});
						return;
					}

					for (let x in res.data) {
						var catsArr = res.data[x].cats;
						var arr = [];

						for (let i in catsArr) {
							var obj = {
								id: i,
								catsName: catsArr[i]
							};
							arr.push(obj);
						}

						res.data[x].cats = arr;
					}

					self.setData({
						["module_list.huodongs[" + index + "]"]: res.data,
						// loadingSwitch: true
					});
					// var query = uni.createSelectorQuery();
					// query.select('.index-body').boundingClientRect(function(rect) {
					// 	self.setData({
					// 		bodyHeight: rect.height
					// 	});
					// }).exec();
				});
			},
			stop() {
				return
			},
			//获取秒杀
			getMiaosha() {
				var self = this
				this.getApp().request({
					url: this.getApp().api.default.miaosha_list,
					success: (res) => {
						if (res.code == 0) {
							self.setData({
								'module_list.miaosha': res.data,
							});
							// getApp().core.setStorageSync(getApp().const.PAGE_INDEX_INDEX, res.data);
							// self.miaoshaTimer();
						}
					},
					complete: function() {
						self.getPintuan()
						self.getApp().core.stopPullDownRefresh();
					}
				});
			},
			//获取拼团
			getPintuan: function() {
				var self = this
				this.getApp().request({
					url: this.getApp().api.default.pintuan_list,
					success: (res) => {
						//console.log('拼团',res)
						if (res.code == 0) {
							self.setData({
								'module_list.pintuan': res.data || [],
							});
							// getApp().core.setStorageSync(getApp().const.PAGE_INDEX_INDEX, res.data);
							// self.miaoshaTimer();
						}
					},
					complete: () => {
						// self.checkGroupGoods()
						//self.getActivityList()
						this.getApp().core.stopPullDownRefresh();
					}
				});
			},
			//设置高度
			setHeight() {
				var query = uni.createSelectorQuery().in(this)
				query.select('#header').boundingClientRect((res) => {
					//console.log('77777777777777777777')
					if (res) {
						res = res.height ? res : {
							height: 0
						}
						this.setData({
							headerHeigh: res.height
						})
					}
				}).exec();
			},
			// 获取状态
			getVipCardStatus() {
				this.getApp().request({
					url: this.getApp().api.default.vip_card_status,
					success: res => {
						//console.log(res)
						if (res.code == 0) {
							var vipLevel = res.data.level;
							var vipCardStatus = res.data.status;
							var vipUrl = '';
							var role = uni.getStorageSync('role')
							var change_xq = false;
							var bg_pic = this.getApp().core.getStorageSync('_img').member_share;


							if (vipCardStatus == 1 || vipCardStatus == 2 || vipCardStatus == 3) {
								vipUrl = '/member/vipFirst/vipFirst';
								bg_pic = this.getApp().core.getStorageSync('_img').member_apply;

							}

							if (vipCardStatus == 5) {
								// 申请会员
								vipUrl = '/member/vipFirst/vipFirst?type=1';
								bg_pic = this.getApp().core.getStorageSync('_img').member_share;
							}

							if (vipCardStatus == 4) {
								// 分享会员
								vipUrl = '/member/getVipCard/getVipCard';
								bg_pic = this.getApp().core.getStorageSync('_img').member_apply;
							}

							if (vipCardStatus == 6 || vipCardStatus == 7) {
								// 申请会员
								vipUrl = '/member/vipFirst/vipFirst?type=1';
								bg_pic = this.getApp().core.getStorageSync('_img').member_apply;
							}

							if (vipCardStatus == 0) {
								vipUrl = '/pages/storeManager/storeManager';
								bg_pic = this.getApp().core.getStorageSync('_img').subsidy_100;
								change_xq = true;
							}
							if (vipCardStatus == 102) {
								vipUrl = '/pages/storeManager/storeManager';
								bg_pic = this.getApp().core.getStorageSync('_img').subsidy_100;
								change_xq = true;
							}

							this.setData({
								vipUrl: vipUrl,
								bg_pic: bg_pic,
								change_xq: change_xq,
								vipLevel: vipLevel
							});
						}
					}
				});
			},

			// 邀请会员
			showModalVip() {
				this.setData({
					is_show_model: true,
					card_bg: this.getApp().core.getStorageSync('_img').b1
				});
				this.getShareImg();
			},

			closeVipModel() {
				this.is_show_model = false;
			},

			getShareImg() {
				this.getApp().request({
					url: this.getApp().api.default.vip_share_img,
					success: res => {
						if (res.code == 0) {
							this.setData({
								shareImg: res.data.vipImg
							});
						}
					}
				});
			},

			shareVip() {
				this.getApp().request({
					url: this.getApp().api.default.share_vip,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id
					},
					success: res => {}
				});
			},
			closeShop: function() {
				this.setData({
					shopShow: false
				});
			},
			//下载图片
			downImg: function() {
				var downUrl = this.codeImg.qrcode_pic,
					self = this;

				if (!downUrl) {
					// 生成小程序码
					this.getApp().request({
						url: this.getApp().api.maijia.shop_qrcode,
						data: {
							page: 'pages/index/index'
						},
						success: function(res) {
							if (res.data.qrcode_pic) {
								downUrl = res.data.qrcode_pic;
							}
						},
						fail: function(err) {
							if (err.msg) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 3000
								});
							}
						}
					});
				}

				this.downloadFile({
					url: downUrl,
					//需要下载的图片url
					success: function(res) {
						//成功后的回调函数
						uni.saveImageToPhotosAlbum({
							//保存到本地
							filePath: res.tempFilePath,

							success(res) {
								uni.showToast({
									title: '保存成功',
									icon: 'success',
									duration: 2000
								});
							},

							fail: function(err) {
								if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
									uni.openSetting({
										success(settingdata) {
											if (settingdata.authSetting['scope.writePhotosAlbum']) {
												self.loadData();
											} else {
												console.log('获取权限失败，给出不给权限就无法正常使用的提示');
											}
										}

									});
								}
							}
						});
					}
				});
			},
			shareShop: function() {
				var self = this; // 生成小程序码

				self.shareModalClose();
				this.getApp().request({
					url: this.getApp().api.maijia.shop_qrcode,
					data: {
						page: 'pages/index/index'
					},
					success: function(res) {
						self.setData({
							shopShow: true,
							codeImg: res.data
						});
					},
					fail: function(err) {
						if (err.msg) {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							});
						}
					}
				});
			},
			showShareModal: function() {
				var self = this
				self.setData({
					share_modal_active: "active",
					no_scroll: true,
				});
			},
			shareModalClose: function() {
				var self = this
				self.setData({
					share_modal_active: "",
					no_scroll: false,
				});
			},
			// 获取每日推荐分类
			getBuyCatsList() {
				this.getApp().request({
					url: this.getApp().api.default.buy_cats_list,
					data: {
						showSite: 1
					},
					success: (res) => {
						if (res.code == 0) {
							var catsList = res.data
							this.setData({
								newActsList: catsList
							})
							for (let i in catsList) {
								this.getBuyActsList(catsList[i].id, i, catsList[i].name)
							}
						}
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			getBuyActsList(id, i) {
				var newActsList = this.newActsList
				this.getApp().request({
					url: this.getApp().api.default.buy_acts_list,
					data: {
						circleType: id
					},
					success: (res) => {
						if (res.code == 0) {
							newActsList[i].list = res.data.list

							// this.setData({
							// 	newActsList: newActsList
							// })
							this.newActsList = newActsList.concat();
							// console.log(res);
						}
					},
				})
			},

		},
		onReady() {



			this.getInitInfo();
			var self = this;
			// this.checkFirstOrder()
			//goodsBuy.init(this);
			var pickAddress = uni.getStorageSync('PICK_ADDRESS')
			// app.page.onShow(this);
			self.setData({
				is_shoper: true,
				pickAddress: pickAddress
			});
			this.setHeight();


		},
		onLoad(options) {
			// setTimeout(() => {
			// 	this.setHeight();
			// 	uni.navigateTo({
			// 		url:"../../member/openshop2/openshop2"//
			// 	})
			// }, 150)
			this.$store.commit('vuexSet', {
				name: 'key_arr',
				value: []
			})
			this.$nextTick(() => {
				this.setHeight();
			})
			//#ifdef MP-WEIXIN
			this.setHeight();
			//#endif

			this.getApp().page.onLoad(this, options);
			this.getApp().page.getStoreData(this, options);
			this.getApp().trigger.remove(this.getApp().trigger.events.set_mch, 'AFTER_SET_MCH_INFO');
			this.getApp().trigger.add(this.getApp().trigger.events.set_mch, 'AFTER_SET_MCH_INFO', () => {

				this.$store.state.mch_id && this.getInitInfo(this);

			});

			// this.getApp().test();

			//获取滚动公告和其他数据
			this.getNotice();

			//获取活动
			this.getActivityList();

			//获取秒杀
			this.getMiaosha();

			//获取拼团
			this.getPintuan();

			//获取会员卡状态
			this.getVipCardStatus();

			//获取店长推荐列表
			this.getBuyCatsList();

		},

		//下拉刷新
		onPullDownRefresh(e) {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000);


			this.getApp().test();

			//获取滚动公告和其他数据
			this.getNotice();

			//获取活动
			this.getActivityList();

			//获取秒杀
			this.getMiaosha();

			//获取拼团
			this.getPintuan();

			//获取会员卡状态
			this.getVipCardStatus();

			//获取店长推荐列表
			this.getBuyCatsList();

		},
		//微信分享页面前置函数
		onShareAppMessage: function(options) {
			var self = this;
			//   self.setData({
			//     is_shoper: false
			//   });

			if (options.from === 'button') {
				if (options) {
					// var id = options.target.dataset.id;
					// var url = options.target.dataset.url;
					var name = options.target.dataset.name;
					var type = options.target.dataset.type;
				}
				// 一键分享
				if (type == 'one_key_share') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var share_title = options.target.dataset.text || '' // 复制语
					var name = options.target.dataset.name // 标题
					var mrtj_id = options.target.dataset.id
					var ht_id = options.target.dataset.htid
					var img = options.target.dataset.pic
					share_title = share_title.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
						/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
						/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
						/<\/?.+?>/g, "")
					// 复制
					if (share_title) {
						this.setClipboardData({
							data: share_title ? share_title.trim() : '',
							success(res) {
								uni.getClipboardData({
									success(res) {

									}
								})
							}
						})
					}

					return {
						title: name,
						path: "/member/topic/topic?ht_id=" + ht_id + "&id=" + mrtj_id + "&user_id=" + user_id + "&mch_id=" +
							mch_id,
						imageUrl: img
					};
				}
				// 一键分享
				if (type == 'one_key_share_goods') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var share_title = options.target.dataset.text || '' // 复制语
					var name = options.target.dataset.name // 标题
					var id = options.target.dataset.id
					var img = options.target.dataset.pic
					share_title = share_title.replace(/<(p|div)[^>]*>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>/]+>/g, '').replace(
						/(\n)?<\/([^>]+)>/g, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/<\/?(img)[^>]*>/gi, '').replace(
						/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"").replace(
						/<\/?.+?>/g, "")
					// 复制
					if (share_title) {
						this.setClipboardData({
							data: share_title ? share_title.trim() : '',
							success(res) {
								uni.getClipboardData({
									success(res) {
				
									}
								})
							}
						})
					}
				
					return {
						title: name,
						path: "/pages/goods/goods?id=" + id + "&user_id=" + user_id + "&mch_id=" + mch_id,
						imageUrl: img
					};
				}

				// if (id > 0) {
				// 	var user_info = this.getApp().getUser();
				// 	var mch_info = uni.getStorageSync('_mchInfo');
				// 	return {
				// 		path: "/pages/goods/goods?id=" + id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
				// 		title: name,
				// 		imageUrl: url
				// 	};
				// }

				// if (id < 0) {
				// 	self.shareModalClose();
				// 	var user_info = this.getApp().getUser();
				// 	var mch_info = uni.getStorageSync('_mchInfo');
				// 	return {
				// 		path: "/pages/index/index?user_id=" + user_info.id + "&mch_id=" + mch_info.id,
				// 		title: mch_info.name
				// 	};
				// }

				if (type == 'share_vip') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
					var title = nickname + '邀请您来开通会员~';
					var img = this.getApp().core.getStorageSync('_img').open_member;
					this.shareVip();
					return {
						title: title,
						path: '/member/vipFirst/vipFirst?sid=' + this.sid + '&type=1' + '&mch_id=' + mch_id + '&user_id=' + user_id,
						imageUrl: img
					};
				}
				if (type == 'invite_be_mch') {
					var mch_id = uni.getStorageSync('_mchInfo').id;
					var user_id = this.getApp().core.getStorageSync('USER_INFO').id;
					var nickname = this.getApp().core.getStorageSync('USER_INFO').nickname;
					var title = nickname + '邀请你一起开店，点击立即开启';
					var img = this.pic_invite_mch;
					this.to_mch_invite_show = false;
					return {
						title: title,
						path: '/pages/storeInvite/storeInvite?mch_id=' + mch_id + '&user_id=' + user_id,
						imageUrl: img
					};
				}

			} else {
				var user_info = this.getApp().getUser();
				var mch_info = uni.getStorageSync('_mchInfo');
				return {
					path: "/pages/index/index?user_id=" + user_info.id + "&mch_id=" + mch_info.id,
					title: user_info.nickname + '推荐您来我店铺逛逛，商品更齐 全，省钱更靠谱',
					imageUrl: uni.getStorageSync('_img').qwsp_zxyh
				};
			}
		},
		onPageScroll(e) {
			var self = this;
			var top = e.scrollTop;
			if (top > 800) {
				this.is_top = true;
			} else {
				this.is_top = false;
			}

			//如果处于可加载状态
			if (this.loadingSwitch && !this.stopLoadMore && this.scroll_state) {
				this.scroll_state = false;
				let info2 = uni.createSelectorQuery().select('.index_index');
				info2.boundingClientRect((data) => { //data - 各种参数
					this.scroll_state = true;
					if (data == null) {
						return;
					}
					if (data.height) {

						let is_bottom = data.height - this.y - top;
						// console.log('距离底部高度',is_bottom);
						if (is_bottom < 400 && is_bottom > 0) {
							this.loadingSwitch = false;
							// console.log("88888888888888888888888888888");
							this.request_num = 3;
							this.getMore();
							this.getMore();
							this.getMore();
						}
					}
				}).exec()
			}
		},
		// onReachBottom() {
		// 	for (var i = 0; i < 4; i++) {
		// 		this.getMore();
		// 	}
		// }
	}
</script>

<style>
	/* // 加载原先index.wxss */
	/* @import  '~@/components/common/index.css'; */
	/* @import  '../../components/common/index.css'; */
	.get-card-modal {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.7);
		z-index: 10000;
	}

	.get-card-modal-main_mch {
		width: 570rpx;
		height: 710rpx;
		padding: 48rpx;
		background: #0081ff;
	}

	.get-card-modal-main_tetx {
		position: absolute;
		width: 472rpx;
		padding: 0 30rpx;
		color: #fff;
		font-size: 30rpx;
		top: 394rpx;
	}

	.get-card-modal-btn_mch {
		position: absolute;
		bottom: 48rpx;
		left: 50%;
		margin-left: -210rpx;
		width: 420rpx;
		height: 80rpx;
		background: rgba(0, 0, 0, 0);
		border-radius: 44rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #FF0A00;
	}

	.cu-custom-index {
		width: 100%;
		/* 	// background: #fff; */
	}

	.headInfo {
		padding-left: 21rpx;
		font-size: 12px;
		width: 378rpx;
	}

	.headInfo .font_blod {
		font-size: 15px;
		font-weight: 600;
		margin-bottom: 12rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.headerShop {
		color: #FFFFFF;
	}

	.headerShop .myShop {
		color: #fff;
		font-weight: 600;
		font-size: 12px;
		padding: 7rpx 15rpx;
		border-radius: 6rpx;
		background: #F49E3B;
		display: inline-block;
	}

	.header-footer {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		right: 0rpx;
		background: rgba(0, 0, 0, 0.28);
		height: 49rpx;
		line-height: 49rpx;
		padding: 0 30rpx;
		font-size: 24rpx;
		letter-spacing: 5rpx;
		font-weight: 600;
		text-align: center;
	}

	.slide-image {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		transform: translateY(6rpx)
	}

	.call-shoper {
		height: 50rpx;
		background: #F23005;
		border-radius: 25rpx;
		line-height: 50rpx;
		text-align: center;
		padding: 0 24rpx;
	}

	.call-me {
		height: 51rpx;
		border: 1rpx solid rgba(186, 186, 186, 1);
		border-radius: 25rpx;
		line-height: 49rpx;
		text-align: center;
		padding: 0 24rpx;
	}

	.call-me-bg {
		width: 34rpx;
		height: 34rpx;
		background: #26B50C;
		line-height: 34rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		margin-right: 7rpx;
	}

	/* // 轮播、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、 */
	.swiper-box {
		width: 700rpx;
		margin-left: 25rpx;
		height: 259rpx;

	}

	.muSwiper {
		height: 259rpx;

	}

	/* // 搜索、、、、、、、、、、、、、、、、、、、、、、 */
	.sousuo-btn {
		width: 87rpx;
		text-align: center;
		height: 100%;
		background: linear-gradient(-90deg, rgba(255, 152, 2, 1), rgba(255, 201, 1, 1));
		border-radius: 28rpx;
	}

	/* ///商品 */
	.bodypr {
		padding: 0 25rpx;
	}

	.index-body {
		padding: 0 24rpx;
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

	.share-modal-body text.close {
		width: 28rpx;
		height: 28rpx;
		right: 34rpx;
		top: 34rpx;
	}

	.shareShop {
		width: 508rpx;
		height: 616rpx;
		background: #fff;
		margin: 0 auto;
		border-radius: 13rpx 13rpx 0 0;
		transform: translateY(-100rpx)
	}

	.showModalVip {
		width: 162rpx;
		height: 126rpx;
		background-size: 162rpx 126rpx;
		background-repeat: no-repeat;
		background-color: transparent;
	}

	.show-to-mch {
		position: fixed;
		z-index: 99;
		right: 0rpx;
		bottom: 280rpx;
	}

	.vipUrl {
		width: 180rpx;
		height: 169rpx;
		background-size: 180rpx 169rpx;
		background-repeat: no-repeat;
		background-color: transparent;
	}

	.vip-box {
		bottom: 280rpx;
	}

	.img-limit {
		width: 82rpx;
		height: 82rpx;
		background: rgba(255, 255, 255, 1);
		border: 2rpx solid rgba(255, 202, 18, 1);
		border-radius: 50%;
	}

	.material-icon {
		height: 56rpx;
		border: 1rpx solid #F23005;
		border-radius: 28rpx;
		line-height: 54rpx;
		font-size: 24rpx;
		color: #F23005;
		padding: 0 22rpx;
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

	.transmit-btn {
		height: 56rpx;
		line-height: 56rpx;
		color: #fff;
		background: #F23005;
		box-shadow: 0px 5rpx 12rpx 0px rgba(242, 48, 5, 0.36);
		border-radius: 28rpx;
		text-align: center;
		margin-left: 21rpx;
		margin-right: 0rpx;
	}
</style>
