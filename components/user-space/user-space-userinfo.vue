<template>
	<view class="user-space-info">
		<view class="user-space-info-item">
			<view class="">账号信息</view>
			<view class="">嗅龄：{{getRegAge}}</view>
			<view class="">嗅百ID：{{userinfo.id}}</view>
		</view>
		<view class="user-space-info-item">
			<view class="">个人信息</view>
			<view class="">星座：{{getXingZuo}}</view>
			<view class="">故乡：{{userinfo.path}}</view>
			<view class="">职业：{{userinfo.job}}</view>
			<view class="">情感：{{userinfo.qg}}</view>
		</view>
	</view>
</template>

<script>
	import timeUtils from "../../common/time.js";
	export default {
		props:{
			userinfo:Object
		},
		data() {
			return {
					regtime:this.userinfo.regtime,
					birthday:this.userinfo.birthday,
				}
		},
		computed:{
			getRegAge(){
				return timeUtils.gettime.sumAge(this.regtime);
			},
			getXingZuo(){
				return timeUtils.gettime.getHoroscope(this.birthday)
			}
		}
	}
</script>

<style scoped>
	.user-space-info{
		padding: 0 30upx;
	}
	.user-space-info-item{
		padding: 20upx 0;
		border-bottom: 1upx solid #EEEEEE;
	}
	.user-space-info-item>view{
		color: #AAAAAA;
	}
	.user-space-info-item>view:first-child{
		color: #333333;
		font-weight: bold;
		padding: 15upx 0;
		font-size: 35upx;
	}
</style>
