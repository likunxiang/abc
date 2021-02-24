<template>
<!--pages/dailySpecial/dailySpecial.wxml-->
<view class="page">
	<!-- 第一次进入 -->
	<!-- <view class="classify-zhezhao flex-x-center flex-y-center" style="height: {{y}}px;" catchtouchmove="{{true}}" wx:if="{{is_classify && !dailyClassify}}" bindtap="closeClassify">
		<view class="zhezhao-content" catchtap="stop">
			<view class="flex-x-center fs-30 color-2C2C2C ns-text-bold mb-20">提示</view>
			<view class="fs-28 color-2C2C2C mb-20">小亲，我们为你准备了三盘货，你可以根据需要灵活挑选推荐</view>
			<view class="fs-28 color-2C2C2C mb-20">你想优先展示：</view>
			<view style="margin-bottom: 67rpx;">
				<view class="flex mb-20" wx:for="{{classifyList}}" wx:key="key" bindtap="changeClassify" data-index="{{index}}">
					<view class="iconfont {{classifyIns==index?'icon-xuanzhong color-252E3E':'icon-weixuanzhong'}} fs-36 mr-10"></view>
					<view>
						<view class="color-2C2C2C fs-28">{{item.title}}</view>
						<view class="color-9B9B9B fs-24">{{item.desc}}</view>
					</view>
				</view>
			</view>
			<view class="flex-x-center color-252E3E ns-text-bold" bindtap="saveClassify">确定</view>
		</view>
	</view> -->
	<!-- <view class="header flex ns-justify-content-space-between">
		<view class="nav-tab fs-30 color-2C2C2C {{navIns==index?'nav-tab-active':''}}" wx:for="{{navTab}}" wx:key="id" bindtap="changeTab" data-id="{{item.id}}" data-index="{{index}}">{{item.name}}</view>
	</view> -->
	<view class="body">
		<!-- <view class="daily-special-title flex ns-align-items-flex-center">
			<view class="black-block"></view>
			<view class="fs-30 color-252E3E ns-text-bold ml-20">5月11日 第一波</view>
		</view> -->
		<block v-if="dailyList.length>0">
			<view v-for="(shareList, index) in dailyList" :key="index" class="daily-special-content">
				<view class="content-box" v-if="shareList.out_type==1">
					<navigator :url="'/pages/goods/goods?id=' + shareList.out_id" hover-class="none" class="content-header flex" style="width: 100%;">
						<view style="width: 120rpx;height: 120rpx;margin-right: 15rpx;">
							<image style="width: 120rpx;height: 120rpx;background: #fff;" mode="aspectFit" :src="shareList.goods_first_cover_pic"></image>
						</view>
						<view style="width: 530rpx;">
							<view class="fs-28 color-595959 ns-text-bold ns-text-limit">{{shareList.goods_name}}</view>
							<view class="mt-30 flex ns-justify-content-space-between ns-align-items-flex-center">
								<view class="flex ns-align-items-flex-center">
									<view class="color-C10000 fs-30 ns-text-bold">¥ {{shareList.goods_price}}</view>
									<view class="earn fs-28 color-fff ml-20">赚 {{shareList.goods_commission}}</view>
								</view>
								<view class="flex">
									<!-- <view class="icon-box iconfont icon-show_fenxiang color-fff" bindtap="toRecommend" data-gid="{{shareList.out_id}}" data-id="{{shareList.id}}" data-gn="{{shareList.goods_name}}" data-go="{{shareList.goods_original_price}}" data-gp="{{shareList.goods_price}}" data-gpic="{{shareList.goods_first_cover_pic}}" data-index="{{index}}"></view> -->
									<!-- <navigator url="/pages/goods/goods?id={{shareList.out_id}}" class="icon-box ml-30 iconfont icon-jinru2 color-fff"></navigator> -->
								</view>
							</view>
						</view>
					</navigator>
					<view class="content-body">
						<view class="fs-28 color-595959">
							<rich-text :nodes="shareList.content"></rich-text>
						</view>
						<view class="flex mt-15">
							<view v-for="(picList, index2) in shareList.cover_pic" :key="index2" class="pr" style="width: 154rpx;height: 154rpx;margin-right: 15rpx;" @tap="previewImage" :data-url="picList" :data-list="shareList.cover_pic">
								<image style="width: 154rpx;height: 154rpx;background: #ccc;border-radius: 8rpx;" :src="picList" v-if="index<4"></image>
								<view class="more-pic" v-if="shareList.cover_pic.length>4 && index==3">+ {{shareList.cover_pic.length - 4}}</view>
							</view>
						</view>
						<view class="mt-24 flex ns-justify-content-space-between">
							<view class="flex ns-align-items-flex-center" v-if="shareList.infoCircleShare!=null">
								<view class="iconfont icon-biaoji fs-30 color-489A19"></view>
								<view class style="margin-left: 14rpx;">我已推</view>
							</view>
							<view class="flex ns-align-items-flex-center" v-else>
								<view class="iconfont icon-biaoji1 fs-30"></view>
								<view class style="margin-left: 14rpx;">还没推</view>
							</view>
							<view class="flex">
								<!-- <view class="footer-btn flex flex-x-center" style="color: #4A4A4A" bindtap="copyText" data-text="{{shareList.content}}">
									<view class="iconfont icon-fuzhi"></view>
									<view class="ml-10 fs-24">复制文字</view>
								</view> -->
								<!-- <view class="footer-btn flex flex-x-center" style="color: #4A4A4A" bindtap="savePicText" data-text="{{shareList.content}}" data-pic="{{shareList.cover_pic}}">
									<view class="iconfont icon-fuzhi"></view>
									<view class="ml-10 fs-24">下载图文</view>
								</view> -->
								<view class="footer-btn flex flex-x-center ml-20" style="color: #4A4A4A" @tap="toRecommend" :data-text="shareList.content" :data-pic="shareList.cover_pic" :data-gid="shareList.out_id" :data-id="shareList.id" :data-gn="shareList.goods_name" :data-go="shareList.goods_original_price" :data-gp="shareList.goods_price" :data-gpic="shareList.goods_first_cover_pic" :data-index="index">
									<view class="iconfont icon-fuzhi icon-show_fenxiang"></view>
									<view class="ml-10 fs-24">一键分享</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="content-box" v-if="shareList.out_type==2">
					<navigator :url="'/pages/activity/activity?aid=' + shareList.out_id" hover-class="none" class="content-header flex" style="width: 100%;">
						<view style="width: 120rpx;height: 120rpx;margin-right: 15rpx;">
							<image style="width: 120rpx;height: 120rpx;background: #fff;" mode="aspectFit" :src="shareList.activity_banner"></image>
						</view>
						<view style="width: 530rpx;">
							<view class="fs-28 flex ns-justify-content-space-between">
								<view class="color-595959 ns-text-bold ns-text-limit" style="width: 350rpx;">{{shareList.activity_name}}</view>
								<view class style="color: #489A19;">{{shareList.activity_end_date}}</view>
							</view>
							<view class="mt-30 flex ns-justify-content-space-between ns-align-items-flex-center">
								<view class="flex">
									<view class="color-C10000 fs-30 ns-text-bold">¥ {{shareList.activity_low_price}} 起</view>
								</view>
								<view class="flex">
									<!-- <view class="icon-box iconfont icon-show_fenxiang color-fff " bindtap="toRecommend1" data-aid="{{shareList.out_id}}" data-apic="{{shareList.activity_banner}}" data-an="{{shareList.activity_name}}" data-ap="{{shareList.activity_low_price}}" data-ae="{{shareList.activity_end_date}}" data-id="{{shareList.id}}" data-index="{{index}}"></view> -->
									<!-- <navigator url="/pages/activity/activity?aid={{shareList.out_id}}" class="icon-box ml-30 iconfont icon-jinru2 color-fff"></navigator> -->
								</view>
							</view>
						</view>
					</navigator>
					<view class="content-body">
						<view class="fs-28 color-595959">
							<rich-text :nodes="shareList.content"></rich-text>
						</view>
						<view class="flex mt-15">
							<view v-for="(picList, index2) in shareList.cover_pic" :key="index2" class="pr" style="width: 154rpx;height: 154rpx;margin-right: 15rpx;" @tap="previewImage" :data-url="picList" :data-list="shareList.cover_pic">
								<image style="width: 154rpx;height: 154rpx;background: #ccc;border-radius: 8rpx;" :src="picList" v-if="index<4"></image>
								<view class="more-pic" v-if="shareList.cover_pic.length>4 && index==3">+ {{shareList.cover_pic.length - 4}}</view>
							</view>
						</view>
						<view class="mt-24 flex ns-justify-content-space-between">
							<view class="flex ns-align-items-flex-center" v-if="shareList.infoCircleShare!=null">
								<view class="iconfont icon-biaoji fs-30 color-489A19"></view>
								<view class style="margin-left: 14rpx;">我已推</view>
							</view>
							<view class="flex ns-align-items-flex-center" v-else>
								<view class="iconfont icon-biaoji1 fs-30"></view>
								<view class style="margin-left: 14rpx;">还没推</view>
							</view>
							<view class="flex">
								<!-- <view class="footer-btn flex flex-x-center" style="color: #4A4A4A" bindtap="copyText" data-text="{{shareList.content}}">
									<view class="iconfont icon-fuzhi"></view>
									<view class="ml-10 fs-24">复制文字</view>
								</view> -->
							<!-- 	<view class="footer-btn flex flex-x-center" style="color: #4A4A4A" bindtap="savePicText" data-text="{{shareList.content}}" data-pic="{{shareList.cover_pic}}">
									<view class="iconfont icon-fuzhi"></view>
									<view class="ml-10 fs-24">下载图文</view>
								</view> -->
								<view class="footer-btn flex flex-x-center ml-20" style="color: #4A4A4A" @tap="toRecommend1" :data-text="shareList.content" :data-pic="shareList.cover_pic" :data-aid="shareList.out_id" :data-apic="shareList.activity_background" :data-an="shareList.activity_name" :data-ap="shareList.activity_low_price" :data-ae="shareList.activity_end_date" :data-id="shareList.id" :data-index="index">
									<view class="iconfont icon-show_fenxiang"></view>
									<view class="ml-10 fs-24">一键分享</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 品牌 -->
			<!-- <view class="daily-special-content" wx:if="{{shareList.out_type==2}}" wx:for="{{dailyList}}" wx:key="id" wx:for-item="shareList">
				
			</view> -->
			<view class="flex-x-center color-8D8D8D ns-padding-bottom-sm" v-if="is_no_more">没有更多啦~</view>
		</block>
		<block v-else>
			<view class="flex-x-center" style="padding-top: 50rpx;">
				暂时没有相关推荐
			</view>
		</block>
	</view>
	<!-- 分享 -->
	<view :class="'share-modal ' + share_modal_active + ' ' + __device" catchtouchmove="true" @tap="shareModalClose" v-if="sharePic">
		<view :class="'share-modal-body ' + __device" @tap.stop="shop">
			<text class="close pa iconfont icon-guanbi2" @tap="shareModalClose"></text>
			<!-- <view class="shareGet">分享赚 <span>¥ 65</span></view>
	        <view class="tips">收益仅自己可见</view> -->
			<view class="flex-row">
				<view class="flex-grow-1 flex-x-center">
					<button open-type="share" class="share-bottom" style="height:100%;" data-type="1">
						<text class="iconfont icon-weixin color-fff" style="font-size: 50rpx;"></text>
						<view>分享给好友</view>
					</button>
				</view>
				<!-- <view class="flex-grow-1 flex-x-center">
					<button open-type="share" class="share-bottom" style='height:100%;' data-type="2">
						<text class="iconfont icon-weixin1 color-fff" style="font-size: 50rpx;"></text>
						<view>分享图文和商品</view>
					</button>
				</view> -->
				<view class="flex-grow-1 flex-x-center">
					<view @tap="getGoodsQrcode" class="share-bottom">
						<text class="iconfont icon-pengyouquan color-fff" style="font-size: 50rpx;"></text>
						<view>生成商品海报</view>
					</view>
				</view>
			</view>
			<!-- <view bindtap="shareModalClose" class="share-modal-close flex-y-center flex-x-center">关闭</view> -->
		</view>
	</view>	
	<!-- 生成海报 -->
	<view :class="'goods-qrcode-modal ' + goods_qrcode_active + ' flex-y-center'" catchtouchmove="true" @tap="goodsQrcodeClose">
		<view class="goods-qrcode-body flex-col" @tap.stop="shop">
			<view class="flex-grow-1" style="position: relative">
				<view style="position: absolute;left: 0;top:0;width: 100%;height: 100%;">
					<view class="goods-qrcode-box">
						<view class="goods-qrcode-loading flex-x-center flex-y-center" v-if="!goods_qrcode">
							<view class="flex-x-center flex-col">
								<image style="width: 150rpx;height: 150rpx" :src="__wxapp_img.system?__wxapp_img.system.loading2.url:''"></image>
								<view style="color: #888">海报生成中</view>
							</view>
						</view>
						<image @tap="goodsQrcodeClick" mode="aspectFit" :class="'goods-qrcode ' + (goods_qrcode?'active':'')" :data-src="goods_qrcode" :src="goods_qrcode"></image>
					</view>
				</view>
			</view>
			<view class="flex-grow-0 flex-col flex-x-center" style="padding-top: 50rpx;">
				<view>
					<button v-if="goods_qrcode" @tap="saveGoodsQrcode" class="share-btn">
						保存图片
					</button>
					<button v-else style="opacity: .4">保存图片</button>
				</view>
			</view>
			<view class="goods-qrcode-close" @tap="goodsQrcodeClose">
				<image :src="__wxapp_img.store.close2.url" style="width: 40rpx;height: 40rpx;display: block"></image>
			</view>
		</view>
	</view>
	
