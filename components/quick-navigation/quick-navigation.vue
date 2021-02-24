<template>
<view>
<block v-if="setnavi.type==='0'">
    <view v-if="quick_icon" class="quick-modal ">
        <view class="quick-modal-bg"></view>
        <view class="quick-modal-pic flex-y-center flex-x-center">
            <view direction="all" :class="'quick-icon ' + __device">

                <view style="position:relative;">
                    <view v-if="!home_icon" class="quick-zfb" :animation="animationPlus">
                        <navigator url="/pages/index/index" open-type="reLaunch" hover-class="none">
                            <image class="quick-dial" :src="setnavi.home_img"></image>
                        </navigator>
                    </view>

                    <block v-if="store.option.quick_map.status==1">

                        <view class="quick-dial quick-zfb" @tap="map_power" style="background-image:url({store.option.quick_map.icon}); background-size: 100rpx 100rpx;" :animation="animationMapPlus"></view>
                    </block>

                    <block v-if="store.dial == 1 && store.dial_pic">
                        <view class="quick-dial quick-zfb" @tap="to_dial" style="background-image:url({store.dial_pic}); background-size: 100rpx 100rpx;" :animation="animationPic"></view>
                    </block>
                    <block v-if="store.option.web_service">
                        <navigator :url="'/pages/web/web?url=' + store.option.web_service_url" open-type="navigate" hover-class="none">
                            <view class="quick-zfb" :animation="animationcollect">
                                <image class="quick-dial" :src="store.option.web_service"></image>
                            </view>
                        </navigator>
                    </block>
                    <block v-if="store.show_customer_service && store.show_customer_service==1 && store.service">
                        <block v-if="__platform=='wx'">
                            <!-- <button style="height:100%" open-type="contact" session-from="{{__user_info.nickname}}|" style="border:0rpx solid #ffffff;padding:0px;display:inline;background-color:transparent;" class="float-icon-btn">
                                <view class="quick-zfb" style="display:inline-block;top:0;" animation="{{animationTranspond}}"  >
                                    <image class='quick-dial' src="{{store.service}}"></image>
                                </view>
                            </button> -->
                         </block> 


                         <block v-if="__platform=='my'">
                            <view class="float-icon-btn">

                                <view class="quick-zfb" :animation="animationTranspond">

                                    <view class="flex-x-center flex-y-center" style="z-index:2;width: 100%;border-radius:50%;height: 100%;position: absolute;left: 0;top:0;opacity: 0">
                                        <contact-button size="40" :tnt-inst-id="__alipay_mp_config.cs_tnt_inst_id" :scene="__alipay_mp_config.cs_scene"></contact-button>
                                    </view>
                                    <image class="quick-dial" :src="store.service"></image>
                                </view>
                            </view>
                        </block>

                    </block>
                    <block v-if="store.option.wxapp.pic_url">
                        <block v-if="__platform == 'wx'">
                            <navigator open-type="navigate" target="miniProgram" hover-class="none" data-open_type="wxapp" :app-id="store.option.wxapp.appid" :path="store.option.wxapp.path">
                                <view class="quick-zfb" :animation="animationInput">
                                    <image class="quick-dial" :src="store.option.wxapp.pic_url"></image>
                                </view>
                            </navigator>
                        </block>
                        <block v-if="__platform == 'my'">
                            <view @tap="openWxapp" :data-app-id="store.option.wxapp.appid" :data-path="store.option.wxapp.path" class="quick-zfb" :animation="animationInput">
                                <image class="quick-dial" :src="store.option.wxapp.pic_url"></image>
                            </view>
                        </block>
                    </block>

                    <view @tap="cutover" style="z-index:20;position:relative;bottom:0" class="flex-col flex-y-center flex-x-center quick-bg">
                        <text class="quick-text">收起</text>
                    </view>

                </view>

            </view>
        </view>
    </view>

    <view v-else direction="all" :class="'quick-icon ' + __device">
        <view class="flex-col flex-y-center flex-x-center quick-bg" @tap="cutover">
            <text class="quick-text">快捷</text> 
            <text class="quick-text">导航</text>
        </view>
    </view>

