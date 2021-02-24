<template>
	<view class="body">
		<view>
			<view v-if="group_fail==0" class="ns-flex bg-252E3E ns-padding-sm ns-justify-content-space-between ns-text-white">
				<view class="ns-margin-left-lg ns-text-default ns-lh-50">拼团倒计时</view>
				<view class="ns-flex">
					<view class="time-item">{{limit_time.days}}</view>
					<view class="ns-padding-horizontal-xs">:</view>
					<view class="time-item">{{limit_time.hours}} </view>
					<view class="ns-padding-horizontal-xs">:</view>
					<view class="time-item">{{limit_time.mins}}</view>
					<view class="ns-padding-horizontal-xs">:</view>
					<view class="time-item">{{limit_time.secs}}</view>
				</view>
			</view>
			<view v-if="group_fail==2" class="ns-flex bg-252E3E ns-padding-sm ns-justify-content-space-between ns-text-white">
				<view class="ns-margin-left-lg ns-text-default ns-lh-50">超过有效时间，
					<text>拼团失败</text></view>
			</view>
			<view v-if="group_fail==1" class="ns-flex bg-252E3E ns-padding-sm ns-justify-content-space-between ns-text-white">
				<view class="ns-margin-left-lg ns-text-default ns-lh-50">拼团成功</view>
			</view>
			<view class="flex-col pt-group" style="height:auto">
				<view class="head-pic flex-grow-0 flex-y-center flex-x-center">
					<block v-for="(item, index) in groupList" :key="index">
						<view class="head-pic-item flex-grow-0" v-if="index==0">
							<image :src="item.avatar_url" style></image>
							<view class="group-frist flex-x-center flex-y-center">团长</view>
						</view>
						<view class="head-pic-item flex-grow-0" v-else>
							<image v-if="item.avatar_url !=0" :src="item.avatar_url"></image>
							<image v-else :src="__wxapp_img.pt.no_group_num.url"></image>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="ns-text-sm ns-padding-sm ns-bg-white">订单详情</view>
		<view :class="show_attr_picker?'no-scroll':''">
			<navigator hover-class="none" :url="'/pages/pt/details/details?gid=' + goods.id + '' + (in_group || group_fail>0 ? '' : '&oid='+oid+'&group_id='+group_id)">
				<view class="goods flex-row">
					<view class="goods-pic flex-grow-0">
						<image :src="goods.cover_pic"></image>
					</view>
					<view class="goods-info flex-grow-1 flex-col ns-flex ns-column ns-justify-content-space-between">
						<view class="ns-flex">
							<view style="width:320rpx" class="goods-info-title flex-grow-0">
								{{goods.name}}
							</view>
							<view style="width:140rpx" class="ns-text-xs ns-margin-left-xs ns-text-right">
								¥{{goods.original_price}}
							</view>
						</view>
						<view class="ns-flex">
							<view class="ns-text-xs ns-text-gray ns-margin-right-xs">颜色：白色</view>
							<view class="ns-text-xs ns-text-gray ns-margin-right-xs">尺码：M</view>
						</view>
						<view class="ns-text-right ns-text-red ns-text-xs">拼团价： ¥
							<text>{{goods.price}}</text>
						</view>
					</view>
					<view class="pt-status-pic">
						<image :src="__wxapp_img.pt.success.url" v-if="group_fail ==1"></image>
						<image :src="__wxapp_img.pt.fail.url" v-if="group_fail ==2"></image>
					</view>
				</view>
			</navigator>
			<view class="ns-padding-sm ns-bdb-default ns-bg-white">
				<view class="ns-flex ns-margin-bottom-sm ns-text-sm">
					<view>拼团须知</view>
					<view class="ns-text-gray ns-padding-left-sm">简单4步，一起拼好货</view>
				</view>
				<view>
					<image class="ptt-box" src="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/pingtuanguize.jpg "></image>
				</view>
			</view>
	
			<view class="play-btn">
				<button style="margin-top:150rpx;" class="pt_btn flex-y-center flex-x-center" :data-id="oid" open-type="share" v-if="group_fail==0&&in_group==true">
					邀请好友
				</button>
				<button class="pt_btn flex-y-center flex-x-center" :data-id="oid" @tap="goToGoodsDetails" v-if="group_fail==1">
					一键开团
				</button>
				<view class="pt_btn flex-y-center flex-x-center" @tap="buyNow" v-if="group_fail==0&&in_group==false">
					我要参团
				</view>
			</view>
			<view class="goods-list ns-padding-horizontal-sm ns-padding-bottom-sm">
				<view class="ns-padding-sm ns-text-center ns-text-sm">~好友正在拼~</view>
				<view class="pintuan-goods-list clear">
					<!-- <navigator url="/pages/pt/details/details?gid={{item.id}}" open-type="navigate" class='list-item flex-row'>
	                    <view class='flex-grow-0 corver-pic'>
	                        <image src='{{item.cover_pic}}'></image>
	                    </view>
	                    <view class='flex-grow-1 flex-col'>
	                        <view class='flex-grow-1 goods-title'>
	                            {{item.name}}
	                        </view>
	                        <view class='flex-grow-0 flex-row'>
	                            <view class='goods-sales'>
	                                已团 {{item.virtual_sales}}
	                            </view>
	                        </view>
	                        <view class='flex-grow-0 flex-row flex-y-bottom'>
	                            <view class='flex-grow-0 price flex-row flex-y-bottom'>
	                                <view class='unit flex-grow-0 flex-y-bottom'>
	                                    ¥
	                                </view>
	                                <view class='flex-grow-1 flex-y-bottom'>{{item.price}}</view>
	                            </view>
	                            <view class='flex-grow-1 old-price flex-y-bottom'>
	                                ¥ {{item.original_price}}
	                            </view>
	                            <view class='flex-grow-0 group-btn flex-x-center flex-y-center'>
	                                去开团
	                            </view>
	                        </view>
	                    </view>
	                </navigator> -->
					<navigator v-for="(item, index) in goods_list" :key="index" :url="'/pages/pt/details/details?gid=' + item.id" style="background: #fff;position:relative">
						<form report-submit="true" @submit="_formIdSubmit">
							<button formType="submit" id="_formIdSubmit">
								<view class="clear">
									<view class="pr pull-left">
										<image mode="aspectFill" :src="item.first_cover_pic" style="display:block;width: 200rpx;height: 205rpx;margin-right: 24rpx;"></image>
										<!-- <view class="pa shopTab">3.5折</view> -->
									</view>
									<view class="pull-left" style="width:466rpx;overflow:hidden">
										<view style="width:466rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;font-size: 24rpx;color:#595959;">
											{{item.name}}
										</view>
										<view style="line-height: 1;font-size: 26rpx;margin: 15rpx 0;">
											<text style="font-weight: bold;color:#C10000;">￥{{item.price}}</text>
											<text style="text-decoration:line-through;color:#BDBDBD;margin-left:20rpx">￥{{item.original_price}}</text>
										</view>
										<view style="font-size:20rpx;color: #E05D21;border:1px solid #E05D21;border-radius:6rpx;display:inline-block">
											<view class="clear">
												<view class="pull-left peopleNum">{{item.group_num}}人团</view>
												<view class="pull-left" style="padding:6rpx 13rpx;">已拼{{item.havePin}}件</view>
											</view>
										</view>
										<view class="initiate clear">
											<view class="pull-left">发起拼团</view>
											<view class="pull-left stran"></view>
										</view>
									</view>
								</view>
							</button>
						</form>
					</navigator>
				</view>
			</view>
		</view>
		<!--     选择规格     -->
		<view class="attr-picker" v-if="show_attr_picker">
			<view class="content-box">
				<view class="flex-row" style="border-bottom: 1rpx solid #e3e3e3;padding: 24rpx 28rpx">
					<view class="flex-grow-0">
						<view class="goods-pic-box">
							<block v-if="goods.attr_pic">
								<image mode="aspectFill" :src="goods.attr_pic"></image>
							</block>
							<block v-else>
								<image mode="aspectFill" :src="goods.cover_pic"></image>
							</block>
						</view>
					</view>
					<view class="flex-grow-1" style="padding: 0 24rpx">
						<view style="color:#c10000;margin-bottom: 12rpx;font-weight: bold">￥{{goods.price}}</view>
						<view style="font-size:9pt">
							库存{{goods.num}}
						</view>
					</view>
					<view class="flex-grow-0">
						<view @tap="hideAttrPicker" class="flex-x-center flex-y-center" style="width: 100rpx;height: 100rpx">
							<image style="width: 30rpx;height: 30rpx" :src="__wxapp_img.store.close.url"></image>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 650rpx;">
					<view style="padding: 24rpx 28rpx">
						<view>
							<view v-for="(attr_group, groupindex) in attr_group_list" :key="groupindex" class="attr-group" v-if="attr_group.attr_list.length>0">
								<view class="attr-group-name">{{attr_group.attr_group_name}}</view>
								<view class="attr-list">
									<text v-for="(item, childindex) in attr_group.attr_list" :key="childindex" :class="'attr-item ' + (item.checked?'active':'')" :data-groupindex="groupindex" :data-childindex="childindex" @tap="attrClick">{{item.attr_name}}
									</text>
								</view>
							</view>
						</view>
						<view style="height: 0;border-bottom: 1rpx solid #e3e3e3;margin-bottom: 40rpx"></view>
						<view style="padding-bottom: 40rpx">
							<view class="flex-row flex-y-center mb-20">
								<view class="flex-grow-1">数量</view>
								<view class="flex-grow-0">
	
									<view class="flex-row number-input-box">
										<view :class="'flex-grow-0 flex-x-center flex-y-center number-btn number-sub ' + (form.number<=1?'disabled':'')" @tap="numberSub">-
										</view>
										<view class="flex-grow-0">
											<input class="flex-grow-1 number-input" :value="form.number" type="number" step="1" min="1" @blur="numberBlur"></input>
										</view>
										<view class="flex-grow-0 flex-x-center flex-y-center number-btn number-add" @tap="numberAdd">+
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="flex-row buy-confirm flex-y-center flex-x-center" @tap="buyNow">
					确认
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
// pages/pt/group/details.js
var utils = require("../../../utils/helper.js");

