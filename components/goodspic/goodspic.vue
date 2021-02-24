<template>
	<view>
		
		<jyfParser :html="str"></jyfParser>
		
	</view>
</template>

<script>
	import jyfParser from '../../components/jyf-parser/jyf-parser.vue'
	export default {
		name:'goodspic',
		data() {
			return {
				a:''
			}
		},
		props:{
			str:{
				type:String,
				default:''
			}
		},
		components:{
			jyfParser
		}
	}
</script>

<style>

</style>
