<template>
	<view>
		view测试
		<view class="view-box animated" hover-class="view-box-hover bounceIn" hover-stay-time="1000">
			测试div
		</view>
		
		text测试(支持换行)
		<text :selectable="true">\n这是测试文本\n呵呵</text>
		
		选择器测试
		<view class="box">
			<text>text组件</text>
			<view>1</view>
			<view>2</view>
			<view>3</view>
			<view>4</view>
			<view>5</view>
			<view>6</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.view-box{
		width: 300upx;
		height: 300upx;
		color: #333333;
		font-size: 20upx;
		background-color: #FF3333;
		margin:20upx;
	}
	.view-box-hover{background-color: #0A98D5;}
	
	/*选择器相关*/
	.box{
		width: 300upx;
		height: 300upx;
		color: #333333;
		background-color: #FF3333;
		margin:20upx;
	}
	.box view{font-size: 20upx;}
	text,view{
		color: #ffffff;
	}
	
	.box>view:nth-child(2){background: #F76260;}
	.box>view:nth-child(3){background: #F76260;}
	/* 
	.box>view:nth-of-type(1){background: #007AFF;}
	.box>view:nth-of-type(2){background: #B2B2B2;}
	.box>view:nth-of-type(3){background: #F0AD4E;} 
	*/
	
	/*奇-偶数选择器*/
	/* 
	.box>view:nth-of-type(even){background: #333333;}
	.box>view:nth-of-type(odd){background: #4CD964;} 
	*/
</style>
