<template>
	<view class="common">
		<!-- 登陆开始 -->
		<login></login>
		<!-- 登陆结束 -->
		<!-- 检测粘贴板开始 -->
		<link1></link1>
		<!-- 检测粘贴板结束 -->
		
		<!-- 进入店铺提示开始 -->
		<shop></shop>
		<!-- 进入店铺提示结束 -->
		<!-- 非会员添加店主 -->
		<addMch></addMch>
		<!-- 非会员添加店主 -->
	</view>
</template>

<script>
	import login from './login.vue'
	import link1 from './link.vue'
	import shop from './shop.vue'
	import addMch from '@/components/index/addMch.vue'
	export default {
		name:'common',
		data(){
			return{
				
			}
		},
		components:{
			login,shop,link1,addMch
		}
	}
</script>

<style>

</style>
