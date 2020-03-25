<template>
	<view class="topic-nav">
		<view class="u-f-ac u-f-jb">
			<view>热门分类</view>
			<view class="u-f-ac" @tap="openTopicNav">
				更多<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<view class="u-f-ac">
			<block v-for="(item,index) in nav" :key="index">
				<view class="u-f-ajc">{{item.name}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			nav:Array
		},
		methods:{
			openTopicNav(){
				uni.navigateTo({
					url: '../../pages/topic-nav/topic-nav'
				});
			}
		}
	}
</script>

<style scoped>
	.topic-nav{
		padding:20upx;
		border-top: 1upx solid #EEEEEE;
		border-bottom: 1upx solid #EEEEEE;
	}
	.topic-nav>view:nth-child(1){
		margin-bottom: 15upx;
	}
	.topic-nav>view:nth-child(1)>view:nth-child(1){
		font-size: 45upx;
		font-weight: bold;
	}
	.topic-nav>view:nth-child(1)>view:nth-child(2){
		font-size: 35upx;
		color:#9E9E9E;
	}
	.topic-nav>view:nth-child(2)>view{
		flex: 1;
		background-color: #EEEEEE;
		border-radius: 10upx;
		font-size: 30upx;
		color:#9E9E9E;
		margin: 0upx 10upx;
		padding: 5upx 5upx;
	}
</style>