</view>
</template>

<script>

export default {
  data() {
    return {
      y: this.getApp().core.getSystemInfoSync().windowHeight,
      navTab: [],
      classifyList: [],
      navIns: 1,
      classifyIns: 1,
      // type_id: 2,
      page: 1,
      isShowShare: false,
      is_classify: true,
      share_modal_active: "",
      no_scroll: false,
      dailyList: "",
      type: "",
      gid: "",
      gname: "",
      shareIndex: "",
      shareId: "",
      shareText: "",
      sharePicList: "",
      aid: "",
      apic: "",
      sharePic: "",
      activity: "",
      aname: "",
      goods_qrcode_active: "",
      goods_qrcode: "",
      type_id: "",
      is_no_more: false,
      stopLoadMore: false
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var dailyClassify = getApp().core.getStorageSync('dailyClassify')
    // if (dailyClassify) {
    // 	this.setData({
    // 		dailyClassify: dailyClassify,
    // 		navIns: dailyClassify,
    // 		type_id: dailyClassify + 1,
    // 	})
    // }
    // this.getTypeList()
    this.getDailyList();
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
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      is_no_more: false,
      stopLoadMore: false
    });
    this.getDailyList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this;
    var page = self.page;
    var index = page;
    var data = {
      userId: this.getApp().core.getStorageSync('USER_INFO').id // type: self.data.type_id,
      // price_section: self.data.type_id || 1

    };
    var url = this.getApp().api.mch.daily_info_list;
    this.getApp().core.pading(self, url, data, function (res) {
      if (res.data.list.length == 0) {
        self.setData({
          stopLoadMore: true,
          is_no_more: true
        });
        return;
      }

      var newGoodList = res.data.list;
      var nowGoodList = self.dailyList.concat(newGoodList);
      self.setData({
        dailyList: nowGoodList
      });
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var self = this;
    var type = self.type;
    var shareType = e.target.dataset.type;
    self.shareModalClose();
    self.sbumitShare();

    if (type == 'goods') {
      if (shareType == 1) {
        self.savePicText();
      }

      var user_info = this.getApp().getUser();
      var mch_info = uni.getStorageSync('_mchInfo');
      var res = {
        path: "/pages/goods/goods?id=" + self.gid + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
        title: self.gname,
        imageUrl: self.sharePic
      };
      return res;
    }

    if (type == "activity") {
      if (shareType == 1) {
        self.savePicText();
      }

      var user_info = this.getApp().getUser();
      var mch_info = uni.getStorageSync('_mchInfo');
      var res = {
        path: "/pages/activity/activity?aid=" + self.aid + "&user_id=" + user_info.id + "&mch_id=" + mch_info.id,
        title: self.aname,
        imageUrl: self.apic
      };
      return res;
    }
  },
  methods: {
    changeClassify: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      self.setData({
        classifyIns: index
      });
    },
    // saveClassify: function() {
    // 	var self = this
    // 	wx.showModal({
    // 		content: '是否保存',
    // 		success: function(res) {
    // 			if (res.confirm) {
    // 				getApp().core.setStorageSync('dailyClassify', self.data.classifyIns)
    // 				self.setData({
    // 					navIns: self.data.classifyIns,
    // 					type_id: self.data.classifyIns + 1,
    // 				})
    // 				self.getDailyList()
    // 				self.closeClassify()
    // 			}
    // 		}
    // 	})
    // },
    // closeClassify: function() {
    // 	this.setData({
    // 		is_classify: false
    // 	})
    // },
    showShareModal: function () {
      var self = this;
      self.setData({
        share_modal_active: "active",
        no_scroll: true
      });
    },
    shareModalClose: function () {
      var self = this;
      self.setData({
        share_modal_active: "",
        no_scroll: false
      });
    },
    savePhoto: function () {
      var self = this;

      if (!self.qrcode_pic) {
        uni.showToast({
          title: '请等待图片加载完成~',
          duration: 2000,
          icon: 'none'
        });
        return;
      }

      uni.getImageInfo({
        src: self.qrcode_pic,

        success(res) {
          uni.saveImageToPhotosAlbum({
            filePath: res.path,

            success(res) {
              uni.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '知道了',
                confirmColor: '#72B9C3',
                success: function (res) {
                  if (res.confirm) {
                    self.setData({
                      isShowShare: false
                    });
                  }
                }
              });
            },

            fail: function (res) {
              if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
                uni.showToast({
                  title: '请前往设置开启相册授权',
                  duration: 2000,
                  icon: 'none'
                });
              }
            }
          });
        }

      });
    },
    // getTypeList: function() {
    // 	var self = this
    // 	getApp().request({
    // 		url: getApp().api.mch.daily_type_list,
    // 		data: {
    // 			userId: getApp().core.getStorageSync('USER_INFO').id
    // 		},
    // 		success: function(res) {
    // 			if (res.code == 0) {
    // 				self.setData({
    // 					navTab: res.data,
    // 					type_id: res.data[0].id
    // 				})
    // 				self.getDailyList(res.data[0].id)
    // 			} else {
    // 				wx.showToast({
    // 					title: res.msg,
    // 					icon: 'none',
    // 					duration: 2000
    // 				})
    // 			}
    // 		}
    // 	})
    // },
    // getTypeList: function() {
    // 	var self = this
    // 	getApp().request({
    // 		url: getApp().api.mch.get_price_section,
    // 		data: {
    // 			userId: getApp().core.getStorageSync('USER_INFO').id
    // 		},
    // 		success: function(res) {
    // 			if (res.code == 0) {
    // 				self.setData({
    // 					navTab: res.data,
    // 					classifyList: res.data
    // 				})
    // 			} else {
    // 				wx.showToast({
    // 					title: res.msg,
    // 					icon: 'none',
    // 					duration: 2000
    // 				})
    // 			}
    // 		}
    // 	})
    // },
    getDailyList: function (id) {
      var self = this;
      this.getApp().request({
        url: this.getApp().api.mch.daily_info_list,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id // type: self.data.type_id || id
          // price_section: self.data.type_id || 1

        },
        success: function (res) {
          if (res.code == 0) {
            self.setData({
              dailyList: res.data.list
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        },
        complete: function () {
          uni.stopPullDownRefresh();
        }
      });
    },
    toRecommend: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var gid = e.currentTarget.dataset.gid;
      var name = e.currentTarget.dataset.gn;
      var goods = {};
      var text = e.currentTarget.dataset.text;
      var picList = e.currentTarget.dataset.pic;
      goods.first_cover_pic = e.currentTarget.dataset.gpic;
      goods.original_price = e.currentTarget.dataset.go;
      goods.price = e.currentTarget.dataset.gp;
      goods.id = e.currentTarget.dataset.gid;
      self.setData({
        share_modal_active: "active",
        type: 'goods',
        gid: gid,
        gname: name,
        shareIndex: index,
        shareId: id,
        shareText: text,
        sharePicList: picList,
        no_scroll: true
      });
      self.getSharePic(goods);
    },
    toRecommend1: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var aid = e.currentTarget.dataset.aid;
      var text = e.currentTarget.dataset.text;
      var picList = e.currentTarget.dataset.pic;
      var name = e.currentTarget.dataset.an;
      var activity = {};
      activity.first_cover_pic = e.currentTarget.dataset.apic;
      activity.name = e.currentTarget.dataset.an;
      activity.price = e.currentTarget.dataset.ap;
      activity.id = e.currentTarget.dataset.aid;
      activity.end = e.currentTarget.dataset.ae;
      self.setData({
        share_modal_active: "active",
        aid: aid,
        apic: activity.first_cover_pic,
        type: 'activity',
        sharePic: '1',
        activity: activity,
        aname: name,
        shareIndex: index,
        shareId: id,
        shareText: text,
        sharePicList: picList,
        no_scroll: true
      });
    },
    // getAcitivityQrcode: function(activity) {
    // 	var self = this
    // 	var data = {
    // 		goods_pic: activity.first_cover_pic,
    // 		act_name: activity.name,
    // 		price_str: activity.price,
    // 		end_date: activity.end,
    // 		activity: activity.id
    // 	}
    // 	getApp().request({
    // 		url: getApp().api.default.activity_qrcode,
    // 		data: data,
    // 		success: function(res) {
    // 			if (res.code == 0) {
    // 				self.setData({
    // 					qrcode_pic: res.data.pic_url
    // 				})
    // 			}
    // 		}
    // 	})
    // },
    getSharePic: function (goods) {
      var self = this;
      var goods = goods;
      this.getApp().core.showLoading({
        title: '加载中'
      });
      this.getApp().request({
        url: this.getApp().api.default.get_share_pic,
        data: {
          attr_pic: goods.first_cover_pic,
          price: goods.original_price,
          sale_price: goods.price,
          id: goods.id,
          route_type: 'dailySpecial'
        },
        success: function (res) {
          if (res.code == 0) {
            this.getApp().core.hideLoading();
            self.setData({
              sharePic: res.data.pic_url
            });
          }

          if (res.code == 1) {
            this.getApp().core.hideLoading();
            uni.showToast({
              title: '卡片图片获取失败，请稍后再试',
              duration: 2500,
              icon: 'none'
            });
          }
        },
        fail: function () {
          this.getApp().core.hideLoading();
          uni.showToast({
            title: '网络错误，请稍后再试',
            duration: 2500,
            icon: 'none'
          });
        }
      });
    },
    getGoodsQrcode: function () {
      var self = this;
      self.setData({
        goods_qrcode_active: "active",
        share_modal_active: ""
      });

      if (self.type == 'goods') {
        this.getApp().request({
          url: this.getApp().api.default.goods_qrcode,
          data: {
            goods_id: self.gid
          },
          success: function (res) {
            if (res.code == 0) {
              self.setData({
                goods_qrcode: res.data.pic_url
              });
              self.savePicText();
            }

            if (res.code == 1) {
              self.goodsQrcodeClose();
              this.getApp().core.showModal({
                title: "提示",
                content: res.msg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {}
                }
              });
            }
          }
        });
      }

      if (self.type == 'activity') {
        var activity = self.activity;
        var data = {
          goods_pic: activity.first_cover_pic,
          act_name: activity.name,
          price_str: activity.price,
          end_date: activity.end,
          activity: activity.id
        };
        this.getApp().request({
          url: this.getApp().api.default.activity_qrcode,
          data: data,
          success: function (res) {
            if (res.code == 0) {
              self.setData({
                goods_qrcode: res.data.pic_url
              });
            }
          }
        });
      }
    },
    goodsQrcodeClose: function () {
      var self = this;
      self.setData({
        goods_qrcode_active: "",
        no_scroll: false
      });
    },
    saveGoodsQrcode: function () {
      var self = this;
      var type = '';

      if (self.type == 'goods') {
        type = 'goods';
        var pic_url = self.goods_qrcode;
      }

      if (self.type == 'activity') {
        type = 'activity';
        var pic_url = self.qrcode_pic;
      }

      if (!getApp().core.saveImageToPhotosAlbum) {
        // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
        this.getApp().core.showModal({
          title: '提示',
          content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
          showCancel: false
        });
        return;
      }

      this.getApp().core.showLoading({
        title: "正在保存图片",
        mask: false
      });
      this.getApp().core.downloadFile({
        url: self.goods_qrcode,
        success: function (e) {
          this.getApp().core.showLoading({
            title: "正在保存图片",
            mask: false
          });
          this.getApp().core.saveImageToPhotosAlbum({
            filePath: e.tempFilePath,
            success: function () {
              this.getApp().core.showModal({
                title: '提示',
                content: '商品海报保存成功',
                showCancel: false,

                success(res) {
                  if (res.confirm) {
                    self.goodsQrcodeClose();
                  }
                }

              });
            },
            fail: function (e) {
              this.getApp().core.showModal({
                title: '图片保存失败',
                content: e.errMsg,
                showCancel: false
              });
            },
            complete: function (e) {
              this.getApp().core.hideLoading();
            }
          });
        },
        fail: function (e) {
          this.getApp().core.showModal({
            title: '图片下载失败',
            content: e.errMsg + ";" + self.goods_qrcode,
            showCancel: false
          });
        },
        complete: function (e) {
          this.getApp().core.hideLoading();
        }
      });
    },
    sbumitShare: function () {
      var self = this;
      var index = self.shareIndex;
      this.getApp().request({
        url: this.getApp().api.mch.daily_info_share,
        data: {
          userId: this.getApp().core.getStorageSync('USER_INFO').id,
          id: self.shareId
        },
        success: function (res) {
          if (res.code == 0) {
            // wx.showToast({
            // 	title: res.msg,
            // 	icon: 'none',
            // 	duration: 2000
            // })
            self.setData({
              ['dailyList[' + index + '].infoCircleShare']: true
            });
          } else {
            uni.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            });
          }
        }
      });
    },
    // 预览图片 
    previewImage: function (e) {
      var self = this;
      var picUrl = e.currentTarget.dataset.url;
      var picList = e.currentTarget.dataset.list;
      uni.previewImage({
        current: picUrl,
        // 当前显示图片的http链接
        urls: picList // 需要预览的图片http链接列表

      });
    },
    changeTab: function (e) {
      var self = this;
      var index = e.currentTarget.dataset.index;
      var type_id = e.currentTarget.dataset.id;
      self.setData({
        navIns: index,
        type_id: type_id
      });
      self.getDailyList();
    },
    copyText: function (e) {
      var text = e.currentTarget.dataset.text;
      uni.setClipboardData({
        data: text,

        success(res) {
          uni.getClipboardData({
            success(res) {}

          });
        }

      });
    },
    savePicText: function (e) {
      var self = this;
      var picList = [];

      if (e) {
        var text = e.currentTarget.dataset.text; // picList = e.currentTarget.dataset.pic
      } else {
        var text = self.shareText; // picList = self.data.sharePicList
      } // text = text.replace(/<(\/p|\/div)*>/i, "\r\n");
      // text = text.replace(/<(\/p|\/div)>/i, "\r\n");
      // console.log(text);
      // text = text.replace(/<[^>]*>/i, "");
      // console.log(text);
      // text = text.replace(/<[^>]*>/i, "");
      // console.log(text);


      while (text.indexOf('<p>') > -1) {
        text = text.replace('<p>', '');
        text = text.replace('</p>', '\n');
      }

      while (text.indexOf('<br/>') > -1) {
        text = text.replace('<br/>', '\n');
      }

      while (text.indexOf('&npsb') > -1) {
        text = text.replace('&npsb', ' ');
      }

      while (text.indexOf('<em>') > -1) {
        text = text.replace('<em>', '');
        text = text.replace('</em>', '');
      }

      while (text.indexOf('<strong>') > -1) {
        text = text.replace('<strong>', '');
        text = text.replace('</strong>', '');
      }

      while (text.indexOf('<span ') > -1) {
        text = text.replace(/<[^>]*>/i, '');
        text = text.replace('</span>', '');
      }

      uni.setClipboardData({
        data: text,

        success(res) {
          uni.showToast({
            title: '内容已复制，快去微信粘贴吧～',
            duration: 3000,
            icon: 'none'
          });
          uni.getClipboardData({
            success(res) {}

          });
        }

      }); // for (var i in picList) {
      // 	wx.downloadFile({
      // 		url: picList[i],
      // 		success(res) {
      // 			if (res.statusCode === 200) {
      // 				wx.saveImageToPhotosAlbum({
      // 					filePath: res.tempFilePath,
      // 					success: function(res) {
      // 						wx.showToast({
      // 							title: '保存成功！',
      // 							icon: 'none'
      // 						})
      // 					},
      // 					fail(res) {
      // 						wx.showToast({
      // 							title: '保存失败！',
      // 							icon: 'none'
      // 						})
      // 					}
      // 				})
      // 			}
      // 		}
      // 	})
      // }
    }
  }
};
</script>
<style>
/* pages/dailySpecial/dailySpecial.wxss */
page {
	height: 100%;
	background: #EFEFEF;
}
.classify-zhezhao {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	background-color: rgba(0,0,0,0.35);
	z-index: 10;
}
.zhezhao-content {
	width:549rpx;
	padding: 38rpx 56rpx 30rpx 58rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 10rpx 0px rgba(0,0,0,0.5);
	border-radius: 10rpx;
}
.page {
	height: 100%;
}