export default {
  data() {
    return {
      groupFail: 0,
      show_attr_picker: false,
      form: {
        number: 1
      },
      oid: "",
      goods: "",
      groupList: "",
      surplus: "",
      limit_time_ms: "",
      goods_list: "",
      group_fail: "",
      in_group: "",
      attr_group_list: "",
      attr: "",
      pt_attr: "",
      reduce_price: "",
      limit_time: {},
	  group_id:'',
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApp().page.onLoad(this, options);
    var parent_id = 0;
    var user_id = options.user_id;
    var scene = decodeURIComponent(options.scene);

    if (typeof user_id !== 'undefined') {
      parent_id = user_id;
    } else if (typeof scene !== 'undefined') {
      var scene_obj = utils.scene_decode(scene);

      if (scene_obj.user_id && scene_obj.oid) {
        parent_id = scene_obj.user_id;
        options.oid = scene_obj.oid;
      } else {
        parent_id = scene;
      }
    } else {
      if (typeof my !== 'undefined') {
        if (this.$store.state.query !== null) {
          var query = this.$store.state.query;
          this.$store.state.query = null;
          options.oid = query.oid;
          parent_id = query.uid;
        }
      }
    }

    this.setData({
      oid: options.oid
    });
    this.getInfo(options);
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
  onShareAppMessage: function (options) {
    this.getApp().page.onShareAppMessage(this);
    var self = this;
    var user_info = uni.getStorageSync(this.getApp().const.USER_INFO);
    var mch_id = uni.getStorageSync('_mchInfo').id;
    var path = '/pages/pt/group/details?oid=' + self.oid + '&user_id=' + user_info.id + "&mch_id=" + mch_id;
    return {
      title: "快来" + self.goods.price + "元拼  " + self.goods.name,
      path: path,
      //   imageUrl: self.data.goods.cover_pic,
      success: function (res) {}
    };
  },
  methods: {
    /**
     * 获取信息
     */
    getInfo: function (e) {
      var oid = e.oid;
      var self = this;
      uni.showLoading({
        title: "正在加载",
        mask: true
      });
      this.getApp().request({
        url: this.getApp().api.group.group_info,
        method: "get",
        data: {
          oid: oid
        },
        success: function (res) {
          if (res.code == 0) {
            if (res.data.groupFail == 0) {
              self.countDownRun(res.data.limit_time_ms);
            } // self.countDownRun(res.data.limit_time_ms);


            var reduce_price = (res.data.goods.original_price - res.data.goods.price).toFixed(2);
            self.setData({
              goods: res.data.goods,
              groupList: res.data.groupList,
              surplus: res.data.surplus,
              limit_time_ms: res.data.limit_time_ms,
              goods_list: res.data.another.goods_list,
              group_fail: res.data.groupFail,
              oid: res.data.oid,
              in_group: res.data.inGroup,
              attr_group_list: res.data.attr_group_list,
              attr: res.data.attr,
              pt_attr: res.data.pt_attr,
              // group_rule_id: res.data.groupRuleId,
              reduce_price: reduce_price < 0 ? 0 : reduce_price // group_id:res.data.goods.class_group

            }); // if (res.data.groupFail != 0 && res.data.inGroup){
            //     self.setData({
            //         oid:false,
            //         group_id:false
            //     });
            // }
          } else {
            uni.showModal({
              title: '提示',
              content: res.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  uni.redirectTo({
                    // url: '/pages/pt/index/index'
                    url: '/pages/index/index'
                  });
                }
              }
            });
          }
        },
        complete: function (res) {
          setTimeout(function () {
            // 延长一秒取消加载动画
            uni.hideLoading();
          }, 1000);
        }
      });
    },

    /**
     * 执行倒计时
     */
    countDownRun: function (limit_time_ms) {
      var self = this;
      setInterval(function () {
        var leftTime = new Date(limit_time_ms[0], limit_time_ms[1] - 1, limit_time_ms[2], limit_time_ms[3], limit_time_ms[4], limit_time_ms[5]) - new Date(); //计算剩余的毫秒数 

        var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 

        var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 

        var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 

        var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 

        days = self.checkTime(days);
        hours = self.checkTime(hours);
        minutes = self.checkTime(minutes);
        seconds = self.checkTime(seconds);
        self.setData({
          limit_time: {
            days: days,
            hours: hours,
            mins: minutes,
            secs: seconds
          }
        });
      }, 1000);
    },

    /**
     * 时间补0
     */
    checkTime: function (i) {
      //将0-9的数字前面加上0，例1变为01 
      i = i > 0 ? i : 0;

      if (i < 10) {
        i = "0" + i;
      }

      return i;
    },

    /**
     * 返回首页
     */
    goToHome: function () {
     uni.redirectTo({
        // url: '/pages/pt/index/index'
        url: '/pages/index/index'
      });
    },

    /**
     * 前往商品详情
     */
    goToGoodsDetails: function (e) {
      var self = this;
      uni.redirectTo({
        url: '/pages/pt/details/details?gid=' + self.goods.id
      });
    },

    /**
     * 隐藏规格选择框
     */
    hideAttrPicker: function () {
      var self = this;
      self.setData({
        show_attr_picker: false
      });
    },

    /**
     * 显示规格选择框
     */
    showAttrPicker: function () {
      var self = this;
      self.setData({
        show_attr_picker: true
      });
    },
    attrClick: function (e) {
      var self = this;
      var groupindex = e.target.dataset.groupindex;
      var childindex = e.target.dataset.childindex;
      var attr_group_list = self.attr_group_list;

      for (var i in attr_group_list) {
        if (i != groupindex) continue;

        for (var j in attr_group_list[i].attr_list) {
          if (j == childindex) {
            attr_group_list[i].attr_list[j].checked = true;
          } else {
            attr_group_list[i].attr_list[j].checked = false;
          }
        }

        self.setData({
          attr_group_list: attr_group_list
        });
        var checked_attr_list = [];

        for (var i in attr_group_list) {
          var attr = false;

          for (var j in attr_group_list[i].attr_list) {
            if (attr_group_list[i].attr_list[j].checked) {
              attr = {
                attr_name: attr_group_list[i].attr_list[j].attr_name
              };
              break;
            }
          }

          checked_attr_list.push({
            attr_group_name: attr_group_list[i].attr_group_name,
            attr_name: attr.attr_name
          });
        }

        var attrTemp = self.attr;
        let length = checked_attr_list.length;

        for (var i in attrTemp) {
          var tempnum = 0;

          for (var j in checked_attr_list) {
            if (checked_attr_list[j].attr_name != attrTemp[i].attr_list[j].attr_name) {
              break;
            } else {
              tempnum++;
            }
          }

          if (tempnum == length) {
            let goods = self.goods;

            if (self.attr[i].pic) {
              goods.attr_pic = self.attr[i].pic;
            }

            goods.num = self.attr[i].num;
            goods.sku = self.attr[i].sku;

            for (var m in self.pt_attr) {
              if (self.pt_attr[m].sku == goods.sku) {
                goods.price = self.pt_attr[m].price;
                goods.origin_price = self.attr[m].va;
              }
            }

            self.setData({
              goods: goods
            });
          }
        }
      }
    },

    /**
     * 参团
     */
    buyNow: function () {
      this.submit('GROUP_BUY_C');
    },

    /**
     * 订单提交
     */
    submit: function (type) {
      var self = this;

      if (!self.show_attr_picker) {
        self.setData({
          show_attr_picker: true
        });
        this.selectDefaultAttr();
        return true;
      }

      if (self.form.number > self.goods.num) {
        uni.showToast({
          title: "商品库存不足，请选择其它规格或数量",
          image: "/static/images/icon-warning.png"
        });
        return true;
      } // var attr_group_list = self.data.attr_group_list;
      // var checked_attr_list = [];
      // for (var i in attr_group_list) {
      //     var attr = false;
      //     for (var j in attr_group_list[i].attr_list) {
      //         if (attr_group_list[i].attr_list[j].checked) {
      //             attr = {
      //                 attr_id: attr_group_list[i].attr_list[j].attr_id,
      //                 attr_name: attr_group_list[i].attr_list[j].attr_name,
      //             };
      //             break;
      //         }
      //     }
      //     if (!attr) {
      //         getApp().core.showToast({
      //             title: "请选择" + attr_group_list[i].attr_group_name,
      //             image: "/images/icon-warning.png",
      //         });
      //         return true;
      //     } else {
      //         checked_attr_list.push({
      //             attr_group_id: attr_group_list[i].attr_group_id,
      //             attr_group_name: attr_group_list[i].attr_group_name,
      //             attr_id: attr.attr_id,
      //             attr_name: attr.attr_name,
      //         });
      //     }
      // }


      self.setData({
        show_attr_picker: false
      });
      var goods_list = [];
      goods_list.push({
        // deliver_type: self.data.goods.type,
        goods_id: self.goods.id,
        num: self.form.number,
        sku: self.goods.sku,
        type: type,
        from: 3,
        group_id: 0,
        parent_id: self.oid
      });
      var goods = self.goods;
      var mch_id = 0;

      if (goods.mch != null) {
        mch_id = goods.mch.id;
      }

      var mch_list = [];
      mch_list.push({
        mch_id: mch_id,
        goods_list: goods_list
      });
      uni.redirectTo({
        url: "/pages/new-order-submit/new-order-submit?mch_list=" + JSON.stringify(mch_list)
      });
    },
    numberSub: function () {
      var self = this;
      var num = self.form.number;
      if (num <= 1) return true;
      num--;
      self.setData({
        form: {
          number: num
        }
      });
    },
    numberAdd: function () {
      var self = this;
      var num = self.form.number;
      num++;

      if (num > self.goods.one_buy_limit && self.goods.one_buy_limit != 0) {
        uni.showModal({
          title: '提示',
          content: '最多只允许购买' + self.goods.one_buy_limit,
          showCancel: false
        });
        return;
      }

      if (num > self.goods.buy_limit && self.goods.buy_limit != 0) {
        uni.showModal({
          title: '提示',
          content: '数量超过最大限购数',
          showCancel: false,
          success: function (res) {}
        });
        return;
      }

      self.setData({
        form: {
          number: num
        }
      });
    },
    numberBlur: function (e) {
      var self = this;
      var num = e.detail.value;
      num = parseInt(num);
      if (isNaN(num)) num = 1;
      if (num <= 0) num = 1;

      if (num > self.goods.one_buy_limit && self.goods.one_buy_limit != 0) {
        uni.showModal({
          title: '提示',
          content: '最多只允许购买' + self.goods.one_buy_limit + '件',
          showCancel: false
        });
        self.setData({
          form: {
            number: num
          }
        });
        return;
      }

      if (num > self.goods.buy_limit && self.goods.buy_limit != 0) {
        uni.showModal({
          title: '提示',
          content: '数量超过最大限购数',
          showCancel: false,
          success: function (res) {}
        });
        return;
      }

      self.setData({
        form: {
          number: num
        }
      });
    },

    /**
     * 拼团规则
     */
    goArticle: function (e) {
      if (this.group_rule_id) {
        uni.navigateTo({
          url: '/pages/article-detail/article-detail?id=' + this.group_rule_id
        });
      }

      ;
    },

    /**
     * 无规格、默认选中
     */
    selectDefaultAttr: function () {
      var self = this;
      var goods_attr = self.attr;
      var attr_group_list = self.attr_group_list;

      for (var i in attr_group_list) {
        for (var j in attr_group_list[i].attr_list) {
          if (j == 0) attr_group_list[i].attr_list[j]['checked'] = true;
        }
      }

      let goods = self.goods;
      goods.attr_pic = goods_attr[0].pic;
      goods.num = goods_attr[0].num;

      if (self.form.number && self.form.number > goods.num) {
        self.setData({
          form: {
            number: goods.num
          }
        });

        if (goods.num == 0) {
          self.setData({
            form: {
              number: 1
            }
          });
        }
      }

      goods.c1 = goods_attr[0].c1;
      goods.sku = goods_attr[0].sku;
      goods.price = goods_attr[0].price;
      goods.attr_list = goods_attr[0].attr_list;
      goods.original_price = goods_attr[0].va;
      self.setData({
        goods: goods,
        attr_group_list: self.attr_group_list
      });
    }
  }
};
</script>
<style>
/* pages/pt/group/details.wxss */
page {
  background-color: #fff;
}
.goods {
    background-color: #fff;
    padding: 0rpx 24rpx 24rpx 24rpx;
    position: relative;
}