</block>

<block v-if="setnavi.type==='1'">

    <!-- 样式二 -->
    <view direction="all" class="float-icon">
        <block v-if="!home_icon">
            <navigator url="/pages/index/index" open-type="reLaunch" hover-class="none">
                <image class="dial" :src="setnavi.home_img"></image>
            </navigator>
        </block>

        <block v-if="store.option.quick_map.status==1">
            <view class="dial" @tap="map_power" style="background-image:url({store.option.quick_map.icon}); background-size: 100rpx 100rpx;"></view>
        </block>

        <block v-if="store.dial == 1 && store.dial_pic">
            <view class="dial" @tap="to_dial" style="background-image:url({store.dial_pic}); background-size: 100rpx 100rpx;"></view>
        </block>
        <block v-if="store.option.web_service">
            <navigator :url="'/pages/web/web?url=' + store.option.web_service_url" open-type="navigate" hover-class="none">
                <image class="dial" :src="store.option.web_service"></image>
            </navigator>
        </block>
        <block v-if="store.show_customer_service && store.show_customer_service==1 && store.service">
            <block v-if="__platform=='wx'">
                <!-- <button style="height:100%" open-type="contact" session-from="{{__user_info.nickname}}|" class="float-icon-btn">
                    <image class='dial' src="{{store.service}}"></image>
                </button> -->
            </block>
            <block v-if="__platform=='my'">
                <view class="float-icon-btn" style="position: relative">
                    <view style="z-index:2;width: 100%;height: 100%;position: absolute;left: 0;top:0;opacity: 0">
                        <contact-button :tnt-inst-id="__alipay_mp_config.cs_tnt_inst_id" :scene="__alipay_mp_config.cs_scene"></contact-button>
                    </view>
                    <image style="z-index:1" class="dial" :src="store.service"></image>
                </view>
            </block>
        </block>
        <block v-if="store.option.wxapp.pic_url">
            <block v-if="__platform == 'wx'">
                <navigator open-type="navigate" target="miniProgram" hover-class="none" data-open_type="wxapp" :app-id="store.option.wxapp.appid" :path="store.option.wxapp.path">
                    <image class="dial" :src="store.option.wxapp.pic_url"></image>
                </navigator>
            </block>
            <block v-if="__platform == 'my'">
                <view @tap="openWxapp" :data-app-id="store.option.wxapp.appid" :data-path="store.option.wxapp.path">
                    <image class="dial" :src="store.option.wxapp.pic_url"></image>
                </view>
            </block>
        </block>
    </view>

</block>
</view>
</template>

