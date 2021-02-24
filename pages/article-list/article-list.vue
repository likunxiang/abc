<template>
	<view>
		<common></common>
		<view class="body after-navber">
		
		    <view class="article-list">
		        <navigator v-for="(item, index) in article_list" :key="index" class="flex-row article-item" :url="'/pages/article-detail/article-detail?id=' + item.id">
		            <view class="flex-grow-1 flex-y-center title">
		                {{item.title}}
		            </view>
		            <view class="flex-grow-0 flex-y-center">
		                <image class="pointer" :src="__wxapp_img.store.jiantou_r.url"></image>
		            </view>
		        </navigator>
		    </view>
		
		</view>
	</view>
</template>

<script>

export default {
  data() {
    return {
      article_list: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
    var self = this;
    uni.showLoading();
    this.getApp().request({
      url: this.getApp().api.default.article_list,
      data: {
        cat_id: 2
      },
      success: function (res) {
       uni.hideLoading();
        self.setData({
          article_list: res.data.list
        });
      }
    });
  },
  methods: {}
};
</script>

<style>
.article-list{
    border-top: 1rpx solid #e3e3e3;
}

.article-item{
    background: #fff;
    border-bottom: 1rpx solid #e3e3e3;
    padding: 0 24rpx;
    height: 100rpx;
}
.article-item .title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.article-item .pointer{
    width: 12rpx;
    height: 24rpx;
    margin-left: 24rpx;
}
</style>
