<template>
	<view class="body after-navber">
		<common></common>
	    <view style="background: #fff;padding:24rpx">
	       <!-- <import src="../../wxParse/wxParse.wxml" />
	        <template is="wxParse" data="{{wxParseData:content.nodes}}" /> -->
			<jyf-parser :html="article_content" selectable="true"></jyf-parser>
	    </view>
	
	</view>
</template>

<script>

import jyfParser from '../../components/jyf-parser/jyf-parser.vue'
export default {
	
  data() {
    return {
      version: getApp().globalData._version,
      article_content: ""
    };
  },

  components: {
	  jyfParser
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
    var self = this;
    self.getApp().request({
      url: self.getApp().api.default.article_detail,
      data: {
        id: options.id
      },
      success: function (res) {
        if (res.code == 0) {
          uni.setNavigationBarTitle({
            title: res.data.title
          });
          //WxParse.wxParse("content", "html", res.data.content, self)
          setTimeout(() => {
            self.article_content = res.data.content;
          }, 200);
        }

        if (res.code == 1) {
          uni.showModal({
            title: "提示",
            content: res.msg,
            showCancel: false,
            confirm: function (e) {
              if (e.confirm) {
                uni.navigateBack();
              }
            }
          });
        }
      }
    });
  },
  methods: {}
};
</script>

<style>
page{
    min-height: 100%;
    background: #fff;
    overflow-x: hidden;
}
</style>
