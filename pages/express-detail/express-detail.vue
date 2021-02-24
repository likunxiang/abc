<template>
	<view class="body after-navber">
		<common></common>
	    <view class="flex-row bg-white mb-20 header-h" v-if="data!=null">
	        <view class="flex-grow-0">
	            <image :src="data.goods.pic" style="width:120rpx;height:120rpx;margin-right: 24rpx" mode="aspectFill"></image>
	        </view>
	        <view class="flex-grow-1">
	            <view>物流状态：
	                <text style="color:#25ae5f">{{data.list[0].status}}</text>
	            </view>
	            <view style="color: #888">快递公司：{{data.express}}</view>
	            <view class="flex-row flex-y-center" style="color: #888">
	                <view class="flex-grow-1">快递单号：{{data.express_no}}</view>
	                <view class="flex-grow-0 flex-x-center" :data-text="data.express_no" @tap="copyText" style="width:100rpx;height:50rpx;border:1rpx solid #eee;">复制</view>
	            </view>
	        </view>
	    </view>
	    <view class="data-list" v-if="data.list&&data.list.length>0">
	        <view v-for="(item, index) in data.list" :key="index" class="data-item flex-row">
	            <view class="flex-grow-0 item-icon flex-col">
	                <view class="item-line flex-grow-0"></view>
	                <view class="item-line flex-grow-0 fs-0">
	                    <image class="point-gray" :src="__wxapp_img.point.gray.url" style="width:16rpx;height: 16rpx "></image>
	                    <image class="point-green" :src="__wxapp_img.point.green.url" style="width:32rpx;height: 32rpx;left: -15rpx "></image>
	                </view>
	                <view class="item-line flex-grow-1"></view>
	            </view>
	            <view class="flex-grow-1 item-content">
	                <view>{{item.context}}</view>
	                <view>{{item.time}}</view>
	            </view>
	        </view>
	    </view>
	    <view class="no-data" v-else>
	        暂无物流信息
	    </view>
	</view>
</template>

<script>


export default {
  data() {
    return {
      data:null
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);

    if (options.inId) {
      var data = {
        order_id: options.inId,
        type: 'IN'
      };
    } else {
      var data = {
        order_id: options.id,
        type: 'mall'
      };
    }

    if (options.type == 'private') {
      var url = this.getApp().api.selfSupport.get_express_detail;
      var data = {
        order_id: options.id,
        userId: uni.getStorageSync('USER_INFO').id
      };
    } else {
      var url = this.getApp().api.order.express_detail;
    }

    this.loadData(url, data);
  },


  methods: {
    /**
     * 加载页面数据
     */
    loadData: function (url, data) {
      var self = this;
     uni.showLoading({
        title: "正在加载"
      });
      this.getApp().request({
        url: url,
        data: data,
        success: function (res) {
         uni.hideLoading();

          if (res.code == 0) {
            self.setData({
              data: res.data
            });
          }

          if (res.code == 1) {
           uni.showModal({
              title: "提示",
              content: res.msg,
              showCancel: false,
              success: function (e) {
                if (e.confirm) {
                 uni.navigateBack();
                }
              }
            });
          }
        }
      });
    },
    copyText: function (e) {
      var self = this;
      var text = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: text,
        success: function () {
          uni.showToast({
            title: "已复制"
          });
        }
      });
    }
  }
};
</script>
<style>
/* pages/express-detail/express-detail.wxss */
.header-h{
    border-top:1rpx solid #e3e3e3;
    padding:32rpx 24rpx;
}
.data-list{
    background: #fff;
    border-bottom:1rpx solid #e3e3e3;
}
.data-list .data-item{
    padding-right: 24rpx;
}

.data-list .data-item .item-icon{
    padding: 0 40rpx;
}
.data-list .data-item .item-line{
    width: 2rpx;
    background: #e3e3e3;
    position: relative;
}
.data-list .data-item .item-line:nth-of-type(1){
    height: 42rpx;
}
.data-list .data-item .item-line image{
    position: absolute;
    left: -5rpx;
    z-index: 9;
    top: -6rpx;
}

.data-list .data-item .item-line image.point-green{
    display: none;
}
.data-list .data-item:first-child .item-line image.point-green{
    display: block;
}

.data-list .data-item:first-child .item-line:nth-of-type(1){
    opacity: 0;
}
.data-list .data-item:last-child .item-line:nth-of-type(3){
    opacity: 0;
}

.data-list .data-item .item-content{
    padding: 28rpx 0;
    border-bottom: 1rpx solid #eee;
    color: #888;
}
.data-list .data-item:first-child .item-content{
    color: #25ae5f;
}

.data-list .data-item:last-child .item-content{
    border-bottom: none;
}

.no-data{
    padding: 24rpx;
    text-align: center;
    color: #888;
}
</style>