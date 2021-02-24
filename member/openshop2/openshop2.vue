<template>
<!--pages/openshop2/openshop2.wxml-->
<view class="page pr">
	<view class="fs-28 color-595959 nowrap" style="padding-bottom: 20rpx;border-bottom: 1rpx solid #D6D6D6;line-height: 47rpx;">
		<rich-text :nodes="q_desc"></rich-text>
	</view>
	<view v-for="(question, qIndex) in q_list" :key="qIndex" style="padding-top: 28rpx;">
		<view class="fs-28 ns-text-bold color-595959 mb-20">{{qIndex + 1}}.{{question.title}}</view>
		<view v-for="(questionList, index) in question.op_list" :key="index" class="fs-26">
			<view class="mb-20 ns ns-text-bold" v-if="questionList.name">{{questionList.name}}</view>
			<view class="flex fs-26 ns-wrap" v-if="questionList.input_type==1">
				<view v-for="(value1, index2) in questionList.txt_list" :key="index2" class="mt-20 mb-20">
					<view v-for="(value, key) in value1" :key="key" :data-oid="questionList.oid" :data-qid="question.qid" :data-radioIndex="qIndex" @tap="changeExp" :data-text="key" :data-index="key" class="checkbox mr-10 mb-10 flex ns-align-items-flex-center">
						<view style="width: 40rpx;height: 40rpx;margin-right: 12rpx;color: #252E3E;" :class="'iconfont fs-40 ' + (question.ins==key ? 'icon-xuanzhong' : 'icon-weixuanzhong')"></view>
						<view>{{value}}</view>
					</view>
				</view>
			</view>
			<!-- <view class="flex fs-26" v-if="questionList.input_type==2">
				<checkbox-group class="flex ns-align-content-center ns-wrap" @change="checkboxChange" :data-oid="questionList.oid" :data-qid="question.qid">
				  <label v-for="(value, index2) in questionList.txt_list" :key="index2" class="checkbox mr-10 mb-10 flex ns-align-items-flex-center">
				    <checkbox v-for="(item, key) in value" :key="key + 'a'" class="cb yellow" :value="key"></checkbox>
					<view v-for="(item, index) in value" :key="index + 'b'">{{item}}</view>
				  </label>
				</checkbox-group>
			</view> -->
			<view v-if="questionList.input_type==3" class="textarea-box pr">
				<textarea style="width: 100%;height: 100%;" :value="expValue" @input="expText" placeholder="之前有过哪些和开店、销售相关的经验？" maxlength="60"></textarea>
				<view class="fs-24 color-B0B0B0 pa" style="right: 20rpx;bottom: 15rpx;">{{expValue.length || 0}}/{{questionList.max_input}}</view>
			</view>
		</view>
	</view>
	<view class="next-btn" @tap="savaData">下一步</view>
</view>
</template>

<script>
// pages/openshop2/openshop2.js
var postData = {};

export default {
  data() {
    return {
      expValue: "",
      q_list: [],
	  q_desc:'',
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestionnaire();
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
    expText: function (e) {
      var text = e.detail.value;
      this.setData({
        expValue: text
      });
    },
    changeExp: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var radioIndex = e.currentTarget.dataset.radioindex;
      var text = e.currentTarget.dataset.text;
      var arr = self.q_list;
      arr[radioIndex].ins = index;
	 
      self.setData({
        q_list: arr
      });
      var qid = e.currentTarget.dataset.qid; //问题id
      var oid = e.currentTarget.dataset.oid; // 选项id

      if (!postData[qid]) {
        postData[qid] = {};
      }
      postData[qid][oid] = index;
	  this.$forceUpdate();
	  // console.log(postData[qid][oid] = index)
    },
    checkboxChange: function (e) {
      var value = e.detail.value;
      var oid = e.currentTarget.dataset.oid;
      var qid = e.currentTarget.dataset.qid;
      var check_oid = 'oid' + oid;

      if (!postData[qid]) {
        postData[qid] = {};
      }

      postData[qid][oid] = value; // var quesRow = arr[radioIndex];
      // postData[quesRow.qid][oid]= index;
      // console.log(this.data.value3);
    },
    getQuestionnaire: function () {
      this.getApp().request({
        url: this.getApp().api.default.questionnaire,
        success: res => {
          // for (var i in res.data.q_list) {
          // 	if (res.data.q_list[i].op_list[0].input_type == 1) {
          // 		res.data.q_list[i].ins = 'o1'
          // 	}
          // }
          this.setData(res.data);
        }
      });
    },
    savaData: function () {
      var self = this; // if (postData.length == 0) {
      // 	wx.showToast({
      // 		title: '您还有信息没填',
      // 		icon: 'none'
      // 	})
      // 	return false
      // } else {

      let vdata = JSON.stringify(postData);
      this.getApp().request({
        url: this.getApp().api.default.questionnaire_save,
        method: 'POST',
        data: {
          'q_val': vdata
        },
        success: res => {
          if (res && res.code == 0) {
            uni.navigateTo({
              url: '/member/openshop3/openshop3'
            });
          } else {
            uni.showToast({
              title: res.msg || '网络错误',
              duration: 2500,
              icon: 'none'
            });
          }
        }
      }); // }
    }
  }
};
</script>
<style>
/* pages/openshop2/openshop2.wxss */
page {
	background-color: #fff;
	min-height: 100%;
}
.page {
	padding: 20rpx 30rpx;
	min-height: 100%;
	padding-bottom: 150rpx;
}
.textarea-box {
	padding: 15rpx 20rpx;
	background: #F7F7F7;
	height: 141rpx;
}
.next-btn {
	position: absolute;
	bottom: 57rpx;
	left: 30rpx;
	right: 30rpx;
	height:78rpx;
	background:rgba(244,158,58,1);
	text-align: center;
	line-height: 78rpx;
	font-size: 30rpx;
	color: #fff;
}
.checkbox {
	width: 210rpx;
}
.cb{
  transform: scale(0.7);
}
checkbox .wx-checkbox-input{
    border: 1rpx solid #252E3E;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  font-size: 30rpx;
  color: #fff;
  background: transparent;
  transform: translate(-50%, -50%) scale(1);
  -webkit-transform: translate(-50%, -50%) scale(1);
  background-color: #252E3E;


}
.uni-checkbox-input.uni-checkbox-input-checked::after{
	    font-family: "cuIcon";
	    content: "\e645";
	    position: absolute;
	    color: #252E3E !important;
	    top: 50%;
	    margin-top: -8px;
	    right: 5px;
	    font-size: 16px;
	    line-height: 16px;
	    pointer-events: none;
	    -webkit-transform: scale(1, 1);
	    transform: scale(1, 1);
	    -webkit-transition: all 0.3s ease-in-out 0s;
	    transition: all 0.3s ease-in-out 0s;
	    z-index: 9;
}

</style>