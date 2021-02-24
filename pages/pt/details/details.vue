<template>
	<view class="goods-goods">
		<common></common>
		<!-- 轮播开始 -->
		<goodsbanner1 :goods="goods"></goodsbanner1>


		<!-- 价格开始1111111111111111111111111111111111111111111111111111 -->
		<view v-if="goods.name" class="ns-padding-horizontal-sm ns-padding-vertical-xs ns-text-white ns-flex ns-justify-content-space-between"
		 :style="'background: url(' + (vip?goods.banberImg.b:(goods.start_buy==1?goods.banberImg.a:goods.banberImg.d)) + ') no-repeat;background-size: 100% 107rpx;height: 107rpx;'">
			<view class="ns-flex " style="margin-top: -10rpx;">
				<view class="flex">
					<view style="padding-top: 56rpx;font-size: 24rpx;">￥</view>
					<view style="font-size: 78rpx;">{{goods.price}}</view>
				</view>
				<!-- 佣金 -->
				<!-- <view class="flex ns-align-items-flex-center ml-10 mt-20" wx:if="{{role=='shoper' && goods.c1>0}}">
					<view class="yongjin fs-28">赚</view>
					<view class="fs-28 color-fff">￥{{goods.c1}}</view>
				</view> -->
				<view class="ns-flex mt-20 ml-10">
					<view>
						<view class="pt-numbox"><text class="ptnum">拼团</text></view>
						<view class="ns-flex ns-align-items-flex-center">
							<!-- <text class="ns-text-through ns-text-xxxs">零售价</text> -->
							<text class="original_price ns-text-through ns-text-xxxs mt-10">￥{{goods.original_price}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="fs-28">
				<view class="text-center fs-24 mb-10">{{goods.start_buy==0?'开始时间':'结束时间'}}</view>
				<view class="activity-time fs-24">{{show_end_time}}</view>
			</view>
			<!-- <view class='flex-grow-0 flex-row time-info flex-y-center'>
				<view class='flex-grow-1 time-value flex-y-center flex-x-center'>
					{{limit_time.days}}
				</view>
				<view class='flex-grow-0'>
					天
				</view>
				<view class='flex-grow-1 time-value flex-y-center flex-x-center'>
					{{limit_time.hours}}
				</view>
				<view class='flex-grow-0'>
					时
				</view>
				<view class='flex-grow-1 time-value flex-y-center flex-x-center'>
					{{limit_time.mins}}
				</view>
				<view class='flex-grow-0'>
					分
				</view>
				<view class='flex-grow-0'>
					后 结束
				</view>
			</view> -->

		</view>
		<!--价格结束11111111111111111111111111111111111111111111111111  -->
		<!-- 商品信息开始22222222222222222222222222222222222222222222222 -->

		<view class="goods_info_box clear pr" style="border-bottom: 1rpx solid #F4F4F4;">
			<view @tap="downMaterial" class="pa share_btn_img down_btn_img">
				<text class="iconfont icon-xiazai" style="font-size: 30rpx;"></text>
			</view>
			<view @tap="showShareModal" class="pa share_btn_img">
				<text class="iconfont icon-show_fenxiang" style="font-size: 30rpx;"></text>
			</view>
			<!-- 直播相关 -->
			<block v-if="roomId">
				<view class="live-box">
					<view class="live-icon-box iconfont icon-shangpin"></view>
					<view class="fs-18 ns-text-bold color-fff text-center mt-16" :style="liveStatus == 102?'opacity: 0.5;':''">LIVE</view>
					<navigator :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + roomId + '&custom_params=' + customParams"
					 class="live-btn" :style="liveStatus == 102?'opacity: 0.5;':''">{{live_room_status_desc}}</navigator>
				</view>
			</block>
			<!-- 	<view wx:if="{{role=='shoper' && goods.c1>0 && is_commission}}" class="pa commission">赚 {{goods.c1}}</view> -->
			<!-- <view wx:if="{{isReturn}}" bindtap="back" class='pf back'>
				<view class="iconfont icon-zuojiantoubeifen color-fff" style="width: 46rpx;height: 46rpx;line-height: 46rpx;text-align: center;border-radius: 50%;background:rgba(2,2,2,0.3);"></view>
			</view>
			<view wx:else bindtap="toHome" class='pf back'>
				<view class="iconfont icon-zuojiantoubeifen color-fff" style="width: 46rpx;height: 46rpx;line-height: 46rpx;text-align: center;border-radius: 50%;background:rgba(2,2,2,0.3);"></view>
			</view> -->
			<view v-if="!goods.is_normal_member && goods.m_price" class="vip-card">
				<view class="vip-card-main flex justify-between align-center" :style="'background: url(' + goods.banberImg.c + ') no-repeat;background-size: 702rpx 80rpx;'">
					<view class="fs-30 ns-text-bold" style="color: #F0D0A5;">领亲卡，享受会员价格</view>
					<navigator hover-class="none" :url="goods.member_status == 1?'/member/vipFirst/vipFirst':(goods.member_status == 2?'/member/getVipCard/getVipCard':'/member/vipFirst/vipFirst?type=1')"
					 class="vip-card-btn text-center">立即领取</navigator>
				</view>
			</view>
			<view class="flex ns-justify-content-space-between ns-align-items-flex-center">
				<view style="width: 100%;">
					<view class="goods_name fs-30 ns-text-limit2 mb-24" v-if="goods.name"><text :data-text="goods.name" @longtap="copy">{{goods.name}}</text></view>
					<view class="color-666666 fs-26">{{goods.desc}}</view>

				</view>
			</view>
			<!-- 拼团 -->
			<!-- <view wx:if="{{pageType ==='PINTUAN'}}" class="flex-row flex-y-center" style="margin-top:14rpx;height:60rpx;">
		          
		          <view class='flex-grow-0 flex-row original-price'>
		              <view wx:if="{{__user_info.level > -1 || !goods.min_member_price || goods.is_level === false}}" style='text-decoration: line-through;' class='flex-grow-0'>¥ {{goods.original_price}}</view>
		              <view class='member_price_box' wx:else="{{goods.min_member_price}}">  -->
			<!-- 商城全局会员价显示开关 -->
			<!-- <block wx:if="{{__is_member_price === 1}}">
		                      <text class='member_price_title'>会员价</text>
		                      <text>￥{{goods.min_member_price > 0 ? goods.min_member_price : goods.price}}</text>
		                  </block>
		                  <block wx:else>
		                      <text class='original_price'>￥{{goods.price}}</text>
		                  </block>
		              </view>
		          </view> -->
			<!-- <view class='flex-row flex-grow-0 group-descount' style="margin-left:16rpx">
		              <view class='flex-grow-0 group-descount-one'>
		                  {{goods.group_num}}人拼团
		              </view>
		              <view class='flex-grow-0 group-descount-center'>
		              </view>
		              <view class='flex-grow-0 group-descount-tow'>
		                  拼团立省¥{{reduce_price}}
		              </view>
		          </view>
		      </view>-->
			<!-- 快速购买模块 -->
			<block v-if="quick == 1">
				<view class="quick_goods_info">
					<view class="view1">
						<view v-if="__is_member_price && goods.min_member_price > 0 && goods.is_negotiable != 1 && __user_info.level > -1"
						 class="flex-grow-0 flex-y-center">
							<text class="renminbi is_member">￥</text>
							<text class="goods_price is_member">{{goods.min_member_price}}</text>
							<image v-if="goods.is_level === true" class="img" :src="__wxapp_img.store.member_price.url"></image>
						</view>
						<view v-else class="flex-grow-0 flex-y-center">
							<text :class="'renminbi ' + (__user_info.level != -1 || goods.is_level === false ? 'is_member' : '')">￥</text>
							<text :class="'goods_price ' + (__user_info.level != -1 || goods.is_level === false ? 'is_member' : '')">{{goods.min_price > 0 ? goods.min_price : goods.price}}</text>
						</view>

						<view style="margin-top:14rpx;" class="flex-row flex-y-center">
							<view class="flex-grow-0 view2">
								<text class="original_price" v-if="__user_info.level > -1 || !goods.min_member_price || goods.is_level === false">￥{{goods.original_price}}</text>
								<view class="member_price_box" v-else="goods.min_member_price">
									<!-- 商城全局会员价显示开关 -->
									<block v-if="__is_member_price === 1">
										<text class="member_price_title">会员价</text>
										<text>￥{{goods.min_member_price > 0 ? goods.min_member_price : goods.price}}</text>
									</block>
									<block v-else>
										<text class="original_price">￥{{goods.price}}</text>
									</block>
								</view>
							</view>

							<view v-if="__is_sales" class="flex-grow-0 view3">
								<text class="sales_title">销量:</text>
								<text class="sales">{{goods.sales}} {{goods.unit}}</text>
							</view>
						</view>
					</view>
					<block v-if="goods.use_attr == 1">
						<view class="add xuanguige " :data-id="goods.id" @tap="showDialogBtn">
							选规格
							<view v-if="goods_num > 0" class="guigenum">{{goods_num}}</view>
						</view>
					</block>
					<block v-if="goods.use_attr == 0">
						<block v-if="goods_num > 0">
							<view class="btn_car_num">
								<image class="carStandard" :src="__wxapp_img.store.jian.url" @tap="jian" :data-id="goods.id"></image>
								<input @input="goodNumChange" type="number" class="carStandard good_num" id="num" :data-id="goods.id" maxlength="999"
								 :value="goods_num"></input>
								<image class="carStandard" :src="__wxapp_img.store.jia.url" @tap="jia" :data-id="goods.id"></image>
							</view>
						</block>
						<block v-else>
							<view class="add add_cart" @tap="jia" :data-id="goods.id">加入购物车</view>
						</block>
					</block>
				</view>
			</block>

			<!-- 商城模块 -->
			<!-- <block wx:else>
		        <view class="flex-row flex-y-center store_goods_info" wx:if="{{pageType !=='MIAOSHA'&&pageType !=='PINTUAN'&&pageType!=='STORE'}}">
		            <view class="flex-grow-1 flex-col">
		          <view wx:if='{{__is_member_price && goods.min_member_price > 0 && goods.is_negotiable != 1 && __user_info.level > -1}}' class="flex-grow-0 flex-y-center view1">
		            <block wx:if="{{pageType === 'INTEGRAL'}}">
		                <text style='font-size:16pt;color:red;'>{{goods.integral}}积分 + </text>
		            </block>
		            <text wx:if="{{!goods.is_negotiable}}" class='renminbi is_member'>￥</text>
		            <block wx:if='{{goods.mch}}'>
		                <text class='min_price is_member'>{{goods.min_price}}</text>
		            </block>
		            <block wx:else>
		                <text class='min_price is_member'>{{goods.min_member_price}}</text>
		                <image wx:if='{{goods.is_level === true}}' class='img' src='{{__wxapp_img.store.member_price.url}}'></image>
		            </block>
		          </view> -->
			<!-- 原价区域 -->
			<!-- <view wx:else class="flex-grow-0 flex-y-center view1">
		              <block wx:if="{{pageType === 'INTEGRAL'}}">
		                  <text style='font-size:16pt;color:red;'>{{goods.integral}}积分 + </text>
		              </block>
		              <block wx:if="{{pageType === 'STEP'}}">
		                  <image class='step-icon' src='../../images/detail-price.png'></image>
		                  <text style='font-size:16pt;color:#ff9d1e;font-family:DIN' class='{{__user_info.level != -1 || goods.is_level === false ? "is_member" : ""}}'>{{goods.price}}</text>
		                  <text style='font-size:11pt;color:#666666;margin-left:24rpx'>原价：</text>
		                  <text style='font-size:11pt;color:#666666;text-decoration:line-through'>{{goods.original_price}}</text>
		              </block>
		              <block wx:if="{{!goods.is_negotiable && pageType !== 'STEP'}}">
		                  <text class='renminbi {{__user_info.level != -1 || goods.is_level === false ? "is_member" : ""}}'>￥</text>
		                  <text class='min_price {{__user_info.level != -1 || goods.is_level === false ? "is_member" : ""}}'>{{goods.min_price > 0 ? goods.min_price : goods.price}}</text>
		              </block>
		              <block wx:else>
		                  <text class='min_price'>{{goods.min_price}}</text>
		              </block>
		          </view> -->
			<!-- 商品价格 -->
			<!-- <view style='margin-top:14rpx;' wx:if='{{pageType !=="PINTUAN"}}' class="flex-row flex-y-center">
		              <view wx:if="{{!goods.is_negotiable && pageType !== 'STEP'}}" class="flex-grow-0 view2">
		                  <text class='original_price' wx:if="{{__user_info.level > -1 || !goods.min_member_price || goods.is_level === false}}">￥{{goods.original_price}}</text>
		                  <view class='member_price_box' wx:else> -->
			<!-- 多商户 -->
			<!-- <block wx:if="{{goods.mch}}">
		                          <text>￥{{goods.price}}</text>
		                      </block>
		                      <block wx:else> -->
			<!-- 商城全局会员价显示开关 -->
			<!-- <block wx:if="{{__is_member_price === 1}}">
		                              <text class='member_price_title'>会员价</text>
		                              <text>￥{{goods.min_member_price > 0 ? goods.min_member_price : goods.price}}</text>
		                          </block>
		                          <block wx:else>
		                              <text class='original_price'>￥{{goods.price}}</text>
		                          </block>
		                      </block>
		                  </view>
		              </view>
		              <view wx:if='{{(__is_sales) && (pageType !=="INTEGRAL") && (goods.is_negotiable !=1) && (pageType !== "STEP")}}' class="flex-grow-0 view2">
		                  <text class='sales' wx:if="{{pageType ==='MIAOSHA'}}">已抢：</text>
		                  <text class='sales' wx:else>销量：</text>
		                  <text class='sales'>{{goods.sales}} {{goods.unit}}</text>
		              </view>
		          </view>
		        </view>
		        <view wx:if="{{pageType !=='INTEGRAL' && pageType !== 'STEP'}}" class="flex-grow-0">
		            <button bindtap="showShareModal" class="share_btn" plain="true">
		                <image class='img' src="{{__wxapp_img.share.share.url}}" />
		                <view class='share'>分享</view>
		            </button>
		        </view>
		        </view>
		    </block> -->
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
			<view v-if="linkGoods&&linkGoods.length>0"  class="flex-x-center pr" style="margin-bottom: 38rpx;">
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
		<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="sharePic">
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
										<view :class="'iconfont mr-10 fs-40 color-fff ' + (is_show_again?'icon-weixuanzhong':'icon-xuanzhong ')" @tap="showAgain"></view>
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
	var utils = require("../../../utils/helper.js");

	var gSpecificationsModel = require("../../../components/goods/specifications_model.js"); //商城多规格选择
	//商城多规格选择
	var goodsInfo = require("../../../components/goods/goods_info.js");
	var goodsBuy = require("../../../components/goods/goods_buy.js");
	import util from "../../../utils/util";
	var is_loading_comment = false;
	var is_more_comment = true;
	var p = 1;
	
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
	import goodsbanner1 from "@/components/goods/goods_banner.vue"

	export default {
		data() {
			return {
				filters: require('../../../utils/filters.js'),
				pageType: "PINTUAN",
				hide: "hide",
				form: {
					number: 1,
					pt_detail: false
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
				hasStart: true,
				lestNum: 0,
				role: uni.getStorageSync('role'),
				active2: 1,
				statusBar: getApp().globalData.statusBar,
				customBar: getApp().globalData.customBar,
				custom: getApp().globalData.custom,
				id: "",
				gsId: "",
				oid: "",
				isReturn: false,
				nickName: "",
				avatarUrl: "",
				userId: "",
				mchId: "",
				storeId: "",
				type: 0,
				store: "",
				showGetLogin: false,
				user_info_show: false,
				linkGoods: [],
				allLookList: "",
				address_id: "",
				goods_attr: "",
				attr_group_list: "",
				roomId: "",
				customParams: "",
				liveStatus: "",
				live_room_status_desc: "",
				limit_time: "",
				group_list: "",
				group_num: "",
				goods_id: "",
				show_end_time: "",
				show_attr_picker: false,
				groupNum: "",
				article_detail: "",
				quick: "",
				sameGoods: [],
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
				sharePic: '',
				url: '',
				goods_qrcode_active: '',
				goods_qrcode: '',
				jd_send: {},
				is_show_first: false,
				groupNum: '',
				old: '',
				get_coupon_list: [],
				vip: '',
				isParameter: '',
				goods_attr: {},
				attr_group_list: [],
				attr_group_num: 1,
				attr_group_name: '',
				group_checked: '',
				shareTitle: ''

			};
		},

		components: {
			
			jyfParser,
			goodsbanner1
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

			//#ifdef MP-WEIXIN
			uni.hideShareMenu();
			//#endif
			// var parent_id = 0;
			// var user_id = options.user_id;
			// var scene = decodeURIComponent(options.scene);
			// if (typeof user_id !== 'undefined') {
			// 	parent_id = user_id;
			// } else if (typeof scene !== 'undefined') {
			// 	var scene_obj = utils.scene_decode(scene);
			// 	if (scene_obj.gid) {
			// 		//parent_id = scene_obj.user_id;
			// 		options.gid = scene_obj.gid;
			// 	} else {
			// 		parent_id = scene;
			// 	}
			// } else {
			// 	if (typeof my !== 'undefined') {
			// 		if (getApp().query !== null) {
			// 			var query = getApp().query;
			// 			getApp().query = null;
			// 			options.id = query.gid;
			// 		}
			// 	}
			// }
			
			if (uni.getStorageSync('rel_id') && options.scene) {
				options.gid = uni.getStorageSync('rel_id');
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
								this.setData({
									id: options.gid || options.id,
									gsId: options.gid || options.id,
									oid: options.oid ? options.oid : 0
								});
							}

							gSpecificationsModel.init(this);
							goodsInfo.init(this);
							goodsBuy.init(this);
							this.goodsOnLoad();
							this.checkFirstOrder();
							this.getGoodsInfo(options);
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
					id: options.gid || options.id,
					gsId: options.gid || options.id,
					oid: options.oid ? options.oid : 0
				});
				gSpecificationsModel.init(this);
				
				
				goodsInfo.init(this);
				goodsBuy.init(this);
				this.goodsOnLoad();
				this.checkFirstOrder();
				this.getGoodsInfo(options);
			
			}

			var pages = getCurrentPages();
			var prevPage = pages.length < 2 ? false : true;

			if (prevPage) {
				this.setData({
					isReturn: true
				});
			}

			this.setData({
				nickName: uni.getStorageSync('USER_INFO').nickname,
				avatarUrl: uni.getStorageSync('USER_INFO').avatar_url,
				userId: uni.getStorageSync('USER_INFO').id,
				mchId: uni.getStorageSync('_mchInfo').id,
				storeId: uni.getStorageSync('STORE').id,
				type: 2 // group_checked: options.group_id ? options.group_id : 0

			});
			var store = uni.getStorageSync(this.getApp().const.STORE);
			this.setData({
				store: store,
				role: uni.getStorageSync('role')
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			this.getApp().page.onReady(this);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			// this.getApp().page.onShow(this);
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
		onHide: function() {
			this.getApp().page.onHide(this);
		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {
			this.getApp().page.onUnload(this);
			uni.removeStorageSync(this.getApp().const.PT_GROUP_DETAIL);
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
			var user_info = uni.getStorageSync(this.getApp().const.USER_INFO);
			var mch_info = uni.getStorageSync('_mchInfo');

			switch (res.from) {
				case 'button':
					var res = {
						path: "/pages/pt/details/details?id=" + this.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
						title: self.shareTitle,
						imageUrl: self.sharePic
					};
					break;

				case 'menu':
					var res = {
						path: "/pages/pt/details/details?id=" + this.id + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
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
				this.$store.commit('vuexSet',{
					name: 'show_commission',
					value: !this.$store.state.show_commission
				})
				console.log(this.$store.state.show_commission);
			},
			addCart: function() {
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
					return;
				}

				this.submit('ADD_CART');
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
								linkGoods: res.data.list || []
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

			getGoodsAttr: function() {
				var self = this;
				this.getApp().request({
					url: this.getApp().api.default.goods_attr,
					data: {
						id: self.id,
						from: 3,
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

							self.setData({
								goods_attr: res.data.attr,
								attr_group_list: res.data.attr_group_list,
								lestNum: lestNum
							});
							self.selectDefaultAttr(res.data);
							self.getJDSend();
						}
					}
				});
			},

			/**
			 * 获取商品详情
			 */
			getGoodsInfo: function(e) {

				var gid = e.gid;
				var self = this;
				uni.showLoading({
					title: "正在加载",
					mask: true
				});
				uni.showNavigationBarLoading();
				this.getApp().request({
					url: this.getApp().api.default.goods,
					method: "get",
					data: {
						id: self.id,
						from: 3
					},
					success: function(res) {
						if (res.code == 0) {
							self.countDownRun(res.data.end_time);
							var detail = res.data.detail;
							//WxParse.wxParse("detail", "html", detail, self)
							setTimeout(() => {
								self.article_detail = detail;
							}, 200); //uni.setNavigationBarTitle({
							//     title: res.data.info.name,
							// })

							uni.hideNavigationBarLoading(); // var reduce_price = (res.data.original_price - res.data.price).toFixed(2);

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

							var goods = res.data; // goods.service_list = res.data.service;

							let nowtime = Date.parse(new Date()) / 1000;
							let starttime = goods.start_time;
							let hasStart = true;

							if (starttime > nowtime) {
								hasStart = false;
							}
							//console.log('goods', goods)
							self.goods = JSON.parse(JSON.stringify(goods))
							
							//this.$forceUpdate()
							self.setData({
								// goods: goods,
								['goods.only_price']: goods.price,
								attr_group_list: res.data.attr_group_list,
								limit_time: res.data.limit_time,
								group_list: res.data.groupList,
								group_num: res.data.groupList ? res.data.groupList.length : 0,
								goods_id: res.data.goods_id,
								hasStart: hasStart
							});
							
							self.getGoodsAttr();
							self.getCommentList();
							self.getAllLook();
						} else {
							uni.showModal({
								title: '提示',
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
					},
					complete: function(res) {
						uni.hideLoading();
					}
				});
			},
			more: function() {
				this.setData({
					'pt_detail': true
				});
			},
			end_more: function() {
				this.setData({
					'pt_detail': false
				});
			},
			previewImage: function(e) {
				var urls = e.currentTarget.dataset.url;
				uni.previewImage({
					urls: [urls]
				});
			},

			/**
			 * 执行倒计时
			 */
			countDownRun: function(limit_time_ms) {
				var self = this;
				var leftTime = Number(limit_time_ms);
				var endTime = new Date(leftTime);
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

				var show_end_time = month + '月' + d + '日' + '  ' + h + ':' + m;
				self.setData({
					show_end_time: show_end_time
				});
			},

			/**
			 * 去参团
			 */
			goToGroup: function(e) {
				uni.navigateTo({
					url: '/pages/pt/group/details?oid=' + e.target.dataset.id
				});
			},

			/**
			 * 评论列表页
			 */

			/**
			 * 拼团规则
			 */
			goArticle: function(e) {
				if (this.group_rule_id) {
					uni.navigateTo({
						url: '/pages/article-detail/article-detail?id=' + this.group_rule_id
					});
				}
			},

			/**
			 * 团购
			 */
			buyNow: util.throttle(function() {
				var token = uni.getStorageSync('ACCESS_TOKEN');

				if (!token) {
					this.setData({
						showGetLogin: true,
						user_info_show: true
					});
					this.$store.commit('vuexSet',{name:'show_loginTpl',value:true})
					return;
				}

				this.submit('GROUP_BUY', 0);
			}, 1000),

			/**
			 * 单独购买
			 */
			onlyBuy: function() {
				var self = this;
				this.submit('ONLY_BUY', 0);
			},

			/**
			 * 订单提交
			 */
			submit: function(type, group_id) {
				var self = this;
				var groupNum = type == 'GROUP_BUY';

				if (!self.show_attr_picker || groupNum != self.groupNum) {
					self.setData({
						show_attr_picker: true,
						groupNum: groupNum
					});
					return true;
				}

				if (self.form.number > self.goods.num) {
					uni.showToast({
						title: "商品库存不足，请选择其它规格或数量",
						icon: "none"
					});
					return true;
				}

				self.setData({
					show_attr_picker: false
				});
				var parent_id = 0;

				if (self.oid) {
					type = "GROUP_BUY_C";
					parent_id = self.oid;
				}

				var goods_list = [];
				goods_list.push({
					// goods_id: self.data.goods.id,
					// deliver_type: self.data.goods.type,
					goods_id: self.id,
					num: self.form.number,
					sku: self.goods.sku,
					type: type,
					from: 3,
					group_id: group_id,
					parent_id: parent_id
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
				uni.redirectTo({
					url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(mch_list)
				});
			},

			/**
			 * 拼团倒计时
			 */
			countDown: function() {
				var self = this;
				setInterval(function() {
					var group_list = self.group_list;

					for (var i in group_list) {
						var leftTime = new Date(group_list[i]['limit_time_ms'][0], group_list[i]['limit_time_ms'][1] - 1, group_list[i]
							['limit_time_ms'][2], group_list[i]['limit_time_ms'][3], group_list[i]['limit_time_ms'][4], group_list[i][
								'limit_time_ms'
							][5]) - new Date(); //计算剩余的毫秒数  

						var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 

						var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时

						var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟

						var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数

						days = self.checkTime(days);
						hours = self.checkTime(hours);
						minutes = self.checkTime(minutes);
						seconds = self.checkTime(seconds);
						group_list[i].limit_time = {
							days: days,
							hours: hours > 0 ? hours : '00',
							mins: minutes > 0 ? minutes : '00',
							secs: seconds > 0 ? seconds : '00'
						};
						self.setData({
							group_list: group_list
						});
					}
				}, 1000);
			},

			/**
			 * 图片放大
			 */
			bigToImage: function(e) {
				var urls = this.comment[e.target.dataset.index]['pic_list'];
				uni.previewImage({
					current: e.target.dataset.url,
					// 当前显示图片的http链接
					urls: urls // 需要预览的图片http链接列表

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
			shop(){},
		}
	};
</script>
<style>
	@import "../../../components/goods/specifications_model.css";
	@import "../../../components/goods/goods_banner.css";
	@import "../../../components/goods/goods_info.css";
	@import "../../../components/goods/goods_buy.css";
	@import "../../../components/quick-navigation/quick-navigation.css";

	.time-limit {
		height: 88rpx;
		background-color: #ffa360;
		background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, #ff5527), color-stop(0%, #ff2755));
		background-image: linear-gradient(140deg, #ffa360, #ff5c5c);
		padding: 0 24rpx;
	}

	.especially-tip {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 29rpx 30rpx 20rpx;
	}

	.activity-time {
		padding: 0rpx 25rpx;
		background: #333333;
		border-radius: 18rpx;
	}

	.time-limit image {
		width: 112rpx;
		height: 56rpx;
		margin-right: 20rpx;
	}

	.time-limit-logo-text {
		font-size: 9pt;
		color: #ffffff;
		/* margin-top: 40rpx; */
	}

	.time-top-text {
		font-size: 7pt;
		color: #ffeecc;
		margin-bottom: 5rpx;
	}

	.time-info {
		color: #ffffff;
		font-size: 24rpx;
		line-height: 1;
	}

	.time-value {
		background-color: #ffffff;
		border-radius: 5rpx;
		color: #3f3f3f;
		font-size: 24rpx;
		text-align: center;
		margin: 0 6rpx;
		padding: 9rpx 8rpx;
	}

	/* .group-share image{
    width: 40rpx;
    height: 34rpx;
    margin-bottom: 6rpx;
}
.goods-money{
    padding: 0 24rpx;
    font-size:10pt; 
    color: #ff5c5c;
    background-color:#ffffff;
}
.goods-money-num{
    font-size: 23pt;
    line-height: 1;
} */


	/* .group-share{
    padding-top: 24rpx;
    padding-right:15rpx;
    background-color: transparent !important;
    line-height: normal;
} */
	button::after {
		content: normal !important;
	}

	/* .group-share-text{
    font-size: 8pt;
    color: #707070;
} */
	/* .goods-name{
    font-size: 13pt;
    color: #353535;
    padding: 24rpx;
    background-color:#ffffff;
    line-height:1.5;
} */
	.goods-service {
		padding: 20rpx 24rpx;
		flex-wrap: wrap;
	}

	.service-item {
		padding-right: 20rpx;
		font-size: 9pt;
		line-height: 1;
		height: 40rpx;
	}

	.service-item image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
	}

	.service-more image,
	.goods-attr-more image,
	.pt-rule-more image,
	.comment-more image {
		width: 16rpx;
		height: 26rpx;
	}

	.goods-attr {
		height: 100rpx;
		padding: 0 24rpx;
		background-color: #ffffff;
		border-top: 1rpx solid #f7f7f7;
	}

	.goods-attr-title {
		width: 128rpx;
		font-size: 13pt;
		color: #353535;
	}

	.goods-attr-value {
		font-size: 11pt;
		color: #666666;
	}

	.pt-goods-rule {
		height: 80rpx;
	}

	.friend-group {
		padding: 0 24rpx;
		background-color: #ffffff;
	}

	.pt-rule-title {
		font-size: 9pt;
		color: #666666;
	}

	.pt-rule-right {
		font-size: 9pt;
		color: #919191;
		padding-right: 20rpx;
	}

	.friend-group-title {
		margin: 24rpx 0 20rpx 0;
		font-size: 9pt;
		color: #666666;
	}

	.friend-group-item {
		height: 100rpx;
		padding-left: 20rpx;
	}

	.friend-corver-pic image {
		width: 80rpx;
		height: 80rpx;
		margin-right: 16rpx;
		border-radius: 40rpx;
	}

	.friend-name {
		width: 210rpx;
		font-size: 11pt;
		color: #353535;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		padding-right: 30rpx;
	}

	.group-short {
		font-size: 9pt;
	}

	.group-short-time {
		font-size: 9pt;
		color: #707070;
	}

	.go-offered {
		width: 120rpx;
		padding: 6rpx 0;
		background-color: #F49E3A;
		border-radius: 6rpx;
		color: #ffffff;
		font-size: 9pt;
		margin-left: 36rpx;
	}

	.goods-comment {
		padding: 0 24rpx;
		background-color: #ffffff;
		margin-top: 16rpx;
	}

	.goods-comment-title {
		height: 80rpx;
		font-size: 9pt;
		color: #919191;
	}

	.comment-user-pic image {
		width: 66rpx;
		height: 66rpx;
		border-radius: 33rpx;
		margin-right: 20rpx;
	}

	.goods-comment-item {
		border-top: 1rpx solid #e2e2e2;
		padding-bottom: 36rpx;
	}

	.goods-comment-user {
		margin-top: 32rpx;
	}

	.comment-user-name {
		font-size: 11pt;
		color: #353535;
	}

	.goods-comment-conent {
		font-size: 10pt;
		color: #353535;
		margin: 20rpx 0;
		line-height: 1.3;
	}

	.goods-comment-ginfo {
		font-size: 9pt;
		color: #919191;
		margin-bottom: 16rpx;
	}

	.pt-goods-content {
		margin-top: 16rpx;
	}

	.pt-goods-content-title {
		height: 80rpx;
		background-color: #ffffff;
		padding: 0 24rpx;
		color: #666666;
		font-size: 11pt;
		border-bottom: 1rpx solid #e2e2e2;
	}

	.pt-goods-details {
		box-sizing: border-box;
		padding: 0 0 110rpx 0;
		background: #fff;
		overflow-x: hidden;
	}

	.shop-car {
		position: fixed;
		right: 24rpx;
		top: 60rpx;
		z-index: 999;
	}

	.shop-car image {
		width: 86rpx;
		height: 86rpx;
	}

	.goods-footer-icon {
		background-color: #ffffff;
		border-right: 1rpx solid #e2e2e2;
		width: 110rpx;
	}

	.alone-buy {
		background-color: rgba(244, 158, 58, 0.5);
		font-size: 9pt;
		color: #fff;
		width: 220rpx;
	}

	.alone-buy>.money,
	.group-buy>.money {
		font-size: 12pt;
		/* padding-bottom: 10rpx; */
	}

	.group-buy {
		color: #ffffff;
		font-size: 9pt;
		background-color: #F49E3A;
		/* background: -webkit-gradient(linear, left top, right bottom, color-stop(0%,#ffa360), color-stop(140%,#ff5c5c));
    background-image: linear-gradient(140deg, #ffa360, #ff5c5c); */
		/* width: 334rpx; */
		width: 564rpx
	}


	/* .number-input-box{
    height: 70rpx;
} */
	.number-input-box .number-input {
		height: 70rpx !important;
		border: none;
		text-align: center;
		width: 120rpx;
		background: #eee;
		margin: 0 4rpx !important;
	}

	.number-input-box .number-btn {
		height: 100% !important;
		width: 70rpx;
		background: #eee;
	}

	.number-input-box .number-btn.disabled {
		background: #f6f6f6;
		color: #aaa;
	}

	/* .goods-comment-piclist image{
    width: 160rpx;
    height: 160rpx;
    border-radius: 4rpx;
    margin-right: 16rpx;
} */
	.comment-pic-shell {
		width: 160rpx;
		height: 160rpx;
		border-radius: 4rpx;
		margin-right: 16rpx;
		overflow: hidden;
		display: inline-block;
	}

	/* .float-icon{
    height: 250rpx;
} */



	.share-modal .share-modal-body {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		padding-top: 60rpx;
		transform: translateY(100%);
		transition: transform 250ms;
	}

	.share-modal.active {
		transform: translateY(0);
		background: rgba(0, 0, 0, .5);
	}

	.share-modal.active .share-modal-body {
		transform: translateY(0);
	}

	.share-modal .share-bottom {
		text-align: center;
		font-size: 9pt;
		margin: 0;
		padding: 0;
		margin-bottom: 60rpx;
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

	.share-modal .share-bottom image {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 12rpx;
		border-radius: 999rpx;
		border: 1rpx solid #eee;
	}

	.share-modal .share-bottom:active image {
		opacity: .7;
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
		z-index: 1000;
		background: rgba(0, 0, 0, .5);
		padding: 40rpx;
		transform: translateY(100%);
		opacity: .5;
		transition: opacity 250ms;
		visibility: hidden;
	}

	.goods-qrcode-modal.active {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}

	.goods-qrcode-body {
		border-radius: 10rpx;
		z-index: 99999;
	}

	.goods-qrcode-modal .goods-qrcode-box {
		height: 100%;
		position: relative;
		box-shadow: 0 0 15rpx rgba(0, 0, 0, .15);
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
		width: 100%;
		height: 100%;
		background: #fff;
		display: none;
	}

	.goods-qrcode-modal .goods-qrcode.active {
		display: block;
	}

	.goods-qrcode-modal .goods-qrcode-close {
		position: absolute;
		top: 40rpx;
		right: 40rpx;
		padding: 15rpx;
	}

	.float-icon {
		bottom: 170rpx !important;
	}

	.act-modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2001;
		visibility: hidden;
		opacity: 0;
		transition: 200ms;
	}

	.act-modal.show {
		visibility: visible;
		opacity: 1;
	}

	.act-modal .act-modal-bg {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.act-modal .act-modal-pic {
		background: rgba(0, 0, 0, 0.25);
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.act-modal .act-modal-close image {
		width: 50rpx;
		height: 50rpx;
		margin-top: 50rpx;
	}

	.model-award {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		text-align: center;
	}

	.act-modal-start {
		position: relative;
		height: 730rpx;
	}

	.pt-modal {
		color: #000000;
		width: 650rpx;
		background-color: #ffffff;
		border-radius: 16rpx;
		position: relative;
	}

	.pt-modal-1 {
		padding-top: 28rpx;
		font-size: 13pt;
		color: #353535;
	}

	.pt-modal-2 {
		padding-top: 6rpx;
		color: #999999;
		font-size: 10pt;
	}

	.pt-modal-3 {
		border-bottom: 1rpx solid #e2e2e2;
		margin: 24rpx 0;
	}

	.pt-modal-4 {
		position: absolute;
		top: 24rpx;
		right: 24rpx;
	}

	.pt-modal-4 image {
		height: 50rpx;
		width: 50rpx;
	}

	.pt-modal-5 {
		margin: 0 24rpx 40rpx 24rpx;
	}

	.pt-modal-6 {
		height: 100rpx;
		border-radius: 10rpx;
		background: #f6f6f6;
		margin-bottom: 10rpx;
	}

	.pt-modal-7 {
		width: 80rpx;
		margin-left: 20rpx;
		margin-right: 24rpx;
	}

	.pt-modal-7 image {
		height: 80rpx;
		width: 80rpx;
		border-radius: 40rpx;
	}

	.pt-modal-bj {
		overflow: hidden;
		height: 100%;
	}

	.left {
		width: 14rpx;
		display: inline-block;
		position: absolute;
		top: 50%;
		left: 120rpx;

		border-bottom: 4rpx solid #ff5c5c;
	}

	.recommend {

		text-align: center;
		position: relative;

	}

	.pt-numbox {
		padding-bottom: 8rpx;
		line-height: 1;
	}

	.ptnum {
		padding: 4rpx 6rpx;
		background-color: #fff;
		color: #C10000;
		border-radius: 4rpx;
		font-size: 8px;
	}

	.ns-lh-74 {
		line-height: 74rpx;
	}

	.ptt-box {
		width: 100%;
		height: 47rpx;
	}

	.tab-group-body {
		background-color: #fff;
		padding-bottom: 30rpx;
	}

	.tab-group {
		/* margin-bottom: 200rpx; */
		margin-bottom:0;
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

	.goods-detail {
		padding-top: 30rpx;
	}

	.comment-item .pic-item {
		width: 200rpx;
		height: 200rpx;
		margin-left: 8rpx;
		margin-top: 8rpx;
		display: inline-block;
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

	.blod {
		margin-right: 10rpx
	}

	.goods-goods {
		padding-bottom: 100rpx;
	}

	.iconsize {
		font-size: 36rpx !important;
	}
</style>