.pt-status-pic image {
    width: 140rpx;
    height: 140rpx;
}

.pt-status-pic {
    position: absolute;
    top: 40rpx;
    right: 24rpx;
    z-index: 999;
}

.goods-pic image {
    width: 200rpx;
    height: 200rpx;
    margin-right: 24rpx;
}

.goods-info-title {
    font-size: 11pt;
    color: #353535;
}

.goods-price {
    font-size: 10pt;
    color: #ff5c5c;
}

.goods-price text {
    font-size: 18pt;
}

.goods-original-price {
    font-size: 9pt;
    color: #a4a4a4;
    text-decoration: line-through;
    margin-left: 10rpx;
}

.goods-money {
    margin-top: 20rpx;
    line-height: 1;
}

.goods-label {
    margin: 10rpx 0;
    color: #ff5c5c;
    font-size: 9pt;
}

.goods-limit {
    padding: 0 12rpx;
    background-color: #feeeee;
    margin-right: 8rpx;
}

.goods-omit {
    background-color: #feeeee;
    padding: 0 12rpx;
}

.pt-group {
    /* background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAr4AAADmCAYAAAAzxYbGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMDgzZTc4NS0yZWUwLTk3NDYtODQ2NC1mNDdlYTAyYzc0ZmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjE5OTZCQzNDRTlDMTFFNzgzNDVERTFDNDcyMDQ2MUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjE5OTZCQzJDRTlDMTFFNzgzNDVERTFDNDcyMDQ2MUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTIyMTBjNWUtZmVlZC01ZDRiLWI2MWItMzgzODA1ZDUzMzA0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjdiZWFjNGQtYzllMS0xMWU3LTgzMTEt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'); *//* height: 230rpx; */
    width: 100%;
    position: relative;
    background-color: #fff;
    min-height: 160rpx;
}

