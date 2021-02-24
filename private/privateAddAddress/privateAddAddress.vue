<template>
	<view class="page  pr">
		<view class="body">

			<view class="bottom-bar" @tap="editAddress" v-if="id">保存</view>
			<view class="bottom-bar" @tap="saveAddress" v-else>保存</view>


			<view>
				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">联系人</view>
						<view class="flex-grow-1">
							<input placeholder="请输入联系人真实姓名" :value="name" data-name="name" @input="inputBlur"></input>
						</view>
					</view>

					<view class="flex-row flex-y-center edit-row">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">联系电话</view>
						<view class="flex-grow-1">
							<input placeholder="请输入联系人手机号码" :value="mobile" data-name="mobile" type="number" @input="inputBlur"></input>
						</view>
					</view>

				</view>
				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">提货地址</view>
						<view class="flex-grow-1 flex-row" @tap="showAreaPicker">
							<view class="flex-grow-1" style="padding-right: 24rpx">
								<block v-if="district==null">请选择</block>
								<block v-else>{{district.province.name}} {{district.city.name}} {{district.district.name}}</block>
							</view>
							<view class="flex-grow-0 flex-y-center">
								<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
							</view>
						</view>
					</view>

					<view class="flex-row flex-y-center edit-row">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">详细地址</view>
						<view class="flex-grow-1">
							<input placeholder="请输入到门牌号的详细地址" :value="detail" data-name="detail" @input="inputBlur"></input>
						</view>
					</view>
				</view>
				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">提货点名称</view>
						<view class="flex-grow-1">
							<input placeholder="请输入提货点名称" :value="pick_up_name" data-name="pick_up_name" @input="inputBlur"></input>
						</view>
					</view>
				</view>

				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom">
						<view class="flex-grow-0 row-label fs-28 color-2C2C2C ns-text-bold">提货时间</view>
						<view class="flex-grow-1 flex">
							<view class="flex1">
								<picker mode="time" :value="startPickUpTime" @change="bindStartTimeChange">
									<view class="picker ns-text-center">{{startPickUpTime?startPickUpTime:'开始时间'}}</view>
								</picker>
							</view>
							<view class="flex1">
								<picker mode="time" :value="endPickUpTime" @change="bindEndTimeChange">
									<view class="picker ns-text-center">{{endPickUpTime?endPickUpTime:'结束时间'}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>

				<!-- <view class="set-default mt-20 flex ns-align-items-flex-center ns-justify-content-space-between">
				<view class="fs-28 color-2C2C2C ">设置为默认地址</view>
				<switch color="#1A4C4B" bindchange="changeDefault" checked="{{is_default==1}}" ></switch>
			</view> -->
			</view>

		</view>
		<block data-src="/components/footer/footer">
			<view class="footer">
			</view>
		</block>
		<!-- 地址选择器开始 -->
		
		<view  :class="{'area-picker':true,'active':area_picker_show}" style="width: 100%;">
			<view class="area-picker-bg" @tap="hideAreaPicker">
				<scroll-view></scroll-view>
			</view>
			<view class="area-picker-body">
				<scroll-view>
					<view class="area-picker-top">
						<text class="area-picker-cancel" @tap="hideAreaPicker">取消</text>
						<text class="area-picker-confirm" @tap="areaPickerConfirm">确认</text>
					</view>
					<view class="area-picker-row">
						<picker-view :value="old_value" indicator-class="options-css" style="width: 100%; height: 500rpx;" @change="areaPickerChange">
							<picker-view-column style="line-height: 68rpx;text-align: center;">
								<view v-for="(item, index) in area_picker_province_list" :key="index" style="line-height: 68rpx;text-align: center;">{{item.name}}
								</view>
							</picker-view-column>
							<picker-view-column style="line-height: 68rpx;text-align: center;">
								<view v-for="(item, index) in area_picker_city_list" :key="index" style="line-height: 68rpx;text-align: center">{{item.name}}
								</view>
							</picker-view-column>
							<picker-view-column style="line-height: 68rpx;text-align: center;">
								<view v-for="(item, index) in area_picker_district_list" :key="index" style="line-height: 68rpx;text-align: center">{{item.name}}
								</view>
							</picker-view-column>
						</picker-view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 地址选择器结束 -->
	</view>
</template>

<script>
	var area_picker = require("../../components/area-picker/area-picker.js");
	import util from "../../utils/util";

	export default {
		data() {
			return {
				name: "",
				mobile: "",
				detail: "",
				district: null,
				is_default: 0,
				town_index: 0,
				old_value: [0, 0, 0],
				myaddress: null,
				address_id: "",
				town_list: [],
				area_picker_show: false,
				id: '',
				area_picker_province_list: [],
				area_picker_city_list: [],
				area_picker_district_list: [],
				startPickUpTime: "",
				endPickUpTime: ""
			};
		},

		components: {},
		props: {},
		onLoad: function(options) {
			this.getApp().page.onLoad(this, options);
			var self = this;
			setTimeout(() => {
				self.getDistrictData(function(data) {
					area_picker.init({
						page: self,
						data: data,
						checked: self.old_value
					});

				});
			}, 1000);
			self.setData({
				address_id: options.id
			});

			if (options.id) {
				this.getApp().core.showLoading({
					title: "正在加载",
					mask: true
				});
				this.getApp().request({
					url: this.getApp().api.selfSupport.get_address_data,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						id: options.id
					},
					success: (res) => {
						this.getApp().core.hideLoading();

						if (res.code == 0) {
							self.setData(res.data);
						}
					}
				});
			}
		},
		onShow: function() {
			this.getApp().page.onShow(this);
		},
		methods: {
			// 是否设为默认地址
			changeDefault: function(e) {
				var self = this;
				var value = e.detail.value;

				if (value) {
					self.setData({
						is_default: 1
					});
				} else {
					self.setData({
						is_default: 0
					});
				}
			},
			bindStartTimeChange: function(e) {
				this.setData({
					startPickUpTime: e.detail.value
				});
			},
			bindEndTimeChange: function(e) {
				this.setData({
					endPickUpTime: e.detail.value
				});
			},
			getDistrictData: function(cb) {
				var district = this.getApp().core.getStorageSync(this.getApp().const.DISTRICT);

				if (!district) {
					this.getApp().core.showLoading({
						title: "正在加载",
						mask: true
					});
					this.getApp().request({
						url: this.getApp().api.default.district,
						success: (res) => {
							this.getApp().core.hideLoading();

							if (res.code == 0) {
								district = res.data;
								this.getApp().core.setStorageSync(this.getApp().const.DISTRICT, district);
								cb(district);
							}
						}
					});
					return;
				}

				cb(district);
			},
			onAreaPickerConfirm: function(e) {
				var self = this;
				self.setData({
					district: {
						province: {
							id: e[0].id,
							name: e[0].name
						},
						city: {
							id: e[1].id,
							name: e[1].name
						},
						district: {
							id: e[2].id,
							name: e[2].name
						}
					}
				});
			},
			saveAddress: util.throttle(function() {
				this.saveAddress1();
			}, 1000),
			saveAddress1: function() {
				var self = this;
				var myreg = /^([0-9]{6,12})$/;
				var myreg2 = /^(\d{3,4}-\d{6,9})$/;
				var myreg3 = /^\+?\d[\d -]{8,12}\d/;

				if (!myreg.test(self.mobile) && !myreg2.test(self.mobile) && !myreg3.test(self.mobile)) {
					self.showToast({
						title: "联系电话格式不正确",
						icon: 'none'
					});
					return false;
				}

				if (self.startPickUpTime && self.endPickUpTime) {
					var pick_up_time = self.startPickUpTime + '-' + self.endPickUpTime;
				} else {
					wx.showToast({
						title: '还有信息没填',
						icon: 'none'
					});
					return false;
				}

				this.getApp().core.showLoading({
					title: "正在保存",
					mask: true
				});
				var district = self.district;

				if (!district) {
					district = {
						province: {
							id: ""
						},
						city: {
							id: ""
						},
						district: {
							id: ""
						}
					};
				}

				this.getApp().request({
					url: this.getApp().api.selfSupport.edit_address,
					data: {
						userId: this.getApp().core.getStorageSync('USER_INFO').id,
						id: self.address_id || "",
						name: self.name || '',
						mobile: self.mobile || '',
						province_id: district.province.id || '',
						city_id: district.city.id || '',
						district_id: district.district.id || '',
						detail: self.detail || '',
						pick_up_name: self.pick_up_name || '',
						pick_up_time: pick_up_time || ''
					},
					success: (res) => {
						this.getApp().core.hideLoading();

						if (res.code == 0) {
							this.getApp().core.showModal({
								title: "提示",
								content: res.msg,
								showCancel: false,
								success:(res) => {
									if (res.confirm) {
										this.getApp().core.navigateBack();
									}
								}
							});
						}

						if (res.code == 1) {
							wx.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}
				});
			},
			inputBlur: function(e) {
				var name = e.currentTarget.dataset.name;
				var value = e.detail.value;
				var data = '{"' + name + '":"' + value + '"}';
				this.setData(JSON.parse(data));
			}
		}
	};
</script>
<style>
	@import "./privateAddAddress.css";
</style>
