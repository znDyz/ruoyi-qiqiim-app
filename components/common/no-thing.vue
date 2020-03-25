<template>
	<!--无内容默认组件-->
	<view class="nothing u-f-ajc animated fadeInRight">
		<image src="../../static/common/nothing.png" mode="widthFix" lazy-load></image>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.nothing{
		background: #FFFFFF;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.nothing>image{
		width: 50%;
	}
</style>
