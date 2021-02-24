<template>
	<view class="page pr">
		<common></common>
		<view class="public-box mb-24">
			<view class="mb-30">
				<view>
					<text class="fs-30 color-999999">退款进度：</text>
					<text class="fs-30 color-FF0200">{{refund_progress.status_desc}}</text>
				</view>
				<view class="fs-24 color-FF0200" v-if="refund_progress.timewarn">{{refund_progress.timewarn}}</view>
			</view>
			<view class>
				<text class="fs-30 color-999999">订单编号：</text>
				<text class="fs-30 color-333333">{{refund_progress.order_no}}</text>
			</view>
		</view>
		<block v-if="refund_progress.status == 2">
			<view class="public-box mb-24">
				<view class="fs-36 color-333333 ns-text-bold mb-30">退款明细</view>
				<view class="mb-30">
					<text class="fs-30 color-999999">退款进度：</text>
					<text class="fs-30 color-333333">¥{{refund_progress.refund_money}}</text>
					<text class="fs-30 color-999999">（1-3个工作日到账）</text>
				</view>
				<view class="tips flex-y-center">{{refund_progress.warn}}</view>
			</view>
		</block>
		<block v-if="refund_progress.status == 1 && refund_progress.add_reason_comp==1 && supplier_id">
			<view class="public-box mb-24">
				<view class="fs-30 color-333333 flex align-center justify-between">
					<view>退货方式</view>
					<block v-if="refund_progress.add_reason_comp==1">
						<view class="ml-30">
							{{refund_progress.now_reason_comp}}
						</view>
					</block>
				</view>
				<block v-if="refund_progress.sup_agree == 1">
					<block v-if="refund_progress.now_reason_comp_id == 40">
						<view class="show-back fs-24 color-999999 pr">
							<!-- <view class="flex align-center">
								<view style="width: 100rpx;">收件人：</view>
								<view class="color-333333">
									<text>{{refund_progress.address[0].name}}</text>
									<text class="ml-24">{{refund_progress.address[0].mobile}}</text>
								</view>
							</view>
							<view class="flex align-center mt-20">
								<view style="width: 100rpx;">地址：</view>
								<view class="color-333333">{{refund_progress.address[0].address}}</view>
							</view> -->
							<view class="color-333333">
								<rich-text :nodes="refund_progress.address"></rich-text>
							</view>
							<view class="mt-20 fs-20">
								<view>未与卖家协商一致到情况下，请勿寄到付或平邮</view>
								<view>请填写真实有效的物流信息</view>
							</view>
							<view class="copy" @tap="copyAddress">一键复制</view>
						</view>
						<view class="fs-30 color-333333 mb-30">
							<view class="flex align-center mt-30">
								<view>物流公司</view>
								<view class="ml-30 flex1">
									<picker name="express" @change="bindExpressPickerChange" :value="express_index" :range="express_list" range-key="name">
										<view class="flex flex-row">
											<view class="flex-grow-1">
												<view v-if="express_index">
													{{express_list[express_index].name}}
												</view>
												<view v-else style="color: #888">请选择快递公司</view>
											</view>
										</view>
									</picker>
								</view>
							</view>
							<view class="flex align-center mt-30">
								<view>物流单号</view>
								<input class="ml-30" type="text" placeholder="请填写快递单号" :value="express_no" @input="expressInput"></input>
							</view>
							<view class="flex align-center mt-30">
								<view>运费</view>
								<input class="ml-30" type="text" placeholder="请填写运费" :value="express_price" @input="expressPriceInput"></input>
							</view>
	
						</view>
						<view class="flex justify-end">
							<view class="send-btn  color-fff fs-24" @tap="pickUpExpress">确认发货</view>
						</view>
					</block>
					<block v-if="refund_progress.now_reason_comp_id == 4">
						<view class="public-box">
							<view class="fs-24 color-333333 mb-30 flex align-center">
								<view class="input-title">联系人：</view>
								<input class="ns-text-bold flex1" type="text" placeholder="请填写联系人" :value="name" @blur="bindUpName"></input>
							</view>
							<view class="fs-24 color-333333 mb-30 flex align-center">
								<view class="input-title">联系方式：</view>
								<input type="number flex1" placeholder="请填写联系方式" :value="mobile" @blur="bindUpMobile"></input>
							</view>
							<view class="fs-24 color-333333 mb-30 flex align-center">
								<view class="input-title">所在地：</view>
								<view class="flex-grow-1 flex-row" @tap="showAreaPicker">
									<view class="flex-grow-1 ns-text-bold color-333333 align-center" style="padding-right: 24rpx ">
										<block v-if="district==null">请选择</block>
										<block v-else>{{district.province.name}} {{district.city.name}} {{district.district.name}}</block>
									</view>
									<view class="flex-grow-0 flex-y-center">
										<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
									</view>
								</view>
							</view>
							<view class="fs-24 color-333333 mb-30 flex align-center">
								<view class="input-title">所在区：</view>
								<view class="flex-grow-1 flex-row">
									<view class="flex-grow-1 ns-text-bold color-333333" style="padding-right: 24rpx ">
										<picker @change="townAreaPick" :value="town_index" :range="town_list" range-key="name">
											<view class="picker">
												<block v-if="town_list[town_index].name==null">请选择</block>
												<block v-else>{{town_list[town_index].name}}</block>
											</view>
										</picker>
	
									</view>
									<view class="flex-grow-0 flex-y-center">
										<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
									</view>
								</view>
							</view>
							<view class="fs-24 color-333333 mb-30 flex align-center">
								<view class="input-title">详细地址：</view>
								<input class="ns-text-bold flex1" type="text" placeholder="请填写详细地址" :value="detail" @blur="bindUpDetail"></input>
							</view>
							<view class="fs-24 color-333333 flex align-center">
								<view class="input-title">上门时间：</view>
								<input class="flex1" type="text" placeholder="期望上门时间,如 7.21 12:00-13:00" :value="up_time" @blur="bindUpTime"></input>
							</view>
						</view>
						<view class="flex justify-end">
							<view class="send-btn  color-fff fs-24" @tap="doorToTake">确认</view>
						</view>
					</block>
				</block>
	
			</view>
		</block>
	
		<block v-if="refund_progress.status == 3">
			<view class="public-box mb-24">
				<view class="fs-36 color-333333 ns-text-bold mb-30">失败原因</view>
				<view class="tips flex-y-center">{{refund_progress.refund_desc?refund_progress.refund_desc:'无'}}</view>
			</view>
		</block>
	
		<block v-if="refund_progress.status == 0 && refund_progress.is_agree == 1">
			<view class="public-box mb-24">
				<block v-if="is_jd==0 && refund_progress.is_agree == 1">
					<view class="fs-36 color-333333 ns-text-bold mb-30">退货方式</view>
					<view class="show-back fs-24 color-999999 pr">
						<!-- <view class="flex align-center">
							<view style="width: 100rpx;">收件人：</view>
							<view class="color-333333">
								<text>{{refund_progress.address[0].name}}</text>
								<text class="ml-24">{{refund_progress.address[0].mobile}}</text>
							</view>
						</view>
						<view class="flex align-center mt-20">
							<view style="width: 100rpx;">地址：</view>
							<view class="color-333333">{{refund_progress.address[0].address}}</view>
						</view> -->
						<view class="color-333333" style="line-height: 40rpx;">
							<rich-text :nodes="refund_progress.address"></rich-text>
						</view>
						<view class="mt-20 fs-20">
							<view>未与卖家协商一致到情况下，请勿寄到付或平邮</view>
							<view>请填写真实有效的物流信息</view>
						</view>
						<view class="copy" @tap="copyAddress">一键复制</view>
					</view>
					<block v-if="!refund_progress.exp_no">
						<view class="fs-30 color-333333 mb-30">
							<view class="flex align-center mt-30">
								<view>物流公司</view>
								<view class="ml-30 flex1">
									<picker name="express" @change="bindExpressPickerChange" :value="express_index" :range="express_list" range-key="name">
										<view class="flex flex-row">
											<view class="flex-grow-1">
												<view v-if="express_index">
													{{express_list[express_index].name}}
												</view>
												<view v-else style="color: #888">请选择快递公司</view>
											</view>
										</view>
									</picker>
								</view>
							</view>
							<view class="flex align-center mt-30">
								<view>物流单号</view>
								<input class="ml-30" type="text" placeholder="请填写快递单号" :value="express_no" @input="expressInput"></input>
							</view>
						</view>
						<view class="flex justify-end">
							<view class="send-btn color-fff fs-24" @tap="sendFormSubmit">确认发货</view>
						</view>
					</block>
					<block v-else>
						<view class="fs-30 color-333333 mb-30">
							<view class="flex align-center mt-30">
								<view>物流公司</view>
								<view class="ml-30 flex1">
									{{refund_progress.exp}}
								</view>
							</view>
							<view class="flex align-center mt-30">
								<view>物流单号</view>
								<view class="ml-30">{{refund_progress.exp_no}}</view>
							</view>
						</view>
					</block>
	
				</block>
				<block v-else>
					<view class="fs-30 color-333333 flex align-center justify-between">
						<view>退货方式</view>
						<block v-if="refund_progress.add_reason_comp==1">
							<view class="ml-30">
								{{refund_progress.now_reason_comp}}
							</view>
						</block>
						<block v-else>
							<view class="ml-30">
								<picker name="express" @change="bindreasonPickerChange" :value="reason_index" :range="reason" range-key="name">
									<view class="flex flex-row">
										<view class="flex-grow-1">
											<view v-if="reason_index!=null">
												{{reason[reason_index].name}}
											</view>
											<view v-else style="color: #888">请选择</view>
										</view>
									</view>
								</picker>
							</view>
						</block>
					</view>
					<view class="mt-30">
						<block v-if="reason_id==40">
							<view class="flex justify-end">
								<view class="send-btn  color-fff fs-24" @tap="sendAddress">确认</view>
							</view>
	
						</block>
	
						<block v-if="reason_id==4">
							<view class="flex justify-end">
								<view class="send-btn  color-fff fs-24" @tap="sendAddress">确认</view>
							</view>
						</block>
					</view>
				</block>
			</view>
		</block>
	
		<view class="public-box">
			<view class="fs-36 color-333333 ns-text-bold mb-30">进度跟踪</view>
			<view>
				<view class="cu-timeline">
					<view v-for="(item, index) in progress" :key="index" :class="'cu-item ' + (index==0?'text-blue':'')">
						<view class="content">
							<view class="fs-24 color-333333">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
		<view class="footer flex justify-end">
			<navigator url="/pages/index/index" hover-class="none" class="btn">回到首页</navigator>
			<!-- <view class="btn">看相似</view> -->
			<view class="btn btn-red-full" @tap="cancelRefund" v-if="refund_progress.status == 0 && refund_progress.is_delete == 0">撤销申请</view>
			<button class="btn btn-red" open-type="contact" :session-from="'refund_id=' + id + '|nickName=' + nickName + '|avatarUrl=' + avatarUrl + '|type=' + type + '|userId=' + userId + '|mchId=' + mchId + '|storeId=' + storeId" @contact="handleContact">联系客服</button>
		</view>
		<block data-src="/components/area-picker/area-picker.wxml"><view :class="'area-picker ' + (area_picker_show?'active':'')">
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
	</view></block>
	</view>