.pt-group-shell {
    margin-top: 24rpx;
    padding: 0 24rpx;
}

.top-title {
    font-size: 10pt;
    color: #353535;
    padding-top: 52rpx;
}

.top-title text {
    color: #ff5c5c;
}

.head-pic {
    padding: 34rpx 40rpx 0 40rpx;
    flex-wrap: wrap;
}

.head-pic-item {
    position: relative;
    margin: 10rpx 8rpx;
    width: 70rpx;
    height: 70rpx;
}

.head-pic image {
    width: 70rpx;
    height: 70rpx;
    border-radius: 35rpx;
    /* border: 2rpx solid #ff5c5c; */
}

.group-frist {
    width: 56rpx;
    height: 26rpx;
    background-color: #fa5717;
    color: #fff;
    font-size: 6pt;
    border-radius: 13rpx;
    position: absolute;
    top:-16rpx;
    right:-10px;

}

.play-btn {
    margin: 24rpx 24rpx 32rpx 24rpx;
}

.play-btn .pt_btn {
    height: 88rpx;
    background-color: #F49E3A;
    border-radius: 10rpx;
    color: #fff;
    font-size: 14px;
}

.button::after {
    content: normal !important;
}

.group-notice, .goods-more {
    height: 90rpx;
    padding: 0 24rpx;
    background-color: #fff;
}

