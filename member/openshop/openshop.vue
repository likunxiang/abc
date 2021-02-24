<template>
	<view class="page">
		<!-- 提交成功弹出层 -->
		<!-- <view class="success-model flex-x-center flex-y-center" v-if="is_success" @tap="closeSuccessModel">
			<view class="success-main" @tap.stop="stop">
				<view class="text-center fs-36 color-333333 ns-text-bold">提交成功</view>
				<view class="fs-30 color-999999 text-center" style="margin-top: 60rpx;">请添加下方开店指导“岑安”的微信</view>
				<view class="invite-pic">
					<image style="width: 200rpx;height: 200rpx;" mode="aspectFill" :src="wechat_qr_pic"></image>
				</view>
				<view class="save-pic fs-24 color-333333" @tap="savePic">保存图片</view>
				<view class="flex">
					<view class="invite-pic-head flex-grow-0">
						<image class="invite-pic-head" :src="cen_heard" mode=""></image>
					</view>
					<view class="flex-grow-1 wechat-box flex align-center">
						<view class="fs-24 color-999999 flex-grow-0">微信号：</view>
						<view class="flex justify-between flex-grow-1">
							<view class="fs-24 color-333333">{{we_chat_name}}</view>
							<view class="fs-24 color-FFC330" @tap="copyText" :data-text="we_chat_name">复制</view>
						</view>
					</view>
				</view>
				<view class="success-btn fs-30 color-333333" @tap="successBtn">确定</view>
			</view>
		</view> -->
		<!-- 提交成功弹出层 end -->
		<view class="mb-15 bg-white plr-24">
			<view class="input-box flex align-center">
				<view class="input-box-title">推荐人：</view>
				<input disabled="true" class="fs-30 color-333333" :value="invite_name"></input>
			</view>
			<view class="input-box flex align-center">
				<view class="input-box-title">我的姓名：</view>
				<input v-if="!is_success" placeholder="(必填)" class="fs-30 color-333333 flex1" :value="userName" @input="changeVal"
				 data-type="name"></input>
				<view v-else class="fs-30 color-333333 flex1">{{userName?userName:'(必填)'}}</view>
				<view class="iconfont icon-guanbi1" v-if="userName" style="color: #999999;" @tap="clearUserName"></view>
			</view>
			<view class="input-box flex align-center">
				<view class="input-box-title">微信号：</view>
				<input v-if="!is_success" placeholder="(必填)" class="fs-30 color-333333 flex1" :value="wechat" @input="changeVal"
				 data-type="wechat"></input>
				<view v-else class="fs-30 color-333333 flex1">{{wechat?wechat:'(必填)'}}</view>
				<view class="iconfont icon-guanbi1" v-if="wechat" style="color: #999999;" @tap="clearWechat"></view>
			</view>
			<view class="input-box flex align-center">
				<view class="input-box-title">手机号码：</view>
				<input v-if="!is_success" placeholder="(必填)" class="fs-30 color-333333" :value="userPhone" @input="changeVal"
				 data-type="phone"></input>
				<view v-else class="fs-30 color-333333">{{userPhone?userPhone:'(必填)'}}</view>
			</view>
			<view class="input-box justify-between pr">
				<view class="flex align-center ">
					<view class="input-box-title">验证码：</view>
					<input v-if="!is_success" class="fs-30 color-333333" :value="userCode" @input="changeVal" data-type="code"></input>
					<view v-else class="fs-30 color-333333">{{userCode}}</view>
				</view>
				<view :class="'code-box-disable ' + (userPhone?'code-box':'') " @tap="less(getCodeFun)" v-if="getCode">{{codeText}}</view>
				<view v-else :class="'code-box-disable ' + (userPhone?'code-box':'') ">{{codeText}}</view>
			</view>
		</view>
		<view class="bg-white plr-24 mb-15" style="padding-bottom: 40rpx;">
			<view class="fs-30 color-333333" style="padding: 39rpx 0;">申请人请上传自己是群主并且群成员满50人的微信群的截图</view>
			<view style="margin-bottom: 39rpx;">
				<view class="image-list flex ns-wrap">
					<view v-for="(item, index) in pic_list" :key="index" class="image-preview flex align-end" :data-index="index">
						<text class="flex-x-center flex-y-center image-del" @tap="deleteImage" data-type="1" :data-index="index">×
						</text>
						<image :src="item" style="width: 200rpx;height: 200rpx" mode="aspectFill"></image>
					</view>
					<view v-if="!pic_list||pic_list.length<3" class="image-picker flex align-end" @tap="chooseImage" data-type="1">
						<view style="width: 200rpx;height: 200rpx;background: #F0EEEF; text-align: center;line-height: 200rpx;">
							<text class="iconfont icon-jiahao fs-40 color-999"></text>
						</view>
						<view class="pic-tip fs-24 color-999999 ml-24" v-if="pic_list.length==0">(图片不超过3张)</view>
					</view>
				</view>
			</view>
			<view class="fs-30 color-999999 flex">
				<view>示例：</view>
				<view class="" style="color: #FFC330;" @tap="previewPic">点击查看</view>
			</view>
			<!-- <view>
				<image style="width: 200rpx;height: 200rpx;" mode="aspectFill" :src="example_pic" ></image>
			</view> -->
		</view>
		<view class="bg-white plr-24 text-center" style="padding-top: 43rpx;padding-bottom: 30rpx;position: fixed;bottom: 0rpx;left: 0rpx;">
			<view class="flex-x-center align-center mb-30">
				<view :class="'iconfont ' + (is_ready?'icon-xuanzhong color-FFC330':'icon-weixuanzhong') + ' fs-40'" @tap="ready"></view>
				<view class="fs-26 color-999999 ml-20 flex">
					<text>我已阅读</text>
					<navigator :url="'/pages/article-detail/article-detail?id=' + fwxy_id" class="color-333333">{{fwxy_title}}</navigator>
					<text>和</text>
					<navigator :url="'/pages/article-detail/article-detail?id=' + ystk_id" class="color-333333">{{ystk_title}}</navigator>
				</view>
			</view>
			<view class="footer-btn" style="background-color: #BEBEBE;" v-if="isDisabled">提交申请</view>
			<view class="footer-btn" @tap="less(submitMsg)" v-else>提交申请</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fwxy_id: '16',
				fwxy_title: '《用户服务协议及隐私政策》 ',
				ystk_id: '',
				ystk_title: '《隐私政策》',
				is_ready: false,
				x: this.getApp().core.getSystemInfoSync().windowWidth,
				y: this.getApp().core.getSystemInfoSync().windowHeight,
				user: {},
				userName: '',
				userPhone: '',
				userCode: '',
				invite_code: '',
				codeText: '获取验证码',
				getCode: 'getCode',
				wechat: '',
				isDisabled: true,
				mch_Info: {
					user: {
						avatar_url: ''
					},
					name: '',
					wechat_name: '',
				},
				pic_list: [],
				is_success: false
			};
		},

		components: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

			this.loadData(options);
			this.getInviteInfo()
			var mch = this.getApp().core.getStorageSync('_mchInfo');
			this.setData({
				mch_Info: mch
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.getApp().getStoreData();
			this.loadData();
		},

		onHide: function() {
			this.getApp().page.onHide(this);
		},
		onUnload: function() {
			this.getApp().page.onUnload(this);
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		methods: {
			loadData: function(options) {
				// 获取用户信息
				let storeUser = this.getApp().core.getStorageSync('USER_INFO');

				if (storeUser && storeUser.length != 0) {
					this.setData({
						user: {
							nickname: storeUser.nickname,
							avatar_url: storeUser.avatar_url
						}
					});
				}
			},
			previewPic() {
				uni.previewImage({
					urls: [this.example_pic],
					current: this.example_pic
				})
			},
			getInviteInfo() {
				this.getApp().request({
					url: this.getApp().api.default.get_invite_info,
					data: {
						invite_mch_id: uni.getStorageSync('_mchInfo').id || ''
					},
					success: (res) => {
						if (res.code == 0) {
							this.setData({
								invite_name: res.data.name,
								we_chat_name: res.data.we_chat_code,
								wechat_qr_pic: res.data.url,
								example_pic: res.data.te,
								fwxy_id: res.data.fwxy_id,
								fwxy_title: res.data.fwxy_title,
								cen_heard: res.data.cen_heard, // 岑安头像
								ystk_id: res.data.ystk_id,
								ystk_title: res.data.ystk_title
							})
						}
					}
				})
			},
			successBtn() {
				uni.redirectTo({
					url: '/member/openSubmit/openSubmit'
				})
			},
			clearWechat() {
				this.wechat = ''
				this.changeDisabled()
			},
			clearUserName() {
				this.userName = ''
				this.changeDisabled()
			},
			// 监视带星内容是否填写 
			changeDisabled: function() {
				var userName = this.userName,
					userPhone = this.userPhone,
					userCode = this.userCode,
					pic_list = this.pic_list,
					wechat = this.wechat;
				if (userName && userPhone && userCode && wechat && pic_list.length > 0) {
					this.setData({
						isDisabled: false
					});
				} else {
					this.setData({
						isDisabled: true
					});
				}
			},
			closeSuccessModel() {
				this.is_success = false
			},
			ready() {
				this.setData({
					is_ready: !this.is_ready
				});
			},
			// 阻止冒泡
			stop() {
				return
			},
			submitMsg() {
				var self = this
				if (this.userName && this.userPhone && this.userCode && this.wechat && this.pic_list.length > 0) {
					if (!this.is_ready) {
						uni.showToast({
							title: '请先勾选阅读相关协议',
							icon: 'none'
						});
						return false;
					}
				} else {
					uni.showToast({
						title: '你还有信息没填或格式错误',
						icon: 'none'
					});
					return false;
				}
				var pic_url_list = [];
				var pic_complete_count = 0
				uni.showLoading({
					title: "正在上传图片",
					mask: true,
				});
				for (var i in self.pic_list) {
					(function(i) {
						uni.uploadFile({
							url: self.getApp().api.default.upload_image,
							filePath: self.pic_list[i],
							name: "image",
							success: function(res) {
								pic_complete_count++;
								if (res.statusCode == 200) {
									res = JSON.parse(res.data);
									if (res.code == 0) {
										pic_url_list[i] = res.data.url;
									}
									if (res.code == 1) {
										uni.showModal({
											title: res.msg,
											showCancel: false,
											icon: 'none'
										})
										return;
									}
								}
								if (pic_complete_count == self.pic_list.length) {
									uni.hideLoading();

									function _submit() {
										uni.showLoading({
											title: "正在提交",
											mask: true,
										});
									}
									self.getApp().request({
										url: self.getApp().api.default.openShop,
										method: 'POST',
										data: {
											code: self.userCode,
											tel: self.userPhone,
											realname: self.userName,
											wechat_name: self.wechat,
											wechat_qr_pic: pic_url_list,
											parent_mch_id: uni.getStorageSync('_mchInfo').id
										},
										success: res => {
											if (res.code == 0) {
												self.is_success = true
												self.successBtn()
											} else {
												uni.showModal({
													title: res.msg,
													showCancel: false
												});
											}
										}
									});
								}
							},
							complete: function(res) {
								uni.hideLoading();
							}
						});
					})(i);
				}

			},
			// 复制按钮
			copyText: function(e) {
				// TODO
				var text = e.currentTarget.dataset.text;

				if (!text) {
					uni.showToast({
						title: '店主有点懒，没有绑定微信哦～',
						duration: 2500,
						icon: 'none'
					});
					return;
				}

				uni.setClipboardData({
					data: text,

					success(res) {
						uni.showToast({
							title: '微信号已复制，快去粘贴吧～',
							duration: 3000,
							icon: 'none'
						});
						uni.getClipboardData({
							success(res) {}

						});
					}

				});
			},
			// 上传照片
			chooseImage: function(e) {
				var self = this
				var max_pic_num = 3;
				var pic_list = self.pic_list;
				var pic_num = 0;
				if (pic_list)
					pic_num = pic_list.length || 0;
				var _count = max_pic_num - pic_num;
				uni.chooseImage({
					count: _count,
					success: function(res) {
						if (!pic_list)
							pic_list = [];
						pic_list = pic_list.concat(res.tempFilePaths);
						self.setData({
							pic_list: JSON.parse(JSON.stringify(pic_list))
						});
						self.changeDisabled()
					},
					fail: function(err) {
						uni.showModal({
							title: res.msg,
							showCancel: false,
						})
					}
				});

			},
			// 删除照片
			deleteImage: function(e) {
				var self = this;
				var index = e.currentTarget.dataset.index;
				var pic_list = self.pic_list;
				pic_list.splice(index, 1);
				self.setData({
					pic_list: pic_list
				});
			},
			// 获取验证码
			getCodeFun: function() {
				var that = this;
				var re = /^(1[3-9][0-9]{9})$/;

				if (that.userPhone == '') {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none',
						duration: 1500
					});
					return false;
				}

				if (!re.test(that.userPhone)) {
					uni.showToast({
						title: '联系电话格式不正确',
						icon: 'none',
						duration: 1500
					});
					return false;
				} // 发送短信


				this.getApp().request({
					url: this.getApp().api.default.sendCode,
					data: {
						phone: that.userPhone,
						invite_code: that.invite_code,
						type: 1
					},
					method: 'POST',
					success: function(res) {
						if (res.code == 0) {
							var count = 60;
							uni.showToast({
								title: '验证码发送成功',
								icon: 'none',
								duration: 1500
							});
							var timer = setInterval(function() {
								count--;

								if (count >= 1) {
									that.setData({
										codeText: count + ' S',
										getCode: ''
									});
								} else {
									that.setData({
										codeText: '重新获取',
										getCode: 'getCode'
									});
									clearInterval(timer);
								}
							}, 1000);
						} else {
							if (res.msg) {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 1500
								});
							}
						}
					}
				});
			},
			// 防抖赋值
			changeVal: function(e) {
				var that = this;
				var typeName = e.target.dataset.type;
				var val = e.detail.value;

				if (that.timeout) {
					clearTimeout(that.timeout);
				}

				that.timeout = setTimeout(function() {
					switch (typeName) {
						case 'name':
							that.setData({
								userName: val
							});
							break;

						case 'phone':
							that.setData({
								userPhone: val
							});
							break;

						case 'code':
							that.setData({
								userCode: val
							});
							break;

						case 'invite':
							that.setData({
								invite_code: val
							});
							break;

						case 'wechat':
							that.setData({
								wechat: val
							});
							break;
					}

					that.changeDisabled();
				}, 100);
			},
			// 申请开店
			openShop: function(e) {
				var status = -1;
				var formId = e.detail.formId;
				var userName = this.userName,
					userPhone = this.userPhone,
					userCode = this.userCode,
					invite_code = this.invite_code,
					wechat = this.wechat;

				if (userName == '' || userPhone == '' || userCode == '' || invite_code == '') {
					uni.showToast({
						title: '请完善信息',
						icon: 'none',
						duration: 1500
					});
					return false;
				} // 发送短信


				this.getApp().request({
					url: this.getApp().api.default.openShop,
					data: {
						realname: userName,
						tel: userPhone,
						code: userCode,
						invite_code: invite_code,
						formId: formId
					},
					method: 'POST',
					success: function(res) {
						if (res.code == 0) {
							uni.navigateTo({
								// url: '/pages/openshopStatus/openshopStatus?status=' + status,
								url: '/member/openshop2/openshop2'
							}); // wx.showModal({
							// 	content: res.msg,
							// 	showCancel: false,
							// 	icon: 'none',
							// 	success: function (res) {
							// 		if (res.confirm) {
							// 		}
							// 	}
							// })
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							});
						}
					}
				});
			},
			savePic() {
				var self = this;

				if (!this.getApp().core.saveImageToPhotosAlbum) {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					this.getApp().core.showModal({
						title: '提示',
						content: '当前版本过低，无法使用该功能，请升级到最新版本后重试。',
						showCancel: false
					});
					return;
				}

				this.getApp().core.downloadFile({
					url: self.wechat_qr_pic,
					success: function(e) {
						this.getApp().core.showLoading({
							title: "正在保存图片",
							mask: false
						});
						this.getApp().core.saveImageToPhotosAlbum({
							filePath: e.tempFilePath,
							success: function() {
								this.getApp().core.showModal({
									title: '提示',
									content: '二维码保存成功',
									showCancel: false
								});
							},
							fail: function(e) {
								this.getApp().core.showModal({
									title: '图片保存失败',
									content: e.errMsg,
									showCancel: false
								});
							},
							complete: function(e) {
								this.getApp().core.hideLoading();
							}
						});
					},
					fail: function(e) {
						this.getApp().core.showModal({
							title: '图片下载失败',
							content: e.errMsg + ";" + self.wechat_qr_pic,
							showCancel: false
						});
					},
					complete: function(e) {
						this.getApp().core.hideLoading();
					}
				});
			}
		}
	};
