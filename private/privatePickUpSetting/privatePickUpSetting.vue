<template>
<!--pages//private/privatePickUpSetting/privatePickUpSetting.wxml-->
<view class="page pr">
	<view class="p-24 flex align-center">
		<view class="black-block"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">提货点</view>
	</view>
	
	<view class="picu-up-address flex mb-20" v-for="(item, index) in addressList" :key="index">
		<view :class="'iconfont ' + (item.is_sel==1?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'" @tap="choosePickUp" :data-index="index" :data-id="item.id" :data-issel="item.is_sel"></view>
		<view class="ml-20 flex1">
			<view class="border-bottom pb-20 pr-24">
				<view class="flex justify-between align-center">
					<view class="fs-28 color-2C2C2C ns-text-bold">{{item.name}}</view>
					<view class="fs-24 color-595959">{{item.mobile}}</view>
				</view>
				<view class="fs-24 color-595959 mt-10">{{item.province}}{{item.city}}{{item.district}}{{item.detail}}</view>
			</view>
			<view class="address-footer flex justify-between align-center">
				<view class="fs-24 color-2C2C2C ns-text-bold">{{item.pick_up_name}}</view>
				<view class="flex align-center pr-24">
					<view class="iconfont icon-shanchu1" style="margin-right: 40rpx;" @tap="deleteAddress" :data-index="index" :data-id="item.id"></view>
					<navigator hover-class="none" :url="'/private/privateAddAddress/privateAddAddress?id=' + item.id" class="iconfont icon-icon6"></navigator>
				</view>
			</view>
		</view>
	</view>
	
	<view class="footer flex flex-x-center">
		
		<navigator hover-class="none" url="/private/privateAddAddress/privateAddAddress" class="btn-box">添加新的地址</navigator>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      addressList: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAddressList();
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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  // getWechatAddress: function (e) {
  //     getApp().core.chooseAddress({
  //         success: function (e) {
  //             if (e.errMsg != 'chooseAddress:ok')
  //                 return;
  //             getApp().core.showLoading();
  //             getApp().request({
  //                 url: getApp().api.user.add_wechat_address,
  //                 method: "post",
  //                 data: {
  //                     national_code: e.nationalCode,
  //                     name: e.userName,
  //                     mobile: e.telNumber,
  //                     detail: e.detailInfo,
  //                     province_name: e.provinceName,
  //                     city_name: e.cityName,
  //                     county_name: e.countyName,
  //                 },
  //                 success: function (res) {
  //                     if (res.code == 1) {
  //                         getApp().core.showModal({
  //                             title: '提示',
  //                             content: res.msg,
  //                             showCancel: false,
  //                         });
  //                         return;
  //                     }
  //                     if (res.code == 0) {
  //                         getApp().core.setStorageSync(getApp().const.PICKER_ADDRESS,res.data);
  //                        getApp().core.hideLoading();
  //                        getApp().request({
  //                            url: getApp().api.user.address_list,
  //                            success: function (res) {
  //                                getApp().core.hideNavigationBarLoading();
  //                                if (res.code == 0) {
  //                                    self.setData({
  //                                        address_list: res.data.list,
  //                                    });
  //                                }
  //                                self.setData({
  //                                    show_no_data_tip: (self.data.address_list.length == 0),
  //                                });
  //                            }
  //                        });
  //                     }
  //                 },
  //                 complete: function () {
  //                     getApp().core.hideLoading();
  //                 }
  //             });
  //         }
  //     });
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getAddressList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_address_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              addressList: res.data.list
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    choosePickUp(e) {
      var self = this;
      var id = e.currentTarget.dataset.id;
      var is_sel = e.currentTarget.dataset.issel;
      var index = e.currentTarget.dataset.index;

      if (is_sel == 1) {
        is_sel = 2;
      } else {
        is_sel = 1;
      }

      self.setData({
        ['addressList[' + index + '].is_sel']: is_sel
      });
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_address_is_sel,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id,
          is_sel: is_sel
        },

        success(res) {
          if (res.code == 0) {} else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    deleteAddress: function (e) {
      var self = this;
      var address_id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      this.getApp().core.showModal({
        title: "提示",
        content: "确认删除改收货地址？",
        success: (res) => {
          if (res.confirm) {
            this.getApp().core.showLoading({
              title: "正在删除",
              mask: true
            });
            this.getApp().request({
              url: this.getApp().api.selfSupport.del_address,
              data: {
                userId: this.getApp().core.getStorageSync('USER_INFO').id,
                id: address_id
              },
              success: (res) => {
                if (res.code == 0) {
                  wx.showToast({
                    title: res.msg,
                    icon: 'none'
                  });
                  self.getAddressList();
                }

                if (res.code == 1) {
                  this.getApp().core.showToast({
                    title: res.msg
                  });
                }
              },

              complete:(res) => {
                this.getApp().core.hideLoading();
              }

            });
          }
        }
      });
    }
  }
};
</script>
<style>
@import "./privatePickUpSetting.css";
</style>