.more-pic {
	position: absolute;
	width: 154rpx;
	height: 154rpx;
	top: 0;
	left: 0;
	line-height: 154rpx;
	text-align: center;
	border-radius: 8rpx;
	background: rgba(0,0,0,0.35);
	font-size: 37rpx;
	color: #fff;
}

.header {
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	height: 92rpx;
	padding: 0 60rpx;
	width: 100%;
	background: #fff;
	overflow: hidden;
	z-index: 1;
}

.nav-tab {
	width: 140rpx;
	text-align: center;
	padding: 25rpx 0;
	color: #C8C7C7;
}

.nav-tab-active {
	color: #2c2c2c;
	font-weight: bold;
	border-bottom: 5rpx solid #252E3E;
}

.body {
	padding: 20rpx 25rpx;

}

.daily-special-content {
	margin-bottom: 20rpx;
}

.daily-special-title {
	padding: 25rpx 0;
}

.black-block {
	width: 12rpx;
	height: 33rpx;
	background: #252E3E;
}

.content-box {
	background: #fff;
	padding: 5rpx 15rpx;
}

.content-header {
	padding: 17rpx 0;
	border-bottom: 1rpx solid #D6D6D6;
}

.earn {
	height: 44rpx;
	line-height: 44rpx;
	min-width: 140rpx;
	text-align: center;
	background: linear-gradient(225deg, rgba(247, 100, 54, 1) 0%, rgba(244, 158, 58, 1) 100%);
	border-radius: 37rpx;
}

