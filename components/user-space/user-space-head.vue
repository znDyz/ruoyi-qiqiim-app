<template>
	<!--背景图 + 用户基本信息-->
	<view class="user-space-head u-f-ajc">
		<image :src="getBgImg" mode="widthFix" lazy-load @tap.stop="changeBgImage"></image>
		<view class="user-space-head-info u-f-ajc u-f-column">
			<image :src="userinfo.userpic" mode="widthFix" lazy-load></image>
			<view class="user-space-margin u-f-ac"> 
				 {{userinfo.username}}
				 <tag-sex-age :age="userinfo.age" :sex="userinfo.sex"></tag-sex-age>
			</view>
			<view class="user-space-margin icon iconfont user-space-head-btn"
				  :class="[isgz?'active':'icon-zengjia']" @tap.stop="guanzhu">
				{{isgz?'已关注':'关注'}}
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue";
	export default {
		components:{
			tagSexAge
		},
		props:{
			userinfo:Object
		},
		data(){
			return {
				isgz:this.userinfo.isgz
			}
		},
		//计算属性
		computed:{
			getBgImg(){
				return "../../static/bgimg/"+this.userinfo.bgimg+".jpg";	
			}
		},
		methods:{
			//切换背景
			changeBgImage(){
				let no = parseInt(this.userinfo.bgimg);
				this.userinfo.bgimg = no<4? ++no : 1;
			},
			//关注
			guanzhu(){
				this.isgz = !this.isgz;
			}
		}
	}
</script>

<style scoped>
	.user-space-head-btn{
		background: #FFE993;
		color: #333333;
		border: 1upx solid #FFE993;
		padding: 0 15upx;
		border-radius: 10upx;
		font-size: 28upx;
	}
	.active{
		background:none;
		color: #FFFFFF;
		border: 1upx solid #FFFFFF;
	}
	.user-space-head{
		position: relative;
		height: 500upx;
		overflow: hidden;
	}
	.user-space-head>image{
		width: 100%;
	}
	.user-space-head-info{
		position: absolute;
		top: 150upx;
		left: 33%;
		width: 30%;
	}
	.user-space-head-info>image{
		width: 150upx;
		height: 150upx;
		border-radius: 100%;
	}
	.user-space-head-info>view:first-of-type{
		color: #FFFFFF;
		font-size: 35upx;
		font-weight: bold;
		text-shadow: 2upx 2upx 10upx #333333;/*文字添加淡淡的黑色阴影*/
	}
</style>