module.exports = {
  init: function (self) {
    var _this = this;

    _this.currentPage = self;

    _this.setNavi();

    if (typeof self.cutover === 'undefined') {
      self.cutover = function (e) {
        _this.cutover(e);
      };
    }

    if (typeof self.to_dial === 'undefined') {
      self.to_dial = function (e) {
        _this.to_dial(e);
      };
    }

    if (typeof self.map_goto === 'undefined') {
      self.map_goto = function (e) {
        _this.map_goto(e);
      };
    }

    if (typeof self.map_power === 'undefined') {
      self.map_power = function (e) {
        _this.map_power(e);
      };
    }
  },
  setNavi: function () {
    let self = this.currentPage;
    let arr = ['pages/index/index', 'pages/book/details/details', 'pages/pt/details/details', 'pages/goods/goods'];

    if (arr.indexOf(this.getCurrentPageUrl()) != -1) {
      self.setData({
        home_icon: true
      });
    }

    getApp().globalData.getConfig(function (config) {
      var setnavi = config.store.quick_navigation; // if (!setnavi.home_img) {
      //   setnavi.home_img ="https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/quick-home.png";
      // }
      // self.setData({
      //     setnavi: setnavi
      // })
    });
  },
  getCurrentPageUrl: function () {
    var pages = getCurrentPages(); //获取加载的页面

    var currentPage = pages[pages.length - 1]; //获取当前页面的对象

    var url = currentPage.route; //当前页面url

    return url;
  },
  to_dial: function () {
    getApp().globalData.getConfig(function (config) {
      var contact_tel = config.store.contact_tel;
      getApp().globalData.core.makePhoneCall({
        phoneNumber: contact_tel
      });
    });
  },
  map_power: function () {
    var self = this.currentPage;
    getApp().globalData.getConfig(function (config) {
      var map = config.store.option.quick_map;

      if (typeof map !== 'undefined') {
        self.map_goto(map);
      } else {
        getApp().globalData.core.getSetting({
          success: function (res) {
            if (!res.authSetting['scope.userLocation']) {
              getApp().globalData.getauth({
                content: '需要获取您的地理位置授权，请到小程序设置中打开授权！',
                cancel: false,
                author: 'scope.userLocation',
                success: function (res) {
                  if (res.authSetting['scope.userLocation']) {
                    self.map_goto(map);
                  }
                }
              });
            } else {
              self.map_goto(map);
            }
          }
        });
      }
    });
  },
  map_goto: function (map) {
    var self = this.currentPage;
    var lal = map.lal.split(',');
    getApp().globalData.core.openLocation({
      latitude: parseFloat(lal[0]),
      longitude: parseFloat(lal[1]),
      address: map.address
    });
  },
  cutover: function () {
    var self = this.currentPage;
    var status = 0;
    self.setData({
      quick_icon: !self.data.quick_icon
    });
    let animationPlus = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    let animationPic = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    let animationcollect = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    let animationTranspond = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    let animationInput = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    let animationMapPlus = getApp().globalData.core.createAnimation({
      duration: 350,
      timingFunction: 'ease-out'
    });
    getApp().globalData.getConfig(function (config) {
      var store = self.data.store;
      var x = -55;

      if (self.data.quick_icon) {
        if (store['option'] && store['option']['wxapp'] && store['option']['wxapp']['pic_url']) {
          animationInput.translateY(x).opacity(1).step();
          x = x - 55;
        }

        if (store['show_customer_service'] && store['show_customer_service'] == 1 && store['service']) {
          animationTranspond.translateY(x).opacity(1).step();
          x = x - 55;
        }

        if (store['option'] && store['option']['web_service']) {
          animationcollect.translateY(x).opacity(1).step();
          x = x - 55;
        }

        if (store['dial'] == 1 && store['dial_pic']) {
          animationPic.translateY(x).opacity(1).step();
          x = x - 55;
        }

        if (store['option'] && store['option']['quick_map']['status'] == 1) {
          animationMapPlus.translateY(x).opacity(1).step();
          x = x - 55;
        }

        animationPlus.translateY(x).opacity(1).step();
      } else {
        animationPlus.opacity(0).step();
        animationcollect.opacity(0).step();
        animationPic.opacity(0).step();
        animationTranspond.opacity(0).step();
        animationInput.opacity(0).step();
        animationMapPlus.opacity(0).step();
      }

      self.setData({
        animationPlus: animationPlus.export(),
        animationcollect: animationcollect.export(),
        animationPic: animationPic.export(),
        animationTranspond: animationTranspond.export(),
        animationInput: animationInput.export(),
        animationMapPlus: animationMapPlus.export()
      });
    });
  }
  /*quickNavigation: function () {
      var status = 0;
      this.setData({
          quick_icon: !this.data.quick_icon
      })
      var store = this.data.store;
      var animationPlus = getApp().core.createAnimation({
          duration: 300,
          timingFunction: 'ease-out',
      });
        var x = -55;
      if (!this.data.quick_icon) {
          animationPlus.translateY(x).opacity(1).step();
      } else {
          animationPlus.opacity(0).step();
      }
      this.setData({
          animationPlus: animationPlus.export(),
      });
  },*/

};<style>
@import "./quick-navigation.css";
</style>