.icon-box {
	width: 44rpx;
	height: 44rpx;
	line-height: 44rpx;
	text-align: center;
	background: #489A19;
	border-radius: 50%;
}

.content-body {
	padding: 19rpx 5rpx 25rpx;
}

.footer-btn {
	width: 170rpx;
	height: 46rpx;
	line-height: 44rpx;
	border-radius: 23rpx;
	border: 1rpx solid rgba(74, 74, 74, 1);
	text-align: center;
}

.ball {
	position: fixed;
	bottom: 65rpx;
	left: 30rpx;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 60rpx;
	padding: 15rpx;
}
.color-489A19 {
	color: #489A19;
}


.share-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.0);
	z-index: 10000;
	transform: translateY(100%);
	transition: background 250ms;
}

.share-modal .share-modal-body {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	padding-top: 90rpx;
	transform: translateY(100%);
	transition: transform 250ms;
	text-align: center;
}

.share-modal-body text.close {
	width: 28rpx;
	height: 28rpx;
	right: 34rpx;
	top: 34rpx;
}

.share-modal-body .shareGet {
	color: #2c2c2c;
	font-weight: 600;
	font-size: 14px;
	margin-bottom: 20rpx;
}

.share-modal-body .tips {
	color: #D6D6D6;
	font-size: 12px;
	margin-bottom: 90rpx;
}

