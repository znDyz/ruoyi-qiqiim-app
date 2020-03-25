<template>
	<view class="u-f-ajc">
		<view class="tag-sex icon iconfont" :class="[sex==0?'icon-nan':'icon-nv']">{{age}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			sex:Number,
			age:Number
		}
	}
</script>

<style scoped>
	.tag-sex{
		background: #007AFF;
		color: #FFFFFF;
		font-size: 23upx;
		padding: 5upx 10upx;
		margin-left: 16upx;
		border-radius: 10upx;
		line-height:24upx;
	}
	.icon-nv{
		background: #FF968D!important;
	}
</style>
