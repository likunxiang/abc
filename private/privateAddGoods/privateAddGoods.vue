<template>
<!--pages//private/privateAddGoods/privateAddGoods.wxml-->
<view class="page pr">
	<view class="p-20">
		<view class="bg-white p-20 mb-20 fs-28 color-2C2C2C flex justify-between">
			<view class="flex">
				<view class="ns-text-bold">商品名称</view>
				<view class="color-9B9B9B">(必填)</view>
			</view>
			<view class style="min-width: 400rpx;">
				<input class="ns-text-right" type="text" :value="goodsName" maxlength="45" placeholder="请输入商品名称" @blur="getGoodsName"></input>
			</view>
		</view>

		<view class="plr-20 bg-white mb-20">
			<view :class="'flex justify-between align-center ' + (picList.length>0?'border-bottom':'')">
				<view class="flex fs-28 color-2C2C2C" style="line-height: 79rpx;">
					<view class="ns-text-bold">商品主图</view>
					<view class="color-9B9B9B">(必填)</view>
				</view>
				<button class="cu-btn bg-FF9100 sm fs-24 color-fff" @tap="upPic">添加</button>
			</view>
			<view class="ptb-20" style="flex-wrap:wrap" v-if="picList.length>0">
				<scroll-view scroll-x="true" enable-flex="true" style="height: 150rpx;">
					<view class="flex">
						<view class="notice-pic pr" v-for="(item, index) in picList" :key="index">
							<image class="notice-pic" mode="aspectFill" :src="item" @tap="viewPic" :data-url="item"></image>
							<view class="iconfont icon-guanbi1 pa bg-white" style="top: 0rpx;right: 0rpx;border-radius: 50%;overflow: hidden;" @tap="delPic" :data-index="index"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		<view class="plr-20 bg-white mb-20">
			<view :class="'flex justify-between align-center ' + (detailPicList.length>0?'border-bottom':'')">
				<view class="flex fs-28 color-2C2C2C" style="line-height: 79rpx;">
					<view class="ns-text-bold">详情图</view>
					<view class="color-9B9B9B">(选填)</view>
				</view>
				<button class="cu-btn bg-FF9100 sm fs-24 color-fff" @tap="upDetailPic">添加</button>
			</view>
			<view class="ptb-20" style="flex-wrap:wrap" v-if="detailPicList.length>0">
				<scroll-view scroll-x="true" enable-flex="true" style="height: 150rpx;">
					<view class="flex">
						<view class="notice-pic pr" v-for="(item, index) in detailPicList" :key="index">
							<image class="notice-pic" mode="aspectFill" :src="item" @tap="viewPic" :data-url="item"></image>
							<view class="iconfont icon-guanbi1 pa bg-white" style="top: 0rpx;right: 0rpx;border-radius: 50%;overflow: hidden;" @tap="delPic" :data-index="index"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="private-notice bg-white mb-20 plr-20">
			<view class="ptb-20 border-bottom fs-28 color-2C2C2C flex">
				<view class="ns-text-bold">简介描述</view>
				<view class="color-9B9B9B">(选填)</view>
			</view>
			<block v-if="!is_input">
				<view class="ptb-20" @tap="inputText" :style="'height: 120rpx;' + (goodsDesc?'color: #2c2c2c;':'color: #C8C7C7;')">{{goodsDesc?goodsDesc:'添加商品的卖点,优势,规格等'}}</view>
			</block>
			<block v-else>
				<view class="ptb-20 fs-24">
					<textarea :focus="focus" @blur="getGoodsDesc" :value="goodsDesc" class="fs-28 color-2C2C2C" maxlength="300" placeholder-style="color: #C8C7C7;" placeholder="添加商品的卖点,优势,规格等"></textarea>
				</view>
			</block>
		</view>

		<view class="msg plr-20 bg-white">
			<view class="ptb-20 flex fs-28 border-bottom align-center" @tap="openClassify">
				<view class="color-2C2C2C flex" style="width: 220rpx;">
					<view class="ns-text-bold">商品分类</view>
					<view class="color-9B9B9B">(必填)</view>
				</view>
				<block v-if="showClassify.length>0">
					<view class="flex1">
						<text class="mr-10" v-for="(item, index) in showClassify" :key="index">{{item}}</text>
					</view>
				</block>
				<block v-else>
					<view class="flex1">无</view>
				</block>
				<view class="iconfont icon-jinru fs-40" style="color: #C8C7C7;"></view>
			</view>
			<view class="ptb-20 flex fs-28 border-bottom">
				<view class="color-2C2C2C flex" style="width: 220rpx;">
					<view class="ns-text-bold">商品售价</view>
					<view class="color-9B9B9B">(必填)</view>
				</view>
				<view class="flex1">
					<input @blur="getGoodsPrice" :value="goodsPrice" type="text" style="width: 100%;" placeholder="无"></input>
				</view>
			</view>
			<view class="ptb-20 flex fs-28 border-bottom">
				<view class="color-2C2C2C flex" style="width: 220rpx;">
					<view class="ns-text-bold">库存数量</view>
					<view class="color-9B9B9B">(必填)</view>
				</view>
				<view class="flex1">
					<input @blur="getGoodsNum" type="text" :value="goodsNum" style="width: 100%;" placeholder="无"></input>
				</view>
			</view>
			<view class="ptb-20 flex fs-28" @tap="opentips">
				<view class="color-2C2C2C flex" style="width: 220rpx;">
					<view class="ns-text-bold">卖点标签</view>
					<view class="color-9B9B9B">(选填)</view>
				</view>
				<block v-if="showTips.length>0">
					<view class="flex1">
						<text class="mr-10" v-for="(item, index) in showTips" :key="index">{{item}}</text>
					</view>
				</block>
				<block v-else>
					<view class="flex1">无</view>
				</block>
				<view class="iconfont icon-jinru fs-40" style="color: #C8C7C7;"></view>
			</view>
		</view>
	</view>
	<!-- 商品分类 -->
	<view class="goods-classify-model" @tap="closeClassify" v-if="is_classify">
		<view class="goods-classify-content" @tap.stop="stop">
			<view class="flex-x-center fs-30 color-595959 ns-text-bold">商品分类</view>
			<view class style="margin-top: 38rpx;height: 280rpx;">
				<view class="flex ns-wrap">
					<view :class="'classify-box fs-28 color-9B9B9B ' + (item.isChoose?'border-yellow':'')" :data-id="item.id" :data-text="item.name" :data-index="index" @tap="chooseClassify" v-for="(item, index) in classifyList" :key="index">{{item.name}}</view>
				</view>
			</view>
			<view class="flex justify-between">
				<navigator url="/private/privateGoodsClassify/privateGoodsClassify" class="fs-28 color-489A19">添加商品分类</navigator>
				<view class="fs-28">最多选择3个</view>
			</view>
			<view class="mt-30 flex flex-x-center">
				<!-- <view class="btn-box btn-box-white" bindtap="cancelClassify">取消</view> -->
				<view class="btn-box" style="width: 670rpx;" @tap="saveClassify">确定</view>
			</view>
		</view>
	</view>
	<!-- 卖点标签 -->
	<view class="goods-classify-model" @tap="closetips" v-if="is_tips">
		<view class="goods-classify-content" @tap.stop="stop">
			<view class="flex-x-center fs-30 color-595959 ns-text-bold">卖点标签</view>
			<view class style="margin-top: 18rpx;height: 340rpx;">
				<view class="border-bottom p-20">
					<input type="text" placeholder="请输入分类名称,最长10个字" maxlength="10" @blur="inputTips"></input>
				</view>
				<view class="plr-20">
					<view class="flex" style="padding: 30rpx 0rpx;">
						<view class="fs-30 color-2C2C2C">常用标签</view>
						<view class="mr-10 fs-30">(最多选择2个)</view>
					</view>
					
					<view class="flex ns-wrap">
						<view :class="'classify-box fs-28 color-9B9B9B ' + (item.isChoose?'border-yellow':'')" :data-text="item.name" :data-index="index" @tap="chooseTips" v-for="(item, index) in tipsList" :key="index">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="mt-30 flex flex-x-center">
				<!-- <view class="btn-box btn-box-white" bindtap="cancelTips">取消</view> -->
				<view class="btn-box" style="width: 670rpx;" @tap="saveTips">确定</view>
			</view>
		</view>
	</view>

	<view class="footer flex justify-between">
		<view class="btn-box btn-box-white" @tap="submitGoods" data-status="0">暂不上架</view>
		<view class="btn-box" @tap="submitGoods" data-status="1">立即上架</view>
	</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      picList: [],
      detailPicList: [],
      is_classify: false,
      classifyList: [],
      showClassify: [],
      showClassifyId: [],
      showTips: [],
      tipsList: "",
      goodsName: "",
      goodsDesc: "",
      goodsPrice: "",
      goodsNum: "",
      id: "",
      is_input: false,
      focus: false,
      tipsValue: "",
      is_tips: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.getGoodsData(options.id);
      wx.setNavigationBarTitle({
        title: '编辑商品'
      });
    }

    this.getTag();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCatList();
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
    getTag() {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_tag,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id
        },

        success(res) {
          var tipsList = [];

          for (var i in res.data) {
            var obj = {};
            obj.name = res.data[i];
            obj.isChoose = false;
            tipsList.push(obj);
          }

          if (self.showTips && self.showTips.length > 0) {
            var showTips = self.showTips;

            for (var i in showTips) {
              var tips = showTips[i];

              for (var j in tipsList) {
                if (tipsList[j].name.indexOf(tips) > -1) {
                  tipsList[j].isChoose = true;
                }
              }
            }
          }

          self.setData({
            tipsList: tipsList
          });
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
            var classifyList = res.data;

            for (var i in res.data) {
              classifyList[i].isChoose = false;
            }

            if (self.showClassify && self.showClassify.length > 0) {
              var showClassify = self.showClassify;

              for (var i in showClassify) {
                var tips = showClassify[i];

                for (var j in classifyList) {
                  if (classifyList[j].name.indexOf(tips) > -1) {
                    classifyList[j].isChoose = true;
                  }
                }
              }
            }

            self.setData({
              classifyList: classifyList
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

    getGoodsData(id) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.selfSupport.get_goods_data,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: id
        },

        success(res) {
          if (res.code == 0) {
            var goods = res.data;
            var showClassify = [];
            var showClassifyId = [];
            var picList = [];
            var detailPicList = [];

            for (var i in goods.cat) {
              showClassify.push(goods.cat[i].name);
              showClassifyId.push(goods.cat[i].id);
            }

            for (var j in goods.cover_pic) {
              wx.downloadFile({
                url: goods.cover_pic[j],

                success(res) {
                  if (res.statusCode === 200) {
                    picList.push(res.tempFilePath);
                    self.setData({
                      picList: picList
                    });
                  }
                }

              });
            }

            if (goods.cover_pic_detail) {
              for (var x in goods.cover_pic_detail) {
                wx.downloadFile({
                  url: goods.cover_pic_detail[x],

                  success(res) {
                    if (res.statusCode === 200) {
                      detailPicList.push(res.tempFilePath);
                      self.setData({
                        detailPicList: detailPicList
                      });
                    }
                  }

                });
              }
            }

            self.setData({
              goodsName: goods.name,
              goodsDesc: goods.desc,
              showTips: goods.tag,
              showClassify: showClassify,
              showClassifyId: showClassifyId,
              goodsPrice: goods.min_price,
              goodsNum: goods.num,
              id: id
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

    upPic() {
      var self = this;
      var picList = self.picList;
      wx.chooseImage({
        success(res) {
          var tempPic = res.tempFilePaths;
          self.setData({
            picList: picList.concat(tempPic)
          });
        }

      });
    },

    upDetailPic() {
      var self = this;
      var detailPicList = self.detailPicList;
      wx.chooseImage({
        success(res) {
          var tempPic = res.tempFilePaths;
          self.setData({
            detailPicList: detailPicList.concat(tempPic)
          });
        }

      });
    },

    getGoodsName(e) {
      this.setData({
        goodsName: e.detail.value
      });
    },

    getGoodsDesc(e) {
      this.setData({
        goodsDesc: e.detail.value,
        is_input: false,
        focus: false
      });
    },

    getGoodsPrice(e) {
      this.setData({
        goodsPrice: e.detail.value
      });
    },

    getGoodsNum(e) {
      this.setData({
        goodsNum: e.detail.value
      });
    },

    inputText() {
      this.setData({
        is_input: true,
        focus: true
      });
    },

    // 商品分类
    chooseClassify(e) {
      var self = this;
      var text = e.currentTarget.dataset.text;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var showClassify = self.showClassify;
      var showClassifyId = self.showClassifyId;
      var classifyList = self.classifyList;

      if (showClassify.indexOf(text) > -1) {
        var showIndex = showClassify.indexOf(text);
        showClassify.splice(showIndex, 1);
        showClassifyId.splice(showIndex, 1);
        self.setData({
          ['classifyList[' + index + '].isChoose']: false,
          showClassify: showClassify,
          showClassifyId: showClassifyId
        });
      } else {
        if (showClassify.length < 3) {
          showClassify.push(text);
          showClassifyId.push(id);
          self.setData({
            ['classifyList[' + index + '].isChoose']: true,
            showClassify: showClassify,
            showClassifyId: showClassifyId
          });
        } else {
          wx.showToast({
            title: '最多只能选三个分类',
            icon: 'none'
          });
        }
      }
    },

    saveClassify() {
      this.closeClassify();
    },

    cancelClassify() {
      this.closeClassify();
    },

    inputTips(e) {
      var tipsValue = e.detail.value;
      this.setData({
        tipsValue: tipsValue
      });
    },

    // 标签分类
    chooseTips(e) {
      var self = this;
      var text = e.currentTarget.dataset.text;
      var index = e.currentTarget.dataset.index;
      var showTips = self.showTips;
      var tipsList = self.tipsList;

      if (showTips.indexOf(text) > -1) {
        var showIndex = showTips.indexOf(text);
        showTips.splice(showIndex, 1);
        self.setData({
          ['tipsList[' + index + '].isChoose']: false,
          showTips: showTips
        });
      } else {
        if (showTips.length < 2) {
          showTips.push(text);
          self.setData({
            ['tipsList[' + index + '].isChoose']: true,
            showTips: showTips
          });
        } else {
          wx.showToast({
            title: '最多只能选两个标签',
            icon: 'none'
          });
        }
      }
    },

    saveTips() {
      var showTips = this.showTips;

      if (showTips.length <= 2) {
        this.closetips();

        if (this.tipsValue) {
          showTips.push(this.tipsValue);
          this.setData({
            showTips: showTips
          });
        }
      } else {
        wx.showToast({
          title: '最多只能选两个标签',
          icon: 'none'
        });
      }
    },

    cancelTips() {
      this.closetips();
    },

    stop() {
      return;
    },

    viewPic(e) {
      var self = this;
      var url = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: self.picList,
        current: url
      });
    },

    delPic(e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var picList = self.picList;
      picList.splice(index, 1);
      self.setData({
        picList: picList
      });
    },

    openClassify() {
      this.setData({
        is_classify: true
      });
    },

    closeClassify() {
      this.setData({
        is_classify: false
      });
    },

    opentips() {
      var tipsValue = this.tipsValue;
      var showTips = this.showTips;

      if (tipsValue) {
        var showIndex = showTips.indexOf(tipsValue);
        showTips.splice(showIndex, 1);
        this.setData({
          showTips: showTips
        });
      }

      this.setData({
        is_tips: true,
        tipsValue: ''
      });
    },

    closetips() {
      this.setData({
        is_tips: false
      });
    },

    submitGoods(e) {
      var self = this;
      var status = e.currentTarget.dataset.status;
      var pic_complete_count = 0;
      var pic_url_list = [];
      var dpic_complete_count = 0;
      var dpic_url_list = [];

      if (self.picList.length > 0) {
        this.getApp().core.showLoading({
          title: "正在上传图片",
          mask: true
        });

        for (var i in self.picList) {
          (function (i) {
            self.getApp().core.upFile({
              url: self.getApp().api.selfSupport.upload_image,
              filePath: self.picList[i],
              name: "image",
              success: function (res) {},
              complete: function (res) {
                pic_complete_count++;

                if (res.statusCode == 200) {
                  res = JSON.parse(res.data);

                  if (res.code == 0) {
                    pic_url_list[i] = res.data.image;
                  }
                }

                if (pic_complete_count == self.picList.length) {
                  if (self.detailPicList.length > 0) {
                    for (var j in self.detailPicList) {
                      (function (j) {
                        self.getApp().core.upFile({
                          url: self.getApp().api.selfSupport.upload_image,
                          filePath: self.detailPicList[j],
                          name: "image",
                          success: function (res) {},
                          complete: function (res) {
                            dpic_complete_count++;

                            if (res.statusCode == 200) {
                              res = JSON.parse(res.data);

                              if (res.code == 0) {
                                dpic_url_list[j] = res.data.image;
                              }
                            }

                            if (dpic_complete_count == self.detailPicList.length) {
                              self.getApp().core.hideLoading();

                              _submit();
                            }
                          }
                        });
                      })(j);
                    }
                  } else {
                    self.getApp().core.hideLoading();

                    _submit();
                  }
                }
              }
            });
          })(i);
        }
      } else {
        _submit();
      }

      function _submit() {
        self.getApp().request({
          url: self.getApp().api.selfSupport.edit_goods,
          method: 'POST',
          data: {
            userId: self.getApp().core.getStorageSync('USER_INFO').id,
            id: self.id || '',
            cat_id: self.showClassifyId,
            status: status,
            name: self.goodsName || '',
            cover_pic: pic_url_list,
            cover_pic_detail: dpic_url_list,
            tag: self.showTips || '',
            desc: self.goodsDesc || '',
            min_price: self.goodsPrice,
            num: self.goodsNum
          },

          success(res) {
            if (res.code == 0) {
              wx.showModal({
                title: res.msg,
                showCancel: false,

                success(res) {
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
      }
    }

  }
};
</script>
<style>
@import "./privateAddGoods.css";
</style>