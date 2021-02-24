<template>
<!--添加品牌偏好-->
<!--user/addLike/addLike.wxml-->
<view class="addLike">
	<!-- <view class="heardBanner">
		<view class="con flex ns-justify-content-space-between ns-align-items-flex-center" :style="'height:' + customBar + 'px;padding-top:' + statusBar + 'px;padding-left:20rpx;padding-right:20rpx;'">
			<view class="  go-back flex1" style="font-size:30rpx;color:#FFFFFF;" @tap="returnPage">
				<text class="iconfont icon-zuojiantoubeifen"></text>
			</view>
			<view class="qTitle flex1 ns-text-center " style="font-size:37rpx;color:#FFFFFF;">添加</view>
			<view class="flex1"></view>
		</view>
	</view>
	<view :style="'height:' + customBar + 'px;'"></view> -->
	<!-- 导航结束 -->
	<custom mode="2" title="品牌关注" background="#FFFFFF" backColor="#333333" titleColor="#333333"></custom>
	<view class="input-left">
		<text class="iconfont icon-yonghu" style="color:#333333;"></text>
		顾客昵称
	</view>
	<view class="input-box">

		<input class="input-right" disabled="true" @tap="openChoose" :data-type="1" placeholder="请选择顾客昵称" :value="userValue"></input>
	</view>
	<view class="input-left">
		<text class="iconfont icon-pinpai1" style="color:#333333;"></text>
		品牌名称
	</view>
	<view class="input-box">

		<input class="input-right" disabled="true" @tap="openChoose" :data-type="2" placeholder="请选择品牌名称" :value="brandValue"></input>
	</view>

	<!-- <view class="bottom-box">
		<navigator open-type="navigateBack" class="btn">取消</navigator>
		<block v-if="checkArrName1.length>0 || checkArrName2.length>0">
			<view class="btn1" @tap="addBrandUser" style="background-color: rgba(97, 97, 97, 1);">确定</view>
		</block>
		<block v-else>
			<view class="btn1">确定</view>
		</block>
	</view> -->
	<view class="bottom-box">
		<view @tap="addBrandUser" class="bottom-box3" style="width: 702rpx;height: 98rpx;background: #8714EE;border-radius: 49rpx;font-size: 30rpx;line-height: 98rpx;text-align: center;color: #FFFFFF;margin-top: 24rpx;">
			确定添加
		</view>
	</view>

	<!-- 选择:radio="radio" -->
	<Select :radio="radio"  v-if="isShow" :arrData="arrData" :isShow="isShow" :selectType="type" :imgString="'image'" :selectString="'name'" :title="title" :inputText="placeholder" :checkArr="checkArr" ref="getCheckArr" @quxiao="quxiao" @binddata="bindData" @search="searchData" @getmore="getMore"></Select>
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
      userIds: "",
      checkArr1: "",
      checkArrName1: "",
      userValue: "",
      brandIds: "",
      checkArr2: "",
      checkArrName2: "",
      brandValue: "",
      keyword: "",
      brandList: "",
      checkArr: "",
      checkArrName: "",
      isShow: false,
      url: "",
      title: "",
      placeholder: "",
      type: 0,
      arrData:[],
      stopLoadMore: false,
	  radio:false,//单选
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
	  // this.time = Number(Date.now());
	  // console.log(this.time);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	  //console.log(this.$refs);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  //获取最新选择的品牌  页面创建时间 < 品牌选择时间
	  // let choose_brand = uni.getStorageSync('choose_brand');
	  // let choose_time = Number(choose_brand.time) || 0;
	  // if(choose_time>this.time){
		 //  console.log('有选择')
	  // }
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
    // 组件传值出来
    bindData(e) {
		// console.log('eeeeeeeeeeeeeee',e)
      if (e.detail) {
        var checkArrName = e.detail.checkArrName;
        var checkArrString = '';

        for (let i in e.detail.checkArrName) {
          if (i < checkArrName.length - 1) {
            checkArrString += checkArrName[i] + ',';
          } else {
            checkArrString += checkArrName[i];
          }
        }

        if (this.type == 1) {
          this.setData({
            userIds: e.detail.checkArr,
            checkArr1: e.detail.checkArr,
            checkArrName1: e.detail.checkArrName,
            userValue: checkArrString
          });
        } else {
          this.setData({
            brandIds: e.detail.checkArr,
            checkArr2: e.detail.checkArr,
            checkArrName2: e.detail.checkArrName,
            brandValue: checkArrString
          });
        }
      }
    },

    // 增加用户和品牌一起传
    addBrandUser() {
		let keyword = this.keyword
		let brand_ids = this.brandIds
		let user_ids = this.userIds
		let data = {}
		if (keyword) {
			brand_ids = this.brand_ids || ''
			user_ids = this.userIds || ''
		} else {
			if (brand_ids && user_ids) {
				
				let keyword = this.keyword || ''
			} else {
				uni.showToast({
					title: '顾客名称和品牌名称不能为空',
					icon: 'none'
				})
				return
			}
		}
      this.getApp().request({
        url: this.getApp().api.maijia.add_brand,
        method: 'POST',
        data: {
          brand_ids: brand_ids,
          user_ids: user_ids,
          brand_name: keyword
        },
        success: res => {
          if (res.code == 0) {
            uni.showModal({
              content: '操作成功',
              cancelText: '返回',
              success: res => {
				  uni.navigateBack()
              }
            });
          }
        },
		complete(res){
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

    // 删除
    delBrand(e) {
      var index = e.currentTarget.dataset.index;
      var id = e.currentTarget.dataset.id;
      var brandList = this.brandList;
      uni.showModal({
        content: '删除后，活动开始将无法提醒确定删除吗？',
        success: res => {
          if (res.confirm) {
            brandList.splice(index, 1);
            this.getApp().request({
              url: this.getApp().api.maijia.del_brand,
              method: 'POST',
              data: {
                id: id
              },
              success: res => {
                if (res.code == 0) {
                  this.setData({
                    brandList: brandList
                  });
                }
              }
            });
          }
        }
      });
    },

    //打开选择器
    openChoose(e) {
      var type = e.currentTarget.dataset.type;

      if (type == 1) {
		this.radio = true;
        var url = this.getApp().api.maijia.add_client_list;
        var title = '顾客名称';
        var placeholder = '请选择顾客昵称';
        var checkArr = this.checkArr1 || [];
        var checkArrName = this.checkArrName1 || [];
      } else {
		this.radio = false;
        var url = this.getApp().api.maijia.add_brand_list;
        var title = '品牌名称';
        var placeholder = '请选择品牌名称';
        var checkArr = this.checkArr2 || [];
        var checkArrName = this.checkArrName2 || [];
      }

      this.setData({
        checkArr: checkArr,
        checkArrName: checkArrName,
        isShow: true,
        url: url,
        title: title,
        placeholder: placeholder,
        type: Number(type)||0,
        keyword: ''
      });
	  // this.isShow = true;
	  this.$nextTick(res => {
	  	this.$refs.getCheckArr.getCheckArrName(this.checkArrName);
	  	this.getDataList();
	  })
    },

    getDataList() {
      this.getApp().request({
        url: this.url,
        data: {
          keyword: this.keyword || ''
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

    getMore() {
      var self = this;
      var url = this.url;
      var page = self.page;
      var data = {
        keyword: this.keyword || ''
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

    //取消选择
    quxiao(e) {
      this.setData({
        isShow: false
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

  }
};
</script>
<style>
/* user/addPinpai/addPinpai.wxss */


/* user/addLike/addLike.wxss */

page {
    background: #f7f7f7;
}

.heardBanner {
    width: 750rpx;
    background: linear-gradient(134deg, rgba(48, 35, 174, 1) 0%, rgba(200, 109, 215, 1) 100%);
	/* background-color: #FFFFFF; */
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9;
	/* color: #000; */
	
}


/* input内容 */

.input-box {
    width: 700rpx;
    margin: 25rpx 0 0 25rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 12rpx;
    background-color: #ffffff;
    font-size: 30rpx;
    color: #4a4a4a;
    display: flex;
    box-sizing: border-box;
    padding: 0 19rpx;
}

.input-left {
    font-weight: 500;
    margin-right: 40rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #4A4A4A;
    line-height: 42rpx;
    /* padding-left: 60rpx; */
	padding-left: 30rpx;
    margin-top: 30rpx;
}

.input-left text {
    padding-right: 14rpx;
}

.input-right {
    line-height: 100rpx;
    height: 80rpx;
    flex: 1;
	font-size: 24rpx;
}

.bottom-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750rpx;
    box-sizing: border-box;
    padding: 35rpx;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.bottom-box .btn {
    width: 325rpx;
    height: 78rpx;
    background: #ffffff;
    border: 2rpx solid #616161;
    line-height: 78rpx;
}

.bottom-box .btn1 {
    width: 325rpx;
    height: 78rpx;
    background-color: rgba(97, 97, 97, 0.5);
    color: #616161;
    line-height: 78rpx;
    color: #ffffff;
}

.bottom-box .active {
    width: 325rpx;
    height: 78rpx;
    background: rgba(97, 97, 97, 1);
}

.click {
    opacity: 0.8;
    /* transition: all 0.1s; */
    transform: scale(0.99);
}
</style>