.shareGet span {
	color: #c10000;
	margin-left: 10rpx;
}

.share-modal.active {
	transform: translateY(0);
	background: rgba(0, 0, 0, 0.5);
}

.share-modal.active .share-modal-body {
	transform: translateY(0);
}

.share-modal .share-bottom {
	text-align: center;
	font-size: 9pt;
	margin: 0;
	padding: 0;
	margin-bottom: 70rpx;
	line-height: inherit;
	border: none;
	background: none;
	color: inherit;
	font-family: inherit;
	display: inline-block;
}

.share-modal .share-bottom:after {
	display: none;
}

.share-modal .share-bottom text {
	display: block;
	width: 100rpx;
	height: 100rpx;
	margin: 0 auto;
	margin-bottom: 30rpx;
	border-radius: 50%;
	line-height: 100rpx;
	text-align: center;
	background: #4CB202;
}

.share-modal .share-bottom:active image {
	opacity: 0.7;
}

.share-modal .share-modal-close {
	background: #fff;
	height: 100rpx;
	border-top: 1rpx solid #eee;
}

/* 商品海报 */
.goods-qrcode-modal {
	position: fixed;
  top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;
	background: rgba(0, 0, 0, 0.5);
	padding: 0rpx 40rpx;
  padding-top: 140rpx;
	padding-bottom: 100rpx;
	transform: translateY(100%);
	opacity: 0.5;
	transition: opacity 250ms;
	visibility: hidden;
}