</template>

<script>
// pages/refund-progress/refund-progress.js
var area_picker = require('../../components/area-picker/area-picker.js');
import util from "@/utils/util";

export default {
  data() {
    return {
      district: null,
      town_index: 0,
      old_value: [0, 0, 0],
      id: "",
      nickName: "",
      avatarUrl: "",
      userId: "",
      mchId: "",
      storeId: "",
      type: 0,
      refund_progress: "",
      progress: "",
      reason: "",
      is_jd: "",
      supplier_id: "",
      express_list: "",
      town_list: "",
      name: "",
      mobile: "",
      detail: "",
      up_time: "",
      express_index: "",
      reason_index: "",
      reason_id: "",
      express_no: "",
      express_price: "",
	  area_picker_show:false,
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    self.getDistrictData(function (data) {
      area_picker.init({
        page: self,
        data: data,
        checked: self.old_value
      });
    });
    self.setData({
      id: options.id,
      nickName:uni.getStorageSync('USER_INFO').nickname,
      avatarUrl:uni.getStorageSync('USER_INFO').avatar_url,
      userId:uni.getStorageSync('USER_INFO').id,
      mchId:uni.getStorageSync('_mchInfo').id,
      storeId:uni.getStorageSync('STORE').id,
      type: 3 // 售后进入

    });
    self.getRefundGrogress();
    self.getExpressList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
	  handleContact:function(){},
    getRefundGrogress() {
      this.getApp().request({
        url: this.getApp().api.order.refund_step,
        data: {
          refund_id: this.id
        },
        success: res => {
          if (res.code == 0) {
            var progressObj = res.data.desc;
            var reasonObj = res.data.reason_comp;
            var progressArr = [];
            var reasonArr = [];

            for (let i in progressObj) {
              var obj1 = {
                id: i,
                name: progressObj[i]
              };
              progressArr.push(obj1);
            }

            for (let j in reasonObj) {
              var obj2 = {
                id: j,
                name: reasonObj[j]
              };
              reasonArr.push(obj2);
            }

            this.setData({
              refund_progress: res.data,
              progress: progressArr,
              reason: reasonArr,
              is_jd: res.data.is_jd,
              supplier_id: res.data.supplier_id
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        }
      });
    },

    // 输入快递信息
    getExpressList() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_express_list,
        data: {
          userId: uni.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              express_list: res.data
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

    sendAddress() {
      this.getApp().request({
        url: this.getApp().api.order.sure_reason_comp,
        method: 'POST',
        data: {
          reason_comp: this.reason_id,
          refund_id: this.id
        },
        success: res => {
          if (res.code == 0) {
            uni.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                uni.navigateBack();
              }
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none'
            });
          }
        }
      });
    },

    pickUpExpress() {
      if (this.reason_id == 40) {
        if (!this.express_index || !this.express_no || !this.express_price) {
          uni.showToast({
            title: '请填写快递信息',
            icon: 'none'
          });
          return;
        } // if (supplier_id == 13) {
        // 	var url = getApp().api.order.send_express
        // } 
        // if (supplier_id == 16) {
        // 	var url = getApp().api.order.send_express_e
        // }


        this.getApp().request({
          url: this.getApp().api.order.refund_send,
          method: 'POST',
          data: {
            order_refund_id: this.id,
            express: this.express_list[this.express_index].name || '',
            express_no: this.express_no,
            freightMoney: this.express_price || ''
          },
          // method: 'POST',
          // url: url,
          // data: {
          // 	refund_id: this.data.id,
          // 	user_send_express: this.data.express_list[this.data.express_index].name || '',
          // 	user_send_express_no: this.data.express_no || '',
          // 	freightMoney: this.data.express_price || ''
          // },
          success: res => {
            if (res.code == 0) {
              uni.showModal({
                title: '提交成功',
                showCancel: false,
                success: res => {
                  if (res.confirm) {
                    uni.navigateTo();
                  }
                }
              });
            }
          }
        });
      } else {
        uni.showModal({
          title: '提交成功',
          showCancel: false,
          success: res => {
            if (res.confirm) {
              uni.navigateTo();
            }
          }
        });
      }
    },

    cancelRefund: function () {
      var self = this;
      uni.showModal({
        content: '是否取消申请',
        success: function (res) {
          if (res.confirm) {
            self.getApp().request({
              url: self.getApp().api.order.cancel_refund,
              method: 'POST',
              data: {
                order_refund_id: self.id
              },
              success: function (res) {
                if (res.code == 0) {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000,
                    success: function (res) {
                      uni.navigateBack();
                    }
                  });
                } else {
                  uni.showToast({
                    title: res.msg,
                    icon: 'none',
                    duration: 2000
                  });
                }
              }
            });
          }
        }
      });
    },
    getDistrictData: function (cb) {
      let self = this;
      var district = uni.getStorageSync(this.getApp().const.DISTRICT);

      if (!district) {
        uni.showLoading({
          title: "正在加载",
          mask: true
        });
        self.getApp().request({
          url: self.getApp().api.default.district,
          success: function (res) {
            uni.hideLoading();

            if (res.code == 0) {
              district = res.data;
              uni.setStorageSync(self.getApp().const.DISTRICT, district);
              self.setData({
                old_value: self.getChecked(district)
              });
              cb(district);
            }
          }
        });
        return;
      }

      self.setData({
        old_value: self.getChecked(district)
      });
      cb(district);
    },
    onAreaPickerConfirm: function (e) {
      var self = this;
      var district_id = e[2].id;
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

      if (district_id) {
        self.getApp().request({
          url: self.getApp().api.default.son_district,
          data: {
            id: district_id
          },
          success: res => {
            var district = self.district;

            if (res.code == 0) {
              var town_list = res.data;
              district.town = {};
              district.town.id = town_list[self.town_index].id;
              district.town.name = town_list[self.town_index].name;
              self.setData({
                town_list: res.data,
                district: district
              });
            }
          }
        });
      }
    },

    townAreaPick(e) {
      var town_list = this.town_list;
      var district = this.district;
      district.town = {};
      district.town.id = town_list[e.detail.value].id;
      district.town.name = town_list[e.detail.value].name;
      this.setData({
        town_index: e.detail.value,
        district: district
      });
    },

    // 自家退货
    sendFormSubmit: function (e) {
      // var formId = e.detail.formId;
      var self = this;
      var expressIndex = self.express_index;
      var expressNo = self.express_no;
      var pageType = self.pageType;

      if (typeof expressIndex == 'undefined' || typeof expressNo == 'undefined') {
        uni.showToast({
          title: '你有信息尚未填写',
          icon: 'none'
        });
        return;
      }

     uni.showLoading({
        title: '正在提交',
        mask: true
      });
      self.getApp().request({
        url: self.getApp().api.order.refund_send,
        method: 'POST',
        data: {
          order_refund_id: self.id,
          express: self.express_list[self.express_index].name || '',
          express_no: expressNo,
          orderType: 'STORE'
        },
        success: function (res) {
         uni.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false,
            success: function (e) {
              if (res.code == 0) {
                uni.navigateBack();
              }
            }
          });
        },
        complete: function () {
          uni.hideLoading();
        }
      });
    },

    copyAddress() {
      var text = this.refund_progress.address;

      while (text.indexOf('<p>') > -1) {
        text = text.replace('<p>', '');
        text = text.replace('</p>', '\n');
      }

      this.setClipboardData({
        data: text,

        success(res) {
          uni.getClipboardData({
            success(res) {}

          });
        }

      });
    },

    // 京东信息
    doorToTake() {
      var self = this;

      if (!self.name || !self.mobile || !self.detail || !self.up_time) {
        uni.showToast({
          title: '您还有信息没有填写',
          icon: 'none'
        });
        return;
      }

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
          },
          town: {
            id: ""
          }
        };
      }

     uni.showLoading({
        title: "正在保存",
        mask: true
      });
      self.getApp().request({
        url: self.getApp().api.order.upDoor,
        method: 'POST',
        data: {
          refund_id: self.id,
          name: self.name,
          phone: self.mobile,
          province_id: district.province.id,
          city_id: district.city.id,
          district_id: district.district.id,
          town_id: district.town.id || '',
          detail: self.detail,
          time: self.up_time
        },
        success: function (res) {
          uni.hideLoading();

          if (res.code == 0) {
            uni.showModal({
              title: "提示",
              content: res.msg,
              showCancel: false,
              success: function (res) {
                uni.navigateBack();
              }
            });
          }

          if (res.code == 1) {
            self.showToast({
              title: res.msg
            });
          }
        }
      });
    },

    bindUpName(e) {
      this.setData({
        name: e.detail.value
      });
    },

    bindUpMobile(e) {
      this.setData({
        mobile: e.detail.value
      });
    },

    bindUpDetail(e) {
      this.setData({
        detail: e.detail.value
      });
    },

    bindUpTime(e) {
      this.setData({
        up_time: e.detail.value
      });
    },

    bindExpressPickerChange: function (e) {
      var self = this;
      self.setData({
        express_index: e.detail.value
      });
    },
    bindreasonPickerChange: function (e) {
      var self = this;
      self.setData({
        reason_index: e.detail.value,
        reason_id: self.reason[e.detail.value].id
      });
    },

    expressInput(e) {
      var value = e.detail.value;
      this.setData({
        express_no: value
      });
    },

    expressPriceInput(e) {
      var value = e.detail.value;
      this.setData({
        express_price: value
      });
    },

    //获取默认地址
    getChecked: function (adds) {
      this.setData({
        old_value: [0, 0, 0]
      }); //        console.log('999999999999999999999')
      //console.log('adds', adds);

      let errData = {
        province: {
          name: '999'
        },
        city: {
          name: '999'
        },
        district: {
          name: '999'
        }
      };
      let districts = this.district || errData;
      let province = districts.province.name || '999';
      let city = districts.city.name || '999';
      let district = districts.district.name || '999';
      let arr = [0, 0, 0]; //console.log(province,city,district)

      adds.some((item, index) => {
        if (item.name == province) {
          //console.log('item',item)
          arr[0] = index;
          return true;
        }
      });
      adds[arr[0]].list.some((item, index) => {
        if (item.name == city) {
          //console.log('item',item)
          arr[1] = index;
          return true;
        }
      });
      adds[arr[0]].list[arr[1]].list.some((item, index) => {
        //console.log(item)
        if (item.name == district) {
          // console.log('item',item)
          arr[2] = index;
          return true;
        }
      }); //console.log('新',arr)

      this.setData({
        old_value: arr
      });
      return arr;
    }
  }
};
</script>
<style>
/* pages/refund-progress/refund-progress.wxss */
@import url("~@/components/area-picker/area-picker.css");
page {
	background: #F4F4F4;
}
.page {
	min-height: 100%;
	padding: 24rpx;
	padding-bottom: 144rpx;
}
.tips {
	width:654rpx;
	background:rgba(255,2,0,.7);
	min-height: 88rpx;
	border-radius:14rpx;
	padding: 0rpx 24rpx;
	font-size: 24rpx;
	color: #fff;
}
.footer {
	position: absolute;
	bottom: 0rpx;
	left: 0rpx;
	width: 100%;
	height: 144rpx;
	padding: 0 24rpx;
}
.btn {
	width:180rpx;
	height:72rpx;
	line-height: 70rpx;
	text-align: center;
	font-size: 26rpx;
	color: ##333333;
	border:1rpx solid rgba(97,97,97,.4);
	border-radius:36rpx;
	margin-left: 16rpx;
}
.btn-red {
	border:1px solid rgba(255,64,26,1);
	color: #FF401A;
}
.btn-red-full {
	background:rgba(255,64,26,1);
	color: #fff;
	border: none;
}
.show-back {
	width:654rpx;
	background:rgba(244,244,244,1);
	border-radius:12rpx;
	padding: 25rpx;
}
.copy {
	position: absolute;
	bottom: 25rpx;
	right: 24rpx;
	width:109rpx;
	height:36rpx;
	border:1rpx solid rgba(255,2,0,.5);
	text-align: center;
	line-height: 34rpx;
	border-radius:6rpx;
	font-size: 18rpx;
	color: #ff0200;
}
.send-btn {
	width:160rpx;
	height:60rpx;
	line-height: 60rpx;
	text-align: center;
	background:linear-gradient(-90deg,rgba(255,152,2,1),rgba(255,201,1,1));
	border-radius:10rpx;
}
</style>