<template>
<!--品牌偏好-->
<view class="addLike">
	<view class="heardBanner">
		<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;'">
			<view class="  go-back flex1" style="font-size:30rpx;color:#FFFFFF;" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view class="qTitle flex1 ns-text-center " style="font-size:37rpx;color:#ffffff;">品牌偏好</view>
			<view class="flex1"></view>
		</view>
	</view>
	<view :style="'height:' + customBar + 'px;'"></view>
	<!-- 导航结束 -->

	<view class="input-left">
		<text class="iconfont icon-pinpai" style="color:#489A19;"></text>
		品牌名称
	</view>
	<view class="input-box">

		<input disabled="true" :value="brandName" class="input-right" placeholder="请选择品牌名称"></input>
	</view>

	<view class="other-flex">

		<view>
			<text class="iconfont icon-yonghu" style="color:#489A19;">

		</text>
			顾客名称
		</view>
		<view>
			<text @tap="openChoose" :data-type="1" class="right">添加顾客</text>
		</view>

	</view>

	<!-- 开关开始 -->
	<view class="box-like">
		<view v-for="(item, index) in userList" :key="index" class="like-item" v-if="item.origin == 1">
			<view class="text-left">{{item.user_name}}</view>
			<view class="text-right">
				<!-- <text class="text1">提醒</text>
				<text class="text2 iconfont  {{item.is_remind == 0?'icon-kaiguankai color-E0E0E0':'icon-kaiguankai1 '}}" bindtap="changeRemind" data-index="{{index}}" data-id="{{item.id}}"></text> -->
				<text class="text3 iconfont icon-shanchu" style="color:#E0E0E0;"></text>
			</view>
		</view>
	</view>
	<view class="box-like">
		<view v-for="(item, index) in userList" :key="index" class="like-item" v-if="item.origin == 2">
			<view class="text-left">{{item.user_name}}</view>
			<view class="text-right">
				<!-- <text class="text1">提醒</text>
				<text class="text2 iconfont  {{item.is_remind == 0?'icon-kaiguankai color-E0E0E0':'icon-kaiguankai1'}}" bindtap="changeRemind" data-index="{{index}}" data-id="{{item.id}}"></text> -->
				<text class="text3 iconfont icon-shanchu" @tap="delUser" :data-index="index" :data-id="item.id"></text>
			</view>
		</view>

	</view>

	<!-- 开关结束 -->
	<!-- 选择 -->
	<Select v-if="isShow" :checkArr="checkArr" :arrData="arrData" :isShow="isShow" :selectType="type" :imgString="'image'" :selectString="'name'" title="顾客名称" inputText="请输入顾客名称" @quxiao="quxiao" @binddata="bindData" @search="searchData" @getmore="getMore"></Select>
</view>
</template>

<script>
import Select from '../../components/select/select.vue'

