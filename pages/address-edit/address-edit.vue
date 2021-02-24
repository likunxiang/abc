<template>
	<view>
		<common></common>
		<view class="body pr">
		
			<view class="bottom-bar" @tap="editAddress" v-if="id">保存</view>
			<view class="bottom-bar" @tap="saveAddress" v-else>保存</view>
		
		
			<view>
				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom fs-30 color-666666">
						<view class="flex-grow-0 row-label ">收货人</view>
						<view class="flex-grow-1 ns-text-bold color-333333">
							<input placeholder="请输入收货人真实姓名" placeholder-style="font-weight: 400;color: #999999;" :value="name" data-name="name" @blur="inputBlur"></input>
						</view>
					</view>
		
					<view class="flex-row flex-y-center edit-row fs-30">
						<view class="flex-grow-0 row-label color-666666">联系电话</view>
						<view class="flex-grow-1 ns-text-bold color-333333">
							<input placeholder="请输入收货人手机号码" placeholder-style="font-weight: 400;color: #999999;" :value="mobile" data-name="mobile" type="number" @blur="inputBlur"></input>
						</view>
					</view>
		
				</view>
				<view class="input-box">
					<view class="flex-row flex-y-center edit-row border-bottom fs-30">
						<view class="flex-grow-0 row-label  color-666666">所在地区</view>
						<view class="flex-grow-1 flex" @tap="showAreaPicker">
							<view class="flex-grow-1 color-333333 flex align-center" style="padding-right: 24rpx ">
								<view class="color-999999" v-if="district==null">请选择</view>
								<view class="ns-text-bold " v-else>{{district.province.name}} {{district.city.name}} {{district.district.name}}</view>
							</view>
							<view class="flex-grow-0 flex-y-center">
								<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
							</view>
						</view>
					</view>
		
					<view class="flex-row flex-y-center edit-row border-bottom fs-30">
						<view class="flex-grow-0 row-label  color-666666">所在区</view>
						<view class="flex-grow-1 flex">
							<view class="flex-grow-1 color-333333 flex align-center" @tap="district==null?'disableTown':''">
								<picker @change="townAreaPick" :value="town_index" :range="town_list" range-key="name" :disabled="district==null?true:false">
									<view class="flex align-center">
										<view class="picker flex-grow-1">
											<!-- 									<block wx:if="{{town_list[town_index].name==null}}">请选择</block>
											<block wx:else>{{town_list[town_index].name}}</block> -->
											<view class="color-999999" v-if="district==null">请选择</view>
											<view class="ns-text-bold " v-else>{{district.town?district.town.name?district.town.name:'请选择':'请选择'}}</view>
										</view>
										<view class="flex-grow-0">
											<text class="iconfont icon-jinru color-8D8D8D fs-40"></text>
										</view>
									</view>
								</picker>
							</view>
						</view>
					</view>
		
					<view class="flex-row flex-y-center edit-row fs-30">
						<view class="flex-grow-0 row-label  color-666666">详细地址</view>
						<view class="flex-grow-1 ns-text-bold color-333333">
							<input placeholder="请输入到门牌号的详细地址" placeholder-style="font-weight: 400;color: #999999;" :value="detail" data-name="detail" @blur="inputBlur"></input>
						</view>
					</view>
				</view>
		
				<view class="set-default mt-20 flex ns-align-items-flex-center ns-justify-content-space-between fs-30">
					<view class=" color-2C2C2C ">设置为默认地址</view>
					<switch color="#FFC330" type="switch" @change="changeDefault" :checked="is_default==1"></switch>
				</view>
			</view>
		
		</view>
		
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
	  area_picker_show:false,
	  id:'',
	  area_picker_province_list:[],
	  area_picker_city_list:[],
	  area_picker_district_list:[]
	  
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
    var self = this;
    setTimeout(() => {
      self.getDistrictData(function (data) {
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
     uni.showLoading({
        title: "正在加载",
        mask: true
      });
      self.getApp().request({
        url: self.getApp().api.user.address_detail,
        data: {
          id: options.id
        },
        success: function (res) {
          uni.hideLoading();

          if (res.code == 0) {
            self.setData(res.data);
            var district_id = res.data.district.district.id;
            self.getTown(district_id);
          }
        }
      });
    }
  },
  onShow: function () {
    this.getApp().page.onShow(this);
  },
  methods: {
    // 是否设为默认地址
    changeDefault: function (e) {
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
        self.getTown(district_id);
      }
    },

    getTown(district_id) {
      var self = this;
      self.getApp().request({
        url: self.getApp().api.default.son_district,
        data: {
          id: district_id
        },
        success: res => {
          setTimeout(() => {
            res.data.some((item, index) => {
              if (item.name == self.district.town.name) {
                self.setData({
                  town_index: index
                });
                return true;
              }
            });
          }, 1200);

          if (res.code == 0) {
            var district = self.district;

            if (!district.town) {
              var town_list = res.data;
              district.town = {};
              
			  if (town_list.length>0) {
				  district.town.id = town_list[self.town_index].id;
				  district.town.name = town_list[self.town_index].name;
			  } else {
				  district.town.id = 0;
				  district.town.name = '城区';
				  town_list = {
					  id: 0,
					  name: '城区'
				  }
			  }
              self.setData({
                town_list: town_list,
                district: district
              });
            } else {
              var town_list = res.data;
              self.setData({
                town_list: res.data
              });
            }
          }
        }
      });
    },

    disableTown() {
      uni.showModal({
        content: '请先选择所在地区',
        showCancel: false
      });
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

    saveAddress: util.throttle(function () {
      this.saveAddress1();
    }, 1000),
    saveAddress1: function () {
      var self = this;
	  console.log(223);
     // var myreg = /^([0-9]{6,12})$/;
     // var myreg2 = /^(\d{3,4}-\d{6,9})$/;
     // var myreg3 = /^\+?\d[\d -]{8,12}\d/;
 //     var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
 //     if (!myreg.test(self.mobile)) {
 //     	uni.showToast({
 //     		title: "联系电话格式不正确",
	// 		icon: 'none'
 //     	});
 //     	return false;
 //     }
	// console.log(666);
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
      } // if (!district.town) {
      // 	self.showToast({
      // 		title: '所在区没有填',
      // 	});
      // 	return
      // }


      uni.showLoading({
        title: "正在保存",
        mask: true
      });
      self.getApp().request({
        url: self.getApp().api.user.address_save,
        method: "post",
        data: {
          address_id: self.address_id || "",
          name: self.name,
          mobile: self.mobile,
          province_id: district.province.id,
          city_id: district.city.id,
          district_id: district.district.id,
          town_id: district.town.id || '',
          detail: self.detail,
          is_default: self.is_default
        },
        success: function (res) {
         uni.hideLoading();

          if (res.code == 0) {
           uni.showModal({
              title: "提示",
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                 uni.navigateBack();
                }
              }
            });
          }

          if (res.code == 1) {
            uni.showToast({
              title: res.msg,
			  icon:"none"
            });
          }
        }
      });
    },
    inputBlur: function (e) {
      var name = e.currentTarget.dataset.name;
      var value = e.detail.value;
      var data = '{"' + name + '":"' + value + '"}';
      this.setData(JSON.parse(data));
    },
    getWechatAddress: function (e) {
      var self = this;
      wx.chooseAddress({
        success: function (e) {
          if (e.errMsg != 'chooseAddress:ok') return;
          uni.showLoading();
          self.getApp().request({
            url: self.getApp().api.user.wechat_district,
            data: {
              national_code: e.nationalCode,
              province_name: e.provinceName,
              city_name: e.cityName,
              county_name: e.countyName
            },
            success: function (res) {
              if (res.code == 1) {
                uni.showModal({
                  title: '提示',
                  content: res.msg,
                  showCancel: false
                });
              }

              self.setData({
                name: e.userName || "",
                mobile: e.telNumber || "",
                detail: e.detailInfo || "",
                district: res.data.district
              });
            },
            complete: function () {
              uni.hideLoading();
            }
          });
        }
      });
    },
    //获取默认地址
    getChecked: function (adds) {
      this.setData({
        old_value: [0,0,0]
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
	@import url("~@/components/area-picker/area-picker.css");
page {
	background:rgba(207,207,207,0.33);
	height: 100%;
}
picker {
	width: 100%;
}
.bottom-bar{
    position: fixed;
    bottom: 50rpx;
    left: 40rpx;
    width: 678rpx;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
	background: linear-gradient(90deg, #FE4001, #EB0301);
	font-size: 36rpx;
    color: #fff;
    border-radius: 44rpx;
}
.bottom-bar view{
    background: #c10000;
    text-align: center;
    height: 100rpx;
    line-height: 100rpx;
    color: #fff;
}

.input-box {
	padding-left: 24rpx;
	background: #fff;
	margin-top: 20rpx;
}
.edit-row{
    background: #fff;
    height: 100rpx;
    padding-right: 24rpx;
}

.border-bottom{
    border-bottom: 1rpx solid #eeeeee;
}

.edit-row .row-label{
    margin-right: 24rpx;
    min-width: 140rpx;
}

.get-wechat-address{
    text-align: center;
    background: #09BB07;
    color: #fff;
    padding: 18rpx 0;
    margin: 32rpx 24rpx;
    border-radius: 10rpx;
    display: block;
}

.get-wechat-address:active{
    opacity: .85;
}
.set-default {
	padding: 25rpx 35rpx 26rpx 40rpx;
	background: #fff;
}

</style>