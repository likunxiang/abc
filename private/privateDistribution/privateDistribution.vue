<template>
<!--pages//private/privateDistribution/privateDistribution.wxml-->
<view class="page">
	<view class="goods-classify-model flex-x-center flex-y-center" @tap="closetips" v-if="is_tips">
		<view class="goods-classify-content" @tap.stop="stop">
			<view class="goods-classify-content-top fs-28 color-2C2C2C border-bottom">请扫描或者录入物流单号</view>
			<view class="goods-classify-content-btn fs-28 color-2C2C2C" @tap="closeTips">确定</view>
		</view>
	</view>
	<view class="bg-white mb-20">
		<view class="flex justify-between align-center border-bottom padding-lr" style="height: 82rpx;">
			<view class="flex align-center" @tap="changeTyep" data-type="2">
				<view :class="'iconfont ' + (expandIns==2?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'"></view>
				<view class="fs-30 color-2C2C2C ml-20 ns-text-bold">物流配送</view>
			</view>
			<view class="flex align-center" @tap="scan">
				<view class="iconfont icon-saomiao fs-36"></view>
				<view class="fs-24 color-2C2C2C ml-20">扫描物流单号</view>
			</view>
		</view>
		<view class="fs-30 color-2C2C2C" style="padding-left: 90rpx;">
			<view class="flex align-center" style="height: 90rpx;line-height: 90rpx;">
				<view>物流单号</view>
				<input class="ml-30" type="text" placeholder="无" :value="express_no" @input="expressInput"></input>
			</view>
			<view class="flex align-center" style="height: 90rpx;line-height: 90rpx;">
				<view>物流公司</view>
				<view class="ml-30 flex1">
					<picker name="express" @change="bindExpressPickerChange" :value="express_index" :range="express_list" range-key="name" style="padding: 24rpx 0">
						<view class="flex flex-row">
							<view class="flex-grow-1">
								<view v-if="express_index!=null">{{express_list[express_index].name}}</view>
								<view v-else style="color: #888">{{scanText}}</view>
							</view>
						</view>
					</picker>
				</view>
			</view>
		</view>
	</view>
	
	<view class="bg-white">
		<view class="flex justify-between align-center padding-lr" style="height: 82rpx;">
			<view class="flex align-center" @tap="changeType" data-type="3">
				<view :class="'iconfont ' + (expandIns==3?'icon-xuanzhong color-252E3E':'icon-weixuanzhong') + ' fs-40'"></view>
				<view class="fs-30 color-2C2C2C ml-20 ns-text-bold">非物流配送</view>
			</view>
		</view>
	</view>
	
	<view class="footer flex justify-between">
		<view class="btn-box btn-box-white">取消</view>
		<view class="btn-box" @tap="sureBtn">确定</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      expandIns: 2,
      is_tips: false,
      express_no: '',
      express_list: [{
        id: 1,
        name: "韵达快递",
        code: "yunda"
      }, {
        id: 6,
        name: "圆通速递",
        code: "yuantong"
      }, {
        id: 5,
        name: "中通快递",
        code: "zhongtong"
      }, {
        id: 2,
        name: "邮政快递包裹",
        code: "youzhengguonei"
      }],
      scanText: '无',
      id: "",
      express_index: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getExpressList();
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
    getExpressList() {
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_express_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              express_list: res.data
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

    bindExpressPickerChange: function (e) {
      var self = this;
      self.setData({
        express_index: e.detail.value
      });
    },

    expressInput(e) {
      var value = e.detail.value;
      this.setData({
        express_no: value
      });
    },

    changeType(e) {
      var type = e.currentTarget.dataset.type;
      this.setData({
        expandIns: type
      });
    },

    sureBtn() {
      var self = this;

      if (self.expandIns == 2) {
        if (self.express_no.length == 0) {
          self.openTips();
          return;
        }

        var data = {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          express_set: self.expandIns,
          express_code: self.express_list[self.express_index].code || '',
          express: self.express_list[self.express_index].name || '',
          express_no: self.express_no || '',
          id: self.id
        };
      } else {
        var data = {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          express_set: self.expandIns,
          id: self.id
        };
      }

      this.getApp().request({
        url: this.getApp().api.selfSupport.order_express,
        data: data,
        success: res => {
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
        }
      });
    },

    openTips() {
      this.setData({
        is_tips: true
      });
    },

    closeTips() {
      this.setData({
        is_tips: false
      });
    },

    scan() {
      var self = this;
      wx.scanCode({
        success:(res) => {
          self.setData({
            express_no: res.result
          });
          var type;
          var postid = res.result;
          this.getApp().core.showLoading({
            title: '查询中'
          });
          this.getApp().request({
            url: 'http://www.kuaidi100.com/autonumber/autoComNum',
            data: {
              text: res.result
            },
            success: function (res) {
              var type = res.auto[0].comCode;
              var express_list = self.express_list;

              for (var i in express_list) {
                if (express_list[i].code == type) {
                  self.setData({
                    express_index: i
                  });
                }
              }
            },
            fail: function (res) {
              wx.showModal({
                title: '参数有误',
                icon: 'none'
              });
            },
            complete: () => {
              this.getApp().core.hideLoading();
            }
          });
        },

        fail(res) {
          wx.showModal({
            title: '未查到相关信息,请手动输入',
            icon: 'none'
          });
        }

      });
    }

  }
};
</script>
<style>
@import "./privateDistribution.css";
</style>