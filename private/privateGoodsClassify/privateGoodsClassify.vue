<template>
<!--pages//private/privateGoodsClassify/privateGoodsClassify.wxml-->
<view class="page pr">
	<view class="pl-20 bg-white">
		<view :class="'classify flex justify-between align-center fs-28 color-2C2C2C pr-20 ' + (classifyList.length-1>index?'border-bottom':'')" v-for="(item, index) in classifyList" :key="index">
			<view class="flex flex1" @tap="editClassify" :data-id="item.id" :data-index="index">
				<view style="width: 50rpx;">{{index + 1}}</view>
				<view>{{item.name}}</view>
			</view>
			<view class="fs-20 color-9B9B9B flex" @tap="setTop" :data-id="item.id">
				<view class="iconfont icon-zhiding1 fs-26 mr-10"></view>
				<view class>移至最前</view>
			</view>
		</view>
	</view>
	<!-- 商品分类 -->
	<view class="goods-classify-model" @tap="closeClassify" v-if="is_classify" :key="id">
		<view class="goods-classify-content" @tap.stop="stop">
			<view class="flex-x-center fs-30 color-595959 ns-text-bold">添加分类</view>
			<view class style="margin-top: 38rpx;height: 280rpx;">
				<view class="border-bottom p-20">
					<input type="text" @blur="getCatName" :value="catName" placeholder="请输入分类名称,最长10个字" maxlength="10"></input>
				</view>
			</view>
			<view class="flex justify-between p-20" style="margin-top: 40rpx;">
				<view v-if="!showDel" class="btn-box btn-box-white" @tap="closeClassify">取消</view>
				<view v-else class="btn-box btn-box-white" @tap="delClassify">删除</view>
				<view class="btn-box" @tap="saveCat">确定</view>
			</view>
		</view>
	</view>
	<view class="footer">
		<view class="fs-28 color-9B9B9B" style="line-height: 40rpx;margin-bottom: 40rpx;">添加商品分类，比如：生鲜、服饰、今日特卖…
			把商品放到对应的分类下面，方便顾客购物下单哦～
			同一款商品最多可以放在3个不同的分类下面</view>
		<view class="footer-btn" @tap="openClassify">添加分类</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      classifyList: [],
      is_classify: false,
      catName: '',
      cat_id: "",
      showDel: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCatList();
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
    editClassify(e) {
      var index = e.currentTarget.dataset.index;
      var cat_id = e.currentTarget.dataset.id;
      var classifyList = this.classifyList;
      var name = classifyList[index].name;
      this.setData({
        catName: name,
        cat_id: cat_id,
        is_classify: true,
        showDel: true
      });
    },

    openClassify() {
      this.setData({
        is_classify: true,
        catName: '',
        cat_id: '',
        showDel: false
      });
    },

    closeClassify() {
      this.setData({
        is_classify: false
      });
    },

    delClassify() {
      wx.showModal({
        title: '确定删除该分类？',
        success: res => {
          if (res.confirm) {
            this.getApp().request({
              url: this.getApp().api.selfSupport.del_cat,
              data: {
                userId: this.getApp().core.getStorageSync('USER_INFO').id,
                id: this.cat_id
              },
              success: res => {
                if (res.code == 0) {
                  this.closeClassify();
                  this.getCatList();
                } else {
                  wx.showModal({
                    title: res.msg,
                    showCancel: false
                  });
                }
              }
            });
          }
        }
      });
    },

    stop() {
      return;
    },

    getCatName(e) {
      this.setData({
        catName: e.detail.value
      });
    },

    getGoodsCat() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.edit_cat,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          name: self.catName,
          id: self.cat_id || ''
        },

        success(res) {
          if (res.code == 0) {
            self.getCatList();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    setTop(e) {
      var self = this;
      var id = e.currentTarget.dataset.id;
      this.getApp().request({
        url: this.getApp().api.selfSupport.set_cat_top,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id
        },

        success(res) {
          if (res.code == 0) {
            wx.showToast({
              title: res.msg,
              icon: 'none'
            });
            self.getCatList();
          } else {
            wx.showModal({
              title: res.msg,
              showCancel: false
            });
          }
        }

      });
    },

    getCatList() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_cat_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          if (res.code == 0) {
            self.setData({
              classifyList: res.data
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

    saveCat() {
      this.getGoodsCat();
      this.closeClassify();
    }

  }
};
</script>
<style>
@import "./privateGoodsClassify.css";
</style>