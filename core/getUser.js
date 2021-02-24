module.exports =  function(){
    let user_info = uni.getStorageSync(this.const.USER_INFO);
    if (user_info) {
        return user_info;
    } else {
        return '';
    }
}