</script>
<style>
	/* .page{background: #fff;background:url("https://qinpu-1258528632.cos.ap-chengdu.myqcloud.com/qinpuImage/zhaomu.jpg") no-repeat;background-size:100% 100%;} */
	.page {
		background: #F4F4F4;
		min-height: 100%;
		padding-bottom: 222rpx;
	}

	image.pa {
		width: 138rpx;
		height: 138rpx;
		left: 140rpx;
		bottom: 26rpx;
	}

	/* 表单 */
	.form {
		position: absolute;
		left: 140rpx;
		bottom: 196rpx;
		color: #fff;
		font-size: 13px;
		text-align: left
	}

	.form input {
		background: #fff;
		width: 100%;
		border-radius: 8rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #595959;
		padding-left: 10rpx;
		margin-top: 4rpx;
	}

	.userInfo>view:nth-child(1) {
		width: 202rpx;
		margin-right: 19rpx;
	}

	.userInfo>view:nth-child(2) {
		width: 229rpx;
		margin-right: 17rpx;
	}

	.userInfo .getCode {
		font-size: 11px;
		margin-top: 48rpx;
	}

	.userCode {
		margin-top: 20rpx;
	}

	.userCode>view:nth-child(1) {
		width: 449rpx;
		margin-right: 16rpx;
	}

	.userCode>view:nth-child(2) {
		margin-top: 38rpx;
		padding: 12rpx 14rpx;
		background: #fff;
		font-size: 11px;
		color: #c10000;
		border-radius: 10rpx;
		font-weight: 600;
	}

	.openShop {
		height: 53rpx;
		line-height: 53rpx;
		padding: 0 12rpx;
		font-size: 11px;
		color: #c10000;
		border-radius: 10rpx;
		margin-top: 38rpx;
	}

	.head-box {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		padding: 10rpx;
		background-color: #fff;
		margin: auto;
	}

	.head {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;

	}

	.store-man {
		width: 100%;
		padding: 30rpx 0 25rpx;
		text-align: center;
		background-color: #252E3E;
		color: #fff;
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.lable {
		width: 110rpx;
		font-size: 26rpx;
		line-height: 52rpx;
		color: #595959;
		font-weight: bold;
	}

	.nsw80 {
		width: 80%;
		height: 58rpx;
		padding-left: 22rpx;
	}

	.sub-btn {
		position: absolute;
		bottom: 50rpx;
		width: 670rpx;



		background: #F49E3A;
		color: #fff;
	}

	.sub-btn1 {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 0;
		display: block;

		margin-top: 200rpx;
		border: 0;
	}

	.code-box-disable {
		position: absolute;
		padding: 10rpx 0;
		text-align: center;
		color: #999999;
		font-size: 24rpx;
		top: 22rpx;
		right: 0rpx;
		width: 161rpx;
		height: 51rpx;
		border: 1rpx solid #BEBEBE;
		border-radius: 25rpx;
	}

	.code-box {
		color: #FFC330;
		border: 1rpx solid #FFC330;
	}

	.copy {
		width: 140rpx;
		padding: 8rpx 0;
		background: #fff;
		text-align: center;
		font-size: 20rpx;
		color: #9B9B9B;
		border-radius: 24rpx;
		margin: 10rpx;
	}

	.pad38 {
		padding: 38rpx;
	}

	.title {
		width: 76rpx;
	}

	button {
		border-radius: 0 !important;
	}

	button[disabled] {
		background-color: #ECECEC !important;
		color: #9B9B9B !important;
	}

	.input-box {
		padding: 24rpx 0;
		border-bottom: 1rpx solid rgba(190, 190, 190, .4);
	}

	.input-box-title {
		width: 163rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.image-list {
		margin-left: -20rpx;
		margin-top: -20rpx;
	}

	.image-picker {
		font-size: 0;
	}

	.image-picker,
	.image-preview {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.image-preview {
		position: relative;
		overflow: hidden;
	}

	.image-preview .image-del {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		height: 50rpx;
		width: 50rpx;
		background: rgba(0, 0, 0, .4);
		color: #fff;
		font-weight: bolder;
		border-radius: 999rpx;
		font-size: 13pt;
		box-shadow: 0 1rpx 2rpx rgba(0, 0, 0, .2);
		z-index: 2;
	}

	.footer-btn {
		width: 702rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #FFC330;
		font-size: 30rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 40rpx;
	}

	.success-model {
		position: fixed;
		left: 0rpx;
		right: 0rpx;
		height: 100%;
		background: rgba(0, 0, 0, .7);
		z-index: 3;
	}

	.success-main {
		width: 630rpx;
		height: 760rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 46rpx 24rpx 51rpx;
	}

	.invite-pic {
		width: 200rpx;
		height: 200rpx;
		background: #F4F4F4;
		margin: 29rpx auto;
	}

	.invite-pic-head {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background: #F4F4F4;
	}

	.wechat-box {
		margin-left: 16rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #F4F4F4;
		border-radius: 30rpx;
		padding: 0 30rpx;
	}

	.success-btn {
		width: 202rpx;
		height: 82rpx;
		margin: 59rpx auto 0;
		line-height: 78rpx;
		text-align: center;
		border: 2rpx solid rgba(190, 190, 190, 0.7);
		border-radius: 4rpx;
	}

	.save-pic {
		width: 132rpx;
		height: 52rpx;
		line-height: 48rpx;
		margin: 29rpx auto;
		text-align: center;
		border: 2rpx solid rgba(190, 190, 190, 0.5);
		border-radius: 25rpx;
	}
</style>
