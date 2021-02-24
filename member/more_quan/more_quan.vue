<template>
	<view>
		<custom lineColor="#dcdcdc" borderColor="rgba(220,220,220,0.6)" btnMode="2" backColor="#000000" houseBk="true" mode="2"
		 fixed="fixed" title="店铺好券" background="#FFFFFF" titleColor="#2C2C2C"></custom>

		<goods-all :type="type" :list="goods"></goods-all>
	</view>
</template>

<script>
	import goodsAll from '@/components/goodsAll.vue'
	export default {
		data() {
			return {
				type: 'jingdong',
				goods: [],
				id: '',
				page: 1,
				is_null: false,

			}
		},
		components: {
			goodsAll
		},
		onLoad(e) {
			uni.hideShareMenu();
			if(e.type)
			this.type = e.type;
			if (e.id) {
				this.id = e.id;
				this.get_other(this.id);
			}
			
		},
		methods: {
			get_other(id) {
				if (id == '')
					return;
				uni.showLoading({
					title: '请求商品列表中',
					mask: false
				});

				let data = this.type == 'jingdong' ? {
					type: 22,
					// brand_id: id, //店铺ID
					shop_id: id,
					page: this.page,
				} : {
					type: 12,
					brand_id: id, //店铺ID
					// shop_id: id,
					page: this.page,
				};
				this.getApp().request({
					data: data,
					url: this.getApp().api.taoke.tk_goods,
					success: (res) => {

						let data = [];
						if (res.data && res.data.good_list instanceof Array) {
							data = res.data.good_list || [];
						}
						if (res.code == 0) {

							if (data.length == 0) {
								this.is_null = true;
							}
							if (this.page == 1) {

								this.goods = data || [];

							} else if (this.page > 1) {
								this.goods = this.goods.concat(data);
								if (data.length == 0) {
									this.timeOut(() => {
										this.showToast('没有更多了', 2000);
									})
								}
							}
							this.page++;
						}

					},
					complete: res => {
						uni.hideLoading();
					}
				});
			}
		},
		onReachBottom() {
			this.get_other(this.id);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
</style>