.goods-qrcode-body {
	height: 1052rpx;
  width: 608rpx;
  margin: 0 auto;
	border-radius: 10rpx;
	position: relative;
}

.goods-qrcode-modal.active {
	transform: translateY(0);
	opacity: 1;
	visibility: visible;
}

.goods-qrcode-modal .goods-qrcode-box {
	height: 100%;
	position: relative;
	box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.15);
}

.goods-qrcode-modal .goods-qrcode-loading {
	top: 0;
	left: 0;
	position: absolute;
	width: 100%;
	height: 100%;
}

.goods-qrcode-modal .goods-qrcode {
	top: 0;
	left: 0;
	position: absolute;
	width: 608rpx;
	height: 924rpx;
	background: #fff;
	display: none;
}

.goods-qrcode-modal .goods-qrcode.active {
	display: block;
}

.goods-qrcode-modal .goods-qrcode-close {
	position: absolute;
  right: 0rpx;
	padding: 15rpx;
}

/* 分享 */
.hide {
	display: none;
}
.share-btn {
	width: 100%;
	height: 78rpx;
	line-height: 78rpx;
	background-color: #F49E3A;
	padding: 0;
	border: 0rpx solid #fff;
	border-radius: 0 !important;
	color: #fff;
	font-size: 30rpx;
}
.step-icon {
	height: 44rpx;
	width: 44rpx;
	margin-right: 16rpx;
}

</style>