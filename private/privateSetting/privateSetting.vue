<template>
<!--pages//private/privateSetting/privateSetting.wxml-->
<view class="page">
	<view class="p-24 flex align-center">
		<view class="black-block"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">配送设置</view>
	</view>
	<view class="bg-white" style="padding-left: 42rpx;">
		<view :class="'flex align-center justify-between content-list ' + (expandList.length-1>index?'border-bottom':'')" @tap="toPickUp" :data-index="index" v-for="(item, index) in expandList" :key="index">
			<view class="flex align-center">
				<view :class="'iconfont ' + (item.check?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'" @tap.stop="changeTyep" :data-check="item.check" :data-index="index"></view>
				<view class="fs-30 color-2C2C2C ml-20">{{item.name}}</view>
			</view>
			<view class="iconfont icon-jinru color-D6D6D6 fs-40" v-if="index == 1"></view>
		</view>
	</view>
	
	<view class="p-24 flex align-center">
		<view class="black-block"></view>
		<view class="fs-30 color-2C2C2C ns-text-bold">相关信息</view>
	</view>
	<view class="bg-white" style="padding-left: 42rpx;">
		<view class="flex align-center justify-between content-list border-bottom" @tap="toSubmit">
			<view class="flex align-center">
				<view class="fs-30 color-2C2C2C ml-20">上传资质</view>
			</view>
			<view class="iconfont icon-jinru color-D6D6D6 fs-40"></view>
		</view>
		<navigator hover-class="none" url="/private/privateNotice/privateNotice" class="flex align-center justify-between content-list">
			<view class="flex align-center">
				<view class="fs-30 color-2C2C2C ml-20">编辑公告</view>
			</view>
			<view class="iconfont icon-jinru color-D6D6D6 fs-40"></view>
		</navigator>
	</view>
	
	<view class="footer flex justify-between">
		<navigator open-type="navigateBack" class="btn-box btn-box-white">取消</navigator>
		<view class="btn-box" @tap="sureBtn">确定</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      expandList: [{
        id: 2,
        name: '配送',
        check: false
      }, {
        id: 1,
        name: '自提',
        check: false
      }],
      addressList: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdAndSetting();
  },

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getAdAndSetting() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_my_shop,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            var expressSet = res.data.expressSet;
            var expandList = self.expandList;
            var wayText;

            for (var i in expressSet) {
              if (expressSet[i].indexOf('2') > -1) {
                expandList[0].check = true;
              }

              if (expressSet[i].indexOf('1') > -1) {
                expandList[1].check = true;
              }
            }

            self.setData({
              expandList: expandList
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

    toPickUp(e) {
      var index = e.currentTarget.dataset.index;

      if (index == 1) {
        wx.navigateTo({
          url: '/private/privatePickUpSetting/privatePickUpSetting'
        });
      } else {
        return;
      }
    },

    toSubmit() {
      wx.navigateTo({
        url: "/private/submitMaterial/submitMaterial"
      });
    },

    changeTyep(e) {
      var check = e.currentTarget.dataset.check;
      var index = e.currentTarget.dataset.index;
      var expandId = this.expandId;

      if (!check) {
        this.setData({
          ['expandList[' + index + '].check']: !check
        });
      } else {
        this.setData({
          ['expandList[' + index + '].check']: !check
        });
      }
    },

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

    sureBtn() {
      var self = this;
      var expandList = self.expandList;
      var expandId = [];
      var addressList = self.addressList;

      for (var i in expandList) {
        if (expandList[i].check) {
          expandId.push(expandList[i].id);
        }
      }

      if (expandId.indexOf(1) > -1) {
        for (var j in addressList) {
          if (addressList[j].is_sel == '1') {
            var allowUp = true;
          }
        }

        if (!allowUp) {
          wx.showModal({
            title: '请设置提货地址',
            showCancel: false,
            success: res => {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/private/privatePickUpSetting/privatePickUpSetting'
                });
              }
            }
          });
          return;
        }
      }

      this.getApp().core.showLoading({
        title: "正在提交",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.selfSupport.express_set,
        method: 'POST',
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          express_set: expandId
        },

        success(res) {
          if (res.code == 0) {
            wx.showModal({
              title: res.msg,
              showCancel: false,
              success: res => {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            });
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        },

        complete() {
          uni.hideLoading();
        }

      });
    }

  }
};
</script>
<style>
@import "./privateSetting.css";
</style>