<template>
	<!--左侧操作菜单-->
	<view>
		<view class="paper-left-popup-mask" v-show="popupShow" @tap="hidePopup"></view>
		<view class="paper-left-popup" v-show="popupShow">
			<view class="u-f-ac" hover-class="paper-left-popup-hover" @tap="beizhu">
				<view class="icon iconfont icon-bianji"></view>
				备注
			</view>
			<view class="u-f-ac" hover-class="paper-left-popup-hover"  @tap="lahei">
				<view class="icon iconfont icon-qingchu"></view>
				拉黑
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			popupShow:Boolean
		},
		methods:{
			hidePopup(){
				this.$emit("hide")
			},
			lahei(){
				this.$emit("lahei")
			},
			beizhu(){
				this.$emit("beizhu")
			}
		}
	}
</script>

<style>
	.paper-left-popup-mask{
		position: fixed;
		right: 0;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 1999;
	}
	.paper-left-popup{
		position: fixed;
		right: 0;
		top: 120upx;
		background: #FFFFFF;
		width: 55%;
		z-index: 2000;
		box-shadow: 1upx 1upx 15upx 2upx #CCCCCC;
	}
	.paper-left-popup>view{
		padding: 20upx;
		font-size: 35upx;
	}
	.paper-left-popup>view>view{
		margin-right: 10upx;
		font-weight: bold;
	}
	.paper-left-popup-hover{
		background: #EEEEEE;
	}
</style>
