<template>
	<view class="goods-goods">

		<!-- 不发货提醒 -->
		<view class="no-send-tips" :style="(jianrong=='device_iphone_x'?'bottom: 175rpx':'')" v-if="jd_send.code == 2 && address_id">
			{{jd_send.promiseTips?jd_send.promiseTips:'该收货地址暂时无法配送'}}
		</view>


		<common></common>
		<!-- 轮播开始 -->
		<goodsbanner :goods="goods" @getGoodsQrcode="getGoodsQrcode" :background_title="background_title" :title_title="title_title"></goodsbanner>


		<!-- 价格开始1111111111111111111111111111111111111111111111111111 -->
		<goodsHeader :goods="goods" v-if="goods_attr" :lestNum="lestNum"></goodsHeader>
		<!-- 靠靠靠靠靠靠靠靠靠靠靠靠靠 -->
		<view class="mb-20 pb-32 bg-white">
			<goods-shoper mode="1" :is_normal_member="goods.is_normal_member"></goods-shoper>
		</view>
		<!-- 酷酷酷酷酷酷酷酷酷酷酷酷 -->
		<!--价格结束11111111111111111111111111111111111111111111111111  -->
		<!-- 商品信息开始22222222222222222222222222222222222222222222222 -->

		<view class="goods_info_box clear pr" style="border-bottom: 1rpx solid #F4F4F4;" v-if="roomId">
			<!-- 直播相关 -->
			<block v-if="roomId">
				<view class="live-box">
					<view class="live-icon-box iconfont icon-shangpin"></view>
					<view class="fs-18 ns-text-bold color-fff text-center mt-16" :style="liveStatus == 102?'opacity: 0.5;':''">LIVE</view>
					<navigator :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomId + '&custom_params=' + customParams"
					 class="live-btn" :style="liveStatus == 102?'opacity: 0.5;':''">{{live_room_status_desc}}</navigator>
				</view>
			</block>

		</view>


		<block v-if="quick != 1 && !goods.is_negotiable && __user_info.blacklist !== 1">
			<view class="mb-20">

				<view class="flex-row flex-y-center select_attrs" v-if="role=='shoper'">
					<view class="flex-row flex-y-center" style="width: 100%;">
						<block v-if="is_commission">
							<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">佣金</view>
							<view class="flex-grow-1 flex align-center border-line">
								<view class="attrs flex align-center flex-grow-1">
									<view class="text-center flex align-center" v-if="goods.c1>0">
										<view class="">销售佣金</view>
										<view class="fs-30 color-EB0401 ns-text-bold">￥{{goods.c1}}</view>
									</view>
								</view>
								<view class="flex-grow-0">
									<text :class="'iconfont ' + (is_commission?'icon-yanjing':'icon-yanjing1') + ' fs-40 color-4D4D4D'" @tap="commisionBtn"></text>
								</view>
							</view>
						</block>
						<block v-else>
							<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">服务</view>
							<view class="flex-grow-1 flex align-center border-line">
								<view class="attrs flex align-center flex-grow-1">
									<text style="margin-right:10rpx">买之前 问亲铺 · 亲导购 全网省</text>
								</view>
								<view class="flex-grow-0">
									<text :class="'iconfont ' + (is_commission?'icon-yanjing':'icon-yanjing1') + ' fs-40 color-4D4D4D'" @tap="commisionBtn"></text>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="flex-row flex-y-center select_attrs" style="width: 100%;" v-else>
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">服务</view>
						<view class="flex-grow-1 flex align-center border-line">
							<view class="attrs flex align-center flex-grow-1">
								<text style="margin-right:10rpx">买之前 问亲铺 · 亲导购 全网省</text>
							</view>
							<view class="flex-grow-0">
							</view>
						</view>
					</view>
				</view>
				<view @tap="showAttrPicker" class="flex-row flex-y-center select_attrs" style="width: 100%;">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">规格</view>
						<view class="flex-grow-1 flex align-center border-line">
							<view class="attrs flex align-center flex-grow-1">
								<text v-for="(item, index) in attr_group_list" :key="index" style="margin-right:10rpx">{{item.attr_list.length}}种{{item.attr_group_name}}</text>
							</view>
							<view class="flex-grow-0">
								<text class="iconfont icon-gengduo1 fs-40 color-4D4D4D"></text>
							</view>
						</view>
					</view>

				</view>
				<!-- <view class="flex-row flex-y-center select_attrs" v-if="goods.express_desc">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#2c2c2c;" class="fs-30 ns-text-bold">发货</view>
						<view class="attrs flex align-center">
							<view class="kuaidi fs-24">{{goods.express_desc}}</view>
						</view>
					</view>
				</view> -->
				<view class="flex-row select_attrs" style="width: 100%;" v-if="goods.supplier_role == 1 || goods.supplier_role == 2">
					<view class="flex-grow-1 flex-row">
						<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">送至</view>
						<view class="flex-grow-1 flex border-line" @tap="goToAddress">
							<view class="attrs flex-grow-1" style="margin-right: 50rpx;">
								<view class="ns-text-limit" style="width: 540rpx;">
									<text :class="'fs-30 ' + (jd_send.address?'color-595959':'color-8D8D8D')">{{jd_send.address?jd_send.address:'请选择收货地址'}}</text>
								</view>
								<view class="mt-24 fs-30 color-595959 ns-text-limit2" v-if="jd_send.promiseTips">
									<text style="color: #EB0401;margin-right: 12rpx;">现货</text>
									<text class="" style="color: #EB0401;">{{jd_send.promiseTips}}</text>
								</view>
							</view>
							<view class="flex-grow-0">
								<text class="iconfont icon-jinru fs-40 color-4D4D4D ns-text-bold"></text>
							</view>
						</view>

					</view>
				</view>
				<view @tap="openParameter" class="flex-row flex-y-center select_attrs" style="width: 100%;" v-if="goods.param_json.length>0 && false">
					<view class="flex-grow-1 flex-row flex-y-center">
						<view style="color:#2c2c2c;padding: 29rpx 38rpx 29rpx 24rpx;" class="fs-30 ns-text-bold flex-grow-0">参数</view>
						<view class="flex-grow-1 flex align-center border-line">
							<view class="attrs flex align-center flex-grow-1">
								<text style="margin-right:10rpx">类型，包装等参数</text>
							</view>
							<view class="flex-grow-0">
								<text class="iconfont icon-jinru fs-40 color-4D4D4D ns-text-bold"></text>
							</view>
						</view>
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


		<view class="mb-16 ns-bg-white" v-if="goods.brand">
			<view @tap="goBrand" :data-brandid="goods.brand.id" class="ns-padding-sm ns-flex ns-justify-content-space-between">
				<view class="ns-flex flex-grow-1">
					<view class="flex-grow-0">
						<image style="width:100rpx;height:100rpx;border-radius: 12rpx;box-shadow: 0rpx 8rpx 10rpx #F4F4F4;" :src="goods.brand.img"
						 mode="aspectFit"></image>
					</view>
					<view class="flex-grow-1" style="margin-left: 24rpx;">
						<view class="flex align-center justify-between">
							<view class="fs-30 color-2C2C2C ns-text-bold">{{goods.brand.name}}</view>
							<view class="nav-to-more">
								更多好货
							</view>
						</view>
						<view class="ns-text-smblack ns-text-xs ns-margin-top-sm ns-text-limit fs-24 color-8D8D8D" style="margin-top: 10rpx;">{{goods.brand.desc}}</view>
					</view>
				</view>

			</view>
			<view style="padding: 0 24rpx;padding-bottom: 20rpx;" v-if="linkGoods &&linkGoods.length!=0||goods.hot_goods&&goods.hot_goods.length!=0">
				<view v-if="linkGoods&&linkGoods.length>0" class="flex">
					<view v-for="(item, index) in linkGoods" :key="index" class="order fs-24" :style="(index<2?'margin-right: 21rpx;':'margin-right: 0rpx;')"
					 @tap="goGoods" :data-id="item.id" v-if="index<3">
						<image class="order-img" :src="item.cover_pic"></image>
						<view class=" pt-20 ns-text-limit  fs-28 color-595959">
							{{item.name}}
						</view>
						<view class="ns-flex ns-justify-content-space-between align-center">
							<view class="fs-24 color-EB0401 ns-text-bold">￥<text class="fs-40">{{filters.priceStr(item.price)[0]}}.</text><text>{{filters.priceStr(item.price)[1]}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>




		<!-- 同类推荐 -->

		<view class="bg-white p-24" v-if="sameGoods.length>0">
			<view class="flex-x-center pr" style="margin-bottom: 38rpx;">
				<view class=" fs-30 color-333333 ns-text-bold">同类推荐</view>
				<view class="under-line"></view>
			</view>
			<view class style="height: 650rpx;">
				<swiper circular="true" duration="500" style="height: 650rpx;">
					<swiper-item v-for="(item, index) in sameList" :key="index" class="flex ns-wrap" style="height: 650rpx;">
						<view v-for="(goods, index2) in sameList" :key="index2" :class="'same fs-24 ' + ((index+1)%3==0?'':'mr-15')" @tap="goGoods"
						 :data-id="goods.id">
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

		<!-- 商品详情 -->
		<goodsDetail :article_detail="article_detail" :linkGoods="linkGoods"></goodsDetail>


		<!-- 分享 -->
		<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="sharePic">
			<view :class="'share-modal-body ' + __device" @tap.stop="shop">
				<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
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




		<block>
			<block data-src="/components/goods/goods_buy">
				<view v-if="__user_info.blacklist !== 1" :class="'bar-bottom1 ' + __device" style="z-index: 99;" :style="{'height':(jianrong=='device_iphone_x'?'175rpx':'110rpx')}">
					<view class="flex-row bar-bottom bg-white" v-if="goods_attr">
						<view class="flex-grow-0 flex-row">
							<view class="flex-grow-0 flex-y-center bar-bottom-btn" @tap="goHome">
								<view>
									<text class="iconfont icon-shouye color-FFC330  iconsize" style="color: #EB0401;"></text>
									<view class="color-EB0401 fs-24">首页</view>
								</view>

							</view>
							<view class="flex-grow-0 flex-y-center bar-bottom-btn" @tap="goCar">
								<view>
									<text class="iconfont icon-gouwuche color-595959 iconsize"></text>
									<view class="color-595959 fs-24">购物车</view>
								</view>
							</view>
							<button open-type="share" class="flex-grow-0 flex-y-center bar-bottom-btn">
								<view>
									<text class="iconfont icon-fenxiang1 color-595959 iconsize"></text>
									<view class="color-595959 fs-24">分享</view>
								</view>
							</button>

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
								<block v-if="jd_send.code == 2 && address_id">
									<navigator url="/pages/guanyiguan/guanyiguan" open-type="redirect" class=" flex-y-center flex-x-center to-guan mr-16">逛一逛</navigator>
								</block>
								<block v-else>
									<block v-if="goods.start_buy==1">
										<block v-if="lestNum > 0">
											<view class=" flex-y-center flex-x-center add-cart mr-16" @tap="addCart">加入购物车</view>
											<view class=" flex-y-center flex-x-center buy-now" @tap="buyNow">{{goods.buy_txt}}</view>
										</block>
										<block v-else>
											<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: rgba(141, 141, 141, 0.76);width: 414rpx;">商品已抢光</view>
										</block>
									</block>
									<block v-if="goods.start_buy==0">
										<block v-if="lestNum > 0">
											<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: #489A19;width: 414rpx;"
											 @tap="addCart">加入购物车</view>
										</block>
										<block v-else>
											<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: rgba(141, 141, 141, 0.76);width: 414rpx;">商品已抢光</view>
										</block>
									</block>
									<block v-if="goods.start_buy==-1">
										<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: rgba(141, 141, 141, 0.76);width: 414rpx;">{{goods.buy_txt}}</view>
									</block>
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
									<view class="flex-grow-1 flex-y-center flex-x-center fs-30 color-fff add-cart" style="background: rgba(141, 141, 141, 0.76);">{{goods.buy_txt}}</view>
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

					</view>
				</view>
			</block>

		</block>


		<!-- 快速购买结束··························· -->



		<!-- 多规格开始 -->
		<cart :goods="goods" v-if="attr_end" :show_attr_picker="show_attr_picker" :goods_attr="goods_attr" :form="form"
		 :attr_group_list="attr_group_list" @hideAttrPicker="hideAttrPicker" pageType="STORE"></cart>
		<!-- 多规格结束 -->
		<!-- 首单 -->
		<firstOrder></firstOrder>
		<!-- 首单 end-->

		<to-top :is_top="is_top"></to-top>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
	var shoppingCart = require("../../components/shopping_cart/shopping_cart.js");
	//商城多规格选择
	var goodsInfo = require("../../components/goods/goods_info.js");
	var goodsBuy = require("../../components/goods/goods_buy.js");
	var goodsRecommend = require("../../components/goods/goods_recommend.js");
	import goodsHeader from '@/components/goods/goods_header.vue'
	import goodsbanner1 from '@/components/goods/goods_banner.vue'
	import goodsDetail from '@/components/goods/goods_detail.vue'
	import cart from '@/components/cart/cart.vue'
	import firstOrder from '@/components/goods/firstOrder.vue'
	import toTop from '@/components/toTop/toTop.vue'
	import goodsShoper from '@/components/goods/goods_shoper.vue';
	var p = 1;
	var is_loading_comment = false;
	var is_more_comment = true;
	var share_count = 0;
	export default {
		data() {
			return {
				pageType: 'STORE',
				//模块页面标识
				id: null,
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
					brand_id: ''
				},
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
				page: 1,
				drop: false,
				goodsModel: false,
				goods_num: 0,
				temporaryGood: {
					price: 0.00,
					// 对应规格的价格
					num: 0,
					use_attr: 1
				},
				goodNumCount: 0,
				isParameter: false,
				role: uni.getStorageSync('role'),
				active2: 2,
				is_scroll: true,
				spendList: ['icon-shixinwujiaoxing', 'icon-shixinwujiaoxing', 'icon-shixinwujiaoxing', 'icon-shixinwujiaoxing',
					'icon-shixinwujiaoxing'
				],
				is_show_modal: true,
				// 首单会员
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				pageUrl: 'goods',
				nickName: "",
				avatarUrl: "",
				userId: "",
				mchId: "",
				storeId: "",
				gsId: "",
				type: 0,
				header_bg: "",
				from: "",
				isReturn: false,
				address_id: "",
				roomId: "",
				customParams: "",
				liveStatus: "",
				live_room_status_desc: "",
				btn: false,
				preferential: false,
				goods_attr: "",
				sameList: [],
				linkGoods: [],
				allLookList: "",
				article_detail: '',
				filters: require('../../utils/filters.js'),
				quick: '',
				sameGoods: '',
				attr_group_list: [],
				sharePic: '',
				url: '',
				goods_qrcode_active: '',
				goods_qrcode: '',
				jd_send: {},
				groupNum: '',
				old: '',
				show_txt_empty: '', // 热卖中的图片
				show_txt_empty_no: '', // 已抢光的图片
				lestNum: 1, // 所有规格总数
				shareTitle: '', // 分享卡片的标题
				attr_end: false,
				background_title: '', // 标题背景色
				title_title: '', // 标题栏名字
				is_top: false,
				jianrong: ''
			};
		},
		components: {
			goodsbanner: goodsbanner1,
			jyfParser,
			cart,
			firstOrder,
			goodsHeader,
			goodsDetail,
			toTop,
			goodsShoper,
		},
		computed: {
			is_commission() {
				return this.$store.state.show_commission
			}
		},
		onLoad: function(options) {
			//return 0;
			//console.log('goods-options', options)
			console.log(options);
			this.getApp().page.onLoad(this, options);
			this.setData({
				nickName: uni.getStorageSync('USER_INFO').nickname,
				avatarUrl: uni.getStorageSync('USER_INFO').avatar_url,
				userId: uni.getStorageSync('USER_INFO').id,
				mchId: uni.getStorageSync('_mchInfo').id,
				storeId: uni.getStorageSync('STORE').id,
				gsId: options.id,
				type: 2,
				//我的页面进入
				header_bg: uni.getStorageSync('_mchInfo').header_bg,
				show_txt_empty: uni.getStorageSync('_img').sale_hot,
				show_txt_empty_no: uni.getStorageSync('_img').yqg
			});
			var self = this;
			share_count = 0;
			this.jianrong = uni.getStorageSync('jianrong');
			p = 1;
			is_loading_comment = false;
			is_more_comment = true;
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
									from: options.from || 1,
									role: uni.getStorageSync('role')
								});
							} else {
								self.setData({
									id: options.id,
									from: options.from || 1,
									role: uni.getStorageSync('role')
								});
							}

							shoppingCart.init(this);
							//specificationsModel.init(this, shoppingCart);
							goodsInfo.init(this);
							goodsBuy.init(this);
							this.goodsOnLoad();
							goodsRecommend.init(this);
							this.getGoods();
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
					from: options.from || 1,
					role: uni.getStorageSync('role')
				});
				shoppingCart.init(this);
				// specificationsModel.init(this, shoppingCart);
				goodsInfo.init(this);
				goodsBuy.init(this);
				this.goodsOnLoad();
				goodsRecommend.init(this);
				this.getGoods();
			}

			var pages = getCurrentPages();
			var prevPage = pages.length < 2 ? false : true;

			if (prevPage) {
				self.setData({
					isReturn: true
				});
			}
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			//this.getApp().page.onReady(this);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getApp().page.onShow(this);
			goodsBuy.init(this);
			var self = this;
			// 更新清单状态
			this.getApp().request({
				url: this.getApp().api.default.goods,
				data: {
					id: self.id,
					from: self.from || 1
				},
				success: function(res) {
					if (res.code == 0) {
						self.goods.is_user_recom = res.data.is_user_recom
						
					}
				}
			});
			
			var address_id = 0;
			var address = uni.getStorageSync(this.getApp().const.PICKER_ADDRESS);
			//console.log(address);

			if (address) {
				self.setData({
					address_id: address.id
				});
			}

			self.getJDSend()
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {
			this.getApp().page.onHide(this);
			shoppingCart.saveItemData(this);
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			this.getApp().page.onUnload(this);

			shoppingCart.saveItemData(this);
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop
			if (scrollTop >= 400) {
				this.background_title = "#F4F4F4"
				this.title_title = "商品详情"
				this.is_top = true
			} else {
				this.background_title = ''
				this.title_title = ""
				this.is_top = false
			}

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.getApp().page.onPullDownRefresh(this);
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getApp().page.onReachBottom(this);
			var self = this;

			if (self.tab_detail == 'active' && self.drop) {
				self.drop = false;
				self.goods_recommend({
					'goods_id': self.goods.id,
					'loadmore': true
				});
			} else if (self.tab_comment == 'active') {
				self.getCommentList(true);
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function(res) {
			var self = this;
			var user_info = this.getApp().getUser();
			var mch_info = uni.getStorageSync('_mchInfo');

			switch (res.from) {
				case 'button':
					var res = {
						path: "/pages/goods/goods?id=" + this.id + "&from=" + this.from + "&user_id=" + user_info.id + "&mch_id=" +
							mch_info.id,
						title: self.shareTitle,
						imageUrl: self.sharePic
					};
					break;

				case 'menu':
					var res = {
						path: "/pages/goods/goods?id=" + this.id + "&from=" + this.from + "&user_id=" + user_info.id + "&mch_id=" +
							mch_info.id,
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
			showAttrPicker: function() {
				this.show_attr_picker = true
			},
			hideAttrPicker: function() {
				this.show_attr_picker = false
			},
			// 全局切换佣金显隐
			commisionBtn() {
				console.log(this.$store.state.show_commission);
				this.$store.commit('vuexSet', {
					name: 'show_commission',
					value: !this.$store.state.show_commission
				})
				console.log(this.$store.state.show_commission);
			},
			to_dial: function(e) {
				var contact_tel = this.store.contact_tel;
				uni.makePhoneCall({
					phoneNumber: contact_tel
				});
			},
			getGoods: function() {

				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods,
					data: {
						id: self.id,
						from: self.from || 1
					},
					success: function(res) {
						// console.log('res',res.data.detail)
						if (res.code == 0) {
							var detail = res.data.detail;
							// WxParse.wxParse("detail", "html", detail, self)
							setTimeout(() => {
								self.article_detail = detail
								//console.log('图片详情',self.article_detail)

							}, 200);

							var goods = res.data;
							goods.attr_pic = res.data.attr_pic;
							goods.linkGoods = res.data.link_goods || [];

							goods.c1 = res.data.commission_price;
							goods.hot_goods = goods.hot_goods || [];
							goods.param_json = goods.param_json || [];
							goods.service_list = goods.service_list || [];
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
								goods: goods,
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								btn: true
							});


							self.getGoodsLink();
							self.getCommentList();

							self.getAllLook();

							self.getGoodsAttr();

							self.goods_recommend({
								'goods_id': res.data.id,
								'reload': true
							}); // 满减优惠
							//console.log('满减优惠', res.data)

							if (res.data.youhui.length != 0) {

								self.setData({
									preferential: true //满减优惠开关

								});
							}
						}

						if (res.code == 1) {
							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										wx.navigateBack({
											delta: 1,
											fail: function() {
												wx.redirectTo({
													url: '/pages/index/index'
												})
											}
										});
									}
								}
							});
						}
					}
				});
			},
			getGoodsAttr: function() {

				var self = this;

				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: self.id,
						from: self.from || 1,
						address_id: self.address_id || ''
					},
					success: (res) => {
						if (res.code == 0) {
							let lestNum = 0;

							if (res.data.attr) {
								for (let i in res.data.attr) {
									lestNum = lestNum + res.data.attr[i].num;
								}
							}
							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								lestNum: lestNum,
								attr_end: true
							});
							self.getSharePic()
						}
					}
				});
			},
			getGoodsLink: function() {
				var self = this;

				this.getApp().request({
					url: this.getApp().api.default.goods_link,
					data: {
						brand_id: self.goods.brand_id,
						from: self.from || 1
					},
					success: function(res) {

						// console.log('resdsfa',res)
						if (res.code == 0) {

							var arr = [
								[],
								[],
								[]
							];
							var j = 0;

							for (let i in res.data) {
								arr[j].push(res.data[i]);

								if (arr[j].length >= 6 * (j + 1)) {

									j++;
								}
							}
							var index = 2;

							self.setData({
								sameList: arr
							});
						}
					}
				});
			},
			getCommentList: function() {
				var self = this;

				this.getApp().request({
					url: this.getApp().api.default.walk_goods_list,
					data: {
						brand_id: self.goods.brand_id || ''
					},
					success: function(res) {
						if (res.code == 0) {
							// console.log('linkGoods',self.linkGoods)
							self.setData({
								linkGoods: res.data.list || []
							});
							//console.log('linkGoods',self.linkGoods)
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
			shop() {},
			errrr(e) {

			},
			have(arr) {
				if (typeof arr == 'object' && Array.isArray(arr) && arr.length > 0)
					return true;
				return false;
			}
		}

	}
</script>

<style>
	/* 商品详情样式 */
	@import url("~@/components/goods/goods_info.css");
	@import url("~@/components/goods/goods_buy.css");
	@import url("~@/components/goods/specifications_model.css");
	@import url("~@/components/shopping_cart/shopping_cart.css");
	@import url("~@/components/quick-navigation/quick-navigation.css");
	@import url("~@/components/goods/goods_recommend.css");

	pgae {
		background: #F4F4F4;
	}

	view {
		overflow: visible;
	}

	.vip-price-box {
		height: 60rpx;
		background: #FFFFFF;
		border-radius: 30px;
		padding: 0 15rpx;
		line-height: 60rpx;
		text-align: center;
		color: #FF5602;
	}

	/* .vip-price-btn {
		width: 100rpx;
		height: 30rpx;
		background: rgba(243, 217, 168, 1);
		border-radius: 15rpx;
		line-height: 30rpx;
		text-align: center;
		color: #2C2419;
		font-size: 22rpx;
	} */

	.no-scroll {
		height: 100%;
		overflow-y: hidden;
	}

	.share-tip {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.65);
	}

	.goods-detail {
		box-sizing: border-box;
		padding: 24rpx 0;
		background: #fff;
	}

	.price-tips {
		width: 89rpx;
		height: 34rpx;
		line-height: 34rpx;
		text-align: center;
		background: linear-gradient(-90deg, rgba(84, 98, 255, 1), rgba(185, 83, 255, 1));
		border-radius: 24rpx 0rpx 24rpx 0rpx;
		font-size: 20rpx;
		color: #fff;
		margin-top: -36rpx;
	}

	.activity-time {
		padding: 0rpx 25rpx;
		background: linear-gradient(-90deg, rgba(255, 55, 80, 1), rgba(255, 112, 6, 1));
		border-radius: 18rpx;
	}

	.goods-detail text,
	.goods-detail image,
	.goods-detail view {
		box-sizing: border-box;
		max-width: 100%;
	}

	.cart-nav {
		position: fixed;
		top: 180rpx;
		right: 24rpx;
		background: rgba(255, 255, 255, 0.5);
		font-size: 0;
		padding: 20rpx;
		border-radius: 999rpx;
		box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.2);
		z-index: 100;
	}

	.cart-nav image {
		width: 42rpx;
		height: 42rpx;
	}

	.reply {
		margin: 20rpx 24rpx 20rpx 0rpx;
		border-radius: 16rpx;
		background: #f7f7f7;
		font-size: 11pt;
		padding: 22rpx 30rpx;
		color: #c10000;
	}

	.reply-content {
		display: inline;
		color: #666;
	}

	.comment-item .score-tag {
		display: inline-block;
		background: #eee;
		font-size: 9pt;
		padding: 4rpx 12rpx;
		border-radius: 5rpx;
	}


	.loading-more {
		text-align: center;
		opacity: 0;
	}

	.loading-more.active {
		opacity: 1;
	}

	.loading-more image {
		width: 160rpx;
		height: 80rpx;
	}

	.pic-left {
		margin-right: 5rpx;
	}

	.pic-right {
		margin-left: 5rpx;
	}

	.contact {
		background: #118eea;
		color: #fff;
	}

	/* new code */


	.miao-label {
		margin-bottom: 5rpx;
		width: 50rpx;
		height: 25rpx;
		line-height: 25rpx;
		border-radius: 8rpx;
		background: #FFFFFF;
		font-size: 9px;
		color: #C10000;
		text-align: center
	}

	/* 特别提示 */
	.line {
		width: 120rpx;
		height: 2rpx;
		background-color: #979797;
	}

	.especially-tip {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 29rpx 30rpx 20rpx;
	}

	.goods-goods {
		padding-bottom: 100rpx;
	}


	/* 不发货地址悬浮样式 */
	.no-send-tips {
		position: fixed;
		bottom: 110rpx;
		left: 0rpx;
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		background: #FCE2C1;
		text-align: center;
		font-size: 24rpx;
		color: #595959;
		z-index: 9;
	}

	.nav-to-more {
		width: 150rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #EB0401;
		height: 54rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
		border: 2rpx solid #EB0401;
	}


	.border-line {
		border-bottom: 1rpx solid #EFEFEF;
		padding: 29rpx 38rpx 28rpx 0rpx;
	}
</style>
