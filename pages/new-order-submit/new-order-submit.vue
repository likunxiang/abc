<template>
	<view class="ordernew">
		<common></common>
		<!--显示有不可以发货的弹窗 -->
		<view class="tips-zhezhao flex-x-center flex-y-center" :style="'height:' + y + 'px'" catchtouchmove="true" v-if="errorsObj && show_tips">
			<view class="tips">
				<view class="text-center ns-text-bold" style="font-size: 44rpx;">温馨提示</view>
				<view class="tips-main fs-30 color-333333">
					结算页中，有无法正常下单的商品， 您可以换个地址，或者移除商品试试
				</view>
				<view class="tips-btn" @tap="closeTips">确定</view>
			</view>
		</view>
		<!-- 显示自提结束 -->

		<!-- 内容开始 -->
		<view class="body after-navber" v-if="mch_list">
			<view style="padding-bottom: 129rpx;" :class="(show_card?'no-scroll':'') + ' ' + ((show_shop || show_coupon_picker || show_card) ?'hidden':'') + ' p-24'">
				<view class="block" v-if="mch_offline &&mch_list[0] && mch_list[0].sqtgData&& mch_list[0].sqtgData.code == 0">
					<view hover-class="none" @tap="goToPickAddress" class="flex align-center">
						<block v-if="pickAddress">
							<view class="flex-grow-1">
								<view class="color-333333 fs-36 ns-text-bold" style="margin-bottom: 31rpx;">切换自提点</view>
								<view class="flex-row" style="margin-bottom: 20rpx">
									<view class="fs-30 color-333333 flex">
										<view class="color-999999" style="width: 130rpx;">提货点：</view>
										<view class="color-666666">{{pickAddress.people_name}}</view>
									</view>
									<view class="ml-30 fs-30 color-999999">{{pickAddress.phone}}</view>
								</view>
								<view class="flex" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 30rpx;">
									<view class="color-999999" style="width: 130rpx;">提货地址：</view>
									<view class="color-333333 ns-text-limit">{{pickAddress.address}}</view>
								</view>
							</view>
						</block>
						<block v-else>
							<view class="flex-grow-1">
								<view class="fs-30" style="color: #FF401A;">切换自提点</view>
							</view>
						</block>
						<view class="flex-grow-0 flex-y-center">
							<image style="width: 12rpx; height: 22rpx;margin-left: 24rpx" :src="__wxapp_img.store.jiantou_r.url"></image>
						</view>
					</view>
				</view>
				<!--选择收货地址-->
				<view class="block" v-if="mch_offline">
					<view hover-class="none" @tap="goToAddress" class="flex align-center">
						<block v-if="address">
							<view class="flex-grow-1">
								<view class="flex-row" style="margin-bottom: 20rpx">
									<view class="fs-30 color-333333 flex">
										<view class="color-999999" style="width: 130rpx;">收货人：</view>
										<view class="color-666666">{{address.name}}</view>
									</view>
									<view class="ml-30 fs-30 color-999999">{{address.mobile}}</view>
								</view>
								<view class="flex" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 30rpx;">
									<view class="color-999999" style="width: 130rpx;">收货地址：</view>
									<view class="color-333333 ns-text-limit">{{address.province}}{{address.city}}{{address.district}}{{address.town}}{{address.detail}}</view>
								</view>
							</view>
						</block>
						<block v-else>
							<view class="flex-grow-1">
								<view class="fs-30" style="color:#FF401A">请选择收货地址</view>
							</view>
						</block>
						<view class="flex-grow-0 flex-y-center">
							<image style="width: 12rpx; height: 22rpx;margin-left: 24rpx" :src="__wxapp_img.store.jiantou_r.url"></image>
						</view>
					</view>
				</view>

				<!--选择付款方式-->
				<!-- <view bindtap="showPayment" class="flex-row flex-y-center" style="background: #fff;padding: 0 24rpx;height: 90rpx;margin-bottom: 20rpx;">
		                <view class="flex-grow-1">支付方式</view>
		                <view class="flex-grow-0" wx:if='{{payment == 0}}'>线上支付</view>
		                <view class="flex-grow-0" wx:if='{{payment == 2}}'>货到付款</view>
		                <view class="flex-grow-0" wx:if='{{payment == 3}}'>账户余额支付</view>
		                <view class="flex-grow-0">
		                    <image src="{{__wxapp_img.store.jiantou_r.url}}" style="width: 12rpx;height: 22rpx;margin-left: 12rpx"></image>
		                </view>
		            </view> -->

				<block v-for="(item, index) in mch_list" :key="index">
					<view class="mch-item">
						<!-- <view class="mch-header ns-text-bold">{{item.name=='平台自营'?'商品清单':item.name}}</view> -->
						<view class="mch-header ns-text-bold">商品清单</view>
						<view class="cart-list">
							<block v-for="(goods, i) in item.goods_list" :key="i" v-if="item.show">
								<view class="flex-col ">
									<view class="cart-item">

										<view class="flex-row">
											<view class="flex-grow-0 goods-pic pr mr-20">
												<image class="goods-pic" mode="aspectFill" :src="goods.goods_pic"></image>
												<view class="remove-box flex-y-center flex-x-center" v-if="goods.err_msg">
													<view class="remove-btn" @click="removeGoods(i)">移除</view>
												</view>
											</view>
											<view class="flex-grow-1 flex-col pr">
												<view class="flex-grow-1">
													<view :class="'goods-name fs-30 ' + (goods.err_msg?'color-999999':'color-333333')">{{goods.goods_name}}</view>
													<view class="attr-list flex align-center justify-between">
														<view class="ns-text-limit flex-grow-1">
															<view v-for="(attr, index) in goods.attr_list" :key="index" class="attr-item fs-24 color-999999">
																{{attr.attr_group_name}}:{{attr.attr_name}}
															</view>
														</view>
														<view :class="'flex-grow-0 fs-30 ' + (goods.err_msg?'color-999999':'color-333333')">×{{goods.num}}</view>
													</view>
													<!-- <view class="type-box1 flex-x-center flex-y-center color-F49E3A fs-24" v-if="goods.delivery_type == 1">快递到家</view> -->
												</view>
												<view class=" flex-row ">
													<!-- 是否会员判断 -->
													<block v-if="item.is_member">
														<view class="flex justify-end flex-grow-1">
															<view class="flex align-center" v-if="goods.m_price>0">
																<view class="iconfont icon-ziyuan101 icon-box "></view>
																<view class=" fs-30 ns-text-bold">￥{{goods.m_price}}</view>
															</view>
														</view>
													</block>
													<block v-else>
														<view class="flex-grow-1 ">
															<view class="flex align-center" v-if="goods.m_price>0">
																<view class="iconfont icon-ziyuan101 icon-box"></view>
																<view class=" color-333333 fs-30 ns-text-bold">￥{{goods.m_price}}</view>
															</view>
														</view>
														<view class="flex-grow-0 color-333333 fs-30">￥{{goods.price}}</view>
													</block>
												</view>
												<!-- <view class="type-box1 flex-x-center flex-y-center color-F49E3A fs-24" v-if="goods.express_desc">{{goods.express_desc}}</view> -->
												<view class="express-insurance fs-24" v-if="goods.goods_insure_desc">{{goods.goods_insure_desc}}</view>
											</view>
										</view>
										<view class="fs-24 color-F23005 ns-text-bold mt-10" v-if="goods.err_msg">{{goods.err_msg}}</view>
										<!-- <view class="fs-24 color-333333 ns-text-bold" v-if="false">【赠品】这里是商品名称</view> -->
										<!-- <view wx:if="{{goods.is_level == 1}}" style='color:#c10000;text-align:right;margin-bottom:22rpx;'>会员折扣价：￥{{goods.level_price}}</view> -->
									</view>
									<!-- <view class='goods-intrgral flex-row' wx:if="{{goods.give > 0}}">
		                                    <view class='flex-y-center'> 订单完成赠送</view>
		                                    <view class='flex-y-center' style='color:#c10000'>{{goods.give}}</view>
		                                    <view class='flex-y-center'>积分</view>
		                                </view> -->
								</view>
							</block>
						</view>

					</view>

					<view class="mch-item">
						<!--配送方式-->
						<!-- <view style='margin-bottom:20rpx;'>
							    <block wx:if="{{item.mch_id == 0}}">
							        <block wx:if="{{item.send_type==0}}">
							            <view class="flex flex-row flex-y-center" style='background-color:#fff;padding:0 24rpx;height:104rpx;'>
							                <view class="flex-grow-1">配送方式</view>
							                <view class="flex-grow-0 flex-row">
							                    <view class='flex-y-center flex-x-center send-type {{item.offline == 0 ?"active":""}}' data-index="{{index}}" data-offline="0" bindtap='getOffline'>
							                        <view>快递配送</view>
							                    </view>
							                    <view class='flex-y-center flex-x-center send-type {{item.offline == 1 ?"active":""}}' data-index="{{index}}" data-offline="1" bindtap='getOffline'>
							                        <view>到店自提</view>
							                    </view>
							                </view>
							            </view>
							        </block>
							    </block>
							    <block wx:else>
							        <view class="flex flex-row flex-y-center" style='background-color:#fff;padding:0 24rpx;height:104rpx;'>
							            <view class="flex-grow-1">配送方式</view>
							            <view class="flex-grow-0 flex-row">
							                <view class='flex-y-center flex-x-center' data-index="{{index}}" data-offline="0">
							                    <view>快递配送</view>
							                </view>
							            </view>
							        </view>
							    </block> -->
						<!--自提信息-->
						<!-- <block wx:if="{{item.offline==1}}">
							        <view class='block'>
							            <view class="flex-row flex-y-center border-bottom" style="padding: 0 24rpx;height: 100rpx;">
							                <view class="flex-grow-1" style="padding-left: 8rpx;border-right:2rpx solid #e3e3e3;">
							                    <input style="width: 300rpx" placeholder='请输入联系人' data-index="{{index}}" value="{{item.offline_name}}" bindinput='KeyName'></input>
							                </view>
							                <view class="flex-grow-1" style='margin-left:32rpx;'>
							                    <input style="width: 300rpx;" placeholder='请输入联系电话' data-index="{{index}}" value="{{item.offline_mobile}}" bindinput='KeyMobile'></input>
							                </view>
							            </view>
							            <view class="flex-row border-bottom" style="background: #fff;padding: 24rpx" bindtap='{{item.shop_list.length>1?"showShop":""}}' data-index="{{index}}">
							                <view class='flex-grow-0' style='width:160rpx;'>
							                    <view>门店信息</view>
							                </view>
							                <view class="flex-grow-1" style='text-align:right'>
							                    <view>{{item.shop.name}}</view>
							                    <view>{{item.shop.mobile}}</view>
							                    <view>{{item.shop.address}}</view>
							                </view>
							                <view class="flex-grow-0 flex-y-center" wx:if='{{item.shop_list.length>1}}'>
							                    <image src="{{__wxapp_img.store.jiantou_r.url}}" style="width: 12rpx;height: 22rpx;margin-left: 20rpx"></image>
							                </view>
							            </view>
							        </view>
							    </block>
							</view> -->
						<view>
							<!--选择优惠券-->
							<view v-if="item.coupon_list && item.coupon_list.length > 0">
								<view class="flex-row flex-y-center border-bottom fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;"
								 :data-index="index">
									<view class="flex-grow-1">现金券</view>
									<view class="flex-grow-0">
										<view v-if="!item.coupon_list||item.coupon_list.length==0" style="color: #595959">目前无可用优惠券</view>
										<block v-else>
											<view v-if="item.picker_coupon && item.picker_coupon.sub_price > 0" style="color: #595959">-{{item.picker_coupon.sub_price}}元</view>
											<view v-else style="color: #595959">有{{item.coupon_list.length}}张优惠券可以使用</view>
										</block>
									</view>
									<!-- <view class="flex-grow-0">
							            <image src="{{__wxapp_img.store.jiantou_r.url}}" style="width: 12rpx;height: 22rpx;margin-left: 12rpx"></image>
							        </view> -->
								</view>
								<view class="couponList">
									<scroll-view scroll-x="true" style="width:100%;">
										<!-- <view class="couponNav clear {{couponIndex==0?'active':''}}" bindtap="pickCoupon" data-index="-1">
							            <view class="pull-left rightContent" style="width:100%">
							              <view class="couponDesc" style="margin:0;line-height:150rpx;text-align: center;width:100%">不使用现金券</view>
							            </view>
							            <image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/closeActive.png" class="pa" wx:if="{{couponIndex==0}}"></image>
							          </view> -->
										<view v-for="(item, index2) in coupon_list" :key="index2" :class="'couponNav clear ' + (item.user_coupon_id==couponIndex?'active':'')"
										 @tap="pickCoupon" :data-index="index">
											<view class="pull-left leftContent">￥{{item.sub_price}}</view>
											<view class="pull-left rightContent">
												<view class="couponDesc">{{item.min_price_desc}}</view>
												<view class="couponTime">{{filters.substring(item.begin_time,item.begin_time.length-6)}} ~
													{{filters.substring(item.end_time,item.end_time.length-6)}}</view>
											</view>
											<image src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/closeActive.png" class="pa" v-if="item.user_coupon_id==couponIndex"></image>
										</view>
									</scroll-view>
								</view>
							</view>
							<!--使用积分-->
							<!-- <view class="flex-row flex-y-center border-bottom" style="background: #fff;padding: 0 24rpx;height: 90rpx;" wx:if="{{item.integral && item.integral.forehead_integral > 0 && integral && integral.forehead_integral > 0}}">
							        <view class="flex-grow-1 flex-y-center">
							            <view class='flex-y-center'>使用{{integral.forehead_integral}}积分抵扣</view>
							            <view class='flex-y-center' style='color:#595959'>{{integral.forehead}}</view>
							            <view class='flex-y-center'>元</view>
							            <view class="flex-y-center" bindtap='integration'>
							                <image src="{{__wxapp_img.store.ntegration.url}}" style="width: 36rpx;height: 36rpx;margin-left: 12rpx"></image>
							            </view>
							        </view>
							        <view class="flex-grow-0 flex-y-center integral-switch" data-index='{{integral_radio}}'>
							            <switch class='flex-y-center' style='height:44rpx' checked bindchange="integralSwitchChange" />
							        </view>
							    </view> -->
						</view>
						<!--满减优惠-->
						<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;"
						 v-if="item.youhui">
							<view class="flex-grow-1">满减优惠</view>
							<view class="flex-grow-0">
								<view style="color:#595959">￥{{filters.toFix(item.youhui,2)}}</view>
							</view>
						</view>
						<!-- 商品总额 -->
						<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;">
							<view class="flex-grow-1">商品总额</view>
							<view class="flex-grow-0">
								<view style="color:#595959">￥{{item.is_member?item.total_real_price:item.total_price}}</view>
							</view>
						</view>
						<!--运费-->
						<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;">
							<view class="flex-grow-1">运费</view>
							<view class="flex-grow-0">
								<block v-if="item.offline==0">
									<block v-if="address">
										<view style="color:#595959">￥{{item.express_price}}</view>
									</block>
									<block v-else>
										<view style="color:#888">请先选择收货地址</view>
									</block>
								</block>

								<block v-else-if="item.offline==1">
									<view style="color:#595959">￥0</view>
								</block>
							</view>
						</view>
						<!--优惠运费-->
						<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;"
						 v-if="item.express_price_discount>0 || buy_member">
							<view class="flex-grow-1">优惠运费</view>
							<view class="flex-grow-0">
								<block v-if="item.offline==0">
									<block v-if="address">
										<view class="color-FF0200">- ￥{{item.express_price_discount}}</view>
									</block>
									<block v-else>
										<view style="color:#888">请先选择收货地址</view>
									</block>
								</block>

								<block v-else-if="item.offline==1">
									<view style="color:#595959">￥0</view>
								</block>
							</view>
						</view>
						<!-- 运费险 -->
						<view class="flex flex-x-b flex-y-cente fs-30 color-333333 pl-24 pr-24" v-if="item.insure_buy_money">
							<view class="flex align-center text-hidden flex-1">
								<text class="iconfont icon-tishi color-999999" style="margin-right: 5rpx;" @tap.stop="toPage('/pages/article-detail/article-detail?id=79')"></text><text>运费险</text><text
								 class="color-666666 ml-10 text-hidden">{{item.insure_give_desc || ''}}</text>
							</view>
							<view class="flex align-center">
								<text style="padding-right: 5rpx;padding-left: 14rpx;">￥ {{xs(item.insure_buy_money,2)}}</text>
								<text class="iconfont icon-weixuanzhong" style="font-size: 40rpx;" v-if="!insure_buy" @tap="choose_insure_buy(true)"></text>
								<text @tap="choose_insure_buy(false)" v-else class="iconfont icon-xuanzhong" style="font-size: 40rpx;color:#EB0401;"></text>
							</view>
						</view>
						<!-- 首单 -->
						<block v-if="item.is_first_order && item.m_sub_total>0">
							<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;">
								<view class="flex-grow-1"><text>亲卡</text> <text class="color-FF0200" style="margin-left: 15rpx;">首单享会员优惠</text></view>
								<view class="flex-grow-0">
									<view class="color-FF0200">- ¥ {{item.m_sub_total}}</view>
								</view>
							</view>
						</block>

						<block v-else>
							<!-- 会员卡 -->
							<block v-if="item.show_card == 1">
								<view class="vip-card" :style="'background: url(' + card_bg_url + ') no-repeat;background-size: 100% 185rpx;'">
									<view class="flex align-center justify-between">
										<view class="flex align-center">
											<view></view>
											<view class="fs-30 ns-text-bold" style="color: #F0D0A5;">亲卡会员</view>
										</view>
										<view class="flex align-center">
											<navigator class="flex align-center" url="/member/getVipCard/getVipCard?type=1">
												<view class="fs-20 color-999999" style="margin-right: 8rpx;">
													查看详情
												</view>
												<view class="iconfont icon-jinru color-fff fs-16 text-center" style="width: 18rpx;height: 18rpx;border-radius: 50%;background: #616161;line-height: 18rpx;"></view>
											</navigator>
										</view>
									</view>
									<view class="flex justify-between mt-20" style="color: #F3C59F;" v-if="item.m_buy_price>0">
										<view class="flex align-center">
											<view>亲卡</view>
											<view :class="'iconfont fs-36 ml-16 ' + (buy_member?'icon-xuanzhong':'icon-weixuanzhong')" @tap="buyMember"></view>
										</view>
										<view class="fs-30">+ ¥ {{item.m_buy_price}}</view>
									</view>
									<view class="flex justify-between mt-20" style="color: #F3C59F;">
										<view>本单可用</view>
										<view class="fs-30">- ¥ {{item.m_sub_total}}</view>
									</view>
								</view>
							</block>
							<block v-if="item.is_normal_member && item.m_sub_total>0 && !item.is_member">
								<!-- 亲卡 -->
								<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;">
									<view class="flex-grow-1">亲卡</view>
									<view class="flex-grow-0">
										<view class="color-FF0200">- ¥ {{item.m_sub_total}}</view>
									</view>
								</view>

							</block>
						</block>
						<!-- 亲币 -->
						<view class="flex-row flex-y-center fs-30 color-333333" style="background: #fff;padding: 0 24rpx;height: 90rpx;"
						 v-if="item.subsidy>0">
							<view class="flex-grow-1">津贴抵扣</view>
							<view class="flex-grow-0 flex align-center">
								<view class="color-FF0200">- ¥ {{item.subsidy}}</view>
								<text class="iconfont icon-weixuanzhong" style="font-size: 40rpx;" v-if="!use_subsidy" @tap="choose_use_subsidy(true)"></text>
								<text @tap="choose_use_subsidy(false)" v-else class="iconfont icon-xuanzhong" style="font-size: 40rpx;color:#EB0401;"></text>
							</view>
						</view>
						<!--订单留言-->
						<view class="flex flex-row flex-y-center border-bottom" style="background: #fff;padding: 0 24rpx;height: 90rpx">
							<view class=" fs-30 color-333333">备注</view>
							<view class=" fs-30 color-333333" style="padding-left: 24rpx;width:80%;">
								<input name="content" :data-index="index" @input="bindContentInput" placeholder="选填,请填写备注" :value="item.remark"
								 style="width:100%;"></input>
							</view>
						</view>
						<!--自定义表单-->
						<!-- <block wx:if='{{item.mch_id == 0 && item.form && item.form.is_form == 1 && item.form.list.length>0}}'>
							    <import src="/components/order/order-submit/form/form" />
							    <template is="form" data="{{item: item,index:index,__wxapp_img:__wxapp_img}}" />
							</block> -->
						<view class="flex-row flex-y-center justify-end" style="background: #fff;padding: 0 24rpx;height: 90rpx;">
							<view class="fs-28 color-4A4A4A">
								<view>共 {{item.downGoodsNum}} 件商品 合计 ¥ {{new_total_price}}</view>
							</view>
						</view>
					</view>
				</block>

			</view>
			<!-- 优惠券选择 -->
			<!-- <view class="coupon-picker" wx:if="{{show_coupon_picker}}"> -->
			<view class="coupon-picker" v-if="false">
				<scroll-view class="coupon-list" scroll-y="true" style="height: 100%">
					<view style="color: #888;font-size: 9pt;margin-bottom: 20rpx;line-height: 1.35">
						注：优惠券只能抵消商品金额，不能抵消运费，商品金额最多优惠到0.01元
					</view>
					<view @tap="pickCoupon" data-index="-1" style="height: 80rpx;margin-bottom: 24rpx;color: #888;border: 1rpx solid #e3e3e3;border-radius: 10rpx"
					 class="flex-y-center flex-x-center">不使用优惠券
					</view>
					<view v-for="(item, index) in coupon_list" :key="index" @tap="pickCoupon" :data-index="index" :class="'coupon-item coupon-status-' + item.status + ' ' + (picker_coupon&&(item.user_coupon_id==picker_coupon.user_coupon_id)?'active':'')">
						<image class="coupon-bg" :src="'/images/img-coupon-bg-' + (item.status==0?0:1) + '.png'"></image>
						<image v-if="item.status!=0" class="coupon-status-icon" :src="'/images/img-coupon-status-icon-' + item.status + '.png'"></image>
						<view class="flex-row" style="height: 100%;overflow: hidden">
							<view class="flex-grow-0 flex-col flex-y-center flex-x-center coupon-left">
								<view class="flex-row flex-y-bottom">
									<view style="font-size: 9pt">￥</view>
									<view :style="'font-size: ' + (item.sub_price.length>4?'13':'19') + 'pt;line-height: .9'">
										{{item.sub_price}}
									</view>
								</view>
								<view style="font-size: 8pt;margin-top: 10rpx">{{item.min_price_desc}}</view>
							</view>
							<view class="flex-grow-1 flex-y-center coupon-right">
								<view style="width: 100%">
									<view class="flex-row flex-y-center mb-10">
										<view class="flex-grow-1" style="font-size: 13pt;font-weight: bold">{{item.event_desc}}
										</view>
										<view class="flex-grow-0" style="font-size: 9pt"></view>
									</view>
									<view style="font-size: 8pt;color: #888">{{item.begin_time}} ~ {{item.end_time}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 优惠券选择 -->
			<!--选择自提地址  开始-->
			<!-- <view class="coupon-picker" wx:if="{{show_shop}}" style='background-color:#f7f7f7;'>
		            <scroll-view class="coupon-list" scroll-y="true" style="height: 100%;padding:0;">
		                <view class='shop-block flex-y-center'>当前地址</view>
		                <view class='shop-address flex-row flex-y-center'>
		                    <view class='flex-grow-1'>{{location}}</view>
		                    <view class='flex-grow-0 flex-y-center' bindtap='dingwei'>
		                        <image src='{{__wxapp_img.shop.dingwei.url}}' style='width:32rpx;height:32rpx;margin-right:2rpx;'></image>
		                        <text style='color:#2495ff'>手动定位</text>
		                    </view>
		                </view>
		                <view class='shop-block flex-y-center'>门店列表（仅展示您最近的30家门店）</view>
		                <view class="flex-row address-picker" style='margin:0;' bindtap='pickShop' wx:for='{{shop_list}}' data-index="{{index}}" wx:key="id">
		                    <view class="flex-grow-0 flex-y-center">
		                        <image lazy-load="true" mode='aspectFit' src="{{item.id==shop.id?'/images/icon-shop-checked.png':'/images/icon-shop-un.png'}}" style="width: 40rpx;height: 40rpx;margin-right: 20rpx"></image>
		                    </view>
		                    <view class="flex-grow-1">
		                        <view class="flex-row" style="margin-bottom: 20rpx">
		                            <view class="flex-grow-1" style='font-weight:bold;{{item.id==shop.id?"color:#c10000":""}}'>
		                                {{item.name}}
		                            </view>
		                            <view class='flex-grow-0' wx:if='{{item.distance!=-1}}'>{{item.distance}}</view>
		                        </view>
		                        <view class="flex-row" style="margin-bottom: 20rpx">
		                            <view class="flex-grow-1">电话：{{item.mobile}}</view>
		                        </view>
		                        <view>地址：{{item.address}}</view>
		                    </view>
		                </view>
		            </scroll-view>
		        </view> -->
			<!--选择自提地址  结束-->
			<!-- <view wx:if='{{show_payment}}' class='payment flex-x-center flex-y-center'>
		            <view class='payment-modal'>
		                <view class='pay-modal'>
		                    <view class='pay-head flex-x-center flex-y-center'>
		                        <view>支付方式</view>
		                        <view class='pay-x' bindtap='payClose'>
		                            <image src='{{__wxapp_img.store.close.url}}'></image>
		                        </view>
		                    </view>
		                    <view style='border-top:1rpx solid #e3e3e3' wx:if="{{pay_type_list.length > 0}}">
		                        <block wx:for='{{pay_type_list}}' wx:key="id">
		                            <view class='pay-block flex-row flex-y-center' bindtap='payPicker' data-index='{{item.payment}}'>
		                                <view class='flex-grow-0'>
		                                    <image src='{{item.icon}}' style='width:56rpx;height:56rpx;margin-right:32rpx;'></image>
		                                </view>
		                                <view class='flex-grow-1 {{payment==item.payment?"red":""}}'>{{item.name}}</view>
		                                <view class='flex-grow-0' wx:if='{{payment==item.payment}}'>
		                                    <image src='{{__wxapp_img.store.pay_right.url}}' style='width:40rpx;height:40rpx;margin-right:18rpx;'></image>
		                                </view>
		                            </view>
		                        </block>
		                    </view>
		                </view>
		            </view>
		        </view> -->
			<block v-else>
				<view class="bottom-bar flex-row align-center" style="padding: 0 24rpx">
					<view class="flex-y-center flex-grow-1">
						<view class="flex ns-align-items-flex-center flex-grow-1" style="color:#c10000 ">
							<view class="fs-40" style="color: #FF0000;">
								<view class="ns-text-bold">￥ <text style="font-size: 60rpx;">{{filters.priceStr(new_total_price)[0]}}.</text>
									<text>{{filters.priceStr(new_total_price)[1]}}</text></view>
								<!-- <view class="fs-20 color-D6D6D6">总共优惠 ¥ 220</view> -->
							</view>
						</view>

					</view>
					<block v-if="offer_rule && offer_rule.is_allowed == 1">
						<view class="flex-y-center flex-grow-0 flex-x-center submit-btn" style="background-color:#ccc;">
							<view style="white-space:normal;">{{offer_rule.msg}}</view>
						</view>
					</block>
					<block v-else>
						<block v-if="!errorsObj">
							<view @tap="orderSubmitThrottle" class="flex-x-center flex-y-center flex-row submit-btn">
								<view>微信支付</view>
							</view>
						</block>
						<block v-else>
							<view class="flex-x-center flex-y-center flex-row submit-btn" style="background: #D6D6D6;;">
								<view>微信支付</view>
							</view>
						</block>
					</block>
				</view>
			</block>
			<block data-src="/components/get-card/get-card.wxml">
				<block v-if="show_card">
					<view class="get-card flex-x-center flex-y-center">
						<view class="card-block">
							<image :src="__wxapp_img.card.top.url" style="width:630rpx;height:330rpx;"></image>
							<view class="card-del flex-x-center flex-y-center" @tap="cardDel">
								<image :src="__wxapp_img.card.del.url"></image>
							</view>
							<view class="flex-x-center">
								<view class="card-info">
									<view class="flex-x-center card-get">获得{{goods_card_list.length}}张卡券</view>
									<block v-for="(item, index) in goods_card_list" :key="index">
										<block v-if="index<1">
											<view class="flex-x-center card-one">
												<view class="card-bg">
													<view class="card-bg-1 flex-row">
														<view class="flex-grow-0 flex-y-center">
															<image :src="item.pic_url" style="width:70rpx;height:70rpx;margin-right:32rpx;"></image>
														</view>
														<view class="flex-grow-1 flex-y-center">
															<view class="text-more-2">{{item.content}}</view>
														</view>
													</view>
												</view>
											</view>
										</block>
									</block>
									<view class="card-text flex-x-center">卡券将5分钟内放入您的卡包</view>
									<view class="flex-x-center card-btn" @tap="cardTo">
										<image :src="__wxapp_img.card.btn.url"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</block>
		</view>
		<!-- 内容结束 -->



		<!-- 内容开始2222222222222222222222 -->
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

		<!-- 内容结束2222222222222222222222 -->
	</view>
</template>

<script>
	// order-submit.js
	import utils from "@/utils/util.js";
	var app = getApp();
	var api = getApp().api;
	var longitude = "";
	var latitude = "";
	import util from "@/utils/helper.js";
	var is_loading_show = false;

	export default {
		data() {
			return {
				x: uni.getSystemInfoSync().windowWidth,
				y: uni.getSystemInfoSync().windowHeight,
				total_price: 0,
				address: null,
				express_price: 0.00,
				express_price_1: 0.00,
				integral_radio: 1,
				new_total_price: 0,
				show_card: false,
				payment: 0,
				show_payment: false,
				show_more: false,
				index: -1,
				mch_offline: true,
				couponIndex: 0,
				is_tips: true,
				buy_member: false,
				options: "",
				submit_mch_list: "",
				time: "",
				remark: "",
				mch_list: [],
				location: "",
				is_pickAddress: false,
				pickAddress: "",
				groupId: "",
				show_shop: false,
				shop_list: "",
				order_type: "",
				coupon_list: [],
				offer_rule: "",
				invalid_area_msg: "",
				show_coupon_picker: '',
				filters: require('../../utils/filters.js'),
				picker_coupon: {},
				get_coupon_list: [],
				insure_buy: true, //选择运费险
				use_subsidy: false,
				edit_mch_list: {}, // 储存preview数据
				errorsObj: false,
				show_tips: true
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			//console.log('options',options)
			//支付方法绑定到页面
			this.getApp().orderPay.init(this);
			// console.log(this.order_submit)
			this.getApp().page.onLoad(this, options);
			var self = this;
			var time = util.formatData(new Date());
			uni.removeStorageSync(this.getApp().const.INPUT_DATA);
			self.setData({
				options: options,
				submit_mch_list: options.mch_list,
				time: time
			});
			is_loading_show = false;
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function(e) {
			if (is_loading_show) {
				return;
			}

			is_loading_show = true;
			this.getApp().page.onShow(this);
			var self = this;
			var address = uni.getStorageSync(this.getApp().const.PICKER_ADDRESS);

			if (address) {
				self.setData({
					address: address
				});
			}
			this.edit_mch_list = self.options
			console.log("onshow", self.options);
			self.getOrderData(this.edit_mch_list);
		},
		onHide: function() {
			this.getApp().page.onHide(this);
			var self = this;
			self.getInputData();
		},
		onUnload: function() {
			this.getApp().page.onUnload(this);
			uni.removeStorageSync(this.getApp().const.INPUT_DATA);
		},
		methods: {
			removeGoods(index) {
				console.log(this.edit_mch_list.mch_list);
				let mch_list = JSON.parse(this.edit_mch_list.mch_list) // JSON先转数组
				console.log(mch_list[0].goods_list[index]);
				mch_list[0].goods_list.splice(index, 1)
				console.log(mch_list);
				console.log(JSON.stringify(mch_list));
				mch_list = JSON.stringify(mch_list) // 数组转JSON
				console.log(mch_list);
				let edit_mch_list = {
					mch_list: mch_list
				}
				this.edit_mch_list = edit_mch_list
				this.getOrderData(edit_mch_list)

			},
			choose_insure_buy(choose) {
				this.insure_buy = choose;
				this.getPrice()
			},
			choose_use_subsidy(choose) {
				this.use_subsidy = choose;
				this.getPrice()
			},
			closeTips() {
				this.show_tips = false
			},

			bindContentInput: function(e) {
				this.setData({
					remark: e.detail.value
				});
			},
			KeyName: function(e) {
				var mch_list = this.mch_list;
				var index = e.currentTarget.dataset.index;
				mch_list[index].offline_name = e.detail.value;
				this.setData({
					mch_list: mch_list
				});
			},
			KeyMobile: function(e) {
				var mch_list = this.mch_list;
				var index = e.currentTarget.dataset.index;
				mch_list[index].offline_mobile = e.detail.value;
				this.setData({
					mch_list: mch_list
				});
			},
			getOffline: function(e) {
				var self = this;
				var offline = e.currentTarget.dataset.offline;
				var index = e.currentTarget.dataset.index;
				var mch_list = self.mch_list;
				mch_list[index].offline = offline;
				self.setData({
					mch_list: mch_list
				});

				if (mch_list.length == 1 && mch_list[0].mch_id == 0 && mch_list[0].offline == 1) {
					self.setData({
						mch_offline: false
					});
				} else {
					self.setData({
						mch_offline: true
					});
				}

				self.getPrice();
			},
			dingwei: function() {
				var self = this;
				getApp().getauth({
					content: "需要获取您的地理位置授权，请到小程序设置中打开授权",
					author: "scope.userLocation",
					success: function(e) {
						if (e) {
							if (e.authSetting["scope.userLocation"]) {
								uni.chooseLocation({
									success: function(e) {
										longitude = e.longitude;
										latitude = e.latitude;
										self.setData({
											location: e.address
										});
										self.getOrderData(self.options);
									}
								});
							} else {
								uni.showToast({
									title: '您取消了授权',
									image: "/static/images/icon-warning.png"
								});
							}
						}
					}
				});
			},
			orderSubmitThrottle: utils.throttle(function() {
				this.orderSubmit();
			}, 1000),
			orderSubmit: function(e) {
				var self = this;
				var data = {};

				if (self.pickAddress) {
					data.dispatching_id = self.pickAddress.id || '';
				}

				if (self.remark) {
					data.remark = self.remark || '';
				}

				var mch_list = self.mch_list;

				for (var k in mch_list) {
					var form = mch_list[k].form;

					if (form && form.is_form == 1 && mch_list[k].mch_id == 0) {
						var form_list = form.list;

						for (var i in form_list) {
							if (form_list[i].required == 1) {
								if (form_list[i].type == 'radio' || form_list[i].type == 'checkbox') {
									var is_true = false;

									for (var j in form_list[i].default_list) {
										if (form_list[i].default_list[j].is_selected == 1) {
											is_true = true;
										}
									}

									if (!is_true) {
										uni.showModal({
											title: '提示',
											content: '请填写' + form.name + '，加‘*’为必填项',
											showCancel: false
										});
										return false;
									}
								} else {
									if (!form_list[i].default || form_list[i].default == undefined) {
										uni.showModal({
											title: '提示',
											content: '请填写' + form.name + '，加‘*’为必填项',
											showCancel: false
										});
										return false;
									}
								}
							}
						}
					}

					if (mch_list.length == 1 && mch_list[k].mch_id == 0 && mch_list[k].offline == 1) {} else {
						if (!self.address) {
							uni.showModal({
								title: '提示',
								content: '请选择收货地址',
								showCancel: false
							});
							return false;
						}

						data.address_id = self.address.id;

						if (self.buy_member) {
							data.buy_member = true;
						}
						if (self.use_subsidy) {
							data.use_subsidy = mch_list[k].subsidy;
						}
					}
				}

				var mchList = [{
					"mch_id": 0,
					"goods_list": [],
				}];
				var goods_length = mch_list[0].goods_list.length;

				for (var i = 0; i < goods_length; i++) {
					var gInfo = mch_list[0].goods_list[i];
					mchList[0]['goods_list'][i] = {
						"goods_id": gInfo.id,
						"cart_id": gInfo.cart_id || '',
						"num": gInfo.num,
						"sku": gInfo.sku,
						"from": gInfo.from || 1,
					};
				}
				data.insure_buy = this.insure_buy ? '1' : '0'
				data.mch_list = JSON.stringify(mchList); // if (self.data.pond_id > 0) {
				//     if (self.data.express_price > 0 && self.data.payment == -1) {
				//         self.setData({
				//             show_payment: true
				//         });
				//         return false;
				//     }
				// } else {
				//     if (self.data.payment == -1) {
				//         self.setData({
				//             show_payment: true
				//         });
				//         return false;
				//     }
				// }

				self.integral_radio == 1 ? data.use_integral = 1 : data.use_integral = 2;
				data.payment = self.payment; // data.formId = e.detail.formId;
				// if (wx.getStorageSync('promoter').id) {
				//   data.promoter = wx.getStorageSync('promoter').id
				// }else {
				//   data.promoter = ''
				// }

				var order_type = self.order_type;

				if (order_type && order_type == 3) {
					self.order_submit(data, 'pt');
				} else {
					self.order_submit(data, 's');
				}
			},
			getOrderData: function(options) {
				console.log(options);
				var self = this;
				var data = {};
				var address_id = "";
				if (self.address && self.address.id) address_id = self.address.id;
				data.address_id = address_id;
				data.longitude = longitude;
				data.latitude = latitude;
				uni.showLoading({
					title: "正在加载",
					mask: true
				});
				data.mch_list = options.mch_list;
				this.getApp().request({
					url: this.getApp().api.order.new_submit_preview,
					method: "POST",
					data: data,
					success: function(res) {

						uni.hideLoading();

						if (res.code == 0) {

							var input_data = uni.getStorageSync(self.getApp().const.INPUT_DATA);
							var res_data = res.data;
							var payment = -1;
							var integral_radio = 1;
							var mch_list = res_data.mch_list;
							console.log('mch_list', mch_list)
							var mch_list_other = [];

							// 用于判断弹窗和支付按钮
							var errorsObj = res_data.mch_list[0].errors
							console.log('errorsObj', errorsObj);
							console.log(Object.keys(errorsObj).length);
							if (Object.keys(errorsObj).length == 0) {
								self.errorsObj = false
							} else {
								self.errorsObj = true
							}

							if (input_data) {
								mch_list_other = input_data.mch_list;
								payment = input_data.payment;
								integral_radio = input_data.integral_radio;
							}

							if (res_data.mch_list[0].sqtgData && res_data.mch_list[0].sqtgData.code == 0) {
								var pickAddress = uni.getStorageSync('PICK_ADDRESS');
								var groupId = res_data.mch_list[0].sqtgData.data.communityIdTo;
								self.setData({
									is_pickAddress: true,
									pickAddress: pickAddress,
									groupId: groupId
								});
							} // 是否选用积分


							res_data.integral_radio = integral_radio; // 支付方式

							for (var i in res_data.pay_type_list) {
								if (payment == res_data.pay_type_list[i].payment) {
									res_data.payment = payment;
									break;
								}

								if (res_data.pay_type_list.length == 1) {
									res_data.payment = res_data.pay_type_list[i].payment;
									break;
								}
							}

							for (var i in mch_list) {
								var shop = {};
								var picker_coupon = {};

								mch_list[i].show = true;
								mch_list[i].show_length = mch_list[i].goods_list.length - 1; // 判断是否有缓存的用户填写信息

								if (mch_list_other.length != 0) {
									for (var j in mch_list_other) {
										if (mch_list[i].mch_id == mch_list_other[j].mch_id) {
											mch_list[i].remark = mch_list_other[j].remark;
											mch_list[i].form = mch_list_other[j].form;
											shop = mch_list_other[j].shop;
											picker_coupon = mch_list_other[j].picker_coupon;
											mch_list[i].offline_name = mch_list_other[j].offline_name;
											mch_list[i].offline_mobile = mch_list_other[j].offline_mobile;
										}
									}
								} // 门店选择


								for (var j in mch_list[i].shop_list) {
									if (shop && shop.id == mch_list[i].shop_list[j].id) {
										mch_list[i].shop = shop;
										break;
									}

									if (mch_list[i].shop_list.length == 1) {
										mch_list[i].shop = mch_list[i].shop_list[j];
										break;
									}

									if (mch_list[i].shop_list[j].is_default == 1) {
										mch_list[i].shop = mch_list[i].shop_list[j];
										break;
									}
								} // 优惠券


								if (picker_coupon) {

									if (mch_list[i].coupon_list) { //lqq 添加条件
										// console.log('coupon_list',coupon_list)
										for (var j in mch_list[i].coupon_list) {
											if (picker_coupon.id == mch_list[i].coupon_list[j].id) {
												mch_list[i].picker_coupon = picker_coupon;
												break;
											}
										}
									}

								} // 判断配送方式


								if (mch_list[i].send_type && mch_list[i].send_type == 2) {
									mch_list[i].offline = 1;
									self.setData({
										mch_offline: false
									});
								} else {
									mch_list[i].offline = 0;
								}
							}

							res_data.mch_list = mch_list;
							var index = self.index;

							if (index != -1 && mch_list[index].shop_list && mch_list[index].shop_list.length > 0) {
								self.setData({
									show_shop: true,
									shop_list: mch_list[index].shop_list
								});
							}

							if (res_data.address == null) {
								res_data.address = uni.getStorageSync(self.getApp().const.PICKER_ADDRESS);
								self.setData(res_data);
							}

							self.setData(res_data);

							if (res_data.mch_list[0].goods_list[0].from) {
								var order_type = res_data.mch_list[0].goods_list[0].from;
								self.setData({
									order_type: order_type
								});
							} // 计算总价


							self.getPrice();
						}

						if (res.code == 1) {

							uni.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								confirmText: "返回",
								success: function(res) {
									if (res.confirm) {
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						}

						self.showCouponPicker();

						if (self.coupon_list) {
							self.pickCoupon({
								'currentTarget': {
									'dataset': {
										'index': 0
									}
								}
							});
						}
					}
				});
			},
			showCouponPicker: function(e) {
				var self = this;
				var index = 0;
				var mch_list = self.mch_list;

				self.getInputData();

				if (mch_list !== null) {
					if (mch_list[index] && mch_list[index].coupon_list && mch_list[index].coupon_list.length > 0) {
						self.setData({
							coupon_list: mch_list[index].coupon_list,
							index: index
						});
					}
				}
			},
			pickCoupon: function(e) {

				this.showCouponPicker();

				var self = this;
				var index = e.currentTarget.dataset.index;
				var couponIndex = this.couponIndex;
				var mch_index = self.index;
				var data = uni.getStorageSync(this.getApp().const.INPUT_DATA);
				uni.removeStorageSync(this.getApp().const.INPUT_DATA);
				var mch_list = data.mch_list;

				if (index == '-1' || index == -1) {
					if (mch_list[mch_index]) {
						mch_list[mch_index].picker_coupon = false;
					}

					data.show_coupon_picker = false;
					couponIndex = 0;
				} else {
					if (mch_list[mch_index]) {
						mch_list[mch_index].picker_coupon = self.coupon_list[index];
					}

					data.show_coupon_picker = false;
					couponIndex = self.coupon_list[index] ? self.coupon_list[index].user_coupon_id : couponIndex;
				}

				data.mch_list = mch_list;
				data.index = -1;
				self.setData(data);
				self.setData({
					couponIndex: couponIndex
				});
				self.getPrice();

			},
			showShop: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;


				self.getInputData();
				self.setData({
					index: index
				});
				self.dingwei();
			},
			pickShop: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var mch_index = self.index;
				var data = uni.getStorageSync(this.getApp().const.INPUT_DATA);
				var mch_list = data.mch_list;

				if (index == '-1' || index == -1) {
					mch_list[mch_index].shop = false;
					data.show_shop = false;
				} else {
					mch_list[mch_index].shop = self.shop_list[index];
					data.show_shop = false;
				}

				data.mch_list = mch_list;
				data.index = -1;
				self.setData(data);
				self.getPrice();
			},
			integralSwitchChange: function(e) {
				var self = this;

				if (e.detail.value != false) {
					self.setData({
						integral_radio: 1
					});
				} else {
					self.setData({
						integral_radio: 2
					});
				}

				self.getPrice();
			},
			integration: function(e) {
				var self = this;
				var integration = self.integral.integration;
				uni.showModal({
					title: '积分使用规则',
					content: integration,
					showCancel: false,
					confirmText: '我知道了',
					confirmColor: '#c10000',
					success: function(res) {
						if (res.confirm) {}
					}
				});
			},
			contains: function(arr, obj) {
				//while
				var i = arr.length;

				while (i--) {
					if (arr[i] == obj) {
						return i;
					}
				}

				return -1;
			},

			/**
			 * 计算总价
			 */
			getPrice: function() {

				var self = this;
				var mch_list = self.mch_list;
				var integral_radio = self.integral_radio;
				var integral = self.integral;
				var new_total_price = 0;
				var invalid_area_msg = '';
				var offer_rule = {};

				for (var i in mch_list) {
					var mch = mch_list[i];
					var total_price = parseFloat(mch.total_price); //var goods = mch_list[i].goods_list;

					if (mch.offline == 0) {
						//if (mch.express_price) { // 计算运费
						//	total_price = total_price + parseFloat(mch.express_price);
						//}
						if (mch.offer_rule && mch.offer_rule.is_allowed == 1) {
							offer_rule = mch.offer_rule;
						}

					} // 计算满减
					//if (mch.youhui) {
					//	total_price = total_price - parseFloat(mch.youhui)
					//}
					// 购买会员
					//if (mch.is_member) {
					//	total_price = total_price - parseFloat(mch.m_sub_total)
					//	console.log(total_price);
					//} else {
					//	if (self.data.buy_member) {
					//		total_price = total_price + parseFloat(mch.m_buy_price)
					//		total_price = total_price - parseFloat(mch.m_sub_total)
					//	}
					//}
					// 使用津贴
					//if (mch.subsidy > 0) {
					//	total_price = total_price - parseFloat(mch.subsidy)
					//	console.log(total_price);
					//}
					// 首单立减
					//if(mch.is_first_order) {
					//	total_price = total_price - parseFloat(mch.is_first_order)
					//	console.log(total_price);
					//}


					new_total_price = new_total_price + parseFloat(mch.total_real_price);

					if (self.buy_member) {
						// 购买会员的
						if (mch.is_member && !mch.is_normal_member) {
							new_total_price = new_total_price + parseFloat(mch.m_buy_price);
						}

						if (!mch.is_member) {
							new_total_price = new_total_price + parseFloat(mch.m_buy_price);
							new_total_price = new_total_price - parseFloat(mch.m_sub_total);
						}
						if (mch.express_price_discount) {
							new_total_price = new_total_price - parseFloat(mch.express_price_discount);
						}
					}
					if (self.insure_buy) {
						new_total_price = new_total_price + parseFloat(mch.insure_buy_money);
					}
					if (self.use_subsidy) {
						new_total_price = new_total_price - parseFloat(mch.subsidy);
					}
				} //new_total_price = new_total_price >= 0 ? new_total_price : 0;


				self.setData({
					new_total_price: new_total_price.toFixed(2),
					offer_rule: offer_rule,
				});
			},
			cardDel: function() {
				var self = this;
				self.setData({
					show_card: false
				});
				uni.redirectTo({
					url: '/pages/order/order?status=1'
				});
			},
			cardTo: function() {
				var self = this;
				self.setData({
					show_card: false
				});
			},
			formInput: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var formId = e.currentTarget.dataset.formId;
				var mch_list = self.mch_list;
				var form = mch_list[index].form;
				var form_list = form.list;
				form_list[formId].default = e.detail.value;
				form.list = form_list;
				self.setData({
					mch_list: mch_list
				});
			},
			selectForm: function(e) {
				var self = this;
				var mch_list = self.mch_list;
				var index = e.currentTarget.dataset.index;
				var formId = e.currentTarget.dataset.formId;
				var k = e.currentTarget.dataset.k;
				var form = mch_list[index].form;
				var form_list = form.list;
				var default_list = form_list[formId].default_list;

				if (form_list[formId].type == 'radio') {
					for (var i in default_list) {
						if (i == k) {
							default_list[k].is_selected = 1;
						} else {
							default_list[i].is_selected = 0;
						}
					}

					form_list[formId].default_list = default_list;
				}

				if (form_list[formId].type == 'checkbox') {
					if (default_list[k].is_selected == 1) {
						default_list[k].is_selected = 0;
					} else {
						default_list[k].is_selected = 1;
					}

					form_list[formId].default_list = default_list;
				}

				form.list = form_list;
				mch_list[index].form = form;
				self.setData({
					mch_list: mch_list
				});
			},
			showPayment: function() {
				this.setData({
					show_payment: true
				});
			},
			payPicker: function(e) {
				var index = e.currentTarget.dataset.index;
				this.setData({
					payment: index,
					show_payment: false
				});
			},
			payClose: function() {
				this.setData({
					show_payment: false
				});
			},
			getInputData: function() {
				var self = this;

				var mch_list = self.mch_list;
				var data = {
					integral_radio: self.integral_radio,
					payment: self.payment,
					mch_list: mch_list
				};
				uni.setStorageSync(this.getApp().const.INPUT_DATA, data);
			},
			uploadImg: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var formId = e.currentTarget.dataset.formId;
				var mch_list = self.mch_list;
				var form = mch_list[index].form;
				is_loading_show = true;
				this.getApp().uploader.upload({
					start: function() {
						uni.showLoading({
							title: '正在上传',
							mask: true
						});
					},
					success: function(res) {
						if (res.code == 0) {
							form.list[formId].default = res.data.url;
							self.setData({
								mch_list: mch_list
							});
						} else {
							self.showToast({
								title: res.msg
							});
						}
					},
					error: function(e) {
						self.showToast({
							title: e
						});
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			},
			goToAddress: function() {
				is_loading_show = false;
				uni.navigateTo({
					url: '/pages/address-picker/address-picker'
				});
			},
			goToPickAddress: function() {
				is_loading_show = false;
				uni.navigateTo({
					url: '/member/groupPickUp/groupPickUp?id=' + this.groupId
				});
			},

			buyMember() {
				this.setData({
					buy_member: !this.buy_member
				});
				this.getPrice();
			}

		}
	};
</script>

<style>
	page {
		height: 100%;
	}

	.tips-zhezhao {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.35);
		z-index: 1001;
	}

	.type-box1 {
		position: absolute;
		bottom: 54rpx;
		padding: 10rpx 8rpx;
		background-color: rgba(244, 158, 58, 0.2);
		border-radius: 8rpx;
	}

	.tips {
		background-color: #fff;
		width: 580rpx;
		padding: 53rpx 40rpx 30rpx;
		border-radius: 20rpx;
	}

	.tips-main {
		padding: 70rpx 10rpx;
	}

	.tips-btn {
		width: 500rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 30rpx;
		color: #fff;
		background: #FF401A;
		box-shadow: 0px 6rpx 14rpx 0px rgba(255, 69, 32, 0.55);
		border-radius: 44rpx;
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 98rpx;
		background: #fff;
		border-top: 1rpx solid #e3e3e3;
		width: 100%;
		z-index: 1000;
	}

	.bottom-bar .submit-btn {
		background: linear-gradient(90deg, #FE4001, #EB0301);
		color: #fff;
		width: 180rpx;
		text-align: center;
		margin: 0;
		padding: 0 20rpx;
		border-radius: 0;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 35rpx;
		font-size: 26rpx;
	}

	.address-picker {
		background: #fff;
		padding: 34rpx 24rpx;
	}

	.cart-checkbox {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		background-size: 100% 100%;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMDgzZTc4NS0yZWUwLTk3NDYtODQ2NC1mNDdlYTAyYzc0ZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjY3OTc5QzU2MjEzMTFFN0FDRjRERTQzREY3RkRCMEEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjY3OTc5QzQ2MjEzMTFFN0FDRjRERTQzREY3RkRCMEEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmYyOWE3YjUtNWQzNy00YzQyLTkyMmEtNDI5MmQxOTI4ZjAwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTJjMmQwMzEtNWIxYS0xMWU3LThmZWQtOWJlNjEyYzhjM2FmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mTXtkwAAAvtJREFUeNrMmTtMU1EYx09vCgNClYADCjIJPuNATQyTipsxxgUwGo3BQaJgdDImYkLVjcEomySKD4wOxriY+Oio0TooPhmhylJfCA6tov+/+d/YNLW9rX2cL/mFpL093y/33HvO+T58oVDI5BEOWA82gSBoAUvBAn0/B96DCRABYfAUzOeayJ/j9Y3gINgFvoIH4CZ4C6bArK6rBk2gFbSDC2AhuAqGQbTQgnVgEOwEF8FWMJ7h+k/iObihz9aCfeAFGAMD4KOXqcoWneAV+KmpPJpF7l8xrt8u11gcs+t/7iC/Owc6wDY9Q4UI3rV+MAqugY2gD/zI5Q5WgVugWS9BoeSSI6Kxm5WryqugX88I38TtYMYUL2aUY045/V4EzwMf2AMSpviRUC6fcmcU7NIztxvETekirpwdWinSCnIpOQu6izytmaa7Ww6L0wme0qL7zJQvmPs6CKUuM8s0vS2m/DGoLfIMmHTvYC+4BGIWCMa0W/W6U+zoAR0x9sSInBz3VMKN/6VFgtwGv9CNgpvBPWNf3OdxjoJt4LGFgnQKOjqzvbFQkE6tFGwAHywU5Im8gYI14JuFgnSqcdfBX8bScGQasNDtz8xScBossVCQVeI0Bd+BlRYKrqCboxPEBgsF6RRxVFRvsVCQTmEKPgGLwGqL5OhSy2LNUTviCuixSLBHTvPuOsh2xF5Qb4FcvVyGk4/8UR21BywQPKF2STS1s0C51zpZl6suaVPhtCpd0cSWxGEV0OXYWQLKfcQkNZVS62JO80NwGVSUUK5COcPq12TsLPTr72iJJF05Rp+X1kdc1T0bjreLPN0B5ahWzrgXQcZ3NXUmzd8uVKEjqLGZY4dyGq+CblPngN7uO2pJ1BVAzG2xcMyTypHIdB7MFnxx2L6tVMU/BNbkuX0NaYxKjTmW7Udee9QxVfqnwSFwF3xWafhIR7appNKBh80mtVLatfHXavtaZ4rQRDdJO84xcFwFP2vqTok06mFnzOraCS36+02e/4b4LcAAUnSneJ5vIwgAAAAASUVORK5CYII=);
	}

	.cart-checkbox.active {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMDgzZTc4NS0yZWUwLTk3NDYtODQ2NC1mNDdlYTAyYzc0ZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTdBNkMwNEE2MjEzMTFFNzgxMTQ4NTRCQTNGNTA3NDciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTdBNkMwNDk2MjEzMTFFNzgxMTQ4NTRCQTNGNTA3NDciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MmYyOWE3YjUtNWQzNy00YzQyLTkyMmEtNDI5MmQxOTI4ZjAwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6OTJjMmQwMzEtNWIxYS0xMWU3LThmZWQtOWJlNjEyYzhjM2FmIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jZ4NYwAABUJJREFUeNq0WQlsFGUUfv/QbVla2nJISpBUqhUP1GgqxISSSFYxUkmEGGu9CLGJV7zAqGgU0FgD8Y41sYonajRilZpWMXKppEooimIQMYghtFCltgXabXd/v8f/NrOlzM7s7OxLvqT7787MN+9+ryp+D6UrOUABcA4wC5gKlAKnAXmABnqAg8A+4CdgK/A30OvnYV4lFzgLmA9cB5wPjPBwHRPuAzYCHwJfAe1eH6o8arAcWAjcB4yizORPYAXQBPzj9mPL5XsmcwPwPbA0AHIsZcBbwBrg0kwIsk89C7wPjKfgZQ6wAbjZjw9OAN4ErqbsSj7wjijjOa8a5Ivezgo5JWE1/KlsqXu9EnwFuCpwckxsEDgsyWaEELblBWCBG8FbBcEKPyUmxPJHG6JHT6keJjnFiSAn21VZITcoaXtaJdHiD4hqlsP7i006H0rydODp5FMryQBLxFmD97sjQPE4UgsbSJXPJXXF4yB7JdG/ksaHSrVUqCEEuVzdnhXtHQOOg+c1i5Cspprzowfgi7+lqmOPStk8cYscYZ0TOEEt2jsbuTmyxD5veYlo+85U2TUCXJQgmO+WLH1HLWtPQRHz7icKTzDnB7eRbn6NaCT+Dp/SxAnhmh9ighcCZwTudxwY3UBFBanpteY8hjBuXEnU0UU0UX7jLHOBkVayQwYqrL2CMaTmL4M288zZL82kNzWaULRSao+knSvln52XFe0xwZkot2URc/7fPtKfP0PUP0A01lV7iTI8jQlODjwwELVUMpHUvKfs8x/XIjC241yStjeZwgTHBa69aAi57jZo6kxz3r6D9LonTeLghi3u+Y7jLYklbw/ud3l7LeWsHP1t5BE5w0XfrEbz35Wu9ljC7q7K6SLKN0bHnwfn6VPmszWs2Jtzzh9V6G1D8t57t5JeX2/s5P60Ya9syYDjrDlOFfFRpBYsI7V8BzSDitAdgtPL98kk+bfTK0ldXGM+96GjX4fA6IHaxqStPZYeSxqg1HW0dAaIoV0rnkyq+nUMAQ/j4XmmlibSPQdGYQGpKgSGEtY/f0G69UvT/sZ8eXW7JUOMs/CAeWAX0c5mm3cVZp5FcHqdb489rNHZ6NRKK8znrv2kG1cY8uG0TZuQPXx5m+PXcYnxIx1E9XdCI5/ZJCMPEt3xPHytkOh3bpSQlOcstfuPbxuIdu812hv0nep38d02pzQAvzmiT3ceQrd4E1HruzbJy1DC7n6VqGiSIVdYIob5lXQTSlqRh7nRWVqBjoSJf0ipxZjpc/VAL+lVt2AWe9kmeUkNqTrM47NqbTZNTxB1IqSLffsey1pObJYkhwbX6hCVmoPY0C9i2m+pS+rFZyK7FEla2UB64yem3mrf5HgTwU4fs0RHPOV3uF7GJCfRCdPpepj004eGv8nHi43WwmlVjJMFqYL2J3fUncBjni7tl6kZzaZeDT9bA9NGu813W+pJt7WZRtS/aTkvsw8NnLyb4RZyE6daTw1BrqQWRiXmixJ0zZsRQMcxro3OSHtslpVOy6MKIeltBxOSZNAlpLk3L8xIe1uk3Y86zcXbAO8bwwEZbdikYyWp+yf3B1CbTM5ps/CGbLK8SVxKYiijqMWYRyjytNvrdqtO5uT0GlX/mqsW86a1fuOFzvVelowZyHrgWi6MfheYHwGXA+8FTIx7nweAG3mUymTDyoIJm+6ShePXGRLrlf3PDFkUHXZt5tPc8nPbea6YZTZwgUxfymUI+E5KVwvwl6R7b2OOj39DkKTpsGzEeGwtk2STK3HNpA5JVO4hs9U/5id9/y/AAE5SXtAR89lTAAAAAElFTkSuQmCC);
	}

	.cart-item {
		background: #fff;
		/* border-bottom: 1rpx solid #e3e3e3; */
		padding: 20rpx 24rpx 10rpx 24rpx;
	}

	.cart-item .goods-pic {
		width: 200rpx;
		height: 200rpx;
		border-radius: 14rpx;
		overflow: hidden;
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

	.cart-item .attr-list .attr-item {
		display: inline-block;
		margin-right: 36rpx;
	}

	.cart-item .attr-list .attr-item:last-child {
		margin-right: 0;
	}

	.cart-item .price {
		color: #c10000;
	}

	.coupon-picker {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1001;
		background: #fff;
		border-top: 1rpx solid #e3e3e3;
	}

	.coupon-list {
		padding: 34rpx;
	}

	.coupon-list .coupon-item {
		height: 152rpx;
		width: 682rpx;
		position: relative;
		margin-bottom: 24rpx;
	}

	.coupon-list .coupon-item.coupon-status-1 .coupon-right,
	.coupon-list .coupon-item.coupon-status-2 .coupon-right {
		color: rgba(0, 0, 0, 0.35) !important;
	}

	.coupon-list .coupon-item .coupon-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.coupon-list .coupon-item .coupon-status-icon {
		width: 140rpx;
		height: 98rpx;
		position: absolute;
		top: 0;
		right: 8rpx;
		z-index: 1;
	}

	.coupon-list .coupon-item .coupon-left {
		color: #fff;
		width: 202rpx;
	}

	.coupon-list .coupon-item .coupon-right {
		padding: 20rpx 10rpx;
	}

	.shop-block {
		width: 100%;
		height: 70rpx;
		padding-left: 24rpx;
	}

	.shop-address {
		width: 100%;
		background-color: #fff;
		padding: 30rpx 24rpx;
	}

	.goods-intrgral {
		height: 60rpx;
		background-color: #fff7f6;
		width: 100%;
		border-bottom: 1rpx solid #e3e3e3;
		color: #919191;
		font-size: 9pt;
		padding: 0 24rpx;
	}

	.integral-switch .wx-switch-input {
		width: 42px;
		height: 22px;
	}

	.integral-switch .wx-switch-input::before {
		width: 41px;
		height: 20px;
	}

	.integral-switch .wx-switch-input::after {
		width: 20px;
		height: 20px;
	}

	.form-title {
		width: 100%;
		height: 72rpx;
		line-height: 72rpx;
		border-bottom: 1rpx #e3e3e3 solid;
		color: #707070;
		/* padding: 0 24rpx; */
	}

	.form-one {
		padding: 24rpx 0;
		border-bottom: 1rpx #e3e3e3 solid;
	}

	.form-one:last-child {
		margin: 0;
		border: 0;
	}

	.required::before {
		content: '*';
		color: #c10000;
	}

	.form-one .list-name {
		width: 170rpx;
		justify-content: flex-end;
		text-align: right;
		margin-right: 20rpx;
	}

	.default {
		height: 56prx;
		padding: 12rpx 24rpx;
		margin-right: 20rpx;
		border-radius: 56rpx;
		border: 1rpx #ccc solid;
		color: #666;
		margin-bottom: 10rpx;
	}

	.default:last-child {
		margin-right: 0;
	}

	.d-active {
		background-color: #c10000;
		color: #fff;
		border: 1rpx #c10000 solid;
	}

	.right-jiantou {
		width: 12rpx;
		height: 22rpx;
		margin-left: 12rpx;
	}

	.payment {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9999;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.payment-modal {
		position: relative;
		width: 100%;
		padding: 0 60rpx;
	}

	.pay-modal {
		width: 100%;
		background-color: #fff;
		border-radius: 16rpx;
	}

	.pay-head {
		height: 112rpx;
		width: 100%;
		color: #353535;
		position: relative;
	}

	.pay-x {
		position: absolute;
		right: 40rpx;
		top: 40rpx;
		width: 36rpx;
		height: 36rpx;
	}

	.pay-x image {
		width: 100%;
		height: 100%;
	}

	.pay-block {
		width: 100%;
		height: 120rpx;
		color: #999;
		padding: 0 30rpx;
	}

	.red {
		color: #c10000;
	}

	.pay-footer {
		width: 100%;
		height: 88rpx;
		background-color: #c10000;
		color: #fff;
	}

	.mch-header {
		background: #fff;
		padding: 24rpx;
		padding-bottom: 0rpx;
		/* border-bottom: 1rpx solid #eee; */
	}

	.border-bottom {
		position: relative;
	}

	.border-bottom:after {
		content: " ";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		border-bottom: 1rpx solid #eee;
	}

	.mch-item {
		/* margin-bottom: 24rpx; */
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
		background: #fff;
	}


	.check-icon {
		width: 38rpx;
		height: 38rpx;
		border: 4rpx solid #ccc;
		border-radius: 1000rpx;
		position: relative;
		margin-right: 4rpx;
	}

	.check-icon::after {
		position: absolute;
		content: " ";
		display: block;
		width: 30rpx;
		height: 30rpx;
		top: 4rpx;
		left: 4rpx;
		background: #e3e3e3;
		border-radius: 1000rpx;
	}

	.send-type {
		width: 160rpx;
		border: 1rpx solid #3f3f3f;
		color: #3f3f3f;
		border-radius: 8rpx;
		margin-left: 20rpx;
		padding: 6rpx 0;
	}

	.send-type:first-child {
		margin-left: 0;
	}

	.send-type.active {
		border: 1rpx solid #c10000;
		color: #c10000;
	}

	.nosava-tip {
		padding: 25rpx 30rpx;
		background: rgba(244, 158, 58, 0.43);
		color: #F76436;
		font-size: 24rpx;
	}

	.address-bg-img {
		width: 100%;
		height: 8rpx;
	}

	.address-bg-img image {
		width: 100%;
		height: 100%;
	}

	.block {
		margin-bottom: 20rpx;
		background: #fff;
		padding: 30rpx 25rpx;
		border-radius: 20rpx;
	}

	.show-more {
		height: 72rpx;
		color: #919191;
		background: #fff;
	}

	.show-more-img {
		width: 18rpx;
		height: 18rpx;
		margin-left: 16rpx;
	}

	.cart-list {
		/* margin-bottom: 20rpx; */
	}

	/* newCss */
	.couponList {
		background: #fff;
		padding: 10rpx 24rpx;
		white-space: nowrap;
		padding-bottom: 36rpx;
		border-bottom: 1px solid #d6d6d6;
	}

	.couponList .couponNav {
		margin-right: 16rpx;
		display: inline-block;
		width: 348rpx;
		height: 150rpx;
		position: relative;
		background: url(https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/yhq_02.png) no-repeat;
		background-size: 100% 100%;
	}

	.couponList .couponNav:first-child {
		margin-left: 22rpx;
	}

	.couponNav .leftContent {
		width: 110rpx;
		height: 150rpx;
		line-height: 150rpx;
		color: #c10000;
		text-align: center;
		font-size: 14px;
		overflow: hidden;
	}

	.couponNav .rightContent {
		width: 238rpx;
		color: #818181;
		font-size: 9px;
		overflow: hidden;
	}

	.couponNav .couponDesc {
		color: #595959;
		font-size: 12px;
		margin-top: 40rpx;
		margin-bottom: 8rpx;
	}

	.couponList .active {
		background: url(https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/yhqActive.png) no-repeat;
		background-size: 100% 100%;
	}

	.couponNav image.pa {
		width: 34rpx;
		height: 34rpx;
		border-radius: 50%;
		left: -12rpx;
		top: 50%;
		transform: translateY(-50%)
	}

	.vip-card {
		width: 100%;
		height: 185rpx;
		background-color: #263140;
		border-radius: 20rpx;
		padding: 20rpx 25rpx 30rpx;
	}

	.ziti {
		width: 170rpx;
		height: 38rpx;
		line-height: 34rpx;
		border: 2rpx solid #FFC330;
		border-radius: 19rpx;
	}

	.icon-box {
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		color: #F0D0A5;
		background: rgba(0, 0, 0, 1);
		border-radius: 50%;
		margin-right: 7rpx;
		font-size: 20rpx;
	}

	.express-insurance {
		position: absolute;
		bottom: 54rpx;
		padding: 0 12rpx;
		height: 37rpx;
		line-height: 35rpx;
		border: 1rpx solid #F23005;
		border-radius: 6rpx;
		color: #F23005;
		font-size: 24rpx;
	}

	.remove-box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, .4);
		border-radius: 14rpx;
	}

	.remove-btn {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #F23005;
		border-radius: 50%;
		font-size: 24rpx;
		color: #fff;
	}
</style>