.group-notice-left {
    font-size: 10pt;
    color: #353535;
}

.group-notice-info {
    font-size: 9pt;
    color: #919191;
}

.goods-right image {
    width: 16rpx;
    height: 26rpx;
    margin-left: 20rpx;
}

.goods-more {
    margin-top: 20rpx;
    border-bottom: 1rpx solid #e2e2e2;
}

/* 鍟嗗搧鍒楄〃 */

.list-item {
    padding: 24rpx;
    border-bottom: 1rpx solid #e2e2e2;
    background-color: #fff;
}

.list-item .corver-pic image {
    width: 220rpx;
    height: 220rpx;
    border-radius: 5rpx;
    margin-right: 24rpx;
}

.goods-title {
    color: #353535;
    font-size: 11pt;
}

.list-item .group-item image {
    width: 34rpx;
    height: 34rpx;
    border: 1rpx solid #fff;
    border-radius: 17rpx;
}

.list-item .group-item view {
    float: left;
    width: 24rpx;
}

.goods-sales {
    font-size: 10pt;
    color: #ff5c5c;
    /* margin-left: 12rpx; */
}

.list-item .price {
    color: #ff5c5c;
    font-size: 14pt;
    margin-right: 16rpx;
    line-height: 1;
}

.list-item .price .unit {
    font-size: 9pt;
}

