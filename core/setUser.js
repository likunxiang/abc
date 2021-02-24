module.exports = function (user_info) {
    uni.setStorageSync(this.const.USER_INFO, user_info);
}