export default {
  data() {
    return {
      statusBar: getApp().globalData.statusBar,
      customBar: getApp().globalData.customBar,
      custom: getApp().globalData.custom,
      page: 1,
      brandId: "",
      brandName: "",
      userList: "",
      isShow: false,
      url: "",
      type: 0,
      keyword: "",
      arrData: [],
      checkArr: [],
      stopLoadMore: false
    };
  },

  components: {
    Select
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      brandId: options.brand_id,
      brandName: options.brand_name
    });
    this.getUserList();
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
    getUserList() {
      this.getApp().request({
        url: this.getApp().api.maijia.user_brand_attention,
        data: {
          brand_id: this.brandId
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              userList: res.data
            });
          } else {}
        }
      });
    },

    //返回
    returnPage() {
      uni.navigateBack({
        delta: 1,
        fail: res => {
          uni.redirectTo({
            url: '/pages/index/index'
          });
        }
      });
    },

    //添加顾客
    addUser() {
      uni.navigateTo({
        url: '/user/addLike/addLike'
      });
    },

    //打开选择器
    openChoose(e) {
      var type = e.currentTarget.dataset.type;

      if (type == 1) {
        var url = this.getApp().api.maijia.add_client_list;
      } else {
        var url = this.getApp().api.maijia.add_brand_list;
      }

      this.setData({
        isShow: true,
        url: url,
        type:Number(type)||0,
        keyword: ''
      });
      this.getDataList();
    },

    getDataList() {
      this.getApp().request({
        url: this.url,
        data: {
          keyword: this.keyword || '',
          brand_id: this.brandId || ''
        },
        success: res => {
          if (res.code == 0) {
            this.setData({
              arrData: res.data
            });
          }
        }
      });
    },

    // 搜索
    searchData(e) {
      if (e.detail) {
        this.setData({
          keyword: e.detail.keyword,
          page: 1
        });
      }

      this.getDataList();
    },

    // 组件传值出来
    bindData(e) {
      if (e.detail) {
        this.setData({
          checkArr: e.detail.checkArr
        });
      }

      this.addBrand();
    },

    addBrand() {
      this.getApp().request({
        url: this.getApp().api.maijia.add_brand,
        method: 'POST',
        data: {
          brand_ids: this.brandId || '',
          user_ids: this.checkArr || '',
          brand_name: this.keyword || ''
        },
        success: res => {
          if (res.code == 0) {
            this.getUserList();
          }
        }
      });
    },

    // 删除
    delUser(e) {
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var userList = this.userList;
      uni.showModal({
        content: '删除后，活动开始将无法提醒确定删除吗？',
        success: res => {
          if (res.confirm) {
            userList.splice(index, 1);
            this.getApp().request({
              url: this.getApp().api.maijia.del_brand,
              method: 'POST',
              data: {
                id: id
              },
              success: res => {
                if (res.code == 0) {
                  this.setData({
                    userList: userList
                  });
                }
              }
            });
          }
        }
      });
    },

    getMore() {
      var self = this;
      var url = this.url;
      var page = self.page;
      var data = {
        keyword: this.keyword || '',
        brand_id: this.brandId || ''
      };
      this.getApp().core.pading(self, url, data, function (res) {
        if (res.data.length == 0) {
          self.setData({
            stopLoadMore: true
          });
          return;
        }

        var newBrandList = res.data;
        var nowBrandList = self.arrData.concat(newBrandList);
        self.setData({
          arrData: nowBrandList
        });
      });
    },

    // 是否提醒
    changeRemind(e) {
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var userList = this.userList;
      var is_remind = 0;

      if (userList[index].is_remind == 1) {
        is_remind = 0;
      } else {
        is_remind = 1;
      }

      this.setData({
        ['userList[' + index + '].is_remind']: is_remind
      });
      this.getApp().request({
        url: this.getApp().api.maijia.updata_brand,
        method: 'POST',
        data: {
          id: id,
          is_remind: is_remind
        },
        success: res => {
          if (res.code == 0) {} else {
            uni.showModal({
              content: res.msg,
              showCancel: false
            });
          }
        }
      });
    },

    //取消选择
    quxiao(e) {
      this.setData({
        isShow: false,
        page: 1
      });
    }

  }
};
</script>
<style>
/* user/pinpaiLike/pinpaiLike.wxss */


/* user/addPinpai/addPinpai.wxss */


/* user/addLike/addLike.wxss */

page {
    background: #f7f7f7;
}

.heardBanner {
    width: 750rpx;
    background: linear-gradient(134deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
}


/* input内容 */

.input-box {
    width: 700rpx;
    margin: 25rpx 0 0 25rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-radius: 8rpx;
    background-color: #ffffff;
    font-size: 30rpx;
    color: #4a4a4a;
    display: flex;
    box-sizing: border-box;
    padding: 0 35rpx;
}

.input-left {
    font-weight: 500;
    margin-right: 40rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #4A4A4A;
    line-height: 42rpx;
    padding-left: 60rpx;
    margin-top: 30rpx;
}

.input-left text {
    padding-right: 14rpx;
}

.input-right {
    line-height: 100rpx;
    height: 100rpx;
    flex: 1;
}


/* 添加顾客 */

.other-flex {
    width: 100%;
    font-size: 30rpx;
    font-weight: 500;
    color: #4A4A4A;
    line-height: 42rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60rpx;
    margin-top: 30rpx;
}

.other-flex>view {
    display: inline-block;
}

.other-flex>view:nth-of-type(2) {
    font-size: 24rpx;
    font-weight: 400;
    color: #7944E4;
    line-height: 33rpx;
}

.other-flex>view:nth-of-type(1) text {
    margin-right: 15rpx;
    color: #F76436;
}


/* 卡片开关 */

.box-like {
    margin-top: 20rpx;
    width: 700rpx;
    margin-left: 25rpx;
    box-sizing: border-box;
    padding-left: 35rpx;
    background-color: #ffffff;
    border-radius: 8rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #4a4a4a;
}

.like-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 102rpx;
    border-bottom: 1rpx solid rgba(230, 230, 230, 0.5);
    padding-right: 35rpx;
}

.like-item:nth-last-of-type(1) {
    border-bottom: none;
}

.text-left {
    flex: 1;
}

.text-right {
    width: 250rpx;
    font-weight: 400;
    color: #2c2c2c;
    font-size: 24rpx;
    display: flex;
    line-height: 102rpx;
    align-items: center;
    justify-content: flex-end;
}

.text-right .text3 {
    padding-left: 40rpx;
    color: #7944e4;
}

.text-right .text2 {
    padding-left: 22rpx;
    color: #7944e4;
}

.text-center {
    text-align: center;
    padding: 110rpx 0 140rpx 0;
    font-size: 24rpx;
    font-weight: 300;
    color: #9b9b9b;
    line-height: 33rpx;
}

.click {
    opacity: 0.8;
    /* transition: all 0.1s; */
    transform: scale(0.99);
}
</style>