.list-item .old-price {
    font-size: 10pt;
    color: #919191;
    text-decoration: line-through;
    line-height: 1;
}

.list-item .group-btn {
    height: 66rpx;
    width: 180rpx;
    color: #fff;
    font-size: 12pt;
    border-radius: 10rpx;
    background-color: #ffa360;
    background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, #ffa360), color-stop(140%, #ff5c5c));
    background-image: linear-gradient(140deg, #ffa360, #ff5c5c);
}

.attr-picker {
    position: fixed;
    bottom: 0rpx;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.attr-picker .content-box {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0rpx;
}

.attr-picker .attr-group {
    margin-bottom: 6rpx;
}

.attr-picker .attr-group-name {
    margin-bottom: 20rpx;
}

.attr-picker .attr-item {
    display: inline-block;
    margin: 0 30rpx 30rpx 0;
    background: #f7f7f7;
    border-radius: 10rpx;
    padding: 15rpx 30rpx;
}

.attr-picker .attr-item.active {
    background: #c10000;
    color: #fff;
}

.attr-picker .goods-pic-box {
    position: relative;
    width: 200rpx;
}

.attr-picker .goods-pic-box image {
    position: absolute;
    top: -90rpx;
    border: 5rpx solid #fff;
    width: 200rpx;
    height: 200rpx;
    border-radius: 5rpx;
    box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.2);
}

.number-input-box {
    height: 70rpx;
}

.number-input-box .number-input {
    height: 70rpx !important;
    border: none;
    text-align: center;
    width: 120rpx;
    background: #eee;
    margin: 0 4rpx !important;
}

.number-input-box .number-btn {
    height: 100% !important;
    width: 70rpx;
    background: #eee;
}

.number-input-box .number-btn.disabled {
    background: #f6f6f6;
    color: #aaa;
}

.buy-confirm {
    height: 90rpx;
    background-color: #c10000;
    color: #fff;
    font-size: 12pt;
}

.time-item {
  background: #fff;
  color: #c10000;
  padding: 6rpx;
  font-size: 9pt
}
.ns-lh-50 {
  line-height: 50rpx
}
.ptt-box {
  width: 100%;
  height: 47rpx;
}
.pintuan-goods-list navigator{
    margin-bottom:15rpx;
}
.pintuan-goods-list .peopleNum{
  background-image: linear-gradient(180deg, #F29645 0%, #E05D21 100%);
  border-radius: 0 20rpx 0 0;
  padding:6rpx 13rpx;
  color:#fff;
}
.pintuan-goods-list navigator:last-child{
    margin-bottom:0;
}
.pintuan-goods-list .initiate{
  position: absolute;
  right: 0;
  bottom: 0;
  background: #C10000;
  padding:12rpx 23rpx;
  color:#fff;
  font-size: 14px;
  text-align: center;
}
.pintuan-goods-list .stran{
    width: 0;
    height: 0;
    border-top: 15rpx solid transparent;
    border-left: 20rpx solid #fff;
    border-bottom: 15rpx solid transparent;
    margin-left: 10rpx;
    margin-top: 6rpx;
}
.pintuan-header{
  padding: 30rpx;
  padding-top: 4rpx;
  background: #fff;
  position: relative;
  height: 90rpx;
}
</style>